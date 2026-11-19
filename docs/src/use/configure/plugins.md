---
title: 配置插件
eleventyNavigation:
    key: configure plugins
    parent: configure
    title: 配置插件
    order: 4
---

::: tip
本页介绍如何使用扁平配置格式配置插件。
:::

你可以通过多种不同的方式使用插件扩展 ESLint。插件可以包含：

- 自定义规则，用于验证代码是否符合特定要求，以及在代码不符合要求时采取什么措施。
- 自定义配置。有关如何使用这些配置的详细信息，请参阅插件文档。
- 自定义处理器，用于从其他类型的文件中提取 JavaScript 代码，或在代码检查前对代码进行预处理。

<a id="configure-plugins"></a>

## 配置插件

ESLint 支持使用第三方插件。插件只是符合 ESLint 可识别的特定接口的对象。

要在[配置文件](./configuration-files#configuration-file)中配置插件，请使用 `plugins` 键。该键包含一个对象，其属性表示插件命名空间，属性值则是插件对象。

```js
// eslint.config.js
import example from "eslint-plugin-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		plugins: {
			example,
		},
		rules: {
			"example/rule1": "warn",
		},
	},
]);
```

::: tip
创建插件命名空间时，通常使用 npm 包名并去掉 `eslint-plugin-` 前缀。在上面的示例中，`eslint-plugin-example` 使用的命名空间是 `example`。
:::

<a id="configure-a-local-plugin"></a>

### 配置本地插件

插件无需发布到 npm 即可供 ESLint 使用。你也可以直接从文件加载插件，如下例所示：

```js
// eslint.config.js
import local from "./my-local-plugin.js";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		plugins: {
			local,
		},
		rules: {
			"local/rule1": "warn",
		},
	},
]);
```

此处使用了命名空间 `local`，你也可以改用任何喜欢的名称。

<a id="configure-a-virtual-plugin"></a>

### 配置虚拟插件

你可以直接在配置中虚拟创建插件定义。例如，假设你有一个名为 `my-rule.js` 的文件，其中包含一条想要在配置中启用的规则。你可以定义一个虚拟插件来实现这一点，如下例所示：

```js
// eslint.config.js
import myRule from "./rules/my-rule.js";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		plugins: {
			local: {
				rules: {
					"my-rule": myRule,
				},
			},
		},
		rules: {
			"local/my-rule": "warn",
		},
	},
]);
```

此处使用命名空间 `local` 来定义虚拟插件。随后，规则 `myRule` 会在虚拟插件的 `rules` 对象中被命名为 `my-rule`。（有关插件的完整格式，请参阅[创建插件](../../extend/plugins)。）然后，你可以通过 `local/my-rule` 引用该规则并进行配置。

<a id="use-plugin-rules"></a>

## 使用插件规则

你可以使用插件中包含的特定规则。为此，请在配置对象中使用 `plugins` 键指定插件。`plugin` 键的值是一个对象，其中插件名称作为属性名，属性值则是插件对象本身。示例如下：

```js
// eslint.config.js
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			jsdoc: jsdoc,
		},
		rules: {
			"jsdoc/require-description": "error",
			"jsdoc/check-values": "error",
		},
	},
]);
```

在此配置中，JSDoc 插件被定义为 `jsdoc`。每个规则名称中的前缀 `jsdoc/` 表示该规则来自同名插件，而不是 ESLint 本身。

由于插件名称和插件对象都是 `jsdoc`，你也可以将配置简写为：

```js
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			jsdoc,
		},
		rules: {
			"jsdoc/require-description": "error",
			"jsdoc/check-values": "error",
		},
	},
]);
```

虽然这是最常见的约定，但你不必使用插件指定的名称。你可以指定任意前缀，例如：

```js
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			jsd: jsdoc,
		},
		rules: {
			"jsd/require-description": "error",
			"jsd/check-values": "error",
		},
	},
]);
```

此配置对象使用 `jsd` 作为插件前缀，而不是 `jsdoc`。

<a id="specify-a-processor"></a>

## 指定处理器

插件可能会提供处理器。处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对这些代码进行代码检查。或者，处理器也可以在预处理期间转换 JavaScript 代码。

要在[配置文件](./configuration-files#configuration-file)中指定处理器，请使用 `processor` 键，并将处理器名称设为 `namespace/processor-name` 格式。例如，以下配置对 `*.md` 文件使用 `@eslint/markdown` 提供的处理器。

```js
// eslint.config.js
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.md"],
		plugins: {
			markdown,
		},
		processor: "markdown/markdown",
	},
]);
```

处理器可能会生成诸如 `0.js` 和 `1.js` 这样的命名代码块。ESLint 会将此类命名代码块视为原始文件的子文件。你可以通过添加配置对象，为命名代码块指定其他配置。例如，以下配置会对 Markdown 文件中以 `.js` 结尾的命名代码块禁用 `strict` 规则。

```js
// eslint.config.js
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export default defineConfig([
	// applies to all JavaScript files
	{
		rules: {
			strict: "error",
		},
	},

	// applies to Markdown files
	{
		files: ["**/*.md"],
		plugins: {
			markdown,
		},
		processor: "markdown/markdown",
	},

	// applies only to JavaScript blocks inside of Markdown files
	{
		files: ["**/*.md/*.js"],
		rules: {
			strict: "off",
		},
	},
]);
```

只有当命名代码块是 JavaScript 文件，或与配置对象中的 `files` 条目匹配时，ESLint 才会对其进行代码检查。如果你想对非 JavaScript 的命名代码块进行代码检查，请确保添加具有匹配 `files` 条目的配置对象。另请注意，[全局忽略项](./ignore)同样适用于命名代码块。

```js
// eslint.config.js
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";

export default defineConfig([
	// applies to Markdown files
	{
		files: ["**/*.md"],
		plugins: {
			markdown,
		},
		processor: "markdown/markdown",
	},

	// applies to all .jsx files, including jsx blocks inside of Markdown files
	{
		files: ["**/*.jsx"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},

	// ignore jsx blocks inside of test.md files
	{
		ignores: ["**/test.md/*.jsx"],
	},
]);
```

<a id="specify-a-language"></a>

## 指定语言

插件可能会提供语言。语言使 ESLint 能够对 JavaScript 以外的编程语言进行代码检查。要在[配置文件](./configuration-files#configuration-file)中指定语言，请使用 `language` 键，并将语言名称设为 `namespace/language-name` 格式。例如，以下配置对 `*.json` 文件使用 `@eslint/json` 提供的 `json/jsonc` 语言。

```js
// eslint.config.js
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.json"],
		plugins: {
			json,
		},
		language: "json/jsonc",
	},
]);
```

::: tip
在配置对象中指定 `language` 后，`languageOptions` 就会针对该语言而定。每种语言都有自己的 `languageOptions`，因此请查阅插件文档，了解有哪些选项可用。
:::

<a id="common-problems"></a>

## 常见问题

- [使用 ESLint < v9.0.0 API 的插件规则](../troubleshooting/v9-rule-api-changes)
- [插件配置尚未升级为扁平配置](migration-guide#use-eslintrc-configs-in-flat-config)
