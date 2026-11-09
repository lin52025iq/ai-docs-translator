import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import picomatch from 'picomatch'
import { parse } from 'yaml'
import { z } from 'zod'

import { readOptionalText } from '../shared/files.ts'

export const localeSchema = z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/)
export const sourceLanguageSchema = z.union([z.literal('auto'), localeSchema])
const promptSchema = z.strictObject({
    frameworkLanguage: localeSchema.default('zh-CN'),
    frameworks: z.record(localeSchema, z.string().min(1)).default({}),
    common: z.string().min(1).optional()
})

export const draftSchema = z.strictObject({
    draftBranch: z.string().min(1).optional(),
    pushDraft: z.boolean().default(false),
    remote: z
        .string()
        .regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/)
        .default('origin')
})
const validationCommand = z.tuple([z.string().min(1)]).rest(z.string())

/** 翻译目标语言与框架书写语言独立，目标语言直接来自项目配置。 */
export const projectSchema = z
    .strictObject({
        schemaVersion: z.literal(1),
        project: z.strictObject({ id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), name: z.string().optional() }),
        source: z.strictObject({
            repository: z.string().regex(/^[\w.-]+\/[\w.-]+$/),
            ref: z.string().min(1).default('main'),
            branch: z.string().min(1),
            language: sourceLanguageSchema.default('auto')
        }),
        targets: z
            .array(
                z.strictObject({
                    locale: localeSchema,
                    branch: z.string().min(1),
                    enabled: z.boolean().default(true),
                    prompt: z.string().min(1).optional(),
                    frameworkLanguage: localeSchema.optional()
                })
            )
            .min(1),
        translation: z
            .strictObject({
                model: z.string().min(1).default('gpt-6-luna'),
                scope: z
                    .strictObject({
                        include: z.array(z.string().min(1)).min(1).default(['**/*.md', '**/*.mdx']),
                        exclude: z.array(z.string().min(1)).default([])
                    })
                    .prefault({}),
                glossary: z.string().min(1).optional(),
                prompts: promptSchema.prefault({}),
                draft: draftSchema.optional(),
                review: draftSchema
                    .extend({
                        enabled: z.boolean().optional(),
                        model: z.string().optional(),
                        minimumProbability: z.number().optional()
                    })
                    .optional(),
                retranslateOnContextChange: z.boolean().default(false)
            })
            .prefault({})
            .transform(({ draft, review, ...translation }) => ({
                ...translation,
                draft:
                    draft ??
                    draftSchema.parse({
                        draftBranch: review?.draftBranch,
                        pushDraft: review?.pushDraft,
                        remote: review?.remote
                    })
            })),
        deployment: z
            .strictObject({
                provider: z.literal('vercel'),
                locale: localeSchema,
                name: z.string().min(1),
                teamId: z.string().regex(/^team_[a-zA-Z0-9]+$/),
                projectId: z.string().regex(/^prj_[a-zA-Z0-9]+$/),
                repositoryId: z.string().regex(/^\d+$/)
            })
            .optional(),
        validation: z
            .strictObject({
                files: z
                    .array(
                        z.strictObject({
                            include: z.array(z.string().min(1)).min(1),
                            command: validationCommand
                        })
                    )
                    .default([]),
                global: z.strictObject({ command: validationCommand }).optional()
            })
            .prefault({})
    })
    .superRefine((config, context) => {
        const locales = new Set<string>()
        const configBranch = `${config.project.id}-config`
        const branches = new Set([configBranch, config.source.branch])
        if (config.source.branch === configBranch) {
            context.addIssue({ code: 'custom', path: ['source', 'branch'], message: 'Source 分支不能与配置分支相同' })
        }
        for (const [index, target] of config.targets.entries()) {
            if (locales.has(target.locale) || branches.has(target.branch)) {
                context.addIssue({
                    code: 'custom',
                    path: ['targets', index],
                    message: '语言和分支必须唯一，且目标分支不能与 Source 或配置分支相同'
                })
            }
            locales.add(target.locale)
            branches.add(target.branch)
        }
        if (config.deployment) {
            const { locale } = config.deployment
            if (!config.targets.some((target) => target.enabled && target.locale === locale)) {
                context.addIssue({ code: 'custom', path: ['deployment', 'locale'], message: '部署语言必须已启用' })
            }
            if (!config.validation.global) {
                context.addIssue({ code: 'custom', path: ['validation', 'global'], message: '部署需要配置全局校验' })
            }
        }
        const draftBranch = config.translation.draft.draftBranch ?? `${config.project.id}-draft`
        if (branches.has(draftBranch)) {
            context.addIssue({
                code: 'custom',
                path: ['translation', 'draft', 'draftBranch'],
                message: 'Draft 分支不能与配置、Source 或任何目标语言分支相同'
            })
        }
    })

const glossarySchema = z.strictObject({
    schemaVersion: z.literal(1),
    sourceLanguage: sourceLanguageSchema.default('auto'),
    terms: z
        .array(
            z.strictObject({
                source: z.string().min(1),
                context: z.string().optional(),
                doNotTranslate: z.boolean().default(false),
                translations: z.record(localeSchema, z.string().min(1)).default({})
            })
        )
        .default([])
})

export type ProjectConfig = z.infer<typeof projectSchema>

/** 所有项目附属文件路径均相对于 config.yml；缺失或空白的可选文件使用默认值。 */
export async function loadProject(configPath: string) {
    const path = resolve(configPath)
    const config = projectSchema.parse(parse(await readFile(path, 'utf8')))
    const directory = dirname(path)
    const glossaryText = config.translation.glossary
        ? await readOptionalText(resolve(directory, config.translation.glossary))
        : undefined
    const glossary = glossaryText?.trim() ? glossarySchema.parse(parse(glossaryText)) : undefined
    if (
        glossary &&
        glossary.sourceLanguage !== 'auto' &&
        config.source.language !== 'auto' &&
        glossary.sourceLanguage !== config.source.language
    ) {
        throw new Error('Glossary 源语言必须与项目源语言一致')
    }
    return { config, directory, glossary }
}

export type Project = Awaited<ReturnType<typeof loadProject>>

/** 仓库路径使用 POSIX 相对路径，排除规则优先；文件是否为文本由读取入口判断。 */
export function createScopeMatcher(config: ProjectConfig) {
    const include = picomatch(config.translation.scope.include, { dot: true })
    const exclude = picomatch(config.translation.scope.exclude, { dot: true })
    return (path: string) => include(path) && !exclude(path)
}
