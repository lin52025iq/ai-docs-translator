import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'tracked-changes',
  rootHref: '/tracked-changes/getting-started/overview',
  title: '修订',
  items: [
    {
      type: 'group',
      href: '/tracked-changes/getting-started',
      title: '入门',
      children: [
        {
          title: '概述',
          href: '/tracked-changes/getting-started/overview',
        },
        {
          title: '安装',
          href: '/tracked-changes/getting-started/install',
        },
      ],
    },
    {
      type: 'group',
      href: '/tracked-changes/usage',
      title: '用法',
      children: [
        {
          title: '基本用法',
          href: '/tracked-changes/usage/basic-usage',
        },
        {
          title: '高级用法',
          href: '/tracked-changes/usage/advanced-usage',
        },
      ],
    },
    {
      type: 'group',
      href: '/tracked-changes/guides',
      title: '指南',
      children: [
        {
          title: '创建编辑器',
          href: '/tracked-changes/guides/editor-setup',
        },
        {
          title: '构建建议列表',
          href: '/tracked-changes/guides/suggestion-list',
        },
        {
          title: '将修订与批注结合使用',
          href: '/tracked-changes/guides/comments-integration',
        },
        {
          title: '使用 NodeViews',
          href: '/tracked-changes/guides/nodeview-support',
        },
      ],
    },
    {
      type: 'group',
      href: '/tracked-changes/examples',
      title: '示例',
      children: [
        {
          title: '简单修订',
          href: '/tracked-changes/examples/simple',
        },
        {
          title: '协作',
          href: '/tracked-changes/examples/collaboration',
        },
        {
          title: '批注',
          href: '/tracked-changes/examples/comments',
        },
      ],
    },
    {
      type: 'group',
      href: '/conversion',
      title: 'DOCX 转换',
      children: [
        {
          title: '导入修订',
          href: '/conversion/import/docx/tracked-changes',
        },
        {
          title: '导出修订',
          href: '/conversion/export/docx/tracked-changes',
        },
      ],
    },
    {
      type: 'group',
      href: '/tracked-changes/api-reference',
      title: 'API 参考',
      children: [
        {
          title: '命令',
          href: '/tracked-changes/api-reference/commands',
        },
        {
          title: '事件',
          href: '/tracked-changes/api-reference/events',
        },
        {
          title: '实用工具',
          href: '/tracked-changes/api-reference/utilities',
        },
        {
          title: '类型',
          href: '/tracked-changes/api-reference/types',
        },
        {
          title: '样式',
          href: '/tracked-changes/api-reference/styling',
        },
      ],
    },
  ],
}
