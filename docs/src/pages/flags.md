---
title: 功能标志
permalink: /flags/index.html
eleventyNavigation:
    key: feature flags
    parent: use eslint
    title: 功能标志
    order: 6
---

{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

ESLint 通过功能标志提供实验性功能和未来可能引入的破坏性变更，让用户选择启用所需行为。以下情况会使用功能标志：

1. 某项功能处于实验阶段，尚未准备好向所有人启用。
1. 某项功能属于破坏性变更，计划在下一个主版本中正式合并，但用户可以在下一个主版本发布前选择启用该行为。

<a id="flag-prefixes"></a>

## 标志前缀

标志的前缀表示其状态：

- `unstable_` 表示该功能处于实验阶段，其实现可能会在功能稳定之前发生变化。这是一项“使用风险自负”的功能。
- `v##_` 表示该功能已稳定，并将在下一个主版本中推出。例如，`v10_some_feature` 表示这是一项破坏性变更，将在 ESLint v10.0.0 中正式发布。这些标志会在每个主版本发布时移除，之后继续使用会报错。

如果某项功能不会造成破坏性变更，它可以在不发布主版本的情况下从不稳定状态转为默认启用。

以下策略适用于 `unstable_` 标志。

- 当功能稳定后
    - 如果默认启用该功能会造成破坏性变更，则会新增一个处于启用状态的 `v##_` 标志，并将 `unstable_` 标志设为非活动状态。之后继续使用 `unstable_` 标志会自动启用 `v##_` 标志，但会发出警告。
    - 否则，该功能将默认启用，并将 `unstable_` 标志设为非活动状态。之后继续使用 `unstable_` 标志会发出警告。
- 如果该功能被弃用，`unstable_` 标志将变为非活动状态。继续使用该标志会报错。
- 所有非活动的 `unstable_` 标志都会在每个主版本发布时移除，之后继续使用会报错。

<a id="active-flags"></a>

## 活动标志

{% if flags.active | length %}
以下标志目前可在 ESLint 中使用。

<table>
    <thead>
        <tr>
            <th>标志</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
{%- for name, desc in flags.active -%}
        <tr><td><code>{{name}}</code></td><td>{{ site.docs_ui.flag_descriptions[name] or desc }}</td></tr>
{%- endfor -%}
    </tbody>
</table>
{% else %}
目前没有活动标志。
{% endif %}

<a id="inactive-flags"></a>

## 非活动标志

{% if flags.inactive | length %}
以下标志曾经使用过，但目前已不再活动。

<table>
    <thead>
        <tr>
            <th>标志</th>
            <th>说明</th>
            <th>非活动原因</th>
        </tr>
    </thead>
    <tbody>
{%- for name, data in flags.inactive -%}
        <tr><td><code>{{name}}</code></td><td>{{data.description}}</td><td>{{data.inactivityReason}}</td></tr>
{%- endfor -%}
    </tbody>
</table>
{% else %}
目前没有非活动标志。
{% endif %}

<a id="how-to-use-feature-flags"></a>

## 如何使用功能标志

由于功能标志必须由用户主动选择启用，因此你需要手动启用所需的标志。

<a id="enable-feature-flags-with-the-cli"></a>

### 使用 CLI 启用功能标志

在命令行中，你可以使用 `--flag` 选项指定功能标志。你可以按需指定任意数量的标志：

{{ npx_tabs({
    package: "eslint",
    args: ["--flag", "flag_one", "--flag", "flag_two", "file.js"]
}) }}

<a id="enable-feature-flags-with-environment-variables"></a>

### 使用环境变量启用功能标志

你也可以使用 `ESLINT_FLAGS` 环境变量设置功能标志。多个标志可以用逗号分隔，并会与通过 CLI 或 API 传入的标志合并。例如，下面演示了如何将功能标志添加到 `.bashrc` 或 `.bash_profile` 文件中：

```bash
export ESLINT_FLAGS="flag_one,flag_two"
```

如果你想在多个 ESLint 命令中启用相同的标志，或者在 CI/CD 流水线中使用，这种方式尤其有用。

<a id="enable-feature-flags-with-the-api"></a>

### 使用 API 启用功能标志

使用 API 时，你可以向 `ESLint` 和 `Linter` 类传入 `flags` 数组：

```js
const { ESLint, Linter } = require("eslint");

const eslint = new ESLint({
	flags: ["flag_one", "flag_two"],
});

const linter = new Linter({
	flags: ["flag_one", "flag_two"],
});
```

::: tip
`ESLint` 类也会读取 `ESLINT_FLAGS` 环境变量来设置标志。
:::

<a id="enable-feature-flags-in-vs-code"></a>

### 在 VS Code 中启用功能标志

要在 VS Code ESLint 扩展的编辑器中启用标志，请在 [`settings.json`](https://code.visualstudio.com/docs/configure/settings#_settings-json-file) 文件的 `eslint.options` 设置中指定所需的标志：

```json
{
	"eslint.options": { "flags": ["flag_one", "flag_two"] }
}
```

要在 VS Code ESLint 扩展的代码检查任务中启用标志，请指定 `eslint.lintTask.options` 设置：

```json
{
	"eslint.lintTask.options": "--flag flag_one --flag flag_two ."
}
```

{# <!-- markdownlint-disable-file MD046 --> #}
