import { cache } from 'react'
import { getAllContent } from './getAllContent'

/**
 * 获取内容目录中的所有内容路径
 * 将 MDX 路径替换为 URL 路径
 * 例如：src/content/about/license.mdx => /about/license
 * 按请求缓存，以避免重复处理。
 */
export const getAllContentPaths = cache(async (options?: { withoutIndex?: boolean }) => {
  const allFiles = await getAllContent()

  const allPaths = allFiles
    .map((file) => {
      let path = file.replace('src/content', '').replace('.mdx', '').replace('index', '')

      if (path.at(-1) === '/') {
        path = path.slice(0, -1)
      }

      return path
    })
    .filter((path) => {
      if (path === '' && options?.withoutIndex) {
        return false
      }

      return true
    })

  return allPaths
})
