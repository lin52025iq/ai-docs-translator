import fs from 'fs/promises'
import path from 'path'
import glob from 'fast-glob'
import frontMatter from 'front-matter'
import { FULL_DOMAIN } from '@/utils/constants'

// 在构建时读取一次内容目录；输出不会因请求而异。
export const runtime = 'nodejs'
export const dynamic = 'force-static'

type Frontmatter = {
  title?: string
  description?: string
  meta?: { title?: string; description?: string }
}

/** src/content 路径 → 公共路由，例如 `editor/index.mdx` → `/editor`。 */
function fileToRoute(file: string): string {
  const p = file
    .replace(/\.mdx$/, '')
    .replace(/\/index$/, '')
    .replace(/^index$/, '')
  return p ? `/${p}` : '/'
}

/** 智能体可通过此 `.md` URL 获取指定路由的内容。 */
function markdownUrl(route: string): string {
  return `${FULL_DOMAIN}${route === '/' ? '/index' : route}.md`
}

function stripHtml(value?: string): string {
  if (!value) return ''
  let previous: string
  let output = value
  do {
    previous = output
    output = output.replace(/<[^<>]*>/g, '')
  } while (output !== previous)
  return output.replace(/\s+/g, ' ').trim()
}

function sectionTitle(section: string): string {
  return section
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export async function GET() {
  const files = await glob('**/*.mdx', { cwd: 'src/content' })

  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(process.cwd(), 'src/content', file), 'utf8')
      const { attributes } = frontMatter<Frontmatter>(raw)
      const route = fileToRoute(file)
      return {
        route,
        section: file.split('/')[0].replace(/\.mdx$/, ''),
        title: attributes.title ?? attributes.meta?.title ?? route,
        description: stripHtml(attributes.description ?? attributes.meta?.description),
      }
    }),
  )

  const bySection = new Map<string, typeof entries>()
  for (const entry of entries) {
    const list = bySection.get(entry.section) ?? []
    list.push(entry)
    bySection.set(entry.section, list)
  }

  const lines: string[] = [
    '# Tiptap 文档',
    '',
    '> Tiptap 是一个无头且可扩展的富文本编辑器框架，专为现代 Web 和应用开发需求打造。',
    '',
    '每个页面都提供 Markdown 格式：在任意文档 URL 后添加 `.md`，' +
      ' 或发送 `Accept: text/markdown` 标头。',
    '',
    '如需了解产品概况和精选入口，请访问 https://tiptap.dev/llms.txt',
    '',
  ]

  for (const [section, items] of [...bySection.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    lines.push(`## ${sectionTitle(section)}`, '')
    for (const item of items.sort((a, b) => a.route.localeCompare(b.route))) {
      const suffix = item.description ? `: ${item.description}` : ''
      lines.push(`- [${item.title}](${markdownUrl(item.route)})${suffix}`)
    }
    lines.push('')
  }

  return new Response(`${lines.join('\n').trim()}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
