import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'guides',
  rootHref: '/guides',
  title: '指南',
  items: [
    {
      title: '入门',
      href: '',
      type: 'group',
      children: [
        {
          href: '/guides/pro-extensions',
          title: '集成 Pro 扩展',
        },
      ],
    },
    {
      title: '基础指南',
      type: 'group',
      href: '',
      children: [
        {
          href: '/guides/faq',
          title: '常见问题',
        },
        {
          href: '/guides/accessibility',
          title: '无障碍访问',
        },
        {
          href: '/guides/performance',
          title: '性能',
        },
        {
          href: '/guides/find-and-replace',
          title: '查找和替换 UI',
        },
        {
          href: '/guides/spellcheck',
          title: '拼写检查',
        },
        {
          href: '/guides/react-composable-api',
          title: 'React 组合式 API',
        },
        {
          href: '/guides/invalid-schema',
          title: '无效 schema 处理',
        },
        {
          href: '/guides/output-json-html',
          title: '导出 JSON 或 HTML',
        },
        {
          href: '/guides/authentication',
          title: '协作身份验证',
        },
        {
          href: '/guides/naming-documents',
          title: '文档命名',
        },
        {
          href: '/guides/offline-support',
          title: '离线协作',
        },
        {
          href: '/guides/upgrade-tiptap-v1',
          title: '升级 Tiptap V1',
        },
        {
          href: '/guides/upgrade-tiptap-v2',
          title: '升级 Tiptap V2',
        },
        {
          href: '/guides/collaboration-api',
          title: '协作 API',
        },
        {
          href: '/guides/mobile-apps',
          title: '移动应用',
          tags: ['实验性'],
        },
      ],
    },
    {
      title: '自定义',
      type: 'group',
      href: '',
      children: [
        {
          href: '/guides/typescript',
          title: '使用 TypeScript 扩展',
        },
        {
          href: '/guides/nested-node-view-content',
          title: '嵌套节点视图',
        },
        {
          href: '/guides/decorations-vanilla',
          title: '在原生 JS 中使用 Decorations 高亮术语',
        },
        {
          href: '/guides/decorations-react',
          title: '在 React 中使用 Decorations 高亮术语',
        },
        {
          href: '/guides/decorations-vue',
          title: '在 Vue 3 中使用 Decorations 高亮术语',
        },
      ],
    },
    {
      title: '迁移',
      type: 'group',
      href: '',
      children: [
        {
          href: '/guides/migrate-from-tinymce',
          title: '从 TinyMCE 迁移',
        },
        {
          href: '/guides/migrate-from-ckeditor4',
          title: '从 CKEditor 4 迁移',
        },
        {
          href: '/guides/migrate-from-ckeditor5',
          title: '从 CKEditor 5 迁移',
        },
        {
          href: '/guides/migrate-from-quill',
          title: '从 Quill 迁移',
        },
        {
          href: '/guides/migrate-from-slate',
          title: '从 Slate 迁移',
        },
        {
          href: '/guides/migrate-from-lexical',
          title: '从 Lexical 迁移',
        },
        {
          href: '/guides/migrate-from-editorjs',
          title: '从 Editor.js 迁移',
        },
        {
          href: '/guides/migrate-from-draftjs',
          title: '从 Draft.js 迁移',
        },
      ],
    },
  ],
}
