import { NextResponse } from 'next/server'

export async function GET() {
  // 计算过期日期：从现在起一年后
  const expirationDate = new Date()
  expirationDate.setFullYear(expirationDate.getFullYear() + 1)

  // 格式化为 ISO 8601 字符串
  const expires = expirationDate.toISOString()

  const securityTxt = `Contact: mailto:security@tiptap.dev
Expires: ${expires}
Preferred-Languages: en
Canonical: https://tiptap.dev/.well-known/security.txt
Policy: https://github.com/ueberdosis/tiptap/blob/main/SECURITY.md
`

  return new NextResponse(securityTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
