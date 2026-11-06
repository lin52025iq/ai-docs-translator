import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { type Project, projectSchema } from '../project/config.ts'
import { readOptionalText } from '../shared/files.ts'

/** 框架语言独立于翻译目标；未配置、缺失或空白时回退到内置中文框架。 */
export async function buildTranslationContext(
    project: Project | undefined,
    locale: string,
    options: { sourceLanguage?: string; pushDraft?: boolean } = {}
) {
    const config = project?.config
    const directory = project?.directory ?? process.cwd()
    const glossary = project?.glossary
    const translation = config?.translation ?? projectSchema.shape.translation.parse(undefined)
    const target = config?.targets.find((entry) => entry.locale === locale && entry.enabled)
    if (config && !target) throw new Error(`目标语言未配置或未启用：${locale}`)
    const source = options.sourceLanguage ?? config?.source.language ?? 'auto'
    if (
        options.sourceLanguage &&
        glossary &&
        glossary.sourceLanguage !== 'auto' &&
        source !== 'auto' &&
        glossary.sourceLanguage !== source
    ) {
        throw new Error('Glossary 源语言必须与指定的源语言一致')
    }
    const prompts = translation.prompts
    const frameworkLanguage = target?.frameworkLanguage ?? prompts.frameworkLanguage
    const frameworkPath = prompts.frameworks[frameworkLanguage]
    const customFramework = frameworkPath ? await readOptionalText(resolve(directory, frameworkPath)) : undefined
    const framework = customFramework?.trim()
        ? customFramework
        : await readFile(new URL('./prompts/zh-CN.md', import.meta.url), 'utf8')
    const common = prompts.common ? await readOptionalText(resolve(directory, prompts.common)) : undefined
    const language = target?.prompt ? await readOptionalText(resolve(directory, target.prompt)) : undefined
    const terms = (glossary?.terms ?? []).flatMap((term) => {
        const translation = term.doNotTranslate ? term.source : term.translations[locale]
        return translation ? [{ source: term.source, translation, context: term.context }] : []
    })
    const instructions = [framework, common?.trim(), language?.trim()].filter(Boolean).join('\n\n')
    const model = translation.model
    const review = { ...translation.review, pushDraft: options.pushDraft ?? translation.review.pushDraft }
    const reviewInstructions = await readFile(new URL('./prompts/review.zh-CN.md', import.meta.url), 'utf8')
    const contextHash = createHash('sha256')
        .update(
            JSON.stringify({
                instructions,
                terms,
                model,
                review,
                reviewInstructions,
                sourceLanguage: source,
                locale
            })
        )
        .digest('hex')
    return {
        instructions,
        terms,
        model,
        contextHash,
        sourceLanguage: source,
        targetLanguage: locale,
        review,
        reviewInstructions
    }
}

export type TranslationContext = Awaited<ReturnType<typeof buildTranslationContext>>
