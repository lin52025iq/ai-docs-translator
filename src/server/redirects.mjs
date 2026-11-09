// 共享重定向映射。
// 由 next.config.mjs 中的 redirects() 和 markdown 解析器
//（src/server/markdown）共同使用，使 `.md` 请求遵循相同的 301 重定向。

/** @type {Array<{source: string, destination: string, permanent: boolean}>} */
export const redirects = [
  // Diagrams 的在线演示已移至概览页
  {
    source: '/diagrams/getting-started/live-demo',
    destination: '/diagrams/getting-started/overview',
    permanent: true,
  },
  {
    source: '/composable-docs/slots/guides/bind-variables',
    destination: '/composable-docs/variables/guides/bind-slots',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/tiptap-access-control',
    destination: '/ai/ai-toolkit/install#set-up-authorization',
    permanent: true,
  },
  {
    source: '/feed',
    destination: '/',
    permanent: true,
  },
  {
    source: '/docsassets/images/tiptap-logo.png',
    destination: '/assets/images/tiptap-logo.png',
    permanent: true,
  },
  {
    source: '/docs/resources/pricing',
    destination: '/pricing',
    permanent: true,
  },
  {
    source: '/editor/install',
    destination: '/editor/getting-started/install',
    permanent: true,
  },
  {
    source: '/editor/getting-started/install/cdn',
    destination: '/editor/getting-started/install/vanilla-javascript',
    permanent: true,
  },
  {
    source: '/editor/markdown/getting-started',
    destination: '/editor/markdown/getting-started/installation',
    permanent: true,
  },
  {
    source: '/editor/markdown/advanced-usage',
    destination: '/editor/markdown/advanced-usage/custom-tokenizer',
    permanent: true,
  },
  {
    source: '/editor/markdown/guides',
    destination: '/editor/markdown/guides/integrate-markdown-in-your-extension',
    permanent: true,
  },
  {
    source: '/editor/markdown/api',
    destination: '/editor/markdown/api/editor',
    permanent: true,
  },
  {
    source: '/editor/extensions/functionality/mathematics',
    destination: '/editor/extensions/nodes/mathematics',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/tiptap-cloud',
    destination: '/ai/deprecated/agent/use-with-content-ai-cloud',
    permanent: true,
  },
  {
    source: '/conversion/import-export/odt',
    destination: '/conversion/legacy/odt/editor-extensions',
    permanent: true,
  },
  {
    source: '/conversion/import-export/markdown',
    destination: '/conversion/legacy/markdown/editor-extensions',
    permanent: true,
  },
  {
    source: '/guides/legacy-conversion',
    destination: '/conversion/legacy/overview',
    permanent: true,
  },
  {
    source: '/conversion/import-export/odt/editor-extensions',
    destination: '/conversion/legacy/odt/editor-extensions',
    permanent: true,
  },
  {
    source: '/conversion/import-export/odt/rest-api',
    destination: '/conversion/legacy/odt/rest-api',
    permanent: true,
  },
  {
    source: '/conversion/import-export/markdown/editor-extensions',
    destination: '/conversion/legacy/markdown/editor-extensions',
    permanent: true,
  },
  {
    source: '/conversion/import-export/markdown/rest-api',
    destination: '/conversion/legacy/markdown/rest-api',
    permanent: true,
  },
  {
    source: '/conversion/import-export/docx',
    destination: '/conversion/getting-started/overview',
    permanent: true,
  },
  {
    source: '/conversion/import-export/docx/custom-node-conversion',
    destination: '/conversion/import/docx/custom-node-mapping',
    permanent: true,
  },
  {
    source: '/conversion/import-export/docx/custom-page-layout',
    destination: '/conversion/export/docx/page-layout',
    permanent: true,
  },
  {
    source: '/conversion/import-export/docx/preserve-images',
    destination: '/conversion/import/docx/image-handling',
    permanent: true,
  },
  {
    source: '/conversion/import-export/docx/rest-api',
    destination: '/conversion/getting-started/install',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/generation',
    destination: '/ai/basic/overview',
    permanent: true,
  },
  {
    source: '/content-ai/custom-llms/integrate',
    destination: '/ai/basic/custom-llms',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/generation/text-generation',
    destination: '/ai/basic/text-generation',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/suggestion',
    destination: '/ai/deprecated/suggestion/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/suggestion/features',
    destination: '/ai/deprecated/suggestion/features/define-rules',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/changes',
    destination: '/ai/deprecated/changes/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/changes/features',
    destination: '/ai/deprecated/changes/features/review-changes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/text-generation',
    destination: '/ai/basic/text-generation/built-in-commands',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent',
    destination: '/ai/deprecated/agent/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/features',
    destination: '/ai/deprecated/agent/features/state',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/configure',
    destination: '/ai/deprecated/agent/configure/options',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/custom-llms',
    destination: '/ai/deprecated/agent/custom-llms/overview',
    permanent: true,
  },
  {
    source: '/collaboration/documents/conversion',
    destination: '/conversion/getting-started/overview',
    permanent: true,
  },
  {
    source: '/collaboration/documents/history',
    destination: '/collaboration/documents/snapshot',
    permanent: true,
  },
  {
    source: '/ui-components/node-components',
    destination: '/ui-components/node-components/blockquote-node',
    permanent: true,
  },
  {
    source: '/ui-components/utils-components',
    destination: '/ui-components/utils-components/floating-element',
    permanent: true,
  },
  {
    source: '/ui-components/components',
    destination: '/ui-components/components/ai-ask-button',
    permanent: true,
  },
  {
    source: '/ui-components/primitives',
    destination: '/ui-components/primitives/avatar',
    permanent: true,
  },
  {
    source: '/ui-components/getting-started',
    destination: '/ui-components/getting-started/overview',
    permanent: true,
  },
  {
    source: '/ui-components/components/highlight-popover',
    destination: '/ui-components/components/color-highlight-popover',
    permanent: true,
  },
  {
    source: '/ui-components/components/node-button',
    destination: '/ui-components/components/blockquote-button',
    permanent: true,
  },
  // 转换文档结构调整：重命名页面（线上原路径 → 新路径）
  // 导入：重命名文件
  {
    source: '/conversion/import/docx/editor-import',
    destination: '/conversion/import/docx/editor-extension',
    permanent: true,
  },
  {
    source: '/conversion/import/docx/custom-node-conversion',
    destination: '/conversion/import/docx/custom-node-mapping',
    permanent: true,
  },
  {
    source: '/conversion/import/docx/custom-mark-conversion',
    destination: '/conversion/import/docx/custom-mark-mapping',
    permanent: true,
  },
  {
    source: '/conversion/import/docx/preserve-images',
    destination: '/conversion/import/docx/image-handling',
    permanent: true,
  },
  {
    source: '/conversion/import/docx/convert-kit',
    destination: '/conversion/import/docx/convertkit',
    permanent: true,
  },
  // 导出：重命名文件（editor-export → editor-extension）
  {
    source: '/conversion/export/docx/editor-export',
    destination: '/conversion/export/docx/editor-extension',
    permanent: true,
  },
  {
    source: '/conversion/export/pdf/editor-export',
    destination: '/conversion/export/pdf/editor-extension',
    permanent: true,
  },
  {
    source: '/conversion/export/odt/editor-export',
    destination: '/conversion/export/odt/editor-extension',
    permanent: true,
  },
  {
    source: '/conversion/export/epub/editor-export',
    destination: '/conversion/export/epub/editor-extension',
    permanent: true,
  },
  {
    source: '/conversion/export/doc/editor-export',
    destination: '/conversion/export/doc/editor-extension',
    permanent: true,
  },
  {
    source: '/conversion/export/markdown/editor-export',
    destination: '/conversion/export/markdown/editor-extension',
    permanent: true,
  },
  // 导出：重命名深入指南文件
  {
    source: '/conversion/export/docx/custom-node-conversion',
    destination: '/conversion/export/docx/custom-nodes',
    permanent: true,
  },
  {
    source: '/conversion/export/docx/export-styles',
    destination: '/conversion/export/docx/styles',
    permanent: true,
  },
  {
    source: '/conversion/export/docx/custom-page-layout',
    destination: '/conversion/export/docx/page-layout',
    permanent: true,
  },
  {
    source: '/conversion/export/pdf/custom-node-conversion',
    destination: '/conversion/export/pdf/custom-nodes',
    permanent: true,
  },
  {
    source: '/conversion/export/pdf/export-styles',
    destination: '/conversion/export/pdf/styles',
    permanent: true,
  },
  {
    source: '/conversion/export/pdf/custom-page-layout',
    destination: '/conversion/export/pdf/page-layout',
    permanent: true,
  },
  {
    source: '/conversion/export/odt/custom-node-conversion',
    destination: '/conversion/export/odt/custom-nodes',
    permanent: true,
  },
  {
    source: '/conversion/export/odt/export-styles',
    destination: '/conversion/export/odt/styles',
    permanent: true,
  },
  {
    source: '/conversion/export/odt/custom-page-layout',
    destination: '/conversion/export/odt/page-layout',
    permanent: true,
  },
  {
    source: '/conversion/export/epub/custom-node-conversion',
    destination: '/conversion/export/epub/custom-nodes',
    permanent: true,
  },
  {
    source: '/conversion/export/epub/export-styles',
    destination: '/conversion/export/epub/styles',
    permanent: true,
  },
  {
    source: '/conversion/export/epub/custom-page-layout',
    destination: '/conversion/export/epub/page-layout',
    permanent: true,
  },
  {
    source: '/conversion/export/doc/custom-node-conversion',
    destination: '/conversion/export/doc/custom-nodes',
    permanent: true,
  },
  {
    source: '/conversion/export/doc/export-styles',
    destination: '/conversion/export/doc/styles',
    permanent: true,
  },
  {
    source: '/conversion/export/doc/custom-page-layout',
    destination: '/conversion/export/doc/page-layout',
    permanent: true,
  },
  // 以下重定向是临时的，应移至反向代理
  // TODO：将这些重定向添加到反向代理
  {
    source: '/content-ai/capabilities/agent/features/state-management',
    destination: '/ai/deprecated/agent/features/state',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/features/runs',
    destination: '/ai/deprecated/agent/features/lifecycle',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/features/reading-the-document',
    destination: '/ai/deprecated/agent/features/large-documents',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/features/add-context',
    destination: '/ai/deprecated/agent/features/context',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/agent/features/review',
    destination: '/ai/deprecated/agent/review',
    permanent: true,
  },
  {
    source: '/editor/api/extensions/collaboration-caret',
    destination: '/editor/extensions/functionality/collaboration-caret',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit',
    destination: '/ai/ai-toolkit/client/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/guides',
    destination: '/ai/ai-toolkit/client/agents/ai-agent-chatbot',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives',
    destination: '/ai/ai-toolkit/client/api-reference/execute-tool',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/tools',
    destination: '/ai/ai-toolkit/client/agents/tools',
    permanent: true,
  },
  /*
    TODO DF：SAIT 发布期间将此部分注释掉，因为这些目标链接在 main 分支上已失效。
  {
    source: '/content-ai/capabilities/ai-toolkit/changelog/ai-toolkit',
    destination: '/resources/changelog/pro-ai-toolkit',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/changelog/ai-toolkit-ai-sdk',
    destination: '/resources/changelog/pro-ai-toolkit-ai-sdk',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/changelog/ai-toolkit-anthropic',
    destination: '/resources/changelog/pro-ai-toolkit-anthropic',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/changelog/ai-toolkit-langchain',
    destination: '/resources/changelog/pro-ai-toolkit-langchain',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/changelog/ai-toolkit-openai',
    destination: '/resources/changelog/pro-ai-toolkit-openai',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/changelog/ai-toolkit-tool-definitions',
    destination: '/resources/changelog/pro-ai-toolkit-tool-definitions',
    permanent: true,
  },
  */
  {
    source: '/content-ai/capabilities/ai-toolkit/guides/multi-document',
    destination: '/ai/ai-toolkit/client/agents/multi-document',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/guides/ai-engineering',
    destination: '/ai/ai-toolkit/client/advanced-guides/ai-engineering',
    permanent: true,
  },
  // Guides 部分已移至 Agents
  {
    source: '/content-ai/capabilities/ai-toolkit/guides/ai-agent-chatbot',
    destination: '/ai/ai-toolkit/client/agents/ai-agent-chatbot',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/guides/review-changes',
    destination: '/ai/ai-toolkit/client/agents/review-changes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/guides/review-changes-as-summary',
    destination: '/ai/ai-toolkit/client/agents/review-changes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/guides/tool-streaming',
    destination: '/ai/ai-toolkit/client/agents/streaming',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/agents/tool-streaming',
    destination: '/ai/ai-toolkit/client/agents/streaming',
    permanent: true,
  },
  // 在线演示已移至 advanced-guides
  {
    source: '/content-ai/capabilities/ai-toolkit/live-demo',
    destination: '/ai/ai-toolkit/client/advanced-guides/live-demo',
    permanent: true,
  },
  // Advanced guides 已移至 Agents
  {
    source: '/content-ai/capabilities/ai-toolkit/advanced-guides/comments',
    destination: '/ai/ai-toolkit/client/agents/comments',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/advanced-guides/multi-document',
    destination: '/ai/ai-toolkit/client/agents/multi-document',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/advanced-guides/selection-awareness',
    destination: '/ai/ai-toolkit/client/agents/selection-awareness',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/advanced-guides/schema-awareness',
    destination: '/ai/ai-toolkit/client/agents/schema-awareness',
    permanent: true,
  },
  // Tools 部分已移至 Agents 下
  {
    source: '/content-ai/capabilities/ai-toolkit/tools/available-tools',
    destination: '/ai/ai-toolkit/client/agents/tools',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/tools/ai-sdk',
    destination: '/ai/ai-toolkit/client/agents/tools/ai-sdk',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/tools/langchain-js',
    destination: '/ai/ai-toolkit/client/agents/tools/langchain-js',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/tools/openai',
    destination: '/ai/ai-toolkit/client/agents/tools/openai',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/tools/anthropic',
    destination: '/ai/ai-toolkit/client/agents/tools/anthropic',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/tools/mastra',
    destination: '/ai/ai-toolkit/client/agents/tools/mastra',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/tools/other-providers',
    destination: '/ai/ai-toolkit/client/agents/tools/other-providers',
    permanent: true,
  },
  // Primitives 已重命名为 API reference
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/execute-tool',
    destination: '/ai/ai-toolkit/client/api-reference/execute-tool',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/read-the-document',
    destination: '/ai/ai-toolkit/client/api-reference/read-the-document',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/edit-the-document',
    destination: '/ai/ai-toolkit/client/api-reference/edit-the-document',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/schema-awareness',
    destination: '/ai/ai-toolkit/client/api-reference/schema-awareness',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/display-suggestions',
    destination: '/ai/ai-toolkit/client/api-reference/suggestions',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/api-reference/display-suggestions',
    destination: '/ai/ai-toolkit/client/api-reference/suggestions',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/agents/justified-changes',
    destination: '/ai/ai-toolkit/client/agents/review-changes/suggestions-with-comments',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/agents/tracked-changes',
    destination: '/ai/ai-toolkit/client/agents/review-changes/tracked-changes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/advanced-guides/style-suggestions',
    destination: '/ai/ai-toolkit/client/agents/review-changes/style-suggestions',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/advanced-guides/suggestions',
    destination: '/ai/ai-toolkit/client/agents/review-changes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/compare-documents',
    destination: '/ai/ai-toolkit/client/advanced-guides/compare-documents',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/api-reference/compare-documents',
    destination: '/ai/ai-toolkit/client/advanced-guides/compare-documents',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/diff-utility',
    destination: '/ai/ai-toolkit/client/api-reference/diff-utility',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/primitives/workflows',
    destination: '/ai/ai-toolkit/client/api-reference/workflows',
    permanent: true,
  },
  // 迁移指南已移至 advanced-guides 下
  {
    source: '/content-ai/capabilities/ai-toolkit/migration-guides',
    destination: '/ai/ai-toolkit/client/advanced-guides/migration-guides',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/migration-guides/ai-generation',
    destination: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-generation',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/migration-guides/ai-suggestion',
    destination: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-suggestion',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/migration-guides/ai-changes',
    destination: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-changes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/migration-guides/ai-assistant',
    destination: '/ai/ai-toolkit/client/advanced-guides/migration-guides/ai-assistant',
    permanent: true,
  },
  // AI Toolkit 重定向结束
  // Server AI Toolkit 重定向
  {
    source: '/content-ai/capabilities/server-ai-toolkit/advanced-guides',
    destination: '/ai/ai-toolkit/advanced-guides/custom-nodes',
    permanent: true,
  },
  {
    source: '/ai/ai-toolkit/advanced-guides',
    destination: '/ai/ai-toolkit/advanced-guides/custom-nodes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/agents/schema-awareness',
    destination: '/ai/ai-toolkit/advanced-guides/custom-nodes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/api-reference/schema-awareness',
    destination: '/ai/ai-toolkit/api-reference/editor-context',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/api-reference/tools',
    destination: '/ai/ai-toolkit/api-reference/rest-api',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/agents/tools',
    destination: '/ai/ai-toolkit/api-reference/rest-api',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/tools',
    destination: '/ai/ai-toolkit/api-reference/rest-api',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/workflows',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  // Server AI Toolkit 重定向结束
  {
    source: '/content-ai/resources/collaboration',
    destination: '/ai/deprecated/resources/collaboration',
    permanent: true,
  },
  {
    source: '/hocuspocus/introduction',
    destination: '/hocuspocus/getting-started/overview',
    permanent: true,
  },
  {
    source: '/editor/ai/advanced-usage/custom-llm',
    destination: '/ai/deprecated/custom-llms/',
    permanent: true,
  },
  {
    source: '/content-ai/content-ai/custom-llms',
    destination: '/ai/deprecated/custom-llms/',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/advanced-guides/proofreader',
    destination: '/ai/ai-toolkit/client/workflows/proofreader',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/guides/inline-edits',
    destination: '/ai/ai-toolkit/client/workflows/insert-content',
    permanent: true,
  },
  {
    source: '/pages/core-concepts/page-break',
    destination: '/pages/core-concepts/page-break-node',
    permanent: true,
  },
  // 更多 SAIT 发布重定向
  {
    source: '/content-ai/getting-started/overview',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/use-cases',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/use-cases/index',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  {
    source: '/examples/experiments/ai-agent',
    destination: '/ai/deprecated/agent/overview',
    permanent: true,
  },
  {
    source: '/content-ai/resources/privacy',
    destination: '/ai/basic/privacy',
    permanent: true,
  },
  {
    source: '/ai',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  {
    source: '/ai/ai-toolkit',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  {
    source: '/editor/extensions/functionality/server-ai-toolkit',
    destination: '/ai/ai-toolkit/overview',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/server-ai-toolkit/:rest*',
    destination: '/ai/ai-toolkit/:rest*',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/generation/:rest*',
    destination: '/ai/basic/:rest*',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/changelog/:rest*',
    destination: '/ai/ai-toolkit/client/changelog',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/agents/review-changes-as-summary',
    destination: '/ai/ai-toolkit/client/agents/review-changes',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/ai-toolkit/:rest*',
    destination: '/ai/ai-toolkit/client/:rest*',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/text-generation/:rest*',
    destination: '/ai/basic/text-generation/:rest*',
    permanent: true,
  },
  {
    source: '/content-ai/capabilities/:rest*',
    destination: '/ai/deprecated/:rest*',
    permanent: true,
  },
  {
    source: '/content-ai/resources/:rest*',
    destination: '/ai/basic/:rest*',
    permanent: true,
  },
  {
    source: '/content-ai/custom-llms',
    destination: '/ai/basic/custom-llms',
    permanent: true,
  },
  {
    source: '/content-ai/custom-llms/index',
    destination: '/ai/basic/custom-llms',
    permanent: true,
  },
  {
    source: '/content-ai/:rest*',
    destination: '/ai/:rest*',
    permanent: true,
  },
  {
    source: '/ai/ai-toolkit/client',
    destination: '/ai/ai-toolkit/client/overview',
    permanent: true,
  },
  {
    source: '/ai/basic',
    destination: '/ai/basic/overview',
    permanent: true,
  },
  {
    source: '/ai/ai-toolkit/client/advanced-guides',
    destination: '/ai/ai-toolkit/client/advanced-guides/live-demo',
    permanent: true,
  },
  // 更多 SAIT 发布重定向结束
]
