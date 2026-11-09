import { resolve } from 'node:path'

import { type SimpleGit } from 'simple-git'

import { type BranchChanges, branchHead, commitBranchFiles, type GitEntry, readTree } from '../git/branches.ts'
import { type FileSnapshot, type Manifest } from '../state/translation-state.ts'

/** 同步上游提交到 Source，远端更新使用 lease。 */
export async function syncSource(git: SimpleGit, sourceRoot: string, branch: string, remote?: string) {
    await git.fetch(resolve(sourceRoot), 'HEAD')
    const sourceCommit = (await git.revparse(['FETCH_HEAD'])).trim()
    const sourceTree = await readTree(git, sourceCommit)
    const sourceRef = `refs/heads/${branch}`
    await git.raw(['check-ref-format', sourceRef])
    const oldSource = await branchHead(git, branch)
    await git.raw(['update-ref', sourceRef, sourceCommit, oldSource ?? '0'.repeat(40)])
    if (remote) {
        const remoteSource = (await git.listRemote(['--heads', remote, sourceRef])).trim().split(/\s/)[0]
        await git.raw([
            'push',
            `--force-with-lease=${sourceRef}:${remoteSource}`,
            remote,
            `${sourceCommit}:${sourceRef}`
        ])
    }
    return { sourceCommit, sourceTree }
}

/** 同步目标分支的仓库内容，按 Manifest 保留已有译文。 */
export async function syncTarget(options: {
    git: SimpleGit
    repository: string
    branch: string
    sourceCommit: string
    sourceTree: Record<string, GitEntry>
    sourceFiles: Record<string, FileSnapshot>
    manifest: Manifest
    matches: (path: string) => boolean
    push: boolean
    remote: string
    message: string
}) {
    const { git, branch, sourceCommit, sourceTree, sourceFiles, manifest, matches, remote, message } = options
    const targetHead = await branchHead(git, branch, options.push ? remote : undefined)
    const targetTree = await readTree(git, targetHead ?? sourceCommit)
    const sync: BranchChanges = {}
    for (const [path, entry] of Object.entries(sourceTree)) {
        const previous = targetTree[path]
        // 已发布译文丢失时保留缺失状态，不能用原文占位后误判为人工修改。
        if (!previous && matches(path) && sourceFiles[path]?.isText && manifest.files[path]?.lastSuccess) continue
        const preserve =
            previous &&
            ((matches(path) && sourceFiles[path]?.isText) || (!matches(path) && manifest.files[path]?.lastSuccess))
        const next = preserve ? { ...previous, mode: entry.mode } : entry
        if (!previous || previous.blobSha !== next.blobSha || previous.mode !== next.mode) sync[path] = next
    }
    for (const path of Object.keys(targetTree)) {
        if (!sourceTree[path]) sync[path] = null
    }
    return commitBranchFiles({
        repository: options.repository,
        branch,
        parent: targetHead ?? sourceCommit,
        files: sync,
        message: message,
        push: options.push,
        remote
    })
}
