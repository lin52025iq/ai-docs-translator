---
title: 迁移到 v10.x
eleventyNavigation:
    key: migrate to v10
    parent: use eslint
    title: 迁移到 v10.x
    order: 9
---

ESLint v10.0.0 是 ESLint 的一个重大版本，包含多项需要注意的重大变更。本指南将带你了解这些变更。

为帮助完成迁移，ESLint 提供了迁移 codemod，可自动处理本指南中介绍的许多变更。所有官方 ESLint codemod 均可在 [eslint/codemods](https://github.com/eslint/codemods) 仓库和 [Codemod Registry](https://app.codemod.com/registry?q=scope%3Aeslint) 中找到。

## 使用迁移 codemod

`@eslint/v9-to-v10` codemod 可将 ESLint 项目从 v9 升级到 v10。它包含四个也可以单独运行的 codemod：

- `@eslint/v9-to-v10-config`：移除旧版环境变量和 CLI 标志
- `@eslint/v9-to-v10-custom-rules`：替换已移除的 `context` 和 `SourceCode` 方法
- `@eslint/v9-to-v10-ruletester`：清理 `RuleTester` 测试用例
- `@eslint/v9-to-v10-linter-api`：修正 `Linter`/`ESLint` API 的用法

```shell
npx codemod @eslint/v9-to-v10
```

了解详情，请参阅 [Codemod Registry](https://app.codemod.com/registry?q=scope%3Aeslint)。

Codemod 只是迁移的起点。请检查变更，并参阅下文的重大变更，了解 codemod 未涵盖的内容。

下方列表大致按各项变更预计影响的用户数量排序，排在前面的预计影响最多用户。

## 目录

### 面向用户的重大变更

- [不再支持 Node.js < v20.19、v21、v23](#drop-old-node)
- [`eslint:recommended` 已更新](#eslint-recommended)
- [新的配置文件查找算法](#config-lookup-from-file)
- [不再支持旧版配置格式](#remove-eslintrc)
- [现在会跟踪 JSX 引用](#jsx-reference-tracking)
- [`eslint-env` 注释会作为错误报告](#eslint-env-comments)
- [不再支持 Jiti < v2.2.0](#drop-old-jiti)
- [glob 模式中的 POSIX 字符类](#posix-character-classes)
- [`stylish` 格式化器现在使用原生 `styleText` 而非 `chalk`](#stylish-formatter)
- [`radix` 规则的已弃用选项](#radix)
- [`no-shadow-restricted-names` 现在默认报告 `globalThis`](#no-shadow-restricted-names)
- [`func-names` 的 schema 更严格](#func-names)
- [`no-invalid-regexp` 的 `allowConstructorFlags` 选项现在只接受不重复的项](#no-invalid-regexp)
- [ESLint 核心配置中新增 `name` 属性](#eslint-config-name)

### 面向插件开发者的重大变更

- [不再支持 Node.js < v20.19、v21、v23](#drop-old-node)
- [不再支持旧版配置格式](#remove-eslintrc)
- [现在会跟踪 JSX 引用](#jsx-reference-tracking)
- [移除无效 `RuleTester` 用例错误中的 `type` 属性](#ruletester-type-removed)
- [`Program` AST 节点范围现在涵盖整个源文本](#program-node-range)
- [Fixer 方法现在要求 `text` 参数为字符串](#fixer-text-must-be-string)
- [`ScopeManager` 实现的新要求](#scope-manager)
- [移除已弃用的 `context` 成员](#rule-context)
- [移除已弃用的 `SourceCode` 方法](#sourcecode-methods-removed)
- [禁止在有效的 RuleTester 测试用例中使用 `errors` 或 `output`](#stricter-rule-tester)
- [glob 模式中的 POSIX 字符类](#posix-character-classes)

### 面向集成开发者的重大变更

- [不再支持 Node.js < v20.19、v21、v23](#drop-old-node)
- [新的配置文件查找算法](#config-lookup-from-file)
- [不再支持旧版配置格式](#remove-eslintrc)
- [移除 `LintMessage` 对象中的 `nodeType` 属性](#lintmessage-nodetype-removed)
- [glob 模式中的 POSIX 字符类](#posix-character-classes)

---

## <a name="drop-old-node"></a> 不再支持 Node.js < v20.19、v21、v23

从 ESLint v10.0.0 开始，ESLint 正式停止支持这些版本的 Node.js。ESLint 现在支持以下 Node.js 版本：

- Node.js v20.19.0 及以上版本
- Node.js v22.13.0 及以上版本
- Node.js v24 及以上版本

**应对方法：** 使用 ESLint v10.0.0 时，请确保升级到至少 Node.js v20.19.0。还需特别确认通过编辑器集成使用 ESLint 时，编辑器所支持的 Node.js 版本。如果无法升级，建议继续使用 ESLint v9，直到能够升级 Node.js。

**相关 issue：** [#19969](https://github.com/eslint/eslint/issues/19969)

## <a name="eslint-recommended"></a> `eslint:recommended` 已更新

`eslint:recommended` 中启用了三条新规则：

- [`no-unassigned-vars`](../rules/no-unassigned-vars)
- [`no-useless-assignment`](../rules/no-useless-assignment)
- [`preserve-caught-error`](../rules/preserve-caught-error)

**应对方法：** 修复错误或禁用这些规则。

**相关 issue：** [#19966](https://github.com/eslint/eslint/issues/19966)

## <a name="config-lookup-from-file"></a> 新的配置文件查找算法

在 ESLint v9 中，可以通过 `v10_config_lookup_from_file` 功能标志启用另一种配置查找行为。该行为会从每个待检查文件所在的目录开始，向上搜索到文件系统根目录，以查找 `eslint.config.*`。在 ESLint v10.0.0 中，这种行为现已成为默认行为，`v10_config_lookup_from_file` 标志也已移除。尝试使用此标志现在会导致错误。

**Codemod：** 使用 [@eslint/v9-to-v10-config](#use-migration-codemods) codemod，从设置中移除旧版标志。

**应对方法：**

- 手动移除旧版标志：
    - CLI：移除 `--flag v10_config_lookup_from_file`。
    - 环境：从 `ESLINT_FLAGS` 中移除 `v10_config_lookup_from_file`。
    - API：从传递给 `new ESLint()` 或 `new Linter()` 的 `flags` 数组中移除 `"v10_config_lookup_from_file"`。
- 如果你依赖此前基于当前工作目录（cwd）的查找行为，请使用 `--config path/to/eslint.config.js` 提供明确的配置路径。

**相关 issue：** [RFC120](https://github.com/eslint/rfcs/tree/main/designs/2024-config-lookup-from-file)、[#19967](https://github.com/eslint/eslint/issues/19967)

## <a name="remove-eslintrc"></a> 不再支持旧版配置格式

ESLint v9 引入了基于 `eslint.config.js` 文件的[新默认配置格式](./configure/configuration-files)。在 v9 中，仍可将 `ESLINT_USE_FLAT_CONFIG` 环境变量设为 `false`，以启用使用 `.eslintrc` 或 `.eslintrc.json` 的旧版格式。

从 ESLint v10.0.0 开始，不再支持旧版配置格式。

**Codemod：** 使用 [@eslint/v9-to-v10](#use-migration-codemods) codemod 自动完成大部分迁移。使用 [@eslint/v9-to-v10-linter-api](#use-migration-codemods) codemod 更新已弃用的 `FlatESLint` 和 `LegacyESLint` 用法。

**应对方法：**

- 或者按照[配置迁移指南](./configure/migration-guide)中的说明操作。
- 请注意，已弃用的 API `FlatESLint` 和 `LegacyESLint` 已被移除。请始终改用 `ESLint`。
- `Linter` 类的 `configType` 选项不再能设为 `"eslintrc"`。移除该选项即可使用新的配置格式。

**相关 issue：** [#13481](https://github.com/eslint/eslint/issues/13481)

## <a name="jsx-reference-tracking"></a> 现在会跟踪 JSX 引用

ESLint v10.0.0 现在会跟踪 JSX 引用，从而能够正确分析 JSX 元素的作用域。

以前，ESLint 不会跟踪由 JSX 标识符创建的引用，这可能导致依赖作用域信息的规则产生不正确的结果。例如：

```jsx
import { Card } from "./card.jsx";

export function createCard(name) {
	return <Card name={name} />;
}
```

在 v10.0.0 之前，ESLint 无法识别 `<Card>` 是对导入的 `Card` 的引用，这可能导致误报，例如报告 `Card`“已定义但从未使用”（[`no-unused-vars`](../rules/no-unused-vars)）；如果移除了导入，也可能导致漏报，例如未能报告 `Card` 未定义（[`no-undef`](../rules/no-undef)）。从 v10.0.0 开始，`<Card>` 会被视为对作用域中变量的普通引用。这使 JSX 的处理方式符合开发者的预期，并改善了使用 JSX 的现代 JavaScript 应用的代码检查体验。

**应对方法：**

- 对于用户：
    - 含有 JSX 的文件中可能会出现新的代码检查报告。请相应地更新代码，或在需要时调整规则配置。
    - 过去为解决 ESLint 不跟踪 JSX 引用的问题而使用的规则（例如 [`@eslint-react/jsx-uses-vars`](https://www.eslint-react.xyz/docs/rules/jsx-uses-vars)）已不再需要。请从配置中移除或禁用这些规则。
- 对于插件开发者：依赖作用域分析的自定义规则现在可能会遇到 `JSXIdentifier` 引用。请更新规则以正确处理这些引用。

**相关 issue：** [#19495](https://github.com/eslint/eslint/issues/19495)

## <a name="eslint-env-comments"></a> `eslint-env` 注释会作为错误报告

在现已过时的 ESLint v8 配置系统中，可以使用 `/* eslint-env */` 注释为文件定义全局变量。当前配置系统不支持此类注释，从 ESLint v10.0.0 开始，代码检查时会将其作为错误报告。

```text
error: /* eslint-env */ comments are no longer supported at file.js:1:1:
> 1 | /* eslint-env node -- Used in Node.js */
    | ^
```

**应对方法：** 从代码中移除所有 `eslint-env` 注释。如果你仍在使用旧版配置系统并需要迁移帮助，请参阅[迁移指南](./configure/migration-guide#eslint-env-configuration-comments)。

**相关 issue：** [#13481](https://github.com/eslint/eslint/issues/13481)

## <a name="drop-old-jiti"></a> 不再支持 Jiti < v2.2.0

ESLint 正式停止支持低于 v2.2.0 的 `jiti` 版本。

**应对方法：** 如果你的配置文件使用 `TypeScript` 编写，并且安装的是 `jiti` v2.1.2 或更早版本，请确保在使用 ESLint v10.0.0 时将其更新到至少 `2.2.0`。

**相关 issue：** [#19765](https://github.com/eslint/eslint/issues/19765)

## <a name="posix-character-classes"></a> glob 模式中的 POSIX 字符类

ESLint v10.0.0 使用最新版 [minimatch](https://github.com/isaacs/minimatch)，该版本支持方括号表达式中的 [POSIX 字符类](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)。ESLint 依赖 minimatch 将文件名与 glob 模式进行匹配，例如配置中的 `files`、`ignores` 和 `globalIgnores()` 所定义的模式，或通过 CLI 传入的模式。

例如，现在可以运行以下命令，对所有名称以大写字母开头的 `.js` 文件执行代码检查：

```shell
npx eslint "**/[[:upper:]]*.js"
```

这里的 `[[:upper:]]` 是一个 POSIX 字符类，可以匹配不同字母表中的大写字母。

**应对方法：** 如果配置、CLI 参数或 Node.js API 调用中的 glob 模式看起来包含 POSIX 字符类，请确认它们能按预期匹配文件。

**相关 issue：** [eslint/rewrite#66](https://github.com/eslint/rewrite/issues/66)

## <a name="stylish-formatter"></a> `stylish` 格式化器现在使用原生 `styleText` 而非 `chalk`

从 ESLint v10.0.0 开始，内置的 [`stylish`](./formatters#stylish) 格式化器不再依赖第三方 [`chalk`](https://github.com/chalk/chalk) 库来生成彩色输出，而是改用 Node.js 原生的 [`styleText`](https://nodejs.org/api/util.html#utilstyletextformat-text-options) API。这会带来两项有关如何确定是否使用彩色输出的重大变更：

1. 首先，`styleText` 在确定是否禁用彩色输出时会检查更多环境变量，并遵循 Node.js 自身启用或禁用颜色的规则。这意味着它支持的环境变量和终端功能比 ESLint 以前基于 `chalk` 的逻辑更多。例如：
    - [`NO_COLOR`](https://nodejs.org/api/cli.html#no_colorany) 现在会在遵循此约定的工具中一致地禁用颜色。
    - [`NODE_DISABLE_COLORS`](https://nodejs.org/api/cli.html#node_disable_colors1) 也会生效，使 ESLint 的行为与 Node.js 本身保持一致。

    请注意，仍然可以使用 [`FORCE_COLOR`](https://nodejs.org/api/cli.html#force_color1-2-3) 环境变量强制启用颜色。

2. 其次，在确定是否使用彩色输出时，CLI 标志 `--color` 和 `--no-color` 现在的优先级高于环境变量。这项变更确保优先采用用户通过 CLI 标志明确指定的偏好。不过，如果没有提供这两个标志中的任何一个，仍会像以前一样考虑环境变量。

**应对方法：**

- 检查与终端颜色有关的环境配置（例如 CI 默认设置或 shell 配置文件）。如果升级到 v10.0.0 后 ESLint 输出不再带颜色，请检查环境中是否设置了 `NO_COLOR`、`NODE_DISABLE_COLORS` 或类似选项。
- 如果你依赖混合设置（例如使用 `--color` 标志，同时设置 `NO_COLOR` 环境变量），请注意现在 CLI 标志的优先级更高，并据此调整设置。

**相关 issue：** [#20012](https://github.com/eslint/eslint/issues/20012)

## <a name="radix"></a> `radix` 规则的已弃用选项

从 ESLint v10.0.0 开始，[`radix`](../rules/radix) 规则的字符串选项 `"always"` 和 `"as-needed"` 已弃用。设置这两个选项中的任意一个都不会改变规则的行为；该规则现在始终要求提供基数，就像指定了 `"always"`（默认值）选项时一样。由于默认基数取决于 `parseInt()` 的第一个参数，因此该规则会假定始终需要第二个参数（基数）。

此规则的默认行为没有变化。

**应对方法：**

- 如果使用此规则时未指定任何选项，则无需采取任何措施。
- 如果明确指定了 `"always"` 选项，请移除该选项。规则行为将保持不变。
- 如果使用 `"as-needed"` 选项，请移除该选项，并更新代码，使其始终为 `parseInt()` 函数提供第二个参数。或者，也可以禁用此规则。

**相关 issue：** [#19916](https://github.com/eslint/eslint/issues/19916)

## <a name="no-shadow-restricted-names"></a> `no-shadow-restricted-names` 现在默认报告 `globalThis`

在 ESLint v10.0.0 中，[`no-shadow-restricted-names`](../rules/no-shadow-restricted-names) 规则现在默认将 `globalThis` 视为受限名称。因此，`reportGlobalThis` 选项现在默认值为 `true`（以前为 `false`）。这样一来，`const globalThis = "foo";` 或 `function globalThis() {}` 之类的声明现在会默认被报告。

**应对方法：**

- 重命名名为 `globalThis` 的局部标识符，以避免遮蔽全局变量。
- 或者通过显式配置规则来恢复以前的行为：

```json
{
	"rules": {
		"no-shadow-restricted-names": ["error", { "reportGlobalThis": false }]
	}
}
```

**相关 issue：** [#19673](https://github.com/eslint/eslint/issues/19673)

## <a name="func-names"></a> `func-names` 的 schema 更严格

在 ESLint v10.0.0 中，[`func-names`](../rules/func-names) 规则的 schema 现在不允许选项数组中包含额外项。以前，包含超出允许选项范围的额外数组元素的配置会被接受，但这些元素会被忽略。现在，此类配置会被视为无效。

例如，下面的配置因多出了元素 `"foo"` 而无效：

```js
/*eslint func-names: ["error", "always", { "generators": "never" }, "foo"]*/
```

**应对方法：**

- 从 `func-names` 配置中移除多余的数组元素，使配置仅包含：
    - 一个基础字符串选项：`"always" | "as-needed" | "never"`；以及
    - 可选的对象选项：`{ "generators": "always" | "as-needed" | "never" }`。

**相关 issue：** [#20134](https://github.com/eslint/eslint/issues/20134)

## <a name="no-invalid-regexp"></a> `no-invalid-regexp` 的 `allowConstructorFlags` 选项现在只接受不重复的项

在 ESLint v10.0.0 中，`no-invalid-regexp` 的 `allowConstructorFlags` 选项不再接受重复的标志作为输入。以前，数组中含有重复标志的配置会被接受，但其处理结果与只包含唯一标志相同。现在，此类配置会被视为无效，并导致配置错误。

例如，下面的配置因 `"u"` 标志重复而无效：

```js
/*eslint no-invalid-regexp: ["error", { "allowConstructorFlags": ["u", "y", "u"] }]*/
```

**应对方法：** 从 `no-invalid-regexp` 规则的 `allowConstructorFlags` 数组配置中移除重复的标志。每个标志在数组中只能出现一次。

**相关 issue：** [#18755](https://github.com/eslint/eslint/issues/18755)

## <a name="eslint-config-name"></a> ESLint 核心配置中新增 `name` 属性

在 ESLint v10.0.0 中，`@eslint/js` 导出的 ESLint 核心配置恢复了 `name` 属性。由于与旧版 eslintrc 配置系统不兼容，这个属性以前曾被移除。现在 eslintrc 已不再受支持，因此 `name` 属性得以恢复。

大多数用户无需为此采取任何措施。不过，如果你使用 `@eslint/js` v10.x 和 `@eslint/eslintrc` 中的 `FlatCompat` 工具，应将 `@eslint/eslintrc` 升级到最新版本，以确保兼容性。

**应对方法：** 如果你使用 `FlatCompat`，请将 `@eslint/eslintrc` 升级到最新版本。

**相关 issue：** [#19864](https://github.com/eslint/eslint/issues/19864)

## <a name="ruletester-type-removed"></a> 移除无效 `RuleTester` 用例错误中的 `type` 属性

在 ESLint v10.0.0 中，规则无效测试用例错误中已弃用的 `type` 属性已被移除。现在，在测试用例中使用 `type` 属性会抛出错误。

**Codemod：** 使用 [@eslint/v9-to-v10-ruletester](#use-migration-codemods) codemod 自动完成此项变更。

**应对方法：** 手动从无效测试用例的错误对象中移除 `type` 属性。

**相关 issue：** [#19029](https://github.com/eslint/eslint/issues/19029)

## <a name="program-node-range"></a> `Program` AST 节点范围现在涵盖整个源文本

ESLint v10.0.0 更改了 `Program` AST 节点范围的计算方式：现在其范围涵盖整个源文本，包括所有前置和尾随注释及空白。

以前，`Program` 节点的范围不包括前置和尾随注释或空白，这可能不太直观。例如：

```js
// Leading comment
const x = 1;
// Trailing comment
```

在 ESLint v9 及更早版本中，`Program.range` 只涵盖 `const x = 1;`（不包括周围的注释和空白）。

从 ESLint v10.0.0 开始，`Program.range` 涵盖整个源文本，包括前置和尾随注释及空白。

**应对方法：**

- 对于规则和插件作者：如果代码依赖以前的 `Program.range` 行为，或依赖假定该行为的 `SourceCode` 方法（例如使用 `sourceCode.getCommentsBefore(programNode)` 获取所有前置注释），请更新逻辑。如果代码在 `Program` 节点上报告问题，请改为在 `Program` 节点中的第一个语句上报告，即 `node.body[0] ?? node`，以确保指令 `/* eslint-disable your-rule */` 仍能生效。
- 对于自定义解析器：设置 `Program.range`，使其涵盖整个源文本（通常为 `[0, code.length]`）。

**相关 issue：** [eslint/js#648](https://github.com/eslint/js/issues/648)

## <a name="fixer-text-must-be-string"></a> Fixer 方法现在要求 `text` 参数为字符串

在 ESLint v10.0.0 中，所有接受 `text` 参数的规则 fixer 方法现在都要求该参数为字符串。传入非字符串值会抛出 `TypeError`。

受影响的方法：

- `insertTextBefore(nodeOrToken, text)`
- `insertTextBeforeRange(range, text)`
- `insertTextAfter(nodeOrToken, text)`
- `insertTextAfterRange(range, text)`
- `replaceText(nodeOrToken, text)`
- `replaceTextRange(range, text)`

**应对方法：** 确保传递给 fixer 方法的 `text` 值是字符串。

**相关 issue：** [#18807](https://github.com/eslint/eslint/issues/18807)

## <a name="scope-manager"></a> `ScopeManager` 实现的新要求

在 ESLint v10.0.0 中，自定义 `ScopeManager` 实现必须自动解析对代码中声明的全局变量的引用，包括 `var` 和 `function` 声明；并提供实例方法 `addGlobals(names: string[])`，用于在全局作用域中创建给定名称的变量并解析对它们的引用。

默认的 `ScopeManager` 实现 [`eslint-scope`](https://www.npmjs.com/package/eslint-scope) 已经更新。

此变更不会影响自定义规则。

**应对方法：** 如果你维护的自定义解析器提供了自定义 `ScopeManager` 实现，请更新你的自定义 `ScopeManager` 实现。

**相关 issue：** [eslint/js#665](https://github.com/eslint/js/issues/665)

## <a name="rule-context"></a> 移除已弃用的 `context` 成员

在 ESLint v9.x 中，以下[方法](https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#context-methods-becoming-properties)和[属性](https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#context-properties%3A-parseroptions-and-parserpath-being-removed)已被弃用：

- `context.getCwd()`
- `context.getFilename()`
- `context.getPhysicalFilename()`
- `context.getSourceCode()`
- `context.parserOptions`
- `context.parserPath`

在 ESLint v10.0.0 中，这些成员均已被移除。

**Codemod：** 使用 [@eslint/v9-to-v10-custom-rules](#use-migration-codemods) codemod 自动完成此项变更。

**应对方法：** 在自定义规则中进行以下更改：

| **从 `context` 中移除**        | **`context` 中的替代项**                                         |
| ------------------------------- | -------------------------------------------------------------------- |
| `context.getCwd()`              | `context.cwd`                                                        |
| `context.getFilename()`         | `context.filename`                                                   |
| `context.getPhysicalFilename()` | `context.physicalFilename`                                           |
| `context.getSourceCode()`       | `context.sourceCode`                                                 |
| `context.parserOptions`         | `context.languageOptions` 或 `context.languageOptions.parserOptions` |
| `context.parserPath`            | 无替代项。                                                      |

你可以使用 [`eslint-transforms`](https://www.npmjs.com/package/eslint-transforms) 工具来修改已移除的 `context` 方法。使用方法是先安装该工具，然后运行 `v9-rule-migration` 转换，如下所示：

```shell
# install the utility
npm install eslint-transforms -g

# apply the transform to one file
eslint-transforms v9-rule-migration rule.js

# apply the transform to all files in a directory
eslint-transforms v9-rule-migration rules/
```

已移除的 `context` 属性必须手动修改，因为它们可能没有直接的一对一替代项。

**相关 issue：** [eslint/eslint#16999](https://github.com/eslint/eslint/issues/16999)

## <a name="sourcecode-methods-removed"></a> 移除已弃用的 `SourceCode` 方法

以下已弃用的 `SourceCode` 方法已在 ESLint v10.0.0 中移除：

- `getTokenOrCommentBefore()`
- `getTokenOrCommentAfter()`
- `isSpaceBetweenTokens()`
- `getJSDocComment()`

这些方法已弃用多个主要版本，主要由已弃用的格式化规则和 ESLint 内部工具使用。使用这些方法的自定义规则必须更新为使用现代替代方法。

**Codemod：** 使用 [@eslint/v9-to-v10-custom-rules](#use-migration-codemods) codemod 自动完成此项变更。

**应对方法：** 在自定义规则中进行以下更改：

| **从 `SourceCode` 中移除**                  | **替代项**                                                |
| -------------------------------------------- | -------------------------------------------------------------- |
| `getTokenOrCommentBefore(nodeOrToken, skip)` | `getTokenBefore(nodeOrToken, { includeComments: true, skip })` |
| `getTokenOrCommentAfter(nodeOrToken, skip)`  | `getTokenAfter(nodeOrToken, { includeComments: true, skip })`  |
| `isSpaceBetweenTokens(first, second)`        | `isSpaceBetween(first, second)`                                |
| `getJSDocComment(node)`                      | 无替代项                                                 |

[`@eslint/compat`](https://www.npmjs.com/package/@eslint/compat) 包提供了兼容性补丁，可帮助完成迁移。

**相关 issue：** [#20113](https://github.com/eslint/eslint/issues/20113)

## <a name="stricter-rule-tester"></a> 禁止在有效的 RuleTester 测试用例中使用 `errors` 或 `output`

在 ESLint v10.0.0 中，RuleTester 对测试用例结构的要求更加严格。有效测试用例（即不应产生任何代码检查错误的用例）不再允许包含 `errors` 或 `output` 属性。

​变更内容：​​

- 以前，有效测试用例可以包含 `errors` 或 `output` 属性，但这些属性会被忽略。
- 现在，有效测试用例中包含这些属性会导致测试失败。

无效用法示例：​

```js
// This will now throw an error in ESLint v10.0.0
const validTestCases = [
	{
		code: "const foo = 'bar';",
		errors: 0, // ❌ Not allowed in valid test cases
		output: "const foo = 'bar';", // ❌ Not allowed in valid test cases
	},
];

ruleTester.run("rule-id", rule, { valid: validTestCases, invalid: [] });
```

**Codemod：** 使用 [@eslint/v9-to-v10-ruletester](#use-migration-codemods) codemod 自动完成此项变更。

**应对方法：** 手动从有效测试用例中移除所有 `errors`/`output` 属性。

**相关 issue：** [#18960](https://github.com/eslint/eslint/issues/18960)

## <a name="lintmessage-nodetype-removed"></a> 移除 `LintMessage` 对象中的 `nodeType` 属性

在 ESLint v10.0.0 中，`LintMessage` 对象上已弃用的 `nodeType` 属性已被移除。这会影响 Node.js API 的使用者（例如自定义格式化器以及编辑器/工具集成），尤其是以前依赖 `message.nodeType` 的使用者。

**Codemod：** 使用 [@eslint/v9-to-v10-linter-api](#use-migration-codemods) codemod 自动完成此项变更。

**应对方法：** 手动从集成和格式化器中移除所有 `message.nodeType` 用法。

**相关 issue：** [#19029](https://github.com/eslint/eslint/issues/19029)
