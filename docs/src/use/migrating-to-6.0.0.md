---
title: 迁移到 v6.0.0
---

ESLint v6.0.0 是 ESLint 的一个主要版本。本次发布包含一些破坏性变更。本指南将带你了解这些变更。

下面的列表大致按照每项变更预计影响的用户数量排序，排在前面的项目预计影响的用户最多。

## 面向用户的破坏性变更

1. [不再支持 Node.js 6](#drop-node-6)
1. [`eslint:recommended` 已更新](#eslint-recommended-changes)
1. [插件和可共享配置不再受 ESLint 所在位置的影响](#package-loading-simplification)
1. [默认解析器现在会更严格地验证选项](#espree-validation)
1. [规则配置现在会经过更严格的验证](#rule-config-validating)
1. [`no-redeclare` 规则的默认行为现在更加严格](#no-redeclare-updates)
1. [`comma-dangle` 规则的默认行为现在更加严格](#comma-dangle-updates)
1. [`no-confusing-arrow` 规则的默认行为现在更加宽松](#no-confusing-arrow-updates)
1. [配置文件中的 overrides 现在可以匹配点文件](#overrides-dotfiles)
1. [扩展配置文件中的 overrides 现在可以被父配置文件覆盖](#overrides-precedence)
1. [现在会验证全局变量的配置值](#globals-validation)
1. [已移除弃用的 `experimentalObjectRestSpread` 选项](#experimental-object-rest-spread)
1. [规则选项中用户提供的正则表达式现在会使用 unicode 标志解析](#unicode-regexes)

## 面向插件/自定义规则开发者的破坏性变更

1. [插件作者可能需要更新安装说明](#plugin-documentation)
1. [`RuleTester` 现在会验证规则架构中是否存在无效的 `default` 关键字](#rule-tester-defaults)
1. [`RuleTester` 现在要求 `parser` 选项使用绝对路径](#rule-tester-parser)
1. [已移除 `eslintExplicitGlobalComment` 作用域分析属性](#eslintExplicitGlobalComment)

## 面向集成开发者的破坏性变更

1. [插件和可共享配置不再受 ESLint 所在位置的影响](#package-loading-simplification)
1. [`Linter` 不再尝试从文件系统加载缺失的解析器](#linter-parsers)

---

## <a name="drop-node-6"></a> 不再支持 Node.js 6

截至 2019 年 4 月，Node.js 6 将到达生命周期终止（EOL），不再获得安全更新。因此，我们决定在 ESLint v6 中停止支持它。现在支持以下 Node.js 版本：

- Node.js 8（8.10.0 及以上）
- Node.js 10（10.13.0 及以上）
- Node.js 11.10.1 之后的所有版本

**解决方法：** 使用 ESLint v6 时，请确保升级到至少 Node.js 8。如果无法升级，我们建议继续使用 ESLint v5.x，直到能够升级 Node.js。

**相关问题：** [eslint/eslint#11546](https://github.com/eslint/eslint/issues/11456)

## <a name="eslint-recommended-changes"></a> `eslint:recommended` 已更新

以下规则已添加到 [`eslint:recommended`](../use/configure/configuration-files#use-predefined-configurations) 配置中：

- [`no-async-promise-executor`](../rules/no-async-promise-executor) 禁止将 `async` 函数用作 `Promise` 构造函数的参数，这通常是一个错误。
- [`no-misleading-character-class`](../rules/no-misleading-character-class) 报告正则表达式中可能无法按预期工作的字符类。
- [`no-prototype-builtins`](../rules/no-prototype-builtins) 报告诸如 `foo.hasOwnProperty("bar")` 这样的函数调用（这是常见的错误来源），并建议将其替换为 `Object.prototype.hasOwnProperty.call(foo, "bar")`。
- [`no-shadow-restricted-names`](../rules/no-shadow-restricted-names) 禁止遮蔽 `undefined` 之类的变量（例如，使用 `let undefined = 5;` 这样的代码），因为这可能会让读者感到困惑。
- [`no-useless-catch`](../rules/no-useless-catch) 报告多余的 `catch` 子句；删除这些子句不会改变代码行为。
- [`no-with`](../rules/no-with) 禁止使用 [`with` 语句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)，因为它会使代码难以理解，并导致兼容性问题。
- [`require-atomic-updates`](../rules/require-atomic-updates) 报告在异步函数中重新赋值变量时可能出现的竞态条件错误。

此外，以下规则已从 `eslint:recommended` 中_移除_：

- [`no-console`](../rules/no-console) 禁止调用 `console.log` 之类的函数。虽然这条规则在许多情况下很有用（例如，避免不小心将调试语句留在生产代码中），但它并不像 `eslint:recommended` 中的其他规则那样适用于广泛场景；而且当 `console.log` 可以接受时（例如，在 CLI 应用程序中），它可能会产生误报。

最后，在 ESLint v5 中，`eslint:recommended` 会显式禁用所有不被视为“推荐”的核心规则。如果在其他配置之后加载 `eslint:recommended`，这可能会造成令人困惑的行为，因为 `eslint:recommended` 会关闭一些规则。在 ESLint v6 中，`eslint:recommended` 不会影响非推荐规则。

**解决方法：** 若要模拟 5.x 中 `eslint:recommended` 的行为，可以在配置文件中显式禁用/启用规则，如下所示：

```json
{
	"extends": "eslint:recommended",

	"rules": {
		"no-async-promise-executor": "off",
		"no-misleading-character-class": "off",
		"no-prototype-builtins": "off",
		"no-shadow-restricted-names": "off",
		"no-useless-catch": "off",
		"no-with": "off",
		"require-atomic-updates": "off",

		"no-console": "error"
	}
}
```

在少数情况下（如果你依赖 `eslint:recommended` 禁用核心规则这一旧行为），可能需要禁用其他规则，以恢复之前的行为。

**相关问题：** [eslint/eslint#10768](https://github.com/eslint/eslint/issues/10768)、[eslint/eslint#10873](https://github.com/eslint/eslint/issues/10873)

## <a name="package-loading-simplification"></a> 插件和可共享配置不再受 ESLint 所在位置的影响

以前，ESLint 会相对于 ESLint 包自身所在的位置加载插件。因此，我们曾建议全局安装 ESLint 的用户也全局安装插件，而本地安装 ESLint 的用户则在本地安装插件。然而，由于一个设计缺陷，在某些情况下这种做法会导致 ESLint 随机无法加载插件和可共享配置，尤其是在使用 [`lerna`](https://github.com/lerna/lerna) 和 [Yarn Plug n' Play](https://yarnpkg.com/lang/en/docs/pnp/) 之类的包管理工具时。

一般来说：使用 ESLint v6 时，即使 ESLint 是全局安装的，插件也应始终在本地安装。更准确地说，ESLint v6 默认会相对于最终用户的项目解析插件，并且始终相对于导入可共享配置和解析器的配置文件所在位置来解析它们。

**解决方法：** 如果你全局安装了 ESLint（例如，使用 `npm install eslint --global` 安装），并且还使用了插件，则应在运行 ESLint 的项目中本地安装这些插件。如果你的配置文件扩展了可共享配置和/或解析器，则应确保这些包作为依赖项安装在包含该配置文件的项目中。

如果你使用的配置文件位于本地项目之外（通过 `--config` 标志指定），可以考虑将插件作为该配置文件的依赖项安装，并将 `--resolve-plugins-relative-to` 标志设为该配置文件所在的位置。

**相关问题：** [eslint/eslint#10125](https://github.com/eslint/eslint/issues/10125)、[eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)

## <a name="espree-validation"></a> 默认解析器现在会更严格地验证选项

ESLint 使用的默认解析器 `espree` 现在会在以下情况下报错：

- 解析器选项 `ecmaVersion` 被设为非数字值，例如字符串 `"2015"`。（以前，非数字选项会被直接忽略。）
- 解析器选项 `sourceType: "module"` 被设置，而 `ecmaVersion` 被设为 `5` 或未指定。（以前，设置 `sourceType: "module"` 会隐式地将 `ecmaVersion` 设为至少 2015，这可能会令人意外。）
- `sourceType` 被设为除 `"script"` 或 `"module"` 之外的值。

**解决方法：** 如果你的配置将 `ecmaVersion` 设为非数字值，可以移除 `ecmaVersion`，以恢复以前的行为。（不过，你可能需要仔细确认配置是否确实按预期工作。）如果你的配置设置了 `parserOptions: { sourceType: "module" }`，但没有同时设置 `parserOptions.ecmaVersion`，则应添加 `parserOptions: { ecmaVersion: 2015 }`，以恢复以前的行为。

**相关问题：** [eslint/eslint#9687](https://github.com/eslint/eslint/issues/9687)、[eslint/espree#384](https://github.com/eslint/espree/issues/384)

## <a name="rule-config-validating"></a> 规则配置现在会经过更严格的验证

为了尽早发现配置错误，如果你尝试配置不存在的规则，ESLint v6 会报告代码检查错误。

| 配置                           | ESLint v5     | ESLint v6       |
| ------------------------------ | ------------- | --------------- |
| `/*eslint-enable foo*/`        | 无错误        | 代码检查错误    |
| `/*eslint-disable(-line) foo*/` | 无错误       | 代码检查错误    |
| `/*eslint foo: 0*/`            | 无错误        | 代码检查错误    |
| `{rules: {foo: 0}}`            | 无错误        | 无错误          |
| `{rules: {foo: 1}`             | 代码检查警告  | 代码检查错误    |

**解决方法：** 你可以从（内联）配置中移除不存在的规则。

**相关问题：** [eslint/eslint#9505](https://github.com/eslint/eslint/issues/9505)

## <a name="no-redeclare-updates"></a> `no-redeclare` 规则的默认行为现在更加严格

[`no-redeclare`](../rules/no-redeclare) 规则的默认选项已从 `{ builtinGlobals: false }` 更改为 `{ builtinGlobals: true }`。此外，如果通过 `/* global foo */` 之类的注释启用的全局变量已经通过配置启用，`no-redeclare` 规则现在也会报告错误。

**解决方法：**

要恢复该规则以前的选项，可以按如下方式配置：

```json
{
	"rules": {
		"no-redeclare": ["error", { "builtinGlobals": false }]
	}
}
```

此外，如果代码中的 `global` 注释现在触发了新的错误，应移除这些注释。

**相关问题：** [eslint/eslint#11370](https://github.com/eslint/eslint/issues/11370)、[eslint/eslint#11405](https://github.com/eslint/eslint/issues/11405)

## <a name="comma-dangle-updates"></a> `comma-dangle` 规则的默认行为现在更加严格

以前，除非显式配置该规则检查函数中的逗号，否则 [`comma-dangle`](../rules/comma-dangle) 规则会忽略函数参数列表末尾的逗号。在 ESLint v6 中，函数中的逗号将与其他类型的尾随逗号采用相同的处理方式。

**解决方法：** 可以使用以下配置恢复该规则以前的默认行为：

```json
{
	"rules": {
		"comma-dangle": [
			"error",
			{
				"arrays": "never",
				"objects": "never",
				"imports": "never",
				"exports": "never",
				"functions": "ignore"
			}
		]
	}
}
```

若要恢复类似 `"always-multiline"` 这样的字符串选项以前的行为，请在上面的示例中将 `"never"` 替换为 `"always-multiline"`。

**相关问题：** [eslint/eslint#11502](https://github.com/eslint/eslint/issues/11502)

## <a name="no-confusing-arrow-updates"></a> `no-confusing-arrow` 规则的默认行为现在更加宽松

[`no-confusing-arrow`](../rules/no-confusing-arrow) 规则的默认选项已从 `{ allowParens: false }` 更改为 `{ allowParens: true }`。

**解决方法：** 可以使用以下配置恢复该规则以前的默认行为：

```json
{
	"rules": {
		"no-confusing-arrow": ["error", { "allowParens": false }]
	}
}
```

**相关问题：** [eslint/eslint#11503](https://github.com/eslint/eslint/issues/11503)

## <a name="overrides-dotfiles"></a> 配置文件中的 overrides 现在可以匹配点文件

由于一个错误，配置文件的 `overrides` 部分中 `files` 列表里的 glob 模式始终无法匹配点文件，因此无法让 overrides 应用于以点开头的文件。此错误已在 ESLint v6 中修复。

**解决方法：** 如果你不希望 override 匹配点文件，可以考虑在该 `overrides` 部分中添加类似 `excludedFiles: [".*"]` 的配置。更多详情请参阅[文档](../use/configure#configuration-based-on-glob-patterns)。

**相关问题：** [eslint/eslint#11201](https://github.com/eslint/eslint/issues/11201)

## <a name="overrides-precedence"></a> 扩展配置文件中的 overrides 现在可以被父配置文件覆盖

由于一个错误，以前可共享配置中的 `overrides` 块会优先于父配置的顶层配置。例如，使用以下配置时，即使最终用户的配置显式禁用了 `semi` 规则，该规则最终仍会处于启用状态：

```js
// .eslintrc.js
module.exports = {
	extends: ["foo"],
	rules: {
		semi: "off",
	},
};
```

```js
// eslint-config-foo/index.js
module.exports = {
	overrides: {
		files: ["*.js"],
		rules: {
			semi: "error",
		},
	},
};
```

在 ESLint v6.0.0 中，父配置始终优先于扩展配置，即使存在 `overrides` 块也是如此。

**解决方法：** 我们预计此问题的影响很小，因为大多数可共享配置都不使用 `overrides` 块。不过，如果你使用包含 `overrides` 块的可共享配置，可能会遇到行为变化：这是因为你的配置中某项显式设置此前一直未生效。如果你更愿意继承可共享配置中的行为，只需从自己的配置中移除对应条目即可。（在上面的示例中，移除 `.eslintrc.js` 中的 `semi: "off"` 即可恢复以前的行为。）

**相关问题：** [eslint/eslint#11510](https://github.com/eslint/eslint/issues/11510)

## <a name="globals-validation"></a> 现在会验证全局变量的配置值

以前，使用对象配置一组全局变量时，对象的值可以是任意内容。未知值会被视为与 `"writable"` 相同。

```js
// .eslintrc.js
module.exports = {
	globals: {
		foo: "readonly",
		bar: "writable",
		baz: "hello!", // ???
	},
};
```

经过这项变更后，`globals` 对象中的任何未知值都会导致配置验证错误。

**解决方法：** 如果更新后看到与全局变量相关的配置验证错误，请确保为全局变量配置的所有值都是 `readonly`、`writable` 或 `off`。（为保持兼容性，ESLint 也接受一些替代拼写和变体。）

## <a name="experimental-object-rest-spread"></a> 已移除弃用的 `experimentalObjectRestSpread` 选项

以前，使用默认解析器时，可以通过配置中的 `experimentalObjectRestSpread` 选项启用对象 rest/spread 属性的解析支持：

```json
{
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true
		}
	}
}
```

从 ESLint v5 开始，`ecmaFeatures: { experimentalObjectRestSpread: true }` 的效果就等同于 `ecmaVersion: 2018`，并且还会发出弃用警告。在 ESLint v6 中，`experimentalObjectRestSpread` 功能已被彻底移除，不再产生任何效果。如果你的配置依赖 `experimentalObjectRestSpread` 来启用 ES2018 语法解析，可能会开始看到新语法的解析错误。

**解决方法：** 如果你使用 `experimentalObjectRestSpread` 选项，应将配置改为以下内容：

```json
{
	"parserOptions": {
		"ecmaVersion": 2018
	}
}
```

如果不确定需要更新哪个配置文件，可以运行 ESLint v5，并查看弃用警告中提到的配置文件。

**相关问题：** [eslint/eslint#9990](https://github.com/eslint/eslint/issues/9990)

## <a name="unicode-regexes"></a> 规则选项中用户提供的正则表达式现在会使用 unicode 标志解析

[`max-len`](../rules/max-len) 等规则接受字符串选项，并将其解释为正则表达式。在 ESLint v6.0.0 中，这些正则表达式会使用 [unicode 标志](https://mathiasbynens.be/notes/es6-unicode-regex)进行解释，在匹配超出基本多文种平面的符号等字符时，行为会更加合理。与非 unicode 正则表达式相比，unicode 正则表达式还会更严格地验证转义序列。

**解决方法：** 如果升级后出现规则选项验证错误，请确保规则选项中的所有正则表达式都没有无效的转义序列。

**相关问题：** [eslint/eslint#11423](https://github.com/eslint/eslint/issues/11423)

---

## <a name="plugin-documentation"></a> 插件作者可能需要更新安装说明

如果你维护插件并提供安装说明，应确保安装说明反映[面向用户的插件加载方式变更](#package-loading-simplification)。尤其是，如果你的插件是通过 [`generator-eslint`](https://github.com/eslint/generator-eslint) 包生成的，其中很可能包含了在全局安装 ESLint 时如何使用插件的过时说明。

**相关问题：** [eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)

## <a name="rule-tester-defaults"></a> `RuleTester` 现在会验证规则架构中的 `default` 关键字是否有效

在某些情况下，规则架构可以使用 `default` 关键字自动指定规则选项的默认值。不过，`default` 关键字只在架构的某些位置有效，在其他位置会被忽略。如果规则错误地预期某个默认值会作为规则选项提供，就可能导致错误。在 ESLint v6.0.0 中，如果规则架构中的 `default` 关键字无效，`RuleTester` 将会报错。

**解决方法：** 如果 `RuleTester` 开始报告默认值无效的错误，可以从规则架构中指出的位置移除 `default` 属性；规则的行为不会因此改变。（如果遇到这种情况，也可以检查一下该位置未提供选项值时规则的行为是否正确。）

**相关问题：** [eslint/eslint#11473](https://github.com/eslint/eslint/issues/11473)

## <a name="rule-tester-parser"></a> `RuleTester` 现在要求 `parser` 选项使用绝对路径

在测试中使用自定义解析器时，可以通过 `parser` 属性指定包名或文件路径。不过，如果提供的是包名，就无法确定测试器应从哪里加载解析器包，因为测试器不知道运行测试器的是哪些文件。在 ESLint v6.0.0 中，`RuleTester` 不再允许 `parser` 属性使用包名。

**解决方法：** 如果你在测试用例中通过包名使用 `parser` 属性，请使用 `require.resolve()` 函数将包名解析为该包的绝对路径。

**相关问题：** [eslint/eslint#11728](https://github.com/eslint/eslint/issues/11728)、[eslint/eslint#10125](https://github.com/eslint/eslint/issues/10125)、[eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)

## <a name="eslintExplicitGlobalComment"></a> 已移除 `eslintExplicitGlobalComment` 作用域分析属性

以前，ESLint 会在作用域分析中的 `Variable` 对象上添加 `eslintExplicitGlobalComment` 属性，以指明该变量是由 `/* global */` 注释引入的。此属性没有文档说明，而且 ESLint 团队未能发现 ESLint 核心代码之外有任何地方使用了该属性。该属性已在 ESLint v6 中移除，并替换为 `eslintExplicitGlobalComments` 属性；如果某个变量通过多个 `/* global */` 注释声明，该属性可以包含所有这些注释的列表。

**解决方法：** 如果你维护的规则使用了 `eslintExplicitGlobalComment` 属性，请改为使用列表形式的 `eslintExplicitGlobalComments` 属性。

**相关问题：** [eslint/rfcs#17](https://github.com/eslint/rfcs/pull/17)

---

## <a name="linter-parsers"></a> `Linter` 不再尝试从文件系统加载缺失的解析器

以前，使用尚未定义的解析器进行代码检查时，`Linter` API 会尝试从文件系统加载该解析器。不过，这种行为令人困惑，因为 `Linter` 在其他情况下从不访问文件系统，而且从文件系统加载解析器时也很难确保找到的是正确的解析器。

在 ESLint v6 中，`Linter` 将不再执行任何文件系统操作，包括加载解析器。

**解决方法：** 如果你将 `Linter` 与自定义解析器一起使用，请在检查任何代码之前使用 [`Linter#defineParser`](../integrate/nodejs-api#linterdefineparser) 显式定义该解析器。

**相关问题：** [eslint/rfcs#7](https://github.com/eslint/rfcs/pull/7)
