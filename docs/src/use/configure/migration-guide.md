---
title: 配置迁移指南
eleventyNavigation:
    key: migration guide
    parent: configure
    title: 配置迁移指南
    order: 9
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}
{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

本指南概述如何将 ESLint 配置文件从 eslintrc 格式（通常配置在 `.eslintrc.js` 或 `.eslintrc.json` 文件中）迁移到新的扁平配置格式（通常配置在 `eslint.config.js` 文件中）。

要进一步了解扁平配置格式，请参阅[这篇博客文章](https://eslint.org/blog/2022/08/new-config-system-part-2/)。

有关扁平配置文件的参考信息，请参阅[扁平配置文件](configuration-files)。

<a id="migrate-your-config-file"></a>

## 迁移配置文件

要开始迁移，请对现有配置文件（`.eslintrc`、`.eslintrc.json`、`.eslintrc.yml`）使用[配置迁移工具](https://npmjs.com/package/@eslint/migrate-config)，如下所示：

{{ npx_tabs({
    package: "@eslint/migrate-config",
    args: [".eslintrc.json"]
}) }}

这会为你的 `eslint.config.js` 文件创建一个起点，但不保证无需进一步修改即可立即运行。不过，它会自动完成本指南中介绍的大部分转换工作。

::: important
配置迁移工具目前还不能很好地处理 `.eslintrc.js` 文件。如果你使用的是 `.eslintrc.js`，迁移结果会生成一个与配置求值结果相匹配的配置文件，其中不会包含任何函数、条件语句或配置中所表示的原始数据以外的内容。
:::

<a id="start-using-flat-config-files"></a>

## 开始使用扁平配置文件

自 ESLint v9.0.0 起，扁平配置文件格式一直是默认的配置文件格式。你无需进行任何额外配置，即可开始使用扁平配置文件格式。

要在 ESLint v8 中使用扁平配置，请在项目根目录放置一个 `eslint.config.js` 文件，**或**将 `ESLINT_USE_FLAT_CONFIG` 环境变量设为 `true`。

<a id="things-that-havent-changed-between-configuration-file-formats"></a>

## 配置文件格式之间没有变化的部分

虽然配置文件格式已从 eslintrc 改为扁平配置，但以下内容保持不变：

- 配置规则的语法。
- 配置处理器的语法。
- CLI，但 [CLI 标志的变化](#cli-flag-changes)中提到的标志除外。
- 全局变量的配置方式相同，但所在属性不同（请参阅[配置语言选项](#configure-language-options)）。

<a id="key-differences-between-configuration-formats"></a>

## 配置格式的主要区别

eslintrc 和扁平配置格式之间一些最显著的区别如下：

<a id="import-plugins-and-custom-parsers"></a>

### 导入插件和自定义解析器

eslintrc 文件使用基于字符串的导入系统：在 `plugins` 属性中加载插件，在 `extends` 属性中加载外部配置。

扁平配置文件将插件和解析器表示为 JavaScript 对象。这意味着你可以使用 CommonJS `require()` 或 ES 模块 `import` 语句，从外部文件加载插件和自定义解析器。

例如，以下 eslintrc 配置文件会加载 `eslint-plugin-jsdoc`，并配置该插件中的规则：

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	plugins: ["jsdoc"],
	rules: {
		"jsdoc/require-description": "error",
		"jsdoc/check-values": "error",
	},
	// ...other config
};
```

在扁平配置中，可以这样实现相同的效果：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import jsdoc from "eslint-plugin-jsdoc";

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

::: tip
如果导入插件时遇到类似 "TypeError: context.getScope is not a function" 的错误，说明该插件尚未更新以适配 ESLint v9.x 规则 API。你应向相关插件提交问题反馈，也可以使用[兼容性工具](https://eslint.org/blog/2024/05/eslint-compatibility-utilities/)手动修补插件，使其能在 ESLint v9.x 中正常工作。
:::

<a id="custom-parsers"></a>

### 自定义解析器

在 eslintrc 文件中，导入自定义解析器的方式与导入插件类似：使用字符串指定解析器名称。

在扁平配置文件中，将自定义解析器作为模块导入，然后将其赋值给配置对象的 `languageOptions.parser` 属性。

例如，以下 eslintrc 配置文件使用了 `@babel/eslint-parser` 解析器：

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	parser: "@babel/eslint-parser",
	// ...other config
};
```

在扁平配置中，可以这样实现相同的效果：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import babelParser from "@babel/eslint-parser";

export default defineConfig([
	{
		// ...other config
		languageOptions: {
			parser: babelParser,
		},
		// ...other config
	},
]);
```

<a id="processors"></a>

### 处理器

在 eslintrc 文件中，处理器必须定义在插件中，然后在配置中通过名称引用。以点号开头的处理器表示按文件扩展名命名的处理器，ESLint 会为该文件扩展名自动配置此处理器。

在扁平配置文件中，仍然可以通过名称引用插件中的处理器，但现在也可以将处理器直接放入配置中。处理器**绝不会**自动配置，必须在配置中显式设置。

以下是包含处理器的自定义插件示例：

```javascript
// node_modules/eslint-plugin-someplugin/index.js
module.exports = {
	processors: {
		".md": {
			preprocess() {},
			postprocess() {},
		},
		someProcessor: {
			preprocess() {},
			postprocess() {},
		},
	},
};
```

在 eslintrc 中，可以这样配置：

```javascript
// .eslintrc.js
module.exports = {
	plugins: ["someplugin"],
	processor: "someplugin/someProcessor",
};
```

ESLint 还会自动添加以下等效配置：

```javascript
{
	overrides: [
		{
			files: ["**/*.md"],
			processor: "someplugin/.md",
		},
	];
}
```

在扁平配置中，以下写法都可以表达相同的内容：

```javascript
// eslint.config.js
import { defineConfig } from "eslint/config";
import somePlugin from "eslint-plugin-someplugin";

export default defineConfig([
	{
		plugins: { somePlugin },
		processor: "somePlugin/someProcessor",
	},
	{
		plugins: { somePlugin },
		// We can embed the processor object in the config directly
		processor: somePlugin.processors.someProcessor,
	},
	{
		// We don't need the plugin to be present in the config to use the processor directly
		processor: somePlugin.processors.someProcessor,
	},
]);
```

请注意，由于扁平配置**不会**自动添加 `.md` 处理器，因此你还需要指定一个额外的配置项：

```javascript
{
    files: ["**/*.md"],
    processor: somePlugin.processors[".md"]
}
```

<a id="glob-based-configs"></a>

### 基于 Glob 的配置

默认情况下，eslintrc 文件会对其所在目录及其子目录中的所有文件进行代码检查（`.eslintignore` 中排除的文件除外）。如果你想为不同的文件 glob 模式使用不同配置，可以在 `overrides` 属性中指定。

默认情况下，扁平配置文件支持在导出的数组中使用基于不同 glob 模式的配置。你可以在配置对象的 `files` 属性中加入 glob 模式。如果不指定 `files` 属性，配置默认使用 glob 模式 `"**/*.{js,mjs,cjs}"`。基本上，扁平配置文件中的所有配置都相当于 eslintrc 的 `overrides` 属性。

<a id="eslintrc-examples"></a>

#### eslintrc 示例

例如，以下 eslintrc 文件会应用于其所在目录及其子目录中的所有文件：

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	rules: {
		semi: ["warn", "always"],
	},
};
```

以下 eslintrc 文件通过覆盖配置支持多种配置：

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	overrides: [
		{
			files: ["src/**/*"],
			rules: {
				semi: ["warn", "always"],
			},
		},
		{
			files: ["test/**/*"],
			rules: {
				"no-console": "off",
			},
		},
	],
};
```

对于扁平配置，以下是使用默认 glob 模式的配置：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	js.configs.recommended, // Recommended config applied to all files
	// Override the recommended config
	{
		rules: {
			indent: ["error", 2],
			"no-unused-vars": "warn",
		},
		// ...other configuration
	},
]);
```

以下扁平配置示例支持针对不同 glob 模式使用多种配置：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	js.configs.recommended, // Recommended config applied to all files
	// File-pattern specific overrides
	{
		files: ["src/**/*", "test/**/*"],
		rules: {
			semi: ["warn", "always"],
		},
	},
	{
		files: ["test/**/*"],
		rules: {
			"no-console": "off",
		},
	},
	// ...other configurations
]);
```

<a id="configure-language-options"></a>

### 配置语言选项

在 eslintrc 文件中，你可以通过 `env`、`globals` 和 `parserOptions` 属性配置各种语言选项。特定运行环境的全局变量组（例如浏览器 JavaScript 中的 `document` 和 `window`，以及 Node.js 中的 `process` 和 `require`）通过 `env` 属性配置。

在扁平配置文件中，`globals` 和 `parserOptions` 被合并到 `languageOptions` 键下；扁平配置中不存在 `env` 属性。特定运行环境的全局变量组从 [globals](https://www.npmjs.com/package/globals) npm 包中导入，并包含在 `globals` 属性中。你可以使用展开运算符 (`...`) 一次导入多个全局变量组。

例如，以下是包含语言选项的 eslintrc 文件：

```javascript
// .eslintrc.js

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	globals: {
		myCustomGlobal: "readonly",
	},
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: "module",
	},
	// ...other config
};
```

以下是扁平配置中的相同配置：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.node,
				myCustomGlobal: "readonly",
			},
		},
		// ...other config
	},
]);
```

