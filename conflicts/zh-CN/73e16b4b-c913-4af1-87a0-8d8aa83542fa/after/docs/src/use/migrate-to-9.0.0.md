---
title: 迁移到 v9.x
---

ESLint v9.0.0 是一个重大版本，因此包含多项需要注意的破坏性变更。本指南将带你了解这些破坏性变更。

为了帮助完成迁移，ESLint 提供了 codemod，可自动处理本指南中介绍的许多变更。所有官方 ESLint codemod 均可在 [eslint/codemods](https://github.com/eslint/codemods) 仓库和 [Codemod Registry](https://app.codemod.com/registry?q=scope%3Aeslint) 中获取。

<a id="use-migration-codemods"></a>
## 使用迁移 codemod

<a id="migrate-eslint-configuration"></a>
### 迁移 ESLint 配置

`@eslint/v8-to-v9-config` codemod 可将 ESLint v8 配置文件迁移为 ESLint v9 扁平配置格式。它会更新配置结构、规则架构、插件、忽略项和已弃用的 JSDoc 规则，同时尽可能保留现有行为。它还会修改包含 `eslintConfig` 的 `package.json` 条目、`.eslintignore`/`.gitignore` 文件、`/* exported */` 注释以及某些 `/* eslint */` 注释。

```shell
npx codemod @eslint/v8-to-v9-config
```

请参阅 [Codemod Registry](https://app.codemod.com/registry/@eslint/v8-to-v9-config) 了解详情。

<a id="migrate-custom-rules"></a>
### 迁移自定义规则

如果你维护自定义 ESLint 规则，`@eslint/v8-to-v9-custom-rules` codemod 可以将函数式规则转换为对象格式，并将已弃用的规则 API 更新为与 ESLint v9 兼容的等效 API。

::: warning
此工作流会处理 `**/*.js`、`**/*.mjs`、`**/*.cjs`、`**/*.jsx`、`**/*.ts`、`**/*.mts`、`**/*.cts` 和 `**/*.tsx`。请仅对规则文件或目录运行它，因为它可能会错误转换非规则 JavaScript 文件。
:::

```shell
npx codemod @eslint/v8-to-v9-custom-rules
```

请参阅 [Codemod Registry](https://app.codemod.com/registry/@eslint/v8-to-v9-custom-rules) 了解详情。

Codemod 只是迁移的起点。请检查变更，并参考下文的破坏性变更，了解 codemod 未涵盖的内容。

下方列表大致按预计受每项变更影响的用户数量排序，排在前面的预计影响用户最多。

<a id="table-of-contents"></a>
## 目录

<a id="breaking-changes-for-users"></a>
### 对用户的破坏性变更

- [不再支持 Node.js < v18.18 和 v19](#drop-old-node)
- [新的默认配置格式（`eslint.config.js`）](#flat-config)
- [移除了多个格式化程序](#removed-formatters)
- [移除了 `require-jsdoc` 和 `valid-jsdoc` 规则](#remove-jsdoc-rules)
- [`eslint:recommended` 已更新](#eslint-recommended)
- [`--quiet` 不再运行设置为 `"warn"` 的规则](#quiet-warn)
- [`--output-file` 现在即使输出为空也会写入磁盘文件](#output-file)
- [未向 CLI 传入模式时的行为变更](#cli-empty-patterns)
- [仅指定严重级别的 `/* eslint */` 注释现在会保留配置文件中的选项](#eslint-comment-options)
- [现在不允许针对同一规则使用多个 `/* eslint */` 注释](#multiple-eslint-comments)
- [`/* exported */` 的解析更加严格](#exported-parsing)
- [`no-constructor-return` 和 `no-sequences` 的规则架构更加严格](#stricter-rule-schemas)
- [`no-implicit-coercion` 默认会执行新的检查](#no-implicit-coercion)
- [`no-invalid-regexp` 中的标志区分大小写](#no-invalid-regexp)
- [`no-unused-vars` 的 `varsIgnorePattern` 选项不再适用于 catch 参数](#vars-ignore-pattern)
- [`no-restricted-imports` 现在接受多个具有相同 `name` 的配置项](#no-restricted-imports)
- [扁平配置不再接受 `"eslint:recommended"` 和 `"eslint:all"` 字符串](#string-config)
- [`no-inner-declarations` 有了新的默认行为和新选项](#no-inner-declarations)
- [`no-unused-vars` 的 `caughtErrors` 默认值现在为 `"all"`](#no-unused-vars)
- [`no-useless-computed-key` 默认会标记类中不必要的计算属性成员名](#no-useless-computed-key)
- [`camelcase` 的 allow 选项仅接受字符串数组](#camelcase)

<a id="breaking-changes-for-plugin-developers"></a>
### 对插件开发者的破坏性变更

- [不再支持 Node.js < v18.18 和 v19](#drop-old-node)
- [移除了多个 `context` 方法](#removed-context-methods)
- [移除了 `sourceCode.getComments()`](#removed-sourcecode-getcomments)
- [移除了 `CodePath#currentSegments`](#removed-codepath-currentsegments)
- [现在会预先计算代码路径](#codepath-precalc)
- [不再支持函数式规则](#drop-function-style-rules)
- [带选项的规则必须提供 `meta.schema`](#meta-schema-required)
- [`FlatRuleTester` 现在是 `RuleTester`](#flat-rule-tester)
- [`RuleTester` 检查更加严格](#stricter-rule-tester)

<a id="breaking-changes-for-integration-developers"></a>
### 对集成开发者的破坏性变更

- [不再支持 Node.js < v18.18 和 v19](#drop-old-node)
- [`FlatESLint` 现在是 `ESLint`](#flat-eslint)
- [`Linter` 现在要求使用扁平配置格式](#flat-linter)

---

## <a name="drop-old-node"></a> 不再支持 Node.js < v18.18 和 v19

从 ESLint v9.0.0 开始，ESLint 正式停止支持这些 Node.js 版本。ESLint 现在支持以下 Node.js 版本：

- Node.js v18.18.0 及以上版本
- Node.js v20.9.0 及以上版本
- Node.js v21 及以上版本

**解决方法：** 使用 ESLint v9.0.0 时，请确保升级到至少 Node.js v18.18.0。使用编辑器集成运行 ESLint 时，务必确认编辑器支持的 Node.js 版本。如果无法升级，我们建议继续使用 ESLint v8.56.0，直到能够升级 Node.js。

**相关问题：** [#17595](https://github.com/eslint/eslint/issues/17595)

## <a name="flat-config"></a> 新的默认配置格式（`eslint.config.js`）

正如我们在[博客文章](/blog/2023/10/flat-config-rollout-plans/)中宣布的那样，ESLint v9.0.0 将 [`eslint.config.js`](./configure/configuration-files) 作为新的默认配置格式。之前的格式 eslintrc 现已弃用，且不会再被自动搜索。

**Codemod：** 使用 [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 自动完成大部分迁移工作。

**解决方法：** 按照[配置迁移指南](./configure/migration-guide)，手动将配置更新为新格式。如果仍需使用已弃用的 eslintrc 配置格式，请将环境变量 `ESLINT_USE_FLAT_CONFIG` 设置为 `false`。

**相关问题：** [#13481](https://github.com/eslint/eslint/issues/13481)

## <a name="removed-formatters"></a> 移除了多个格式化程序

ESLint v9.0.0 从核心中移除了以下格式化程序：

| **已移除的格式化程序** | **替代 npm 包**                    |
| ---------------------- | ---------------------------------- |
| `checkstyle`           | `eslint-formatter-checkstyle`      |
| `compact`              | `eslint-formatter-compact`         |
| `jslint-xml`           | `eslint-formatter-jslint-xml`      |
| `junit`                | `eslint-formatter-junit`           |
| `tap`                  | `eslint-formatter-tap`             |
| `unix`                 | `eslint-formatter-unix`            |
| `visualstudio`         | `eslint-formatter-visualstudio`    |

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 完全支持此变更。

**解决方法：** 如果你通过 `-f` 命令行标志使用了上述任何格式化程序，则需要安装相应的格式化程序包。

**相关问题：** [#17524](https://github.com/eslint/eslint/issues/17524)

## <a name="remove-jsdoc-rules"></a> 移除了 `require-jsdoc` 和 `valid-jsdoc` 规则

ESLint v9.0.0 移除了 `require-jsdoc` 和 `valid-jsdoc` 规则。这些规则最初于 2018 年弃用。

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会迁移已弃用的 JSDoc 规则。当配置中启用了这些规则时，它会移除 `require-jsdoc`/`valid-jsdoc`，添加 `eslint-plugin-jsdoc` 和 `jsdoc({ config: 'flat/recommended' })`，并移除文件级别的 JSDoc ESLint 注释。

**解决方法：** 在 `eslint-plugin-jsdoc` 中使用[替代规则](https://github.com/gajus/eslint-plugin-jsdoc/wiki/Comparison-with-deprecated-JSdoc-related-ESLint-rules)，实现相同的代码检查效果。

**相关问题：** [#15820](https://github.com/eslint/eslint/issues/15820)

## <a name="eslint-recommended"></a> `eslint:recommended` 已更新

`eslint:recommended` 中启用了四条新规则：

- [`no-constant-binary-expression`](../rules/no-constant-binary-expression)
- [`no-empty-static-block`](../rules/no-empty-static-block)
- [`no-new-native-nonconstructor`](../rules/no-new-native-nonconstructor)
- [`no-unused-private-class-members`](../rules/no-unused-private-class-members)

此外，以下规则已从 `eslint:recommended` 中移除：

- [`no-extra-semi`](../rules/no-extra-semi)
- [`no-inner-declarations`](../rules/no-inner-declarations)
- [`no-mixed-spaces-and-tabs`](../rules/no-mixed-spaces-and-tabs)
- [`no-new-symbol`](../rules/no-new-symbol)

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 部分涵盖了此变更。当你的配置扩展 `eslint:recommended` 时，它会禁用上面列出的四条新启用的推荐规则（除非你已明确配置这些规则），以保留 ESLint v8 的代码检查行为。它不会重新启用从预设中移除的规则，不会修复源文件中的新违规，也不会更改未使用旧式 `eslint:recommended` 扩展项、而是使用 `@eslint/js` 预设的配置。

**解决方法：** 修复错误或禁用这些规则。

**相关问题：** [#15576](https://github.com/eslint/eslint/issues/15576)、[#17446](https://github.com/eslint/eslint/issues/17446)、[#17596](https://github.com/eslint/eslint/issues/17596)

## <a name="quiet-warn"></a> `--quiet` 不再运行设置为 `"warn"` 的规则

在 ESLint v9.0.0 之前，`--quiet` CLI 标志会运行所有设置为 `"error"` 或 `"warn"` 的规则，然后隐藏设置为 `"warn"` 的规则所产生的结果。在 ESLint v9.0.0 中，`--quiet` 会阻止设置为 `"warn"` 的规则执行。对于包含许多设置为 `"warn"` 的规则的配置，这可能会提升性能。

如果使用了 `--max-warnings`，那么 `--quiet` 不会阻止设置为 `"warn"` 的规则执行，但会隐藏这些规则的输出。

**解决方法：** 在大多数情况下，此变更不会造成影响。不过，如果你运行的某条 `"warn"` 规则会更改其他规则可用的数据（例如该规则使用了 `sourceCode.markVariableAsUsed()`），则行为可能会发生变化。在这种情况下，你需要将该规则设置为 `"error"`，或者停止使用 `--quiet`。

**相关问题：** [#16450](https://github.com/eslint/eslint/issues/16450)

## <a name="output-file"></a> `--output-file` 现在即使输出为空也会写入磁盘文件

在 ESLint v9.0.0 之前，如果输出为空，`--output-file` 标志会跳过写入磁盘文件。但在 ESLint v9.0.0 中，即使输出为空，`--output-file` 也会始终将文件写入磁盘。此更新让 `--output-file` 的行为更加一致、可靠。

**解决方法：** 检查 `--output-file` 标志的使用情况，尤其是那些根据输出内容判断文件是否存在的流程。如有必要，请更新脚本或配置以适应此变更。

**相关问题：** [#17660](https://github.com/eslint/eslint/issues/17660)

## <a name="cli-empty-patterns"></a> 未向 CLI 传入模式时的行为变更

在 ESLint v9.0.0 之前，运行 ESLint CLI 时如果没有传入任何文件或目录模式，就不会检查任何文件，并以代码 0 退出。这种行为容易造成困惑，因为用户无法确定是否实际执行了任何操作。ESLint v9.0.0 更新了此行为：

- **扁平配置。** 如果你使用扁平配置，可以运行 `npx eslint` 或 `eslint`（如果已全局安装），ESLint 会假定你要检查当前目录。实际上，不传入模式等同于传入 `.`。
- **eslintrc。** 如果你使用已弃用的 eslintrc 配置，不传入任何模式运行 CLI 时会收到错误。

**解决方法：** 在大多数情况下，无需更改；你可能会发现某些原以为 ESLint 正在运行、实际上并未运行的地方。如果要保留 v8.x 的行为，即不传入模式时 ESLint 以代码 0 退出，请在 CLI 调用中添加 `--pass-on-no-patterns` 标志。

**相关问题：** [#14308](https://github.com/eslint/eslint/issues/14308)

## <a name="eslint-comment-options"></a> 仅指定严重级别的 `/* eslint */` 注释现在会保留配置文件中的选项

在 ESLint v9.0.0 之前，像 `/* eslint curly: "warn" */` 或 `/* eslint curly: ["warn"] */` 这样的配置注释会完全覆盖配置文件中为该规则指定的配置，因此会采用该规则的默认选项。

在 ESLint v9.0.0 中，配置注释的行为与配置文件中规则配置的合并方式保持一致。这意味着，仅指定严重级别的配置注释现在会保留配置文件中指定的选项，只覆盖严重级别。

例如，假设你有以下配置文件：

```js
// eslint.config.js

export default [
	{
		rules: {
			curly: ["error", "multi"],
		},
	},
];
```

以及以下配置注释：

```js
// my-file.js

/* eslint curly: "warn" */
```

那么对 `my-file.js` 进行代码检查时，`curly` 规则的最终配置将是 `curly: ["warn", "multi"]`。

请注意，此变更仅影响以下情况：配置文件中为同一规则指定了选项，而配置注释中未指定选项。其他所有情况（例如，仅通过配置注释配置该规则）都与 ESLint v9.0.0 之前的行为相同。

**解决方法：** 我们预计大多数情况下无需更改，因为通过配置注释配置的规则通常不会同时在配置文件中配置。不过，如果你需要配置注释完全覆盖配置文件中的配置并采用默认选项，则需要至少指定一个选项：

```js
// my-file.js

/* eslint curly: ["warn", "all"] */
```

**相关问题：** [#17381](https://github.com/eslint/eslint/issues/17381)

## <a name="multiple-eslint-comments"></a> 现在不允许针对同一规则使用多个 `/* eslint */` 注释

在 ESLint v9.0.0 之前，如果待检查文件中包含针对同一规则的多个 `/* eslint */` 配置注释，则只会应用最后一个，其他注释会被静默忽略。例如：

```js
/* eslint semi: ["error", "always"] */
/* eslint semi: ["error", "never"] */

foo(); // valid, because the configuration is "never"
```

在 ESLint v9.0.0 中，会应用第一个注释，而其他注释会被报告为代码检查错误：

```js
/* eslint semi: ["error", "always"] */
/* eslint semi: ["error", "never"] */ // error: Rule "semi" is already configured by another configuration comment in the preceding code. This configuration is ignored.

foo(); // error: Missing semicolon
```

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 包含一个 `remove-unnecessary-eslint-comments` 步骤，可修改这些注释。它会移除除第一个以外所有匹配其正则表达式的 ESLint 配置注释，而不只是删除同一规则的重复注释。

**解决方法：** 删除重复的 `/* eslint */` 注释。

**相关问题：** [#18132](https://github.com/eslint/eslint/issues/18132)

## <a name="exported-parsing"></a> `/* exported */` 的解析更加严格

在 ESLint v9.0.0 之前，`/* exported */` 指令会错误地允许以下语法：

```js
/* exported foo: true, bar: false */

// and

/* exported foo bar */
```

此示例中的 `true` 和 `false` 不会影响 ESLint 的行为；实际上，这是一个解析错误。

在 ESLint v9.0.0 中，任何 `/* exported */` 变量后跟冒号和值的写法都会被视为无效并忽略。

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会将 `/* exported foo: true, bar: false */` 和以空格分隔的写法都改写为逗号分隔格式。

**解决方法：** 更新所有 `/* exported */` 指令，去掉冒号及其后的值，并确保变量名之间用逗号分隔，例如：

```js
/* exported foo, bar */
```

**相关问题：** [#17622](https://github.com/eslint/eslint/issues/17622)

## <a name="stricter-rule-schemas"></a> `no-constructor-return` 和 `no-sequences` 的规则架构更加严格

在之前的 ESLint 版本中，`no-constructor-return` 和 `no-sequences` 规则会错误地接受无效选项。

此问题已在 ESLint v9.0.0 中修复：

- `no-constructor-return` 规则不接受任何选项。
- `no-sequences` 规则可以接受一个选项，即带有属性 `"allowInParentheses"`（布尔值）的对象。

```json
{
	"rules": {
		"no-constructor-return": ["error"],
		"no-sequences": ["error", { "allowInParentheses": false }]
	}
}
```

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 可能会为此更新你的配置。

**解决方法：** 如果 ESLint 仍然报告这些规则中的任何一条配置无效，请手动更新配置。

**相关问题：** [#16879](https://github.com/eslint/eslint/issues/16879)

## <a name="no-implicit-coercion"></a> `no-implicit-coercion` 默认会执行新的检查

在 ESLint v9.0.0 中，`no-implicit-coercion` 规则默认还会报告以下情况：

```js
-(-foo);
foo - 0;
```

**解决方法：** 如果想保留此规则之前的行为，请设置 `"allow": ["-", "- -"]`。

```json
{
	"rules": {
		"no-implicit-coercion": [2, { "allow": ["-", "- -"] }]
	}
}
```

**相关问题：** [#17832](https://github.com/eslint/eslint/pull/17832)

## <a name="no-invalid-regexp"></a> `no-invalid-regexp` 中的标志区分大小写

在 ESLint v9.0.0 中，`allowConstructorFlags` 选项现在区分大小写。

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会为 `allowConstructorFlags` 添加大小写相反的变体，以便在 v9 区分大小写的匹配行为下保留 ESLint v8 的行为。

**解决方法：** 如有需要，请手动更新配置。

**相关问题：** [#16574](https://github.com/eslint/eslint/issues/16574)

## <a name="vars-ignore-pattern"></a> `no-unused-vars` 的 `varsIgnorePattern` 选项不再适用于 catch 参数

在之前的 ESLint 版本中，`no-unused-vars` 的 `varsIgnorePattern` 选项会错误地忽略 `catch` 子句中指定的错误。在 ESLint v9.0.0 中，`varsIgnorePattern` 不再适用于 `catch` 子句中的错误。例如：

```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "all", "varsIgnorePattern": "^err" }]*/

try {
	//...
} catch (err) {
	// 'err' will be reported.
	console.error("errors");
}
```

**Codemod：** 当规则被明确配置、会检查 catch 错误（`caughtErrors` 不是 `"none"`），且未单独设置 `caughtErrorsIgnorePattern` 时，[@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会将 `varsIgnorePattern` 复制到 `caughtErrorsIgnorePattern`。这会保留 v8 的行为，即 `varsIgnorePattern` 错误地适用于 catch 绑定。如果规则仅来自预设、`caughtErrors` 为 `"none"`，或规则是 `@typescript-eslint/no-unused-vars`，则不会应用此迁移。

**解决方法：** 如果想为 `catch` 子句变量名指定忽略模式，请在 `varsIgnorePattern` 之外使用 `caughtErrorsIgnorePattern` 选项。

**相关问题：** [#17540](https://github.com/eslint/eslint/issues/17540)

## <a name="no-restricted-imports"></a> `no-restricted-imports` 现在接受多个具有相同 `name` 的配置项

在之前的 ESLint 版本中，如果 `no-restricted-imports` 规则配置的 `paths` 数组中有多个条目具有相同的 `name` 属性，则只有最后一个条目会生效，之前的条目会被忽略。

从 ESLint v9.0.0 开始，所有条目都会生效，因此可以为不同的导入名称指定不同的消息。例如，现在可以这样配置规则：

```js
{
    rules: {
        "no-restricted-imports": ["error", {
            paths: [
                {
                    name: "react-native",
                    importNames: ["Text"],
                    message: "import 'Text' from 'ui/_components' instead"
                },
                {
                    name: "react-native",
                    importNames: ["View"],
                    message: "import 'View' from 'ui/_components' instead"
                }
            ]
        }]
    }
}
```

现在，`import { Text } from "react-native"` 和 `import { View } from "react-native"` 都会被报告，并显示不同的消息。

在之前的 ESLint 版本中，使用此配置时，只有 `import { View } from "react-native"` 会被报告。

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会在迁移期间更新 `no-restricted-imports` 配置。当规则使用 `paths` 数组时，它会重组选项以适用于扁平配置，并对具有相同 `name` 的条目去重，只保留最后一个条目，使代码检查行为与 ESLint v8 一致（在 v8 中，只有最后一个匹配条目会生效）。

**解决方法：** 如果此规则的配置中有多个具有相同 `name` 的条目，你可能需要删除非预期的条目。

**相关问题：** [#15261](https://github.com/eslint/eslint/issues/15261)

## <a name="string-config"></a> 扁平配置不再接受 `"eslint:recommended"` 和 `"eslint:all"` 字符串

在 ESLint v8.x 中，可以在配置数组中插入字符串，以便在 `eslint.config.js` 中引用 `"eslint:recommended"` 和 `"eslint:all"` 配置，如下例所示：

```js
// eslint.config.js
export default ["eslint:recommended", "eslint:all"];
```

在 ESLint v9.0.0 中，不再支持此格式，使用时会导致错误。

**Codemod：** 使用 [@eslint/v8-to-v9-config](#use-migration-codemods) codemod。它会转换现有 `eslint.config.*` 文件中的旧式字符串预设，并通过 `FlatCompat` + `@eslint/js` 迁移 eslintrc 配置。

**解决方法：** 手动安装并使用 `@eslint/js`：

```js
// eslint.config.js
import js from "@eslint/js";

export default [js.configs.recommended, js.configs.all];
```

**相关问题：** [#17488](https://github.com/eslint/eslint/issues/17488)

## <a name="no-inner-declarations"></a> `no-inner-declarations` 有了新的默认行为和新选项

ESLint v9.0.0 为 `no-inner-declarations` 规则引入了一个名为 `blockScopeFunctions` 的新选项。默认情况下，当 `languageOptions.ecmaVersion` 设置为 `2015` 或更高版本时，该选项允许严格模式下的块级 `function`。

```js
/*eslint no-inner-declarations: "error"*/
"use strict";

if (test) {
	function foo() {} // no error
}
```

**Codemod：** 当明确配置了 `no-inner-declarations` 时，[@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会添加 `blockScopedFunctions: "disallow"`，以保留 v8 的报告行为。如果规则仅来自预设，则不会应用此更改。

**解决方法：** 如果无论严格模式还是非严格模式，你都希望在任何情况下报告块级 `function`，请将 `blockScopeFunctions` 选项设置为 `"disallow"`。

**相关问题：** [#15576](https://github.com/eslint/eslint/issues/15576)

## <a name="no-unused-vars"></a> `no-unused-vars` 的 `caughtErrors` 默认值现在为 `"all"`

ESLint v9.0.0 更改了 `no-unused-vars` 规则的 `caughtErrors` 选项默认值。
之前，该选项默认值为 `"none"`，不会检查捕获的错误是否被使用。
现在默认值为 `"all"`，会检查捕获的错误是否被使用。

```js
/*eslint no-unused-vars: "error"*/
try {
} catch (error) {
	// 'error' is defined but never used
}
```

**Codemod：** 当明确配置了 `no-unused-vars` 时，[@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会更新该规则。如果省略了 `caughtErrors` 选项，它会添加 `caughtErrors: "none"`，以保留 ESLint v8 的行为。现有的 `caughtErrors` 值会保持不变。如果会检查 catch 错误且设置了 `varsIgnorePattern`，它也会将该模式复制到 `caughtErrorsIgnorePattern`。如果该规则仅通过 `eslint:recommended` 启用，则不会添加此规则；它也不会迁移 `@typescript-eslint/no-unused-vars`。

**解决方法：** 如果想允许未使用的捕获错误（例如，编写将直接在不支持 ES2019 可选 catch 绑定的环境中运行的代码时），请将 `caughtErrors` 选项设置为 `"none"`。
否则，请删除未使用的捕获错误。

```js
/*eslint no-unused-vars: "error"*/
try {
} catch {
	// no error
}
```

**相关问题：** [#17974](https://github.com/eslint/eslint/issues/17974)

## <a name="no-useless-computed-key"></a> `no-useless-computed-key` 默认会标记类中不必要的计算属性成员名

在 ESLint v9.0.0 中，`no-useless-computed-key` 规则的 `enforceForClassMembers` 选项默认值从 `false` 改为 `true`。
此变更意味着，默认情况下会标记类中不必要的计算属性成员名。

```js
/*eslint no-useless-computed-key: "error"*/

class SomeClass {
	["someMethod"]() {} // ok in ESLint v8, error in ESLint v9.
}
```

**Codemod：** 如果 `no-useless-computed-key` 规则配置了空选项对象，[@eslint/v8-to-v9-config](#use-migration-codemods) codemod 会将 `enforceForClassMembers` 设置为 `false`，以保留 ESLint v8 的行为。

**解决方法：** 修复此规则报告的问题，或将 `enforceForClassMembers` 选项设置为 `false`，以恢复之前的行为。

**相关问题：** [#18042](https://github.com/eslint/eslint/issues/18042)

## <a name="camelcase"></a> `camelcase` 的 allow 选项仅接受字符串数组

以前，camelcase 规则不会强制要求 `allow` 选项为字符串数组。在 ESLint v9.0.0 中，`allow` 选项现在仅接受字符串数组。

**Codemod：** [@eslint/v8-to-v9-config](#use-migration-codemods) codemod 可能会为此更新你的配置。

**解决方法：** 如果 ESLint 仍然报告此规则的配置无效，请手动更新配置。

**相关问题：** [#18232](https://github.com/eslint/eslint/pull/18232)

## <a name="removed-context-methods"></a> 移除了多个 `context` 方法

ESLint v9.0.0 从 `context` 对象中移除了多个已弃用的方法，并将它们移至 `SourceCode` 对象：

| **从 `context` 中移除**          | **`SourceCode` 上的替代方法**                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `context.getSource()`            | `sourceCode.getText()`                                                                              |
| `context.getSourceLines()`       | `sourceCode.getLines()`                                                                             |
| `context.getAllComments()`       | `sourceCode.getAllComments()`                                                                       |
| `context.getNodeByRangeIndex()`   | `sourceCode.getNodeByRangeIndex()`                                                                  |
| `context.getComments()`           | `sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()`、`sourceCode.getCommentsInside()` |
| `context.getCommentsBefore()`     | `sourceCode.getCommentsBefore()`                                                                    |
| `context.getCommentsAfter()`      | `sourceCode.getCommentsAfter()`                                                                     |
| `context.getCommentsInside()`     | `sourceCode.getCommentsInside()`                                                                    |
| `context.getJSDocComment()`       | `sourceCode.getJSDocComment()`                                                                      |
| `context.getFirstToken()`         | `sourceCode.getFirstToken()`                                                                        |
| `context.getFirstTokens()`        | `sourceCode.getFirstTokens()`                                                                       |
| `context.getLastToken()`          | `sourceCode.getLastToken()`                                                                         |
| `context.getLastTokens()`         | `sourceCode.getLastTokens()`                                                                        |
| `context.getTokenAfter()`         | `sourceCode.getTokenAfter()`                                                                        |
| `context.getTokenBefore()`        | `sourceCode.getTokenBefore()`                                                                       |
| `context.getTokenByRangeStart()`  | `sourceCode.getTokenByRangeStart()`                                                                 |
| `context.getTokens()`             | `sourceCode.getTokens()`                                                                            |
| `context.getTokensAfter()`        | `sourceCode.getTokensAfter()`                                                                       |
| `context.getTokensBefore()`       | `sourceCode.getTokensBefore()`                                                                      |
| `context.getTokensBetween()`      | `sourceCode.getTokensBetween()`                                                                     |
| `context.parserServices`          | `sourceCode.parserServices`                                                                         |
| `context.getDeclaredVariables()`  | `sourceCode.getDeclaredVariables()`                                                                 |

除了上表中的方法，还有一些方法也被迁移了，但其方法签名有所不同：

| **从 `context` 中移除**             | **`SourceCode` 上的替代方法**             |
| ---------------------------------- | ---------------------------------------- |
| `context.getAncestors()`            | `sourceCode.getAncestors(node)`           |
| `context.getScope()`                | `sourceCode.getScope(node)`               |
| `context.markVariableAsUsed(name)`  | `sourceCode.markVariableAsUsed(name, node)` |

**Codemod：** 使用 [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 自动完成大部分迁移工作。

**解决方法：** 如需了解更多信息，请参阅[博客文章](https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#automatically-update-your-rules)。

**相关问题：** [#16999](https://github.com/eslint/eslint/issues/16999)、[#13481](https://github.com/eslint/eslint/issues/13481)

## <a name="removed-sourcecode-getcomments"></a> 移除了 `sourceCode.getComments()`

ESLint v9.0.0 移除了已弃用的 `sourceCode.getComments()` 方法。

**Codemod：** 使用 [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod。它会将 `context.getComments()` 和 `sourceCode.getComments()` 转换为 `getCommentsBefore()`、`getCommentsInside()` 和 `getCommentsAfter()` 的组合调用。

**解决方法：** 替换为 `sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()` 或 `sourceCode.getCommentsInside()`。

**相关问题：** [#14744](https://github.com/eslint/eslint/issues/14744)

## <a name="removed-codepath-currentsegments"></a> 移除了 `CodePath#currentSegments`

ESLint v9.0.0 移除了已弃用的 `CodePath#currentSegments` 属性。

**Codemod：** [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 可能会自动完成部分迁移工作。

**解决方法：** 按照[博客文章](https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#codepath%23currentsegments)中的建议更新代码。

**相关问题：** [#17457](https://github.com/eslint/eslint/issues/17457)

## <a name="codepath-precalc"></a> 现在会预先计算代码路径

在 ESLint v9.0.0 之前，代码路径是在与规则相同的 AST 遍历期间计算的，因此传递给 `onCodePathStart` 和 `onCodePathSegmentStart` 等方法的信息并不完整。具体来说，`CodePath#childCodePaths` 和 `CodePathSegment#nextSegments` 这类数组属性一开始为空，随后会随着遍历完成逐渐填入相应信息。这意味着，根据检查数组值的时机不同，数组中的元素可能也会不同。

ESLint v9.0.0 现在会在规则遍历之前预先计算代码路径信息。因此，无论在规则中的何处访问，代码路径信息现在都是完整的。

**Codemod：** 迁移 codemod 不会处理代码路径预计算。依赖 `CodePath` 或 `CodePathSegment` 数组属性填充时机的规则必须手动检查。[@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 只会迁移已移除的 `CodePath#currentSegments` 用法。

**解决方法：** 如果你访问了 `CodePath` 或 `CodePathSegment` 上的任何数组属性，就需要更新代码。具体来说：

- 如果你在检查任何数组属性的 `length`，请确保使用 `<`、`>`、`<=` 和 `>=` 等相对比较运算符，而不是等于运算符。
- 如果你访问了 `CodePathSegment` 上的 `nextSegments`、`prevSegments`、`allNextSegments` 或 `allPrevSegments` 属性，或访问了 `CodePath#childCodePaths`，请确认代码仍能按预期工作。为保持向后兼容，可以考虑将检查这些属性的逻辑移至 `onCodePathEnd`。

**相关问题：** [#16999](https://github.com/eslint/eslint/issues/16999)

## <a name="drop-function-style-rules"></a> 不再支持函数式规则

ESLint v9.0.0 不再支持函数式规则。函数式规则是指通过导出函数（而不是带有 `create()` 方法的对象）创建的规则。此规则格式已于 2016 年弃用。

**Codemod：** 使用 [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod，将函数式规则转换为对象格式。

**解决方法：** 将规则更新为[最新的规则格式](../extend/custom-rules)。对于使用 CommonJS 编写的规则，也可以使用 [`eslint-transforms`](https://github.com/eslint/eslint-transforms/blob/main/README.md#new-rule-format)。

[eslint-plugin/prefer-object-rule](https://github.com/eslint-community/eslint-plugin-eslint-plugin/blob/main/docs/rules/prefer-object-rule.md) 规则可以帮助强制使用对象式规则，并自动修复剩余的函数式规则。

**相关问题：** [#14709](https://github.com/eslint/eslint/issues/14709)

## <a name="meta-schema-required"></a> 带选项的规则必须提供 `meta.schema`

从 ESLint v9.0.0 开始，如果向未指定 `meta.schema` 属性的规则[传入](../use/configure/rules#use-configuration-files)任何选项，就会抛出错误。

**Codemod：** [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 会为函数式和对象式规则生成 `meta.schema`，迁移旧式 `module.exports.schema`，并在检测到存在 `context.options` 但没有架构时插入 TODO。其局限在于无法完整推断实际架构。

**解决方法：**

- 如果规则需要[选项](../extend/custom-rules#accessing-options-passed-to-a-rule)，请将 [`meta.schema`](../extend/custom-rules#options-schemas) 属性设置为描述规则选项的 JSON Schema 格式。ESLint 会使用此架构验证配置的选项，防止向规则传入无效或意外的输入。
- 如果规则不需要任何选项，则无需采取任何操作。此变更可确保最终用户不会错误地为不需要选项的规则配置选项。
- **（不推荐）** 你也可以将 `meta.schema` 设置为 `false` 以禁用此验证，但强烈建议：如果规则需要选项，则提供架构；如果规则不需要选项，则省略架构（或将其设置为 `[]`），以便 ESLint 确保用户的配置有效。

[eslint-plugin/require-meta-schema](https://github.com/eslint-community/eslint-plugin-eslint-plugin/blob/main/docs/rules/require-meta-schema.md) 规则可以帮助确保规则在需要时提供架构。

**相关问题：** [#14709](https://github.com/eslint/eslint/issues/14709)

## <a name="flat-rule-tester"></a> `FlatRuleTester` 现在是 `RuleTester`

正如我们在[博客文章](/blog/2023/10/flat-config-rollout-plans/)中宣布的那样，临时的 `FlatRuleTester` 类已重命名为 `RuleTester`，而 v8.x 中的 `RuleTester` 类已被移除。此外，`eslint/use-at-your-own-risk` 中导出的 `FlatRuleTester` 也已移除。

**Codemod：** [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 会将 `FlatRuleTester` 重命名为 `RuleTester`，并将测试用例中的 `parserOptions` 移至 `languageOptions`。从 `eslint/use-at-your-own-risk` 更新导入路径为 `eslint`、适配新的 `RuleTester` 默认值，以及转换其他 eslintrc 风格的测试配置，都必须手动完成。

**解决方法：** 更新规则测试以使用新的 `RuleTester`。为此，以下是一些常见的修改：

- **请注意 `ecmaVersion` 和 `sourceType` 的新默认值。** 默认情况下，`RuleTester` 使用扁平配置的默认值：`ecmaVersion: "latest"` 和 `sourceType: "module"`。如果某些测试依赖旧的默认值 `ecmaVersion: 5` 和 `sourceType: "script"`，可能会因此失败。如果希望使用旧的默认值，需要像这样在 `RuleTester` 中手动指定：

    ```js
    // use eslintrc defaults
    const ruleTester = new RuleTester({
    	languageOptions: {
    		ecmaVersion: 5,
    		sourceType: "script",
    	},
    });
    ```

- **将 `parserOptions` 改为 `languageOptions`。** 如果在测试中设置了 `ecmaVersion` 或 `sourceType`，请像这样将它们从 `parserOptions` 移到 `languageOptions`：

    ```js
    ruleTester.run("my-rule", myRule, {
    	valid: [
    		{
    			code: "foo",
    			parserOptions: {
    				ecmaVersion: 6,
    			},
    		},
    	],
    });

    // becomes

    ruleTester.run("my-rule", myRule, {
    	valid: [
    		{
    			code: "foo",
    			languageOptions: {
    				ecmaVersion: 6,
    			},
    		},
    	],
    });
    ```

- **转换其他配置键。** 以前由 eslintrc 配置系统处理的 `env` 和 `parser` 等键，必须转换为扁平配置系统所用的形式。有关如何转换其他可能使用的键，请参阅[配置迁移指南](configure/migration-guide)。

**相关问题：** [#13481](https://github.com/eslint/eslint/issues/13481)

## <a name="stricter-rule-tester"></a> `RuleTester` 检查更加严格

为了帮助开发高质量且不含常见错误的自定义规则，ESLint v9.0.0 对 `RuleTester` 做出了多项更改：

1. **测试用例的 `output` 必须与 `code` 不同。** 在 ESLint v8.x 中，如果 `output` 与 `code` 相同，就表示断言没有执行自动修复。查看测试用例时，尤其是字符串较长或跨多行时，未必能立即看出 `output` 是否与 `code` 不同，这会让开发者难以判断测试用例是否预期执行自动修复。在 ESLint v9.0.0 中，为避免这种歧义，如果测试 `output` 与测试 `code` 的值相同，`RuleTester` 现在会抛出错误。因此，指定 `output` 就表示测试用例预期执行自动修复并断言其结果。如果测试用例不预期自动修复，请省略 `output` 属性或将其设为 `null`，以断言没有执行自动修复。
1. **测试错误对象必须指定 `message` 或 `messageId`。** 为了提升测试覆盖质量，如果测试错误对象未指定 `message` 或 `messageId`，`RuleTester` 现在会抛出错误。
1. **如果实际错误提供了建议，测试错误对象必须指定 `suggestions`。** 在 ESLint v8.x 中，如果测试错误对象省略了 `suggestions` 属性，`RuleTester` 不会检查任何与建议相关的内容，因此很容易忘记断言测试用例是否产生了建议。在 ESLint v9.0.0 中，省略 `suggestions` 属性表示断言实际错误不提供建议；如果实际错误提供了建议，则必须指定 `suggestions` 属性。我们强烈建议通过指定测试建议对象数组来详细测试建议；你也可以指定 `suggestions: <number>`，只断言建议的数量。
1. **测试建议对象必须指定 `output`。** 为了提升测试覆盖质量，如果测试建议对象未指定 `output` 属性，`RuleTester` 现在会抛出错误。
1. **测试建议对象必须指定 `desc` 或 `messageId`。** 为了提升测试覆盖质量，如果测试建议对象既未指定 `desc`，也未指定 `messageId`，`RuleTester` 现在会抛出错误。也不允许同时指定两者。如果除了 `messageId` 之外还要断言建议的描述文本，请同时添加 `data` 属性。
1. **建议消息必须唯一。** 由于建议通常会在编辑器中以下拉列表的形式显示，因此同一代码检查问题的任何两个建议都不能使用相同的消息。否则就无法知道某个建议会执行什么操作。此项检查会自动运行。
1. **建议必须更改代码。** 建议应通过更改代码来修复报告的问题。如果建议测试的 `output` 与测试 `code` 相同，`RuleTester` 现在会抛出错误。
1. **建议必须生成有效语法。** 为使规则建议有用，它们必须符合有效语法。`RuleTester` 现在会使用与 `code` 值相同的语言选项解析建议的输出；如果解析失败，就会抛出错误。
1. **测试用例必须唯一。** 相同的测试用例容易造成混淆，而且在较长的测试文件中很难手动发现。现在会自动检测重复项，可以放心删除。
1. **`filename` 和 `only` 必须是预期的类型。** `RuleTester` 现在会检查测试对象的 `filename` 和 `only` 属性的类型。如果指定了 `filename`，它必须是字符串；如果指定了 `only`，它必须是布尔值。
1. **消息不能包含未替换的占位符。** `RuleTester` 现在还会检查消息中是否仍有 {% raw %}`{{ placeholder }}` {% endraw %}，也就是说，相应的 `context.report()` 调用没有通过 `data` 传入这些占位符的值。

**Codemod：** [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 会将 `FlatRuleTester` 重命名为 `RuleTester`，将测试用例中的 `parserOptions` 移至 `languageOptions`，并在 `output` 与 `code` 相同时移除 `output`。其他所有更严格的 `RuleTester` 检查都必须通过运行规则测试并更新失败用例来手动修复。

**解决方法：** 使用 `RuleTester` 运行规则测试，并修复出现的任何错误。为满足 `RuleTester` 要求而进行的修改与 ESLint v8.x 兼容。

**相关问题：** [#15104](https://github.com/eslint/eslint/issues/15104)、[#15735](https://github.com/eslint/eslint/issues/15735)、[#16908](https://github.com/eslint/eslint/issues/16908)、[#18016](https://github.com/eslint/eslint/issues/18016)

## <a name="flat-eslint"></a> `FlatESLint` 现在是 `ESLint`

正如我们在[博客文章](/blog/2023/10/flat-config-rollout-plans/)中宣布的那样，临时的 `FlatESLint` 类已重命名为 `ESLint`，而 v8.x 中的 `ESLint` 类已重命名为 `LegacyESLint`。

**Codemod：** [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 会将 `FlatESLint` 重命名为 `ESLint`。

**解决方法：** 如果你目前正在使用 `ESLint` 类，请使用新的 `ESLint` 类确认测试能否通过。并非所有旧选项都受支持，因此你可能需要更新传递给构造函数的参数。详情请参阅 [Node.js API 参考](../integrate/nodejs-api)。

如果仍需要 v8.x `ESLint` 的功能，请像这样使用 `LegacyESLint` 类：

```js
const { LegacyESLint } = require("eslint/use-at-your-own-risk");
```

**相关问题：** [#13481](https://github.com/eslint/eslint/issues/13481)

## <a name="flat-linter"></a> `Linter` 现在要求使用扁平配置格式

在 ESLint v9.0.0 中，传递给 `Linter#verify()` 和 `Linter#verifyAndFix()` 方法的 `config` 参数应使用扁平配置格式。

此外，`Linter#defineRule()`、`Linter#defineRules()`、`Linter#defineParser()` 和 `Linter#getRules()` 方法也不再可用。

**Codemod：** [@eslint/v8-to-v9-custom-rules](#use-migration-codemods) codemod 会将 `FlatESLint` 重命名为 `ESLint`，并将 `Linter#verify()` 和 `Linter#verifyAndFix()` 调用中的 `parserOptions` 移至 `languageOptions`。对已移除方法（`defineRule`、`defineRules`、`defineParser`、`getRules`）的调用会标记 TODO；将规则和解析器迁移到扁平插件/`languageOptions` 配置中必须手动完成。

**解决方法：** 如果你正在使用 `Linter` 类，请确认测试能否通过。

如果传入的配置对象与扁平配置格式不兼容，则需要更新代码。

```js
// eslintrc config format
linter.verify(code, {
	parserOptions: {
		ecmaVersion: 6,
	},
});

// flat config format
linter.verify(code, {
	languageOptions: {
		ecmaVersion: 6,
	},
});
```

有关如何转换其他可能使用的键，请参阅[配置迁移指南](configure/migration-guide)。

可以直接在配置中定义规则和解析器。

```js
// eslintrc mode
linter.defineRule("my-rule1", myRule1);
linter.defineRules({
	"my-rule2": myRule2,
	"my-rule3": myRule3,
});
linter.defineParser("my-parser", myParser);
linter.verify(code, {
	rules: {
		"my-rule1": "error",
		"my-rule2": "error",
		"my-rule3": "error",
	},
	parser: "my-parser",
});

// flat config mode
linter.verify(code, {
	plugins: {
		"my-plugin-foo": {
			rules: {
				"my-rule1": myRule1,
			},
		},
		"my-plugin-bar": {
			rules: {
				"my-rule2": myRule2,
				"my-rule3": myRule3,
			},
		},
	},
	rules: {
		"my-plugin-foo/my-rule1": "error",
		"my-plugin-bar/my-rule2": "error",
		"my-plugin-bar/my-rule3": "error",
	},
	languageOptions: {
		parser: myParser,
	},
});
```

如果仍需要 v8.x `Linter` 的功能，请像这样向构造函数传递 `configType: "eslintrc"`：

```js
const linter = new Linter({ configType: "eslintrc" });

linter.verify(code, {
	parserOptions: {
		ecmaVersion: 6,
	},
});

linter.getRules();
```

**相关问题：** [#13481](https://github.com/eslint/eslint/issues/13481)
