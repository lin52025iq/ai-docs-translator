---
title: 语言
eleventyNavigation:
    key: languages
    parent: create plugins
    title: 语言
    order: 4
---

从 ESLint v9.7.0 开始，你可以通过插件为 ESLint 扩展其他语言。ESLint 最初只是一个专用于 JavaScript 的代码检查工具，但 ESLint 核心具有通用性，可用于检查任何编程语言。每种语言都由一个对象定义，其中包含检查文件所需的所有解析、求值和遍历功能。随后，这些语言会通过插件分发，以供用户在配置中使用。

<a id="language-requirements"></a>

## 语言要求

要创建一种语言，你需要具备以下内容：

1. **一个解析器。** 解析器负责将纯文本转换为数据结构。ESLint 不要求数据结构采用特定格式，因此你可以使用任何现有解析器，也可以自行编写。
1. **一个 `SourceCode` 对象。** ESLint 通过 `SourceCode` 对象处理 AST。每个 `SourceCode` 对象都必须实现一些方法，你也可以添加希望向规则公开的其他方法或属性。
1. **一个 `Language` 对象。** `Language` 对象包含有关语言本身的信息，以及用于解析和创建 `SourceCode` 对象的方法。

<a id="parser-requirements-for-languages"></a>

### 各语言的解析器要求

