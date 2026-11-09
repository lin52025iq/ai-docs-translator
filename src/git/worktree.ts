import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { type SimpleGit } from 'simple-git'

import { repositoryGit } from './branches.ts'

/** 物化指定提交并在调用结束后清理，不运行 checkout 钩子。 */
export async function withCommitWorktree<T>(git: SimpleGit, commit: string, use: (directory: string) => Promise<T>) {
    const directory = await mkdtemp(join(tmpdir(), 'translator-snapshot-'))
    const worktree = join(directory, 'snapshot')
    try {
        await git.raw(['worktree', 'add', '--detach', '--no-checkout', worktree, commit])
        try {
            await repositoryGit(worktree).raw(['read-tree', '--reset', '-u', commit])
            return await use(worktree)
        } finally {
            await git.raw(['worktree', 'remove', '--force', worktree])
        }
    } finally {
        await rm(directory, { recursive: true, force: true })
    }
}
