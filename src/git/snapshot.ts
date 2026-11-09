import { type SimpleGit } from 'simple-git'

import { decodeTranslationText } from '../shared/files.ts'
import { type FileSnapshot } from '../state/translation-state.ts'
import { type GitEntry, readBlob } from './branches.ts'

/** 从 Git 快照读取配置命中的文本，不读取工作树修改或跟随符号链接。 */
export async function readTextSnapshot(
    git: SimpleGit,
    tree: Record<string, GitEntry>,
    matches: (path: string) => boolean
) {
    const files: Record<string, FileSnapshot> = {}
    const contents: Record<string, string> = {}
    for (const [path, entry] of Object.entries(tree)) {
        const content =
            matches(path) && (entry.mode === '100644' || entry.mode === '100755')
                ? await decodeTranslationText(await readBlob(git, entry.blobSha))
                : null
        files[path] = { blobSha: entry.blobSha, isText: content !== null }
        if (content !== null) contents[path] = content
    }
    return { files, contents }
}
