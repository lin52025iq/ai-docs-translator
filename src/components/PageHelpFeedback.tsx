'use client'
import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from './ui/Button'
const NO_OPTIONS = ['内容不准确', '信息缺失', '难以理解', '代码示例有误']

export type FeedbackState = 'initial' | 'yes' | 'no' | 'submitted'

export default function PageHelpFeedback({ className }: { className?: string }) {
  const [state, setState] = useState<FeedbackState>('initial')
  const [yesText, setYesText] = useState('')
  const [noOption, setNoOption] = useState('')
  const [noText, setNoText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [lastFeedbackWasYes, setLastFeedbackWasYes] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    const slug = window.location.pathname
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
    await fetch(`${basePath}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        helpful: state === 'yes',
        yesText: state === 'yes' ? yesText : undefined,
        noOption: state === 'no' ? noOption : undefined,
        noText: state === 'no' ? noText : undefined,
      }),
    })
    setSubmitting(false)
    setState('submitted')
    if (state === 'yes') {
      setLastFeedbackWasYes(true)
      setTimeout(() => setLastFeedbackWasYes(false), 1000)
    }
    setYesText('')
    setNoOption('')
    setNoText('')
  }

  return (
    <>
      <div
        className={`flex flex-col items-start gap-2 text-sm w-full ${className ?? ''}`}
        style={{ minHeight: 90 }}
      >
        <div className="flex flex-row items-center gap-x-3 w-full">
          <h3 className="font-medium text-gray-800 m-0 flex items-center">
            此页面对您有帮助吗？
          </h3>
          <div className="flex gap-0">
            <Button
              aria-label="是"
              variant={state === 'yes' ? 'secondary' : 'tertiary'}
              size="small"
              className={`rounded-lg hover:bg-grayAlpha-200 transition-colors ${state === 'yes' ? 'bg-gray-200 border border-gray-400' : ''} ${state === 'submitted' && lastFeedbackWasYes ? '' : ''}`}
              onClick={() => setState(state === 'yes' ? 'initial' : 'yes')}
              disabled={submitting}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button
              aria-label="否"
              variant={state === 'no' ? 'secondary' : 'tertiary'}
              size="small"
              className={`rounded-lg hover:bg-grayAlpha-200 transition-colors ${state === 'no' ? 'bg-gray-200 border border-gray-400' : ''}`}
              onClick={() => setState(state === 'no' ? 'initial' : 'no')}
              disabled={submitting}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {state === 'submitted' && !lastFeedbackWasYes && (
          <span className="inline-block text-xs text-gray-800 bg-gray-100 border border-gray-200 rounded px-2 py-1 mt-1">
            感谢您的反馈！
          </span>
        )}
        {state === 'yes' && (
          <form
            className="flex flex-col gap-2 w-full max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <textarea
              rows={3}
              className="border border-gray-200 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none w-full max-w-2xl"
              placeholder="哪些内容对您有帮助？（选填）"
              value={yesText}
              onChange={(e) => setYesText(e.target.value)}
              aria-label="您具体喜欢哪些内容？（选填）"
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !submitting) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            />
            <div className="flex gap-2 mt-1">
              <Button type="submit" variant="secondary" disabled={submitting}>
                {submitting ? '正在提交...' : '提交'}
              </Button>
            </div>
          </form>
        )}
        {state === 'no' && (
          <form
            className="flex flex-col gap-2 w-full max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <div className="flex flex-col gap-1">
              {NO_OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="no-option"
                    value={option}
                    checked={noOption === option}
                    onChange={() => setNoOption(option)}
                    className="accent-gray-800"
                    aria-label={option}
                  />
                  {option}
                </label>
              ))}
            </div>
            {noOption && (
              <textarea
                rows={3}
                className="border border-gray-200 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none w-full max-w-2xl"
                placeholder="能否提供更多详细信息？（选填）"
                value={noText}
                onChange={(e) => setNoText(e.target.value)}
                aria-label="能否提供更多详细信息？"
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !submitting) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
              />
            )}
            <div className="flex gap-2 mt-1">
              <Button type="submit" variant="secondary" disabled={submitting || !noOption}>
                {submitting ? '正在提交...' : '提交'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
