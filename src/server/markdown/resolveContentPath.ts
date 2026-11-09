import fs from 'fs'
import path from 'path'
import { redirects } from '@/server/redirects.mjs'

const CONTENT_DIR = path.join(process.cwd(), 'src/content')

// 大多数重定向源都是静态字符串；通配符重定向将在下方解析。
const redirectMap = new Map(redirects.map((r) => [r.source, r]))

export type ResolveResult =
  | { type: 'file'; filePath: string; routePath: string }
  | { type: 'redirect'; destination: string; permanent: boolean }
  | { type: 'not-found' }

/**
 * 将传入的请求路径转换为规范的内容路由路径：
 * 去除查询参数和片段、末尾的 `.md`/`.mdx` 扩展名，以及首尾斜杠。
 */
export function normalizeRoutePath(input: string): string {
  let p = input.trim()
  p = p.split('?')[0].split('#')[0]
  p = p.replace(/\.mdx?$/i, '')
  p = p.replace(/\/+/g, '/').replace(/^\/|\/$/g, '')
  return p
}

/**
 * 将路由路径解析为内容 `.mdx` 文件、重定向（与
 * next.config.mjs 共用），或未找到。Markdown 端点使用此函数，确保 `.md`
 * 请求遵循与渲染后的网站相同的 301 重定向。
 */
export function resolveContentPath(input: string): ResolveResult {
  const routePath = normalizeRoutePath(input)
  const rel = routePath === '' ? 'index' : routePath

  const direct = path.join(CONTENT_DIR, `${rel}.mdx`)
  const index = path.join(CONTENT_DIR, rel, 'index.mdx')

  // 防止路径遍历导致路径越出内容目录。
  if (!direct.startsWith(CONTENT_DIR + path.sep) || !index.startsWith(CONTENT_DIR + path.sep)) {
    return { type: 'not-found' }
  }

  if (fs.existsSync(direct)) return { type: 'file', filePath: direct, routePath }
  if (fs.existsSync(index)) return { type: 'file', filePath: index, routePath }

  const sourcePath = `/${routePath}`
  const redirect =
    redirectMap.get(sourcePath) ??
    redirects.find(({ source }) => {
      if (!source.endsWith('/:rest*')) return false
      const prefix = source.slice(0, -'/:rest*'.length)
      return sourcePath === prefix || sourcePath.startsWith(`${prefix}/`)
    })

  if (redirect) {
    const rest = sourcePath.slice(redirect.source.length - ':rest*'.length).replace(/^\//, '')
    return {
      type: 'redirect',
      destination: redirect.destination.replace(':rest*', rest),
      permanent: redirect.permanent,
    }
  }

  return { type: 'not-found' }
}
