import { type Diagnostic } from '../validation/runner.ts'
import { type createTranslator } from './translator.ts'

type Translate = ReturnType<typeof createTranslator>
const maxAttempts = 3

/** 同一文件的初译和两种校验反馈共享计数。 */
export async function translateValidated(
    translate: Translate,
    input: Parameters<Translate>[0],
    validate: (path: string, content: string) => Promise<Diagnostic[]>,
    attempts: Map<string, number>
) {
    const diagnostics: Diagnostic[][] = []
    let repair = input.repair
    let candidate: Awaited<ReturnType<Translate>> | undefined
    while ((attempts.get(input.path) ?? 0) < maxAttempts) {
        attempts.set(input.path, (attempts.get(input.path) ?? 0) + 1)
        candidate = await translate({ ...input, repair })
        const issues =
            !candidate.content.trim() && input.sourceContent.trim()
                ? [{ path: input.path, message: '模型返回了空译文' }]
                : await validate(input.path, candidate.content)
        if (!issues.length) return { ...candidate, approved: true, diagnostics }
        diagnostics.push(issues)
        repair = { candidate: candidate.content, diagnostics: JSON.stringify(issues).slice(0, 8000) }
    }
    if (!candidate) throw new Error('当前文件的模型调用次数已用尽')
    return { ...candidate, approved: false, diagnostics }
}

/** 在剩余额度内修正可定位的文件，再校验更新后的整体快照。 */
export async function validateWithRepairs(options: {
    validate: () => Promise<Diagnostic[]>
    canRepair: (path: string) => boolean
    repair: (path: string, issues: Diagnostic[]) => Promise<boolean>
    attempts: Map<string, number>
}) {
    const rounds: Diagnostic[][] = []
    while (true) {
        const issues = await options.validate()
        if (!issues.length) return { passed: true, rounds }
        rounds.push(issues)
        const byPath = new Map<string, Diagnostic[]>()
        for (const issue of issues) {
            const { path } = issue
            if (!path || !options.canRepair(path) || (options.attempts.get(path) ?? 0) >= maxAttempts) {
                return { passed: false, rounds }
            }
            const existing = byPath.get(path)
            if (existing) existing.push(issue)
            else byPath.set(path, [issue])
        }
        for (const [path, diagnostics] of byPath) {
            if (!(await options.repair(path, diagnostics))) return { passed: false, rounds }
        }
    }
}
