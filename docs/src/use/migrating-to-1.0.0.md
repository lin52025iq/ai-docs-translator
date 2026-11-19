---
title: 迁移到 v1.0.0
---

ESLint v1.0.0 是首个主要版本。因此，ESLint 在 0.x 版本生命周期中的运行方式与今后的运行方式之间存在一些重大变化。这些变化直接源于 ESLint 用户社区的反馈，在制定时也充分考虑了升级路径。我们相信，这些变化会让 ESLint 变得更好。虽然升级需要做一些工作，但我们希望升级过程中的不便足够小，让你能切实感受到升级的好处。

<a id="all-rules-off-by-default"></a>

## 默认关闭所有规则

v1.0.0 中最重要的变化是默认关闭所有规则。我们作出这一改变，是因为许多人要求能够在配置文件中关闭默认规则。虽然从技术上讲无法实现这一点，但可以默认关闭所有规则，然后使用 `extends` 在配置文件中重新启用规则。因此，我们将 `--reset` 的行为设为默认行为，并移除了这个命令行选项。

使用 `--init` 时，你的配置文件会自动包含以下内容：

```json
{
	"extends": "eslint:recommended"
}
```

此设置模拟了 0.x 中的部分默认行为，但并非全部。如果你不想使用任何推荐规则，可以删除这一行。

**应采取的措施：**如果你目前在使用 `--reset`，请停止在命令行中传入 `--reset`；无需进行其他更改。如果你没有使用 `--reset`，则应检查配置，确定哪些规则应默认启用。你可以在配置文件中添加以下内容，部分恢复默认行为：

`"eslint:recommended"` 配置包含了许多与 0.x 相同的默认规则设置，但并非全部。这些规则现在不再默认启用，因此你应检查设置，确保其仍符合预期：

- [no-alert](../rules/no-alert)
- [no-array-constructor](../rules/no-array-constructor)
- [no-caller](../rules/no-caller)
- [no-catch-shadow](../rules/no-catch-shadow)
- [no-empty-label](../rules/no-empty-label)
- [no-eval](../rules/no-eval)
- [no-extend-native](../rules/no-extend-native)
- [no-extra-bind](../rules/no-extra-bind)
- [no-extra-strict](../rules/no-extra-strict)
- [no-implied-eval](../rules/no-implied-eval)
- [no-iterator](../rules/no-iterator)
- [no-label-var](../rules/no-label-var)
- [no-labels](../rules/no-labels)
- [no-lone-blocks](../rules/no-lone-blocks)
- [no-loop-func](../rules/no-loop-func)
- [no-multi-spaces](../rules/no-multi-spaces)
- [no-multi-str](../rules/no-multi-str)
- [no-native-reassign](../rules/no-native-reassign)
- [no-new](../rules/no-new)
- [no-new-func](../rules/no-new-func)
- [no-new-object](../rules/no-new-object)
- [no-new-wrappers](../rules/no-new-wrappers)
- [no-octal-escape](../rules/no-octal-escape)
- [no-process-exit](../rules/no-process-exit)
- [no-proto](../rules/no-proto)
- [no-return-assign](../rules/no-return-assign)
- [no-script-url](../rules/no-script-url)
- [no-sequences](../rules/no-sequences)
- [no-shadow](../rules/no-shadow)
- [no-shadow-restricted-names](../rules/no-shadow-restricted-names)
- [no-spaced-func](../rules/no-spaced-func)
- [no-trailing-spaces](../rules/no-trailing-spaces)
- [no-undef-init](../rules/no-undef-init)
- [no-underscore-dangle](../rules/no-underscore-dangle)
- [no-unused-expressions](../rules/no-unused-expressions)
- [no-use-before-define](../rules/no-use-before-define)
- [no-with](../rules/no-with)
- [no-wrap-func](../rules/no-wrap-func)
- [camelcase](../rules/camelcase)
- [comma-spacing](../rules/comma-spacing)
- [consistent-return](../rules/consistent-return)
- [curly](../rules/curly)
- [dot-notation](../rules/dot-notation)
- [eol-last](../rules/eol-last)
- [eqeqeq](../rules/eqeqeq)
- [key-spacing](../rules/key-spacing)
- [new-cap](../rules/new-cap)
- [new-parens](../rules/new-parens)
- [quotes](../rules/quotes)
- [semi](../rules/semi)
- [semi-spacing](../rules/semi-spacing)
- [space-infix-ops](../rules/space-infix-ops)
- [space-return-throw-case](../rules/space-return-throw-case)
- [space-unary-ops](../rules/space-unary-ops)
- [strict](../rules/strict)
- [yoda](../rules/yoda)

