import { useCallback, useSyncExternalStore } from 'react'

export type View = 'preview' | 'code' | 'both'
export type Theme = 'light' | 'dark'
export type Size = 'desktop' | 'tablet' | 'phone'
export type Framework = 'React' | 'Vue' | 'Svelte' | 'JS'

export const VIEWS: View[] = ['preview', 'code', 'both']
export const THEMES: Theme[] = ['light', 'dark']
export const SIZES: Size[] = ['desktop', 'tablet', 'phone']
export const FRAMEWORKS: Framework[] = ['React', 'Vue', 'Svelte', 'JS']

/** 页面未指定时，演示默认提供的框架。 */
export const DEFAULT_FRAMEWORKS: Framework[] = ['React', 'Vue']

/** MDX 中的写法：`"React"`、`"React, Vue"` 或 `['React', 'Vue']`。 */
export const parseFrameworks = (value: Framework[] | string | undefined): Framework[] => {
  if (!value) return DEFAULT_FRAMEWORKS
  const names = typeof value === 'string' ? value.split(',') : value
  const known = FRAMEWORKS.filter((framework) =>
    names.some((name) => name.trim().toLowerCase() === framework.toLowerCase()),
  )
  return known.length ? known : DEFAULT_FRAMEWORKS
}

/** 各尺寸下演示框的宽度；桌面端会填满所在元素。 */
export const SIZE_WIDTHS: Record<Size, string> = {
  desktop: '100%',
  tablet: '768px',
  phone: '375px',
}

/* 阅读者选择的框架：所有演示共用同一选项，并保存在 localStorage 中 */

const FRAMEWORK_KEY = 'tiptap-docs:demo-framework'
const FRAMEWORK_EVENT = 'tiptap-docs:demo-framework'

const readFramework = (): Framework => {
  try {
    const stored = window.localStorage.getItem(FRAMEWORK_KEY)
    return FRAMEWORKS.find((framework) => framework === stored) ?? 'React'
  } catch {
    return 'React'
  }
}

const subscribeFramework = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  window.addEventListener(FRAMEWORK_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(FRAMEWORK_EVENT, onChange)
  }
}

export const useStoredFramework = () => {
  const framework = useSyncExternalStore(subscribeFramework, readFramework, () => 'React' as const)

  const setFramework = useCallback((value: Framework) => {
    try {
      window.localStorage.setItem(FRAMEWORK_KEY, value)
    } catch {
      // 隐私浏览模式下，此选择仅在当前页面有效
    }
    window.dispatchEvent(new Event(FRAMEWORK_EVENT))
  }, [])

  return [framework, setFramework] as const
}

/*
 * 链接可以按指定状态打开演示：`#demo-extensions-comments:both,vue,phone,dark`。
 * 冒号前是元素的 id，冒号后是顺序任意的选项。
 */

export type HashState = Partial<{ view: View; framework: Framework; size: Size; theme: Theme }>

const subscribeHash = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export const useHash = () =>
  useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => '',
  )

const decodeHash = (hash: string): string | null => {
  try {
    return decodeURIComponent(hash.replace(/^#/, ''))
  } catch {
    // 无效的百分号编码（如 `#100%`）不是演示的哈希值
    return null
  }
}

export const parseHash = (hash: string, id: string): HashState | null => {
  const decoded = decodeHash(hash)
  if (decoded === null) {
    return null
  }
  const [target, words = ''] = decoded.split(':')

  if (target !== id) {
    return null
  }

  const state: HashState = {}

  for (const word of words.toLowerCase().split(',')) {
    if ((VIEWS as string[]).includes(word)) state.view = word as View
    if ((THEMES as string[]).includes(word)) state.theme = word as Theme
    if ((SIZES as string[]).includes(word)) state.size = word as Size
    const framework = FRAMEWORKS.find((name) => name.toLowerCase() === word)
    if (framework) state.framework = framework
  }

  return state
}

export const formatHash = (id: string, state: Required<HashState>) =>
  `#${id}:${[state.view, state.framework.toLowerCase(), state.size, state.theme].join(',')}`

/** 根据路径为演示元素生成稳定的 id：`/Extensions/Comments` → `demo-extensions-comments`。 */
export const demoId = (pathOrSrc: string) =>
  `demo-${
    pathOrSrc
      .split('?')[0]
      .replace(/^https?:\/\/[^/]+/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'external'
  }`

/* 上次演示报告的高度，让下次访问时从该高度开始，而不是逐渐撑高 */

const HEIGHT_KEY = 'tiptap-docs:demo-height:'

const noSubscribe = () => () => {}

export const readStoredHeight = (id: string): number | null => {
  try {
    const value = Number(window.localStorage.getItem(HEIGHT_KEY + id))
    return value > 0 ? value : null
  } catch {
    return null
  }
}

export const storeHeight = (id: string, height: number) => {
  try {
    window.localStorage.setItem(HEIGHT_KEY + id, String(height))
  } catch {
    // 隐私浏览模式下，下次访问时会再次逐渐撑高
  }
}

/** 每次渲染时读取一次；服务端返回 null，以确保客户端首次渲染与之匹配。 */
export const useStoredHeight = (id: string) =>
  useSyncExternalStore(
    noSubscribe,
    () => readStoredHeight(id),
    () => null,
  )
