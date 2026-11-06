import { SidebarConfig } from '@/types'

export const sidebarConfig: SidebarConfig = {
  id: 'ai-suggestion',
  rootHref: '/ai/deprecated/suggestion/overview',
  title: 'AI 建议（旧版）',
  items: [
    {
      type: 'link',
      title: '← 返回内容 AI',
      href: '/ai/ai-toolkit/overview',
    },
    {
      type: 'group',
      href: '/ai/deprecated/suggestion/overview',
      title: '开始使用',
      children: [
        {
          title: '概览',
          href: '/ai/deprecated/suggestion/overview',
        },
        {
          title: '安装',
          href: '/ai/deprecated/suggestion/install',
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/suggestion/features/define-rules',
      title: '功能',
      children: [
        {
          title: '定义规则',
          href: '/ai/deprecated/suggestion/features/define-rules',
        },
        {
          title: '配置建议的加载时机',
          href: '/ai/deprecated/suggestion/features/configure-when-to-load-suggestions',
        },
        {
          title: '显示建议',
          href: '/ai/deprecated/suggestion/features/display-suggestions',
        },
        {
          title: '应用和拒绝建议',
          href: '/ai/deprecated/suggestion/features/apply-suggestions',
        },
        {
          title: '锁定内容',
          href: '/ai/deprecated/suggestion/features/lock-content',
        },
        {
          title: '提供 LLM 上下文',
          href: '/ai/deprecated/suggestion/features/provide-llm-context',
        },
        {
          title: '差异视图',
          href: '/ai/deprecated/suggestion/features/diff-view',
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/suggestion/use-with-content-ai-cloud',
      title: '集成',
      children: [
        {
          title: '与 Content AI Cloud 搭配使用',
          href: '/ai/deprecated/suggestion/use-with-content-ai-cloud',
        },
        {
          title: '集成自己的 LLM',
          href: '/ai/deprecated/suggestion/custom-llms',
        },
        {
          title: '配置',
          href: '/ai/deprecated/suggestion/configure',
        },
      ],
    },
    {
      type: 'group',
      href: '/ai/deprecated/suggestion/api-reference',
      title: '参考',
      children: [
        {
          title: 'API 参考',
          href: '/ai/deprecated/suggestion/api-reference',
        },
        {
          title: '更新日志',
          href: '/ai/deprecated/suggestion/changelog',
        },
      ],
    },
  ],
}