::: tip
要使此示例正常运行，你需要从 npm 安装 `globals` 包。ESLint 不会自动安装它。
:::

<a id="eslint-env-configuration-comments"></a>

### `eslint-env` 配置注释

在 eslintrc 配置系统中，可以使用 `eslint-env` 配置注释为文件定义全局变量。
使用扁平配置进行代码检查时，不再识别这些注释，并会将其报告为错误。
因此，从 eslintrc 迁移到扁平配置时，应从所有文件中删除 `eslint-env` 配置注释。
你可以将其替换为等效但更冗长的 `global` 配置注释，也可以删除这些注释，改为在配置文件中定义 `globals`。

例如，使用 eslintrc 时，待检查的文件可能如下所示：

```javascript
// tests/my-file.js

/* eslint-env mocha */

describe("unit tests", () => {
	it("should pass", () => {
		// ...
	});
});
```

在上例中，由于存在 `/* eslint-env mocha */` 注释，`describe` 和 `it` 会被识别为全局标识符。

例如，可以在扁平配置中使用 `global` 配置注释来实现相同的效果：

```javascript
// tests/my-file.js

/* global describe, it -- Globals defined by Mocha */

describe("unit tests", () => {
	it("should pass", () => {
		// ...
	});
});
```

另一种做法是从待检查的文件中删除该注释，并在配置中定义全局变量，例如：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
	// ...other config
	{
		files: ["tests/**"],
		languageOptions: {
			globals: {
				...globals.mocha,
			},
		},
	},
]);
```

<a id="predefined-and-shareable-configs"></a>

### 预定义配置和可共享配置

在 eslintrc 文件中，使用 `extends` 属性来使用预定义配置和可共享配置。ESLint 自带两个可通过字符串访问的预定义配置：

- `"eslint:recommended"`：ESLint 推荐的规则。
- `"eslint:all"`：ESLint 随附的所有规则。

你也可以使用 `extends` 属性扩展可共享配置。可共享配置可以是本地配置文件的路径，也可以是 npm 包名称。

在扁平配置文件中，预定义配置从单独的模块导入。`recommended` 和 `all` 规则配置位于 [`@eslint/js`](https://www.npmjs.com/package/@eslint/js) 包中。要使用这些配置，必须导入此包：

{{ npm_tabs({
    command: "install",
    packages: ["@eslint/js"],
    args: ["--save-dev"]
}) }}

你可以将这些配置分别添加到导出的数组中，也可以从中公开特定规则。使用扁平配置时，本地配置文件和 npm 包配置都必须通过模块导入。

例如，以下 eslintrc 文件使用了内置的 `eslint:recommended` 配置：

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	extends: "eslint:recommended",
	rules: {
		semi: ["warn", "always"],
	},
	// ...other config
};
```

