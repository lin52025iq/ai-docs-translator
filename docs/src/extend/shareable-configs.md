---
title: 共享配置
eleventyNavigation:
    key: share configs
    parent: extend eslint
    title: 共享配置
    order: 3
---

要共享 ESLint 配置，请创建一个**可共享配置**。你可以将可共享配置发布到 [npm](https://www.npmjs.com/)，供其他人下载并在他们的 ESLint 项目中使用。

本文介绍如何创建和发布可共享配置。

::: tip
本文介绍如何使用扁平配置格式创建可共享配置。
:::

<a id="create-a-shareable-config"></a>

## 创建可共享配置

可共享配置只是导出配置对象或数组的 npm 包。首先，像往常一样[创建一个 Node.js 模块](https://docs.npmjs.com/getting-started/creating-node-modules)。

虽然包名可以任意选择，但我们建议使用以下命名惯例之一，以便他人更容易识别你的包：

- 以 `eslint-config-` 开头，例如 `eslint-config-myconfig`。
- 对于 npm [作用域模块](https://docs.npmjs.com/misc/scope)，使用 `@scope/eslint-config` 作为模块名或前缀，例如 `@scope/eslint-config` 或 `@scope/eslint-config-myconfig`。

在模块中，从模块的 [`main`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#main) 入口文件导出可共享配置。默认的 main 入口文件是 `index.js`。例如：

```js
// index.js
export default [
	{
		languageOptions: {
			globals: {
				MyGlobal: true,
			},
		},

		rules: {
			semi: [2, "always"],
		},
	},
];
```

由于 `index.js` 文件只是 JavaScript，你可以从文件中读取这些设置，也可以动态生成它们。

::: tip
大多数情况下，你会希望从可共享配置中导出一个配置对象数组。不过，你也可以只导出单个配置对象。请确保文档中清楚地展示如何在 `eslint.config.js` 文件中使用可共享配置，以免用户困惑。
:::

<a id="publishing-a-shareable-config"></a>

## 发布可共享配置

可共享配置准备就绪后，你可以将其[发布到 npm](https://docs.npmjs.com/getting-started/publishing-npm-packages)，与他人共享。我们建议在 `package.json` 文件中使用 `eslint` 和 `eslintconfig` [关键字](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#keywords)，以便他人轻松找到你的模块。

你应在 `package.json` 中使用 [peerDependencies](https://docs.npmjs.com/files/package.json#peerdependencies) 字段声明对 ESLint 的依赖。为了确保未来的兼容性，推荐使用 ">=" 范围语法，并指定所需的最低 ESLint 版本。例如：

```json
{
	"peerDependencies": {
		"eslint": ">=10.0.0"
	}
}
```

如果可共享配置依赖某个插件或自定义解析器，应在 `package.json` 中将这些包指定为 `dependencies`。

<a id="use-a-shareable-config"></a>

## 使用可共享配置

要使用可共享配置，请在 `eslint.config.js` 文件中导入该包，并像下面这样使用 `extends` 将其添加到导出的数组中：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import myconfig from "eslint-config-myconfig";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [myconfig],
	},
]);
```

::: warning
不能将可共享配置与 ESLint CLI 的 [`--config`](../use/command-line-interface#-c---config) 标志一起使用。
:::

<a id="overriding-settings-from-shareable-configs"></a>

### 覆盖可共享配置中的设置

导入可共享配置后，你可以直接在 `eslint.config.js` 文件中添加设置来覆盖它。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import myconfig from "eslint-config-myconfig";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [myconfig],

		// anything from here will override myconfig
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

<a id="sharing-multiple-configs"></a>

## 共享多个配置

可共享配置只是 npm 包，因此你可以在同一个包中导出任意数量的配置。除了使用 `package.json` 中的 `main` 入口指定默认配置外，你还可以在 npm 包中添加新文件来指定其他可共享配置，然后在 `eslint.config.js` 文件中引用它们。

例如，你可以在 npm 包的根目录中创建一个名为 `my-special-config.js` 的文件，并导出一个配置，如下所示：

```js
// my-special-config.js
export default {
	rules: {
		quotes: [2, "double"],
	},
};
```

接下来，假设包名为 `eslint-config-myconfig`，你就可以通过以下方式访问其他配置：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import myconfig from "eslint-config-myconfig";
import mySpecialConfig from "eslint-config-myconfig/my-special-config.js";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [myconfig, mySpecialConfig],

		// anything from here will override myconfig
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

::: important
我们强烈建议始终为你的包提供默认导出，以免造成混淆。
:::

<a id="further-reading"></a>

## 延伸阅读

- [npm 开发者指南](https://docs.npmjs.com/misc/developers)
