'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Fragment, useMemo } from 'react'
import { NavLink } from './NavLink'
import { NavLinkButton } from './ui/NavLinkButton'
import { cn } from '@/utils'

const options = [
  { label: '编辑器', href: '/editor/getting-started/overview', dividerBelow: true },
  { label: 'AI 工具包', href: '/ai/ai-toolkit/overview' },
  { label: '协作', href: '/collaboration/getting-started/overview' },
  { label: '评论', href: '/comments/getting-started/overview' },
  { label: '比较', href: '/compare/getting-started/overview' },
  { label: '可组合文档', href: '/composable-docs/slots/getting-started/overview' },
  { label: '转换', href: '/conversion/getting-started/overview' },
  { label: '页面', href: '/pages/getting-started/overview' },
  { label: '快照', href: '/collaboration/documents/snapshot' },
  { label: '修订', href: '/tracked-changes/getting-started/overview' },
]

export const ProductDropdown = () => {
  const pathname = usePathname()

  const activeItem = useMemo(() => {
    return options.find((option) => {
      if (option.href === '/') {
        return pathname === '/'
      } else {
        const firstPart = option.href.split('/')[1]
        return pathname.startsWith(`/${firstPart}`)
      }
    })
  }, [pathname])

  const buttonClass = cn('text-base outline-none', !!activeItem ? 'font-semibold' : 'font-normal')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <NavLinkButton className={buttonClass}>
          {activeItem?.label || '所有文档'}
          <ChevronDownIcon className="w-3 h-3" />
        </NavLinkButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="flex flex-col gap-6 z-50 py-6 px-2 lg:py-3 text-black bg-white border rounded-lg shadow-md border-grayAlpha-100 w-[14rem] lg:w-[11.5rem]">
          <div>
            <div className="uppercase font-bold leading-[120%] text-xs mb-3 px-2 block lg:hidden">
              文档
            </div>
            {options.map((option) => (
              <Fragment key={option.href}>
                <DropdownMenu.Item asChild>
                  <NavLink href={option.href}>{option.label}</NavLink>
                </DropdownMenu.Item>
                {option.dividerBelow ? (
                  <DropdownMenu.Separator className="my-2 mx-2.5 h-px bg-grayAlpha-200" />
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="block lg:hidden">
            <div className="uppercase font-bold leading-[120%] text-xs px-2 mb-3 block lg:hidden">
              其他
            </div>
            <NavLink href="/guides">指南</NavLink>
            <NavLink href="/examples">示例</NavLink>
            <NavLink href="/ui-components/getting-started/overview">UI 组件</NavLink>
            <NavLink href="https://tiptap.dev" target="_blank">
              网站
            </NavLink>
          </div>
          <div className="block lg:hidden">
            <NavLink
              variant="invert"
              href="https://cloud.tiptap.dev/register"
              target="_blank"
              className="text-center justify-center items-center"
              hideIcon
            >
              注册
            </NavLink>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
