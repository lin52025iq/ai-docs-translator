import fs from 'fs'
import path from 'path'
import { SidebarConfig } from '@/types'

function isSidebarItem(value: unknown): value is { href: string; title: string } {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const item = value as Record<string, unknown>

  return typeof item.href === 'string' && typeof item.title === 'string'
}

function loadChangelogSidebarItems(): Array<{ href: string; title: string }> {
  try {
    const filePath = path.join(
      process.cwd(),
      'src/content/resources/changelog/_data/sidebar-items.json',
    )
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    return Array.isArray(data) ? data.filter(isSidebarItem) : []
  } catch {
    return []
  }
}

const changelogChildren = loadChangelogSidebarItems()

export const sidebarConfig: SidebarConfig = {
  id: 'all-docs',
  rootHref: '/',
  title: '首页',
  items: [
    {
      type: 'group',
      title: '入门',
      href: '/getting-started',
      children: [
        {
          href: '/',
          title: '概览',
        },
        {
          href: '/resources/whats-new',
          title: '3.0 新功能',
        },
        {
          href: '/authentication',
          title: '身份验证',
          tags: ['新'],
          children: [
            {
              href: '/authentication/migrate',
              title: '从旧版迁移',
            },
            {
              href: '/authentication/legacy',
              title: '旧版身份验证',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      title: '按功能浏览',
      href: '/suite-docs',
      children: [
        {
          href: '/editor/getting-started/overview',
          title: '编辑器',
        },
        {
          href: '/collaboration/getting-started/overview',
          title: '协作',
        },
        {
          href: '/comments/getting-started/overview',
          title: '评论',
        },
        {
          href: '/tracked-changes/getting-started/overview',
          title: '修订',
        },
        {
          href: '/ai/ai-toolkit/overview',
          title: 'AI 工具包',
        },
        {
          href: '/collaboration/documents/snapshot',
          title: '快照',
        },
        {
          href: '/conversion/getting-started/overview',
          title: '转换',
        },
        {
          href: '/pages/getting-started/overview',
          title: '页面',
        },
      ],
    },
    {
      type: 'group',
      title: '资源',
      href: '/',
      children: [
        {
          href: '/guides',
          title: '指南',
        },
        {
          href: '/examples',
          title: '示例',
        },
        {
          href: '/resources/agent-skill',
          title: '智能体技能',
        },
        {
          href: '/resources/tiptap-trial',
          title: 'Tiptap 试用',
        },
        {
          href: '/resources/contributing',
          title: '参与贡献',
        },
        {
          href: '/resources/changelog',
          title: '编辑器更新日志',
          children: changelogChildren,
        },
        {
          href: '/resources/incidents',
          title: '事件',
        },
        {
          href: 'https://tiptap.dev/pro-license',
          title: 'Pro 许可证',
        },
      ],
    },
  ],
}