首先，确保你有一个可以从 JavaScript 调用的解析器。解析器必须返回一个表示所解析代码的数据结构。大多数解析器会返回[抽象语法树](https://en.wikipedia.org/wiki/Abstract_syntax_tree)（AST）来表示代码，但也可以返回[具体语法树](https://en.wikipedia.org/wiki/Parse_tree)（CST）。对于 ESLint 来说，返回 AST 还是 CST 并不重要；重要的是存在可供遍历的数据结构。

AST 或 CST 无须遵循特定结构，但如果树中的每个节点都包含以下信息，就更容易与 ESLint 集成：

1. **类型** - 每个节点都必须有一个表示节点类型的属性。例如，在 JavaScript 中，每个节点的 `type` 属性都包含此信息。ESLint 规则根据节点类型定义访问器方法，因此每个节点都必须能通过字符串加以识别。只要存在该属性，其名称并不重要（详见下文）；大多数解析器通常将其命名为 `type` 或 `kind`。
1. **位置** - 每个节点都必须有一个表示该节点在原始源代码中位置的属性。该位置必须包含：
    - 节点的起始行
    - 节点的起始列
    - 节点的结束行
    - 节点的结束列

    与节点类型一样，属性名称并不重要。两个常见的属性名是 `loc`（如 [ESTree](https://github.com/estree/estree/blob/3851d4a6eae5e5473371893959b88b62007469e8/es5.md#node-objects)）和 `position`（如 [Unist](https://github.com/syntax-tree/unist?tab=readme-ov-file#node)）。ESLint 使用这些信息报告错误和规则违规。

1. **范围** - 每个节点都必须有一个表示该节点在源代码中所占范围的属性。范围表示首个字符所在的索引以及最后一个字符之后的索引，因此调用 `code.slice(start, end)` 会返回该节点所表示的文本。同样，这里不要求特定的属性名，而且此信息也可以与位置信息合并。ESTree 使用 `range` 属性，而 Unist 将此信息与位置信息一并包含在 `position` 中。ESLint 使用这些信息应用自动修复。

<a id="the-sourcecode-object"></a>

### `SourceCode` 对象

ESLint 使用 `SourceCode` 对象保存源代码信息。该对象是 ESLint 内部以及针对代码编写的规则（通过 `context.sourceCode`）所使用的 API。`SourceCode` 对象必须实现 [`@eslint/core`](https://npmjs.com/package/@eslint/core) 包中定义的 `TextSourceCode` 接口。

基本的 `SourceCode` 对象必须实现以下内容：

- `ast` - 包含源代码 AST 或 CST 的属性。
- `text` - 源代码文本。
- `getLoc(nodeOrToken)` - 返回给定节点、令牌或注释位置的方法。其返回值必须符合 ESTree 使用的 `loc` 结构。
- `getRange(nodeOrToken)` - 返回给定节点、令牌或注释范围的方法。必须返回一个数组，其中第一项是起始索引，第二项是结束索引。
- `traverse()` - 返回可迭代对象以遍历 AST 或 CST 的方法。迭代器必须返回实现了 `@eslint/core` 中 `VisitTraversalStep` 或 `CallTraversalStep` 的对象。

以下可选成员允许你自定义 ESLint 与该对象的交互方式：

- `visitorKeys` - 仅适用于此 `SourceCode` 对象的访问器键。通常不需要，因为大多数情况下会使用 `Language#visitorKeys`。
- `applyLanguageOptions(languageOptions)` - 如果你有需要在解析后应用的特定语言选项，可以在此方法中处理。
- `getDisableDirectives()` - 返回代码中的所有禁用指令。ESLint 使用此方法应用禁用指令并跟踪未使用的指令。
- `getInlineConfigNodes()` - 返回所有内联配置节点。启用 `noInlineConfig` 时，ESLint 会使用此方法报告错误。
- `applyInlineConfig()` - 向 ESLint 返回内联配置元素。ESLint 使用这些元素更改正在进行代码检查的文件的配置。
- `finalize()` - 此方法会在代码检查开始前调用，是你修改 `SourceCode` 的最后机会。如果你定义了 `applyLanguageOptions()` 或 `applyInlineConfig()`，可能还需要在 `SourceCode` 对象准备就绪前应用其他更改。

此外，以下成员常见于 `SourceCode` 对象，建议实现：

- `lines` - 将源代码的各行作为字符串数组返回。
- `getParent(node)` - 返回给定节点的父节点；如果该节点是根节点，则返回 `undefined`。
- `getAncestors(node)` - 返回给定节点的祖先数组，第一项是树的根节点，后续各项是从根节点到 `node` 的后代节点。
- `getText(node, beforeCount, afterCount)` - 返回给定节点、令牌或注释所表示的字符串；也可以指定其范围前后要包含的字符数。如果省略 `node` 或将其设为 `undefined`，则返回整个源文本。

请参阅 [`JSONSourceCode`](https://github.com/eslint/json/blob/main/src/languages/json-source-code.js)，了解基本 `SourceCode` 类的示例。

::: tip
[`@eslint/plugin-kit`](https://npmjs.com/package/@eslint/plugin-kit) 包含多个类，旨在简化 `SourceCode` 对象的创建。尤其是 `TextSourceCodeBase` 类，它实现了 `TextSourceCode` 接口，并提供了 `SourceCode` 对象通常具备的一些基本功能。
:::

<a id="the-language-object"></a>

### `Language` 对象

`Language` 对象包含有关编程语言的所有信息，以及用于处理以该语言编写的代码的方法。ESLint 使用此对象来确定如何处理特定文件。`Language` 对象必须实现 [`@eslint/core`](https://npmjs.com/package/@eslint/core) 包中定义的 `Language` 接口。

基本的 `Language` 对象必须实现以下内容：

- `fileType` - 应为 `"text"`（未来还将支持 `"binary"`）
- `lineStart` - 取值为 0 或 1，表示 AST 如何表示文件中的第一行。ESLint 使用此值正确显示错误位置。
- `columnStart` - 取值为 0 或 1，表示 AST 如何表示每一行中的第一列。ESLint 使用此值正确显示错误位置。
- `nodeTypeKey` - 表示节点类型的属性名称（通常为 `"type"` 或 `"kind"`）。
- `validateLanguageOptions(languageOptions)` - 验证该语言的语言选项。如果预期的语言选项类型或值不正确，此方法应抛出验证错误。意外的语言选项应静默忽略，不应抛出错误。即使该语言未指定任何选项，此方法也必须实现。
- `parse(file, context)` - 将给定文件解析为 AST 或 CST，也可以包含供规则使用的其他值。由 ESLint 内部调用。
- `createSourceCode(file, parseResult, context)` - 创建 `SourceCode` 对象。由 ESLint 在调用 `parse()` 后内部调用，第二个参数是 `parse()` 的确切返回值。

以下可选成员允许你自定义 ESLint 与该对象的交互方式：

- `visitorKeys` - 专用于 AST 或 CST 的访问器键。ESLint 使用此项优化 AST 或 CST 的遍历。虽然不是必需项，但强烈建议提供，特别是 AST 或 CST 格式与 ESTree 格式差异较大时。
- `defaultLanguageOptions` - 使用该语言时的默认 `languageOptions`。计算正在进行代码检查的文件的配置时，用户指定的 `languageOptions` 会与此对象合并。
- `matchesSelectorClass(className, node, ancestry)` - 允许你指定能够匹配多个节点的选择器类，例如 `:expression`。每当 [esquery](https://github.com/estools/esquery) 选择器包含 `:` 后接标识符时，都会调用此方法。
- `normalizeLanguageOptions(languageOptions)` - 接收经过验证的语言选项对象，并对其值进行规范化。这有助于在语言选项属性发生变化时保持向后兼容，也可用于通过 `toJSON()` 方法添加自定义序列化。

请参阅 [`JSONLanguage`](https://github.com/eslint/json/blob/main/src/languages/json-language.js)，了解基本 `Language` 类的示例。

<a id="publish-a-language-in-a-plugin"></a>

## 在插件中发布语言

语言的发布方式与处理器和规则类似。将插件中的 `languages` 键定义为一个对象，其属性名是语言名称，属性值是语言对象。示例如下：

```js
import { myLanguage } from "../languages/my.js";

const plugin = {
	// preferred location of name and version
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3",
	},
	languages: {
		my: myLanguage,
	},
	rules: {
		// add rules here
	},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

要在配置文件中使用插件提供的语言，请导入该插件并将其包含在 `plugins` 键中，同时指定一个命名空间。然后像下面这样，在 `language` 配置中使用该命名空间引用语言：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
	{
		files: ["**/*.my"],
		plugins: {
			example,
		},
		language: "example/my",
	},
]);
```

有关更多详情，请参阅插件配置文档中的[指定语言](../use/configure/plugins#specify-a-language)。
