import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'examples',
  rootHref: '/examples',
  title: '示例',
  items: [
    {
      type: 'group',
      title: '入门',
      href: '/examples',
      children: [
        {
          href: '/examples',
          title: '概览',
        },
      ],
    },
    {
      type: 'group',
      href: '',
      title: '基础',
      children: [
        {
          title: '默认文本编辑器',
          href: '/examples/basics/default-text-editor',
        },
        {
          title: '格式设置',
          href: '/examples/basics/formatting',
        },
        {
          title: '图片',
          href: '/examples/basics/images',
        },
        {
          title: '长文本',
          href: '/examples/basics/long-texts',
        },
        {
          title: 'Markdown 快捷键',
          href: '/examples/basics/markdown-shortcuts',
        },
        {
          title: '最简配置',
          href: '/examples/basics/minimal-setup',
        },
        {
          title: '表格',
          href: '/examples/basics/tables',
        },
        {
          title: '任务',
          href: '/examples/basics/tasks',
        },
        {
          title: '文本方向与 RTL 支持',
          href: '/examples/basics/text-direction',
        },
      ],
    },
    {
      type: 'group',
      href: '',
      title: '高级',
      children: [
        {
          title: '智能编辑器',
          href: '/examples/advanced/clever-editor',
        },
        {
          title: '协同编辑',
          href: '/examples/advanced/collaborative-editing',
        },
        {
          title: '绘图',
          href: '/examples/advanced/drawing',
        },
        {
          title: '强制内容结构',
          href: '/examples/advanced/forced-content-structure',
        },
        {
          title: '交互式 React 和 Vue 视图',
          href: '/examples/advanced/interactive-react-and-vue-views',
        },
        {
          title: 'React 性能',
          href: '/examples/advanced/react-performance',
        },
        {
          title: '菜单',
          href: '/examples/advanced/menus',
        },
        {
          title: '提及',
          href: '/examples/advanced/mentions',
        },
        {
          title: '语法高亮',
          href: '/examples/advanced/syntax-highlighting',
        },
      ],
    },
    {
      type: 'group',
      href: '',
      title: '实验',
      children: [
        {
          title: '协作字段',
          href: '/examples/experiments/collaborative-fields',
        },
        {
          title: '图形',
          href: '/examples/experiments/figure',
        },
        {
          title: '通用图形',
          href: '/examples/experiments/generic-figure',
        },
        {
          title: 'iFrame',
          href: '/examples/experiments/iframe',
        },
        {
          title: '代码检查',
          href: '/examples/experiments/linting',
        },
        {
          title: '斜杠命令',
          href: '/examples/experiments/slash-commands',
        },
      ],
    },
  ],
}
