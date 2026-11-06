import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'ai',
  rootHref: '/ai/ai-toolkit/overview',
  title: 'AI 工具包',
  items: [
    {
      href: '/ai/ai-toolkit/getting-started/overview',
      title: 'AI 工具包',
      type: 'group',
      tags: ['附加组件'],
      children: [
        {
          title: '概览',
          releaseTag: 'beta',
          href: '/ai/ai-toolkit/overview',
        },
        {
          title: '安装',
          href: '/ai/ai-toolkit/install',
        },
        {
          title: '智能体',
          href: '/ai/ai-toolkit/agents',
          children: [
            {
              title: 'AI 智能体聊天机器人',
              href: '/ai/ai-toolkit/agents/ai-agent-chatbot',
            },
            {
              title: '含修订跟踪',
              href: '/ai/ai-toolkit/agents/tracked-changes',
            },
            {
              title: '评论',
              href: '/ai/ai-toolkit/agents/comments',
            },
            {
              title: '含白板',
              href: '/ai/ai-toolkit/agents/whiteboard',
              releaseTag: 'alpha',
            },
            {
              title: '选区感知',
              href: '/ai/ai-toolkit/agents/selection-awareness',
            },
            {
              title: '流式传输',
              href: '/ai/ai-toolkit/agents/streaming',
            },
          ],
        },
        {
          title: 'API 参考',
          href: '/ai/ai-toolkit/api-reference',
          children: [
            {
              title: 'REST API',
              href: '/ai/ai-toolkit/api-reference/rest-api',
            },
            {
              title: 'Tiptap Query',
              href: '/ai/ai-toolkit/api-reference/tiptap-query',
              releaseTag: 'alpha',
            },
            {
              title: '编辑器上下文',
              href: '/ai/ai-toolkit/api-reference/editor-context',
            },
            {
              title: '审阅选项',
              href: '/ai/ai-toolkit/api-reference/review-options',
            },
            {
              title: 'REST API（旧版 v3）',
              href: '/ai/ai-toolkit/api-reference/rest-api-v3',
            },
          ],
        },
        {
          title: '高级指南',
          href: '/ai/ai-toolkit/advanced-guides',
          children: [
            {
              title: '自定义节点',
              href: '/ai/ai-toolkit/advanced-guides/custom-nodes',
            },
            {
              title: 'Tiptap Shorthand',
              href: '/ai/ai-toolkit/advanced-guides/tiptap-shorthand',
              releaseTag: 'alpha',
            },
            {
              title: '安全',
              href: '/ai/ai-toolkit/advanced-guides/security',
            },
          ],
        },
        /*
        {
          title: '更新日志',
          href: '/resources/changelog/server-ai-toolkit',
        },
        */
      ],
    },
    {
      type: 'group',
      // 这不是真实 URL，而且据我所知也不需要是 URL……
      href: '/ai/other-options',
      title: '其他选项',
      children: [
        {
          title: '客户端工具包',
          href: '/ai/ai-toolkit/client',
          tags: ['附加组件'],
          children: [
            {
              title: '概览',
              href: '/ai/ai-toolkit/client/overview',
            },
            {
              title: '使用场景',
              href: '/ai/ai-toolkit/client/use-cases',
            },
            {
              title: '安装',
              href: '/ai/ai-toolkit/client/install',
            },
            {
              title: '智能体',
              href: '/ai/ai-toolkit/client/agents',
              children: [
                {
                  title: 'AI 智能体聊天机器人',
                  href: '/ai/ai-toolkit/client/agents/ai-agent-chatbot',
                },
                {
                  title: '审阅更改',
                  href: '/ai/ai-toolkit/client/agents/review-changes',
                  children: [
                    {
                      title: '含修订跟踪',
                      href: '/ai/ai-toolkit/client/agents/review-changes/tracked-changes',
                    },
                    {
                      title: '带评论的修订跟踪',
                      href: '/ai/ai-toolkit/client/agents/review-changes/tracked-changes-with-comments',
                    },
                    {
                      title: '建议',
                      href: '/ai/ai-toolkit/client/agents/review-changes/suggestions',
                    },
                    {
                      title: '带评论的建议',
                      href: '/ai/ai-toolkit/client/agents/review-changes/suggestions-with-comments',
                    },
                    {
                      title: '样式建议',
                      href: '/ai/ai-toolkit/client/agents/review-changes/style-suggestions',
                    },
                  ],
                },
                {
                  title: '流式传输',
                  href: '/ai/ai-toolkit/client/agents/streaming',
                },
                {
                  title: '评论',
                  href: '/ai/ai-toolkit/client/agents/comments',
                },
                {
                  title: '多文档',
                  href: '/ai/ai-toolkit/client/agents/multi-document',
                },
                {
                  title: '选区感知',
                  href: '/ai/ai-toolkit/client/agents/selection-awareness',
                },
                {
                  title: 'Schema 感知',
                  href: '/ai/ai-toolkit/client/agents/schema-awareness',
                },
                {
                  title: '工具定义',
                  href: '/ai/ai-toolkit/client/agents/tools',
                  children: [
                    {
                      title: 'Vercel AI SDK',
                      href: '/ai/ai-toolkit/client/agents/tools/ai-sdk',
                    },
                    {
                      title: 'LangChain.js',
                      href: '/ai/ai-toolkit/client/agents/tools/langchain-js',
                    },
                    {
                      title: 'OpenAI',
                      href: '/ai/ai-toolkit/client/agents/tools/openai',
                    },
                    {
                      title: 'Anthropic',
                      href: '/ai/ai-toolkit/client/agents/tools/anthropic',
                    },
                    {
                      title: 'Mastra',
                      href: '/ai/ai-toolkit/client/agents/tools/mastra',
                    },
                    {
                      title: '其他提供商',
                      href: '/ai/ai-toolkit/client/agents/tools/other-providers',
                    },
                  ],
                },
              ],
            },
            {
              title: '工作流',
              href: '/ai/ai-toolkit/client/workflows',
              children: [
                {
                  title: '插入内容',
                  href: '/ai/ai-toolkit/client/workflows/insert-content',
                },
                {
                  title: '校对',
                  href: '/ai/ai-toolkit/client/workflows/proofreader',
                },
                {
                  title: 'Tiptap Edit',
                  href: '/ai/ai-toolkit/client/workflows/tiptap-edit',
                },
                {
                  title: '评论',
                  href: '/ai/ai-toolkit/client/workflows/comments',
                },
                {
                  title: '模板',
                  href: '/ai/ai-toolkit/client/workflows/template',
                },
              ],
            },
            {
              title: '高级指南',
              href: '/ai/ai-toolkit/client/advanced-guides',
              children: [
                {
                  title: '实时演示',
                  href: '/ai/ai-toolkit/client/advanced-guides/live-demo',
                },
                {
                  title: '概念',
                  href: '/ai/ai-toolkit/client/advanced-guides/concepts',
                },
                {
                  title: 'AI 工程',
                  href: '/ai/ai-toolkit/client/advanced-guides/ai-engineering',
                },
                {
                  title: '比较文档',
                  href: '/ai/ai-toolkit/client/advanced-guides/compare-documents',
                },
                {
                  title: '分屏视图',
                  href: '/ai/ai-toolkit/client/advanced-guides/split-view',
                },
                {
                  title: 'Tiptap Edit 钩子',
                  href: '/ai/ai-toolkit/client/advanced-guides/tiptap-edit-hooks',
                },
                {
                  title: 'AI 光标',
                  href: '/ai/ai-toolkit/client/advanced-guides/ai-caret',
                },
                {
                  title: '非 TypeScript 后端',
                  href: '/ai/ai-toolkit/client/advanced-guides/non-typescript-backends',
                },
                {
                  title: '迁移指南',
                  href: '/ai/ai-toolkit/client/advanced-guides/migration-guides',
                  children: [
                    {
                      title: '基础 AI 生成',
                      href: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-generation',
                    },
                    {
                      title: 'AI 建议',
                      href: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-suggestion',
                    },
                    {
                      title: 'AI 更改',
                      href: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-changes',
                    },
                    {
                      title: 'AI 助手',
                      href: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-assistant',
                    },
                  ],
                },
              ],
            },
            {
              title: 'API 参考',
              href: '/ai/ai-toolkit/client/api-reference',
              children: [
                {
                  title: '读取文档',
                  href: '/ai/ai-toolkit/client/api-reference/read-the-document',
                },
                {
                  title: '编辑文档',
                  href: '/ai/ai-toolkit/client/api-reference/edit-the-document',
                },
                {
                  title: '工具执行',
                  href: '/ai/ai-toolkit/client/api-reference/execute-tool',
                },
                {
                  title: '工作流',
                  href: '/ai/ai-toolkit/client/api-reference/workflows',
                },
                {
                  title: 'Schema 感知',
                  href: '/ai/ai-toolkit/client/api-reference/schema-awareness',
                },
                {
                  title: '审阅选项',
                  href: '/ai/ai-toolkit/client/api-reference/review-options',
                },
                {
                  title: '建议',
                  href: '/ai/ai-toolkit/client/api-reference/suggestions',
                },
                {
                  title: '差异工具',
                  href: '/ai/ai-toolkit/client/api-reference/diff-utility',
                },
                {
                  title: '分屏视图',
                  href: '/ai/ai-toolkit/client/api-reference/split-view',
                },
              ],
            },
            {
              title: '更新日志',
              href: '/ai/ai-toolkit/client/changelog',
            },
          ],
        },
        {
          title: '基础 AI 生成',
          tags: ['开始'],
          href: '/ai/basic',
          children: [
            {
              title: '概览',
              href: '/ai/basic/overview',
            },
            {
              title: '使用场景',
              href: '/ai/basic/use-cases',
            },
            {
              title: '安装',
              href: '/ai/basic/install',
            },
            {
              title: '文本生成',
              href: '/ai/basic/text-generation',
              children: [
                {
                  title: '内置命令',
                  href: '/ai/basic/text-generation/built-in-commands',
                },
                {
                  title: '自动补全',
                  href: '/ai/basic/text-generation/autocompletion',
                },
                {
                  title: '提供上下文',
                  href: '/ai/basic/text-generation/provide-context',
                },
                {
                  title: '格式化响应',
                  href: '/ai/basic/text-generation/format',
                },
                {
                  title: '管理响应',
                  href: '/ai/basic/text-generation/manage-responses',
                },
                {
                  title: '自定义命令',
                  href: '/ai/basic/text-generation/custom-commands',
                },
                {
                  title: '流式传输内容（高级）',
                  href: '/ai/basic/text-generation/stream',
                },
              ],
            },
            {
              title: '图像生成',
              href: '/ai/basic/image-generation',
            },
            {
              title: '协作功能',
              href: '/ai/basic/collaboration',
            },
            {
              title: '集成你的 LLM',
              href: '/ai/basic/custom-llms',
            },
            {
              title: '配置',
              href: '/ai/basic/configure',
            },
          ],
        },
      ],
    },
  ],
}
