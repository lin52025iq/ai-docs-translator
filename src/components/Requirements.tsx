// src/components/Requirements.tsx
'use client'

import React, { ReactNode, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRightIcon } from 'lucide-react'
import { Sidebar } from './ui/Sidebar'
import { cn } from '@/utils'

export type RequirementItemProps = {
  /** 主标签，例如“激活试用” */
  label: string
  /** 详细内容——可以包含 <a> 标签 */
  children: ReactNode
}

/**
 * 单个要求条目。点击可展开或收起详细内容。
 */
export function RequirementItem({ label, children }: RequirementItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* 使用 Sidebar.Button 包裹，以应用相同的侧边栏文本样式 */}
      <Sidebar.Button asChild>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex items-center justify-between w-full px-2.5 py-1.5 text-sm leading-[140%] text-grayAlpha-900 hover:bg-grayAlpha-100 transition-colors',
            open ? 'bg-grayAlpha-100' : '',
          )}
        >
          <span className="flex-1 text-left">{label}</span>
          <ChevronRightIcon
            className={cn(
              'w-4 h-4 text-grayAlpha-500 transition-transform duration-200',
              open ? 'rotate-90 text-purple-500' : '',
            )}
          />
        </button>
      </Sidebar.Button>

      {open && (
        <div className="markdown pl-6 pt-1 text-sm leading-[150%] text-grayAlpha-600">
          {children}
        </div>
      )}
    </div>
  )
}

export type RequirementsProps = {
  children: ReactNode
}

/**
 * 包装 <RequirementItem/> 条目，并在桌面端通过 portal 将其渲染到侧边栏中。
 */
const DESKTOP_QUERY = '(min-width: 1280px)'

function subscribeToDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

// 插槽位于布局中；客户端导航时，布局可能在此组件之后挂载
function subscribeToSlot(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.body, { childList: true, subtree: true })
  return () => observer.disconnect()
}

const getSlot = () => document.getElementById('requirements-slot')

export function Requirements({ children }: RequirementsProps) {
  // 在服务器端和 hydration 期间为 false，因此 portal 只会在浏览器中挂载
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  )
  const slot = useSyncExternalStore(subscribeToSlot, getSlot, () => null)
  const portalTarget = isDesktop ? slot : null

  const box = <RequirementsBox>{children}</RequirementsBox>

  return (
    <>
      {/* 在移动端内联显示 */}
      <div className="block xl:hidden mt-8">{box}</div>

      {/* 在桌面端通过 portal 渲染到侧边栏中 */}
      {portalTarget ? createPortal(<div className="mt-8">{box}</div>, portalTarget) : null}
    </>
  )
}

function RequirementsBox({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar.Track>
        <Sidebar.Group>
          <Sidebar.GroupTitle>要求</Sidebar.GroupTitle>
          {React.Children.map(children, (child, idx) => (
            <React.Fragment key={idx}>{child}</React.Fragment>
          ))}
        </Sidebar.Group>
      </Sidebar.Track>
    </div>
  )
}
