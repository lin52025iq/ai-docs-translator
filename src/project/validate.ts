import { branchHead, readTree, repositoryGit } from '../git/branches.ts'
import { readTextSnapshot } from '../git/snapshot.ts'
import { withCommitWorktree } from '../git/worktree.ts'
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
    const diagnostics: Diagnostic[] = []
    for (const [path, content] of Object.entries(snapshot.contents)) {
        diagnostics.push(...(await validation.file(path, content)))
    }
    if (!diagnostics.length && project.config.validation.global) {
        diagnostics.push(...(await withCommitWorktree(git, commit, validation.global)))
    }
    return { commit, locale: target.locale, diagnostics }
}
