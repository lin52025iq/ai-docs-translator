import fg from 'fast-glob'
import { cache } from 'react'

/**
 * 使用 fast-glob 从内容目录获取所有 MDX 文件。
 * 按请求缓存，以避免重复扫描文件系统。
 */
export const getAllContent = cache(async () => {
  const files = await fg('src/content/**/*.mdx')

  return files
})