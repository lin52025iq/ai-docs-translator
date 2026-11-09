import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function addFeedbackToNotion({
  slug,
  helpful,
  yesText,
  noOption,
  noText,
}: {
  slug?: string
  helpful: boolean
  yesText?: string
  noOption?: string
  noText?: string
}) {
  const databaseId = process.env.NOTION_FEEDBACK_DATABASE_ID
  if (!databaseId) throw new Error('NOTION_FEEDBACK_DATABASE_ID is not set')

  // 组合 Notion 属性
  const basePath = process.env.NEXT_PUBLIC_DOMAIN || ''
  const fullSlug = `${basePath}${slug || ''}`
  const properties: any = {
    Slug: { title: [{ text: { content: fullSlug || 'Unknown Slug' } }] },
    Helpful: { checkbox: helpful },
    Timestamp: { date: { start: new Date().toISOString() } },
  }
  // Slug 无需设置 rich_text，仅使用 title 即可
  if (helpful && yesText) {
    properties['Positive Feedback'] = { rich_text: [{ text: { content: yesText } }] }
  }
  if (!helpful) {
    if (noOption) {
      properties['Issue'] = { select: { name: noOption } }
    }
    if (noText) {
      properties['Negative Feedback'] = { rich_text: [{ text: { content: noText } }] }
    }
  }

  return notion.pages.create({
    parent: { database_id: databaseId },
    properties,
  })
}
