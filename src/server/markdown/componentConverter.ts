import { DEMO_URL, PRO_DEMO_URL } from '@/utils/constants'

/**
 * Markdown 组件转换器：将 MDX JSX 组件转换为普通 Markdown 节点。
 *
 * 每个转换器接收一个 MDX JSX 节点（mdast `mdxJsxFlowElement` /
 * `mdxJsxTextElement`），并返回用于替换它的 Markdown 节点：
 *   - 节点数组 / 单个节点 → 替换
 *   - `null`               → 完全移除
 *   - `undefined`          → 回退到默认行为
 *
 * 要支持新的嵌入式组件，请在此处添加条目。没有转换器的组件会被“解包”：移除外层包装，保留其子节点
 * 并重新处理（因此嵌套组件仍会被转换）。
 */

// 使用宽松的类型定义，让转换器更易读；mdast/mdx 节点结构足够稳定。
type MdxNode = {
  type: string
  name?: string | null
  attributes?: Array<{ type: string; name?: string; value?: unknown }>
  children?: MdxNode[]
  value?: string
}

export type ComponentConverter = (node: MdxNode) => MdxNode | MdxNode[] | null | undefined

/** 读取字符串值的 JSX 属性（忽略表达式属性）。 */
function getAttr(node: MdxNode, name: string): string | undefined {
  const attr = node.attributes?.find((a) => a.type === 'mdxJsxAttribute' && a.name === name)
  if (!attr) return undefined
  if (typeof attr.value === 'string') return attr.value
  // 表达式值，例如 path={`/x`} — 如果存在，则获取其原始内部源码。
  if (attr.value && typeof attr.value === 'object' && 'value' in attr.value) {
    return String((attr.value as { value: unknown }).value)
  }
  return undefined
}

/** 检查是否存在字符串值的布尔属性（例如 `isPro`）。 */
function hasFlag(node: MdxNode, name: string): boolean {
  return !!node.attributes?.some((a) => a.type === 'mdxJsxAttribute' && a.name === name)
}

const text = (value: string): MdxNode => ({ type: 'text', value })
const paragraph = (children: MdxNode[]): MdxNode => ({ type: 'paragraph', children })
const strong = (value: string): MdxNode => ({ type: 'strong', children: [text(value)] })
const link = (url: string, label: string): MdxNode => ({
  type: 'link',
  // mdast 链接节点使用 `url`；通过 unknown 转型以符合宽松类型定义。
  ...({ url } as object),
  children: [text(label)],
})

/** 根据演示组件的属性或路径生成易读的标签。 */
function demoLabel(node: MdxNode, url: string): string {
  const explicit = getAttr(node, 'externalTitle') || getAttr(node, 'caption')
  if (explicit) return explicit
  const last = url.split('?')[0].split('/').filter(Boolean).pop()
  return last ? last.replace(/[-_]/g, ' ') : '打开演示'
}

export const componentConverters: Record<string, ComponentConverter> = {
  // <CodeDemo path="/Examples/Minimal" /> → 转换为指向在线演示的引用块。
  CodeDemo: (node) => {
    const src = getAttr(node, 'src')
    const path = getAttr(node, 'path') ?? ''
    const url = src ?? (hasFlag(node, 'isPro') ? PRO_DEMO_URL : DEMO_URL) + path
    return {
      type: 'blockquote',
      children: [
        paragraph([strong('交互式演示：'), text(' '), link(url, demoLabel(node, url))]),
      ],
    }
  },

  // <DemoViewer path="…" /> 以不同的框架呈现同一个演示。
  DemoViewer: (node) => componentConverters.CodeDemo(node),

  // <Callout>…</Callout> → 转换为引用块；存在类型或标题时，将其放在开头。
  Callout: (node) => {
    const title = getAttr(node, 'title')
    const type = getAttr(node, 'type') ?? getAttr(node, 'variant')
    const heading = title ?? (type ? type[0].toUpperCase() + type.slice(1) : undefined)
    const children = [...(node.children ?? [])]
    if (heading) children.unshift(paragraph([strong(`${heading}:`)]))
    return { type: 'blockquote', children }
  },

  // <Requirements><RequirementItem label="…">…</RequirementItem></Requirements>
  // → 转换为项目符号列表，每个列表项前面都加上其标签。
  Requirements: (node) => {
    const items = (node.children ?? []).filter(
      (c) => c.type === 'mdxJsxFlowElement' && c.name === 'RequirementItem',
    )
    if (items.length === 0) return undefined // 结构与预期不符时解包
    return {
      type: 'list',
      ...({ ordered: false, spread: false } as object),
      children: items.map((item) => {
        const label = getAttr(item, 'label')
        const body = [...(item.children ?? [])]
        if (label) body.unshift(paragraph([strong(label)]))
        return { type: 'listItem', ...({ spread: false } as object), children: body }
      }),
    }
  },

  // <Link href="…">text</Link> → 转换为 Markdown 链接。
  Link: (node) => {
    const url = getAttr(node, 'href') ?? getAttr(node, 'to')
    if (!url) return undefined
    return { type: 'link', ...({ url } as object), children: node.children ?? [] }
  },
}
