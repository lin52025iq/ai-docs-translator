import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkStringify from 'remark-stringify'
import { visit } from 'unist-util-visit'
import { componentConverters } from './componentConverter'
import { FULL_DOMAIN } from '@/utils/constants'

const ASSET_PREFIXES = ['/assets', '/api', '/_next', '/docsassets']

/**
 * 重写内部链接，使提供的 Markdown 内容自包含：
 * 文档路由转换为绝对 `.md` URL（供代理获取），资源转换为
 * 绝对 URL，锚点和外部链接保持不变。
 */
function rewriteUrl(url: string): string {
  if (!url || url.startsWith('#')) return url
  if (!url.startsWith('/')) return url // 外部链接或相对于页面的链接——保持原样

  const isAsset = ASSET_PREFIXES.some((p) => url === p || url.startsWith(`${p}/`))
  if (isAsset) return `${FULL_DOMAIN}${url}`

  const [pathPart, hash] = url.split('#')
  const withMd = /\.[a-z0-9]+$/i.test(pathPart) ? pathPart : `${pathPart}.md`

  return `${FULL_DOMAIN}${withMd}${hash ? `#${hash}` : ''}`
}

// mdast 短语（行内）节点类型。其他内容均为流式（块级）内容。
const PHRASING_TYPES = new Set([
  'text',
  'emphasis',
  'strong',
  'delete',
  'link',
  'linkReference',
  'image',
  'imageReference',
  'inlineCode',
  'break',
  'footnote',
  'footnoteReference',
])

const isPhrasing = (node: any): boolean => PHRASING_TYPES.has(node.type)
const isWhitespaceText = (node: any): boolean =>
  node.type === 'text' && typeof node.value === 'string' && node.value.trim() === ''

/**
 * 将节点列表调整为适用于流式（块级）上下文的形式：把每段
 * 短语节点包裹在段落中，并移除仅包含空白字符的文本节点。如果不这样处理，
 * 展开块级组件（例如包含多个 `<Link>` 卡片的 `<div>`）后，流式上下文中会留下孤立的
 * 行内节点，而 `mdast-util-to-markdown` 序列化时不会添加分隔符，
 * 导致整个章节挤在同一行。
 */
function normalizeFlowChildren(nodes: any[]): any[] {
  const out: any[] = []
  let run: any[] = []

  const flush = () => {
    if (run.some((n) => !isWhitespaceText(n))) out.push({ type: 'paragraph', children: run })
    run = []
  }

  for (const node of nodes) {
    if (isPhrasing(node)) {
      run.push(node)
    } else {
      flush()
      out.push(node)
    }
  }
  flush()
  return out
}

/**
 * 统一插件，实现过滤流程：移除导入语句和表达式，
 * 通过注册表转换 JSX 组件（未知组件则展开），并重写内部链接。
 */
function remarkFilter() {
  // 此处采用宽松类型：mdast/mdx 节点形状是动态的。
  return (tree: any) => {
    visit(tree, (node: any, index, parent: any) => {
      if (node.type === 'link' && typeof node.url === 'string') {
        node.url = rewriteUrl(node.url)
        return
      }

      if (!parent || typeof index !== 'number') return

      // 移除导入/导出语句，以及类似 {/* comment */} 的独立表达式。
      if (
        node.type === 'mdxjsEsm' ||
        node.type === 'mdxFlowExpression' ||
        node.type === 'mdxTextExpression'
      ) {
        parent.children.splice(index, 1)
        return index
      }

      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        const convert = node.name ? componentConverters[node.name] : undefined
        const result = convert ? convert(node) : undefined

        let replacement: any[]
        if (result === null) replacement = []
        else if (result === undefined)
          replacement = node.children ?? [] // 默认：展开
        else replacement = Array.isArray(result) ? result : [result]

        // 流式元素位于块级上下文中，因此替换内容也必须是块级内容：
        // 将其中的行内节点包裹在段落中。
        if (node.type === 'mdxJsxFlowElement') {
          replacement = normalizeFlowChildren(replacement)
        }

        parent.children.splice(index, 1, ...replacement)
        // 在相同索引处重新访问，以便同时转换嵌套组件。
        return index
      }
    })
  }
}

/** 将 MDX 正文（已移除 frontmatter）编译为整洁的 Markdown。 */
export async function transformMdxToMarkdown(body: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkFilter)
    .use(remarkStringify, {
      bullet: '-',
      fences: true,
      listItemIndent: 'one',
      rule: '-',
    })
    .process(body)

  return String(file).trim()
}
