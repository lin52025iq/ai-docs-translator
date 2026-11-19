---
title: 配置文件
eleventyNavigation:
    key: configuration files
    parent: configure
    title: 配置文件
    order: 1
---

{%- from 'components/npx_tabs.macro.html' import npx_tabs %}
{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}

::: tip
本页介绍如何使用扁平配置文件。
:::

你可以将 ESLint 项目配置放在配置文件中。你可以在其中包含内置规则、规则的执行方式、带有自定义规则的插件、可共享配置、要应用规则的文件等内容。

<a id="configuration-file"></a>
## 配置文件

ESLint 配置文件可以使用以下任一名称：

- `eslint.config.js`
- `eslint.config.mjs`
- `eslint.config.cjs`
- `eslint.config.ts`（需要[额外设置](#typescript-configuration-files)）
- `eslint.config.mts`（需要[额外设置](#typescript-configuration-files)）
- `eslint.config.cts`（需要[额外设置](#typescript-configuration-files)）

该文件应放在项目根目录中，并导出一个[配置对象](#configuration-objects)数组。示例如下：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
	},
]);
```

在此示例中，使用 `defineConfig()` 辅助函数定义了一个仅包含单个配置对象的配置数组。该配置对象启用了两条规则：`semi` 和 `prefer-const`。对于 ESLint 使用此配置文件处理的所有文件，都会应用这些规则。

如果项目的 `package.json` 文件中指定了 `"type": "commonjs"`，那么 `eslint.config.js` 必须采用 CommonJS 格式，例如：

```js
// eslint.config.js
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
	{
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
	},
]);
```

<a id="configuration-objects"></a>
## 配置对象

每个配置对象都包含 ESLint 对一组文件执行代码检查所需的全部信息。每个配置对象由以下属性组成：

- `name` - 配置对象的名称。此名称用于错误消息和 [config inspector](https://github.com/eslint/config-inspector)，帮助识别当前使用的配置对象。（[命名约定](#configuration-naming-conventions)）
- `basePath` - 指定配置对象适用的子目录路径的字符串。可以是相对路径或绝对路径。
- `files` - 一个 glob 模式数组，用于指定配置对象适用的文件。如果未指定，配置对象将应用于任何其他配置对象匹配的所有文件。
- `ignores` - 一个 glob 模式数组，用于指定配置对象不适用的文件。如果未指定，配置对象将应用于 `files` 匹配的所有文件。如果在配置对象中使用 `ignores`，且未设置其他键，这些模式将作为[全局忽略项](#globally-ignore-files-with-ignores)，应用于每个配置对象。
- `extends` - 一个字符串、配置对象或配置数组组成的数组，其中包含要应用的其他配置。
- `language` - 指定用于代码检查的[语言](../../extend/languages)的字符串，格式为 `"pluginName/languageName"`，例如 `"markdown/commonmark"`。（JavaScript 的默认值：`"js/js"`）
- `languageOptions` - 一个对象，包含与指定语言的代码检查配置方式相关的设置。对于 JavaScript，这些设置包括：
    - `ecmaVersion` - 要支持的 ECMAScript 版本。可以是年份（例如 `2022`）或版本号（例如 `5`）。设为 `"latest"` 可使用最新支持的版本。（默认值：`"latest"`）
    - `sourceType` - JavaScript 源代码的类型。可选值包括：传统脚本文件使用的 `"script"`、ECMAScript 模块（ESM）使用的 `"module"`，以及 CommonJS 文件使用的 `"commonjs"`。（`.js` 和 `.mjs` 文件的默认值：`"module"`；`.cjs` 文件的默认值：`"commonjs"`）
    - `globals` - 一个对象，指定代码检查时应添加到全局作用域中的其他对象。
    - `parser` - 一个包含 `parse()` 方法或 `parseForESLint()` 方法的对象。（默认值：[`espree`](https://github.com/eslint/js/tree/main/packages/espree)）
    - `parserOptions` - 一个对象，指定直接传递给解析器 `parse()` 或 `parseForESLint()` 方法的其他选项。可用选项取决于解析器。
- `linterOptions` - 一个包含与代码检查过程相关设置的对象。
    - `noInlineConfig` - 一个布尔值，表示是否允许内联配置。
    - `reportUnusedDisableDirectives` - 一个严重性字符串，指定是否跟踪并报告未使用的禁用和启用指令，以及如何处理。为兼容旧版，`true` 等同于 `"warn"`，`false` 等同于 `"off"`。（默认值：`"warn"`）。
    - `reportUnusedInlineConfigs` - 一个严重性字符串，指定是否跟踪并报告未使用的内联配置，以及如何处理。（默认值：`"off"`）
- `processor` - 一个包含 `preprocess()` 和 `postprocess()` 方法的对象，或一个字符串，表示插件中的处理器名称（例如 `"pluginName/processorName"`）。
- `plugins` - 一个对象，将插件名称映射到插件对象。指定 `files` 后，这些插件仅对匹配的文件可用。
- `rules` - 一个包含已配置规则的对象。指定 `files` 或 `ignores` 后，这些规则配置仅对匹配的文件可用。
- `settings` - 一个对象，包含应提供给所有规则使用的名称-值信息对。

<a id="specify-files-and-ignores"></a>
### 指定 `files` 和 `ignores`

::: tip
`files` 和 `ignores` 中指定的模式使用 [`minimatch`](https://www.npmjs.com/package/minimatch) 语法，并以 `eslint.config.js` 文件所在位置为基准进行解析。如果通过 `--config` 命令行选项使用备用配置文件，则所有模式都以当前工作目录为基准进行解析。如果配置对象的 `basePath` 属性是相对路径，则其指定的子目录以 `eslint.config.js` 文件所在位置为基准进行解析（如果通过 `--config` 命令行选项使用备用配置文件，则以当前工作目录为基准）。对于带有 `basePath` 属性的配置对象，`files` 和 `ignores` 中指定的模式以 `basePath` 表示的子目录为基准进行解析。
:::

你可以组合使用 `files` 和 `ignores`，以确定配置对象应适用或不适用哪些文件。示例如下：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	// matches all files ending with .js
	{
		files: ["**/*.js"],
		rules: {
			semi: "error",
		},
	},

	// matches all files ending with .js except those in __tests
	{
		files: ["**/*.js"],
		ignores: ["__tests/**"],
		rules: {
			"no-console": "error",
		},
	},
]);
```

