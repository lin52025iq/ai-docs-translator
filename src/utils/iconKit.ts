import * as Icons from 'lucide-react'
import { createElement } from 'react'

export const iconKit: Record<string, any> = Icons

export const getIcon = (name?: string | null) => {
  if (!name || !iconKit[name]) {
    return Icons.Quote
  }

  return iconKit[name]
}

/** 渲染名为 `name` 的图标；未提供时使用 Quote 图标。 */
export const IconByName = ({
  name,
  ...props
}: { name?: string | null } & Omit<Icons.LucideProps, 'name'>) =>
  createElement(getIcon(name), props)
