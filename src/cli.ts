import { glob, mkdir, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'

import { Command } from 'commander'

import { repositoryGit } from './git/branches.ts'
import { commitConflictDraft, writeConflictDraft } from './git/conflict-draft.ts'
import { createScopeMatcher, draftSchema, loadProject, localeSchema, sourceLanguageSchema } from './project/config.ts'
import { createProject } from './project/create.ts'
import { runProject } from './project/run.ts'
import { validateTranslations } from './project/validate.ts'
import { readTranslationFile, repositoryPathSchema } from './shared/files.ts'
import { logWarning } from './shared/log.ts'
import {
    createProgress,
    type FileSnapshot,
    gitBlobSha,
    loadManifest,
    planTranslations
} from './state/translation-state.ts'
import { buildTranslationContext } from './translation/prompt.ts'
import { translateValidated } from './translation/retry.ts'
import { createTranslator, TranslationError } from './translation/translator.ts'
import { createValidation } from './validation/runner.ts'

/** 仅扫描本地文档快照；本命令不 fetch、push 或执行上游仓库代码。 */
async function scanFiles(root: string, patterns: string[]) {
    const files: [string, FileSnapshot][] = []
    for await (const path of glob(patterns, {
        cwd: root,
        exclude: ['.git/**', 'node_modules/**'],
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
    .command('create-project')
    .description('创建独立的 <项目ID>-config 配置分支，或导入已有配置目录')
    .requiredOption('--name <id>', '项目 ID')
    .option('--source-repository <owner/repo>', '上游仓库')
    .option('--ref <ref>', '上游分支、标签或提交', 'main')
    .option('--source-language <locale>', '源语言或 auto', 'auto')
    .option('--locale <locales...>', '目标语言，可传多个', ['zh-CN'])
    .option('--from <directory>', '导入包含 config.yml 的已有配置目录，并保留提示词、术语及进度')
    .option('--repository <path>', '翻译管理仓库', '.')
    .option('--remote <name>', '配置分支推送远端；导入时使用已有配置中的远端', 'origin')
    .option('--push', '创建后推送配置分支')
    .action(async (options: Parameters<typeof createProject>[0]) => {
        console.log(JSON.stringify(await createProject(options), null, 4))
    })

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
            if (result.status === 'partial_success') process.exitCode = 1
            if (result.status === 'warning') {
                logWarning('翻译处理完成，异常输出已归档到 draft 分支，请人工确认；未推进冲突文件的成功状态')
            }
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
    .command('validate-translations')
    .requiredOption('--project <path>', '项目配置')
    .requiredOption('--locale <locale>', '项目中启用的目标语言')
    .option('--repository <path>', '管理仓库', '.')
    .action(async (options: Parameters<typeof validateTranslations>[0]) => {
        const result = await validateTranslations(options)
        console.log(JSON.stringify(result, null, 4))
        if (result.diagnostics.length) process.exitCode = 1
    })

program
    .command('plan')
    .requiredOption('--project <path>', '项目 config.yml 路径')
    .requiredOption('--locale <locale>', '项目中启用的目标语言')
    .requiredOption('--source-root <path>', '本地 Source 快照根目录')
    .requiredOption('--target-root <path>', '本地目标语言快照根目录')
    .option('--retry-failed', '允许重新尝试当前版本的文件级失败或异常输出')
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
                resolve(project.directory, 'state', options.locale, 'manifest.json'),
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
    .description('翻译指定文本文件，校验通过后保存本地译文')
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
                sourceLanguage: options.sourceLanguage
            })
            if (project && !createScopeMatcher(project.config)(path)) {
                throw new Error('文件不在项目配置的翻译范围内')
            }
            const source = await readTranslationFile(sourcePath)
            if (source.content === null) throw new Error('仅支持 UTF-8 文本文件，当前文件已跳过')
            const previous = options.previous ? await readTranslationFile(resolve(options.previous)) : undefined
            if (previous?.content === null) throw new Error('旧译文必须为 UTF-8 文本文件')
            const draftOptions = project?.config.translation.draft ?? draftSchema.parse({})
            const draftConfig = {
                project: project?.config.project ?? { id: 'standalone' },
                translation: { draft: { ...draftOptions, pushDraft: options.pushDraft ?? draftOptions.pushDraft } }
            }
            const translate = createTranslator()
            const result = await translateValidated(
                translate,
                {
                    path,
                    sourceContent: source.content,
                    previousTranslation: previous?.content,
                    context
                },
                createValidation(project).file,
                new Map()
            )
            if (!result.approved) {
                const conflict = {
                    config: draftConfig,
                    locale,
                    path,
                    sourceContent: source.content,
                    previousTranslation: previous?.content,
                    result
                }
                const git = repositoryGit(options.repository)
                const draft = (await git.checkIsRepo())
                    ? await commitConflictDraft({ ...conflict, repository: options.repository })
                    : await writeConflictDraft({ ...conflict, directory: '.translation-drafts' })
                console.log(JSON.stringify({ status: 'conflict', ...draft }, null, 4))
                logWarning(`译文未应用，异常输出已归档：${draft.artifactPath}`)
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
                        diagnostics: result.diagnostics,
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
