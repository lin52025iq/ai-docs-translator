import { createHash, randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'

import { type Project, projectSchema } from '../project/config.ts'
import { readOptionalText } from '../shared/files.ts'

/** 框架语言独立于翻译目标；未配置、缺失或空白时回退到内置中文框架。 */
export async function buildTranslationContext(
    project: Project | undefined,
    locale: string,
    options: { sourceLanguage?: string } = {}
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
    const contextHash = createHash('sha256')
        .update(
            JSON.stringify({
                instructions,
                terms,
                model,
                // 输入组织方式变化会影响模型结果，应使此前失败任务重新进入规划。
                inputFormat: 'dynamic-tagged-file-v2',
                // 输出比较规则变化后，允许此前因末尾换行差异产生的冲突重新处理。
                outputComparison: 'ignore-terminal-newlines-v1',
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
        targetLanguage: locale
    }
}

export type TranslationContext = Awaited<ReturnType<typeof buildTranslationContext>>

/** 任务信息与文件正文分区，正文直接插入，保留换行及原始字符。 */
export function buildFileInput(input: {
    path: string
    context: Pick<TranslationContext, 'sourceLanguage' | 'targetLanguage'>
    glossary?: TranslationContext['terms']
    sourceContent: string
    previousTranslation?: string
    repair?: { candidate: string; diagnostics: string }
}) {
    const metadata = `源语言：${input.context.sourceLanguage}\n目标语言：${input.context.targetLanguage}\n文件路径：${input.path}\n扩展名：${extname(input.path) || '无扩展名'}`
    const regions: [string, string][] = []
    if (input.glossary?.length) {
        const terms = input.glossary
            .map(
                (term) => `- ${term.source} → ${term.translation}${term.context ? `（适用语境：${term.context}）` : ''}`
            )
            .join('\n')
        regions.push(['glossary', terms])
    }
    if (input.previousTranslation?.trim()) {
        regions.push(['previous_translation', input.previousTranslation])
    }
    regions.push(['source_content', input.sourceContent])
    if (input.repair) {
        regions.push(
            ['rejected_candidate', input.repair.candidate],
            ['validation_diagnostics', input.repair.diagnostics]
        )
    }
    // 后缀不出现在任何输入数据中，则整组开始、结束标签都不会与内容碰撞。
    const contents = [metadata, ...regions.map(([, content]) => content)]
    let suffix: string
    do {
        suffix = randomUUID().replaceAll('-', '')
    } while (contents.some((content) => content.includes(suffix)))
    const sections = [metadata, `分区标签：\n${regions.map(([name]) => `${name}：${name}_${suffix}`).join('\n')}`]
    for (const [name, content] of regions) {
        sections.push(`<${name}_${suffix}>\n${content}\n</${name}_${suffix}>`)
    }
    return sections.join('\n\n')
}
