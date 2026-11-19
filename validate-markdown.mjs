import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'

const require = createRequire(resolve('docs/package.json'))
const markdown = require('markdown-it')({ html: true, linkify: true })
const yaml = require('js-yaml')
const GithubSlugger = require('github-slugger')
const path = process.argv[2]
const source = readFileSync(path, 'utf8')
const candidate = readFileSync(0, 'utf8')
const anchorLine = /^<a id="([a-z0-9_-]+)"><\/a>[ \t]*$/gm
const slugger = new GithubSlugger()
const sourceTokens = markdown.parse(source, {})
const headingIds = new Set(
    sourceTokens.flatMap((token, index) => {
        if (token.type !== 'heading_open') return []
        const heading = sourceTokens[index + 1].children
            .filter((part) => part.type === 'text' || part.type === 'code_inline')
            .map((part) => part.content)
            .join('')
        return [slugger.slug(heading)]
    })
)
for (const [, id] of source.matchAll(anchorLine)) headingIds.delete(id)

function readDocument(content, allowHeadingAliases = false) {
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
    const data = frontmatter ? yaml.load(frontmatter[1]) : null
    if (data && typeof data === 'object') {
        if (!path.startsWith('docs/src/rules/') && typeof data.title === 'string' && !/[<>]/.test(data.title)) {
            data.title = ''
        }
        if (typeof data.eleventyNavigation?.title === 'string' && !/[<>]/.test(data.eleventyNavigation.title)) {
            data.eleventyNavigation.title = ''
        }
    }

    const templates = content.match(/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}|\{#[\s\S]*?#\}|\{\{|\{%|\{#/g) ?? []
    let body = content.slice(frontmatter?.[0].length ?? 0)
    if (allowHeadingAliases) body = body.replace(anchorLine, (line, id) => headingIds.delete(id) ? '' : line)
    const tokens = markdown.parse(body, {}).flatMap((token) => [token, ...(token.children ?? [])])
    const code = tokens
        .filter((token) => token.type === 'fence' || token.type === 'code_block')
        .map((token) => [token.info, token.content])
    const inlineCode = tokens.filter((token) => token.type === 'code_inline').map((token) => token.content).sort()
    const links = tokens
        .filter((token) => token.type === 'link_open' || token.type === 'image')
        .map((token) => JSON.stringify(token.attrs))
        .sort()
    const html = tokens
        .filter((token) => token.type === 'html_block' || token.type === 'html_inline')
        .map((token) => token.content.trim())
    return { data, templates, code, inlineCode, links, html }
}

const original = readDocument(source)
const translated = readDocument(candidate, true)
const changed = Object.keys(original).filter((key) => !isDeepStrictEqual(original[key], translated[key]))
if (changed.length) {
    const diagnostics = [{ message: '译文改变了应保留的内容：' + changed.join(', ') }]
    for (const key of ['inlineCode', 'links']) {
        if (!changed.includes(key)) continue
        const missing = [...original[key]]
        const added = translated[key].filter((value) => {
            const index = missing.indexOf(value)
            if (index === -1) return true
            missing.splice(index, 1)
            return false
        })
        diagnostics.push({
            message: `${key} 缺少：${JSON.stringify(missing).slice(0, 2000)}。多出：${JSON.stringify(added).slice(0, 2000)}`
        })
    }
    if (changed.includes('code')) {
        const index = original.code.findIndex((value, i) => !isDeepStrictEqual(value, translated.code[i]))
        diagnostics.push({
            message: index === -1
                ? `原文有 ${original.code.length} 个代码块，译文有 ${translated.code.length} 个。`
                : `第 ${index + 1} 个代码块应逐字复制原文：${JSON.stringify(original.code[index]).slice(0, 4000)}`
        })
    }
    console.log(JSON.stringify(diagnostics))
    process.exitCode = 1
}
