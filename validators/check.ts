import { glob, readFile } from 'node:fs/promises'
import { extname, relative, resolve } from 'node:path'

import { createProcessor } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import ts from 'typescript'
import { parseDocument } from 'yaml'

const processor = createProcessor().use(remarkGfm)
type Diagnostic = { path: string; message: string; line?: number; column?: number }

async function check(file: string, path: string): Promise<Diagnostic[]> {
    const text = await readFile(file, 'utf8')
    if (extname(path) !== '.mdx') {
        const result = ts.transpileModule(text, {
            fileName: path,
            reportDiagnostics: true,
            compilerOptions: { jsx: ts.JsxEmit.Preserve, target: ts.ScriptTarget.ESNext }
        })
        return (result.diagnostics ?? []).map((entry) => {
            const location = entry.file?.getLineAndCharacterOfPosition(entry.start ?? 0)
            return {
                path,
                message: ts.flattenDiagnosticMessageText(entry.messageText, '\n'),
                line: location && location.line + 1,
                column: location && location.character + 1
            }
        })
    }

    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
    if (!frontmatter && /^---\r?\n/.test(text)) return [{ path, message: 'YAML 头部缺少结束分隔符', line: 1 }]
    const diagnostics = frontmatter
        ? parseDocument(frontmatter[1]).errors.map((error) => ({ path, message: error.message }))
        : []
    const body = frontmatter ? text.replace(frontmatter[0], frontmatter[0].replace(/[^\r\n]/g, '')) : text
    try {
        processor.parse(body)
    } catch (error) {
        if (!(error instanceof Error)) throw error
        diagnostics.push({ path, message: error.message })
    }
    return diagnostics
}

try {
    const [mode, file, path] = process.argv.slice(2)
    const diagnostics: Diagnostic[] = []
    if (mode === 'file' && file && path) {
        diagnostics.push(...(await check(file, path)))
    } else if (mode === 'global') {
        for await (const entry of glob(['src/**/*.mdx', 'src/**/*.{ts,tsx}'], { withFileTypes: true })) {
            if (!entry.isFile()) continue
            const file = resolve(entry.parentPath, entry.name)
            const path = relative(process.cwd(), file).replaceAll('\\', '/')
            diagnostics.push(...(await check(file, path)))
        }
    } else {
        throw new Error('Usage: check.ts file <candidate> <path> | global')
    }
    if (diagnostics.length) {
        console.log(JSON.stringify(diagnostics))
        process.exitCode = 1
    }
} catch (error) {
    console.error(error instanceof Error ? error.message : 'Tiptap 校验器执行失败')
    process.exitCode = 2
}
