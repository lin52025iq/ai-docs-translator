'use client'

// TODO [Dave]：我快速调整了一下，将其拆分为 Generation 和 AI Toolkit，但实现得不够优雅。

import {
  MessageSquare,
  FileCheck,
  ListChecks,
  Workflow,
  PenLine,
  Files,
  MessageCircle,
  FileSearch,
  Layers,
  GitCompare,
  Volume2,
  Languages,
  AlignLeft,
  CheckCircle2,
  Type,
  RotateCcw,
  ImagePlus,
  Activity,
  Edit,
  type LucideIcon,
} from 'lucide-react'

import { Card } from './ui/Card'
import Link from '@/components/Link'

interface UseCase {
  title: string
  description: string
  href: string
  tags: string[]
  icon: LucideIcon
}

const CLIENT_USE_CASES: UseCase[] = [
  // AI Toolkit 用例 - AI AGENTS
  {
    title: 'AI 智能体聊天机器人',
    description:
      '创建对话式 AI 界面，让智能体根据用户请求读取和编辑文档。',
    href: '/ai/ai-toolkit/client/agents/ai-agent-chatbot',
    tags: ['AI Agents'],
    icon: MessageSquare,
  },
  {
    title: '审阅更改',
    description:
      '将 AI 的每项编辑显示为类似修订模式的建议，供用户即时审阅。',
    href: '/ai/ai-toolkit/client/agents/review-changes',
    tags: ['AI Agents'],
    icon: FileCheck,
  },
  {
    title: '一次性审阅所有更改',
    description:
      '让 AI 完成所有编辑，然后汇总更改，方便批量审阅和批准。',
    href: '/ai/ai-toolkit/client/agents/review-changes/tracked-changes',
    tags: ['AI Agents'],
    icon: ListChecks,
  },
  {
    title: '编辑多个文档',
    description:
      '构建 AI 智能体，在一个工作流中创建、切换和编辑多个文档。',
    href: '/ai/ai-toolkit/client/agents/multi-document',
    tags: ['AI Agents'],
    icon: Files,
  },
  {
    title: '添加 AI 评论',
    description:
      '让 AI 智能体能够读取、撰写和编辑文档评论，以支持协作工作流。',
    href: '/ai/ai-toolkit/client/agents/comments',
    tags: ['AI Agents'],
    icon: MessageCircle,
  },
  {
    title: '实时流式显示编辑',
    description: '在智能体工作时，实时显示 AI 工具调用和文档更改。',
    href: '/ai/ai-toolkit/client/agents/streaming',
    tags: ['AI Agents'],
    icon: Workflow,
  },
  {
    title: '使用 AI 生成自定义组件',
    description:
      '让 AI 使用自定义编辑器节点和标记生成内容，而不仅限于基本文本。',
    href: '/ai/ai-toolkit/client/agents/schema-awareness',
    tags: ['AI Agents'],
    icon: Layers,
  },

  // AI Toolkit 用例 - 自定义工作流
  {
    title: '进行行内编辑',
    description:
      '选择文本并根据指令使用 AI 改写，最适合简单、聚焦的编辑任务。',
    href: '/ai/ai-toolkit/client/workflows/insert-content',
    tags: ['Workflows'],
    icon: PenLine,
  },
  {
    title: '校对文档',
    description:
      '构建 AI 校对工具，分析文档并提出更正建议，同时说明原因。',
    href: '/ai/ai-toolkit/client/workflows/proofreader',
    tags: ['Workflows'],
    icon: FileSearch,
  },
  {
    title: 'Tiptap Edit',
    description: '用于对 Tiptap 文档进行大大小小编辑的通用工作流。',
    href: '/ai/ai-toolkit/client/workflows/tiptap-edit',
    tags: ['Workflows'],
    icon: Edit,
  },
  {
    title: '评论',
    description: '管理 Tiptap 文档中的评论和讨论串。',
    href: '/ai/ai-toolkit/client/workflows/comments',
    tags: ['Workflows'],
    icon: MessageSquare,
  },
  {
    title: '显示文档差异',
    description:
      '实时比较两个文档版本，并通过高亮显示差异。',
    href: '/ai/ai-toolkit/client/advanced-guides/compare-documents',
    tags: ['Workflows'],
    icon: GitCompare,
  },
]

