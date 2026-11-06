import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'ui components',
  rootHref: '/ui-components/getting-started/',
  title: '组件',
  items: [
    {
      type: 'group',
      href: '/ui-components/getting-started/overview',
      title: '入门',
      children: [
        {
          title: '概览',
          href: '/ui-components/getting-started/overview',
        },
        {
          title: '安装',
          href: '/ui-components/install/next',
          children: [
            {
              title: 'Next.js',
              href: '/ui-components/install/next',
            },
            {
              title: 'Vite',
              href: '/ui-components/install/vite',
            },
            {
              title: 'React Router',
              href: '/ui-components/install/react-router',
            },
            {
              title: 'Laravel',
              href: '/ui-components/install/laravel',
            },
            {
              title: 'Astro',
              href: '/ui-components/install/astro',
            },
            {
              title: '手动安装',
              href: '/ui-components/install/manual',
            },
          ],
        },
        {
          title: '样式',
          href: '/ui-components/getting-started/style',
        },
        {
          title: 'CLI',
          href: '/ui-components/getting-started/cli',
        },
        {
          href: '/ui-components/getting-started/changelog',
          title: '更新日志',
        },
      ],
    },
    {
      type: 'group',
      href: '/ui-components/templates',
      title: '模板',
      children: [
        {
          title: '简易编辑器',
          href: '/ui-components/templates/simple-editor',
          tags: ['MIT 许可'],
        },
        {
          title: 'Notion 风格编辑器',
          href: '/ui-components/templates/notion-like-editor',
          tags: ['入门版'],
        },
        {
          title: 'DOCX 编辑器',
          href: '/ui-components/templates/docx-editor',
          tags: ['团队版'],
        },
      ],
    },
    {
      type: 'group',
      href: '/ui-components/components',
      title: 'UI 组件',
      children: [
        {
          title: '概览',
          href: '/ui-components/components/overview',
        },
        {
          title: '组件',
          href: '/ui-components/components/',
          children: [
            {
              title: 'AI 提问按钮',
              href: '/ui-components/components/ai-ask-button',
            },
            {
              title: 'AI 菜单',
              href: '/ui-components/components/ai-menu',
            },
            {
              title: '引用块按钮',
              href: '/ui-components/components/blockquote-button',
            },
            {
              title: '代码块按钮',
              href: '/ui-components/components/code-block-button',
            },
            {
              title: '颜色高亮按钮',
              href: '/ui-components/components/color-highlight-button',
            },
            {
              title: '颜色高亮弹出框',
              href: '/ui-components/components/color-highlight-popover',
            },
            {
              title: '文字颜色按钮',
              href: '/ui-components/components/color-text-button',
            },
            {
              title: '文字颜色弹出框',
              href: '/ui-components/components/color-text-popover',
            },
            {
              title: '复制锚点链接按钮',
              href: '/ui-components/components/copy-anchor-link-button',
            },
            {
              title: '复制到剪贴板按钮',
              href: '/ui-components/components/copy-to-clipboard-button',
            },
            {
              title: '删除节点按钮',
              href: '/ui-components/components/delete-node-button',
            },
            {
              title: '拖动上下文菜单',
              href: '/ui-components/components/drag-context-menu',
            },
            {
              title: '复制按钮',
              href: '/ui-components/components/duplicate-button',
            },
            {
              title: '表情符号下拉菜单',
              href: '/ui-components/components/emoji-dropdown-menu',
            },
            {
              title: '表情符号菜单',
              href: '/ui-components/components/emoji-menu',
            },
            {
              title: '表情符号触发按钮',
              href: '/ui-components/components/emoji-trigger-button',
            },
            {
              title: '字体系列组合框',
              href: '/ui-components/components/font-family-combobox',
            },
            {
              title: '标题按钮',
              href: '/ui-components/components/heading-button',
            },
            {
              title: '标题下拉菜单',
              href: '/ui-components/components/heading-dropdown-menu',
            },
            {
              title: '图片对齐按钮',
              href: '/ui-components/components/image-align-button',
            },
            {
              title: '图片上传按钮',
              href: '/ui-components/components/image-upload-button',
            },
            {
              title: '改进下拉菜单',
              href: '/ui-components/components/improve-dropdown',
            },
            {
              title: '链接弹出框',
              href: '/ui-components/components/link-popover',
            },
            {
              title: '列表按钮',
              href: '/ui-components/components/list-button',
            },
            {
              title: '列表下拉菜单',
              href: '/ui-components/components/list-dropdown-menu',
            },
            {
              title: '标记按钮',
              href: '/ui-components/components/mark-button',
            },
            {
              title: '提及下拉菜单',
              href: '/ui-components/components/mention-dropdown-menu',
            },
            {
              title: '提及触发按钮',
              href: '/ui-components/components/mention-trigger-button',
            },
            {
              title: '移动节点按钮',
              href: '/ui-components/components/move-node-button',
            },
            {
              title: '编号格式下拉菜单',
              href: '/ui-components/components/numbering-format-dropdown-menu',
            },
            {
              title: '重置所有格式按钮',
              href: '/ui-components/components/reset-all-formatting-button',
            },
            {
              title: '查找和替换',
              href: '/ui-components/components/search-and-replace',
            },
            {
              title: '斜杠命令触发按钮',
              href: '/ui-components/components/slash-command-trigger-button',
            },
            {
              title: '斜杠下拉菜单',
              href: '/ui-components/components/slash-dropdown-menu',
            },
            {
              title: '文本对齐按钮',
              href: '/ui-components/components/text-align-button',
            },
            {
              title: '文本按钮',
              href: '/ui-components/components/text-button',
            },
            {
              title: '转换为下拉菜单',
              href: '/ui-components/components/turn-into-dropdown',
            },
            {
              title: '撤销/重做按钮',
              href: '/ui-components/components/undo-redo-button',
            },
            {
              title: '缩放下拉菜单',
              href: '/ui-components/components/zoom-dropdown-menu',
            },
          ],
        },
        {
          title: '节点组件',
          href: '/ui-components/node-components',
          children: [
            {
              title: '引用块节点',
              href: '/ui-components/node-components/blockquote-node',
            },
            {
              title: '代码块节点',
              href: '/ui-components/node-components/code-block-node',
            },
            {
              title: '标题节点',
              href: '/ui-components/node-components/heading-node',
            },
            {
              title: '水平分割线节点',
              href: '/ui-components/node-components/horizontal-rule-node',
            },
            {
              title: '图片节点',
              href: '/ui-components/node-components/image-node',
            },
            {
              title: '图片节点 Pro',
              href: '/ui-components/node-components/image-node-pro',
            },
            {
              title: '图片上传节点',
              href: '/ui-components/node-components/image-upload-node',
            },
            {
              title: '列表节点',
              href: '/ui-components/node-components/list-node',
            },
            {
              title: '段落节点',
              href: '/ui-components/node-components/paragraph-node',
            },
            {
              title: '表格节点',
              href: '/ui-components/node-components/table-node',
            },
            {
              title: '目录节点',
              href: '/ui-components/node-components/table-of-contents-node',
            },
          ],
        },
        {
          title: '基础组件',
          href: '/ui-components/primitives',
          children: [
            {
              title: '头像',
              href: '/ui-components/primitives/avatar',
            },
            {
              title: '徽标',
              href: '/ui-components/primitives/badge',
            },
            {
              title: '按钮',
              href: '/ui-components/primitives/button',
            },
            {
              title: '卡片',
              href: '/ui-components/primitives/card',
            },
            {
              title: '组合框',
              href: '/ui-components/primitives/combobox',
            },
            {
              title: '下拉菜单',
              href: '/ui-components/primitives/dropdown-menu',
            },
            {
              title: '输入框',
              href: '/ui-components/primitives/input',
            },
            {
              title: '标签',
              href: '/ui-components/primitives/label',
            },
            {
              title: '菜单',
              href: '/ui-components/primitives/menu',
            },
            {
              title: '弹出框',
              href: '/ui-components/primitives/popover',
            },
            {
              title: '分隔符',
              href: '/ui-components/primitives/separator',
            },
            {
              title: '间距组件',
              href: '/ui-components/primitives/spacer',
            },
            {
              title: '自适应文本域',
              href: '/ui-components/primitives/textarea-autosize',
            },
            {
              title: '工具栏',
              href: '/ui-components/primitives/toolbar',
            },
            {
              title: '工具提示',
              href: '/ui-components/primitives/tooltip',
            },
          ],
        },
        {
          title: '实用组件',
          href: '/ui-components/utils-components',
          children: [
            {
              title: '浮动元素',
              href: '/ui-components/utils-components/floating-element',
            },
            {
              title: '建议菜单',
              href: '/ui-components/utils-components/suggestion-menu',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      title: '资源',
      href: '/ui-components/resources',
      children: [
        {
          href: 'https://tiptap.dev/pro-license',
          title: 'Pro 许可证',
        },
      ],
    },
  ],
}
