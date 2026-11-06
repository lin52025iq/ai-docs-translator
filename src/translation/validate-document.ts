import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

/** 保存可归档的本地校验失败类型，不包含源文件正文或解析器内部堆栈。 */
export class DocumentValidationError extends Error {
    readonly code: string

    constructor(code: string, message: string) {
        super(message)
        this.name = 'DocumentValidationError'
        this.code = code
    }
}

/** 使用语法树提取不可翻译内容，不重新序列化原文，避免改变原始排版。 */
function documentSignature(content: string, path: string, stage: 'source' | 'translation') {
    const parser = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter, ['yaml', 'toml'])
    if (path.toLowerCase().endsWith('.mdx')) parser.use(remarkMdx)
    let tree
    try {
        tree = parser.parse(content)
    } catch {
        throw new DocumentValidationError(
            stage === 'source' ? 'SOURCE_PARSE_ERROR' : 'TRANSLATION_PARSE_ERROR',
            stage === 'source' ? '原文无法解析为有效的 Markdown/MDX' : '候选译文无法解析为有效的 Markdown/MDX'
        )
    }
    const protectedContent: string[] = []
    const structure: string[] = []
    visit(tree, (node) => {
        structure.push(node.type === 'heading' ? `heading:${node.depth}` : node.type)
        if (
            [
                'code',
                'inlineCode',
                'yaml',
                'toml',
                'html',
                'mdxjsEsm',
                'mdxFlowExpression',
                'mdxTextExpression'
            ].includes(node.type)
        ) {
            protectedContent.push(content.slice(node.position?.start.offset, node.position?.end.offset))
            return SKIP
        }
        if ('url' in node) protectedContent.push(`url:${node.url}`)
        if ('identifier' in node) protectedContent.push(`identifier:${node.identifier}`)
        if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
            // 去除位置、表达式 ESTree 等解析元数据，仅比较组件名称与原始属性。
            const attributes = node.attributes.map((attribute) =>
                content.slice(attribute.position?.start.offset, attribute.position?.end.offset)
            )
            protectedContent.push(JSON.stringify({ name: node.name, attributes }))
        }
    })
    return { protectedContent, structure }
}

/** 保护代码、地址、Frontmatter、组件和文档结构；失败的结果不能用于成功提交。 */
export function validateDocument(source: string, translated: string, path: string) {
    if (!translated.trim() && source.trim()) throw new DocumentValidationError('EMPTY_TRANSLATION', '翻译结果为空')
    const original = documentSignature(source, path, 'source')
    const result = documentSignature(translated, path, 'translation')
    if (JSON.stringify(original.protectedContent) !== JSON.stringify(result.protectedContent)) {
        throw new DocumentValidationError(
            'PROTECTED_CONTENT_CHANGED',
            '翻译改变了代码、链接、Frontmatter、HTML 或 MDX 受保护内容'
        )
    }
    if (JSON.stringify(original.structure) !== JSON.stringify(result.structure)) {
        throw new DocumentValidationError('DOCUMENT_STRUCTURE_CHANGED', '翻译改变了 Markdown/MDX 文档结构')
    }
}