没有 `files` 或 `ignores` 的配置对象会自动应用于任何其他配置对象匹配的文件。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	// matches all files because it doesn't specify the `files` or `ignores` key
	{
		rules: {
			semi: "error",
		},
	},
]);
```

使用此配置时，`semi` 规则会对所有符合 ESLint 默认文件模式的文件启用。因此，如果将 `example.js` 传递给 ESLint，就会应用 `semi` 规则。如果传递非 JavaScript 文件，例如 `example.txt`，则不会应用 `semi` 规则，因为没有其他配置对象匹配该文件名。（ESLint 会输出错误消息，告知你该文件因缺少配置而被忽略。）

::: important
默认情况下，ESLint 会对符合 `**/*.js`、`**/*.cjs` 和 `**/*.mjs` 模式的文件执行代码检查。除非使用[全局忽略项](#globally-ignore-files-with-ignores)明确排除这些文件，否则它们始终会被匹配。
如果配置对象包含其他模式，那么没有 `files` 键的配置对象中的规则也会应用于这些模式。

因此，如果还要使用 ESLint 检查非 JS 文件，更合适的做法是创建一个包含 `files: ["**/*.js", "**/*.cjs", "**/*.mjs"]` 的配置对象，并将相关规则放在其中。
:::

<a id="specify-files-with-arbitrary-extensions"></a>
#### 指定任意扩展名的文件

要对扩展名不是默认 `.js`、`.cjs` 和 `.mjs` 的文件执行代码检查，请在 `files` 中使用 `"**/*.extension"` 格式的模式将它们包含进来。除 `*` 以及以 `/*` 或 `/**` 结尾的模式外，任何模式都可用。
例如，要检查扩展名为 `.ts`、`.cts` 和 `.mts` 的 TypeScript 文件，可以指定如下配置对象：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.ts", "**/*.cts", "**/*.mts"],
	},
	// ...other config
]);
```

<a id="specify-files-without-extension"></a>
#### 指定没有扩展名的文件

没有扩展名的文件可以使用模式 `!(*.*)` 匹配。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/!(*.*)"],
	},
	// ...other config
]);
```

