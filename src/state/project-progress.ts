import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import { commitBranchFiles } from '../git/branches.ts'
import { logProgress } from '../shared/log.ts'
import { type createProgress, type Manifest, saveManifest, saveProgress } from './translation-state.ts'

/** 将已确认的语言状态保存到工作目录与配置分支。 */
export async function saveProjectProgress(input: {
    repository: string
    directory: string
    configBranch: string
    parent: string
    projectId: string
    locale: string
    manifest: Manifest
    locales: Record<string, ReturnType<typeof createProgress>>
    sourceCommit: string
    providerBlocked: boolean
    push: boolean
    remote: string
}) {
    const { directory, configBranch, projectId, locale, manifest, locales, sourceCommit, providerBlocked } = input
    const progress = locales[locale]
    const manifestPath = `state/${locale}/manifest.json`
    const progressPath = `progress/locales/${locale}.json`
    const summaryPath = 'progress/summary.json'
    const summary = {
        projectId,
        sourceCommit,
        providerBlocked,
        locales: Object.fromEntries(
            Object.entries(locales).map(([key, { total, completed, summary }]) => [key, { total, completed, summary }])
        )
    }
    const summaryContent = JSON.stringify(summary, null, 4) + '\n'
    await saveManifest(resolve(directory, manifestPath), manifest)
    await saveProgress(resolve(directory, progressPath), progress)
    const summaryFile = resolve(directory, summaryPath)
    await mkdir(dirname(summaryFile), { recursive: true })
    await writeFile(summaryFile, summaryContent)
    const commit = await commitBranchFiles({
        repository: input.repository,
        branch: configBranch,
        parent: input.parent,
        files: {
            [manifestPath]: JSON.stringify(manifest, null, 4) + '\n',
            [progressPath]: JSON.stringify(progress, null, 4) + '\n',
            [summaryPath]: summaryContent
        },
        message: `docs(${projectId}/${locale}): update translation progress`,
        push: input.push,
        remote: input.remote
    })
    logProgress(
        `[${locale}] ${configBranch} 状态与进度更新完成：${progress.completed}/${progress.total}，冲突 ${progress.summary.conflict}，失败 ${progress.summary.failed + progress.summary.retryable_failed + progress.summary.blocked}`
    )
    return commit
}