以下 eslintrc 文件使用了内置配置、本地自定义配置和来自 npm 包的可共享配置：

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	extends: [
		"eslint:recommended",
		"./custom-config.js",
		"eslint-config-my-config",
	],
	rules: {
		semi: ["warn", "always"],
	},
	// ...other config
};
```

要在扁平配置中使用相同的配置，可以这样做：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import customConfig from "./custom-config.js";
import myConfig from "eslint-config-my-config";

export default defineConfig([
	js.configs.recommended,
	customConfig,
	myConfig,
	{
		rules: {
			semi: ["warn", "always"],
		},
		// ...other config
	},
]);
```

请注意，由于你只是导入 JavaScript 模块，因此可以在 ESLint 使用配置对象之前对其进行修改。例如，你可能希望某个配置对象仅应用于测试文件：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import customTestConfig from "./custom-test-config.js";

export default defineConfig([
	js.configs.recommended,
	{
		...customTestConfig,
		files: ["**/*.test.js"],
	},
]);
```

<a id="use-eslintrc-configs-in-flat-config"></a>

#### 在扁平配置中使用 eslintrc 配置

你可能依赖某个尚未更新为扁平配置格式的可共享配置。在这种情况下，可以使用 `FlatCompat` 工具将 eslintrc 格式转换为扁平配置格式。首先，安装 `@eslint/eslintrc` 包：

{{ npm_tabs({
    command: "install",
    packages: ["@eslint/eslintrc"],
    args: ["--save-dev"]
}) }}

然后，导入 `FlatCompat` 并创建一个新实例，用于转换现有的 eslintrc 配置。例如，如果 npm 包 `eslint-config-my-config` 使用的是 eslintrc 格式，可以这样编写：

```js
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default defineConfig([
	// mimic ESLintRC-style extends
	...compat.extends("eslint-config-my-config"),
]);
```

此示例使用 `FlatCompat#extends()` 方法将 `eslint-config-my-config` 插入扁平配置数组中。