上述配置会检查所有目录中没有扩展名的文件，以及扩展名不是默认 `.js`、`.cjs` 和 `.mjs` 的文件。
::: tip
以点开头的文件名（例如 `.gitignore`）会被视为只有扩展名而没有基本名称。对于 `.gitignore`，其扩展名是 `gitignore`，因此该文件符合模式 `"**/.gitignore"`，但不符合 `"**/*.gitignore"`。
:::

<a id="specify-files-with-an-and-operation"></a>
#### 使用 AND 运算指定文件

可以在 `files` 数组中使用字符串数组，使多个模式同时匹配同一个文件。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: [["src/*", "**/*.js"]],
	},
	// ...other config
]);
```

模式 `["src/*", "**/*.js"]` 会在文件同时位于 `src` 目录中且以 `.js` 结尾时匹配。如果你需要动态计算 `files` 数组的值，这种方法会很有帮助，还能避免尝试将多个 glob 模式合并为一个字符串时可能出现的错误。

<a id="exclude-files-with-ignores"></a>
#### 使用 `ignores` 排除文件

你可以组合指定 `files` 和 `ignores` 模式，限制配置对象适用的文件。例如，你可能希望某些规则只应用于 `src` 目录中的文件：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["src/**/*.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

在此示例中，只有 `src` 目录中的 JavaScript 文件会应用 `semi` 规则。如果你对其他目录中的文件运行 ESLint，则会跳过此配置对象。添加 `ignores` 后，还可以从此配置对象中排除 `src` 目录中的部分文件：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["src/**/*.js"],
		ignores: ["**/*.config.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

此配置对象匹配 `src` 目录中除以 `.config.js` 结尾的文件之外的所有 JavaScript 文件。你也可以在 `ignores` 中使用否定模式，将文件从忽略模式中排除，例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["src/**/*.js"],
		ignores: ["**/*.config.js", "!**/eslint.config.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

在此示例中，配置对象会排除以 `.config.js` 结尾的文件，但 `eslint.config.js` 除外。该文件仍会应用 `semi` 规则。

非全局 `ignores` 模式只能匹配文件名。像 `"dir-to-exclude/"` 这样的模式不会忽略任何内容。要忽略特定目录中的所有内容，应使用 `"dir-to-exclude/**"` 这样的模式。

如果使用 `ignores` 却没有指定 `files`，并且配置对象中还有其他键（例如 `rules`），那么该配置对象将应用于所有经过代码检查的文件，但 `ignores` 排除的文件除外，例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["**/*.config.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

此配置对象适用于除以 `.config.js` 结尾的文件之外的所有 JavaScript 文件。实际上，这相当于将 `files` 设为 `**/*`。通常，如果指定了 `ignores`，最好始终同时包含 `files`。

请注意，如果未指定 `files`，否定的 `ignores` 模式不会自动导致任何匹配文件接受代码检查。
ESLint 只会检查默认模式匹配的文件，或 `files` 模式匹配的文件；该模式不能是 `*`，也不能以 `/*` 或 `/**` 结尾。

::: tip
使用 [config inspector](https://github.com/eslint/config-inspector)（CLI 中的 `--inspect-config`）测试哪些配置对象适用于特定文件。
:::

<a id="globally-ignore-files-with-ignores"></a>
#### 使用 `ignores` 全局忽略文件

根据 `ignores` 属性的使用方式，它可以表现为非全局 `ignores` 或全局 `ignores`。

- 如果在配置对象中使用 `ignores`，且没有设置其他键（`name` 除外），那么这些模式将作为全局忽略项。这意味着它们会应用于每个配置对象，而不只是定义它们的配置对象。使用全局 `ignores`，就不必在多个配置对象中重复复制并保持 `ignores` 属性同步。
- 如果在同一配置对象中将 `ignores` 与其他属性一起使用，那么这些模式将作为非全局忽略项。这样，`ignores` 只会应用于定义它的配置对象。

全局和非全局 `ignores` 的用法有一些差异：

- 非全局 `ignores` 中的模式只能匹配文件（`dir/filename.js`）或目录中的文件（`dir/**`）。
- 全局 `ignores` 中的模式除了可以匹配非全局忽略项支持的内容外，还可以匹配目录（`dir/`）。

对于所有 `ignores` 用法：

- 你定义的模式会追加到 ESLint 默认模式之后；默认模式为 `["**/node_modules/", ".git/"]`。
- 除非明确忽略，否则这些模式始终会匹配以点开头的文件和目录，例如 `.foo.js` 或 `.fixtures`。默认忽略的点目录只有 `.git`。

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

