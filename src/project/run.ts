import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import { type SimpleGit } from 'simple-git'

import {
    type BranchChanges,
    branchHead,
    commitBranchFiles,
    type GitEntry,
    readBlob,
    readTree,
    repositoryGit
} from '../git/branches.ts'
import { commitConflictDraft } from '../git/conflict-draft.ts'
import { decodeTranslationText } from '../shared/files.ts'
import { logProgress, logWarning } from '../shared/log.ts'
import {
    createProgress,
    type FileSnapshot,
    gitBlobSha,
    parseManifest,
    planTranslations,
    prepareSuccessfulTranslation,
    recordTranslationFailure,
    saveManifest,
    saveProgress
} from '../state/translation-state.ts'
import { buildTranslationContext } from '../translation/prompt.ts'
import { createTranslator, TranslationError } from '../translation/translator.ts'
import { createScopeMatcher, loadProject, type ProjectConfig } from './config.ts'

/** 从 Git 快照读取配置命中的文本，不读取工作树修改或跟随符号链接。 */
async function snapshots(git: SimpleGit, tree: Record<string, GitEntry>, config: ProjectConfig) {
    const matches = createScopeMatcher(config)
    const files: Record<string, FileSnapshot> = {}
    const contents: Record<string, string> = {}
    for (const [path, entry] of Object.entries(tree)) {
        const content =
            matches(path) && (entry.mode === '100644' || entry.mode === '100755')
                ? await decodeTranslationText(await readBlob(git, entry.blobSha))
                : null
        files[path] = { blobSha: entry.blobSha, isText: content !== null }
        if (content !== null) contents[path] = content
    }
    return { files, contents }
}

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
    logProgress(`项目 ${config.project.id} 开始，执行方式：按语言、按文件顺序处理`)
    if (options.push) config.translation.review.pushDraft = true
    const git = repositoryGit(options.repository)
    const remote = config.translation.review.remote
    const configBranch = `${config.project.id}-config`
    const managementBranch = (await git.branchLocal()).current
    if (!managementBranch) throw new Error('项目运行需要在管理分支上执行，不能使用 detached HEAD')
    const reservedBranches = [configBranch, config.source.branch, ...config.targets.map((target) => target.branch)]
    if (
        reservedBranches.includes(managementBranch) ||
        managementBranch === (config.translation.review.draftBranch ?? `${config.project.id}-draft`)
    ) {
        throw new Error('请在管理分支运行项目，不能在配置、Source、目标语言或 draft 分支运行')
    }
    let configHead = await branchHead(git, configBranch, options.push ? remote : undefined)
    if (!configHead) throw new Error(`配置分支 ${configBranch} 不存在，请先使用 create-project 创建或导入项目`)
    const configTree = await readTree(git, configHead)
    const enabledTargets = config.targets.filter((target) => target.enabled)
    if (!enabledTargets.length) throw new Error('项目没有启用任何目标语言')
    // 在任何分支写入前，确认所有目标配置和提示词均可加载。
    const contexts: Awaited<ReturnType<typeof buildTranslationContext>>[] = []
    for (const target of enabledTargets) contexts.push(await buildTranslationContext(project, target.locale))
    logProgress(`项目配置加载完成，启用语言：${enabledTargets.map((target) => target.locale).join('、')}`)
    logProgress(`开始同步上游到 ${config.source.branch}`)
    await git.fetch(resolve(options.sourceRoot), 'HEAD')
    const sourceCommit = (await git.revparse(['FETCH_HEAD'])).trim()
    const sourceTree = await readTree(git, sourceCommit)
    const sourceRef = `refs/heads/${config.source.branch}`
    await git.raw(['check-ref-format', sourceRef])
    const oldSource = await branchHead(git, config.source.branch)
    await git.raw(['update-ref', sourceRef, sourceCommit, oldSource ?? '0'.repeat(40)])
    if (options.push) {
        const remoteSource = (await git.listRemote(['--heads', remote, sourceRef])).trim().split(/\s/)[0]
        await git.raw([
            'push',
            `--force-with-lease=${sourceRef}:${remoteSource}`,
            remote,
            `${sourceCommit}:${sourceRef}`
        ])
    }
    const source = await snapshots(git, sourceTree, config)
    logProgress(`Source 同步完成：${config.source.branch}，上游提交 ${sourceCommit}`)
    const locales: Record<string, ReturnType<typeof createProgress>> = {}
    let translate: ReturnType<typeof createTranslator> | undefined
    let providerBlocked = false
    let successfulFiles = 0
    let conflictFiles = 0
    let failedFiles = 0

    for (const [index, target] of enabledTargets.entries()) {
        const context = contexts[index]
        logProgress(`[${target.locale}] 开始同步目标分支 ${target.branch}`)
        let targetHead = await branchHead(git, target.branch, options.push ? remote : undefined)
        let targetTree = await readTree(git, targetHead ?? sourceCommit)
        const manifestPath = `state/${target.locale}/manifest.json`
        let manifest = parseManifest(
            configTree[manifestPath]
                ? (await readBlob(git, configTree[manifestPath].blobSha)).toString('utf8')
                : undefined,
            config.project.id,
            target.locale
        )
        const matches = createScopeMatcher(config)
        const sync: BranchChanges = {}
        for (const [path, entry] of Object.entries(sourceTree)) {
            const previous = targetTree[path]
            // 已发布译文丢失时保留缺失状态，不能用原文占位后误判为人工修改。
            if (!previous && matches(path) && source.files[path]?.isText && manifest.files[path]?.lastSuccess) continue
            const preserve =
                previous &&
                ((matches(path) && source.files[path]?.isText) || (!matches(path) && manifest.files[path]?.lastSuccess))
            const next = preserve ? { ...previous, mode: entry.mode } : entry
            if (!previous || previous.blobSha !== next.blobSha || previous.mode !== next.mode) sync[path] = next
        }
        for (const path of Object.keys(targetTree)) {
            if (!sourceTree[path]) sync[path] = null
        }
        targetHead = await commitBranchFiles({
            repository: options.repository,
            branch: target.branch,
            parent: targetHead ?? sourceCommit,
            files: sync,
            message: `docs(${config.project.id}/${target.locale}): sync upstream files`,
            push: options.push,
            remote
        })
        targetTree = await readTree(git, targetHead)
        const translated = await snapshots(git, targetTree, config)
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
        const progressPath = resolve(project.directory, 'progress/locales', `${target.locale}.json`)
        const progressKey = `progress/locales/${target.locale}.json`
        const summaryPath = resolve(project.directory, 'progress/summary.json')
        const summaryKey = 'progress/summary.json'
        const publishProgress = async () => {
            const progress = createProgress(manifest, plan())
            locales[target.locale] = progress
            await saveManifest(resolve(project.directory, manifestPath), manifest)
            await saveProgress(progressPath, progress)
            const summary = {
                projectId: config.project.id,
                sourceCommit,
                providerBlocked,
                locales: Object.fromEntries(
                    Object.entries(locales).map(([locale, value]) => [
                        locale,
                        {
                            total: value.total,
                            completed: value.completed,
                            summary: value.summary
                        }
                    ])
                )
            }
            const summaryContent = `${JSON.stringify(summary, null, 4)}\n`
            await mkdir(dirname(summaryPath), { recursive: true })
            await writeFile(summaryPath, summaryContent)
            configHead = await commitBranchFiles({
                repository: options.repository,
                branch: configBranch,
                parent: configHead,
                files: {
                    [manifestPath]: `${JSON.stringify(manifest, null, 4)}\n`,
                    [progressKey]: `${JSON.stringify(progress, null, 4)}\n`,
                    [summaryKey]: summaryContent
                },
                message: `docs(${config.project.id}/${target.locale}): update translation progress`,
                push: options.push,
                remote
            })
            logProgress(
                `[${target.locale}] ${configBranch} 状态与进度更新完成：${progress.completed}/${progress.total}，冲突 ${progress.summary.conflict}，失败 ${progress.summary.failed + progress.summary.retryable_failed + progress.summary.blocked}`
            )
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
        for (const [fileIndex, file] of tasks.entries()) {
            logProgress(`[${target.locale}] 文件 ${fileIndex + 1}/${tasks.length} 开始：${file.path}`)
            translate ??= createTranslator()
            let result: Awaited<ReturnType<typeof translate>> | undefined
            let nextManifest = manifest
            const files: BranchChanges = {}
            try {
                result = await translate({
                    path: file.path,
                    sourceContent: source.contents[file.path],
                    previousTranslation: translated.contents[file.path],
                    context
                })
            } catch (error) {
                if (!(error instanceof TranslationError)) throw error
                nextManifest = recordTranslationFailure(manifest, file.path, {
                    sourceBlobSha: source.files[file.path].blobSha,
                    contextHash: context.contextHash,
                    attemptedAt: new Date().toISOString(),
                    status: error.status,
                    errorCode: error.code
                })
                providerBlocked = error.status === 'blocked' || error.status === 'retryable_failed'
                failedFiles += 1
                logProgress(`[${target.locale}] ${file.path} 翻译失败：${error.code}，状态 ${error.status}`)
            }
            if (result?.review.approved) {
                files[file.path] = result.content
                successfulFiles += 1
                nextManifest = prepareSuccessfulTranslation(manifest, file.path, {
                    sourceBlobSha: source.files[file.path].blobSha,
                    targetBlobSha: gitBlobSha(Buffer.from(result.content)),
                    contextHash: context.contextHash,
                    model: result.model,
                    translatedAt: new Date().toISOString()
                })
            } else if (result) {
                const draft = await commitConflictDraft({
                    repository: options.repository,
                    config,
                    locale: target.locale,
                    path: file.path,
                    sourceContent: source.contents[file.path],
                    previousTranslation: translated.contents[file.path],
                    result
                })
                conflictFiles += 1
                logWarning(
                    `[${target.locale}] ${file.path} 已拒绝应用，冲突已归档：${draft.branch}，提交 ${draft.commit}`
                )
                nextManifest = recordTranslationFailure(manifest, file.path, {
                    sourceBlobSha: source.files[file.path].blobSha,
                    contextHash: context.contextHash,
                    attemptedAt: new Date().toISOString(),
                    status: 'conflict',
                    errorCode: result.review.localConflict?.code ?? 'DECISIONS_CONFLICT'
                })
            }
            if (result?.review.approved) {
                targetHead = await commitBranchFiles({
                    repository: options.repository,
                    branch: target.branch,
                    parent: targetHead,
                    files,
                    message: `docs(${config.project.id}/${target.locale}): translate ${file.path}`,
                    push: options.push,
                    remote
                })
                logProgress(
                    `[${target.locale}] ${file.path} 译文${options.push ? '发布' : '本地提交'}完成：${targetHead}`
                )
                translated.files[file.path] = { blobSha: gitBlobSha(Buffer.from(result.content)), isText: true }
                translated.contents[file.path] = result.content
            }
            // 确认译文提交/推送完成后，才把成功凭证和进度写回配置分支。
            manifest = nextManifest
            await publishProgress()
            logProgress(`[${target.locale}] 文件 ${fileIndex + 1}/${tasks.length} 处理结束：${file.path}`)
            if (providerBlocked) logProgress('模型服务不可用，停止剩余文件和语言的调用，保留已发布结果')
            if (providerBlocked) break
        }
        logProgress(`[${target.locale}] 当前语言处理结束`)
        if (providerBlocked) break
    }
    const incomplete = providerBlocked || Object.values(locales).some((progress) => progress.completed < progress.total)
    const hasErrors =
        providerBlocked ||
        Object.values(locales).some(
            ({ summary }) => summary.pending + summary.failed + summary.retryable_failed + summary.blocked > 0
        )
    logProgress(
        `项目 ${config.project.id} ${incomplete ? '处理结束，仍有未完成文件' : '翻译完成'}：本次通过 ${successfulFiles}，冲突 ${conflictFiles}，失败 ${failedFiles}`
    )
    return {
        projectId: config.project.id,
        sourceCommit,
        configBranch,
        configCommit: configHead,
        pushed: options.push,
        status: incomplete ? (hasErrors ? 'partial_success' : 'warning') : 'success',
        processed: { successful: successfulFiles, conflict: conflictFiles, failed: failedFiles },
        locales
    }
}
