---
title: 配置语言选项
eleventyNavigation:
    key: configure language options
    parent: configure
    title: 配置语言选项
    order: 2
---

::: tip
本页介绍如何使用扁平配置格式配置语言选项。
:::

JavaScript 生态系统包含各种运行时、版本、扩展和框架。它们各自支持的语法和全局变量可能有所不同。ESLint 允许你为项目所用的 JavaScript 配置特定的语言选项，例如自定义全局变量。你也可以使用插件扩展 ESLint，以支持项目所需的语言选项。

<a id="specify-javascript-options"></a>

## 指定 JavaScript 选项

ESLint 允许你指定要支持的 JavaScript 语言选项。默认情况下，ESLint 预期使用最新的第 4 阶段 ECMAScript 语法和 ECMAScript 模块 (ESM) 模式。你可以通过使用 `languageOptions` 键并指定以下一个或多个属性来覆盖这些设置：

- `ecmaVersion`（默认值：`"latest"`）- 表示受代码检查的代码所使用的 ECMAScript 版本，同时决定语法和可用的全局变量。设为 `3` 或 `5` 时，分别表示 ECMAScript 3 和 5。除此之外，可以使用从 `2015` 到当前年份之间的任意年份。在大多数情况下，我们建议使用默认值 `"latest"`，以确保始终使用最新的 ECMAScript 版本。
- `sourceType`（默认值：`"module"`）- 表示所用 JavaScript 文件的模式。可用值包括：
    - `module` - ESM 模块（当 `ecmaVersion` 为 `3` 或 `5` 时无效）。代码具有模块作用域，并以严格模式运行。
    - `commonjs` - CommonJS 模块（适用于使用 `require()` 的代码）。代码具有顶层函数作用域，并以非严格模式运行。
    - `script` - 非模块。代码具有共享的全局作用域，并以非严格模式运行。

以下是一个[配置文件](./configuration-files#configuration-file)示例，可用于对 ECMAScript 5 代码进行代码检查：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			ecmaVersion: 5,
			sourceType: "script",
		},
	},
]);
```

<a id="specify-parser-options"></a>

## 指定解析器选项

如果你使用 ESLint 内置解析器，还可以通过指定 `languageOptions.parserOptions` 键来更改 ESLint 解析代码的方式。所有选项的默认值均为 `false`：

- `allowReserved` - 允许将保留字用作标识符（如果 `ecmaVersion` 为 `3`）。
- `ecmaFeatures` - 一个对象，用于指定你希望使用的其他语言功能：
    - `globalReturn` - 允许在全局作用域中使用 `return` 语句。此选项仅在 `languageOptions.sourceType` 设为 `"script"` 时适用。当 `languageOptions.sourceType` 设为 `"commonjs"` 时，无论此选项如何设置，都允许顶层 `return` 语句。当 `languageOptions.sourceType` 设为 `"module"` 时，即使将此选项设为 `true`，也不允许顶层 `return` 语句。
    - `impliedStrict` - 启用全局[严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)（如果 `ecmaVersion` 为 `5` 或更高版本）。
    - `jsx` - 启用 [JSX](https://react.github.io/jsx/)。

以下是一个[配置文件](./configuration-files#configuration-file)示例，可在默认解析器中启用 JSX 解析：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
]);
```

::: tip
虽然可以在 `languageOptions.parserOptions` 中传入 `ecmaVersion` 和 `sourceType`，但对于默认解析器，我们不建议这样做。应改为直接在 `languageOptions` 中配置这些选项。如果两处都指定了这些选项，对于解析器而言，`languageOptions.parserOptions` 中的选项优先于 `languageOptions` 中的选项。
:::

::: important
请注意，支持 JSX 语法并不等同于支持 React。React 会对 JSX 语法应用 ESLint 无法识别的特定语义。如果你使用 React，我们建议使用 [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) 或 [`@eslint-react/eslint-plugin`](https://github.com/rel1cx/eslint-react)。
:::

<a id="specify-globals"></a>

## 指定全局变量

ESLint 的一些核心规则依赖于对代码运行时可用全局变量的了解。由于不同环境中的全局变量可能差异很大，并且也可能在运行时发生变化，ESLint 不会假设你的执行环境中存在哪些全局变量。如果你想使用需要了解可用全局变量的规则，可以在配置文件中定义全局变量，或在源代码中使用配置注释。

<a id="use-configuration-comments"></a>

### 使用配置注释

若要在 JavaScript 文件中使用注释指定全局变量，请使用以下格式：

```js
/* global var1, var2 */
```

这会定义两个全局变量 `var1` 和 `var2`。如果你还想指定这些全局变量是否可写（而不仅仅是可读），可以为每个变量设置 `"writable"` 标志：

```js
/* global var1:writable, var2:writable */
```

<a id="use-configuration-files"></a>

### 使用配置文件

若要在[配置文件](./configuration-files#configuration-file)中配置全局变量，请将 `languageOptions.globals` 配置属性设为一个对象，其中包含以你要使用的各个全局变量命名的键。对于每个全局变量键，将对应的值设为 `"writable"` 以允许覆盖该变量，或设为 `"readonly"` 以禁止覆盖。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			globals: {
				var1: "writable",
				var2: "readonly",
			},
		},
	},
]);
```

此配置允许在代码中覆盖 `var1`，但不允许覆盖 `var2`。

将全局变量的值设为 `"off"` 即可禁用该变量。例如，在大多数全局变量都可用但 `Promise` 不可用的环境中，你可以使用以下配置：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			globals: {
				Promise: "off",
			},
		},
	},
]);
```

::: tip
出于历史原因，布尔值 `false` 和字符串值 `"readable"` 等同于 `"readonly"`。同样，布尔值 `true` 和字符串值 `"writeable"` 等同于 `"writable"`。不过，已弃用这些旧值。
:::

<a id="predefined-global-variables"></a>

### 预定义全局变量

除了根据所配置的 `languageOptions.ecmaVersion` 自动启用的 ECMAScript 标准内置全局变量外，ESLint 不提供预定义的全局变量集合。你可以使用 [`globals`](https://www.npmjs.com/package/globals) 包，为特定环境启用所有全局变量。例如，以下示例展示了如何将 `console` 及其他浏览器全局变量添加到配置中。

```js
// eslint.config.js
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
]);
```

你也可以用同样的方式包含多个不同的全局变量集合。以下示例同时包含 Web 浏览器和 [Jest](https://jestjs.io/) 的全局变量：

```js
// eslint.config.js
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest,
			},
		},
	},
]);
```
