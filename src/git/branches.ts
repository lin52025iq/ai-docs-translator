import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

import { isGitEnvKey } from '@simple-git/argv-parser'
import { type SimpleGit, simpleGit } from 'simple-git'
import { z } from 'zod'

import { repositoryPathSchema } from '../shared/files.ts'

const entrySchema = z.object({
    path: repositoryPathSchema,
    mode: z.enum(['100644', '100755', '120000', '160000']),
    blobSha: z.string().regex(/^[a-f0-9]{40}$/)
})
export type GitEntry = Omit<z.infer<typeof entrySchema>, 'path'>
export type BranchChanges = Record<string, string | Buffer | GitEntry | null>

/** 独立 Git 调用配置，不改写用户仓库的身份配置。 */
export function repositoryGit(repository: string, indexFile?: string) {
    const git = simpleGit({
        baseDir: resolve(repository),
        config: ['user.name=AI Docs Translator', 'user.email=ai-docs-translator@users.noreply.github.com'],
        // simple-git 4 要求显式允许；仅提交实例使用由本程序创建的临时索引。
        allowEnvironment: indexFile ? ['GIT_INDEX_FILE'] : []
    })
    if (!indexFile) return git
    // 复用 SDK 的环境变量分类，避免把宿主的分页器、编辑器等设置显式传给 Git。
    const environment = Object.fromEntries(
        Object.entries(process.env).filter(([name]) => !/^GIT_/i.test(name) && !isGitEnvKey(name.toLowerCase()))
    )
    return git.env({ ...environment, GIT_INDEX_FILE: indexFile })
}

/** 本地不存在时读取远端已有分支；只取回对象，不检出或执行仓库内容。 */
export async function branchHead(git: SimpleGit, branch: string, remote?: string) {
    const ref = `refs/heads/${branch}`
    await git.raw(['check-ref-format', ref])
    const refs = await git.raw(['for-each-ref', '--format=%(refname) %(objectname)', ref])
    const local = refs
        .split(/\r?\n/)
        .find((line) => line.startsWith(`${ref} `))
        ?.slice(ref.length + 1)
    if (local) return local
    if (remote && (await git.listRemote(['--heads', remote, ref])).trim()) {
        await git.fetch(remote, ref)
        return (await git.revparse(['FETCH_HEAD'])).trim()
    }
    return null
}

/** 读取提交的完整文件树，包含二进制文件、可执行位和符号链接的 Git 元数据。 */
export async function readTree(git: SimpleGit, commit: string) {
    const output = await git.raw(['ls-tree', '-r', '-z', commit])
    const entries: Record<string, GitEntry> = {}
    for (const line of output.split('\0').filter(Boolean)) {
        const separator = line.indexOf('\t')
        const [mode, , blobSha] = line.slice(0, separator).split(' ')
        const entry = entrySchema.parse({ path: line.slice(separator + 1), mode, blobSha })
        entries[entry.path] = { mode: entry.mode, blobSha: entry.blobSha }
    }
    return entries
}

/** SDK 的 binaryCatFile 类型较宽，在读取 Git 对象边界收窄为 Buffer。 */
export async function readBlob(git: SimpleGit, sha: string): Promise<Buffer> {
    const content: unknown = await git.binaryCatFile(['blob', sha])
    if (!Buffer.isBuffer(content)) throw new Error('Git 未返回有效的文件内容')
    return content
}

/** 用独立索引提交指定文件，不切换当前分支，不带入工作树或暂存区。 */
export async function commitBranchFiles(input: {
    repository: string
    branch: string
    parent: string | null
    files: BranchChanges
    message: string
    push: boolean
    remote: string
}) {
    const directory = await mkdtemp(join(tmpdir(), 'translation-index-'))
    try {
        const git = repositoryGit(input.repository, join(directory, 'index'))
        const ref = `refs/heads/${input.branch}`
        await git.raw(['check-ref-format', ref])
        if ((await git.branchLocal()).current === input.branch) {
            throw new Error(`请先切换离开待写入分支 ${input.branch}`)
        }
        const oldLocal = await branchHead(git, input.branch)
        const oldTree = input.parent ? await readTree(git, input.parent) : {}
        await git.raw(input.parent ? ['read-tree', input.parent] : ['read-tree', '--empty'])
        // 先移除旧路径，支持上游在文件和目录之间调整结构。
        for (const [path, content] of Object.entries(input.files)) {
            if (content === null) await git.raw(['update-index', '--force-remove', '--', path])
        }
        for (const [path, content] of Object.entries(input.files)) {
            if (content === null) continue
            let entry: GitEntry
            if (typeof content === 'string' || Buffer.isBuffer(content)) {
                const file = join(directory, 'content')
                await writeFile(file, content)
                entry = { mode: oldTree[path]?.mode ?? '100644', blobSha: (await git.hashObject(file, true)).trim() }
            } else {
                entry = content
            }
            await git.raw(['update-index', '--add', '--cacheinfo', entry.mode, entry.blobSha, path])
        }
        const tree = (await git.raw(['write-tree'])).trim()
        const previousTree = input.parent ? (await git.revparse([`${input.parent}^{tree}`])).trim() : null
        const commit =
            tree === previousTree && input.parent
                ? input.parent
                : (
                      await git.raw([
                          'commit-tree',
                          tree,
                          ...(input.parent ? ['-p', input.parent] : []),
                          '-m',
                          input.message
                      ])
                  ).trim()
        await git.raw(['update-ref', ref, commit, oldLocal ?? '0'.repeat(40)])
        if (input.push) {
            try {
                await git.push(input.remote, `${commit}:${ref}`)
            } catch {
                throw new Error(`提交 ${commit} 推送到 ${input.branch} 失败，已保留 Git 对象供恢复`)
            }
        }
        return commit
    } finally {
        await rm(directory, { recursive: true, force: true })
    }
}
