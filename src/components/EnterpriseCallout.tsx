import { forwardRef } from 'react'
import { ArrowRightIcon } from 'lucide-react'
import Link from './Link'
import { Button } from './ui/Button'
import { cn } from '@/utils'

export type EnterpriseCalloutProps = {
  variant:
    | 'migration'
    | 'ai-agent'
    | 'ai-toolkit'
    | 'server-ai-toolkit'
    | 'docx'
    | 'pdf'
    | 'odt'
    | 'epub'
    | 'doc'
    | 'markdown'
    | 'tracked-changes'
    | 'compare'
    | 'deprecated'
  inline?: boolean
  disableWaitlist?: boolean
  inverted?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const VARIANT_CONFIG: Record<
  EnterpriseCalloutProps['variant'],
  {
    title: string
    description: string
    showWaitlist: boolean
    contactUrl?: string
    buttonText?: string
  }
> = {
  migration: {
    title: '迁移支持',
    description:
      '在 Business 或 Enterprise 入驻过程中，我们会在专属 Slack 频道中提供实操指导，帮助您迁移内容。',
    showWaitlist: true,
  },
  'ai-agent': {
    title: '在专家支持下构建 AI Agent',
    description:
      '我们正在为开发实时编辑器的 Enterprise 团队提供入驻支持。您可以获得 Agent 设置、LLM 集成和性能调优方面的直接协助。',
    showWaitlist: true,
  },
  'ai-toolkit': {
    title: '将 AI Toolkit 添加到您的订阅',
    description:
      '购买付费订阅附加项即可集成 AI Toolkit。我们可以通过 Slack 提供专属工程支持，指导您完成集成。',
    showWaitlist: false,
  },
  'server-ai-toolkit': {
    title: '获取 AI Toolkit',
    description:
      '将 AI Toolkit 添加到任何 Tiptap 订阅中。我们将通过 Slack 提供专属工程支持，助您顺利完成集成。',
    showWaitlist: false,
  },
  docx: {
    title: '在专家支持下加快 DOCX 集成',
    description:
      '获得专属 Slack 支持、优先功能，以及工程师的实操指导，将 DOCX 集成到您的企业应用中。',
    showWaitlist: true,
  },
  pdf: {
    title: '在专家支持下加快 PDF 导出',
    description:
      '获得专属 Slack 支持、优先功能，以及工程师的实操指导，将 PDF 导出集成到您的企业应用中。',
    showWaitlist: true,
  },
  odt: {
    title: '在专家支持下加快 ODT 导出',
    description:
      '获得专属 Slack 支持、优先功能，以及工程师的实操指导，将 ODT 导出集成到您的企业应用中。',
    showWaitlist: true,
  },
  epub: {
    title: '在专家支持下加快 EPUB 导出',
    description:
      '获得专属 Slack 支持、优先功能，以及工程师的实操指导，将 EPUB 导出集成到您的企业应用中。',
    showWaitlist: true,
  },
  doc: {
    title: '在专家支持下加快 DOC 导出',
    description:
      '获得专属 Slack 支持、优先功能，以及工程师的实操指导，将 DOC 导出集成到您的企业应用中。',
    showWaitlist: true,
  },
  markdown: {
    title: '在专家支持下加快 Markdown 转换',
    description:
      '获得专属 Slack 支持、优先功能，以及工程师的实操指导，将 Markdown 转换集成到您的企业应用中。',
    showWaitlist: true,
  },
  'tracked-changes': {
    title: '获取修订跟踪功能',
    description:
      '将修订跟踪功能添加到任何 Tiptap 订阅中。杜绝静默覆盖：确保每项编辑都由人工接受或拒绝，包括 AI 生成的内容。',
    showWaitlist: false,
    contactUrl: 'https://cloud.tiptap.dev/v2/billing',
    buttonText: '添加到套餐',
  },
  compare: {
    title: '获取 Tiptap Compare',
    description:
      'Compare 是一项可购买并添加到套餐中的附加功能。联系我们的团队即可获取。',
    showWaitlist: false,
    contactUrl: 'https://tiptap.dev/contact-sales',
    buttonText: '联系我们的团队',
  },
  deprecated: {
    title: '迁移到 AI Toolkit',
    description:
      'AI Toolkit 将取代此扩展，带来更出色的性能和更多功能。您当前的配置仍可正常使用。准备好迁移时，我们会为您提供帮助。',
    showWaitlist: false,
  },
}

const DEFAULT_CONTACT_URL = 'https://tiptap.dev/contact-sales?form=ai-toolkit'

export const EnterpriseCallout = forwardRef<HTMLDivElement, EnterpriseCalloutProps>(
  (
    { variant, inline = false, disableWaitlist = false, inverted = false, className, ...rest },
    ref,
  ) => {
    const { title, description, showWaitlist, contactUrl, buttonText } = VARIANT_CONFIG[variant]
    const CONTACT_URL = contactUrl ?? DEFAULT_CONTACT_URL
    const displayWaitlist = showWaitlist && !disableWaitlist

    const waitlistText = '使用的是其他套餐？加入'
    const BUTTON_TEXT = buttonText ?? '联系工程师'

    if (inline) {
      return (
        <div
          ref={ref}
          className={cn(
            'p-6 rounded-xl border max-w-[42rem]',
            inverted ? 'bg-grayAlpha-900 border-grayAlpha-700' : 'bg-white border-grayAlpha-200',
            className,
          )}
          {...rest}
        >
          <h3 className={cn('text-lg font-semibold mb-3', inverted ? 'text-white' : '')}>
            {title}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p
                className={cn(
                  'text-sm mb-3',
                  inverted ? 'text-grayAlpha-300' : 'text-grayAlpha-700',
                )}
              >
                {description.split('\n\n')[0]}
              </p>
              {description.split('\n\n')[1] && (
                <p
                  className={cn(
                    'text-sm mb-3',
                    inverted ? 'text-grayAlpha-300' : 'text-grayAlpha-700',
                  )}
                >
                  {description.split('\n\n')[1]}
                </p>
              )}

              {displayWaitlist && (
                <p
                  className={cn(
                    'text-xs mt-4',
                    inverted ? 'text-grayAlpha-400' : 'text-grayAlpha-600',
                  )}
                >
                  {waitlistText}{' '}
                  <Link
                    href={CONTACT_URL}
                    target="_blank"
                    className={cn(
                      'font-medium underline whitespace-nowrap',
                      inverted
                        ? 'text-purpleAlpha-400 hover:text-purpleAlpha-300'
                        : 'text-purpleAlpha-600 hover:text-purpleAlpha-700',
                    )}
                  >
                    等候名单
                  </Link>
                </p>
              )}
            </div>

            <div className="md:col-span-1 flex flex-col gap-2">
              <Button asChild className="w-full" variant={inverted ? 'secondary' : 'primary'}>
                <Link
                  href={CONTACT_URL}
                  target="_blank"
                  className={cn(
                    'inline-flex items-center justify-center gap-2',
                    inverted ? '!text-black hover:!text-black' : '',
                  )}
                >
                  {BUTTON_TEXT}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </Button>

              <p
                className={cn(
                  'text-xs text-center',
                  inverted ? 'text-grayAlpha-400' : 'text-grayAlpha-500',
                )}
              >
                深受 Axios、PostHog、Beehiiv、GitLab 等团队信赖。
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'p-5 rounded-xl border',
          inverted ? 'bg-grayAlpha-900 border-grayAlpha-700' : 'bg-white border-grayAlpha-200',
          className,
        )}
        {...rest}
      >
        <h3 className={cn('text-lg font-semibold mb-3', inverted ? 'text-white' : '')}>{title}</h3>
        <p
          className={cn(
            'text-sm mb-4 whitespace-pre-line',
            inverted ? 'text-grayAlpha-300' : 'text-grayAlpha-700',
          )}
        >
          {description}
        </p>

        <Button asChild className="w-full mb-3" variant={inverted ? 'secondary' : 'primary'}>
          <Link
            href={CONTACT_URL}
            target="_blank"
            className={cn(
              'inline-flex items-center justify-center gap-2',
              inverted ? '!text-black hover:!text-black' : '',
            )}
          >
            {BUTTON_TEXT}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </Button>

        {displayWaitlist && (
          <div className="text-left mb-2">
            <p className={cn('text-xs', inverted ? 'text-grayAlpha-400' : 'text-grayAlpha-600')}>
              {waitlistText}{' '}
              <Link
                href={CONTACT_URL}
                target="_blank"
                className={cn(
                  'font-medium underline whitespace-nowrap',
                  inverted
                    ? 'text-purpleAlpha-400 hover:text-purpleAlpha-300'
                    : 'text-purpleAlpha-600 hover:text-purpleAlpha-700',
                )}
              >
                等候名单
              </Link>
            </p>
          </div>
        )}

        <div
          className={cn(
            'border-t my-2',
            inverted ? 'border-grayAlpha-700' : 'border-grayAlpha-100',
          )}
        />

        <p className={cn('text-xs', inverted ? 'text-grayAlpha-400' : 'text-grayAlpha-500')}>
          深受 Axios、PostHog、Beehiiv、GitLab 等团队信赖。
        </p>
      </div>
    )
  },
)

EnterpriseCallout.displayName = 'EnterpriseCallout'
