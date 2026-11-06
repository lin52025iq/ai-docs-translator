import { glob, mkdir, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'

import { Command } from 'commander'

import { repositoryGit, repositoryPathSchema } from './git/branches.ts'
import { commitConflictDraft } from './git/conflict-draft.ts'
import { createScopeMatcher, loadProject, localeSchema, sourceLanguageSchema } from './project/config.ts'
import { runProject } from './project/run.ts'
import { readTranslationFile } from './shared/files.ts'
import {
    createProgress,
    type FileSnapshot,
    gitBlobSha,
    loadManifest,
    planTranslations
} from './state/translation-state.ts'
import { buildTranslationContext } from './translation/prompt.ts'
import { createTranslator, TranslationError } from './translation/translator.ts'

/** 仅扫描本地文档快照；本命令不 fetch、push 或执行上游仓库代码。 */
async function scanFiles(root: string, patterns: string[]) {
    const files: [string, FileSnapshot][] = []
    for await (const path of glob(patterns, {
        cwd: root,
        exclude: ['.git/**', 'node_modules/**', '.translation/**'],
        withFileTypes: true
    })) {
        if (!path.isFile()) continue
        const absolute = resolve(path.parentPath, path.name)
        const name = relative(root, absolute).replaceAll('\\', '/')
        const file = await readTranslationFile(absolute)
        files.push([name, { blobSha: gitBlobSha(file.bytes), isText: file.content !== null }])
    }
    return Object.fromEntries(files)
}

const program = new Command().name('translator').description('项目配置、增量规划与文件级 AI 翻译')

program
    .command('run-project')
    .requiredOption('--project <path>', '项目配置')
    .requiredOption('--source-root <path>', '已检出的上游仓库')
    .option('--repository <path>', '管理仓库', '.')
    .option('--push', '发布项目分支和进度')
    .option('--retry-failed', '重新处理文件级失败和冲突')
    .action(
        async (options: {
            project: string
            sourceRoot: string
            repository: string
            push?: boolean
            retryFailed?: boolean
        }) => {
            const result = await runProject({ ...options, push: options.push === true })
            console.log(JSON.stringify(result, null, 4))
            if (result.status !== 'success') process.exitCode = 1
        }
    )

program
    .command('validate')
    .requiredOption('--project <path>', '项目 config.yml 路径')
    .action(async (options: { project: string }) => {
        const project = await loadProject(options.project)
        for (const target of project.config.targets.filter((entry) => entry.enabled)) {
            await buildTranslationContext(project, target.locale)
        }
        console.log(`项目配置有效：${project.config.project.id}`)
    })

program
    .command('plan')
    .requiredOption('--project <path>', '项目 config.yml 路径')
    .requiredOption('--locale <locale>', '项目中启用的目标语言')
    .requiredOption('--source-root <path>', '本地 Source 快照根目录')
    .requiredOption('--target-root <path>', '本地目标语言快照根目录')
    .option('--retry-failed', '允许重新尝试当前版本的文件级失败或结构冲突')
    .action(
        async (options: {
            project: string
            locale: string
            sourceRoot: string
            targetRoot: string
            retryFailed?: boolean
        }) => {
            const project = await loadProject(options.project)
            const context = await buildTranslationContext(project, options.locale)
            const sourceRoot = resolve(options.sourceRoot)
            const targetRoot = resolve(options.targetRoot)
            const manifest = await loadManifest(
                resolve(targetRoot, '.translation/manifest.json'),
                project.config.project.id,
                options.locale
            )
            const patterns = [...project.config.translation.scope.include, ...Object.keys(manifest.files)]
            const [source, target] = await Promise.all([
                scanFiles(sourceRoot, patterns),
                scanFiles(targetRoot, patterns)
            ])
            const files = planTranslations({
                config: project.config,
                manifest,
                source,
                target,
                contextHash: context.contextHash,
                retryFailed: options.retryFailed
            })
            console.log(JSON.stringify(createProgress(manifest, files), null, 4))
        }
    )

program
    .command('translate-file')
    .alias('translate')
    .description('翻译指定文本文件，校验和审查通过后保存本地译文')
    .option('--project <path>', '项目 config.yml 路径，可省略')
    .option('--locale <locale>', '目标语言；无项目或启用多种语言时必填', (value) => localeSchema.parse(value))
    .option('--source-language <locale>', '源语言；auto 表示模型自动识别，默认使用配置或 auto', (value) =>
        sourceLanguageSchema.parse(value)
    )
    .option('--source-root <path>', '源文件根目录', '.')
    .requiredOption('--file <path>', '源目录内的文件路径，支持当前系统的路径格式')
    .option('--output <path>', '译文路径；默认 .translation-drafts/<语言>/<源文件路径>')
    .option('--previous <path>', '旧译文路径，可选')
    .option('--repository <path>', '保存 draft 分支的管理仓库路径', '.')
    .option('--push-draft', '推送冲突分支，覆盖项目 pushDraft 的默认值')
    .action(
        async (options: {
            project?: string
            locale?: string
            sourceLanguage?: string
            sourceRoot: string
            file: string
            output?: string
            previous?: string
            repository: string
            pushDraft?: boolean
        }) => {
            const sourceRoot = resolve(options.sourceRoot)
            const sourcePath = resolve(sourceRoot, options.file)
            const path = repositoryPathSchema.parse(relative(sourceRoot, sourcePath).replaceAll('\\', '/'))
            const project = options.project ? await loadProject(options.project) : undefined
            const targets = project?.config.targets.filter((target) => target.enabled) ?? []
            const locale = options.locale ?? (targets.length === 1 ? targets[0]?.locale : undefined)
            if (!locale) throw new Error('请通过 --locale 指定目标语言')
            const context = await buildTranslationContext(project, locale, {
                sourceLanguage: options.sourceLanguage,
                pushDraft: options.pushDraft
            })
            if (project && !createScopeMatcher(project.config)(path)) {
                throw new Error('文件不在项目配置的翻译范围内')
            }
            const source = await readTranslationFile(sourcePath)
            if (source.content === null) throw new Error('仅支持 UTF-8 文本文件，当前文件已跳过')
            const previous = options.previous ? await readTranslationFile(resolve(options.previous)) : undefined
            if (previous?.content === null) throw new Error('旧译文必须为 UTF-8 文本文件')
            const draftConfig = {
                project: project?.config.project ?? { id: 'standalone' },
                translation: { review: context.review }
            }
            const draftBranch = context.review.draftBranch ?? `${draftConfig.project.id}-draft`
            const git = repositoryGit(options.repository)
            if (!(await git.checkIsRepo())) {
                throw new Error('冲突归档需要本地 Git 仓库，请通过 --repository 指定')
            }
            await git.raw(['check-ref-format', `refs/heads/${draftBranch}`])
            if ((await git.branchLocal()).current === draftBranch) {
                throw new Error(`请先切换离开冲突归档分支 ${draftBranch}`)
            }
            const translate = createTranslator()
            const result = await translate({
                path,
                sourceContent: source.content,
                previousTranslation: previous?.content,
                context
            })
            if (!result.review.approved) {
                const draft = await commitConflictDraft({
                    repository: options.repository,
                    config: draftConfig,
                    locale,
                    path,
                    sourceContent: source.content,
                    previousTranslation: previous?.content,
                    result
                })
                console.log(JSON.stringify({ status: 'conflict', ...draft }, null, 4))
                process.exitCode = 1
                return
            }
            const output = resolve(options.output ?? `.translation-drafts/${locale}/${path}`)
            await mkdir(dirname(output), { recursive: true })
            await writeFile(output, result.content, 'utf8')
            console.log(
                JSON.stringify(
                    {
                        output,
                        model: result.model,
                        contextHash: result.contextHash,
                        responseId: result.responseId,
                        review: result.review,
                        status: 'draft',
                        message: '仅生成本地译文草稿，未发布，未推进翻译成功状态'
                    },
                    null,
                    4
                )
            )
        }
    )

try {
    await program.parseAsync()
} catch (error) {
    if (error instanceof TranslationError) {
        console.error(`${error.code} (${error.status}): ${error.message}`)
    } else {
        console.error(error instanceof Error ? error.message : '执行失败')
    }
    process.exitCode = 1
}
