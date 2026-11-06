import type { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'compare',
  rootHref: '/compare/getting-started/overview',
  title: '比较',
  items: [
    {
      type: 'group',
      href: '/compare/getting-started',
      title: '开始使用',
      children: [{ title: '概览', href: '/compare/getting-started/overview' }],
    },
    {
      type: 'group',
      href: '/compare/guides',
      title: '指南',
      children: [
        { title: '比较文档', href: '/compare/guides/compare-documents' },
        { title: '比较版本', href: '/compare/guides/compare-versions' },
        {
          title: '服务器端比较',
          href: '/compare/guides/server-compare',
        },
        { title: '使用修订跟踪', href: '/compare/guides/tracked-changes' },
        { title: '分屏视图', href: '/compare/guides/split-view' },
      ],
    },
    {
      type: 'group',
      href: '/compare/api-reference',
      title: 'API 参考',
      children: [
        { title: '命令', href: '/compare/api-reference/commands' },
        { title: '工具函数', href: '/compare/api-reference/utilities' },
        { title: '类型', href: '/compare/api-reference/types' },
        { title: '样式', href: '/compare/api-reference/styling' },
      ],
    },
  ],
}
