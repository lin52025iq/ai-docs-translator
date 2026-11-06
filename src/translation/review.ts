import { type OpenAI } from 'openai'

import { buildFileInput, type TranslationContext } from './prompt.ts'

/** 检查候选内容是否符合文件翻译任务；缺失、拒答及低于阈值均不能通过。 */
export async function reviewTranslation(
    client: OpenAI,
    input: {
        path: string
        sourceContent: string
        translatedContent: string
        context: TranslationContext
    }
) {
    const { context } = input
    const options = context.review
    const name = 'output_validity'
    const decision = await client.decisions.create({
        model: options.model,
        input: buildFileInput({
            context,
            path: input.path,
            sourceContent: input.sourceContent,
            translatedContent: input.translatedContent
        }),
        questions: [{ name, type: 'predicate', instructions: context.reviewInstructions }]
    })
    const answer = decision.answers.find((entry) => entry.name === name)
    const probability = answer?.type === 'predicate' ? answer.probability : null
    const passed = probability !== null && probability >= options.minimumProbability && probability <= 1
    return {
        approved: passed,
        model: decision.model,
        minimumProbability: options.minimumProbability,
        checks: [{ name, question: context.reviewInstructions, probability, passed }],
        usage: decision.usage
    }
}
