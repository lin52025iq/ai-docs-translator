import { glob, readFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'

import { stringify } from 'yaml'

import { branchHead, commitBranchFiles, repositoryGit } from '../git/branches.ts'
import { repositoryPathSchema } from '../shared/files.ts'
import { buildTranslationContext } from '../translation/prompt.ts'
import { loadProject, projectSchema } from './config.ts'

/** 配置分支独立建树，不切换当前分支，不提交管理仓库中的其他文件。 */
export async function createProject(options: {
    name: string
    repository: string
    sourceRepository?: string
    ref: string
    sourceLanguage: string
    locale: string[]
    from?: string
    remote: string
    push?: boolean
}) {
    const id = options.name
    const branch = `${id}-config`
    const git = repositoryGit(options.repository)
    if (!(await git.checkIsRepo())) throw new Error('请通过 --repository 指定翻译管理 Git 仓库')
    const files: Record<string, string | Buffer> = {}
    let remote = options.remote
    if (options.from) {
        const directory = resolve(options.from)
        const project = await loadProject(resolve(directory, 'config.yml'))
        if (project.config.project.id !== id) throw new Error('--name 必须与已有配置的 project.id 一致')
        remote = project.config.translation.draft.remote
        for (const target of project.config.targets.filter((entry) => entry.enabled)) {
            await buildTranslationContext(project, target.locale)
        }
        for await (const entry of glob('**/*', {
            cwd: directory,
            exclude: ['.git/**', 'node_modules/**', '.env', '.env.*'],
            withFileTypes: true
        })) {
            if (!entry.isFile()) continue
            const path = repositoryPathSchema.parse(
                relative(directory, resolve(entry.parentPath, entry.name)).replaceAll('\\', '/')
            )
            files[path] = await readFile(resolve(directory, path))
        }
    } else {
        if (!options.sourceRepository) throw new Error('创建项目需要 --source-repository，或用 --from 导入已有配置')
        const config = projectSchema.parse({
            schemaVersion: 1,
            project: { id },
            source: {
                repository: options.sourceRepository,
                ref: options.ref,
                branch: `${id}-source`,
                language: options.sourceLanguage
            },
            targets: options.locale.map((locale) => ({ locale, branch: `${id}-${locale.toLowerCase()}` })),
            translation: {
                glossary: 'glossary.yml',
                prompts: { common: 'prompts/common.md' },
                draft: { remote }
            }
        })
        files['config.yml'] = stringify(config, { indent: 4 })
        files['glossary.yml'] = stringify({ schemaVersion: 1, sourceLanguage: config.source.language, terms: [] })
        files['prompts/common.md'] = '保持原文语气和含义，采用自然、准确、简洁的表达，遵守项目术语库。\n'
    }
    if (await branchHead(git, branch, options.push ? remote : undefined)) {
        throw new Error(`配置分支 ${branch} 已存在，请直接编辑已有配置`)
    }
    const commit = await commitBranchFiles({
        repository: options.repository,
        branch,
        parent: null,
        files,
        message: `chore(${id}): initialize project configuration`,
        push: options.push === true,
        remote
    })
    return { projectId: id, branch, commit, pushed: options.push === true }
}