// Example of global ignores
export default defineConfig([
    {
      ignores: [".config/", "dist/", "tsconfig.json"] // acts as global ignores, due to the absence of other properties
    },
    { ... }, // ... other configuration object, inherit global ignores
    { ... }, // ... other configuration object, inherit global ignores
]);

// Example of non-global ignores
export default defineConfig([
    {
      ignores: [".config/**", "dir1/script1.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
    {
      ignores: ["other-dir/**", "dist/script2.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
]);
```

为避免混淆，请使用 `globalIgnores()` 辅助函数，明确指出哪些忽略项是全局的。下面是使用 `globalIgnores()` 重写前述示例：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

// Example of global ignores
export default defineConfig([
    globalIgnores([".config/", "dist/", "tsconfig.json"]),
    { ... }, // ... other configuration object, inherit global ignores
    { ... }, // ... other configuration object, inherit global ignores
]);

// Example of non-global ignores
export default defineConfig([
    {
      ignores: [".config/**", "dir1/script1.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
    {
      ignores: ["other-dir/**", "dist/script2.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
]);
```

有关配置 `ignores` 规则的更多信息和示例，请参阅[忽略文件](ignore)。

<a id="specify-base-path"></a>
#### 指定基础路径

你可以选择指定 `basePath`，将配置对象应用于特定子目录（包括其子目录）。

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	// matches all files in tests and its subdirectories
	{
		basePath: "tests",
		rules: {
			"no-undef": "error",
		},
	},

	// matches all files ending with spec.js in tests and its subdirectories
	{
		basePath: "tests",
		files: ["**/*.spec.js"],
		languageOptions: {
			globals: {
				it: "readonly",
				describe: "readonly",
			},
		},
	},

	// globally ignores tests/fixtures directory
	{
		basePath: "tests",
		ignores: ["fixtures/"],
	},
]);
```

结合 [`extends`](#extending-configurations) 使用时，只需指定一次 `basePath`，即可将多个配置对象应用于同一子目录，如下所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		basePath: "tests",
		extends: [
			// matches all files in tests and its subdirectories
			{
				rules: {
					"no-undef": "error",
				},
			},

			// matches all files ending with spec.js in tests and its subdirectories
			{
				files: ["**/*.spec.js"],
				languageOptions: {
					globals: {
						it: "readonly",
						describe: "readonly",
					},
				},
			},

			// globally ignores tests/fixtures directory
			{
				ignores: ["fixtures/"],
			},
		],
	},
]);
```

<a id="cascading-configuration-objects"></a>
#### 层叠配置对象

当多个配置对象匹配同一文件名时，这些配置对象会合并；如果发生冲突，后面的对象会覆盖前面的对象。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				MY_CUSTOM_GLOBAL: "readonly",
			},
		},
	},
	{
		files: ["tests/**/*.js"],
		languageOptions: {
			globals: {
				it: "readonly",
				describe: "readonly",
			},
		},
	},
]);
```

使用此配置时，所有 JavaScript 文件都会定义名为 `MY_CUSTOM_GLOBAL` 的自定义全局对象；而 `tests` 目录中的 JavaScript 文件除了 `MY_CUSTOM_GLOBAL` 外，还会将 `it` 和 `describe` 定义为全局对象。对于 `tests` 目录中的任意 JavaScript 文件，两个配置对象都会应用，因此 `languageOptions.globals` 会合并，形成最终结果。

<a id="configure-linter-options"></a>
### 配置代码检查器选项

可以使用 `linterOptions` 对象配置特定于代码检查过程的选项。这些选项会影响代码检查的执行方式，但不会影响对文件源代码的解释方式。

<a id="disable-inline-configuration"></a>
#### 禁用内联配置

内联配置通过 `/*eslint*/` 注释实现，例如 `/*eslint semi: error*/`。将 `noInlineConfig` 设为 `true`，即可禁止内联配置。启用此选项后，所有内联配置都会被忽略。示例如下：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		linterOptions: {
			noInlineConfig: true,
		},
	},
]);
```

