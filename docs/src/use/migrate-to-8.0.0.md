---
title: 迁移到 v8.0.0
---

ESLint v8.0.0 是 ESLint 的一个主要版本。此版本包含一些不兼容变更。本指南将带你了解这些变更。

下面的列表大致按照预计受每项变更影响的用户数量排序，排在前面的变更预计会影响更多用户。

<a id="table-of-contents"></a>
## 目录

<a id="breaking-changes-for-users"></a>
### 面向用户的不兼容变更

- [不再支持 Node.js 10、13 和 15](#drop-old-node)
- [移除了 `codeframe` 和 `table` 格式化器](#removed-formatters)
- [`comma-dangle` 规则的 schema 更严格](#comma-dangle)
- [现在可以自动修复未使用的禁用指令](#directives)
- [`eslint:recommended` 已更新](#eslint-recommended)

<a id="breaking-changes-for-plugin-developers"></a>
### 面向插件开发者的不兼容变更

- [不再支持 Node.js 10、13 和 15](#drop-old-node)
- [规则必须设置 `meta.hasSuggestions` 才能提供建议](#suggestions)
- [规则必须设置 `meta.fixable` 才能提供修复](#fixes)
- [`SourceCode#getComments()` 在 `RuleTester` 中会失败](#get-comments)
- [简写属性 AST 格式变更](#ast-format)

<a id="breaking-changes-for-integration-developers"></a>
### 面向集成开发者的不兼容变更

- [不再支持 Node.js 10、13 和 15](#drop-old-node)
- [已移除 `CLIEngine` 类](#remove-cliengine)
- [已移除 `linter` 对象](#remove-linter)
- [已移除 `/lib` 入口点](#remove-lib)

---

## <a name="drop-old-node"></a> 不再支持 Node.js 10、13 和 15

Node.js 10、13 和 15 均已于 2020 年或 2021 年初结束生命周期。自 ESLint v8.0.0 起，ESLint 正式停止支持这些 Node.js 版本。ESLint 现在支持以下 Node.js 版本：

- Node.js 12.22 及更高版本
- Node.js 14 及更高版本
- Node.js 16 及更高版本

**解决方法：** 使用 ESLint v8.0.0 时，请确保升级到至少 Node.js `12.22.0`。如果通过编辑器集成使用 ESLint，务必确认编辑器支持的 Node.js 版本。如果无法升级，我们建议继续使用 ESLint 7，直到你能够升级 Node.js。

**相关问题：** [#14023](https://github.com/eslint/eslint/issues/14023)

## <a name="removed-formatters"></a> 已移除 `codeframe` 和 `table` 格式化器

ESLint v8.0.0 已从核心中移除 `codeframe` 和 `table` 格式化器。这些格式化器依赖的其他包在 ESLint 中没有别的用途。移除它们可以减小 ESLint 的体积，从而加快安装速度。

**解决方法：** 如果你正在使用 `codeframe` 或 `table` 格式化器，则需要分别安装独立的 [`eslint-formatter-codeframe`](https://github.com/eslint-community/eslint-formatter-codeframe) 或 [`eslint-formatter-table`](https://github.com/eslint-community/eslint-formatter-table) 包，才能在 ESLint v8.0.0 中使用它们。

**相关问题：** [#14277](https://github.com/eslint/eslint/issues/14277), [#14316](https://github.com/eslint/eslint/pull/14316)

## <a name="comma-dangle"></a> `comma-dangle` 规则的 schema 更严格

在 ESLint v7.0.0 中，像下面这样配置 `comma-dangle` 规则不会报错：

```json
{
	"rules": {
		"comma-dangle": ["error", "never", { "arrays": "always" }]
	}
}
```

使用此配置时，该规则会忽略数组中的第三个元素，因为它只读取第二个元素。在 ESLint v8.0.0 中，此配置会导致 ESLint 抛出错误。

**解决方法：** 修改规则配置，使数组中只有两个元素，并且第二个元素为字符串或对象，例如：

```json
{
	"comma-dangle": ["error", "never"]
}
```

或

```json
{
	"comma-dangle": [
		"error",
		{
			"arrays": "never",
			"objects": "never",
			"imports": "never",
			"exports": "never",
			"functions": "never"
		}
	]
}
```

**相关问题：** [#13739](https://github.com/eslint/eslint/issues/13739)

## <a name="directives"></a> 现在可以自动修复未使用的禁用指令

在 ESLint v7.0.0 中，在命令行中同时使用 `--report-unused-disable-directives` 和 `--fix`，只会修复规则问题，而不会移除未使用的禁用指令。在 ESLint v8.0.0 中，同时使用这两个命令行选项会移除未使用的禁用指令。

**解决方法：** 如果你在命令行中同时使用 `--report-unused-disable-directives` 和 `--fix`，但不希望移除未使用的禁用指令，请添加命令行选项 `--fix-type problem,suggestion,layout`。

**相关问题：** [#11815](https://github.com/eslint/eslint/issues/11815)

## <a name="eslint-recommended"></a> `eslint:recommended` 已更新

`eslint:recommended` 预设中启用了四条新规则。

- [`no-loss-of-precision`](../rules/no-loss-of-precision)
- [`no-nonoctal-decimal-escape`](../rules/no-nonoctal-decimal-escape)
- [`no-unsafe-optional-chaining`](../rules/no-unsafe-optional-chaining)
- [`no-useless-backreference`](../rules/no-useless-backreference)

**解决方法：** 修复错误或禁用这些规则。

**相关问题：** [#14673](https://github.com/eslint/eslint/issues/14673)

## <a name="suggestions"></a> 规则必须设置 `meta.hasSuggestions` 才能提供建议

在 ESLint v7.0.0 中，提供[建议](../extend/custom-rules#providing-suggestions)的规则无需告知 ESLint。在 v8.0.0 中，提供建议的规则必须将 `meta.hasSuggestions` 设置为 `true`。这样可以告知 ESLint，该规则会提供建议。如果没有此属性，任何提供建议的尝试都会导致错误。

**解决方法：** 如果你的规则会提供建议，请在对象中添加 `meta.hasSuggestions`，例如：

```js
module.exports = {
	meta: {
		hasSuggestions: true,
	},
	create(context) {
		// your rule
	},
};
```

[eslint-plugin/require-meta-has-suggestions](https://github.com/eslint-community/eslint-plugin-eslint-plugin/blob/main/docs/rules/require-meta-has-suggestions.md) 规则可以自动修复并确保你的规则正确指定了 `meta.hasSuggestions`。

**相关问题：** [#14312](https://github.com/eslint/eslint/issues/14312)

## <a name="fixes"></a> 规则必须设置 `meta.fixable` 才能提供修复

在 ESLint v7.0.0 中，以函数（而非对象）形式编写的规则可以提供修复。在 ESLint v8.0.0 中，只有以对象形式编写的规则才能提供修复，并且必须将 `meta.fixable` 属性设置为 `"code"` 或 `"whitespace"`。

**解决方法：** 如果你的规则会提供修复，且以函数形式编写，例如：

```js
module.exports = function (context) {
	// your rule
};
```

请将规则改写为以下形式：

```js
module.exports = {
	meta: {
		fixable: "code", // or "whitespace"
	},
	create(context) {
		// your rule
	},
};
```

[eslint-plugin/require-meta-fixable](https://github.com/eslint-community/eslint-plugin-eslint-plugin/blob/main/docs/rules/require-meta-fixable.md) 规则可以自动修复并确保你的规则正确指定了 `meta.fixable`。

[eslint-plugin/prefer-object-rule](https://github.com/eslint-community/eslint-plugin-eslint-plugin/blob/main/docs/rules/prefer-object-rule.md) 规则可以自动修复并确保你的规则采用对象格式，而不是已弃用的函数格式。

有关编写规则的更多信息，请参阅[规则文档](../extend/custom-rules)。

**相关问题：** [#13349](https://github.com/eslint/eslint/issues/13349)

## <a name="get-comments"></a> `SourceCode#getComments()` 在 `RuleTester` 中会失败

早在 ESLint v4.0.0 中，我们就弃用了 `SourceCode#getComments()`，但后来没有将其移除。我们没有在 v8.0.0 中直接彻底移除它，而是采取了一个过渡步骤：更新 `RuleTester`，使其在规则中使用 `SourceCode#getComments()` 时失败。因此，所有现有规则仍可继续工作，但开发者运行规则测试时会遇到失败。

`SourceCode#getComments()` 方法将在 v9.0.0 中移除。

**解决方法：** 如果你的规则使用了 `SourceCode#getComments()`，请改用 [`SourceCode#getCommentsBefore()`、`SourceCode#getCommentsAfter()` 或 `SourceCode#getCommentsInside()`](../extend/custom-rules#accessing-comments)。

**相关问题：** [#14744](https://github.com/eslint/eslint/issues/14744)

## <a name="ast-format"></a> 简写属性 AST 格式变更

ESLint v8.0.0 升级到了 Espree v8.0.0，以支持新语法。此次 Espree 升级也包含了 Acorn v8.0.0 的升级，而 Acorn v8.0.0 改变了 AST 中简写属性的表示方式。示例如下：

```js
const version = 8;
const x = {
	version,
};
```

这段代码会创建如下所示的属性节点：

```json
{
	"type": "Property",
	"method": false,
	"shorthand": true,
	"computed": false,
	"key": {
		"type": "Identifier",
		"name": "version"
	},
	"kind": "init",
	"value": {
		"type": "Identifier",
		"name": "version"
	}
}
```

请注意，key 和 value 属性包含相同的信息。在 Acorn v8.0.0 之前（因此也就是 ESLint v8.0.0 之前），这两个节点由同一个对象表示，因此你可以使用 `===` 来判断它们是否表示同一个节点，例如：

```js
// true in ESLint v7.x, false in ESLint v8.0.0
if (propertyNode.key === propertyNode.value) {
	// do something
}
```

在 ESLint v8.0.0 中（通过 Acorn v8.0.0），`key` 和 `value` 现在是不同的对象，因此不再相同。

**解决方法：** 如果你的规则会比较简写对象字面量属性的键和值，以判断它们是否为同一节点，则需要通过以下两种方式之一修改代码：

1. 使用 `propertyNode.shorthand` 判断该属性是否为简写属性节点。
1. 使用每个节点的 `range` 属性，判断键和值是否位于相同位置。

**相关问题：** [#14591](https://github.com/eslint/eslint/pull/14591#issuecomment-887733070)

## <a name="remove-cliengine"></a> 已移除 `CLIEngine` 类

`CLIEngine` 类已被移除，并由 [`ESLint` 类](../integrate/nodejs-api#eslint-class)取代。

**解决方法：** 如果你目前使用 `CLIEngine`，请更新代码，改用新的 `ESLint` 类。下表列出了现有的 `CLIEngine` 方法及其对应的 `ESLint` 方法：

| `CLIEngine`                                  | `ESLint`                           |
| :------------------------------------------- | :--------------------------------- |
| `executeOnFiles(patterns)`                   | `lintFiles(patterns)`              |
| `executeOnText(text, filePath, warnIgnored)` | `lintText(text, options)`          |
| `getFormatter(name)`                         | `loadFormatter(name)`              |
| `getConfigForFile(filePath)`                 | `calculateConfigForFile(filePath)` |
| `isPathIgnored(filePath)`                    | `isPathIgnored(filePath)`          |
| `static outputFixes(results)`                | `static outputFixes(results)`      |
| `static getErrorResults(results)`            | `static getErrorResults(results)`  |
| `static getFormatter(name)`                  | (已移除 ※1)                       |
| `addPlugin(pluginId, definition)`            | `plugins` 构造函数选项             |
| `getRules()`                                 | (已移除 ※2)                       |
| `resolveFileGlobPatterns()`                  | (已移除 ※3)                       |

- ※1 `engine.getFormatter()` 方法目前会原样返回已加载包的对象。出于向后兼容的考虑，这使得为格式化器添加新功能变得困难。新的 `eslint.loadFormatter()` 方法会返回一个封装了已加载包对象的适配器对象，从而简化添加新功能的过程。此外，适配器对象还可以访问 `ESLint` 实例，以计算默认数据（例如，使用已加载插件的规则生成 `rulesMeta`）。因此，`ESLint` 类只实现了 `loadFormatter()` 方法的实例版本。
- ※2 `CLIEngine#getRules()` 方法有副作用，因此已被移除。如果你使用 `CLIEngine#getRules()` 根据代码检查结果获取规则的元信息，请改用 `ESLint#getRulesMetaForResults()`。如果你使用 `CLIEngine#getRules()` 获取所有内置规则，请从 `eslint/use-at-your-own-risk` 导入 `builtinRules`。这是一个不受支持的 API，可用于访问内部规则。
- ※3 从 ESLint v6.0.0 起，ESLint 使用不同于 `resolveFileGlobPatterns()` 方法的逻辑来遍历文件，因此该方法已过时。

**相关问题：** [RFC80](https://github.com/eslint/rfcs/tree/main/designs/2021-package-exports), [#14716](https://github.com/eslint/eslint/pull/14716), [#13654](https://github.com/eslint/eslint/issues/13654)

## <a name="remove-linter"></a> 已移除 `linter` 对象

ESLint v8.0.0 已从 ESLint 包中移除已弃用的 `linter` 对象。

**解决方法：** 如果你正在使用 `linter` 对象，例如：

```js
const { linter } = require("eslint");
```

请将代码改为：

```js
const { Linter } = require("eslint");
const linter = new Linter();
```

**相关问题：** [RFC80](https://github.com/eslint/rfcs/tree/main/designs/2021-package-exports), [#14716](https://github.com/eslint/eslint/pull/14716), [#13654](https://github.com/eslint/eslint/issues/13654)

## <a name="remove-lib"></a> 已移除 `/lib` 入口点

从 v8.0.0 开始，ESLint 严格定义其公共 API。以前，你可以直接访问单个文件，例如 `require("eslint/lib/rules/semi")`；现在不再允许这样做。为保证向后兼容，少数现有 API 现在可通过 `/use-at-your-own-risk` 入口点使用，但这些 API 不受正式支持，随时可能失效或被移除。

**解决方法：** 如果你通过 `/lib` 入口点直接访问规则，例如：

```js
const rule = require("eslint/lib/rules/semi");
```

请将代码改为：

```js
const { builtinRules } = require("eslint/use-at-your-own-risk");
const rule = builtinRules.get("semi");
```

如果你通过 `/lib` 入口点直接访问 `FileEnumerator`，例如：

```js
const { FileEnumerator } = require("eslint/lib/cli-engine/file-enumerator");
```

请将代码改为：

```js
const { FileEnumerator } = require("eslint/use-at-your-own-risk");
```

**相关问题：** [RFC80](https://github.com/eslint/rfcs/tree/main/designs/2021-package-exports), [#14716](https://github.com/eslint/eslint/pull/14716), [#13654](https://github.com/eslint/eslint/issues/13654)
