import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'ai-assistant',
  rootHref: '/ai/deprecated/agent/overview',
  title: 'AI 助手（旧版）',
  items: [
    {
      type: 'link',
      title: '← 返回 Content AI',
      href: '/ai/ai-toolkit/overview',
    },
    {
      type: 'group',
      href: '/ai/deprecated/agent/overview',
      title: '快速入门',
      children: [
        {
          title: '概述',
          href: '/ai/deprecated/agent/overview',
        },
        {
          title: '安装',
          href: '/ai/deprecated/agent/install',
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/agent/use-with-content-ai-cloud',
      title: '集成',
      children: [
        {
          title: '与 Tiptap Cloud 搭配使用',
          href: '/ai/deprecated/agent/use-with-content-ai-cloud',
        },
        {
          title: '与自己的 AI 智能体搭配使用',
          href: '/ai/deprecated/agent/custom-llms/overview',
          children: [
            {
              title: '概述',
              href: '/ai/deprecated/agent/custom-llms/overview',
            },
            {
              title: '快速入门',
              href: '/ai/deprecated/agent/custom-llms/get-started',
              children: [
                {
                  title: 'Vercel AI SDK',
                  href: '/ai/deprecated/agent/custom-llms/get-started/vercel-ai-sdk',
                },
                {
                  title: 'OpenAI Completions',
                  href: '/ai/deprecated/agent/custom-llms/get-started/openai-chat-completions',
                },
                {
                  title: 'OpenAI Responses',
                  href: '/ai/deprecated/agent/custom-llms/get-started/openai-responses',
                },
                {
                  title: 'Anthropic Claude',
                  href: '/ai/deprecated/agent/custom-llms/get-started/anthropic-messages',
                },
              ],
            },
            {
              title: '工具概述',
              href: '/ai/deprecated/agent/custom-llms/tools',
            },
            {
              title: '客户端工具',
              href: '/ai/deprecated/agent/custom-llms/client-side-tools',
            },
            {
              title: '服务端工具',
              href: '/ai/deprecated/agent/custom-llms/server-side-tools',
              children: [
                {
                  title: 'Vercel AI SDK',
                  href: '/ai/deprecated/agent/custom-llms/server-side-tools/vercel-ai-sdk',
                },
                {
                  title: 'OpenAI Completions',
                  href: '/ai/deprecated/agent/custom-llms/server-side-tools/openai-chat-completions',
                },
                {
                  title: 'OpenAI Responses',
                  href: '/ai/deprecated/agent/custom-llms/server-side-tools/openai-responses',
                },
                {
                  title: 'Anthropic Claude',
                  href: '/ai/deprecated/agent/custom-llms/server-side-tools/anthropic-messages',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/agent/features/state',
      title: '功能',
      children: [
        {
          title: '状态',
          href: '/ai/deprecated/agent/features/state',
        },
        {
          title: '事件',
          href: '/ai/deprecated/agent/features/events',
        },
        {
          title: '方法',
          href: '/ai/deprecated/agent/features/methods',
        },
        {
          title: '生命周期',
          href: '/ai/deprecated/agent/features/lifecycle',
        },
        {
          title: '检查点',
          href: '/ai/deprecated/agent/features/checkpoints',
        },
        {
          title: '提供上下文',
          href: '/ai/deprecated/agent/features/context',
        },
        {
          title: '感知选区',
          href: '/ai/deprecated/agent/features/selection-awareness',
        },
        {
          title: '读取大型文档',
          href: '/ai/deprecated/agent/features/large-documents',
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/agent/configure/options',
      title: '配置',
      children: [
        {
          title: '配置选项',
          href: '/ai/deprecated/agent/configure/options',
        },
        {
          title: '系统提示词',
          href: '/ai/deprecated/agent/configure/system-prompt',
        },
        {
          title: '自定义节点/标记',
          href: '/ai/deprecated/agent/configure/custom-nodes',
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/agent/review',
      title: '审阅更改',
      children: [
        {
          title: '使用 AI Changes',
          href: '/ai/deprecated/agent/review/ai-changes',
        },
        {
          title: '使用 AI Suggestion',
          href: '/ai/deprecated/agent/review/ai-suggestion',
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/agent/api-reference',
      title: '参考',
      children: [
        {
          title: 'API 参考',
          href: '/ai/deprecated/agent/api-reference',
        },
        {
          title: '更新日志',
          href: '/ai/deprecated/agent/changelog',
        },
      ],
    },
  ],
}
