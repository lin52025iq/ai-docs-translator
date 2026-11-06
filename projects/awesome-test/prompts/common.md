本项目包含英文技术文档、MDX、TypeScript、JSON 和 Shell 示例。

- 自然语言正文、链接显示文本及可安全翻译的注释中，框架名 Vue 统一写为 vue；代码标识符、模块导入路径和 URL 保持原样。
- button-group.ts 中可以翻译 JSDoc 的自然语言说明，但保留 @description、@deprecated 等标签和类型标识符。horizontal、vertical 等枚举值及默认值必须保持原样。
- compaction.mdx 中保留 Frontmatter、代码块、API 名称、事件名、字段名、占位符和链接地址。
- demo.json 是 Decisions API 响应示例，其键名、类别值、概率和其他业务数据保持原样，不将这些字符串当作界面文案。
- curl.sh 是 API 请求示例，保留命令、环境变量、Header、请求字段、模型名称和示例业务数据，不执行脚本。
- 对无法确定用于页面展示的字符串保留原文，不推测其他未提供文件的调用关系。
