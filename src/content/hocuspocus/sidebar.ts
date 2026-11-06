import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'hocuspocus',
  rootHref: '/hocuspocus/getting-started/overview',
  title: 'Hocuspocus',
  items: [
    {
      type: 'group',
      href: '/hocuspocus/getting-started',
      title: '开始使用',
      children: [
        {
          title: '概览',
          href: '/hocuspocus/getting-started/overview',
        },
        {
          title: '关于项目',
          href: '/hocuspocus/getting-started/sponsor',
        },
        {
          title: '参与贡献',
          href: '/hocuspocus/getting-started/contributing',
        },
        {
          title: '升级指南',
          href: '/hocuspocus/getting-started/upgrade',
        },
      ],
    },
    {
      type: 'group',
      href: '/hocuspocus/provider',
      title: '提供者',
      children: [
        {
          title: '概览',
          href: '/hocuspocus/provider/overview',
        },
        {
          title: '安装',
          href: '/hocuspocus/provider/install',
        },
        {
          title: '配置',
          href: '/hocuspocus/provider/configuration',
        },
        {
          title: '事件',
          href: '/hocuspocus/provider/events',
        },
        {
          title: 'React',
          href: '/hocuspocus/provider/react',
        },
        {
          title: '示例',
          href: '/hocuspocus/provider/examples',
        },
      ],
    },
    {
      type: 'group',
      href: '/hocuspocus/server',
      title: '服务器',
      children: [
        {
          title: '配置',
          href: '/hocuspocus/server/configuration',
        },
        {
          title: '钩子',
          href: '/hocuspocus/server/hooks',
        },
        {
          title: '用法',
          href: '/hocuspocus/server/usage',
        },
        {
          title: '示例',
          href: '/hocuspocus/server/examples',
        },
      ],
    },
    {
      type: 'group',
      href: '/hocuspocus/server/extensions',
      title: '服务器扩展',
      children: [
        {
          title: '概览',
          href: '/hocuspocus/server/extensions/overview',
        },
        {
          title: '数据库',
          href: '/hocuspocus/server/extensions/database',
        },
        {
          title: '日志记录器',
          href: '/hocuspocus/server/extensions/logger',
        },
        {
          title: 'Redis',
          href: '/hocuspocus/server/extensions/redis',
        },
        {
          title: 'SQLite',
          href: '/hocuspocus/server/extensions/sqlite',
        },
        {
          title: '限流',
          href: '/hocuspocus/server/extensions/throttle',
        },
        {
          title: 'Webhook',
          href: '/hocuspocus/server/extensions/webhook',
        },
        {
          title: 'S3',
          href: '/hocuspocus/server/extensions/s3',
        },
      ],
    },
    {
      type: 'group',
      href: '/hocuspocus/guides',
      title: '指南',
      children: [
        {
          title: '身份验证',
          href: '/hocuspocus/guides/authentication',
        },
        {
          title: '持久化',
          href: '/hocuspocus/guides/persistence',
        },
        {
          title: '协同编辑',
          href: '/hocuspocus/guides/collaborative-editing',
        },
        {
          title: '自定义扩展',
          href: '/hocuspocus/guides/custom-extensions',
        },
        {
          title: '感知',
          href: '/hocuspocus/guides/awareness',
        },
        {
          title: '多个子文档',
          href: '/hocuspocus/guides/multi-subdocuments',
        },
        {
          title: '可扩展性',
          href: '/hocuspocus/guides/scalability',
        },
      ],
    },
  ],
}
