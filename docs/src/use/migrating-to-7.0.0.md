---
title: 迁移到 v7.0.0
---

ESLint v7.0.0 是 ESLint 的一个主要版本。本次发布中我们做出了一些破坏性更改。本指南将带你了解这些更改。

下面的列表大致按预计受每项更改影响的用户数量排序，排在前面的项目预计会影响更多用户。

## 目录

### 面向用户的破坏性更改

- [不再支持 Node.js 8](#drop-node-8)
- [默认对 `overrides[].files` 匹配的文件进行代码检查](#additional-lint-targets)
- [通过 `--config`/`--ignore-path` 选项指定配置文件时，`overrides` 和 `ignorePatterns` 的基准路径已更改](#base-path-change)
- [ESLint 加载插件的位置已更改](#plugin-loading-change)
- [`~/.eslintrc.*` 配置文件的运行时弃用警告](#runtime-deprecation-on-personal-config-files)
- [默认忽略模式已更改](#default-ignore-patterns)
- [指令注释中的说明](#description-in-directive-comments)
- [Node.js/CommonJS 规则已弃用](#deprecate-node-rules)
- [多条规则已更新以涵盖更多情况](#rules-strict)
- [`eslint:recommended` 已更新](#eslint-recommended)

### 面向插件开发者的破坏性更改

- [不再支持 Node.js 8](#drop-node-8)
- [默认对 `overrides[].files` 匹配的文件进行代码检查](#additional-lint-targets)
- [插件解析方式已更新](#plugin-loading-change)
- [`RuleTester` 类新增验证](#rule-tester-strict)

### 面向集成开发者的破坏性更改

- [不再支持 Node.js 8](#drop-node-8)
- [插件解析方式已更新](#plugin-loading-change)
- [`CLIEngine` 类已弃用](#deprecate-cliengine)

---

<a id="-nodejs-8-is-no-longer-supported"></a>

## <a name="drop-node-8"></a> 不再支持 Node.js 8

Node.js 8 于 2019 年 12 月结束生命周期，我们将在此版本中正式停止对它的支持。ESLint 现在支持以下版本的 Node.js：

- Node.js 10（`10.12.0` 及更高版本）
- Node.js 12 及更高版本

**应对方法：** 使用 ESLint v7.0.0 时，请确保升级到至少 Node.js `10.12.0`。另一个需要特别确认的重要事项是：通过编辑器集成使用 ESLint 时，你的编辑器支持哪个 Node.js 版本。如果你无法升级，我们建议继续使用 ESLint 6，直到能够升级 Node.js。

**相关问题：** [RFC44](https://github.com/eslint/rfcs/blob/master/designs/2019-drop-node8/README.md)、[#12700](https://github.com/eslint/eslint/pull/12700)

<a id="-lint-files-matched-by-overridesfiles-by-default"></a>

## <a name="additional-lint-targets"></a> 默认对 `overrides[].files` 匹配的文件进行代码检查

在 v7.0.0 之前，如果你像 `eslint src` 这样指定目录，ESLint 默认只会检查扩展名为 `.js` 的文件。

从 ESLint v7.0.0 开始，如果其他扩展名（`.ts`、`.vue` 等）被 `overrides[].files` 条目明确匹配，ESLint 也会检查这些文件。这样，用户无需使用 `--ext` 命令行标志，就可以检查不以 `*.js` 结尾的文件；可共享配置的作者也可以启用对这些文件的检查，而不会给最终用户带来额外负担。请注意，以 `*` 结尾的模式不受此行为影响，其行为与以前相同。例如，若存在以下配置文件：

```yml
# .eslintrc.yml
extends: my-config-js
overrides:
    - files: "*.ts"
      extends: my-config-ts
```

那么运行 `eslint src` 会检查 `src` 目录中的 `*.js` 和 `*.ts` 文件。

**应对方法：** 使用 `--ext` CLI 选项会覆盖此新行为。如果你使用了 `overrides`，但只想检查扩展名为 `.js` 的文件，请使用 `--ext .js` 运行 ESLint。

如果你维护的插件会检查扩展名不是 `.js` 的文件，此功能允许你通过在 `recommended` 预设中配置 `overrides` 设置，默认检查这些文件。

**相关问题：** [RFC20](https://github.com/eslint/rfcs/blob/master/designs/2019-additional-lint-targets/README.md)、[#12677](https://github.com/eslint/eslint/pull/12677)

<a id="-the-base-path-of-overrides-and-ignorepatterns-has-changed-when-using-the---config--ignore-path-options"></a>

## <a name="base-path-change"></a> 使用 `--config`/`--ignore-path` 选项时，`overrides` 和 `ignorePatterns` 的基准路径已更改

到目前为止，ESLint 会将以下路径解析为相对于_入口_配置文件所在目录的路径：

- 配置文件（`.eslintrc.*`）
    - `overrides[].files` 设置中的相对路径
    - `overrides[].excludedFiles` 设置中的相对路径
    - `ignorePatterns` 设置中以 `/` 开头的路径
- 忽略文件（`.eslintignore`）
    - 以 `/` 开头的路径

从 ESLint v7.0.0 开始，通过 `--config path/to/a-config` 和 `--ignore-path path/to/a-ignore` CLI 标志传递给 ESLint 的配置文件和忽略文件，将分别相对于当前工作目录解析，而不是相对于文件所在位置。这样，用户就可以使用可共享插件，而无需将它们直接安装到自己的项目中。

**应对方法：** 如果你通过 `--config` 或 `--ignore-path` CLI 选项使用配置文件或忽略文件，请更新受影响的路径。

**相关问题：** [RFC37](https://github.com/eslint/rfcs/blob/master/designs/2019-changing-base-path-in-config-files-that-cli-options-specify/README.md)、[#12887](https://github.com/eslint/eslint/pull/12887)

<a id="-plugin-resolution-has-been-updated"></a>

## <a name="plugin-loading-change"></a> 插件解析方式已更新

在以前的版本中，ESLint 默认会从当前工作目录解析所有插件。

从 ESLint v7.0.0 开始，`plugins` 将相对于_入口_配置文件所在目录解析。

在大多数情况下，这不会带来任何变化。如果子目录中的配置文件定义了 `plugins`，插件将从该子目录加载；如果未找到，则会从包含当前工作目录的上级目录加载。

这意味着，如果你通过 `--config` 选项使用共享位置中的配置文件，该配置文件声明的插件将从共享配置文件所在的位置加载。

**应对方法：** 确保插件安装在相对于配置文件可解析的位置，或者使用 `--resolve-plugins-relative-to .` 覆盖此更改。

**相关问题：** [RFC47](https://github.com/eslint/rfcs/blob/master/designs/2019-plugin-loading-improvement/README.md)、[#12922](https://github.com/eslint/eslint/pull/12922)

<a id="-runtime-deprecation-warnings-for-eslintrc-config-files"></a>

## <a name="runtime-deprecation-on-personal-config-files"></a> `~/.eslintrc.*` 配置文件的运行时弃用警告

个人配置文件自 [v6.7.0](https://eslint.org/blog/2019/11/eslint-v6.7.0-released) 起已弃用。ESLint v7.0.0 将开始在运行时打印弃用警告。以下情况会触发警告：

1. 项目中没有配置文件，且 ESLint 从 `~/.eslintrc.*` 加载配置时。
1. 项目中存在配置文件，但 ESLint 忽略了 `~/.eslintrc.*` 配置文件时。当 `$HOME` 目录是项目的上级目录，且项目的配置文件未包含 `root:true` 时，就会发生这种情况。

**应对方法：** 移除 `~/.eslintrc.*` 配置文件，并在项目中添加 `.eslintrc.*` 配置文件。或者，使用 `--config` 选项来使用共享配置文件。

**相关问题：** [RFC32](https://github.com/eslint/rfcs/tree/master/designs/2019-deprecating-personal-config/README.md)、[#12678](https://github.com/eslint/eslint/pull/12678)

<a id="-default-ignore-patterns-have-changed"></a>

## <a name="default-ignore-patterns"></a> 默认忽略模式已更改

到目前为止，ESLint 默认会忽略以下文件：

- 点文件（`.*`）
- 当前工作目录中的 `node_modules`（`/node_modules/*`）
- 当前工作目录中的 `bower_components`（`/bower_components/*`）

ESLint v7.0.0 也会忽略子目录中的 `node_modules/*`，但不再忽略 `bower_components/*` 和 `.eslintrc.js`。因此，新的默认忽略模式为：

- 点文件，但 `.eslintrc.*` 除外（`.*`，但不包括 `.eslintrc.*`）
- `node_modules`（`/**/node_modules/*`）

**应对方法：** 如果你不想检查 `bower_components/*` 和 `.eslintrc.js`，请修改 `.eslintignore` 或配置文件的 `ignorePatterns` 属性。

**相关问题：** [RFC51](https://github.com/eslint/rfcs/blob/master/designs/2019-update-default-ignore-patterns/README.md)、[#12888](https://github.com/eslint/eslint/pull/12888)

<a id="-descriptions-in-directive-comments"></a>

## <a name="description-in-directive-comments"></a> 指令注释中的说明

在 ESLint 的旧版本中，没有方便的方法来说明为什么需要使用指令注释，例如 `/*eslint-disable*/`。

为了让提供上下文的注释可以与指令放在一起，ESLint v7.0.0 增加了在指令注释中附加任意文本的功能：忽略空白字符包围的 `--` 后面的文本。例如：

```js
// eslint-disable-next-line a-rule, another-rule -- those are buggy!!
```

**应对方法：** 如果指令注释中包含由空白字符包围的 `--`，请考虑将其移到配置文件中。

**相关问题：** [RFC33](https://github.com/eslint/rfcs/blob/master/designs/2019-description-in-directive-comments/README.md)、[#12699](https://github.com/eslint/eslint/pull/12699)

<a id="-nodejscommonjs-rules-have-been-deprecated"></a>

## <a name="deprecate-node-rules"></a> Node.js/CommonJS 规则已弃用

核心中的十条 Node.js/CommonJS 规则已弃用，并移至 [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) 插件（对于 ESLint v8.0.0 及更高版本，请改用仍在维护的分支 [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)）。

**应对方法：** 根据[我们的弃用政策](../use/rule-deprecation)，这些已弃用的规则在可预见的未来仍会保留在核心中，并且仍可使用。不过，我们将不再更新这些规则，也不再修复其中的任何错误。如需使用受支持的规则版本，我们建议改用插件中对应的规则。

| 已弃用的规则                                            | 替代规则                                                                                                                        |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| [callback-return](../rules/callback-return)             | [node/callback-return](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/callback-return.md)             |
| [global-require](../rules/global-require)               | [node/global-require](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/global-require.md)               |
| [handle-callback-err](../rules/handle-callback-err)     | [node/handle-callback-err](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/handle-callback-err.md)     |
| [no-mixed-requires](../rules/no-mixed-requires)         | [node/no-mixed-requires](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-mixed-requires.md)         |
| [no-new-require](../rules/no-new-require)               | [node/no-new-require](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-new-require.md)               |
| [no-path-concat](../rules/no-path-concat)               | [node/no-path-concat](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-path-concat.md)               |
| [no-process-env](../rules/no-process-env)               | [node/no-process-env](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-process-env.md)               |
| [no-process-exit](../rules/no-process-exit)             | [node/no-process-exit](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-process-exit.md)             |
| [no-restricted-modules](../rules/no-restricted-modules) | [node/no-restricted-require](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-restricted-require.md) |
| [no-sync](../rules/no-sync)                             | [node/no-sync](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-sync.md)                             |

**相关问题：** [#12898](https://github.com/eslint/eslint/pull/12898)

<a id="-several-rules-have-been-updated-to-cover-more-cases"></a>

## <a name="rules-strict"></a> 多条规则已更新以涵盖更多情况

多条规则得到了增强，现在会报告更多错误：

- [accessor-pairs](../rules/accessor-pairs) 规则现在默认可识别类成员。
- [array-callback-return](../rules/array-callback-return) 规则现在可识别 `flatMap` 方法。
- [computed-property-spacing](../rules/computed-property-spacing) 规则现在默认可识别类成员。
- [func-names](../rules/func-names) 规则现在可识别默认导出中的函数声明。
- [no-extra-parens](../rules/no-extra-parens) 规则现在可识别赋值目标中的括号。
- [no-dupe-class-members](../rules/no-dupe-class-members) 规则现在可识别静态类成员的计算属性键。
- [no-magic-numbers](../rules/no-magic-numbers) 规则现在可识别 bigint 字面量。
- [radix](../rules/radix) 规则现在可识别 `parseInt()` 第二个参数中的无效数字。
- [use-isnan](../rules/use-isnan) 规则现在默认可识别类成员。
- [yoda](../rules/yoda) 规则现在可识别 bigint 字面量。

**应对方法：** 修复错误，或禁用这些规则。

**相关问题：** [#12490](https://github.com/eslint/eslint/pull/12490)、[#12608](https://github.com/eslint/eslint/pull/12608)、[#12670](https://github.com/eslint/eslint/pull/12670)、[#12701](https://github.com/eslint/eslint/pull/12701)、[#12765](https://github.com/eslint/eslint/pull/12765)、[#12837](https://github.com/eslint/eslint/pull/12837)、[#12913](https://github.com/eslint/eslint/pull/12913)、[#12915](https://github.com/eslint/eslint/pull/12915)、[#12919](https://github.com/eslint/eslint/pull/12919)

<a id="-eslintrecommended-has-been-updated"></a>

## <a name="eslint-recommended"></a> `eslint:recommended` 已更新

`eslint:recommended` 预设中启用了三条新规则。

- [no-dupe-else-if](../rules/no-dupe-else-if)
- [no-import-assign](../rules/no-import-assign)
- [no-setter-return](../rules/no-setter-return)

**应对方法：** 修复错误，或禁用这些规则。

**相关问题：** [#12920](https://github.com/eslint/eslint/pull/12920)

<a id="-additional-validation-added-to-the-ruletester-class"></a>

## <a name="rule-tester-strict"></a> `RuleTester` 类新增验证

`RuleTester` 现在会验证以下内容：

- 如果被测试的规则使用非标准的 `node.start` 或 `node.end` 属性，测试用例将失败。规则应改用 `node.range`。
- 如果被测试的规则提供了自动修复，但测试用例没有 `output` 属性，测试用例将失败。请在测试用例中添加 `output` 属性，以测试规则的自动修复功能。
- 如果 `errors` 属性中的对象包含任何未知属性，测试用例将失败。

**应对方法：** 如果现有测试用例失败，请修改规则或测试用例。

**相关问题：** [RFC25](https://github.com/eslint/rfcs/blob/master/designs/2019-rule-tester-improvements/README.md)、[#12096](https://github.com/eslint/eslint/pull/12096)、[#12955](https://github.com/eslint/eslint/pull/12955)

<a id="-the-cliengine-class-has-been-deprecated"></a>

## <a name="deprecate-cliengine"></a> `CLIEngine` 类已弃用

[`CLIEngine` 类](../integrate/nodejs-api#cliengine)已弃用，并由新的 [`ESLint` 类](../integrate/nodejs-api#eslint-class)取代。

`CLIEngine` 类提供的是同步 API，这阻碍了并行代码检查、在可共享配置/解析器/插件/格式化程序中支持 ES 模块，以及可视化显示代码检查运行进度等功能的实现。新的 `ESLint` 类提供异步 API，ESLint 核心今后将使用该 API。`CLIEngine` 在可预见的未来仍会保留在核心中，但未来的主要版本可能会将其移除。

**应对方法：** 如果你目前正在使用 `CLIEngine`，请更新代码，改用新的 `ESLint` 类。下表列出了现有 `CLIEngine` 方法与对应的 `ESLint` 方法：

| `CLIEngine`                                  | `ESLint`                           |
| :------------------------------------------- | :--------------------------------- |
| `executeOnFiles(patterns)`                   | `lintFiles(patterns)`              |
| `executeOnText(text, filePath, warnIgnored)` | `lintText(text, options)`          |
| `getFormatter(name)`                         | `loadFormatter(name)`              |
| `getConfigForFile(filePath)`                 | `calculateConfigForFile(filePath)` |
| `isPathIgnored(filePath)`                    | `isPathIgnored(filePath)`          |
| `static outputFixes(results)`                | `static outputFixes(results)`      |
| `static getErrorResults(results)`            | `static getErrorResults(results)`  |
| `static getFormatter(name)`                  | （已移除 ※1）                       |
| `addPlugin(pluginId, definition)`            | `plugins` 构造函数选项             |
| `getRules()`                                 | （尚未实现）                        |
| `resolveFileGlobPatterns()`                  | （已移除 ※2）                       |

- ※1 `engine.getFormatter()` 方法目前会原样返回已加载程序包的对象，因此出于向后兼容的考虑，很难为格式化程序添加新功能。新的 `eslint.loadFormatter()` 方法会返回一个封装已加载程序包对象的适配器对象，以便更轻松地添加新功能。此外，该适配器对象可以访问 `ESLint` 实例，以计算默认数据（例如，使用已加载插件的规则生成 `rulesMeta`）。因此，`ESLint` 类只实现了实例版本的 `loadFormatter()` 方法。
- ※2 从 ESLint 6 开始，ESLint 使用不同于 `resolveFileGlobPatterns()` 方法的逻辑来遍历文件，因此该方法已不再有用。

**相关问题：** [RFC40](https://github.com/eslint/rfcs/blob/master/designs/2019-move-to-async-api/README.md)、[#12939](https://github.com/eslint/eslint/pull/12939)