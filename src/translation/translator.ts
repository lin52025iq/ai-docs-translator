import OpenAI from 'openai'
import { zodTextFormat } from 'openai/helpers/zod'
import { z } from 'zod'

import { logProgress } from '../shared/log.ts'
import { buildFileInput, type TranslationContext } from './prompt.ts'
import { reviewTranslation } from './review.ts'

const translationSchema = z.object({ content: z.string() })

/** 单文件任务的业务错误；不携带服务端原始响应，避免进度或日志泄露文档内容。 */
export class TranslationError extends Error {
    readonly code: string
    readonly status: 'retryable_failed' | 'failed' | 'blocked'

    constructor(code: string, status: 'retryable_failed' | 'failed' | 'blocked', message: string) {
        super(message)
        this.name = 'TranslationError'
        this.code = code
        this.status = status
    }
}

/** 仅在 Node.js 中实例化；凭据使用 OPENAI_API_KEY，重试与超时由官方 SDK 负责。 */
export function createTranslator() {
    const client = new OpenAI({ maxRetries: 2, timeout: 120_000 })
    return async (input: {
        path: string
        sourceContent: string
        previousTranslation?: string
        context: TranslationContext
    }) => {
        const { context } = input
        logProgress(`[${context.targetLanguage}] ${input.path} 开始调用翻译模型 ${context.model}`)
        let response
        try {
            response = await client.responses.parse({
                model: context.model,
                store: false,
                instructions: context.instructions,
                input: [
                    {
                        role: 'user',
                        content: buildFileInput({
                            context,
                            path: input.path,
                            glossary: context.terms,
                            sourceContent: input.sourceContent,
                            previousTranslation: input.previousTranslation
                        })
                    }
                ],
                text: { format: zodTextFormat(translationSchema, 'translated_document') }
            })
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
                if (error.code === 'insufficient_quota') {
                    throw new TranslationError('QUOTA_EXCEEDED', 'blocked', '模型额度不足')
                }
                if (error.status === 401 || error.status === 403 || error.status === 404) {
                    throw new TranslationError('PROVIDER_CONFIGURATION', 'blocked', '模型凭据、权限或模型配置不可用')
                }
                if (
                    !error.status ||
                    error.status === 408 ||
                    error.status === 409 ||
                    error.status === 429 ||
                    error.status >= 500
                ) {
                    throw new TranslationError(
                        'PROVIDER_UNAVAILABLE',
                        'retryable_failed',
                        '模型请求暂时失败，SDK 重试已结束'
                    )
                }
                throw new TranslationError(
                    'REQUEST_REJECTED',
                    'failed',
                    '模型拒绝了当前文件的请求，请检查内容或上下文长度'
                )
            }
            throw new TranslationError('INVALID_RESPONSE', 'failed', '模型响应无法解析为完整译文')
        }
        if (response.status !== 'completed' || !response.output_parsed) {
            throw new TranslationError('INCOMPLETE_RESPONSE', 'failed', '模型未完成翻译或拒绝了请求')
        }
        const generatedContent = response.output_parsed.content
        // 模型可能省略文件末尾换行；仅有此差异时保留原文，不触发额外审查。
        const unchanged = generatedContent.replace(/(?:\r?\n)+$/, '') === input.sourceContent.replace(/(?:\r?\n)+$/, '')
        const content = unchanged ? input.sourceContent : generatedContent
        logProgress(
            `[${context.targetLanguage}] ${input.path} ${unchanged ? '结果与原文内容一致，保留原文并跳过 Decisions 审查' : '模型翻译返回，开始输出检查'}`
        )
        const localConflict =
            !content.trim() && input.sourceContent.trim()
                ? { code: 'EMPTY_TRANSLATION', message: '模型返回了空译文' }
                : null
        let decision: Awaited<ReturnType<typeof reviewTranslation>> | null = null
        if (!unchanged) {
            logProgress(
                `[${context.targetLanguage}] ${input.path} 非空检查${localConflict ? `未通过：${localConflict.code}` : '通过'}`
            )
        }
        if (!unchanged && !localConflict && context.review.enabled) {
            logProgress(`[${context.targetLanguage}] ${input.path} 开始 Decisions 输出审查`)
            try {
                decision = await reviewTranslation(client, {
                    path: input.path,
                    sourceContent: input.sourceContent,
                    translatedContent: content,
                    context
                })
                logProgress(
                    `[${context.targetLanguage}] ${input.path} Decisions 审查${decision.approved ? '通过' : '未通过'}`
                )
            } catch {
                throw new TranslationError('REVIEW_UNAVAILABLE', 'blocked', '输出审查调用失败，拒绝应用译文')
            }
        }
        return {
            content,
            model: response.model,
            responseId: response.id,
            contextHash: context.contextHash,
            usage: response.usage,
            review: {
                approved: unchanged || (!localConflict && (decision?.approved ?? !context.review.enabled)),
                unchanged,
                localConflict,
                decision
            }
        }
    }
}
