import { type OpenAI } from 'openai'

import { type TranslationContext } from './prompt.ts'

const checks = [
    {
        name: 'structure',
        question: '译文是否完整保留原文的文档层级、条目顺序、段落及语法结构，没有缺失、额外内容或破坏性重排？'
    },
    {
        name: 'protected_content',
        question: '译文是否保留了所有不应翻译的代码、标识符、URL、引用、占位符、格式及指令？'
    },
    {
        name: 'behavior',
        question:
            '译文是否只修改安全注释和确认用于界面展示的文案，保留程序行为及业务数据？非代码文件是否保留原有数据与内容组织的含义？'
    }
]

/** 使用 Decisions predicate 检查结构保持概率；缺失、拒答及低于阈值均不能通过。 */
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
    const decision = await client.decisions.create({
        model: options.model,
        input: JSON.stringify({
            path: input.path,
            sourceLanguage: context.sourceLanguage,
            targetLanguage: context.targetLanguage,
            sourceContent: input.sourceContent,
            translatedContent: input.translatedContent
        }),
        questions: checks.map((check) => ({
            name: check.name,
            type: 'predicate',
            instructions: `${context.reviewInstructions}\n\n本题判定：${check.question}`
        }))
    })
    const results = checks.map((check) => {
        const answer = decision.answers.find((entry) => entry.name === check.name)
        const probability = answer?.type === 'predicate' ? answer.probability : null
        const passed = probability !== null && probability >= options.minimumProbability && probability <= 1
        return { name: check.name, question: check.question, probability, passed }
    })
    return {
        approved: results.every((entry) => entry.passed),
        model: decision.model,
        minimumProbability: options.minimumProbability,
        checks: results,
        usage: decision.usage
    }
}
