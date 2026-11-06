import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'collaboration',
  rootHref: '/collaboration/getting-started/overview',
  title: '协作',
  items: [
    {
      type: 'group',
      href: '/collaboration/getting-started',
      title: '快速入门',
      children: [
        {
          title: '概览',
          href: '/collaboration/getting-started/overview',
        },
        {
          title: '安装',
          href: '/collaboration/getting-started/install',
        },
        {
          title: '身份验证',
          href: '/collaboration/getting-started/authenticate',
        },
      ],
    },
    {
      type: 'group',
      href: '/collaboration/provider',
      title: '提供方',
      children: [
        {
          title: '集成',
          href: '/collaboration/provider/integration',
        },
        {
          title: '事件',
          href: '/collaboration/provider/events',
        },
      ],
    },
    {
      type: 'group',
      href: '/collaboration/core-concepts',
      title: '功能',
      children: [
        {
          title: '感知',
          href: '/collaboration/core-concepts/awareness',
        },
        {
          title: 'Webhooks',
          href: '/collaboration/core-concepts/webhooks',
          tags: ['团队'],
        },
      ],
    },
    {
      type: 'group',
      href: '/collaboration/documents',
      title: '文档',
      children: [
        {
          title: '概览',
          href: '/collaboration/documents',
        },
        {
          title: 'REST API',
          href: '/collaboration/documents/rest-api',
        },
        {
          title: '快照',
          href: '/collaboration/documents/snapshot',
          tags: ['入门'],
        },
        {
          title: '比较快照',
          href: '/collaboration/documents/snapshot-compare',
          tags: ['团队'],
        },
        {
          title: '注入内容',
          href: '/collaboration/documents/content-injection',
          tags: ['团队'],
        },
      ],
    },
    {
      type: 'group',
      href: '/collaboration/operations',
      title: '运维',
      children: [
        {
          title: '配置运行时',
          href: '/collaboration/operations/configure',
        },
        {
          title: '指标',
          href: '/collaboration/operations/metrics',
        },
      ],
    },
  ],
}