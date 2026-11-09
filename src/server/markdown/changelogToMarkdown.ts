import { buildFrontmatter } from './fileToMarkdown'
import { getChangelogData } from '@/server/getChangelogData'

/**
 * 为更新日志页面构建 `.md` 响应。更新日志页面由 JSON 数据生成
 *（参见 scripts/generate-changelogs.ts），并由
 * `resources/changelog/[slug]` 路由渲染，而不是来自 `.mdx` 文件，因此
 * resolveContentPath/fileToMarkdown 无法处理它们。此处采用
 * fileToMarkdown 生成的格式：frontmatter + H1 标题 + 描述 + 正文。
 *
 * 如果该 slug 没有对应的更新日志（slug 未知或无效），则返回 null，
 * 以便调用方继续返回 404。
 */
export function changelogToMarkdown(slug: string, canonicalUrl?: string): string | null {
  const data = getChangelogData(slug)
  if (!data) return null

  const title = `${data.packageName} 更新日志`
  const description = `${data.packageName} 的更新日志`
  const frontmatter = buildFrontmatter({ title, description, canonicalUrl })

  return `${[frontmatter, `# ${title}`, description, data.content].join('\n\n').trim()}\n`
}
