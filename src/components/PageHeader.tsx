import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { PageHeaderBreadcrumbs } from './PageHeader.client'
import { Tag } from './ui/Tag'
import Link from '@/components/Link'
import { cn } from '@/utils'
import { ImagePageTag, PageTag } from '@/types'

export type PageHeaderWrapperProps = {
  asChild?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const PageHeaderWrapper = forwardRef<HTMLDivElement, PageHeaderWrapperProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'header'

    const wrapperClass = cn('mb-12 pb-12 border-b border-grayAlpha-200', className)

    return (
      <Component className={wrapperClass} {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

PageHeaderWrapper.displayName = 'PageHeader.Wrapper'

export type PageHeaderTitleProps = {
  asChild?: boolean
} & React.HTMLAttributes<HTMLHeadingElement>

const PageHeaderTitle = forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'h1'

    const titleClass = cn(
      'text-[2.8rem] font-bold text-black leading-none text-balance max-w-[42rem]',
      className,
    )

    return (
      <Component id="page-title" className={titleClass} {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

PageHeaderTitle.displayName = 'PageHeader.Title'

export type PageHeaderDescriptionProps = {
  asChild?: boolean
} & React.HTMLAttributes<HTMLParagraphElement>

const PageHeaderDescription = forwardRef<HTMLParagraphElement, PageHeaderDescriptionProps>(
  ({ asChild, children, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'p'

    const descriptionClass = cn('text-[1.25rem] leading-[140%] text-black mt-8', className)

    return (
      <Component className={descriptionClass} {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

PageHeaderDescription.displayName = 'PageHeader.Description'

export type PageHeaderIntroProps = React.HTMLAttributes<HTMLDivElement>

// 使用 div 而不是 p：简介内容是 HTML，可以包含段落或列表
const PageHeaderIntro = forwardRef<HTMLDivElement, PageHeaderIntroProps>(
  ({ children, className, ...props }, ref) => {
    // 代码和链接的样式与下方正文中的一致
    const introClass = cn(
      'text-[1.125rem] leading-[150%] text-grayAlpha-700 mt-4 max-w-[42rem] text-pretty',
      '[&_code]:bg-gray-200 [&_code]:text-purple-600 [&_code]:rounded-[6px] [&_code]:px-[0.4em] [&_code]:text-[0.9em]',
      '[&_a]:border-b [&_a]:border-current [&_a:hover]:text-purple-500 [&>*+*]:mt-2',
      className,
    )

    return (
      <div className={introClass} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)

PageHeaderIntro.displayName = 'PageHeader.Intro'

const isImageTag = (tag: PageTag): tag is ImagePageTag => {
  return tag.type === 'image'
}

export type PageHeaderTagsProps = {
  tags: PageTag[]
  isTemplate?: boolean
}

export const PageHeaderTags = ({ tags, isTemplate = false }: PageHeaderTagsProps) => {
  return (
    <div className="flex items-center gap-1 flex-wrap mt-6">
      {tags.map((tag, index) => (
        <PageHeaderTag tag={tag} isTemplate={isTemplate} key={index} />
      ))}
    </div>
  )
}

export const PageHeaderTag = ({
  tag,
  isTemplate = false,
}: {
  tag: PageTag
  isTemplate?: boolean
}) => {
  if (isImageTag(tag)) {
    return (
      <Link href={tag.url} target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tag.src} alt={tag.label} />
      </Link>
    )
  }

  if (tag.type === 'pro') {
    return (
      <Tag
        variant="invert"
        tooltip={tag.tooltip || 'Pro 扩展需要订阅 Tiptap。'}
      >
        专业版扩展
      </Tag>
    )
  }

  if (tag.type === 'beginStart') {
    return <Tag tooltip={tag.tooltip}>Start 计划起可用</Tag>
  }

  if (tag.type === 'start') {
    const defaultTooltip = isTemplate
      ? '订阅 Start 计划后即可集成和使用。使用此模板须遵守我们的专业版许可和服务条款。'
      : '订阅 Start 计划后即可集成和使用。'
    return <Tag tooltip={tag.tooltip || defaultTooltip}>Start 计划可用</Tag>
  }

  if (tag.type === 'addon') {
    return <Tag tooltip={tag.tooltip || '将此附加组件添加到您的订阅中'}>付费附加组件</Tag>
  }

  if (tag.type === 'mit') {
    return (
      <Tag variant="invert" tooltip={tag.tooltip || '可根据 MIT 许可证免费使用。'}>
        免费使用
      </Tag>
    )
  }

  if (tag.type === 'team') {
    const defaultTooltip = isTemplate
      ? '订阅 Team 计划后即可集成和使用。使用此模板须遵守我们的专业版许可和服务条款。'
      : '订阅 Team 计划后即可集成和使用。'
    return <Tag tooltip={tag.tooltip || defaultTooltip}>Team 计划可用</Tag>
  }

  if (tag.type === 'business') {
    return (
      <Tag
        tooltip={
          tag.tooltip || '订阅 Business 或 Enterprise 计划后即可集成和使用。'
        }
      >
        Business 计划
      </Tag>
    )
  }

  if (tag.type === 'ai') {
    return <Tag tooltip={tag.tooltip}>AI 工具包</Tag>
  }

  if (tag.type === 'collaboration') {
    return <Tag tooltip={tag.tooltip}>协作</Tag>
  }

  if (tag.type === 'documents') {
    return <Tag tooltip={tag.tooltip}>文档</Tag>
  }

  if (tag.type === 'editor') {
    return <Tag tooltip={tag.tooltip}>编辑器</Tag>
  }

  if (tag.type === 'new') {
    return (
      <Tag variant="info" tooltip={tag.tooltip}>
        新版
      </Tag>
    )
  }

  if (tag.type === 'beta') {
    return (
      <Tag variant="info" tooltip={tag.tooltip}>
        测试版
      </Tag>
    )
  }

  if (tag.type === 'alpha') {
    return (
      <Tag variant="info" tooltip={tag.tooltip}>
        Alpha 版
      </Tag>
    )
  }

  if (tag.type === 'experiment') {
    return <Tag tooltip={tag.tooltip}>实验功能</Tag>
  }

  if (tag.type === 'restricted') {
    return (
      <Tag
        asChild
        variant="info"
        tooltip={tag.tooltip || '联系我们的团队，申请加入试点计划。'}
      >
        <Link
          href="https://tiptap.dev/contact-sales?form=pilot-program"
          target="_blank"
          rel="noopener noreferrer"
        >
          {tag.label || '试点计划'}
        </Link>
      </Tag>
    )
  }

  if (tag.type === 'deprecated') {
    return (
      <Tag
        variant="warning"
        tooltip={
          tag.tooltip ||
          '此扩展将于 2026 年弃用，并由 AI 工具包取代。'
        }
      >
        已弃用
      </Tag>
    )
  }

  if (tag.type === 'version') {
    return (
      <Tag variant="gray" tooltip={tag.tooltip}>
        {tag.label || '版本'}
      </Tag>
    )
  }
}

export const PageHeader = {
  Wrapper: PageHeaderWrapper,
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Intro: PageHeaderIntro,
  Breadcrumbs: PageHeaderBreadcrumbs,
  Tags: PageHeaderTags,
  Tag: PageHeaderTag,
}
