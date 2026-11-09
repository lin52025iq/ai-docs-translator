import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'
import frontMatter from 'front-matter'
import { transformMdxToMarkdown } from './transformMdx'

type Frontmatter = {
  title?: string
  description?: string
  meta?: { title?: string; description?: string }
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content')
const DATES_MANIFEST_PATH = path.join(
  process.cwd(),
  'src/server/markdown/contentDates.generated.json',
)

/**
 * 构建时生成的 Git 日期清单（相对于内容目录的路径 → YYYY-MM-DD），仅加载一次。
 * 在开发环境中，直到运行 `generate:content-dates` 前都不存在——这种情况下会省略 `last_updated`。
 */
let contentDates: Record<string, string> | null = null
function getContentDates(): Record<string, string> {
  if (contentDates) return contentDates
  let loaded: Record<string, string>
  try {
    loaded = JSON.parse(fsSync.readFileSync(DATES_MANIFEST_PATH, 'utf8'))
  } catch {
    loaded = {}
  }
  contentDates = loaded
  return loaded
}

/** Frontmatter 描述可能包含内联 HTML；将其转换为纯文本。 */
function stripHtml(value: string): string {
  let previous: string
  let output = value
  do {
    previous = output
    output = output.replace(/<[^<>]*>/g, '')
  } while (output !== previous)
  return output.replace(/\s+/g, ' ').trim()
}

/** 构建最精简的 YAML frontmatter 区块，置于每个 `.md` 响应的开头。 */
export function buildFrontmatter(fields: {
  title?: string
  description?: string
  canonicalUrl?: string
  lastUpdated?: string
}): string {
  const lines: string[] = []
  // JSON.stringify 会生成带安全引号和转义的标量（可处理冒号、引号等），且符合 YAML 格式。
  if (fields.title) lines.push(`title: ${JSON.stringify(fields.title)}`)
  if (fields.description) lines.push(`description: ${JSON.stringify(fields.description)}`)
  if (fields.canonicalUrl) lines.push(`canonical_url: ${JSON.stringify(fields.canonicalUrl)}`)
  // 日期是裸 YAML 标量（不加引号）。
  if (fields.lastUpdated) lines.push(`last_updated: ${fields.lastUpdated}`)
  return `---\n${lines.join('\n')}\n---`
}

/**
 * 读取内容 `.mdx` 文件，并生成提供给 AI 代理的 Markdown：最精简的 frontmatter 区块（title、description、canonical_url、last_updated），
 * 后接 H1 标题、描述和经过筛选的正文。
 */
export async function fileToMarkdown(filePath: string, canonicalUrl?: string): Promise<string> {
  const raw = await fs.readFile(filePath, 'utf8')
  const { attributes, body } = frontMatter<Frontmatter>(raw)
  const transformed = await transformMdxToMarkdown(body)

  const title = attributes.title ?? attributes.meta?.title
  const rawDescription = attributes.description ?? attributes.meta?.description
  const description = rawDescription ? stripHtml(rawDescription) : undefined

  const contentKey = path.relative(CONTENT_DIR, filePath).split(path.sep).join('/')
  const lastUpdated = getContentDates()[contentKey]

  const frontmatter = buildFrontmatter({ title, description, canonicalUrl, lastUpdated })

  const parts: string[] = [frontmatter]
  if (title) parts.push(`# ${title}`)
  if (description) parts.push(description)
  parts.push(transformed)

  return `${parts.join('\n\n').trim()}\n`
}