有关 `FlatCompat` 类的更多信息，请参阅[包的 README](https://github.com/eslint/eslintrc#usage)。

<a id="ignore-files"></a>

### 忽略文件

使用 eslintrc 时，你可以在项目根目录创建单独的 `.eslintignore` 文件，让 ESLint 忽略文件。`.eslintignore` 文件使用与 `.gitignore` 文件相同的 glob 模式语法。或者，你也可以在 eslintrc 文件中使用 `ignorePatterns` 属性。

要在扁平配置中忽略文件，可以在不包含其他属性的配置对象中使用 `ignores` 属性。`ignores` 属性接受 glob 模式数组。扁平配置不支持从 `.eslintignore` 文件加载忽略模式，因此你需要将这些模式直接迁移到扁平配置中。

例如，以下是可以与 eslintrc 配置搭配使用的 `.eslintignore` 示例：

```shell
# .eslintignore
temp.js
config/*
# ...other ignored files
```

以下是在 `.eslintrc.js` 文件中用 `ignorePatterns` 表示相同模式的写法：

```javascript
// .eslintrc.js
module.exports = {
	// ...other config
	ignorePatterns: ["temp.js", "config/*"],
};
```

在扁平配置中，对应的忽略模式如下：

```javascript
import { defineConfig } from "eslint/config";

export default defineConfig([
	// ...other config
	{
		// Note: there should be no other properties in this object
		ignores: ["**/temp.js", "config/*"],
	},
]);
```

在 `.eslintignore` 中，`temp.js` 会忽略所有名为 `temp.js` 的文件；而在扁平配置中，你需要将其指定为 `**/temp.js`。扁平配置中的 `temp.js` 模式只会忽略与配置文件位于同一目录中的 `temp.js` 文件。

::: important
在扁平配置中，点文件（例如 `.dotfile.js`）默认不再被忽略。如果要忽略点文件，请添加忽略模式 `"**/.*"`。
:::

<a id="linter-options"></a>

### Linter 选项

eslintrc 文件允许你使用 `noInlineConfig` 和 `reportUnusedDisableDirectives` 属性来配置代码检查器本身。

扁平配置系统引入了一个新的顶层属性 `linterOptions`，可用于配置代码检查器。你可以在 `linterOptions` 对象中包含 `noInlineConfig` 和 `reportUnusedDisableDirectives`。

例如，以下是启用了 linter 选项的 eslintrc 文件：

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	noInlineConfig: true,
	reportUnusedDisableDirectives: true,
};
```

以下是在扁平配置中设置相同选项的方式：

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		// ...other config
		linterOptions: {
			noInlineConfig: true,
			reportUnusedDisableDirectives: "warn",
		},
	},
]);
```

<a id="cli-flag-changes"></a>

### CLI 标志的变化

以下 CLI 标志不再受扁平配置文件格式支持：

- `--env`
- `--ignore-path`
- `--no-eslintrc`
- `--resolve-plugins-relative-to`
- `--rulesdir`

#### `--env`

