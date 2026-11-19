---
title: 自定义解析器
eleventyNavigation:
    key: custom parsers
    parent: extend eslint
    title: 自定义解析器
    order: 5
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}

ESLint 自定义解析器可扩展 ESLint，以支持对代码中的非标准 JavaScript 语言特性或自定义语法进行代码检查。解析器负责接收代码并将其转换为抽象语法树（AST），然后 ESLint 可以分析并检查该语法树。

<a id="create-a-custom-parser"></a>

## 创建自定义解析器

<a id="methods-in-custom-parsers"></a>

### 自定义解析器中的方法

自定义解析器是一个 JavaScript 对象，其中包含 `parse()` 或 `parseForESLint()` 方法。`parse` 方法只返回 AST，而 `parseForESLint()` 还会返回其他值，以便解析器进一步自定义 ESLint 的行为。

这两个方法都应是实例（自有）属性，并将源代码作为第一个参数；第二个参数是可选的配置对象，在配置文件中以 [`parserOptions`](../use/configure/language-options#specify-parser-options) 的形式提供。

```javascript
// customParser.js

const espree = require("espree");

// Logs the duration it takes to parse each file.
function parse(code, options) {
	const label = `Parsing file "${options.filePath}"`;
	console.time(label);
	const ast = espree.parse(code, options);
	console.timeEnd(label);
	return ast; // Only the AST is returned.
}

module.exports = { parse };
```

<a id="parse-return-object"></a>

### `parse` 的返回对象

`parse` 方法应只返回 [AST](#ast-specification) 对象。

<a id="parseforeslint-return-object"></a>

### `parseForESLint` 的返回对象

`parseForESLint` 方法应返回一个对象，其中包含必需属性 `ast`，以及可选属性 `services`、`scopeManager` 和 `visitorKeys`。

- `ast` 应包含 [AST](#ast-specification) 对象。
- `services` 可以包含任何依赖于解析器的服务（例如节点类型检查器）。规则可通过 `context.sourceCode.parserServices` 访问 `services` 属性的值。默认值为空对象。
- `scopeManager` 可以是 [ScopeManager](./scope-manager-interface) 对象。自定义解析器可以针对实验性语法或扩展语法使用自定义的作用域分析。默认值是由 [eslint-scope](https://github.com/eslint/js/tree/main/packages/eslint-scope) 创建的 `ScopeManager` 对象。
    - ESLint v4.14.0 开始支持 `scopeManager`。支持 `scopeManager` 的 ESLint 版本会在 `parserOptions` 中提供 `eslintScopeManager: true` 属性，可用于特性检测。
    - 从 ESLint v10.0.0 开始，`ScopeManager` 必须自动解析代码中声明的全局变量引用，并提供实例方法 `addGlobals(names: string[])`，该方法会在全局作用域中创建指定名称的变量，并解析对这些变量的引用。
- `visitorKeys` 可以是一个用于自定义 AST 遍历的对象。对象的键是 AST 节点的类型，每个值都是一个属性名数组，表示应遍历哪些属性。默认值为 [KEYS of `eslint-visitor-keys`](https://github.com/eslint/js/tree/main/packages/eslint-visitor-keys#evkkeys)。
    - ESLint v4.14.0 开始支持 `visitorKeys`。支持 `visitorKeys` 的 ESLint 版本会在 `parserOptions` 中提供 `eslintVisitorKeys: true` 属性，可用于特性检测。

<a id="meta-data-in-custom-parsers"></a>

### 自定义解析器中的元数据

为了便于调试并更有效地缓存自定义解析器，建议在自定义解析器根目录的 `meta` 对象中提供名称和版本，如下所示：

```js
// preferred location of name and version
module.exports = {
	meta: {
		name: "eslint-parser-custom",
		version: "1.2.3",
	},
};
```

`meta.name` 属性应与自定义解析器的 npm 包名称一致，`meta.version` 属性应与自定义解析器的 npm 包版本一致。最简单的做法是从 `package.json` 中读取这些信息。

<a id="ast-specification"></a>

## AST 规范

自定义解析器应创建基于 [ESTree](https://github.com/estree/estree) 的 AST。AST 还需要包含一些关于源代码细节的额外属性。

<a id="all-nodes"></a>

### 所有节点

所有节点都必须具有 `range` 属性。

- `range`（`number[]`）是一个包含两个数字的数组。两个数字都是从 0 开始的索引，表示源代码字符数组中的位置。第一个数字是节点的起始位置，第二个数字是节点的结束位置。`code.slice(node.range[0], node.range[1])` 必须是该节点对应的文本。此范围不包括节点周围的空格或括号。
- `loc`（`SourceLocation`）不能为 `null`。[ESTree 将 `loc` 属性定义为可空](https://github.com/estree/estree/blob/25834f7247d44d3156030f8e8a2d07644d771fdb/es5.md#node-objects)，但 ESLint 要求该属性存在。`SourceLocation#source` 属性可以是 `undefined`。ESLint 不会使用 `SourceLocation#source` 属性。

所有节点的 `parent` 属性都必须可重写。在规则访问 AST 之前，ESLint 会在遍历过程中将每个节点的 `parent` 属性设为其父节点。

<a id="the-program-node"></a>

### `Program` 节点

`Program` 节点必须具有 `tokens` 和 `comments` 属性。两个属性都是由以下 `Token` 接口构成的数组。

```ts
interface Token {
	type: string;
	loc: SourceLocation;
	// See the "All Nodes" section for details of the `range` property.
	range: [number, number];
	value: string;
}
```

- `tokens`（`Token[]`）是会影响程序行为的令牌数组。令牌之间可以有任意空格，因此规则会检查 `Token#range` 来检测令牌之间的空格。数组必须按 `Token#range[0]` 排序。
- `comments`（`Token[]`）是注释令牌数组。数组必须按 `Token#range[0]` 排序。

所有令牌和注释的范围索引都不能与其他令牌或注释的范围重叠。

<a id="the-literal-node"></a>

### `Literal` 节点

`Literal` 节点必须具有 `raw` 属性。

- `raw`（`string`）是该字面量对应的源代码，与 `code.slice(node.range[0], node.range[1])` 相同。

<a id="packaging-a-custom-parser"></a>

## 打包自定义解析器

要将自定义解析器发布到 npm，请执行以下操作：

1. 按照上文[创建自定义解析器](#create-a-custom-parser)一节创建自定义解析器。
1. 为自定义解析器[创建 npm 包](https://docs.npmjs.com/creating-node-js-modules)。
1. 在 `package.json` 文件中，将 [`main`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#main) 字段设置为导出自定义解析器的文件。
1. [发布 npm 包](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)。

有关发布 npm 包的更多信息，请参阅 [npm 文档](https://docs.npmjs.com/)。

发布 npm 包后，可以将该包添加到项目中使用。例如：

{{ npm_tabs({
    command: "install",
    packages: ["eslint-parser-myparser"],
    args: ["--save-dev"]
}) }}

然后，在 ESLint 配置文件中通过 `languageOptions.parser` 属性添加自定义解析器。例如：

```js
// eslint.config.js

const { defineConfig } = require("eslint/config");
const myparser = require("eslint-parser-myparser");

module.exports = defineConfig([
	{
		languageOptions: {
			parser: myparser,
		},
		// ... rest of configuration
	},
]);
```

使用旧版配置时，将 `parser` 属性指定为字符串：

```js
// .eslintrc.js

module.exports = {
	parser: "eslint-parser-myparser",
	// ... rest of configuration
};
```

要详细了解如何在项目中使用 ESLint 解析器，请参阅[配置解析器](../use/configure/parser)。

<a id="example"></a>

## 示例

复杂的自定义解析器示例，请参阅 [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser) 源代码。

下面是一个简单的自定义解析器，它向规则提供 `context.sourceCode.parserServices.foo()` 方法。

```javascript
// awesome-custom-parser.js
var espree = require("espree");
function parseForESLint(code, options) {
	return {
		ast: espree.parse(code, options),
		services: {
			foo: function () {
				console.log("foo");
			},
		},
		scopeManager: null,
		visitorKeys: null,
	};
}

module.exports = { parseForESLint };
```

在 ESLint 配置文件中加入自定义解析器：

```js
// eslint.config.js
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
	{
		languageOptions: {
			parser: require("./path/to/awesome-custom-parser"),
		},
	},
]);
```

如果使用旧版配置，则可以这样设置：

```js
// .eslintrc.json
{
    "parser": "./path/to/awesome-custom-parser.js"
}
```
