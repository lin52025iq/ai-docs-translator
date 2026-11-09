import { branchHead, readTree, repositoryGit } from '../git/branches.ts'
import { readTextSnapshot } from '../git/snapshot.ts'
import { openCommitWorktree } from '../git/worktree.ts'
import { createValidation, type Diagnostic } from '../validation/runner.ts'
import { createScopeMatcher, loadProject } from './config.ts'

/** 复查现有目标提交，无模型调用或分支写入。 */
export async function validateTranslations(options: { project: string; repository: string; locale: string }) {
    const project = await loadProject(options.project)
    const target = project.config.targets.find((entry) => entry.enabled && entry.locale === options.locale)
    if (!target) throw new Error('目标语言未配置或未启用')
    const git = repositoryGit(options.repository)
    const commit = await branchHead(git, target.branch, project.config.translation.draft.remote)
    if (!commit) throw new Error('目标分支不存在：' + target.branch)
    const snapshot = await readTextSnapshot(git, await readTree(git, commit), createScopeMatcher(project.config))
    const validation = createValidation(project)
    await using validationSnapshot =
        validation.needsSnapshot || project.config.validation.global ? await openCommitWorktree(git, commit) : undefined
    const diagnostics: Diagnostic[] = []
    for (const [path, content] of Object.entries(snapshot.contents)) {
        diagnostics.push(...(await validation.file(path, content, validationSnapshot?.directory)))
    }
    if (!diagnostics.length && validationSnapshot) {
        diagnostics.push(...(await validation.global(validationSnapshot.directory)))
    }
    return { commit, locale: target.locale, diagnostics }
}
