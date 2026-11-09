import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { type SimpleGit } from 'simple-git'

import { repositoryGit } from './branches.ts'

/** 物化指定提交，不运行 checkout 钩子。调用方负责释放快照。 */
export async function openCommitWorktree(git: SimpleGit, commit: string) {
    const directory = await mkdtemp(join(tmpdir(), 'translator-snapshot-'))
    const worktree = join(directory, 'snapshot')
    let added = false
    const dispose = async () => {
        try {
            if (added) await git.raw(['worktree', 'remove', '--force', worktree])
        } finally {
            await rm(directory, { recursive: true, force: true })
        }
    }
    try {
        await git.raw(['worktree', 'add', '--detach', '--no-checkout', worktree, commit])
        added = true
        await repositoryGit(worktree).raw(['read-tree', '--reset', '-u', commit])
        return { directory: worktree, [Symbol.asyncDispose]: dispose }
    } catch (error) {
        await dispose()
        throw error
    }
}

export async function withCommitWorktree<T>(git: SimpleGit, commit: string, use: (directory: string) => Promise<T>) {
    await using snapshot = await openCommitWorktree(git, commit)
    return await use(snapshot.directory)
}
