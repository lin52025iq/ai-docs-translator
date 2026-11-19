---
title: 选择器
---

某些规则和 API 允许使用选择器查询 AST。本页旨在：

1. 解释什么是选择器
2. 描述创建选择器的语法
3. 介绍选择器的用途

<a id="what-is-a-selector"></a>

## 什么是选择器？

选择器是一个字符串，可用于匹配抽象语法树（AST）中的节点。这有助于描述代码中的特定语法模式。

AST 选择器的语法与 [CSS 选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)类似。如果你以前使用过 CSS 选择器，那么 AST 选择器的语法应该很容易理解。

最简单的选择器就是节点类型。节点类型选择器会匹配所有具有指定类型的节点。例如，请看下面的程序：

```js
var foo = 1;
bar.baz();
```

选择器 "`Identifier`" 会匹配程序中的所有 `Identifier` 节点。在本例中，该选择器会匹配 `foo`、`bar` 和 `baz` 对应的节点。

选择器不仅限于匹配单个节点类型。例如，选择器 `VariableDeclarator > Identifier` 会匹配所有直接父节点为 `VariableDeclarator` 的 `Identifier` 节点。在上面的程序中，它会匹配 `foo` 对应的节点，但不会匹配 `bar` 和 `baz` 对应的节点。

<a id="what-syntax-can-selectors-have"></a>

## 选择器可以使用哪些语法？

支持以下选择器：

- AST 节点类型：`ForStatement`
- 通配符（匹配所有节点）：`*`
- 属性存在：`[attr]`
- 属性值：`[attr="foo"]` 或 `[attr=123]`
- 属性正则表达式：`[attr=/foo.*/]`
- 属性条件：`[attr!="foo"]`、`[attr>2]`、`[attr<3]`、`[attr>=2]` 或 `[attr<=3]`
- 嵌套属性：`[attr.level2="foo"]`
- 字段：`FunctionDeclaration > Identifier.id`
- 第一个或最后一个子节点：`:first-child` 或 `:last-child`
- 第 n 个子节点（不支持 ax+b）：`:nth-child(2)`
- 倒数第 n 个子节点（不支持 ax+b）：`:nth-last-child(1)`
- 后代：`FunctionExpression ReturnStatement`
- 子节点：`UnaryExpression > Literal`
- 后续兄弟节点：`VariableDeclaration ~ VariableDeclaration`
- 相邻兄弟节点：`ArrayExpression > Literal + SpreadElement`
- 否定：`:not(ForStatement)`
- 匹配任意项：`:matches([attr] > :first-child, :last-child)` 或 `:is([attr] > :first-child, :last-child)`
- AST 节点类别：`:statement`、`:expression`、`:declaration`、`:function` 或 `:pattern`

这种语法功能强大，可用于精确选择代码中的许多语法模式。

<sup>本节示例改编自 [esquery](https://github.com/estools/esquery) 文档。</sup>

<a id="what-can-selectors-be-used-for"></a>

## 选择器有哪些用途？

如果你正在编写自定义 ESLint 规则，可能会想使用选择器检查 AST 的特定部分。如果你正在为代码库配置 ESLint，则可能会想使用选择器限制特定的语法模式。

<a id="listening-for-selectors-in-rules"></a>

### 在规则中监听选择器

编写自定义 ESLint 规则时，可以在遍历 AST 的过程中监听与特定选择器匹配的节点。

```js
module.exports = {
	create(context) {
		// ...

		return {
			// This listener will be called for all IfStatement nodes with blocks.
			"IfStatement > BlockStatement": function (blockStatementNode) {
				// ...your logic here
			},

			// This listener will be called for all function declarations with more than 3 parameters.
			"FunctionDeclaration[params.length>3]": function (
				functionDeclarationNode,
			) {
				// ...your logic here
			},
		};
	},
};
```

在选择器末尾添加 `:exit`，会使监听器在遍历过程中退出匹配节点时调用，而不是在进入节点时调用。

如果有两个或更多选择器匹配同一个节点，它们对应的监听器会按特异性从低到高的顺序调用。AST 选择器的特异性与 CSS 选择器类似：

- 比较两个选择器时，包含更多类选择器、属性选择器和伪类选择器（不包括 `:not()`）的选择器特异性更高。
- 如果类、属性和伪类选择器的数量相同，则包含更多节点类型选择器的选择器特异性更高。

如果多个选择器的特异性相同，则针对该节点的监听器会按字母顺序调用。

<a id="restricting-syntax-with-selectors"></a>

### 使用选择器限制语法

借助 [no-restricted-syntax](../rules/no-restricted-syntax) 规则，你可以限制代码中特定语法的使用。例如，可以使用以下配置，禁止使用主体不是块语句的 `if` 语句：

```json
{
	"rules": {
		"no-restricted-syntax": [
			"error",
			"IfStatement > :not(BlockStatement).consequent"
		]
	}
}
```

……或者，也可以使用以下配置：

```json
{
	"rules": {
		"no-restricted-syntax": [
			"error",
			"IfStatement[consequent.type!='BlockStatement']"
		]
	}
}
```

再举一个例子，你可以禁止调用 `require()`：

```json
{
	"rules": {
		"no-restricted-syntax": [
			"error",
			"CallExpression[callee.name='require']"
		]
	}
}
```

或者，你可以强制要求调用 `setTimeout` 时始终传入两个参数：

```json
{
	"rules": {
		"no-restricted-syntax": [
			"error",
			"CallExpression[callee.name='setTimeout'][arguments.length!=2]"
		]
	}
}
```

在 `no-restricted-syntax` 规则中使用选择器，可以让你灵活控制代码库中的问题模式，而不必为检测每种模式都编写自定义规则。

<a id="using-regular-expressions"></a>

### 使用正则表达式

你可以在属性选择器中使用正则表达式。例如，以下选择器会匹配所有 `name` 值以 "foo" 开头的 `Identifier` 节点：

```text
Identifier[name=/^foo/]
```

你也可以在正则表达式中使用正斜杠。例如，以下配置会禁止从 `some/path` 导入：

```json
{
	"rules": {
		"no-restricted-syntax": [
			"error",
			"ImportDeclaration[source.value=/^some\\/path$/]"
		]
	}
}
```

请注意，正则表达式中的 `/` 字符需要转义（`\/`），以免被解释为正则表达式的结束符。此外，由于选择器位于 JSON 字符串中，反斜杠字符本身也需要转义（`\\`）。