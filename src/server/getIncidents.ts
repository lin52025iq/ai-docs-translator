import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import { readFrontmatter } from './readFrontmatter'
import type { IncidentData } from '@/types'

// 安全解析日期的辅助函数
function parseDateSafely(dateString: string): Date | null {
  if (!dateString || typeof dateString !== 'string' || dateString.trim() === '') {
    return null
  }

  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

/**
 * 获取所有 MDX 文件中的事件。
 * 按请求缓存，以避免重复扫描文件系统。
 */
export const getIncidents = cache(async (): Promise<IncidentData[]> => {
  const incidentsDir = path.join(process.cwd(), 'src/content/resources/incidents')

  try {
    const files = fs.readdirSync(incidentsDir)
    const incidents: IncidentData[] = []

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(incidentsDir, file)
        const attributes = await readFrontmatter(filePath)

        const slug = file.replace('.mdx', '')
        const url = `/resources/incidents/${slug}`

        incidents.push({
          title: attributes.title || '',
          meta: {
            title: attributes.meta?.title || '',
            description: attributes.meta?.description || '',
            category: attributes.meta?.category || '',
          },
          incident: attributes.incident || {
            product: '',
            date: '',
            status: 'resolved',
            severity: 'low',
          },
          path: file,
          url: url,
        })
      }
    }

    // 按日期排序（从新到旧），并妥善处理无效日期
    incidents.sort((a, b) => {
      const dateA = parseDateSafely(a.incident.date)
      const dateB = parseDateSafely(b.incident.date)

      // 如果两个日期都无效，则保持原有顺序
      if (!dateA && !dateB) {
        return 0
      }

      // 如果只有一个日期无效，则将无效日期排在最后
      if (!dateA) return 1
      if (!dateB) return -1

      // 两个日期都有效，则按时间顺序排序（从新到旧）
      return dateB.getTime() - dateA.getTime()
    })

    return incidents
  } catch (error) {
    console.error('加载事件时出错：', error)
    return []
  }
})