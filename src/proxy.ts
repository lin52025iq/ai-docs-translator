import { NextRequest, NextResponse } from 'next/server'

/** 明确请求 Markdown 的 Accept 标头值。 */
const MARKDOWN_ACCEPT = /text\/markdown|application\/markdown|text\/x-markdown/i

/** 非 `.md` 文件扩展名 → 静态资源，绝不作为 Markdown 处理。 */
const NON_MD_EXTENSION = /\.(?!md$)[a-z0-9]+$/i

/**
 * 内部信号：通过 `Accept` 协商在普通文档 URL 下提供 Markdown 时，设置在重写后的请求上
 * （而不是通过其自身的 `.md` URL 提供）。Markdown 路由会读取此信号，将此类响应标记为
 * 不可由共享缓存缓存——原因请参阅路由处理程序。此处始终对其进行规范化，以防客户端伪造
 * 或移除该信号。
 */
const NEGOTIATED_HEADER = 'x-markdown-negotiated'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const endsWithMd = pathname.endsWith('.md')

  // 跳过静态资源（任何扩展名不是 .md 的文件）。
  if (!endsWithMd && NON_MD_EXTENSION.test(pathname)) {
    return NextResponse.next()
  }

  const accept = request.headers.get('accept') ?? ''

  const wantsMarkdown = endsWithMd || MARKDOWN_ACCEPT.test(accept)

  if (!wantsMarkdown) {
    return NextResponse.next()
  }

  // 规范化为内容路由片段；将根路径映射到索引页面。
  const cleanPath = (endsWithMd ? pathname.slice(0, -'.md'.length) : pathname).replace(
    /^\/|\/$/g,
    '',
  )
  const target = cleanPath === '' ? 'index' : cleanPath

  const url = request.nextUrl.clone()
  url.pathname = `/api/md/${target}`

  // 无论客户端发送了什么，都要规范化协商信号：`.md` URL 有独立的缓存键
  // （可安全地公开缓存）；而通过 Accept 提供的响应与普通 HTML URL 共用缓存键，
  // 因此不得由共享缓存缓存。
  const headers = new Headers(request.headers)
  if (endsWithMd) headers.delete(NEGOTIATED_HEADER)
  else headers.set(NEGOTIATED_HEADER, '1')

  return NextResponse.rewrite(url, { request: { headers } })
}

export const config = {
  // 除 Next 内部路径、Markdown API 本身以及已知的非文档顶层文件外，均运行此代理。
  // 资源扩展名会在代码中筛除。
  matcher: [
    '/((?!_next/|api/|assets/|\\.well-known/|favicon\\.ico|robots\\.txt|sitemap\\.xml|llms\\.txt).*)',
  ],
}
