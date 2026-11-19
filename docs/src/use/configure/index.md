---
title: 配置 ESLint
eleventyNavigation:
    key: configure
    parent: use eslint
    title: 配置 ESLint
    order: 3
---

ESLint 的设计灵活且可配置，能够满足你的使用场景。你可以关闭所有规则，仅运行基本语法验证；也可以将内置规则与自定义规则组合使用，以满足项目需求。配置 ESLint 主要有两种方式：

1. **配置注释** - 使用 JavaScript 注释，直接在文件中嵌入配置信息。
2. **配置文件** - 使用 JavaScript 文件为整个目录及其所有子目录指定配置信息。配置文件可以是 [`eslint.config.js`](./configuration-files) 文件，ESLint 会自动查找并读取该文件；你也可以在[命令行](../command-line-interface)中指定配置文件。

以下是你可以在 ESLint 中配置的一些选项：

- [**全局变量**](./language-options#specify-globals) - 脚本在执行期间访问的其他全局变量。
- [**规则**](rules) - 启用哪些规则，以及它们的错误级别。
- [**插件**](plugins) - 定义 ESLint 可使用的其他规则、语言、配置等内容的第三方插件。

所有这些选项都能让你精细控制 ESLint 如何处理代码。

<a id="table-of-contents"></a>

## 目录

[**配置文件**](configuration-files)

- [配置文件格式](./configuration-files#configuration-file)
- [配置对象](./configuration-files#configuration-objects)
- [配置共享设置](./configuration-files#configure-shared-settings)
- [配置文件解析](./configuration-files#configuration-file-resolution)

[**配置语言选项**](language-options)

- [指定 JavaScript 选项](./language-options#specify-javascript-options)
- [指定全局变量](./language-options#specify-globals)

[**配置规则**](rules)

- [配置规则](./rules)
- [禁用规则](./rules#disable-rules)

[**配置插件**](plugins)

- [配置插件](./plugins#configure-plugins)
- [指定处理器](./plugins#specify-a-processor)

[**配置解析器**](./parser)

- [配置自定义解析器](./parser#configure-a-custom-parser)

[**忽略文件**](ignore)

- [忽略文件](./ignore#ignore-files)
- [忽略目录](./ignore#ignore-directories)
- [取消忽略文件和目录](./ignore#unignore-files-and-directories)
- [被忽略文件的警告](./ignore#ignored-file-warnings)
