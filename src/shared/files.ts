import { readFile } from 'node:fs/promises'

import { isBinaryFile } from 'isbinaryfile'

/** 翻译入口按内容识别文本，当前只解码 UTF-8，防止损坏其他编码的原文。 */
export async function readTranslationFile(path: string) {
    const bytes = await readFile(path)
    return { bytes, content: await decodeTranslationText(bytes) }
}

/** 文件读取和 Git blob 读取共用同一文本识别边界。 */
export async function decodeTranslationText(bytes: Buffer) {
    if (bytes.includes(0) || (await isBinaryFile(bytes))) return null
    try {
        return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes)
    } catch {
        return null
    }
}

/** 可选配置缺失时返回 undefined；权限、读取等其他错误继续上报。 */
export async function readOptionalText(path: string) {
    try {
        return await readFile(path, 'utf8')
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return undefined
        throw error
    }
}
