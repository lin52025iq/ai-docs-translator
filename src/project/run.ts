import { branchHead, commitBranchFiles, readBlob, readTree, repositoryGit } from '../git/branches.ts'
import { commitConflictDraft, commitGlobalValidationDraft } from '../git/conflict-draft.ts'
import { readTextSnapshot } from '../git/snapshot.ts'
import { withCommitWorktree } from '../git/worktree.ts'
import { logProgress, logWarning } from '../shared/log.ts'
import { saveProjectProgress } from '../state/project-progress.ts'
import {
    createProgress,
    gitBlobSha,
    parseManifest,
    planTranslations,
    prepareSuccessfulTranslation,
    recordTranslationFailure
} from '../state/translation-state.ts'
import { buildTranslationContext } from '../translation/prompt.ts'
import { translateValidated, validateWithRepairs } from '../translation/retry.ts'
import { createTranslator, TranslationError } from '../translation/translator.ts'
import { createValidation } from '../validation/runner.ts'
import { createScopeMatcher, loadProject } from './config.ts'
import { syncSource, syncTarget } from './sync.ts'

/** 项目级顺序执行：同步分支、增量翻译、逐文件发布并更新配置分支进度。 */
export async function runProject(options: {
    project: string
    repository: string
    sourceRoot: string
    push: boolean
    retryFailed?: boolean
}) {
    const project = await loadProject(options.project)
    const { config } = project
    const validation = createValidation(project)
    logProgress(`项目 ${config.project.id} 开始，执行方式：按语言、按文件顺序处理`)
    if (options.push) config.translation.draft.pushDraft = true
    const git = repositoryGit(options.repository)
    const remote = config.translation.draft.remote
    const configBranch = `${config.project.id}-config`
    const managementBranch = (await git.branchLocal()).current
    if (!managementBranch) throw new Error('项目运行需要在管理分支上执行，不能使用 detached HEAD')
    const reservedBranches = [configBranch, config.source.branch, ...config.targets.map((target) => target.branch)]
    if (
        reservedBranches.includes(managementBranch) ||
        managementBranch === (config.translation.draft.draftBranch ?? `${config.project.id}-draft`)
    ) {
        throw new Error('请在管理分支运行项目，不能在配置、Source、目标语言或 draft 分支运行')
    }
    const initialConfigHead = await branchHead(git, configBranch, options.push ? remote : undefined)
    if (!initialConfigHead) throw new Error(`配置分支 ${configBranch} 不存在，请先使用 create-project 创建或导入项目`)
    let configHead = initialConfigHead
    const configTree = await readTree(git, configHead)
    const enabledTargets = config.targets.filter((target) => target.enabled)
    if (!enabledTargets.length) throw new Error('项目没有启用任何目标语言')
    // 在任何分支写入前，确认所有目标配置和提示词均可加载。
    const contexts: Awaited<ReturnType<typeof buildTranslationContext>>[] = []
    for (const target of enabledTargets) contexts.push(await buildTranslationContext(project, target.locale))
    logProgress(`项目配置加载完成，启用语言：${enabledTargets.map((target) => target.locale).join('、')}`)
    logProgress(`开始同步上游到 ${config.source.branch}`)
    const { sourceCommit, sourceTree } = await syncSource(
        git,
        options.sourceRoot,
        config.source.branch,
        options.push ? remote : undefined
    )
    const matches = createScopeMatcher(config)
    const source = await readTextSnapshot(git, sourceTree, matches)
    logProgress(`Source 同步完成：${config.source.branch}，上游提交 ${sourceCommit}`)
    const locales: Record<string, ReturnType<typeof createProgress>> = {}
    let translate: ReturnType<typeof createTranslator> | undefined
    let providerBlocked = false
    let successfulFiles = 0
    let conflictFiles = 0
    let failedFiles = 0
    let globalFailed = false
    const targetCommits: Record<string, string> = {}
    const globallyValidatedCommits: Record<string, string> = {}

    for (const [index, target] of enabledTargets.entries()) {
        const context = contexts[index]
        logProgress(`[${target.locale}] 开始同步目标分支 ${target.branch}`)
        const manifestPath = `state/${target.locale}/manifest.json`
        let manifest = parseManifest(
            configTree[manifestPath]
                ? (await readBlob(git, configTree[manifestPath].blobSha)).toString('utf8')
                : undefined,
            config.project.id,
            target.locale
        )
        let targetHead = await syncTarget({
            git,
            repository: options.repository,
            branch: target.branch,
            sourceCommit,
            sourceTree,
            sourceFiles: source.files,
            manifest,
            matches,
            push: options.push,
            remote,
            message: `docs(${config.project.id}/${target.locale}): sync upstream files`
        })
        const translated = await readTextSnapshot(git, await readTree(git, targetHead), matches)
        logProgress(`[${target.locale}] 目标分支同步完成`)
        const plan = () =>
            planTranslations({
                config,
                manifest,
                source: source.files,
                target: translated.files,
                contextHash: context.contextHash,
                retryFailed: options.retryFailed
            })
        const publishProgress = async () => {
            const progress = createProgress(manifest, plan())
            locales[target.locale] = progress
            configHead = await saveProjectProgress({
                repository: options.repository,
                directory: project.directory,
                configBranch,
                parent: configHead,
                projectId: config.project.id,
                locale: target.locale,
                manifest,
                locales,
                sourceCommit,
                providerBlocked,
                push: options.push,
                remote
            })
        }
        // 即使没有新增翻译，也先结合配置分支 Manifest 与实际译文重建进度。
        await publishProgress()
        const initialPlan = plan()
        const tasks = initialPlan.filter((entry) => entry.shouldTranslate)
        const skipped = initialPlan.filter(
            (entry) => entry.status === 'translated' || entry.status === 'manually_modified'
        ).length
        logProgress(
            `[${target.locale}] 增量规划完成，待处理 ${tasks.length}，已完成并跳过 ${skipped}，非文本 ${locales[target.locale].summary.not_text}`
        )
        if (!tasks.length) logProgress(`[${target.locale}] 没有需要处理的文件，跳过模型调用`)
        const attempts = new Map<string, number>()
        const successfulPaths = new Set<string>()
        const processFile = async (path: string, repair?: { candidate: string; diagnostics: string }) => {
            translate ??= createTranslator()
            let result: Awaited<ReturnType<typeof translateValidated>> | undefined
            let nextManifest = manifest
            try {
                result = await translateValidated(
                    translate,
                    {
                        path,
                        sourceContent: source.contents[path],
                        previousTranslation: translated.contents[path],
                        context,
                        repair
                    },
                    validation.file,
                    attempts
                )
            } catch (error) {
                if (!(error instanceof TranslationError)) throw error
                nextManifest = recordTranslationFailure(manifest, path, {
                    sourceBlobSha: source.files[path].blobSha,
                    contextHash: context.contextHash,
                    attemptedAt: new Date().toISOString(),
                    status: error.status,
                    errorCode: error.code
                })
                providerBlocked = error.status === 'blocked' || error.status === 'retryable_failed'
                failedFiles += 1
                logProgress(`[${target.locale}] ${path} 翻译失败：${error.code}，状态 ${error.status}`)
            }
            if (result && !result.approved) {
                const draft = await commitConflictDraft({
                    repository: options.repository,
                    config,
                    locale: target.locale,
                    path,
                    sourceContent: source.contents[path],
                    previousTranslation: translated.contents[path],
                    result
                })
                conflictFiles += 1
                logWarning(`[${target.locale}] ${path} 已拒绝应用，冲突已归档：${draft.branch}，提交 ${draft.commit}`)
                nextManifest = recordTranslationFailure(manifest, path, {
                    sourceBlobSha: source.files[path].blobSha,
                    contextHash: context.contextHash,
                    attemptedAt: new Date().toISOString(),
                    status: 'conflict',
                    errorCode: 'FILE_VALIDATION_FAILED'
                })
            }
            if (result?.approved) {
                targetHead = await commitBranchFiles({
                    repository: options.repository,
                    branch: target.branch,
                    parent: targetHead,
                    files: { [path]: result.content },
                    message: `docs(${config.project.id}/${target.locale}): translate ${path}`,
                    push: options.push,
                    remote
                })
                if (!successfulPaths.has(path)) successfulFiles += 1
                successfulPaths.add(path)
                nextManifest = prepareSuccessfulTranslation(manifest, path, {
                    sourceBlobSha: source.files[path].blobSha,
                    targetBlobSha: gitBlobSha(Buffer.from(result.content)),
                    contextHash: context.contextHash,
                    model: result.model,
                    translatedAt: new Date().toISOString()
                })
                logProgress(`[${target.locale}] ${path} 译文${options.push ? '发布' : '本地提交'}完成：${targetHead}`)
                translated.files[path] = { blobSha: gitBlobSha(Buffer.from(result.content)), isText: true }
                translated.contents[path] = result.content
            }
            // 确认译文提交/推送完成后，才把成功凭证和进度写回配置分支。
            manifest = nextManifest
            await publishProgress()
            return result?.approved === true
        }
        for (const [fileIndex, file] of tasks.entries()) {
            logProgress(`[${target.locale}] 文件 ${fileIndex + 1}/${tasks.length} 开始：${file.path}`)
            await processFile(file.path)
            if (providerBlocked) break
        }

        let localeGlobalFailed = false
        if (
            !providerBlocked &&
            locales[target.locale].completed === locales[target.locale].total &&
            config.validation.global
        ) {
            const { passed, rounds } = await validateWithRepairs({
                attempts,
                validate: async () => {
                    logProgress(`[${target.locale}] 开始全局校验：${targetHead}`)
                    return withCommitWorktree(git, targetHead, validation.global)
                },
                canRepair: (path) => Object.hasOwn(source.contents, path) && Object.hasOwn(translated.contents, path),
                repair: (path, issues) =>
                    processFile(path, {
                        candidate: translated.contents[path],
                        diagnostics: JSON.stringify(issues).slice(0, 8000)
                    })
            })
            if (!passed) {
                const draft = await commitGlobalValidationDraft({
                    repository: options.repository,
                    config,
                    locale: target.locale,
                    targetCommit: targetHead,
                    rounds
                })
                logWarning(`[${target.locale}] 全局校验未通过，报告已归档：${draft.branch}:${draft.artifactPath}`)
                localeGlobalFailed = true
                globalFailed = true
            }
        }
        if (!localeGlobalFailed && locales[target.locale].completed === locales[target.locale].total) {
            targetCommits[target.locale] = targetHead
            if (config.validation.global) globallyValidatedCommits[target.locale] = targetHead
        }
        logProgress(`[${target.locale}] 当前语言处理结束`)
        if (providerBlocked) break
    }
    const incomplete =
        globalFailed ||
        providerBlocked ||
        Object.values(locales).some((progress) => progress.completed < progress.total)
    const hasErrors =
        globalFailed ||
        providerBlocked ||
        Object.values(locales).some(
            ({ summary }) => summary.pending + summary.failed + summary.retryable_failed + summary.blocked > 0
        )
    logProgress(
        `项目 ${config.project.id} ${incomplete ? '处理结束，仍有文件或全局校验未通过' : '翻译完成'}：本次通过 ${successfulFiles}，冲突 ${conflictFiles}，失败 ${failedFiles}`
    )
    const deployment = config.deployment
    const deploymentTarget = enabledTargets.find((target) => target.locale === deployment?.locale)
    const deploymentCommit = deploymentTarget && globallyValidatedCommits[deploymentTarget.locale]
    return {
        projectId: config.project.id,
        sourceCommit,
        configBranch,
        configCommit: configHead,
        targetCommits,
        globallyValidatedCommits,
        deployment:
            !incomplete && options.push && deployment && deploymentTarget && deploymentCommit
                ? { ...deployment, branch: deploymentTarget.branch, sha: deploymentCommit }
                : undefined,
        globalValidationFailed: globalFailed,
        pushed: options.push,
        status: incomplete ? (hasErrors ? 'partial_success' : 'warning') : 'success',
        processed: { successful: successfulFiles, conflict: conflictFiles, failed: failedFiles },
        locales
    }
}
