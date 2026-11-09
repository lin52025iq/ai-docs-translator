'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils'

/** 在整个文档中，代码块在显示“显示全部”之前展示的高度。 */
export const CODE_COLLAPSED_HEIGHT = 448

/**
 * 长代码块会显示开头 `collapsedHeight` 像素，并带有“显示全部”栏。读者也可以在代码框内滚动；
 * 滚动到末尾后，栏上方的渐隐效果会消失。ref 需要绑定到裁剪代码的元素；只有内容超出可显示范围时才会显示该栏，
 * 因此短代码块不会显示。`collapsedHeight` 为 null 时会显示全部内容。
 */
export const useCodeCollapse = <T extends HTMLElement>(collapsedHeight: number | null) => {
  const ref = useRef<T | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const [atEnd, setAtEnd] = useState(false)
  const isCollapsed = collapsedHeight !== null && !isOpen

  useEffect(() => {
    const element = ref.current
    if (!element || !isCollapsed) return
    const measure = () => {
      setOverflows(element.scrollHeight > element.clientHeight + 1)
      setAtEnd(element.scrollTop + element.clientHeight >= element.scrollHeight - 1)
    }
    element.addEventListener('scroll', measure, { passive: true })
    // 首次渲染后代码可能会发生变化（语法高亮、切换文件或原地更新文本）
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    const mutation = new MutationObserver(measure)
    mutation.observe(element, { childList: true, characterData: true, subtree: true })
    measure()
    return () => {
      element.removeEventListener('scroll', measure)
      resize.disconnect()
      mutation.disconnect()
    }
  }, [isCollapsed])

  // ref 与状态分开返回，这样读取状态时读到的就不是 ref
  return [
    ref,
    {
      isOpen,
      isCollapsed,
      isFaded: isCollapsed && !atEnd,
      hasBar: collapsedHeight !== null && (overflows || isOpen),
      toggle: () => setIsOpen((open) => !open),
    },
  ] as const
}

/** 折叠代码块下方的栏；栏上方的渐隐效果提示还有更多内容。 */
export const CodeCollapseBar = ({
  isOpen,
  isFaded = !isOpen,
  onToggle,
  className,
}: {
  isOpen: boolean
  /** 提示下方还有代码的渐隐效果；读者滚动到末尾后会消失。 */
  isFaded?: boolean
  onToggle: () => void
  className?: string
}) => (
  <button
    type="button"
    aria-expanded={isOpen}
    onClick={onToggle}
    className={cn(
      'relative flex w-full shrink-0 items-center justify-center gap-1.5 border-t border-whiteAlpha-100 py-2 text-xs font-semibold text-whiteAlpha-700 transition-colors hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-purple-600',
      !isFaded
        ? undefined
        : 'before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-12 before:bg-linear-to-t before:from-black before:to-transparent',
      className,
    )}
  >
    {isOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
    {isOpen ? '收起' : '显示全部'}
  </button>
)
