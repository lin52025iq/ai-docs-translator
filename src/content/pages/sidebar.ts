import type { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'pages',
  rootHref: '/pages/getting-started/overview',
  title: '分页',
  items: [
    {
      type: 'group',
      href: '/pages/getting-started',
      title: '快速入门',
      children: [
        {
          title: '概览',
          href: '/pages/getting-started/overview',
        },
        {
          title: '安装',
          href: '/pages/getting-started/install',
        },
        {
          title: '在线演示',
          href: '/pages/getting-started/live-demo',
          tags: ['新'],
        },
      ],
    },
    {
      type: 'group',
      href: '/pages/core-concepts',
      title: '核心概念',
      children: [
        {
          title: '选项',
          href: '/pages/core-concepts/options',
        },
        {
          title: '页面格式',
          href: '/pages/core-concepts/page-format',
        },
        {
          title: '页眉和页脚',
          href: '/pages/core-concepts/page-header-footer',
        },
        {
          title: '脚注',
          href: '/pages/core-concepts/footnotes',
          tags: ['新'],
        },
        {
          title: '尾注',
          href: '/pages/core-concepts/endnotes',
          tags: ['新'],
        },
        {
          title: '页面间距和背景',
          href: '/pages/core-concepts/page-gap',
        },
        {
          title: '缩放',
          href: '/pages/core-concepts/zoom',
          tags: ['新'],
        },
        {
          title: 'PageBreak 节点',
          href: '/pages/core-concepts/page-break-node',
          tags: ['新'],
        },
        {
          title: '布局参与者',
          href: '/pages/core-concepts/layout-participants',
          tags: ['新'],
        },
        {
          title: '限制',
          href: '/pages/core-concepts/limitations',
        },
      ],
    },
    {
      type: 'group',
      href: '/pages/utilities',
      title: '工具',
      children: [
        {
          title: '页面格式',
          href: '/pages/utilities/page-formats',
        },
        {
          title: 'cmToPixels',
          href: '/pages/utilities/cm-to-pixels',
        },
        {
          title: 'inchToPixels',
          href: '/pages/utilities/inch-to-pixels',
        },
      ],
    },
    {
      type: 'group',
      href: '/pages/guides',
      title: '指南',
      children: [
        {
          title: '从零开始，制作可供印刷的页面',
          href: '/pages/guides/zero-to-print-ready',
        },
        {
          title: '带表格的页面',
          href: '/pages/guides/table-with-pages',
        },
        {
          title: 'PagesTableKit',
          href: '/pages/guides/pages-tablekit',
          tags: ['实验性'],
        },
        {
          title: '跨页断点的行',
          href: '/pages/guides/row-fragmentation',
          tags: ['实验性'],
        },
        {
          title: 'PageKit',
          href: '/pages/guides/pagekit-usage',
        },
        {
          title: '为 Pages 添加协作功能',
          href: '/pages/guides/collaboration-with-pages',
        },
      ],
    },
  ],
}
