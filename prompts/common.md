以自然的简体中文翻译 ESLint 文档正文、标题和链接的自然语言标签。首次译文就是完整可用文档，保留段落、列表和所有示例。

对于 `rule_descriptions.json`，每个键是 ESLint 规则名。逐项翻译所有字符串值，保留键、顺序和反引号内的技术字面量。只输出完整的 JSON 文件。

- 逐字保留围栏代码块（包括语言、注释、空行）和缩进代码块。保留行内代码的字面值，技术标识符不能改译。保留 Markdown 链接目标、图片地址、锚点、文件名、命令和 API 标识符。
- 逐字保留 Nunjucks 表达式、标签、注释及参数，保留原有 HTML 标记、属性和 Markdown 容器标记。原文的 HTML 链接须保持为 HTML 链接，保留开始与结束标签和属性，不能改写为 Markdown 链接。新增 HTML 仅用于下面的标题锚点。
- 当小标题译成中文且原英文标题可生成简洁的字母、数字、连字符或下划线 slug 时，在该标题前添加独立的一行 `<a id="原英文slug"></a>`，前后用空行分隔。这里的 slug 是原英文标题对应的 GitHub 风格锚点。比如 `◆ new ESLint(options)` 的 slug 是 `-new-eslintoptions`，保留由 `◆` 后的空格产生的前导连字符。保留重复标题的编号。已有同名显式锚点时不重复添加。
- YAML frontmatter 仅翻译普通页面的 `title` 和 `eleventyNavigation.title`。保留导航的 `key` 和 `parent`，保留所有其他键和值。`docs/src/rules/` 下的页面须逐字保留顶层 `title`，因为规则详情用该值查找规则元数据。
