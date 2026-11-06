import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

import { z } from 'zod'

import { createScopeMatcher, type ProjectConfig } from '../project/config.ts'
import { readOptionalText } from '../shared/files.ts'

const blobSchema = z.string().regex(/^[a-f0-9]{40}$/)
const contextHashSchema = z.string().regex(/^[a-f0-9]{64}$/)
const successSchema = z.strictObject({
    sourceBlobSha: blobSchema,
    targetBlobSha: blobSchema,
    contextHash: contextHashSchema,
    model: z.string().min(1),
    translatedAt: z.iso.datetime()
})
const attemptSchema = z.strictObject({
    sourceBlobSha: blobSchema,
    contextHash: contextHashSchema,
    attemptedAt: z.iso.datetime(),
    status: z.enum(['retryable_failed', 'failed', 'blocked', 'conflict']),
    errorCode: z.string().min(1)
})
const manifestSchema = z.strictObject({
    schemaVersion: z.literal(1),
    projectId: z.string().min(1),
    locale: z.string().min(1),
    files: z.record(
        z.string(),
        z.strictObject({
            lastSuccess: successSchema.nullable(),
            lastAttempt: attemptSchema.nullable()
        })
    )
})

export type Manifest = z.infer<typeof manifestSchema>
export type FileStatus =
    | 'pending'
    | 'translated'
    | 'manually_modified'
    | 'retryable_failed'
    | 'failed'
    | 'blocked'
    | 'deleted'
    | 'out_of_scope'
    | 'not_text'
    | 'conflict'

/** 从本地文件读取边界生成，二进制和不支持的文本编码不进入翻译队列。 */
export type FileSnapshot = { blobSha: string; isText: boolean }

/** 与 Git 默认 SHA-1 blob 算法一致，按原始字节计算，不能提前转换换行符。 */
export function gitBlobSha(content: Uint8Array) {
    return createHash('sha1').update(`blob ${content.byteLength}\0`).update(content).digest('hex')
}

/** 缺失时初始化；已有状态必须符合 Schema 及当前项目、语言身份。 */
export async function loadManifest(path: string, projectId: string, locale: string): Promise<Manifest> {
    const content = await readOptionalText(path)
    return parseManifest(content, projectId, locale)
}

/** 在本地文件或 Git blob 的读取边界统一解析状态。 */
export function parseManifest(content: string | undefined, projectId: string, locale: string): Manifest {
    if (content === undefined) return { schemaVersion: 1, projectId, locale, files: {} }
    const manifest = manifestSchema.parse(JSON.parse(content))
    if (manifest.projectId !== projectId || manifest.locale !== locale)
        throw new Error('Manifest 与当前项目或语言不匹配')
    return manifest
}

/** 保存本地状态快照；发布器在确认译文发布后，将状态和进度提交到配置分支。 */
export async function saveManifest(path: string, manifest: Manifest) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, `${JSON.stringify(manifest, null, 4)}\n`, 'utf8')
}

/** 生成待保存快照；只有译文发布成功后，发布器才能将其保存到配置分支。 */
export function prepareSuccessfulTranslation(
    manifest: Manifest,
    path: string,
    success: z.infer<typeof successSchema>
): Manifest {
    return {
        ...manifest,
        files: { ...manifest.files, [path]: { lastSuccess: success, lastAttempt: null } }
    }
}

/** 失败只记录尝试，不推进最后成功源版本，也不覆盖旧译文的凭证。 */
export function recordTranslationFailure(
    manifest: Manifest,
    path: string,
    attempt: z.infer<typeof attemptSchema>
): Manifest {
    return {
        ...manifest,
        files: {
            ...manifest.files,
            [path]: { lastSuccess: manifest.files[path]?.lastSuccess ?? null, lastAttempt: attempt }
        }
    }
}

/** 输入为仓库相对路径到文件快照的映射；本次计划由实际文件重新计算。 */
export function planTranslations(input: {
    config: ProjectConfig
    manifest: Manifest
    source: Record<string, FileSnapshot>
    target: Record<string, FileSnapshot>
    contextHash: string
    retryFailed?: boolean
}) {
    const { config, manifest, source, target, contextHash } = input
    const matches = createScopeMatcher(config)
    const paths = new Set([...Object.keys(source), ...Object.keys(manifest.files)])
    return [...paths].sort().map((path) => {
        const record = manifest.files[path]
        const success = record?.lastSuccess
        const attempt = record?.lastAttempt
        let status: FileStatus
        let shouldTranslate = false
        if (!source[path]) {
            status = 'deleted'
        } else if (!matches(path)) {
            status = 'out_of_scope'
        } else if (!source[path].isText) {
            status = 'not_text'
        } else if (
            !target[path] ||
            !target[path].isText ||
            !success ||
            success.sourceBlobSha !== source[path].blobSha ||
            (config.translation.retranslateOnContextChange && success.contextHash !== contextHash)
        ) {
            const sameAttempt = attempt?.sourceBlobSha === source[path].blobSha && attempt.contextHash === contextHash
            status = sameAttempt ? attempt.status : 'pending'
            shouldTranslate = (status !== 'failed' && status !== 'conflict') || input.retryFailed === true
        } else {
            status = success.targetBlobSha === target[path].blobSha ? 'translated' : 'manually_modified'
        }
        return {
            path,
            status,
            shouldTranslate,
            sourceBlobSha: source[path]?.blobSha ?? null,
            targetBlobSha: target[path]?.blobSha ?? null
        }
    })
}

/** Progress 是可重建的管理视图；人工修改且原文未变也计入已完成数量。 */
export function createProgress(manifest: Manifest, files: ReturnType<typeof planTranslations>) {
    const summary: Record<FileStatus, number> = {
        pending: 0,
        translated: 0,
        manually_modified: 0,
        retryable_failed: 0,
        failed: 0,
        blocked: 0,
        deleted: 0,
        out_of_scope: 0,
        not_text: 0,
        conflict: 0
    }
    for (const file of files) summary[file.status] += 1
    const total = files.length - summary.deleted - summary.out_of_scope - summary.not_text
    return {
        schemaVersion: 1,
        projectId: manifest.projectId,
        locale: manifest.locale,
        evaluatedAt: new Date().toISOString(),
        total,
        completed: summary.translated + summary.manually_modified,
        summary,
        files
    }
}

/** 保存配置检出目录中的进度快照；由发布器在确认译文结果后调用。 */
export async function saveProgress(path: string, progress: ReturnType<typeof createProgress>) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, `${JSON.stringify(progress, null, 4)}\n`, 'utf8')
}