另请参阅默认设置变更的[完整差异](https://github.com/eslint/eslint/commit/e3e9dbd9876daf4bdeb4e15f8a76a9d5e6e03e39#diff-b01a5cfd9361ca9280a460fd6bb8edbbL1)。

下面的配置文件与旧默认设置最为接近：

```json
{
	"extends": "eslint:recommended",
	"rules": {
		"no-alert": 2,
		"no-array-constructor": 2,
		"no-caller": 2,
		"no-catch-shadow": 2,
		"no-empty-label": 2,
		"no-eval": 2,
		"no-extend-native": 2,
		"no-extra-bind": 2,
		"no-implied-eval": 2,
		"no-iterator": 2,
		"no-label-var": 2,
		"no-labels": 2,
		"no-lone-blocks": 2,
		"no-loop-func": 2,
		"no-multi-spaces": 2,
		"no-multi-str": 2,
		"no-native-reassign": 2,
		"no-new": 2,
		"no-new-func": 2,
		"no-new-object": 2,
		"no-new-wrappers": 2,
		"no-octal-escape": 2,
		"no-process-exit": 2,
		"no-proto": 2,
		"no-return-assign": 2,
		"no-script-url": 2,
		"no-sequences": 2,
		"no-shadow": 2,
		"no-shadow-restricted-names": 2,
		"no-spaced-func": 2,
		"no-trailing-spaces": 2,
		"no-undef-init": 2,
		"no-underscore-dangle": 2,
		"no-unused-expressions": 2,
		"no-use-before-define": 2,
		"no-with": 2,
		"camelcase": 2,
		"comma-spacing": 2,
		"consistent-return": 2,
		"curly": [2, "all"],
		"dot-notation": [2, { "allowKeywords": true }],
		"eol-last": 2,
		"no-extra-parens": [2, "functions"],
		"eqeqeq": 2,
		"key-spacing": [2, { "beforeColon": false, "afterColon": true }],
		"new-cap": 2,
		"new-parens": 2,
		"quotes": [2, "double"],
		"semi": 2,
		"semi-spacing": [2, { "before": false, "after": true }],
		"space-infix-ops": 2,
		"space-return-throw-case": 2,
		"space-unary-ops": [2, { "words": true, "nonwords": false }],
		"strict": [2, "function"],
		"yoda": [2, "never"]
	}
}
```

<a id="removed-rules"></a>

## 移除的规则

在过去的几个版本中，我们一直在弃用某些规则，并引入新的规则来取代它们。以下列出了已移除的规则及其替代规则：

- [generator-star](../rules/generator-star) 已由 [generator-star-spacing](../rules/generator-star-spacing) 取代
- [global-strict](../rules/global-strict) 已由 [strict](../rules/strict) 取代
- [no-comma-dangle](../rules/no-comma-dangle) 已由 [comma-dangle](../rules/comma-dangle) 取代
- [no-empty-class](../rules/no-empty-class) 已由 [no-empty-character-class](../rules/no-empty-character-class) 取代
- [no-extra-strict](../rules/no-extra-strict) 已由 [strict](../rules/strict) 取代
- [no-reserved-keys](../rules/no-reserved-keys) 已由 [quote-props](../rules/quote-props) 取代
- [no-space-before-semi](../rules/no-space-before-semi) 已由 [semi-spacing](../rules/semi-spacing) 取代
- [no-wrap-func](../rules/no-wrap-func) 已由 [no-extra-parens](../rules/no-extra-parens) 取代
- [space-after-function-name](../rules/space-after-function-name) 已由 [space-before-function-paren](../rules/space-before-function-paren) 取代
- [space-before-function-parentheses](../rules/space-before-function-parentheses) 已由 [space-before-function-paren](../rules/space-before-function-paren) 取代
- [space-in-brackets](../rules/space-in-brackets) 已由[object-curly-spacing](../rules/object-curly-spacing) 和 [array-bracket-spacing](../rules/array-bracket-spacing) 取代
- [space-unary-word-ops](../rules/space-unary-word-ops) 已由 [space-unary-ops](../rules/space-unary-ops) 取代
- [spaced-line-comment](../rules/spaced-line-comment) 已由 [spaced-comment](../rules/spaced-comment) 取代

**应采取的措施：**你需要更新规则配置，以使用新规则。使用已移除规则时，ESLint v1.0.0 也会发出警告，并建议使用替代规则。希望这能让升级过程中的意外情况尽可能少。

<a id="column-numbers-are-1-based"></a>

## 列号从 1 开始计数

从一开始，ESLint 就使用从 0 开始计数的列号报告错误，因为 Esprima 以及后来的 Espree 都是这样报告的。不过，大多数工具和编辑器使用从 1 开始计数的列号，这给 ESLint 的集成带来了一些麻烦。在 v1.0.0 中，我们改用从 1 开始计数的列号报告错误，以与开发者日常使用的工具保持一致。

**应采取的措施：**如果你创建了编辑器集成，或创建了需要修正列号的工具，就需要更新它，使其直接传递 ESLint 提供的列号。除此之外，无需更改。

<a id="no-longer-exporting-cli"></a>

## 不再导出 cli

在 0.x 中，`cli` 对象会导出供外部工具使用。后来，它被弃用，推荐改用 `CLIEngine`。在 v1.0.0 中，我们不再导出 `cli`，因为外部工具不应使用它。这会导致现有的依赖它的工具无法正常工作。

**应采取的措施：**如果你正在使用导出的 `cli` 对象，请改用 `CLIEngine`。

<a id="deprecating-eslint-tester"></a>

## 弃用 eslint-tester

长期以来，`eslint-tester` 模块一直是测试 ESLint 规则的主要工具，现在已移入 `eslint` 模块。这是因为这两个模块之间的依赖关系较为复杂，导致循环依赖，并给规则测试带来了许多问题。将测试工具移入 `eslint` 模块解决了其中的许多问题。

`eslint-tester` 的替代品名为 `RuleTester`。它是 `ESLintTester` 的简化版本，旨在适用于任何测试框架。该对象由此软件包提供。

**应采取的措施：**将所有规则测试改为使用 `RuleTester`。如果你有如下使用 `ESLintTester` 的测试：

```js
var eslint = require("../../../lib/eslint"),
	ESLintTester = require("eslint-tester");

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/your-rule", {
	valid: [],
	invalid: [],
});
```

那么可以改成：

```js
var rule = require("../../../lib/rules/your-rule"),
	RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("your-rule", rule, {
	valid: [],
	invalid: [],
});
```
