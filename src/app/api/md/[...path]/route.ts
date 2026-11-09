import { NextRequest, NextResponse } from 'next/server'
import { resolveContentPath, normalizeRoutePath } from '@/server/markdown/resolveContentPath'
import { fileToMarkdown } from '@/server/markdown/fileToMarkdown'
import { changelogToMarkdown } from '@/server/markdown/changelogToMarkdown'
import { createCanonicalUrl } from '@/server/createCanonicalUrl'

// 需要使用 Node.js 运行时，以便访问 src/content 中的文件系统。
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ path?: string[] }> }

const CHANGELOG_PREFIX = 'resources/changelog/'

/** 为站内文档路由添加 `.md` 后缀（但不为带扩展名的资源路径添加）。 */
function toMarkdownDestination(destination: string): string {
  if (/\.[a-z0-9]+$/i.test(destination)) return destination
  return `${destination}.md`
}

/**
 * 构建状态码为 200 的 Markdown 响应，并附带通用的规范 URL、缓存和 robots 标头。
 *
 * 通过 `Accept: text/markdown`（代理信号）访问时，此响应会使用不带扩展名的 HTML URL 的缓存键。
 * Next 会从 HTML 页面响应中移除 `Vary: Accept`（这是一个已知的框架缺陷），因此，不遵循 Vary 的共享缓存可能会
 * 将此 Markdown 内容返回给浏览器。为避免这种情况，将其排除在共享缓存之外；独立的 `.md` URL 使用自己的缓存键，仍可缓存。
 */
function markdownResponse(markdown: string, canonical: string, negotiated: boolean): NextResponse {
  const cacheControl = negotiated
    ? 'private, no-store'
    : 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      // 同一 URL 根据 Accept 标头返回 HTML 或 Markdown。
      Vary: 'Accept',
      'Cache-Control': cacheControl,
      // 将爬虫指向规范的人类可读页面……
      Link: `<${canonical}>; rel="canonical"`,
      // ……并避免 Markdown 副本出现在搜索索引中。
      'X-Robots-Tag': 'noindex',
    },
  })
}

export async function GET(request: NextRequest, { params }: Params) {
  const { path: segments } = await params
  const routePath = normalizeRoutePath((segments ?? []).join('/'))
  const negotiated = request.headers.get('x-markdown-negotiated') === '1'

  // 更新日志页面由 JSON 数据生成，并通过 `resources/changelog/[slug]` 路由渲染，因此没有
  // 可供 resolveContentPath 查找的 `.mdx` 文件。直接提供其 Markdown 内容。若未找到，
  // 则继续调用 resolveContentPath，由它返回通用的 404 响应。
  if (routePath.startsWith(CHANGELOG_PREFIX)) {
    const slug = routePath.slice(CHANGELOG_PREFIX.length)
    if (!slug.includes('/')) {
      const canonical = createCanonicalUrl(['resources', 'changelog', slug])
      const markdown = changelogToMarkdown(slug, canonical)
      if (markdown) {
        return markdownResponse(markdown, canonical, negotiated)
      }
    }
  }

  const resolved = resolveContentPath(routePath)

  if (resolved.type === 'redirect') {
    const target = new URL(toMarkdownDestination(resolved.destination), request.nextUrl.origin)
    return NextResponse.redirect(target, resolved.permanent ? 308 : 307)
  }

  if (resolved.type === 'not-found') {
    return new NextResponse(`# 未找到`, {
      status: 404,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        // 响应正文会显示请求路径；阻止浏览器将其 MIME 类型嗅探为 HTML。
        'X-Content-Type-Options': 'nosniff',
      },
    })
  }

  try {
    // 规范 URL 指向稳定生产域名上的人类可读 HTML 页面（与页面自身的 <link rel="canonical"> 一致），
    // 而不是请求来源地址，后者可能是部署 URL。
    const canonical = createCanonicalUrl(resolved.routePath ? resolved.routePath.split('/') : [])
    const markdown = await fileToMarkdown(resolved.filePath, canonical)

    return markdownResponse(markdown, canonical, negotiated)
  } catch (error) {
    console.error(`渲染 /${routePath} 的 Markdown 失败：`, error)
    return new NextResponse('# 错误\n\n无法将此页面渲染为 Markdown。\n', {
      status: 500,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  }
}
