import { randomUUID } from 'node:crypto'

import { type ProjectConfig } from '../project/config.ts'
import { type createTranslator } from '../translation/translator.ts'
import { branchHead, commitBranchFiles, repositoryGit } from './branches.ts'

/** 冲突档案与正式译文复用独立索引提交，不切换当前分支或带入暂存内容。 */
export async function commitConflictDraft(input: {
    repository: string
    config: Pick<ProjectConfig, 'project'> & { translation: Pick<ProjectConfig['translation'], 'review'> }
    locale: string
    path: string
    sourceContent: string
    previousTranslation?: string
    result: Awaited<ReturnType<ReturnType<typeof createTranslator>>>
}) {
    const options = input.config.translation.review
    const branch = options.draftBranch ?? `${input.config.project.id}-draft`
    const git = repositoryGit(input.repository)
    const parent = await branchHead(git, branch, options.pushDraft ? options.remote : undefined)
    const artifactPath = `conflicts/${input.locale}/${randomUUID()}`
    const failedChecks = input.result.review.decision?.checks.filter((check) => !check.passed) ?? []
    const reason =
        input.result.review.localConflict?.message ??
        `Decisions 输出审查未通过：${failedChecks.map((check) => check.name).join('、')}`
    const report = {
        schemaVersion: 1,
        status: 'conflict',
        origin: input.result.review.localConflict ? 'local_validation' : 'decisions',
        projectId: input.config.project.id,
        locale: input.locale,
        sourcePath: input.path,
        createdAt: new Date().toISOString(),
        reason,
        artifacts: {
            before: `before/${input.path}`,
            after: `after/${input.path}`,
            previous: input.previousTranslation !== undefined ? `previous/${input.path}` : null
        },
        translationModel: input.result.model,
        translationResponseId: input.result.responseId,
        contextHash: input.result.contextHash,
        review: input.result.review
    }
    const artifacts: Record<string, string> = {
        [`before/${input.path}`]: input.sourceContent,
        [`after/${input.path}`]: input.result.content,
        'report.json': `${JSON.stringify(report, null, 4)}\n`,
        'README.md': `# 翻译输出异常\n\n${reason}\n\n候选译文未应用，成功状态未推进。before/ 为原文，after/ 为候选译文，previous/ 为可选旧译文，均保留原始目录和扩展名。错误来源与具体判定见 report.json。\n`
    }
    if (input.previousTranslation !== undefined) artifacts[`previous/${input.path}`] = input.previousTranslation
    const commit = await commitBranchFiles({
        repository: input.repository,
        branch,
        parent,
        files: Object.fromEntries(
            Object.entries(artifacts).map(([path, content]) => [`${artifactPath}/${path}`, content])
        ),
        message: `translation(${input.config.project.id}/${input.locale}): record output conflict`,
        push: options.pushDraft,
        remote: options.remote
    })
    return { branch, commit, artifactPath, pushed: options.pushDraft, reason }
}