<a id="report-unused-disable-directives"></a>
#### 报告未使用的禁用指令

`/*eslint-disable*/`、`/*eslint-enable*/` 和 `/*eslint-disable-next-line*/` 等禁用和启用指令用于在代码的某些部分禁用 ESLint 规则。随着代码发生变化，这些指令可能不再需要，因为代码的更改可能导致相关规则不再触发。你可以将 `reportUnusedDisableDirectives` 选项设为严重性字符串，以启用对这些未使用的禁用指令的报告，如以下示例所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
	},
]);
```

此设置的默认值为 `"warn"`。

你可以使用 [`--report-unused-disable-directives`](../command-line-interface#--report-unused-disable-directives) 或 [`--report-unused-disable-directives-severity`](../command-line-interface#--report-unused-disable-directives-severity) 命令行选项覆盖此设置。

为兼容旧版，`true` 等同于 `"warn"`，`false` 等同于 `"off"`。

<a id="report-unused-inline-configs"></a>
#### 报告未使用的内联配置

`/* eslint rule-name: "error" */` 等内联配置注释用于更改代码某些部分中 ESLint 规则的严重性和/或选项。
随着项目的 ESLint 配置文件发生变化，这些指令可能不再与现有设置不同。
你可以将 `reportUnusedInlineConfigs` 选项设为严重性字符串，以启用对这些未使用的内联配置注释的报告，如以下示例所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		linterOptions: {
			reportUnusedInlineConfigs: "error",
		},
	},
]);
```

你可以使用 [`--report-unused-inline-configs`](../command-line-interface#--report-unused-inline-configs) 命令行选项覆盖此设置。

<a id="configure-rules"></a>
### 配置规则

你可以在配置对象中添加 `rules` 属性，并在其中放入包含规则配置的对象，从而配置任意数量的规则。该对象中的名称是规则名称，值是相应规则的配置。示例如下：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: "error",
		},
	},
]);
```

此配置对象指定启用 [`semi`](../../rules/semi) 规则，并将其严重性设为 `"error"`。你也可以为规则提供选项：指定一个数组，将第一项设为严重性，后续各项设为规则选项。例如，可以传入 `"never"` 作为选项，让 `semi` 规则禁止使用分号：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: ["error", "never"],
		},
	},
]);
```

每条规则都有自己的选项，这些选项可以是任何有效的 JSON 数据类型。有关可用选项的更多信息，请查阅要配置的规则文档。

有关配置规则的更多信息，请参阅[配置规则](rules)。

<a id="configure-shared-settings"></a>
### 配置共享设置

