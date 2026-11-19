---
title: 从 JSCS 迁移
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}

2016 年 4 月，我们[宣布](https://eslint.org/blog/2016/04/welcoming-jscs-to-eslint) JSCS 项目即将关闭，JSCS 团队将加入 ESLint 团队。本指南旨在帮助 JSCS 用户将设置和项目迁移到 ESLint。我们已尽可能自动化转换过程，但仍需手动进行一些更改。

<a id="terminology"></a>

## 术语

开始迁移到 ESLint 之前，了解 ESLint 使用的一些术语，以及它们与 JSCS 术语的对应关系，会很有帮助。

- **配置文件** - 在 JSCS 中，配置文件可以是 `.jscsrc`、`.jscsrc.json`、`.jscsrc.yaml` 或 `.jscsrs.js`。在 ESLint 中，配置文件可以是 `.eslintrc.json`、`.eslintrc.yml`、`.eslintrc.yaml` 或 `.eslintrc.js`（此外还有已弃用的 `.eslintrc` 文件格式）。
- **预设** - JSCS 内置了许多预定义配置。ESLint 只内置一种预定义配置（`eslint:recommended`），且其中未启用任何样式规则。不过，ESLint 支持[可共享配置](../extend/shareable-configs)。可共享配置是单独发布到 npm 的配置，几乎所有 JSCS 预设都有对应的可共享配置（见下文[“转换预设”一节](#converting-presets)）。此外，配置文件中的 `preset` 选项相当于 ESLint 的 `extends` 选项。

<a id="convert-configuration-files-using-polyjuice"></a>

## 使用 Polyjuice 转换配置文件

[Polyjuice](https://github.com/brenolf/polyjuice) 是一个实用工具，可自动将 JSCS（和 JSHint）配置文件转换为 ESLint 配置文件。它能够识别这两个工具中的对应规则，并自动生成一个 ESLint 配置文件，尽可能接近你现有的 JSCS 文件。

安装 Polyjuice：

{{ npm_tabs({
    command: "install",
    packages: ["polyjuice"],
    args: ["--global"]
}) }}

Polyjuice 适用于 JSON 配置文件，因此，如果你使用的是 JavaScript 或 YAML 格式的 JSCS 配置文件，应先将其转换为 JSON 配置文件。

若要转换配置文件，请使用 `--jscs` 标志传入 `.jscs.json` 文件的位置：

```shell
polyjuice --jscs .jscsrc.json > .eslintrc.json
```

这会创建一个 `.eslintrc.json` 文件，其中包含与 `.jscsrc.json` 等效的规则。

如果你有多个 `.jscsrc.json` 文件，可以将它们全部传入，Polyjuice 会将它们合并到一个 `.eslintrc.json` 文件中：

```shell
polyjuice --jscs .jscsrc.json ./foo/.jscsrc.json > .eslintrc.json
```

**注意：**Polyjuice 能够根据 JSCS 配置生成相当合理的 ESLint 配置，但转换结果可能并非百分之百准确。你看到的警告可能与使用 JSCS 时不同，因此使用 Polyjuice 后可能需要进一步修改配置。如果你在 JSCS 中使用内联注释启用或禁用某些规则，尤其需要注意这一点（你需要手动将这些注释转换为 ESLint 风格的注释，详见本页后面的[“内联禁用规则”](#disable-rules-inline)）。

<a id="create-a-new-configuration-from-scratch"></a>

### 从头创建新配置

如果你不想直接将 JSCS 配置转换为 ESLint 配置，可以使用 ESLint 内置的向导开始设置。运行：

{{ npm_tabs({
    command: "init-create",
    packages: ["@eslint/config@latest"],
    args: []
}) }}

向导会引导你回答一系列问题，帮助你设置一个基础配置文件。

<a id="converting-presets"></a>

## 转换预设

大多数 JSCS 预设都有对应的可共享配置。下表列出了各个 JSCS 预设对应的可共享配置：

| **JSCS 预设**      | **ESLint 可共享配置**                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `airbnb`           | [`eslint-config-airbnb-base`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) |
| `crockford`        | （不可用）                                                                                                          |
| `google`           | [`eslint-config-google`](https://github.com/google/eslint-config-google)                                           |
| `grunt`            | [`eslint-config-grunt`](https://github.com/markelog/eslint-config-grunt)                                           |
| `idiomatic`        | [`eslint-config-idiomatic`](https://github.com/jamespamplin/eslint-config-idiomatic)                               |
| `jquery`           | [`eslint-config-jquery`](https://github.com/jquery/eslint-config-jquery)                                           |
| `mdcs`             | [`eslint-config-mdcs`](https://github.com/zz85/mrdoobapproves)                                                     |
| `node-style-guide` | [`eslint-config-node-style-guide`](https://github.com/pdehaan/eslint-config-node-style-guide)                      |
| `wikimedia`        | [`eslint-config-wikimedia`](https://github.com/wikimedia/eslint-config-wikimedia)                                  |
| `wordpress`        | [`eslint-config-wordpress`](https://github.com/WordPress-Coding-Standards/eslint-config-wordpress)                 |

例如，假设你使用的是 `airbnb` 预设，那么你的 `.jscsrc` 文件如下所示：

```json
{
	"preset": "airbnb"
}
```

若要在 ESLint 中实现相同的功能，首先需要安装 `eslint-config-airbnb` 可共享配置包：

{{ npm_tabs({
    command: "install",
    packages: ["eslint-config-airbnb-base"],
    args: ["--save-dev"]
}) }}

然后按如下方式修改配置文件：

```json
{
	"extends": "airbnb-base"
}
```

ESLint 会看到 `"airbnb-base"`，并查找 `eslint-config-airbnb-base`（这样可以少输入一些内容）。

<a id="disable-rules-inline"></a>

## 内联禁用规则

JSCS 和 ESLint 都可以使用文件中的注释，在代码的特定部分禁用规则。下表列出了 JSCS 的内联配置注释及其对应的 ESLint 注释。

| **说明**               | **JSCS 注释**                                                                      | **ESLint 注释**                             |
| ---------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------- |
| 禁用所有规则           | `// jscs:disable` 或 `/* jscs:disable */`                                           | `/* eslint-disable */`                        |
| 启用所有规则           | `// jscs:enable` 或 `/* jscs:enable */`                                             | `/* eslint-enable */`                         |
| 禁用一条规则           | `// jscs:disable ruleName` 或 `/* jscs:disable ruleName */`                         | `/* eslint-disable rule-name */`              |
| 启用一条规则           | `// jscs:enable ruleName` 或 `/* jscs:enable ruleName */`                           | `/* eslint-enable rule-name */`               |
| 禁用多条规则           | `// jscs:disable ruleName1, ruleName2` 或 `/* jscs:disable ruleName1, ruleName2 */` | `/* eslint-disable rule-name1, rule-name2 */` |
| 启用多条规则           | `// jscs:enable ruleName1, ruleName2` 或 `/* jscs:enable ruleName1, ruleName2 */`   | `/* eslint-enable rule-name1, rule-name2 */`  |
| 在单行中禁用一条规则   | `// jscs:ignore ruleName`                                                           | `// eslint-disable-line rule-name`            |

<a id="command-line-options"></a>

## 命令行选项

JSCS 和 ESLint 都有与许多配置选项对应的命令行参数。以下是 JSCS 命令行选项在 ESLint 中的对应选项。

### `--fix`

JSCS 使用 `--fix` 选项对代码应用自动修复：

```shell
jscs --fix file.js
```

ESLint 也有相同的选项：

```shell
eslint --fix file.js
```

### `--auto-configure`

JSCS 的 `--auto-configure` 选项会根据在指定文件中发现的内容创建配置：

```shell
jscs --auto-configure file.js
```

在 ESLint 中，使用 `--init` 时有一个类似的选项。只需选择“检查你的 JavaScript 文件”：

```shell
eslint --init
? How would you like to configure ESLint? (Use arrow keys)
> Answer questions about your style
  Use a popular style guide
  Inspect your JavaScript file(s)
```

## `--config`, `-c`

JSCS 允许通过 `--config` 或 `-c` 在命令行中指定要使用的配置文件，例如：

```shell
jscs --config myconfig.json file.js
jscs -c myconfig.json file.js
```

ESLint 也支持这两个标志：

```shell
eslint --config myconfig.json file.js
eslint -c myconfig.json file.js
```

<a id="piping-code-into-eslint"></a>

## 将代码通过管道传入 ESLint

在 JSCS 中，可以这样通过管道传入代码：

```shell
cat file.js | jscs
```

在 ESLint 中也可以通过管道传入代码，但需要使用 `--stdin` 标志：

```shell
cat file.js | eslint --stdin
```