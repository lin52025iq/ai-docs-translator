import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'editor',
  rootHref: '/editor/getting-started/overview',
  title: '编辑器',
  items: [
    {
      type: 'group',
      href: '/editor/getting-started',
      title: '入门',
      children: [
        {
          title: '概览',
          href: '/editor/getting-started/overview',
        },
        {
          title: '安装',
          href: '/editor/getting-started/install',
          children: [
            {
              href: '/editor/getting-started/install/vanilla-javascript',
              title: '原生 JavaScript',
            },
            {
              href: '/editor/getting-started/install/react',
              title: 'React',
            },
            {
              href: '/editor/getting-started/install/nextjs',
              title: 'Next.js',
            },
            {
              href: '/editor/getting-started/install/vue3',
              title: 'Vue 3',
            },
            {
              href: '/editor/getting-started/install/vue2',
              title: 'Vue 2',
            },
            {
              href: '/editor/getting-started/install/nuxt',
              title: 'Nuxt',
            },
            {
              href: '/editor/getting-started/install/svelte',
              title: 'Svelte',
            },
            {
              href: '/editor/getting-started/install/alpine',
              title: 'Alpine',
            },
            {
              href: '/editor/getting-started/install/php',
              title: 'PHP',
            },
            {
              href: '/editor/getting-started/install/vanilla-javascript#without-a-build-tool-cdn',
              title: 'CDN',
            },
          ],
        },
        {
          title: '配置',
          href: '/editor/getting-started/configure',
        },
        {
          title: '样式',
          href: '/editor/getting-started/style-editor',
          children: [
            {
              href: '/editor/getting-started/style-editor/custom-menus',
              title: '自定义菜单',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      title: '扩展',
      href: '/editor/extensions',
      children: [
        {
          href: '/editor/extensions/overview',
          title: '概览',
        },
        {
          href: '/editor/extensions/nodes',
          title: '节点',
          children: [
            {
              href: '/editor/extensions/nodes/audio',
              title: '音频',
            },
            {
              href: '/editor/extensions/nodes/blockquote',
              title: '引用块',
            },
            {
              href: '/editor/extensions/nodes/bullet-list',
              title: '项目符号列表',
            },
            {
              href: '/editor/extensions/nodes/code-block',
              title: '代码块',
            },
            {
              href: '/editor/extensions/nodes/code-block-lowlight',
              title: '代码块（lowlight）',
            },
            {
              href: '/editor/extensions/nodes/details',
              title: '详情',
            },
            {
              href: '/editor/extensions/nodes/details-content',
              title: '详情内容',
            },
            {
              href: '/editor/extensions/nodes/details-summary',
              title: '详情摘要',
            },
            {
              href: '/editor/extensions/nodes/document',
              title: '文档',
            },
            {
              href: '/editor/extensions/nodes/emoji',
              title: '表情符号',
            },
            {
              href: '/editor/extensions/nodes/hard-break',
              title: '硬换行',
            },
            {
              href: '/editor/extensions/nodes/heading',
              title: '标题',
            },
            {
              href: '/editor/extensions/nodes/horizontal-rule',
              title: '水平分隔线',
            },
            {
              href: '/editor/extensions/nodes/image',
              title: '图像',
            },
            {
              href: '/editor/extensions/nodes/list-item',
              title: '列表项',
            },
            {
              href: '/editor/extensions/nodes/mathematics',
              title: '数学公式',
            },
            {
              href: '/editor/extensions/nodes/mention',
              title: '提及',
            },
            {
              href: '/editor/extensions/nodes/ordered-list',
              title: '有序列表',
            },
            {
              href: '/editor/extensions/nodes/paragraph',
              title: '段落',
            },
            {
              href: '/editor/extensions/nodes/table',
              title: '表格',
            },
            {
              href: '/editor/extensions/nodes/table-cell',
              title: '表格单元格',
            },
            {
              href: '/editor/extensions/nodes/table-header',
              title: '表头',
            },
            {
              href: '/editor/extensions/nodes/table-row',
              title: '表格行',
            },
            {
              href: '/editor/extensions/nodes/task-list',
              title: '任务列表',
            },
            {
              href: '/editor/extensions/nodes/task-item',
              title: '任务项',
            },
            {
              href: '/editor/extensions/nodes/text',
              title: '文本',
            },
            {
              href: '/editor/extensions/nodes/twitch',
              title: 'Twitch',
            },
            {
              href: '/editor/extensions/nodes/youtube',
              title: 'YouTube',
            },
          ],
        },
        {
          href: '/editor/extensions/marks',
          title: '标记',
          children: [
            {
              href: '/editor/extensions/marks/bold',
              title: '粗体',
            },
            {
              href: '/editor/extensions/marks/code',
              title: '代码',
            },
            {
              href: '/editor/extensions/marks/highlight',
              title: '高亮',
            },
            {
              href: '/editor/extensions/marks/italic',
              title: '斜体',
            },
            {
              href: '/editor/extensions/marks/link',
              title: '链接',
            },
            {
              href: '/editor/extensions/marks/ruby-text',
              title: '注音文本',
            },
            {
              href: '/editor/extensions/marks/strike',
              title: '删除线',
            },
            {
              href: '/editor/extensions/marks/subscript',
              title: '下标',
            },
            {
              href: '/editor/extensions/marks/superscript',
              title: '上标',
            },
            {
              href: '/editor/extensions/marks/text-style',
              title: '文本样式',
            },
            {
              href: '/editor/extensions/marks/underline',
              title: '下划线',
            },
          ],
        },
        {
          href: '/editor/extensions/functionality',
          title: '功能',
          children: [
            {
              href: '/editor/extensions/functionality/ai-generation',
              title: '基础 AI 生成',
              tags: ['Start'],
            },
            {
              href: '/editor/extensions/functionality/ai-toolkit',
              title: 'AI 工具包',
              tags: ['Add-on'],
              releaseTag: 'beta',
            },
            {
              href: '/editor/extensions/functionality/bubble-menu',
              title: '气泡菜单',
            },
            {
              href: '/editor/extensions/functionality/character-count',
              title: '字符计数',
            },
            {
              href: '/editor/extensions/functionality/collaboration',
              title: '协作',
            },
            {
              href: '/editor/extensions/functionality/collaboration-caret',
              title: '协作光标',
            },
            {
              href: '/editor/extensions/functionality/background-color',
              title: '背景颜色',
            },
            {
              href: '/editor/extensions/functionality/color',
              title: '颜色',
            },
            {
              href: '/editor/extensions/functionality/comments',
              title: '评论',
              tags: ['Start'],
            },
            {
              href: '/editor/extensions/functionality/drag-handle',
              title: '拖动手柄',
            },
            {
              href: '/editor/extensions/functionality/drag-handle-react',
              title: 'React 拖动手柄',
            },
            {
              href: '/editor/extensions/functionality/drag-handle-vue',
              title: 'Vue 拖动手柄',
            },
            {
              href: '/editor/extensions/functionality/dropcursor',
              title: '放置光标',
            },
            {
              href: '/editor/extensions/functionality/export',
              title: '导出',
              tags: ['Start'],
              releaseTag: 'beta',
            },
            {
              href: '/editor/extensions/functionality/filehandler',
              title: '文件处理器',
            },
            {
              href: '/editor/extensions/functionality/find-and-replace',
              title: '查找和替换',
            },
            {
              href: '/editor/extensions/functionality/floatingmenu',
              title: '浮动菜单',
            },
            {
              href: '/editor/extensions/functionality/focus',
              title: '焦点',
            },
            {
              href: '/editor/extensions/functionality/fontfamily',
              title: '字体系列',
            },
            {
              href: '/editor/extensions/functionality/fontsize',
              title: '字号',
            },
            {
              href: '/editor/extensions/functionality/gapcursor',
              title: '间隙光标',
            },
            {
              href: '/editor/extensions/functionality/invisiblecharacters',
              title: '不可见字符',
            },
            {
              href: '/editor/extensions/functionality/line-height',
              title: '行高',
            },
            {
              href: '/editor/extensions/functionality/list-kit',
              title: '列表套件',
            },
            {
              href: '/editor/extensions/functionality/listkeymap',
              title: '列表键位映射',
            },
            {
              href: '/editor/extensions/functionality/import',
              title: '导入',
              tags: ['Start'],
              releaseTag: 'beta',
            },
            {
              href: '/editor/extensions/functionality/pages',
              title: '页面',
              tags: ['Team'],
            },
            {
              href: '/editor/extensions/functionality/paste-handler',
              title: '粘贴处理器',
              tags: ['Team'],
            },
            {
              href: '/editor/extensions/functionality/placeholder',
              title: '占位符',
            },
            {
              href: '/editor/extensions/functionality/snapshot',
              title: '版本',
              tags: ['Starter'],
            },
            {
              href: '/editor/extensions/functionality/snapshot-compare',
              title: '快照比较',
              tags: ['Team'],
            },
            {
              href: '/editor/extensions/functionality/selection',
              title: '选区',
            },
            {
              href: '/editor/extensions/functionality/starterkit',
              title: '入门套件',
            },
            {
              href: '/editor/extensions/functionality/table-kit',
              title: '表格套件',
            },
            {
              href: '/editor/extensions/functionality/table-of-contents',
              title: '目录',
            },
            {
              href: '/editor/extensions/functionality/text-style-kit',
              title: '文本样式套件',
            },
            {
              href: '/editor/extensions/functionality/textalign',
              title: '文本对齐',
            },
            {
              href: '/editor/extensions/functionality/tracked-changes',
              title: '修订',
              tags: ['Add-on'],
            },
            {
              href: '/editor/extensions/functionality/trailing-node',
              title: '尾随节点',
            },
            {
              href: '/editor/extensions/functionality/typography',
              title: '排版',
            },
            {
              href: '/editor/extensions/functionality/undo-redo',
              title: '撤销与重做历史记录',
            },
            {
              href: '/editor/extensions/functionality/uniqueid',
              title: '唯一 ID',
            },
          ],
        },
        {
          href: '/editor/extensions/custom-extensions',
          title: '自定义扩展',
          children: [
            {
              href: '/editor/extensions/custom-extensions/create-new',
              title: '创建新扩展',
              children: [
                {
                  href: '/editor/extensions/custom-extensions/create-new/extension',
                  title: '扩展 API',
                },
                {
                  href: '/editor/extensions/custom-extensions/create-new/node',
                  title: '节点 API',
                },
                {
                  href: '/editor/extensions/custom-extensions/create-new/mark',
                  title: '标记 API',
                },
              ],
            },
            {
              href: '/editor/extensions/custom-extensions/extend-existing',
              title: '扩展现有功能',
            },
            {
              href: '/editor/extensions/custom-extensions/node-views',
              title: '节点视图',
              children: [
                {
                  href: '/editor/extensions/custom-extensions/node-views/javascript',
                  title: 'JavaScript',
                },
                {
                  href: '/editor/extensions/custom-extensions/node-views/react',
                  title: 'React',
                },
                {
                  href: '/editor/extensions/custom-extensions/node-views/vue',
                  title: 'Vue',
                },
                {
                  href: '/editor/extensions/custom-extensions/node-views/examples',
                  title: '示例',
                },
              ],
            },
            {
              href: '/editor/extensions/custom-extensions/mark-views',
              title: '标记视图',
              children: [
                {
                  href: '/editor/extensions/custom-extensions/mark-views/javascript',
                  title: 'JavaScript',
                },
                {
                  href: '/editor/extensions/custom-extensions/mark-views/react',
                  title: 'React',
                },
                {
                  href: '/editor/extensions/custom-extensions/mark-views/vue',
                  title: 'Vue',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      title: '核心概念',
      href: '/editor/core-concepts',
      children: [
        {
          href: '/editor/core-concepts/introduction',
          title: '简介',
        },
        {
          href: '/editor/core-concepts/extensions',
          title: '扩展',
        },
        {
          href: '/editor/core-concepts/nodes-and-marks',
          title: '节点和标记',
        },
        {
          href: '/editor/core-concepts/schema',
          title: '架构',
        },
        {
          href: '/editor/core-concepts/decorations',
          title: '装饰',
        },
        {
          href: '/editor/core-concepts/keyboard-shortcuts',
          title: '键盘快捷键',
        },
        {
          title: '持久化',
          href: '/editor/core-concepts/persistence',
        },
        {
          title: 'ProseMirror',
          href: '/editor/core-concepts/prosemirror',
        },
      ],
    },
    {
      type: 'group',
      href: '/editor/markdown',
      title: 'Markdown',
      tags: ['beta'],
      children: [
        { href: '/editor/markdown', title: '简介' },
        {
          href: '/editor/markdown/getting-started',
          title: '入门',
          children: [
            {
              title: '安装与设置',
              href: '/editor/markdown/getting-started/installation',
            },
            {
              title: '基本用法',
              href: '/editor/markdown/getting-started/basic-usage',
            },
          ],
        },
        {
          href: '/editor/markdown/advanced-usage',
          title: '高级用法',
          children: [
            {
              title: '自定义分词器',
              href: '/editor/markdown/advanced-usage/custom-tokenizer',
            },
            {
              title: '自定义解析',
              href: '/editor/markdown/advanced-usage/custom-parsing',
            },
            {
              title: '自定义序列化',
              href: '/editor/markdown/advanced-usage/custom-serializing',
            },
          ],
        },
        {
          href: '/editor/markdown/guides',
          title: '指南',
          children: [
            {
              title: '在扩展中集成 Markdown',
              href: '/editor/markdown/guides/integrate-markdown-in-your-extension',
            },
            {
              title: '创建高亮扩展',
              href: '/editor/markdown/guides/create-a-highlight-mark',
            },
            {
              title: '创建提示框扩展',
              href: '/editor/markdown/guides/create-a-admonition-block',
            },
            {
              title: '创建表情符号扩展',
              href: '/editor/markdown/guides/create-a-emoji-inline-block',
            },
          ],
        },
        { href: '/editor/markdown/examples', title: '示例' },
        {
          href: '/editor/markdown/api',
          title: 'API 参考',
          children: [
            {
              title: '编辑器',
              href: '/editor/markdown/api/editor',
            },
            {
              title: 'MarkdownManager',
              href: '/editor/markdown/api/markdown-manager',
            },
            {
              title: '扩展',
              href: '/editor/markdown/api/extension',
            },
            {
              title: '工具函数',
              href: '/editor/markdown/api/utilities',
            },
            {
              title: '类型',
              href: '/editor/markdown/api/types',
            },
          ],
        },
        { href: '/editor/markdown/glossary', title: '术语表' },
      ],
    },
    {
      type: 'group',
      href: '/editor/whiteboard',
      title: '白板',
      tags: ['alpha'],
      children: [
        { title: '概览', href: '/editor/whiteboard/getting-started/overview' },
        {
          title: '指南',
          href: '/editor/whiteboard/guides/react',
          children: [
            { title: 'React', href: '/editor/whiteboard/guides/react' },
            { title: '舞台和摄像机', href: '/editor/whiteboard/guides/stage-and-camera' },
            { title: '形状和工具', href: '/editor/whiteboard/guides/shapes-and-tools' },
            { title: '箭头', href: '/editor/whiteboard/guides/arrows' },
            { title: '画框', href: '/editor/whiteboard/guides/frames' },
            { title: '文档画框', href: '/editor/whiteboard/guides/doc-frames' },
            { title: '图像', href: '/editor/whiteboard/guides/images' },
            { title: '自定义形状', href: '/editor/whiteboard/guides/custom-shapes' },
            { title: '导出和导入', href: '/editor/whiteboard/guides/export-and-import' },
            {
              title: '白板协作',
              href: '/editor/whiteboard/guides/collaboration',
            },
            {
              title: '白板修订',
              href: '/editor/whiteboard/guides/tracked-changes',
            },
          ],
        },
        {
          title: '示例',
          href: '/editor/whiteboard/examples/simple',
          children: [
            { title: '简单白板', href: '/editor/whiteboard/examples/simple' },
            { title: '自定义形状', href: '/editor/whiteboard/examples/custom-shape' },
          ],
        },
        { title: 'AI 智能体', href: '/ai/ai-toolkit/agents/whiteboard' },
        {
          title: 'API 参考',
          href: '/editor/whiteboard/api-reference/extensions',
          children: [
            { title: '扩展', href: '/editor/whiteboard/api-reference/extensions' },
            { title: '命令', href: '/editor/whiteboard/api-reference/commands' },
            { title: '工具函数', href: '/editor/whiteboard/api-reference/utilities' },
            { title: '类型', href: '/editor/whiteboard/api-reference/types' },
            { title: '样式', href: '/editor/whiteboard/api-reference/styling' },
            { title: '编辑器事件', href: '/editor/whiteboard/api-reference/events' },
          ],
        },
      ],
    },
    {
      type: 'group',
      href: '/editor/api',
      title: 'API',
      children: [
        {
          href: '/editor/api/editor',
          title: '编辑器实例',
        },
        {
          href: '/editor/api/commands',
          title: '命令',
          children: [
            {
              href: '/editor/api/commands/content',
              title: '内容',
              children: [
                {
                  href: '/editor/api/commands/content/clear-content',
                  title: 'clearContent',
                },
                {
                  href: '/editor/api/commands/content/cut',
                  title: 'cut',
                },
                {
                  href: '/editor/api/commands/content/insert-content',
                  title: 'insertContent',
                },
                {
                  href: '/editor/api/commands/content/insert-content-at',
                  title: 'insertContentAt',
                },
                {
                  href: '/editor/api/commands/content/set-content',
                  title: 'setContent',
                },
              ],
            },
            {
              href: '/editor/api/commands/nodes-and-marks',
              title: '节点和标记',
              children: [
                {
                  href: '/editor/api/commands/nodes-and-marks/clear-nodes',
                  title: 'clearNodes',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/create-paragraph-near',
                  title: 'createParagraphNear',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/delete-node',
                  title: 'deleteNode',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/extend-mark-range',
                  title: 'extendMarkRange',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/exit-code',
                  title: 'exitCode',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/join-backward',
                  title: 'joinBackward',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/join-down',
                  title: 'joinDown',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/join-forward',
                  title: 'joinForward',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/join-textblock-backward',
                  title: 'joinTextblockBackward',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/join-textblock-forward',
                  title: 'joinTextblockForward',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/join-up',
                  title: 'joinUp',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/lift',
                  title: 'lift',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/lift-empty-block',
                  title: 'liftEmptyBlock',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/newline-in-code',
                  title: 'newlineInCode',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/reset-attributes',
                  title: 'resetAttributes',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/set-mark',
                  title: 'setMark',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/set-node',
                  title: 'setNode',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/set-text-direction',
                  title: 'setTextDirection',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/split-block',
                  title: 'splitBlock',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/toggle-mark',
                  title: 'toggleMark',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/toggle-node',
                  title: 'toggleNode',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/toggle-wrap',
                  title: 'toggleWrap',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/undo-input-rule',
                  title: 'undoInputRule',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/unset-all-marks',
                  title: 'unsetAllMarks',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/unset-mark',
                  title: 'unsetMark',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/unset-text-direction',
                  title: 'unsetTextDirection',
                },
                {
                  href: '/editor/api/commands/nodes-and-marks/update-attributes',
                  title: 'updateAttributes',
                },
              ],
            },
            {
              href: '/editor/api/commands/lists',
              title: '列表',
              children: [
                {
                  href: '/editor/api/commands/lists/lift-list-item',
                  title: 'liftListItem',
                },
                {
                  href: '/editor/api/commands/lists/sink-list-item',
                  title: 'sinkListItem',
                },
                {
                  href: '/editor/api/commands/lists/split-list-item',
                  title: 'splitListItem',
                },
                {
                  href: '/editor/api/commands/lists/toggle-list',
                  title: 'toggleList',
                },
                {
                  href: '/editor/api/commands/lists/wrap-in-list',
                  title: 'wrapInList',
                },
              ],
            },
            {
              href: '/editor/api/commands/selection',
              title: '选区',
              children: [
                {
                  href: '/editor/api/commands/selection/blur',
                  title: 'blur',
                },
                {
                  href: '/editor/api/commands/selection/delete-range',
                  title: 'deleteRange',
                },
                {
                  href: '/editor/api/commands/selection/delete-selection',
                  title: 'deleteSelection',
                },
                {
                  href: '/editor/api/commands/selection/enter',
                  title: 'enter',
                },
                {
                  href: '/editor/api/commands/selection/focus',
                  title: 'focus',
                },
                {
                  href: '/editor/api/commands/selection/keyboard-shortcut',
                  title: 'keyboardShortcut',
                },
                {
                  href: '/editor/api/commands/selection/scroll-into-view',
                  title: 'scrollIntoView',
                },
                {
                  href: '/editor/api/commands/selection/select-all',
                  title: 'selectAll',
                },
                {
                  href: '/editor/api/commands/selection/select-node-backward',
                  title: 'selectNodeBackward',
                },
                {
                  href: '/editor/api/commands/selection/select-node-forward',
                  title: 'selectNodeForward',
                },
                {
                  href: '/editor/api/commands/selection/select-parent-node',
                  title: 'selectParentNode',
                },
                {
                  href: '/editor/api/commands/selection/set-node-selection',
                  title: 'setNodeSelection',
                },
                {
                  href: '/editor/api/commands/selection/set-text-selection',
                  title: 'setTextSelection',
                },
              ],
            },
            {
              href: '/editor/api/commands/for-each',
              title: 'forEach',
            },
            {
              href: '/editor/api/commands/select-textblock-end',
              title: 'selectTextblockEnd',
            },
            {
              href: '/editor/api/commands/select-textblock-start',
              title: 'selectTextblockStart',
            },
            {
              href: '/editor/api/commands/set-meta',
              title: 'setMeta',
            },
          ],
        },
        {
          href: '/editor/api/utilities',
          title: '工具函数',
          children: [
            {
              href: '/editor/api/utilities/html',
              title: 'HTML',
            },
            {
              href: '/editor/api/utilities/jsx',
              title: 'JSX',
            },
            {
              href: '/editor/api/utilities/position',
              title: '位置',
            },
            {
              href: '/editor/api/utilities/static-renderer',
              title: '静态渲染器',
            },
            {
              href: '/editor/api/utilities/suggestion',
              title: '建议',
            },
            {
              href: '/editor/api/utilities/tiptap-for-php',
              title: '适用于 PHP 的 Tiptap',
            },
          ],
        },
        {
          href: '/editor/api/node-positions',
          title: '节点位置',
        },
        {
          href: '/editor/api/decorations',
          title: '装饰',
        },
        {
          title: '可调整大小的节点视图',
          href: '/editor/api/resizable-nodeviews',
        },
        {
          href: '/editor/api/events',
          title: '事件',
        },
        {
          href: '/editor/api/input-rules',
          title: '输入规则',
        },
        {
          href: '/editor/api/paste-rules',
          title: '粘贴规则',
        },
      ],
    },
    {
      type: 'group',
      title: '资源',
      href: '/editor/resources',
      children: [
        {
          href: '/guides',
          title: '指南',
        },
        {
          href: 'https://tiptap.dev/pro-license',
          title: 'Pro 许可证',
        },
      ],
    },
  ],
}