ESLint 支持在配置文件中添加共享设置。向配置对象添加 `settings` 对象后，该对象会提供给每条规则。按照惯例，插件会为其关注的设置添加命名空间，以避免与其他插件发生冲突。插件可以使用 `settings` 指定要在其所有规则之间共享的信息。如果你要添加自定义规则，并希望这些规则能够访问相同的信息，这会很有用。示例如下：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		settings: {
			sharedData: "Hello",
		},
		plugins: {
			customPlugin: {
				rules: {
					"my-rule": {
						meta: {
							// custom rule's meta information
						},
						create(context) {
							const sharedData = context.settings.sharedData;
							return {
								// code
							};
						},
					},
				},
			},
		},
		rules: {
			"customPlugin/my-rule": "error",
		},
	},
]);
```

<a id="extending-configurations"></a>
### 扩展配置

配置对象使用 `extends` 继承另一个配置对象或配置数组的所有特性（包括规则、插件和语言选项），之后还可以修改所有选项。`extends` 键是一个数组，其中的值指定要扩展的配置。`extends` 数组的元素可以是以下三种值之一：

- 指定插件中某项配置名称的字符串
- 配置对象
- 配置数组

<a id="use-configurations-from-plugins"></a>
#### 使用插件中的配置

ESLint 插件可以导出预定义配置。这些配置通过字符串引用，格式为 `pluginName/configName`。必须先在 `plugins` 键中指定该插件。示例如下：

```js
// eslint.config.js
import examplePlugin from "eslint-plugin-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			example: examplePlugin,
		},
		extends: ["example/recommended"],
	},
]);
```

在此示例中，会加载 `eslint-plugin-example` 中名为 `recommended` 的配置。也可以在配置数组中按名称引用插件配置。

你还可以将插件配置直接插入 `extends` 数组。例如：

```js
// eslint.config.js
import pluginExample from "eslint-plugin-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			example: pluginExample,
		},
		extends: [pluginExample.configs.recommended],
	},
]);
```

在此示例中，可以通过插件对象的 `configs` 属性直接访问 `eslint-plugin-example` 中名为 `recommended` 的配置。

::: important
建议使用 `extends` 键时始终同时使用 `files` 键，以确保配置应用于正确的文件。如果省略 `files` 键，扩展的配置最终可能会应用于所有文件。
:::

<a id="use-predefined-configurations"></a>
#### 使用预定义配置

ESLint 为 JavaScript 提供了两个预定义配置：

- `js/recommended` - 启用 ESLint 建议所有人使用、用于避免潜在错误的规则。
- `js/all` - 启用 ESLint 随附的所有规则。**不建议**在生产环境中使用此配置，因为它会随 ESLint 的每个次要版本和主要版本而变化。使用风险自负。

要包含这些预定义配置，请安装 `@eslint/js` 包，然后在后续配置对象中修改其他属性：

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

在此示例中，首先应用 `js/recommended` 预定义配置，然后另一个配置对象为 [`no-unused-vars`](../../rules/no-unused-vars) 添加所需配置。

有关如何将预定义配置与个人偏好结合使用的更多信息，请参阅[组合配置](combine-configs)。

<a id="use-a-shareable-configuration-package"></a>
#### 使用可共享配置包

可共享配置是导出配置对象或配置数组的 npm 包。应将此包作为依赖项安装到项目中，然后在 `eslint.config.js` 文件中引用它。例如，要使用名为 `eslint-config-example` 的可共享配置，配置文件如下所示：

```js
// eslint.config.js
import exampleConfig from "eslint-config-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [exampleConfig],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

在此示例中，`exampleConfig` 可以是对象，也可以是数组；无论哪种形式，都可以直接插入 `extends` 数组。

有关如何将可共享配置与个人偏好结合使用的更多信息，请参阅[组合配置](combine-configs)。

<a id="when-to-use-extends-vs-cascading"></a>
### 何时使用 Extends，何时使用层叠配置

适合使用 `Extends` 的情况：

- **复用配置** - 希望继承并扩展插件、可共享包或预定义配置中的现有配置时。
- **配置插件** - 应用 ESLint 插件提供的推荐配置或特定配置时（例如 `example/recommended`）。
- **使用可共享配置** - 使用导出配置对象的 npm 包时（例如 `eslint-config-example`）。
- **使用预定义配置** - 使用 ESLint 内置配置（如 `js/recommended` 或 `js/all`）时。
- **模块化配置** - 希望将多个配置来源组合到一个配置对象中时。
- **保持一致性** - 希望在多个配置对象之间确保基础规则保持一致时。
- **集成插件** - 需要应用随插件打包提供的配置时。

适合使用 `Cascading` 的情况：

- **针对特定文件的规则** - 需要为不同的文件模式或目录设置不同规则时。
- **渐进式配置** - 希望先将基础规则应用于所有文件，再为特定子集添加或覆盖规则时。
- **针对环境的设置** - 测试文件、源文件和配置文件需要不同规则集时。
- **基于目录的配置** - 项目中的不同目录需要采用不同代码检查方式时。
- **调整规则严重性** - 希望为特定文件模式更改规则严重性（`error`/`warn`/`off`）时。
- **语言选项差异** - 不同文件需要不同 ECMAScript 版本或解析器选项时。

