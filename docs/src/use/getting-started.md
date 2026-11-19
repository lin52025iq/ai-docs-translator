---
title: ESLint 入门指南
eleventyNavigation:
    key: getting started
    parent: use eslint
    title: 入门
    order: 1
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}
{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

ESLint 是一款用于识别和报告 ECMAScript/JavaScript 代码中模式的工具，旨在提高代码一致性并避免错误。

ESLint 完全支持插件化。每条规则都是一个插件，你可以在运行时添加更多规则。你也可以添加社区插件、配置和解析器，以扩展 ESLint 的功能。

<a id="prerequisites"></a>

## 前置条件

要使用 ESLint，必须安装并构建支持 SSL 和 ICU 的 [Node.js](https://nodejs.org/en/)（`^20.19.0`、`^22.13.0` 或 `>=24`）。（如果你使用的是官方 Node.js 发行版，则始终内置 SSL 和 ICU 支持。）

如果你使用 ESLint 的 TypeScript 类型定义，则需要 TypeScript 5.3 或更高版本。

<a id="quick-start"></a>

## 快速入门

你可以使用以下命令安装和配置 ESLint：

{{ npm_tabs({
    command: "init-create",
    packages: ["@eslint/config@latest"],
    args: []
}) }}

如果你想使用托管在 npm 上的特定可共享配置，可以使用 `--config` 选项并指定包名：

{{ npm_tabs({
    command: "init-create",
    packages: ["@eslint/config@latest", "--", "--config", "eslint-config-xo"],
    args: [],
    comment: "use `eslint-config-xo` shared config - npm 7+"
}) }}

**注意：**`npm init @eslint/config` 假定你已经有一个 `package.json` 文件。如果没有，请务必先运行 `npm init` 或 `yarn init`。

之后，你可以像这样对任意文件或目录运行 ESLint：

{{ npx_tabs({
    package: "eslint",
    args: ["yourfile.js"]
}) }}

<a id="configuration"></a>

## 配置

**注意：**如果你使用的是早于 9.0.0 的版本，请参阅[迁移指南](configure/migration-guide)。

运行 `npm init @eslint/config` 时，系统会询问一系列问题，以确定你如何使用 ESLint 以及应该包含哪些选项。回答这些问题后，系统会在你的目录中创建一个 `eslint.config.js`（或 `eslint.config.mjs`）文件。

例如，其中一个问题是“你的代码在哪里运行？”。如果你选择 Browser，配置文件就会包含 Web 浏览器中的全局变量定义。示例如下：

```js
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], languageOptions: { globals: globals.browser } },
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
]);
```

`"js/recommended"` 配置会启用 [规则页面](../rules)上标记为推荐的所有规则。你也可以在 [npmjs.com](https://www.npmjs.com/search?q=eslint-config) 上搜索“eslint-config”，使用其他人创建的配置。除非你扩展了共享配置，或在配置中明确启用规则，否则 ESLint 不会对你的代码进行代码检查。

你可以通过定义一个带有 `rules` 键的新对象来单独配置规则，如下例所示：

```js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },

	{
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
]);
```

`"no-unused-vars"` 和 `"no-undef"` 是 ESLint 中[规则](../rules)的名称。第一个值是规则的错误级别，可以是以下值之一：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 将规则设为警告（不影响退出代码）
- `"error"` 或 `2` - 将规则设为错误（退出代码将为 1）

这三个错误级别让你可以精细控制 ESLint 应用规则的方式（有关更多配置选项和详细信息，请参阅配置文档）。

<a id="global-install"></a>

## 全局安装

你也可以使用 `npm install eslint --global` 全局安装 ESLint，而不是在本地安装。不过，我们不建议这样做；即使你全局安装了 ESLint，使用的任何插件或可共享配置仍必须在本地安装。

<a id="manual-set-up"></a>

## 手动设置

你也可以在项目中手动设置 ESLint。

::: important
如果你使用 [pnpm](https://pnpm.io)，请务必创建一个 `.npmrc` 文件，并至少包含以下设置：

```text
auto-install-peers=true
node-linker=hoisted
```

这样可以确保 pnpm 以更兼容 npm 的方式安装依赖，并降低出错的可能性。
:::

开始之前，你必须已经有一个 `package.json` 文件。如果没有，请务必先运行 `npm init` 或 `yarn init` 来创建该文件。

1. 在项目中安装 ESLint 包：

{{ npm_tabs({
    command: "install",
    packages: ["eslint@latest", "@eslint/js@latest"],
    args: ["--save-dev"]
}) }}

2. 添加一个 `eslint.config.js` 文件：

    ```shell
    # Create JavaScript configuration file
    touch eslint.config.js
    ```

3. 在 `eslint.config.js` 文件中添加配置。请参阅 [配置 ESLint 文档](configure/)，了解如何添加规则、自定义配置、插件等。

    ```js
    import { defineConfig } from "eslint/config";
    import js from "@eslint/js";

    export default defineConfig([
    	{
    		files: ["**/*.js"],
    		plugins: {
    			js,
    		},
    		extends: ["js/recommended"],
    		rules: {
    			"no-unused-vars": "warn",
    			"no-undef": "warn",
    		},
    	},
    ]);
    ```

4. 使用 ESLint CLI 对代码进行检查：

{{ npx_tabs({
    package: "eslint",
    args: ["project-dir/", "file.js"]
}) }}

有关可用 CLI 选项的更多信息，请参阅[命令行界面](./command-line-interface)。

---

<a id="next-steps"></a>

## 后续步骤

- 了解 ESLint 的[高级配置](configure/)。
- 熟悉[命令行选项](command-line-interface)。
- 探索将 ESLint [集成](integrations)到编辑器、构建系统等其他工具中的方式。
- 找不到合适的规则？自己编写[自定义规则](../extend/custom-rules)。
- 通过[参与贡献](../contribute/)让 ESLint 变得更好。