const GENERATION_USE_CASES = [
  // 基础 AI 生成用例 - 文本处理
  {
    title: '修正语法和拼写',
    description: '自动修正所选文本中的语法和拼写错误。',
    href: '/ai/basic/text-generation/built-in-commands#aifixspellingandgrammar',
    tags: ['Basic AI Generation'],
    icon: CheckCircle2,
  },
  {
    title: '调整文本语气',
    description:
      '将写作语气调整为学术、随意、正式、友好、专业等风格。',
    href: '/ai/basic/text-generation/built-in-commands#aiadjusttone',
    tags: ['Basic AI Generation'],
    icon: Volume2,
  },
  {
    title: '翻译文本',
    description: '使用 AI 翻译所选内容，支持任意语言。',
    href: '/ai/basic/text-generation/built-in-commands#aitranslate',
    tags: ['Basic AI Generation'],
    icon: Languages,
  },
  {
    title: '总结内容',
    description: '生成简明摘要，或从所选文本中提取要点。',
    href: '/ai/basic/text-generation/built-in-commands#aisummarize',
    tags: ['Basic AI Generation'],
    icon: AlignLeft,
  },

  // 基础 AI 生成用例 - 高级功能
  {
    title: '生成富文本格式',
    description: '生成带有粗体、斜体、列表和链接等丰富格式的 AI 回复。',
    href: '/ai/basic/text-generation/format',
    tags: ['Basic AI Generation'],
    icon: Type,
  },
  {
    title: '流式显示 AI 内容',
    description: '以打字机式的流式效果实时显示 AI 生成的文本。',
    href: '/ai/basic/text-generation/stream',
    tags: ['Basic AI Generation'],
    icon: Activity,
  },
  {
    title: '管理 AI 回复',
    description:
      '在将 AI 生成的内容插入编辑器之前，可先预览、接受、拒绝或重新生成。',
    href: '/ai/basic/text-generation/manage-responses',
    tags: ['Basic AI Generation'],
    icon: RotateCcw,
  },
  {
    title: '生成图像',
    description: '使用自定义提示词创建不同视觉风格的 AI 生成图像。',
    href: '/ai/basic/image-generation',
    tags: ['Basic AI Generation'],
    icon: ImagePlus,
  },
]

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = useCase.icon
  return (
    <Card isClickable asChild>
      <Link href={useCase.href}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <Icon className="size-4 text-neutral-600" />
          <div></div>
        </div>
        <div className="font-semibold text-black leading-[140%]">{useCase.title}</div>
        <div className="mt-2 leading-[140%] text-grayAlpha-600">{useCase.description}</div>
      </Link>
    </Card>
  )
}

export const UseCasesGrid: React.FC<{ variant: 'client' | 'generation' }> = ({ variant }) => {
  const useCases = variant === 'client' ? CLIENT_USE_CASES : GENERATION_USE_CASES
  const toolkitAgentUseCases = useCases.filter((uc) => uc.tags.includes('AI Agents'))
  const toolkitWorkflowUseCases = useCases.filter((uc) => uc.tags.includes('Workflows'))
  const generationUseCases = useCases.filter((uc) => uc.tags.includes('Basic AI Generation'))

  return (
    <div className="grid gap-20 first:mt-0 last:mb-0">
      {toolkitAgentUseCases.length > 0 && (
        <UseCaseSection title="AI 智能体" useCases={toolkitAgentUseCases} />
      )}
      {toolkitWorkflowUseCases.length > 0 && (
        <UseCaseSection title="自定义工作流" useCases={toolkitWorkflowUseCases} />
      )}
      {generationUseCases.length > 0 && <UseCaseSection title="" useCases={generationUseCases} />}
    </div>
  )
}

function UseCaseSection({ title, useCases }: { title: string; useCases: UseCase[] }) {
  return (
    <div>
      {title && <div className="text-xl font-bold mb-6 leading-[120%]">{title}</div>}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 xl:gap-5">
        {useCases.map((useCase) => (
          <UseCaseCard useCase={useCase} key={useCase.href} />
        ))}
      </div>
    </div>
  )
}
