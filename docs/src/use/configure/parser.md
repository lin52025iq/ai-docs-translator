---
title: 配置解析器
eleventyNavigation:
    key: configure parser
    parent: configure
    title: 配置解析器
    order: 5
---

::: tip
本页介绍如何使用扁平配置格式配置解析器。
:::

你可以使用自定义解析器将 JavaScript 代码转换为抽象语法树，供 ESLint 进行检查。如果你的代码与 ESLint 的默认解析器 Espree 不兼容，可以添加自定义解析器。

<a id="configure-a-custom-parser"></a>

## 配置自定义解析器

在许多情况下，你可以使用 ESLint 随附的[默认解析器](https://github.com/eslint/js/tree/main/packages/espree)来解析 JavaScript 代码。你也可以使用 `parser` 属性覆盖默认解析器。`parser` 属性必须是符合[解析器接口](../../extend/custom-parsers)的对象。例如，你可以使用 [`@babel/eslint-parser`](https://www.npmjs.com/package/@babel/eslint-parser) 包，让 ESLint 能够解析实验性语法：

```js
// eslint.config.js
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js", "**/*.mjs"],
		languageOptions: {
			parser: babelParser,
		},
	},
]);
```

此配置确保使用 Babel 解析器而非默认的 Espree 解析器，来解析所有以 `.js` 和 `.mjs` 结尾的文件。

以下第三方解析器已知与 ESLint 兼容：

- [Esprima](https://www.npmjs.com/package/esprima)
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) - 一个包装器，可让 [Babel](https://babeljs.io) 解析器与 ESLint 兼容。
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - 将 TypeScript 转换为兼容 ESTree 的形式，以便在 ESLint 中使用。

::: warning
无法保证外部解析器能与 ESLint 正常协同工作。对于仅影响第三方解析器的兼容性问题所导致的错误，ESLint 不会予以修复。
:::

<a id="configure-parser-options"></a>

## 配置解析器选项

解析器可能接受用于改变其行为的选项。`languageOptions.parserOptions` 用于直接向解析器传递选项。这些选项始终因解析器而异，因此你需要查阅所用解析器的文档，了解可用选项。以下是为 Babel ESLint 解析器设置解析器选项的示例：

```js
// eslint.config.js
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					babelrc: false,
					configFile: false,
					presets: ["@babel/preset-env"],
				},
			},
		},
	},
]);
```

::: tip
除了 `languageOptions.parserOptions` 中指定的选项外，ESLint 还会向所有解析器传递 `languageOptions.ecmaVersion` 和 `languageOptions.sourceType`。ESLint 会在内部使用 `languageOptions.ecmaVersion`（例如，添加内置全局变量）；传递这些值也能让解析器了解 ESLint 检查 JavaScript 代码时所处的上下文。如果你需要专门为解析器传递不同的 `ecmaVersion` 或 `sourceType`，可以设置 `languageOptions.parserOptions.ecmaVersion` 或 `languageOptions.parserOptions.sourceType`。对于解析器而言，这些选项的优先级高于相应的 `languageOptions` 选项。
:::