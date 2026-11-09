import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import { type ProjectConfig } from '../project/config.ts'
import { type Diagnostic } from '../validation/runner.ts'
import { branchHead, commitBranchFiles, repositoryGit } from './branches.ts'

type DraftConfig = Pick<ProjectConfig, 'project'> & { translation: Pick<ProjectConfig['translation'], 'draft'> }
type ConflictInput = {
    config: DraftConfig
    locale: string
    path: string
    sourceContent: string
    previousTranslation?: string
    result: {
        content: string
        model: string
        responseId: string
        contextHash: string
        diagnostics: Diagnostic[][]
    }
}

function conflictArtifacts(input: ConflictInput) {
    const reason = '文件校验未通过'
    const report = {
        schemaVersion: 1,
        status: 'conflict',
        origin: 'local_validation',
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
        diagnostics: input.result.diagnostics
    }
    const artifacts: Record<string, string> = {
        [`before/${input.path}`]: input.sourceContent,
        [`after/${input.path}`]: input.result.content,
        'report.json': `${JSON.stringify(report, null, 4)}\n`,
        'README.md': `# 翻译输出异常\n\n${reason}\n\n候选译文未应用，成功状态未推进。before/ 为原文，after/ 为候选译文，previous/ 为可选旧译文，均保留原始目录和扩展名。错误来源与具体判定见 report.json。\n`
    }
    if (input.previousTranslation !== undefined) artifacts[`previous/${input.path}`] = input.previousTranslation
    return { artifacts, reason }
}

/** 按项目草稿设置保存文件冲突，不要求调用方使用特定翻译器。 */
export async function commitConflictDraft(input: ConflictInput & { repository: string }) {
    const { artifacts, reason } = conflictArtifacts(input)
    const artifactPath = `conflicts/${input.locale}/${randomUUID()}`
    const result = await commitDraft(
        input.repository,
        input.config,
        artifactPath,
        artifacts,
        `translation(${input.config.project.id}/${input.locale}): record output conflict`
    )
    return { ...result, reason }
}

/** 没有 Git 仓库的单文件翻译也能保存诊断和候选。 */
export async function writeConflictDraft(input: ConflictInput & { directory: string }) {
    const { artifacts, reason } = conflictArtifacts(input)
    const artifactPath = resolve(input.directory, 'conflicts', input.locale, randomUUID())
    for (const [path, content] of Object.entries(artifacts)) {
        const file = resolve(artifactPath, path)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, content)
    }
    return { artifactPath, reason, pushed: false }
}

/** 保存全局校验失败的提交和各轮诊断。 */
export async function commitGlobalValidationDraft(input: {
    repository: string
    config: DraftConfig
    locale: string
    targetCommit: string
    rounds: Diagnostic[][]
}) {
    return commitDraft(
        input.repository,
        input.config,
        `validation/${input.locale}/${randomUUID()}`,
        { 'report.json': JSON.stringify({ targetCommit: input.targetCommit, rounds: input.rounds }, null, 4) + '\n' },
        `validation(${input.config.project.id}/${input.locale}): record global failure`
    )
}

async function commitDraft(
    repository: string,
    config: DraftConfig,
    artifactPath: string,
    artifacts: Record<string, string>,
    message: string
) {
    const { draftBranch, pushDraft, remote } = config.translation.draft
    const branch = draftBranch ?? `${config.project.id}-draft`
    const git = repositoryGit(repository)
    const parent = await branchHead(git, branch, pushDraft ? remote : undefined)
    const commit = await commitBranchFiles({
        repository,
        branch,
        parent,
        files: Object.fromEntries(
            Object.entries(artifacts).map(([path, content]) => [`${artifactPath}/${path}`, content])
        ),
        message,
        push: pushDraft,
        remote
    })
    return { branch, commit, artifactPath, pushed: pushDraft }
}