<a id="configuration-naming-conventions"></a>
### 配置命名约定

`name` 属性是可选的，但建议为每个配置对象提供名称，尤其是在创建共享配置时。该名称用于错误消息和 config inspector，帮助识别当前使用的配置对象。

名称应能描述配置对象的用途，并使用 `/` 作为分隔符，以配置名称或插件名称限定作用域。ESLint 在运行时不会强制名称唯一，但建议设置唯一名称，以避免混淆。

例如，如果你正在为名为 `eslint-plugin-example` 的插件创建配置对象，可以在配置对象的 `name` 前加上 `example/` 前缀：

```js
export default {
	configs: {
		recommended: {
			name: "example/recommended",
			rules: {
				"no-unused-vars": "warn",
			},
		},
		strict: {
			name: "example/strict",
			rules: {
				"no-unused-vars": "error",
			},
		},
	},
};
```

导出配置对象数组时，可以在 `name` 中添加额外的作用域层级，以帮助识别配置对象。例如：

```js
export default {
	configs: {
		strict: [
			{
				name: "example/strict/language-setup",
				languageOptions: {
					ecmaVersion: 2024,
				},
			},
			{
				name: "example/strict/sub-config",
				files: ["src/**/*.js"],
				rules: {
					"no-unused-vars": "error",
				},
			},
		],
	},
};
```

<a id="configuration-file-resolution"></a>
## 配置文件解析

在命令行运行 ESLint 时，它会先在目标文件所在目录中查找 `eslint.config.*` 文件，然后逐级向上搜索祖先目录，以此确定每个目标文件的配置。这种行为改进了对单体仓库的支持，因为其中的子目录可以拥有自己的配置文件。

你可以在命令行中使用 `-c` 或 `--config` 选项指定备用配置文件，从而阻止此搜索，例如：

{{ npx_tabs({
    package: "eslint",
    args: ["--config", "some-other-file.js", "**/*.js"]
}) }}

在这种情况下，ESLint 不会搜索配置文件，而是使用 `some-other-file.js`。

<a id="typescript-configuration-files"></a>
## TypeScript 配置文件

Deno 和 Bun 原生支持 TypeScript 配置文件；对于 Node.js，你必须在项目中安装可选的开发依赖 [`jiti`](https://github.com/unjs/jiti)，版本为 2.2.0 或更高（ESLint 不会自动安装此依赖）：

{{ npm_tabs({
    command: "install",
    packages: ["jiti"],
    args: ["--save-dev"]
}) }}

然后，你可以创建扩展名为 `.ts`、`.mts` 或 `.cts` 的配置文件，并导出一个[配置对象](#configuration-objects)数组。

::: important
ESLint 不会对配置文件执行类型检查，也不会应用 `tsconfig.json` 中的任何设置。
:::

<a id="native-typescript-support"></a>
### 原生 TypeScript 支持

如果你使用的是 **Node.js >= 22.13.0**，无需 [`jiti`](https://github.com/unjs/jiti) 即可原生加载 TypeScript 配置文件。这要归功于 [**`--experimental-strip-types`**](https://nodejs.org/docs/latest-v22.x/api/cli.html#--experimental-strip-types) 标志。

由于此功能仍处于实验阶段，你还必须启用 `unstable_native_nodejs_ts_config` 标志。

```bash
npx --node-options='--experimental-strip-types' eslint --flag unstable_native_nodejs_ts_config
```

<a id="configuration-file-precedence"></a>
### 配置文件优先级

如果有多个 ESLint 配置文件，ESLint 会优先选择 JavaScript 文件，而不是 TypeScript 文件。优先级顺序如下：

1. `eslint.config.js`
2. `eslint.config.mjs`
3. `eslint.config.cjs`
4. `eslint.config.ts`
5. `eslint.config.mts`
6. `eslint.config.cts`

要覆盖此行为，请使用 `--config` 或 `-c` 命令行选项指定其他配置文件：

{{ npx_tabs({
    package: "eslint",
    args: ["--config", "eslint.config.ts"]
}) }}