`--env` 标志用于启用特定环境的全局变量（例如 `browser` 或 `node`）。扁平配置不支持此标志。应改为直接在配置中定义相关的全局变量。更多详情请参阅[指定全局变量](language-options#specify-globals)。

例如，如果你以前使用 `--env browser,node`，则需要像这样更新配置文件：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
]);
```

#### `--ignore-path`

`--ignore-path` 标志用于指定作为 `.eslintignore` 使用的文件。扁平配置不会从 `.eslintignore` 文件加载忽略模式，也不支持此标志。如果要包含 `.gitignore` 文件中的模式，请使用 `@eslint/compat` 中的 `includeIgnoreFile()`。更多详情请参阅[包含 `.gitignore` 文件](ignore#include-gitignore-files)。

例如，如果你以前使用 `--ignore-path .gitignore`：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
	includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
	// other configs
]);
```

_更新（2026-05-01）：来自 `@eslint/compat` 的 `includeIgnoreFile()` 已弃用，改用来自 `@eslint/config-helpers` 的 `includeIgnoreFile()`（在 `eslint/config` 中重新导出）。[新的 API](ignore#include-gitignore-files)功能更灵活，并提供了一个选项，可将忽略模式解释为相对于忽略文件的路径。_

#### `--no-eslintrc`

`--no-eslintrc` 标志已被 `--no-config-lookup` 替代。

#### `--resolve-plugins-relative-to`

`--resolve-plugins-relative-to` 标志用于指示应相对于哪个目录解析配置文件中的插件引用。此标志之所以必需，是因为可共享配置只能解析作为对等依赖或父级包依赖的插件。

使用扁平配置时，可共享配置可以直接指定其依赖，因此不再需要此标志。

#### `--rulesdir`

`--rulesdir` 标志用于从指定目录加载其他规则。扁平配置不再支持此功能。你可以改为创建一个插件，并在配置中直接包含本地规则，如下所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import myRule from "./rules/my-rule.js";

export default defineConfig([
	{
		// define the plugin
		plugins: {
			local: {
				rules: {
					"my-rule": myRule,
				},
			},
		},

		// configure the rule
		rules: {
			"local/my-rule": ["error"],
		},
	},
]);
```

<a id="packagejson-configuration-no-longer-supported"></a>

### 不再支持 `package.json` 配置

使用 eslintrc 时，可以通过 `package.json` 文件中的 `eslintConfig` 键来配置 ESLint。

使用扁平配置时，不能再通过 `package.json` 文件配置 ESLint。你需要将配置移至单独的文件中。

<a id="additional-changes"></a>

### 其他变化

从 eslintrc 到扁平配置文件格式还发生了以下变化：

- `root` 选项不再存在。（扁平配置文件的行为相当于设置了 `root: true`。）
- `files` 选项不能再是单个字符串，必须是数组。
- `sourceType` 选项现在支持新值 `"commonjs"`（`.eslintrc` 也支持此值，但从未对此进行过文档说明）。

<a id="typescript-types-for-flat-config-files"></a>

## 扁平配置文件的 TypeScript 类型

你可以在 GitHub 的 [`lib/types` 源代码目录](https://github.com/eslint/eslint/tree/main/lib/types)中查看扁平配置文件格式的 TypeScript 类型。配置数组中对象的接口名为 `Linter.Config`。

你可以在 [`lib/types/index.d.ts`](https://github.com/eslint/eslint/blob/main/lib/types/index.d.ts) 中查看类型定义。

<a id="visual-studio-code-support"></a>

## Visual Studio Code 支持

[`vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) v3.0.10 开始支持 ESLint v9.x。

在低于 v3.0.10 的 `vscode-eslint` 版本中，默认不启用新的配置系统。要启用对新配置文件的支持，请编辑 `.vscode/settings.json` 文件并添加以下内容：

```json
{
	// required in vscode-eslint < v3.0.10 only
	"eslint.experimental.useFlatConfig": true
}
```

在未来版本的 ESLint 插件中，你将不再需要手动启用此功能。

<a id="further-reading"></a>

## 延伸阅读

- [扁平配置文件格式概述博客文章](https://eslint.org/blog/2022/08/new-config-system-part-2/)
- [新配置系统 API 用法博客文章](https://eslint.org/blog/2022/08/new-config-system-part-3/)
- [新配置系统背景介绍博客文章](https://eslint.org/blog/2022/08/new-config-system-part-1/)
