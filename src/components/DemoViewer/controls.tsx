'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/utils'

type Tone = 'light' | 'dark'

/** 悬停或键盘聚焦时显示在控件下方的提示。控件本身提供名称。 */
const Tip = ({ label, align = 'center' }: { label: string; align?: 'center' | 'end' }) => (
  <span
    aria-hidden
    className={cn(
      'pointer-events-none absolute top-full z-20 mt-1.5 whitespace-nowrap rounded-md bg-grayAlpha-900 px-1.5 py-1 text-[0.6875rem] font-medium leading-none text-white opacity-0 transition-opacity delay-0',
      'group-hover/tip:opacity-100 group-hover/tip:delay-300 group-focus-visible/tip:opacity-100',
      align === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-0',
    )}
  >
    {label}
  </span>
)

export type ControlButtonProps = {
  /** 无障碍名称；未设置 `tooltip` 时也用作提示文本。 */
  label: string
  tooltip?: string
  tipAlign?: 'center' | 'end'
  isActive?: boolean
  tone?: Tone
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

/** 用于演示栏和代码标题栏的小按钮：可显示图标，或图标与简短文字。 */
export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(
  ({ label, tooltip, tipAlign, isActive, tone = 'light', className, children, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        'group/tip relative inline-flex h-7 min-w-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-1.5 text-xs font-semibold transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-purple-600',
        '[&_svg]:size-3.5 [&_svg]:shrink-0',
        tone === 'light'
          ? isActive
            ? 'bg-white text-grayAlpha-900 shadow-sm ring-1 ring-grayAlpha-200 [&_svg]:text-purple-600'
            : 'text-grayAlpha-500 hover:bg-grayAlpha-100 hover:text-grayAlpha-900'
          : isActive
            ? 'bg-whiteAlpha-200 text-white'
            : 'text-whiteAlpha-600 hover:bg-whiteAlpha-100 hover:text-white',
        className,
      )}
      {...rest}
    >
      {children}
      <Tip label={tooltip ?? label} align={tipAlign} />
    </button>
  ),
)

ControlButton.displayName = 'ControlButton'

/** 外观与控件按钮相同的链接，例如“新标签页”或 GitHub 源码链接。 */
export const ControlLink = ({
  label,
  tooltip,
  tipAlign,
  tone = 'light',
  className,
  children,
  ...rest
}: {
  label: string
  tooltip?: string
  tipAlign?: 'center' | 'end'
  tone?: Tone
  children: ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    aria-label={label}
    className={cn(
      'group/tip relative inline-flex h-7 min-w-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-1.5 text-xs font-semibold transition-colors',
      'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-purple-600',
      '[&_svg]:size-3.5 [&_svg]:shrink-0',
      tone === 'light'
        ? 'text-grayAlpha-500 hover:bg-grayAlpha-100 hover:text-grayAlpha-900'
        : 'text-whiteAlpha-600 hover:bg-whiteAlpha-100 hover:text-white',
      className,
    )}
    {...rest}
  >
    {children}
    <Tip label={tooltip ?? label} align={tipAlign} />
  </a>
)

/** 一组按钮，其中一个处于选中状态，例如“预览 / 代码 / 两者”。 */
export const Segmented = ({
  label,
  tone = 'light',
  className,
  children,
}: {
  label: string
  tone?: Tone
  className?: string
  children: ReactNode
}) => (
  <div
    role="group"
    aria-label={label}
    className={cn(
      'inline-flex shrink-0 items-center gap-0.5 rounded-lg p-0.5',
      tone === 'light' ? 'bg-grayAlpha-100' : 'bg-whiteAlpha-50',
      className,
    )}
  >
    {children}
  </div>
)

