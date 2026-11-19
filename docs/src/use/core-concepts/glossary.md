---
title: 词汇表
eleventyNavigation:
    key: glossary
    title: 词汇表
    parent: core concepts
---

本页汇总了与 ESLint 相关的常用术语，供查阅参考。

## A

<a id="abstract-syntax-tree-ast"></a>

### 抽象语法树（AST）

对代码语法的结构化表示。

AST 中的每个源代码片段都称为一个[节点](#node)。
每个节点可以有任意数量的属性，其中包括存储子节点的属性。

ESLint 使用的 AST 格式是 [ESTree](#estree) 格式。

ESLint [规则](#rule)会接收 AST，并在检测到[违规](#violation)时，针对 AST 的某些部分生成[违规](#violation)。

## C

<a id="config-file-configuration-file"></a>

### 配置文件

包含 ESLint 解析文件及运行[规则](#rule)时所用偏好的文件。

ESLint 配置文件的命名格式为 `eslint.config.(c|m)?(j|t)s`。
每个配置文件都会导出一个包含[配置对象](#config-object)的[配置数组](#config-array)。

例如，以下 `eslint.config.js` 文件会以 _error_ [严重性](#severity)启用 `prefer-const` [规则](#rule)：

```js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			"prefer-const": "error",
		},
	},
]);
```

更多详情请参阅[配置文件](../configure/configuration-files)。

<a id="config-array"></a>

### 配置数组

[配置文件](#config-file-configuration-file)中的[配置对象](#config-object)数组。

每个配置文件都会导出一个配置对象数组。
数组中的对象按顺序求值：后面的对象可以覆盖前面的对象所指定的设置。

更多详情请参阅[配置文件](../configure/configuration-files)。

<a id="config-object"></a>

### 配置对象

[配置文件](#config-file-configuration-file)中的一项，其中指定了 ESLint 对一组文件执行检查所需的全部信息。

每个配置对象都可以包含属性，用于描述要检查哪些文件、如何处理不同的文件类型、要包含哪些[插件](#plugin)，以及如何运行[规则](#rule)。

更多详情请参阅[配置文件 > 配置对象](../configure/configuration-files#configuration-objects)。

## E

<a id="esquery"></a>

### ESQuery

ESLint 用来解析[选择器](#selector)语法的库，可用于查询 [AST](#abstract-syntax-tree-ast) 中的[节点](#node)。

ESQuery 会将 CSS 语法应用于 AST 节点属性。
ESQuery 选择器示例：

- `BinaryExpression`：选择所有类型为 _BinaryExpression_ 的节点
- `BinaryExpression[operator='+']`：选择所有 _operator_ 为 `+` 的 _BinaryExpression_ 节点
- `BinaryExpression > Literal[value=1]`：选择所有 _value_ 为 `1` 且直接父节点为 _BinaryExpression_ 的 _Literal_ 节点

有关 ESQuery 格式的更多信息，请参阅 [github.com/estools/esquery](https://github.com/estools/esquery)。

<a id="estree"></a>

### ESTree

ESLint 用来将 JavaScript 语法表示为 [AST](#abstract-syntax-tree-ast) 的格式。

例如，代码 `1 + 2;` 的 ESTree 表示形式大致如下：

```json
{
	"type": "ExpressionStatement",
	"expression": {
		"type": "BinaryExpression",
		"left": {
			"type": "Literal",
			"value": 1,
			"raw": "1"
		},
		"operator": "+",
		"right": {
			"type": "Literal",
			"value": 2,
			"raw": "2"
		}
	}
}
```

ESLint 等[静态分析](#static-analysis)工具通常会将语法转换为 ESTree 格式的 AST，以此进行分析。

有关 ESTree 规范的更多信息，请参阅 [github.com/estree/estree](https://github.com/estree/estree)。

## F

<a id="fix"></a>

### 修复

对[规则](#rule)[违规](#violation)的可选补充，描述如何自动纠正该违规。

修复通常可以安全地自动应用：它们不应改变代码行为。
使用 `--fix` 标志运行时，ESLint 会尝试在[报告](#report)中尽可能多地应用修复，但不保证一定会应用所有修复。常见的编辑器扩展也可以应用修复。

规则违规也可能包含不安全、不会自动应用的文件更改，这类更改以[建议](#suggestion)的形式提供。

<a id="flat-config"></a>

### 扁平配置

ESLint 当前使用的配置文件格式。

扁平配置文件的命名格式为 `eslint.config.(c|m)?(j|t)s`。
之所以称为“扁平”配置文件，是因为所有嵌套配置都必须放在同一个配置文件中。相比之下，[“旧版”配置格式](#legacy-config)允许在项目的子目录中嵌套配置文件。

有关采用扁平配置的原因，请参阅 [ESLint's new config system, Part 2: Introduction to flat config](https://eslint.org/blog/2022/08/new-config-system-part-2)。

<a id="formatter-linting"></a>

### 格式化器（代码检查）

用于呈现 ESLint 生成的[报告](#report)的软件包。

ESLint 内置了多个报告器，包括 `stylish`（默认）、`json` 和 `html`。

更多信息请参阅[格式化器](../formatters)。

<a id="formatter-tool"></a>

### 格式化器（工具）

一种[静态分析](#static-analysis)工具，可快速重新格式化代码，而不改变其逻辑或名称。

格式化器通常只会修改代码中的“琐碎细节”，例如分号、间距、换行和一般空白字符。这些细节的修改通常不会改变代码的 [AST](#abstract-syntax-tree-ast)。

生态系统中常见的格式化器包括 [Prettier](https://prettier.io) 和 [dprint](https://dprint.dev)。

请注意，ESLint 是[代码检查器](#linter)，而不是格式化器，不过 ESLint 规则也可以对源代码应用格式更改。有关格式化规则的更多信息，请参阅[格式化（规则）](#formatting-rule)。

<a id="formatting-rule"></a>

### 格式化（规则）

仅针对[格式化](#formatter-tool)问题的规则，例如分号和空白字符。这些规则不会改变应用逻辑，属于[风格规则](#stylistic-rule)的子集。

ESLint 不再推荐使用格式化规则，并且此前已弃用其内置格式化规则。ESLint 建议改用专用格式化器，例如 [Prettier](https://prettier.io) 或 [dprint](https://dprint.dev)。此外，[ESLint Stylistic 项目](https://eslint.style)也提供与格式相关的代码检查规则。

更多信息请参阅[格式化规则弃用公告](https://eslint.org/blog/2023/10/deprecating-formatting-rules)。

## G

<a id="global-declaration"></a>

### 全局声明

向 ESLint 描述某个 JavaScript[全局变量](#global-variable)在运行时应当存在。

全局声明会告知代码检查规则如何检查全局变量的正确用法。例如，[`no-undef` 规则](../../rules/no-undef)会针对引用了未在已配置全局变量列表中定义的全局变量的代码生成违规。

[配置文件](#config-file-configuration-file)使用 JavaScript 对象定义全局变量。

有关配置全局变量的信息，请参阅[配置语言选项 > 指定全局变量](../configure/language-options#specify-globals)。

<a id="global-variable"></a>

### 全局变量

存在于全局作用域中的运行时变量，也就是说，所有模块和脚本都可以访问它。

在 JavaScript 中，全局变量定义在 `globalThis` 对象上（在 Node.js 中通常别名为 `global`，在浏览器中通常别名为 `window`）。

你可以通过[全局声明](#global-declaration)告知 ESLint 代码使用了哪些全局变量。

## I

<a id="inline-config-configuration-comment"></a>

### 行内配置（配置注释）

用于将规则配置为不同严重性和/或选项集的源代码注释。

行内配置使用与[配置文件](#config-file-configuration-file)类似的语法，按名称指定任意数量的规则及其新的严重性，也可以选择为规则指定新选项。例如，以下行内配置注释会同时禁用 [`eqeqeq`](../../rules/eqeqeq) 规则，并将 [`curly`](../../rules/curly) 规则设为 `"error"`：

```js
/* eslint eqeqeq: "off", curly: "error" */
```

有关行内配置注释的文档，请参阅[规则 > 使用配置注释](../configure/rules#use-configuration-comments)。

## L

<a id="legacy-config"></a>

### 旧版配置

ESLint 之前使用的配置文件格式，现已被[“扁平”配置](#flat-config)取代。

旧版 ESLint 配置的命名格式为 `.eslintrc.*`，并允许在项目子目录中的多个文件间嵌套配置。

有关旧版配置的演变历程，请参阅 [ESLint's new config system, Part 1: Background](https://eslint.org/blog/2022/08/new-config-system-part-1)。

<a id="linter"></a>

### 代码检查器

一种[静态分析](#static-analysis)工具，可对源代码运行一组[规则](#rule)，并[报告](#report)运行结果。
每条规则都可以报告源代码中的任意数量的[违规](#violation)。

ESLint 是常用于 JavaScript 和其他 Web 技术的代码检查器。

请注意，_代码检查器_不同于[格式化器](#formatter-tool)和[类型检查器](#type-checker)。

<a id="logical-rule"></a>

### 逻辑规则

用于检查代码运行方式并查找问题的[规则](#rule)。

许多逻辑规则会查找可能导致崩溃的代码（例如 [`no-undef`](../../rules/no-undef)）、意外行为（例如 [`no-sparse-arrays`](../../rules/no-sparse-arrays)）和未使用的代码（例如 [`no-unused-vars`](../../rules/no-unused-vars)）。

你可以在 [规则 > 可能存在的问题](../../rules/#possible-problems)下查看 ESLint 自带逻辑规则的完整列表。

## N

<a id="node"></a>

### 节点

[AST](#abstract-syntax-tree-ast)中的一段代码。

每个节点都表示源代码中一种语法类型。例如，在 `1 + 2;` 的 AST 中，`1 + 2` 是一个 _BinaryExpression_。

请参阅 [ESQuery](#esquery)，了解 ESLint 用来解析[选择器](#selector)的库。选择器允许[规则](#rule)查找节点。

## O

<a id="override"></a>

### 覆盖

当[配置对象](#config-object)或[行内配置](#inline-config-configuration-comment)设置了新的严重性和/或规则选项，从而取代之前设置的严重性和/或选项时，就会发生覆盖。

以下[配置文件](#config-file-configuration-file)会在 `*.test.js` 文件中将 `no-unused-expressions` 从 `"error"` 覆盖为 `"off"`：

```js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			"no-unused-expressions": "error",
		},
	},
	{
		files: ["*.test.js"],
		rules: {
			"no-unused-expressions": "off",
		},
	},
]);
```

以下[行内配置](#inline-config-configuration-comment)将 `no-unused-expressions` 设为 `"error"`：

```js
/* eslint no-unused-expressions: "error" */
```

## P

<a id="parser"></a>

### 解析器

包含一个方法的对象，该方法读取字符串并将其转换为标准化格式。

ESLint 使用解析器将源代码字符串转换为 [AST](#abstract-syntax-tree-ast) 结构。默认情况下，ESLint 使用 [Espree](https://github.com/eslint/js/tree/main/packages/espree) 解析器，它会生成与标准 JavaScript 运行时和版本兼容的 AST。

自定义解析器可以让 ESLint 解析非标准 JavaScript 语法。自定义解析器通常包含在可共享配置或插件中，因此你无需直接使用它们。例如，[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 是 [typescript-eslint](https://typescript-eslint.io) 项目中的自定义解析器，可让 ESLint 解析 TypeScript 代码。

有关在 ESLint 中使用解析器的更多信息，请参阅[配置解析器](../configure/parser)。

<a id="plugin"></a>

### 插件

可以包含一组[配置](#shareable-config-configuration)、[处理器](#processor)和/或[规则](#rule)的软件包。

插件的一种常见用途是为某个框架强制执行最佳实践。例如，[@angular-eslint/eslint-plugin](https://www.npmjs.com/package/@angular-eslint/eslint-plugin)包含了使用 Angular 框架的最佳实践。

更多信息请参阅[配置插件](../configure/plugins)。

<a id="processor"></a>

### 处理器

插件的一部分，可从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对这些 JavaScript 代码执行代码检查。

例如，[`@eslint/markdown`](https://github.com/eslint/markdown)包含一个处理器，可以将 Markdown 文件中 <code>```</code> 代码块的文本转换为可执行代码检查的代码。

有关配置处理器的信息，请参阅[插件 > 指定处理器](../configure/plugins#specify-a-processor)。

## R

<a id="report"></a>

### 报告

一次 ESLint 运行所产生的[违规](#violation)集合。

ESLint 检查源文件时，会将每个源文件的 [AST](#abstract-syntax-tree-ast) 传递给每条已配置的[规则](#rule)。各条规则产生的违规会汇总在一起，然后传递给[格式化器（代码检查）](#formatter-linting)，以便呈现给用户。

<a id="rule"></a>

### 规则

用于检查 [AST](#abstract-syntax-tree-ast) 是否符合预期模式的代码。当代码不符合规则的预期时，规则就会生成[违规](#violation)。

ESLint 提供了大量规则，用于检查常见的 JavaScript 代码问题。[插件](#plugin)还可以加载更多规则。

有关所提供规则的概览，请参阅[核心概念 > 规则](../core-concepts/#rules)。

## S

<a id="selector"></a>

### 选择器

描述如何在 [AST](#abstract-syntax-tree-ast) 中搜索[节点](#node)的语法。

ESLint [规则](#rule)使用 [ESQuery](#esquery) 选择器来查找需要检查的节点。

<a id="severity"></a>

### 严重性

规则配置的报告级别，也可以配置为不运行该规则。

ESLint 支持三个严重性级别：

- `"off"`（`0`）：不运行规则。
- `"warn"`（`1`）：运行规则，但不会因规则产生的违规而以非零状态码退出（[`--max-warnings` 标志](../command-line-interface#--max-warnings)除外）
- `"error"`（`2`）：运行规则；如果规则产生任何违规，则以非零状态码退出

有关配置规则的文档，请参阅[配置规则](../configure/rules)。

<a id="shareable-config-configuration"></a>

### 可共享配置

提供预定义[配置文件](#config-file-configuration-file)配置的模块。

可共享配置可以设置与配置文件相同的各类信息，包括[插件](#plugin)和[规则](#rule)。

可共享配置通常与[插件](#plugin)一起提供。许多插件都会提供名为 _"recommended"_ 等的配置，启用它们建议作为起点的一组规则。例如，[`eslint-plugin-solid`](https://github.com/solidjs-community/eslint-plugin-solid)提供了一份可共享的推荐配置：

```js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/recommended";

export default defineConfig([js.configs.recommended, solid]);
```

有关可共享配置的信息，请参阅[共享配置](../../extend/shareable-configs)。

<a id="static-analysis"></a>

### 静态分析

不构建或运行源代码而对其进行分析的过程。

ESLint 等[代码检查器](#linter)、[格式化器](#formatter-tool)和[类型检查器](#type-checker)都是静态分析工具。

静态分析不同于_动态_分析。动态分析是在源代码构建并执行后对其进行评估的过程。单元测试、集成测试和端到端测试都是常见的动态分析示例。

<a id="stylistic-rule"></a>

### 风格规则

用于强制执行偏好而非解决逻辑问题的规则。
风格方面的问题包括[格式化规则](#formatting-rule)、命名约定，以及在等效语法之间保持一致的选择。

ESLint 内置的风格规则已冻结功能：除支持新的 ECMAScript 版本外，不会再获得新功能。

更多信息请参阅[规则策略的变更](https://eslint.org/blog/2020/05/changes-to-rules-policies)和[格式化规则弃用公告](https://eslint.org/blog/2023/10/deprecating-formatting-rules)。

<a id="suggestion"></a>

### 建议

对[规则](#rule)[违规](#violation)的可选补充，描述可以如何手动调整代码以解决该违规。

建议通常不适合自动应用，因为它们会改变代码行为。ESLint 不会直接应用建议，但会将建议提供给集成工具，由这些工具决定是否应用（例如编辑器扩展）。

规则违规也可能包含安全且可以自动应用的文件更改，这类更改以[修复](#fix)的形式提供。

## T

<a id="type-checker"></a>

### 类型检查器

一种[静态分析](#static-analysis)工具，能够全面理解项目中的代码结构和数据形态。

类型检查器通常比代码检查器更慢，但分析也更全面。代码检查器传统上一次只处理单个文件或代码片段的 [AST](#abstract-syntax-tree-ast)，而类型检查器能够理解跨文件依赖关系和类型。

[TypeScript](https://typescriptlang.org) 是 JavaScript 最常用的类型检查器。[typescript-eslint](https://typescript-eslint.io) 项目提供了集成，使代码检查规则能够使用类型检查器。

## V

<a id="violation"></a>

### 违规

[规则](#rule)指出某段代码不符合该规则预期时所产生的提示。

规则违规会指出源代码中的范围，并附带解释违规情况的错误消息。违规还可以选择包含[修复](#fix)和/或[建议](#suggestion)，说明如何改进违反规则的代码。