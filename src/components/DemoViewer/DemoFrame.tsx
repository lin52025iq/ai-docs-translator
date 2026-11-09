'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Framework, Theme } from './state'
import { cn } from '@/utils'

export type DemoFile = { name: string; content: string }
export type DemoDocument = Record<string, unknown>

export type DemoBridgeEvent =
  | { type: 'ready'; tabs: Framework[]; tab: Framework }
  | { type: 'source'; tab: Framework; files: DemoFile[] }
  | { type: 'document'; tab: Framework; json: DemoDocument; edited: boolean }
  | { type: 'height'; height: number }

export type DemoFrameHandle = {
  /** 替换演示文档，不重新加载 iframe。 */
  setContent: (json: DemoDocument) => void
}

export type DemoFrameProps = {
  src: string
  title: string
  theme: Theme
  /** 用于替代演示自身文档显示的内容；演示就绪后发送。 */
  initialContent?: DemoDocument | null
  /** 立即加载，即使处于隐藏状态也会加载；未显示的延迟加载 iframe 则不会加载。 */
  isEager?: boolean
  onBridge?: (event: DemoBridgeEvent) => void
  /** iframe 已加载，但没有收到它发来的消息：演示应用没有桥接机制。 */
  onNoBridge?: () => void
  className?: string
}

/**
 * 用于显示演示应用中演示内容的 iframe。演示应用的预览会发送
 * `{ channel: 'tiptap-demo' }` 消息（`ready`、`source`、`document`、`height`），并接收
 * `{ channel: 'tiptap-docs' }` 消息（`hello`、`theme`、`content`）；参见 tiptap-pro 的 `demos/preview/Demo.vue`。
 */
// 消息只会发送到演示自身的来源：`content` 包含读者输入的内容
const postToFrame = (
  frame: HTMLIFrameElement | null,
  src: string,
  message: Record<string, unknown>,
) => {
  frame?.contentWindow?.postMessage(
    { channel: 'tiptap-docs', ...message },
    new URL(src, window.location.href).origin,
  )
}

export const DemoFrame = forwardRef<DemoFrameHandle, DemoFrameProps>(
  ({ src, title, theme, initialContent, isEager, onBridge, onNoBridge, className }, ref) => {
    const frameRef = useRef<HTMLIFrameElement>(null)
    const [isReady, setIsReady] = useState(false)
    // 要恢复的文档是在挂载时确定的；新的 `src` 会挂载新的 iframe（由 key 决定）
    const [restore] = useState(() => initialContent ?? null)
    const callbacks = useRef({ onBridge, onNoBridge })
    const documents = useRef(0)
    const readyRef = useRef(false)

    useEffect(() => {
      callbacks.current = { onBridge, onNoBridge }
    })

    useImperativeHandle(ref, () => ({
      setContent: (json) => send({ type: 'content', json }),
    }))

    const send = (message: Record<string, unknown>) => postToFrame(frameRef.current, src, message)

    useEffect(() => {
      const onMessage = (event: MessageEvent) => {
        const message = event.data

        if (
          event.source !== frameRef.current?.contentWindow ||
          message?.channel !== 'tiptap-demo'
        ) {
          return
        }

        if (message.type === 'ready') {
          // `ready` 会在加载时发送，也会在响应 `hello` 时再次发送；文档只恢复一次
          if (!readyRef.current && restore) {
            postToFrame(frameRef.current, src, { type: 'content', json: restore })
          }
          readyRef.current = true
          setIsReady(true)
          callbacks.current.onBridge?.({ type: 'ready', tabs: message.tabs, tab: message.tab })
        }

        if (message.type === 'height' && typeof message.height === 'number') {
          callbacks.current.onBridge?.({ type: 'height', height: message.height })
        }

        if (message.type === 'source') {
          callbacks.current.onBridge?.({ type: 'source', tab: message.tab, files: message.files })
        }

        if (message.type === 'document') {
          // 第一个文档是演示自身的内容，除非已恢复了其他文档
          documents.current += 1
          callbacks.current.onBridge?.({
            type: 'document',
            tab: message.tab,
            json: message.json,
            edited: documents.current > 1 || restore !== null,
          })
        }
      }

      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }, [restore, src])

    // iframe 可能在此页面开始监听之前就已加载（即水合之前）：发送 hello，它会回复 `ready`
    // 延迟收到的 `ready` 仍然有效，因此延迟加载的 iframe 即使在等待结束后才加载，也能恢复正常
    useEffect(() => {
      postToFrame(frameRef.current, src, { type: 'hello' })
      const timeout = window.setTimeout(() => {
        if (!readyRef.current) callbacks.current.onNoBridge?.()
      }, 10000)
      return () => window.clearTimeout(timeout)
    }, [src])

    // 主题变化时不会重新加载，因此读者输入的内容会保留
    useEffect(() => {
      if (isReady) {
        postToFrame(frameRef.current, src, { type: 'theme', theme })
      }
    }, [isReady, src, theme])

    const onLoad = () => {
      window.setTimeout(() => {
        if (!readyRef.current) {
          callbacks.current.onNoBridge?.()
        }
      }, 2500)
    }

    return (
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        loading={isEager ? 'eager' : 'lazy'}
        onLoad={onLoad}
        className={cn('block w-full h-full border-0 bg-transparent', className)}
      />
    )
  },
)

DemoFrame.displayName = 'DemoFrame'
