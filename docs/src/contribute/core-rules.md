---
title: 为核心规则做贡献
eleventyNavigation:
    key: contribute core rule
    parent: contribute to eslint
    title: 为核心规则做贡献
    order: 12
---

ESLint 核心规则是包含在 ESLint 包中的规则。

<a id="rule-writing-documentation"></a>

## 规则编写文档

如需了解编写规则的完整参考信息，请参阅[自定义规则](../extend/custom-rules)。自定义规则和核心规则使用相同的 API。核心规则与自定义规则的主要区别如下：

1. 核心规则包含在 `eslint` 包中。
1. 核心规则必须遵循本页介绍的约定。

<a id="file-structure"></a>

## 文件结构

ESLint 中的每条核心规则都有三个以其标识符命名的文件（例如 `no-extra-semi`）。

- 在 `lib/rules` 目录中：源文件（例如 `no-extra-semi.js`）。
- 在 `tests/lib/rules` 目录中：测试文件（例如 `no-extra-semi.js`）。
- 在 `docs/src/rules` 目录中：Markdown 文档文件（例如 `no-extra-semi.md`）。

**重要：** 如果你向 ESLint 仓库提交核心规则，**必须**遵循下述约定。

下面是规则源文件的基本格式：

```js
/**
 * @fileoverview Rule to disallow unnecessary semicolons
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('../types').Rule.RuleModule} */
module.exports = {
	meta: {
		type: "suggestion",

		docs: {
			description: "disallow unnecessary semicolons",
			recommended: true,
			url: "https://eslint.org/docs/rules/no-extra-semi",
		},
		fixable: "code",
		schema: [], // no options
	},
	create: function (context) {
		return {
			// callback functions
		};
	},
};
```

<a id="rule-unit-tests"></a>

## 规则单元测试

每条打包在 ESLint 核心中的规则都必须随附一组单元测试，才能被接受。测试文件与源文件同名，但位于 `tests/lib/` 目录中。例如，如果规则源文件是 `lib/rules/foo.js`，那么测试文件应为 `tests/lib/rules/foo.js`。

ESLint 提供了 [`RuleTester`](../integrate/nodejs-api#ruletester) 工具，方便为规则编写测试。

<a id="performance-testing"></a>

## 性能测试

为了确保代码检查过程高效且不会造成干扰，验证新规则或对现有规则进行修改所带来的性能影响很有帮助。

如需了解如何分析单条规则的性能，请参阅自定义规则文档中的[分析规则性能](../extend/custom-rules#profile-rule-performance)。

在 ESLint 核心仓库中开发时，`npm run perf` 命令可以概览启用所有核心规则时 ESLint 的运行时间。

```bash
$ git checkout main
Switched to branch 'main'

$ npm run perf
CPU Speed is 2200 with multiplier 7500000
Performance Run #1:  1394.689313ms
Performance Run #2:  1423.295351ms
Performance Run #3:  1385.09515ms
Performance Run #4:  1382.406982ms
Performance Run #5:  1409.68566ms
Performance budget ok:  1394.689313ms (limit: 3409.090909090909ms)

$ git checkout my-rule-branch
Switched to branch 'my-rule-branch'

$ npm run perf
CPU Speed is 2200 with multiplier 7500000
Performance Run #1:  1443.736547ms
Performance Run #2:  1419.193291ms
Performance Run #3:  1436.018228ms
Performance Run #4:  1473.605485ms
Performance Run #5:  1457.455283ms
Performance budget ok:  1443.736547ms (limit: 3409.090909090909ms)
```

<a id="rule-naming-conventions"></a>

## 规则命名约定

ESLint 的规则命名约定如下：

- 单词之间使用连字符。
- 如果规则只用于禁止某项内容，请使用 `no-` 作为前缀，例如，禁止使用 `eval()` 的规则命名为 `no-eval`，禁止使用 `debugger` 的规则命名为 `no-debugger`。
- 如果规则用于强制包含某项内容，请使用不带特殊前缀的简短名称。

<a id="frozen-rules"></a>

## 冻结规则

规则功能完备后会被标记为冻结（在文档中以 ❄️ 表示）。当规则的预期用途已得到完整实现，能够捕获 80% 或更多的预期违规，并涵盖大多数常见例外情况时，我们便认为该规则功能完备。此后，如果用户遇到未涵盖的边缘情况，我们希望他们使用[禁用注释](../use/configure/rules#use-configuration-comments-1)。

规则被冻结意味着：

- **错误修复**：我们仍会修复已确认的错误。
- **新的 ECMAScript 特性**：我们会确保与新的 ECMAScript 特性兼容，也就是说，规则不会因新语法而失效。
- **TypeScript 支持**：我们会确保与 TypeScript 语法兼容，也就是说，规则不会因 TypeScript 语法而失效，并且对 TypeScript 的违规判定是恰当的。
- **新选项**：我们**不会**添加任何新选项，除非某个选项是修复错误或支持新添加的 ECMAScript 特性的唯一方法。

如果你认为修改冻结规则能更好地满足需求，我们建议复制该规则的源代码，并根据需要进行修改。
