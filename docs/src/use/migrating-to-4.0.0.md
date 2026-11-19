---
title: 迁移到 v4.0.0
---

ESLint v4.0.0 是第四个主版本。此版本中我们做出了几项破坏性更改；不过，我们预计大多数更改只会影响很小一部分用户。本指南将带你了解这些更改。

下面的列表大致按照每项更改预计影响的用户数量排序，排在前面的更改预计影响的用户最多。

## 面向用户的破坏性更改

1. [新增规则已加入 `eslint:recommended`](#eslint-recommended-changes)
1. [`indent` 规则更加严格](#indent-rewrite)
1. [配置文件中的无法识别属性现在会导致致命错误](#config-validation)
1. [.eslintignore 模式现在从文件所在位置解析](#eslintignore-patterns)
1. [`padded-blocks` 规则的默认行为更加严格](#padded-blocks-defaults)
1. [`space-before-function-paren` 规则的默认行为更加严格](#space-before-function-paren-defaults)
1. [`no-multi-spaces` 规则的默认行为更加严格](#no-multi-spaces-eol-comments)
1. [配置文件中对作用域插件的引用现在必须包含作用域](#scoped-plugin-resolution)

## 面向插件/自定义规则开发者的破坏性更改

1. [`RuleTester` 现在会验证测试用例的属性](#rule-tester-validation)
1. [AST 节点不再具有注释属性](#comment-attachment)
1. [遍历 AST 时不再发出 `LineComment` 和 `BlockComment` 事件](#event-comments)
1. [注释 API 现在会返回 shebang](#shebangs)

## 面向集成开发者的破坏性更改

1. [`linter.verify()` API 不再支持 `global` 属性](#global-property)
1. [现在更多报告消息会包含完整的位置范围](#report-locations)
1. [部分公开 API 现在是 ES2015 类](#exposed-es2015-classes)

---

## <a name="eslint-recommended-changes"></a> `eslint:recommended` 的更改

[`eslint:recommended`](configure/configuration-files#use-predefined-configurations) 配置中新增了两条规则：

- [`no-compare-neg-zero`](../rules/no-compare-neg-zero) 禁止与 `-0` 进行比较
- [`no-useless-escape`](../rules/no-useless-escape) 禁止在字符串和正则表达式中使用不必要的转义字符

**解决方法：**若要模拟 3.x 中 `eslint:recommended` 的行为，可以在配置文件中禁用这些规则：

```json
{
	"extends": "eslint:recommended",

	"rules": {
		"no-compare-neg-zero": "off",
		"no-useless-escape": "off"
	}
}
```

## <a name="indent-rewrite"></a> `indent` 规则更加严格

此前，[`indent`](../rules/indent) 规则对缩进的检查相当宽松；有许多代码模式不会由该规则检查缩进。这让用户感到困惑，因为他们可能会不小心写出缩进错误的代码，却以为 ESLint 会发现这些问题。

在 4.0.0 中，`indent` 规则经过了重写。新版本会报告一些旧版本无法发现的缩进错误。此外，默认情况下，现在也会检查 `MemberExpression` 节点、函数参数以及函数实参的缩进（出于向后兼容的考虑，此前默认忽略这些情况）。

为简化升级过程，我们新增了 [`indent-legacy`](../rules/indent-legacy) 规则，它是 3.x 中 `indent` 规则的快照。如果升级时遇到 `indent` 规则导致的问题，可以使用 `indent-legacy` 规则来复现 3.x 的行为。不过，`indent-legacy` 规则已弃用，今后不会再收到错误修复或改进，因此最终应切换回 `indent` 规则。

**解决方法：**我们建议升级时不要更改 `indent` 配置，并修复代码库中出现的任何新缩进错误。不过，如果你希望模拟 `indent` 规则在 3.x 中的行为，可以更新配置：

```js
{
  rules: {
    indent: "off",
    "indent-legacy": "error" // replace this with your previous `indent` configuration
  }
}
```

## <a name="config-validation"></a> 配置文件中的无法识别属性现在会导致致命错误

用户编写配置时，有时会拼错内容，或误解配置应采用的结构。此前，ESLint 不会验证配置文件的属性，因此排查配置中的拼写错误可能非常费时。从 4.0.0 开始，如果配置文件中的属性无法识别或类型不正确，ESLint 就会报错。

**解决方法：**升级后如果看到配置验证错误，请检查配置中是否有拼写错误。如果使用了无法识别的属性，删除该属性应可恢复之前的行为。

## <a name="eslintignore-patterns"></a> .eslintignore 模式现在从文件所在位置解析

由于存在一个错误，`.eslintignore` 文件中的 glob 模式此前是相对于进程的当前工作目录解析的，而不是相对于 `.eslintignore` 文件所在位置解析。从 4.0 开始，`.eslintignore` 文件中的模式将相对于该文件所在位置解析。

**解决方法：**如果你使用 `.eslintignore` 文件，并且经常在项目根目录之外运行 ESLint，模式的匹配结果可能会有所不同。你应更新 `.eslintignore` 文件中的模式，确保它们相对于该文件，而不是相对于工作目录。

## <a name="padded-blocks-defaults"></a> `padded-blocks` 规则的默认行为更加严格

现在，默认情况下，[`padded-blocks`](../rules/padded-blocks) 规则会要求类主体和 switch 语句中包含空行。此前，除非用户选择启用这些检查，否则规则会忽略这些情况。

**解决方法：**如果此更改导致代码库中出现更多代码检查错误，应修复这些错误或重新配置该规则。

## <a name="space-before-function-paren-defaults"></a> `space-before-function-paren` 规则的默认行为更加严格

现在，默认情况下，[`space-before-function-paren`](../rules/space-before-function-paren) 规则会检查异步箭头函数的空格。此前，除非用户选择启用这些检查，否则规则会忽略这些情况。

**解决方法：**若要模拟 3.x 中的默认配置，可以使用：

```json
{
	"rules": {
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "always",
				"named": "always",
				"asyncArrow": "ignore"
			}
		]
	}
}
```

## <a name="no-multi-spaces-eol-comments"></a> `no-multi-spaces` 规则的默认行为更加严格

现在，默认情况下，[`no-multi-spaces`](../rules/no-multi-spaces) 规则会禁止在行末注释之前使用多个空格。此前，规则不会检查这种情况。

**解决方法：**若要模拟 3.x 中的默认配置，可以使用：

```json
{
	"rules": {
		"no-multi-spaces": ["error", { "ignoreEOLComments": true }]
	}
}
```

## <a name="scoped-plugin-resolution"></a> 配置文件中对作用域插件的引用现在必须包含作用域

在 3.x 中存在一个错误：配置文件将带作用域的 NPM 包作为插件引用时，可以省略作用域。例如，在 3.x 中，以下配置是合法的：

```json
{
	"plugins": ["@my-organization/foo"],
	"rules": {
		"foo/some-rule": "error"
	}
}
```

也就是说，可以引用带作用域插件中的规则（例如 `foo/some-rule`），而不明确写出 `@my-organization` 作用域。这是一个错误，因为如果同时加载了一个名为 `eslint-plugin-foo` 的非作用域插件，就可能导致规则引用不明确。

为避免这种歧义，在 4.0 中，引用带作用域的插件时必须包含作用域。上面的配置应改为：

```json
{
	"plugins": ["@my-organization/foo"],
	"rules": {
		"@my-organization/foo/some-rule": "error"
	}
}
```

**解决方法：**如果你在配置文件中将带作用域的 NPM 包作为插件引用，请确保每次引用时都包含作用域。

---

## <a name="rule-tester-validation"></a> `RuleTester` 现在会验证测试用例的属性

从 4.0 开始，`RuleTester` 工具会验证测试用例对象的属性；如果遇到未知属性，就会抛出错误。我们加入此更改，是因为发现开发者在规则测试中拼错内容的情况相当常见，而且这往往会使测试用例原本要执行的断言失效。

**解决方法：**如果自定义规则的测试中包含多余属性，应删除这些属性。

## <a name="comment-attachment"></a> AST 节点不再具有注释属性

在 4.0 之前，ESLint 要求解析器实现注释附加机制：该机制会为 AST 节点添加额外属性，对应源文件中位于节点之前和之后的注释。这使得用户难以开发自定义解析器，因为他们必须复现 ESLint 所要求的、令人困惑的注释附加语义。

在 4.0 中，我们不再采用注释附加这一概念，而是将所有注释处理逻辑移入 ESLint 本身。这应该会让开发自定义解析器更加容易，但也意味着 AST 节点不再具有 `leadingComments` 和 `trailingComments` 属性。从概念上说，规则作者现在可以从 token 的角度考虑注释，而不是从 AST 节点的角度考虑注释。

**解决方法：**如果你的自定义规则依赖 AST 节点的 `leadingComments` 或 `trailingComments` 属性，现在可以分别改用 `sourceCode.getCommentsBefore()` 和 `sourceCode.getCommentsAfter()`。

此外，`sourceCode` 对象现在还提供 `sourceCode.getCommentsInside()`（返回节点内部的所有注释）和 `sourceCode.getAllComments()`（返回文件中的所有注释）；还可以通过其他各种 token 迭代方法（例如 `getTokenBefore()` 和 `getTokenAfter()`）并使用 `{ includeComments: true }` 选项来访问注释。

对于希望同时支持 ESLint v3.0 和 v4.0 的规则作者，现已弃用的 `sourceCode.getComments()` 仍然可用，并且适用于两个版本。

最后请注意，以下 `SourceCode` 方法已弃用，并将在 ESLint 的未来版本中移除：

- `getComments()` - 替换为 `getCommentsBefore()`、`getCommentsAfter()` 和 `getCommentsInside()`
- `getTokenOrCommentBefore()` - 替换为使用 `{ includeComments: true }` 选项的 `getTokenBefore()`
- `getTokenOrCommentAfter()` - 替换为使用 `{ includeComments: true }` 选项的 `getTokenAfter()`

## <a name="event-comments"></a> 遍历 AST 时不再发出 `LineComment` 和 `BlockComment` 事件

从 4.0 开始，遍历 AST 时不会再发出 `LineComment` 和 `BlockComments` 事件。原因有两个：

- 此行为依赖解析器层级的注释附加机制来确保涵盖所有注释，而该机制现在已不再使用。
- 从 token 的角度考虑注释，比从 AST 节点的角度考虑注释 token 更容易预测和理解。

**解决方法：**规则现在可以使用 `sourceCode.getAllComments()` 获取文件中的所有注释，而不是依赖 `LineComment` 和 `BlockComment`。要检查某种特定类型的所有注释，规则可以采用以下模式：

```js
sourceCode.getAllComments().filter(comment => comment.type === "Line");
sourceCode.getAllComments().filter(comment => comment.type === "Block");
```

## <a name="shebangs"></a> 注释 API 现在会返回 shebang

在 4.0 之前，源文件中的 shebang 注释不会出现在 `sourceCode.getAllComments()` 或 `sourceCode.getComments()` 的输出中，但会作为行注释出现在 `sourceCode.getTokenOrCommentBefore` 的输出中。这种不一致让一些规则开发者感到困惑。

在 4.0 中，shebang 注释会作为类型为 `Shebang` 的注释 token 处理，并由任何返回注释的 `SourceCode` 方法返回。此更改旨在让 shebang 注释的处理方式与其他 token 更一致。

**解决方法：**如果你的自定义规则会对注释执行操作，可能需要添加一些逻辑，以确保正确处理或过滤 shebang 注释：

```js
sourceCode.getAllComments().filter(comment => comment.type !== "Shebang");
```

---

## <a name="global-property"></a> `linter.verify()` API 不再支持 `global` 属性

此前，`linter.verify()` API 接受一个 `global` 配置选项，它是文档中所述 `globals` 属性的同义项。`global` 选项从未在文档中说明或得到官方支持，而且在配置文件中也不起作用。它已在 4.0 中移除。

**解决方法：**如果你之前使用了 `global` 属性，请改用 `globals` 属性，两者作用相同。

## <a name="report-locations"></a> 现在更多报告消息会包含完整的位置范围

从 3.1.0 开始，规则除了指定报告问题的起始位置外，还可以通过在 `report` 调用中明确指定结束位置来指定问题的 _结束_ 位置。这对于编辑器集成等工具很有用，它们可以使用该范围准确显示报告问题的位置。从 4.0 开始，如果报告的是一个 _节点_ 而不是一个位置，范围的结束位置将自动根据该节点的结束位置推断。因此，更多报告的问题将包含结束位置。

预计这不会造成兼容性问题。不过，与之前相比，报告的位置范围可能会更大。例如，如果规则报告 AST 的根节点，报告问题的范围将覆盖整个程序。在某些集成中，这可能会导致糟糕的用户体验（例如，为了指示错误而高亮整个程序）。

**解决方法：**如果你的集成会处理报告问题的位置范围，请确保以对用户友好的方式处理较大的报告范围。

## <a name="exposed-es2015-classes"></a> 部分公开 API 现在是 ES2015 类

ESLint Node.js API 中的 `CLIEngine`、`SourceCode` 和 `RuleTester` 模块现在是 ES2015 类。这不会破坏任何文档中描述的行为，但会产生一些可观察到的变化（例如，`CLIEngine.prototype` 上的方法现在不可枚举）。

**解决方法：**如果你依赖枚举 ESLint Node.js API 的方法，请使用也能访问不可枚举属性的函数，例如 `Object.getOwnPropertyNames`。
