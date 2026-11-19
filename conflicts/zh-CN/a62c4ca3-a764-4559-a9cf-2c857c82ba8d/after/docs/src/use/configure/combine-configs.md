---
title: 合并配置
eleventyNavigation:
    key: combine configs
    parent: configure
    title: 合并配置
    order: 6
---

在许多情况下，你不会从头编写 ESLint 配置文件，而是会结合使用预定义配置、可共享配置以及自己的覆盖项，为项目创建配置。本页将介绍一些可在配置文件中合并配置的常用方式。

<a id="apply-a-config-object"></a>

## 应用配置对象

如果你从其他模块导入了一个[配置对象](../core-concepts/glossary#config-object)，可以创建一个带有 `files` 键的新对象，并使用 `extends` 键合并导入对象的其余属性，从而将它应用于部分文件。例如：

```js
// eslint.config.js
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

这里，预定义配置 `"js/recommended"` 会先应用于匹配模式 `"**/*.js"` 的文件，然后再为 `no-unused-vars` 添加所需的配置。

<a id="apply-a-config-array"></a>

## 应用配置数组

如果你从其他模块导入了一个[配置数组](../core-concepts/glossary#config-array)，可以使用 `extends` 键将配置数组（配置对象数组）应用于部分文件。例如：

```js
// eslint.config.js
import exampleConfigs from "eslint-config-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [exampleConfigs],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

这里，可共享配置 `exampleConfigs` 会先应用于匹配模式 "`**/*.js`" 的文件，然后另一个配置对象会为 `no-unused-vars` 添加所需的配置。