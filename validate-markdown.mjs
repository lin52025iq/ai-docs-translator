import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'

const require = createRequire(resolve('docs/package.json'))
const markdown = require('markdown-it')({ html: true, linkify: true })
const yaml = require('js-yaml')
const path = process.argv[2]
const source = readFileSync(path, 'utf8')
const candidate = readFileSync(0, 'utf8')

function readDocument(content) {
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

    const body = content.slice(frontmatter?.[0].length ?? 0)
    const templates = body.match(/\{(?:\{|%|#)[\s\S]*?(?:\}\}|%\}|#\})/g) ?? []
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
        .map((token) => token.content.replace(/^<a id="[a-z0-9_-]+"><\/a>\n?$/gm, '').trim())
        .filter(Boolean)
    return { data, templates, code, inlineCode, links, html }
}

const original = readDocument(source)
const translated = readDocument(candidate)
const changed = Object.keys(original).filter((key) => !isDeepStrictEqual(original[key], translated[key]))
if (changed.length) {
    console.log(JSON.stringify([{ message: '译文改变了应保留的内容：' + changed.join(', ') }]))
    process.exitCode = 1
}
