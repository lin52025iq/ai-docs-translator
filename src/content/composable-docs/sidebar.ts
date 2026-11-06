import type { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'composable-docs',
  title: '可组合文档',
  rootHref: '/composable-docs/slots/getting-started/overview',
  items: [
    {
      type: 'group',
      title: '插槽',
      href: '/composable-docs/slots',
      children: [
        { title: '概览', href: '/composable-docs/slots/getting-started/overview' },
        {
          title: '指南',
          href: '/composable-docs/slots/guides/add-slots',
          children: [
            {
              title: '向文档添加插槽',
              href: '/composable-docs/slots/guides/add-slots',
            },
            { title: '仅允许填写', href: '/composable-docs/slots/guides/fill-only' },
            { title: '值插槽', href: '/composable-docs/slots/guides/value-slots' },
            {
              title: '验证插槽值',
              href: '/composable-docs/slots/guides/validate-submission',
            },
          ],
        },
        {
          title: '示例',
          href: '/composable-docs/slots/examples/table-fields',
          children: [
            { title: '表格字段示例', href: '/composable-docs/slots/examples/table-fields' },
          ],
        },
        {
          title: 'API 参考',
          href: '/composable-docs/slots/api-reference/extension',
          children: [
            {
              title: '扩展',
              href: '/composable-docs/slots/api-reference/extension',
            },
            { title: '命令', href: '/composable-docs/slots/api-reference/commands' },
            { title: '验证', href: '/composable-docs/slots/api-reference/validation' },
            { title: '实用工具', href: '/composable-docs/slots/api-reference/utilities' },
            { title: '类型', href: '/composable-docs/slots/api-reference/types' },
            { title: '配置', href: '/composable-docs/slots/api-reference/concepts' },
            {
              title: '样式',
              href: '/composable-docs/slots/api-reference/rendering',
            },
            { title: '编辑器事件', href: '/composable-docs/slots/api-reference/events' },
          ],
        },
      ],
    },
    {
      type: 'group',
      title: '变量',
      href: '/composable-docs/variables',
      children: [
        { title: '概览', href: '/composable-docs/variables/getting-started/overview' },
        { title: '插槽绑定', href: '/composable-docs/variables/guides/bind-slots' },
        { title: 'API 参考', href: '/composable-docs/variables/api-reference/extension' },
        {
          title: '样式',
          href: '/composable-docs/variables/api-reference/rendering',
        },
      ],
    },
    {
      type: 'group',
      title: '内容保护',
      href: '/composable-docs/content-protection',
      children: [
        { title: '概览', href: '/composable-docs/content-protection/getting-started/overview' },
        {
          title: '指南',
          href: '/composable-docs/content-protection/guides/example-policies',
          children: [
            {
              title: '策略示例',
              href: '/composable-docs/content-protection/guides/example-policies',
            },
            {
              title: '锁定所选内容',
              href: '/composable-docs/content-protection/guides/lock-selected-content',
            },
          ],
        },
        {
          title: 'API 参考',
          href: '/composable-docs/content-protection/api-reference/extension',
          children: [
            {
              title: '扩展',
              href: '/composable-docs/content-protection/api-reference/extension',
            },
            {
              title: '命令',
              href: '/composable-docs/content-protection/api-reference/commands',
            },
            {
              title: '实用工具',
              href: '/composable-docs/content-protection/api-reference/utilities',
            },
            { title: '类型', href: '/composable-docs/content-protection/api-reference/types' },
            {
              title: '策略语言',
              href: '/composable-docs/content-protection/api-reference/policy',
            },
            {
              title: '已隐藏内容',
              href: '/composable-docs/content-protection/api-reference/rendering',
            },
          ],
        },
      ],
    },
  ],
}
