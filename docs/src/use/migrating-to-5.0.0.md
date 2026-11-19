---
title: 迁移到 v5.0.0
---

ESLint v5.0.0 是第五个主要版本。本次发布包含一些破坏性变更，但我们预计大多数用户无需修改构建流程即可升级。本指南将带你了解这些破坏性变更。

下面的列表大致按照每项变更可能影响的用户数量排序，排在前面的预计会影响更多用户。

## 面向用户的破坏性变更

1. [不再支持 Node.js 4](#drop-node-4)
1. [向 `eslint:recommended` 添加了新规则](#eslint-recommended-changes)
1. [已弃用 `experimentalObjectRestSpread` 选项](#experimental-object-rest-spread)
1. [现在从命令行对不存在的文件进行代码检查会触发致命错误](#nonexistent-files)
1. [部分规则的默认选项已更改](#rule-default-changes)
1. [已从 `node`、`browser` 和 `jest` 环境中移除已弃用的全局变量](#deprecated-globals)
1. [现在会对空文件进行代码检查](#empty-files)
1. [现在可以在配置中解析作用域包中的插件](#scoped-plugins)
1. [现在会将多行 `eslint-disable-line` 指令报告为问题](#multiline-directives)

## 面向插件/自定义规则开发者的破坏性变更

1. [现在会在规则开始运行前设置 AST 节点的 `parent` 属性](#parent-before-rules)
1. [使用默认解析器时，扩展运算符的类型现在是 `SpreadElement`](#spread-operators)
1. [使用默认解析器时，剩余运算符的类型现在是 `RestElement`](#rest-operators)
1. [使用默认解析器时，JSX 元素中的文本节点类型现在是 `JSXText`](#jsx-text-nodes)
1. [`context.getScope()` 方法现在会返回更准确的作用域](#context-get-scope)
1. [已从规则上下文对象中移除 `_linter` 属性](#no-context-linter)
1. [`RuleTester` 现在会在断言中使用严格相等检查](#rule-tester-equality)
1. [规则现在必须在报告问题时同时提供消息](#required-report-messages)

## 面向集成开发者的破坏性变更

1. [不再能在单条代码检查消息上获取 `source` 属性](#source-property)
1. [致命错误现在会返回退出码 2](#exit-code-two)
1. [`eslint.linter` 属性现在不可枚举](#non-enumerable-linter)

---

## <a name="drop-node-4"></a> 不再支持 Node.js 4

截至 2018 年 4 月 30 日，Node.js 4 将结束生命周期（EOL），不再接收安全更新。因此，我们决定在 ESLint v5 中停止支持它。现在支持以下 Node.js 版本：

- Node.js 6（6.14.0 及以上）
- Node.js 8（8.10.0 及以上）
- Node.js 9.10.0 以上的任何版本

**解决方法：** 使用 ESLint v5 时，请确保至少升级到 Node.js 6。如果无法升级，我们建议继续使用 ESLint v4.x，直到你能够升级 Node.js。

## <a name="eslint-recommended-changes"/> `eslint:recommended` 的变更

[`eslint:recommended`](configure/configuration-files#use-predefined-configurations) 配置中新增了两条规则：

- [`for-direction`](../rules/for-direction) 要求 `for` 循环的更新子句朝正确的方向调整计数器。
- [`getter-return`](../rules/getter-return) 要求属性 getter 中包含 `return` 语句。

**解决方法：** 若要恢复 4.x 中 `eslint:recommended` 的行为，可以在配置文件中禁用这些规则：

```json
{
	"extends": "eslint:recommended",

	"rules": {
		"for-direction": "off",
		"getter-return": "off"
	}
}
```

## <a name="experimental-object-rest-spread"></a> `experimentalObjectRestSpread` 选项已弃用

此前，使用默认解析器时，可以通过 `experimentalObjectRestSpread` 选项启用对[对象剩余/展开属性](https://developers.google.com/web/updates/2017/06/object-rest-spread)的支持，如下所示：

```json
{
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true
		}
	}
}
```

对象剩余/展开现在已成为 JavaScript 语言的正式组成部分，因此对它的支持不再是实验性的。在 ESLint v4 和 ESLint v5 中，现在都可以通过 `"ecmaVersion": 2018` 选项启用对象剩余/展开：

```json
{
	"parserOptions": {
		"ecmaVersion": 2018
	}
}
```

请注意，这也会启用对 ES2018 其他特性的解析，例如[异步迭代](https://github.com/tc39/proposal-async-iteration)。在 ESLint v5 中使用默认解析器时，无法再单独切换对象剩余/展开语法的支持，而不影响其他特性。

为保证兼容性，当配置文件中出现 `ecmaFeatures: { experimentalObjectRestSpread: true }` 时，ESLint v5 会将它视为 `ecmaVersion: 2018` 的别名。因此，如果你使用对象剩余/展开，代码仍应能在 ESLint v5 中成功解析。不过请注意，这个别名将在 ESLint v6 中移除。

**解决方法：** 如果使用了 `experimentalObjectRestSpread` 选项，应该可以无需更改即可升级到 ESLint v5，但会看到弃用警告。若要避免警告，请在配置文件中使用 `ecmaVersion: 2018`，而不是 `ecmaFeatures: { experimentalObjectRestSpread: true }`。如果想禁止使用其他 ES2018 特性，可以考虑使用 [`no-restricted-syntax`](../rules/no-restricted-syntax) 等规则。

## <a name="nonexistent-files"></a> 现在从命令行对不存在的文件进行代码检查会触发致命错误

以前的 ESLint 版本会静默忽略通过命令行提供的所有不存在的文件和 glob：

```bash
eslint nonexistent-file.js 'nonexistent-folder/**/*.js' # exits without any errors in ESLint v4
```

许多用户认为这种行为令人困惑，因为如果文件名中有拼写错误，ESLint 看起来会像是成功检查了该文件，实际上却什么也没有检查。

当满足以下任一条件时，ESLint v5 会报告致命错误：

- 命令行中指定的文件不存在。
- 命令行中指定的 glob 或文件夹没有匹配到任何可检查的文件。

请注意，这也会影响 [`CLIEngine.executeOnFiles()`](../integrate/nodejs-api#cliengineexecuteonfiles) API。

**解决方法：** 如果升级到 ESLint v5 后遇到文件缺失错误，请检查提供给 ESLint 的路径中是否有拼写错误。若要消除错误，只需从命令行传给 ESLint 的参数列表中移除相应文件或 glob。

如果你使用的样板生成器依赖这种行为（例如，在新项目中尚无任何测试文件时，生成一个运行 `eslint tests/` 的脚本），可以添加一个与给定模式匹配的虚拟文件来规避此问题（例如，创建一个空的 `tests/index.js` 文件）。

## <a name="rule-default-changes"></a> 部分规则的默认选项已更改

- [`object-curly-newline`](../rules/object-curly-newline) 规则的默认选项已从 `{ multiline: true }` 更改为 `{ consistent: true }`。
- [`no-self-assign`](../rules/no-self-assign) 规则的默认选项对象已从 `{ props: false }` 更改为 `{ props: true }`。

**解决方法：** 若要恢复 ESLint v4 中的规则行为，可以更新配置文件，加入之前的选项：

```json
{
	"rules": {
		"object-curly-newline": ["error", { "multiline": true }],
		"no-self-assign": ["error", { "props": false }]
	}
}
```

## <a name="deprecated-globals"></a> 已从 `node`、`browser` 和 `jest` 环境中移除已弃用的全局变量

一些用于 Node.js、浏览器和 Jest 代码的全局变量已弃用或移除。（例如，浏览器过去会向 JavaScript 代码提供一个名为 `SVGAltGlyphElement` 的全局变量，但该全局变量已从 Web 标准中移除，也不再存在于浏览器中。）因此，我们已从相应的 `eslint` 环境中移除这些全局变量；使用 [`no-undef`](../rules/no-undef) 等规则时，引用这些变量会触发错误。

**解决方法：** 如果你在 `node`、`browser` 或 `jest` 环境中使用了已弃用的全局变量，可以在配置中添加 `globals` 部分，重新启用所需的全局变量。例如：

```json
{
	"env": {
		"browser": true
	},
	"globals": {
		"SVGAltGlyphElement": false
	}
}
```

## <a name="empty-files"></a> 现在会对空文件进行代码检查

ESLint v4 对只包含空白字符的文件有一种特殊处理：它会跳过解析器和规则的运行，并且始终返回零个错误。这让用户和规则作者感到困惑，尤其是在编写规则测试时。（编写风格规则时，规则作者有时会编写一个只包含空白字符的源代码测试，以确保在找不到适用代码时规则行为正确。但这样的测试实际上根本不会运行规则，因此规则的某些方面最终没有得到测试。）

ESLint v5 会像处理其他文件一样处理只包含空白字符的文件：解析这些文件，并在适当情况下对其运行已启用的规则。如果你使用的自定义规则会在空文件上报告错误，这可能导致额外的代码检查问题。

**解决方法：** 如果项目中有不希望进行代码检查的空文件，可以考虑将其添加到 [`.eslintignore` 文件](configure/ignore)中。

如果你编写了自定义规则，请确保它能妥善处理空文件。（在大多数情况下，无需进行任何更改。）

## <a name="scoped-plugins"></a> 现在可以在配置中解析作用域包中的插件

当 ESLint v5 在配置中遇到以 `@` 开头的插件名称时，会将该插件解析为[作用域 npm 包](https://docs.npmjs.com/misc/scope)。例如，如果配置中包含 `"plugins": ["@foo"]`，ESLint v5 会尝试加载名为 `@foo/eslint-plugin` 的包。（而 ESLint v4 会尝试加载名为 `eslint-plugin-@foo` 的包。）这是一个破坏性变更，因为用户可能依赖 ESLint 查找 `node_modules/eslint-plugin-@foo` 中的包。不过，我们认为依赖这种行为的用户不太可能很多，因为发布到 npm 的包名中间不能包含 `@` 字符。

**解决方法：** 如果你依赖 ESLint 加载类似 `eslint-config-@foo` 的包，可以考虑将该包重命名为其他名称。

## <a name="multiline-directives"></a> 现在会将多行 `eslint-disable-line` 指令报告为问题

`eslint-disable-line` 和 `eslint-disable-next-line` 指令注释只能跨越一行。例如，以下指令注释无效：

```js
alert("foo");
/* eslint-disable-line
   no-alert */ alert("bar");

// (which line is the rule disabled on?)
```

以前，ESLint 会忽略这些格式错误的指令注释。ESLint v5 遇到此类问题时会报告错误，以便更容易地修正问题。

**解决方法：** 如果此变更导致出现新的错误报告，请确保 `eslint-disable-line` 指令只跨越一行。请注意，仍然可以使用“块注释”（由 `/* */` 界定）作为指令，前提是块注释中不包含换行符。

---

## <a name="parent-before-rules"></a> 现在会在规则开始运行前设置 AST 节点的 `parent` 属性

以前，ESLint 会在运行某个 AST 节点的规则监听器之前，立即为该节点设置 `parent` 属性。这让规则作者感到困惑，因为节点最初都没有 `parent` 属性，有时还必须让规则结构变得复杂，才能确保在需要时可以获取特定节点的 `parent` 属性。

在 ESLint v5 中，所有规则都能访问 AST 之前，就会为所有 AST 节点设置 `parent` 属性。这让某些规则更容易编写，因为 `parent` 属性始终可用，不会再在幕后发生变更。不过，由于存在 `parent` 属性，规则首次看到 AST 对象时，它就会具有循环结构（以前只有在调用第一个规则监听器之后才会形成循环结构）。因此，如果自定义规则通过枚举节点的所有属性来遍历 AST，却没有正确检测循环引用，就可能陷入无限循环或耗尽内存。

**解决方法：** 如果你编写的自定义规则会枚举 AST 节点的所有属性，可以考虑排除 `parent` 属性，或实现循环检测，以确保获得正确结果。

## <a name="spread-operators"></a> 使用默认解析器时，扩展运算符的类型现在是 `SpreadElement`

以前，使用启用了 `experimentalObjectRestSpread` 选项的默认解析器解析类似 `const foo = {...data}` 的 JS 代码时，会为 `...data` 扩展元素生成 `ExperimentalSpreadProperty` 节点类型。

在 ESLint v5 中，即使启用了（现在已弃用的）[`experimentalObjectRestSpread`](#experimental-object-rest-spread) 选项，默认解析器也始终会将 `...data` AST 节点的类型设为 `SpreadElement`。这样 AST 就符合当前的 ESTree 规范。

**解决方法：** 如果你编写的自定义规则依赖扩展运算符具有 `ExperimentalSpreadProperty` 类型，请更新规则，使其也能处理类型为 `SpreadElement` 的扩展运算符。

## <a name="rest-operators"></a> 使用默认解析器时，剩余运算符的类型现在是 `RestElement`

以前，使用启用了 `experimentalObjectRestSpread` 选项的默认解析器解析类似 `const {foo, ...rest} = data` 的 JS 代码时，会为 `...data` 剩余元素生成 `ExperimentalRestProperty` 节点类型。

在 ESLint v5 中，即使启用了（现在已弃用的）[`experimentalObjectRestSpread`](#experimental-object-rest-spread) 选项，默认解析器也始终会将 `...data` AST 节点的类型设为 `RestElement`。这样 AST 就符合当前的 ESTree 规范。

**解决方法：** 如果你编写的自定义规则依赖剩余运算符具有 `ExperimentalRestProperty` 类型，请更新规则，使其也能处理类型为 `RestElement` 的剩余运算符。

## <a name="jsx-text-nodes"></a> 使用默认解析器时，JSX 元素中的文本节点类型现在是 `JSXText`

解析类似 `<a>foo</a>` 的 JSX 代码时，默认解析器现在会将 `foo` AST 节点的类型设为 `JSXText`，而不是 `Literal`。这样 AST 就符合 JSX 规范最近的一次更新。

**解决方法：** 如果你编写的自定义规则依赖 JSX 元素中的文本节点具有 `Literal` 类型，请更新规则，使其也能处理类型为 `JSXText` 的节点。

## <a name="context-get-scope"></a> `context.getScope()` 方法现在会返回更准确的作用域

以前，`context.getScope()` 方法会根据 `parserOptions.ecmaVersion` 属性改变行为。不过，使用不响应 `ecmaVersion` 选项的解析器（例如 `babel-eslint`）时，这可能导致令人困惑的行为。

此外，在 `CatchClause`（ES5 中）、`ForStatement`（≧ES2015 中）、`ForInStatement`（≧ES2015 中）、`ForOfStatement` 和 `WithStatement` 节点上，`context.getScope()` 错误地返回了正确作用域的父级作用域。

在 ESLint v5 中，无论 `parserOptions.ecmaVersion` 是什么，`context.getScope()` 的行为都相同，并且会返回正确的作用域。有关返回哪些作用域的更多详情，请参阅[文档](../extend/scope-manager-interface)。

**解决方法：** 如果你编写的自定义规则在节点处理器中使用了 `context.getScope()` 方法，可能需要更新规则，以适应修改后的作用域信息。

## <a name="no-context-linter"></a> 已从规则上下文对象中移除 `_linter` 属性

以前，规则上下文对象有一个未记录的 `_linter` 属性，ESLint 内部使用它来处理规则报告。一些规则使用此属性实现本不应允许规则实现的功能。例如，有几个插件在规则中使用 `_linter` 属性监视其他规则的报告，以检查是否存在未使用的 `/* eslint-disable */` 指令注释。尽管此功能对用户有用，但也可能导致使用 ESLint 的项目出现稳定性问题。例如，一个插件中的规则升级，可能会意外导致另一个插件中的规则开始报告错误。

ESLint v5.0 中已移除 `_linter` 属性，因此无法再实现具有此功能的规则。不过，可以使用 [`--report-unused-disable-directives`](command-line-interface#--report-unused-disable-directives) CLI 标志来标记未使用的指令注释。

## <a name="rule-tester-equality"></a> `RuleTester` 现在会在断言中使用严格相等检查

以前，`RuleTester` 在进行某些断言时使用宽松相等。例如，如果某条规则自动修复后生成字符串 `"7"`，`RuleTester` 会允许在 `output` 断言中使用数字 `7`，而不是字符串 `"7"`。在 ESLint v5 中，`RuleTester` 的比较使用严格相等，因此这类断言将不再通过。

**解决方法：** 如果你使用 `RuleTester` 为自定义规则编写测试，请确保断言中的预期值与实际值严格相等。

## <a name="required-report-messages"></a> 规则现在必须在报告问题时同时提供消息

以前，规则可以报告 AST 节点而不提供报告消息。这并非预期行为，因此规则省略消息时，默认格式化程序会崩溃。不过，使用非默认格式化程序（例如 `json`）时，可以避免崩溃。

在 ESLint v5 中，报告问题时未提供消息总会导致错误。

**解决方法：** 如果你编写的自定义规则报告问题时未提供消息，请更新规则，在报告问题时同时提供消息。

---

## <a name="source-property"></a> 不再能在单条代码检查消息上获取 `source` 属性

正如我们在 [2016 年 10 月](/blog/2016/10/eslint-v3.8.0-released#additional-property-on-linting-results)宣布的那样，已从单条代码检查消息对象中移除 `source` 属性。

**解决方法：** 如果你的格式化程序或集成依赖单条代码检查消息上的 `source` 属性，请更新它，改用文件结果对象上的 `source` 属性。

## <a name="exit-code-two"></a> 致命错误现在会返回退出码 2

使用 ESLint v4 时，通过命令行运行 ESLint，以下两种情况都会返回退出码 1：

- 代码检查成功完成，但存在一些代码检查错误。
- 代码检查因致命错误（例如配置文件无效）而未能成功完成。

因此，集成很难区分这两种情况，也就难以确定是否应尝试从输出中提取代码检查结果。

在 ESLint v5 中，代码检查因致命错误而未能成功完成时，将返回退出码 2，而不是 1。

**解决方法：** 如果你的集成通过检查退出码是否等于 1 来检测代码检查运行中的所有问题，请更新它，改为检查退出码是否非零。

## <a name="non-enumerable-linter"></a> `eslint.linter` 属性现在不可枚举

使用 ESLint 的 Node.js API 时，[`linter`](../integrate/nodejs-api#linter-1) 属性现在不可枚举。请注意，在 ESLint v4 中，`linter` 属性已弃用，建议改用 [`Linter`](../integrate/nodejs-api#linter) 属性。

**解决方法：** 如果你依赖枚举 `eslint` 对象的所有属性，请使用 `Object.getOwnPropertyNames` 等方法，以确保获取不可枚举的键。
