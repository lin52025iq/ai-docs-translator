---
title: 忽略文件
eleventyNavigation:
    key: ignore files
    parent: configure
    title: 忽略文件
    order: 7
---

{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

::: tip
本页介绍如何使用扁平配置格式忽略文件。
:::

::: tip
本页介绍如何使用 `globalIgnores()` 函数彻底忽略文件和目录。有关非全局忽略的更多信息，请参阅[指定文件和忽略项](configuration-files#specify-files-and-ignores)。有关全局忽略与非全局忽略之间差异的更多信息，请参阅[使用 `ignores` 全局忽略文件](configuration-files#globally-ignore-files-with-ignores)。
:::
你可以通过以下方式指定一个或多个 glob 模式，在代码检查时配置 ESLint 忽略特定文件和目录：

- 在 `eslint.config.js` 文件中。
- 在命令行中使用 `--ignore-pattern`。

<a id="ignore-files"></a>

## 忽略文件

在 `eslint.config.js` 文件中，你可以使用 `globalIgnores()` 辅助函数指定要忽略的文件模式。示例如下：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores([".config/*"])]);
```

此配置会忽略 `.config` 目录中的所有文件。此模式会添加在默认模式 `["**/node_modules/", ".git/"]` 之后。

默认情况下，ESLint 会对匹配 `**/*.js`、`**/*.cjs` 和 `**/*.mjs` 模式的文件进行代码检查。如果你不希望 ESLint 对这些文件进行代码检查，可以使用 `globalIgnores()` 忽略它们：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["**/*.js", "**/*.cjs", "**/*.mjs"]),
]);
```

当 `files` 属性中指定了非 JS 文件时，ESLint 仍会对匹配默认模式的文件进行代码检查。若只想检查 `files` 属性中指定的文件，则必须忽略默认文件模式：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["**/*.js", "**/*.cjs", "**/*.mjs"]),
	{
		files: ["**/*.ts"],
		ignores: [".config/**"],
		rules: {/* ... */},
	},
]);
```

你也可以在命令行中使用 [`--ignore-pattern`](../command-line-interface#--ignore-pattern) 忽略文件，例如：

{{ npx_tabs({
    package: "eslint",
    args: [".", "--ignore-pattern", "\'.config/*\'"]
}) }}

<a id="ignore-directories"></a>

## 忽略目录

忽略目录的方式与忽略文件相同，只需将模式传递给 `globalIgnores()` 辅助函数即可。例如，以下配置会整体忽略 `.config` 目录（也就是说，文件搜索完全不会遍历该目录）：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores([".config/"])]);
```

与 `.gitignore` 不同，像 `.config` 这样的忽略模式只会忽略与配置文件位于同一目录下的 `.config` 目录。如果要递归忽略所有名为 `.config` 的目录，则需要使用 `**/.config/`，如下例所示：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores(["**/.config/"])]);
```

<a id="unignore-files-and-directories"></a>

## 取消忽略文件和目录

你还可以取消忽略之前的模式（包括默认模式）所忽略的文件和目录。例如，以下配置会取消对 `node_modules/mylibrary` 的忽略：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores([
		"!node_modules/", // unignore `node_modules/` directory
		"node_modules/*", // ignore its content
		"!node_modules/mylibrary/", // unignore `node_modules/mylibrary` directory
	]),
]);
```

如果你想忽略某个目录，但保留其中的特定文件或子目录，则必须使用忽略模式 `directory/**/*`，而不是 `directory/**`。模式 `directory/**` 会忽略整个目录及其内容，因此遍历会完全跳过该目录，你也就无法取消忽略其中的任何内容。

例如，`build/**` 会忽略 `build` 目录及其内容，而 `build/**/*` 只会忽略该目录中的内容。如果你想忽略 `build` 目录中的所有内容，但保留 `build/test.js`，则需要创建如下配置：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores([
		"build/**/*", // ignore all contents in and under `build/` directory but not the `build/` directory itself
		"!build/test.js", // unignore `!build/test.js`
	]),
]);
```

如果你想忽略某个目录，但保留该目录下任意层级中的特定文件，还应确保子目录未被忽略。请注意，以 `/` 结尾的模式只匹配目录，而不以 `/` 结尾的模式同时匹配文件和目录，因此无法编写一个只忽略文件的模式。不过，可以使用两个模式实现：一个忽略所有内容，另一个取消忽略子目录。

例如，以下配置会忽略 `build` 目录中及其下所有层级中的文件，但保留任意层级中名为 `test.js` 的文件：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores([
		"build/**/*", // ignore all contents in and under `build/` directory but not the `build/` directory itself
		"!build/**/*/", // unignore all subdirectories
		"!build/**/test.js", // unignore `test.js` files
	]),
]);
```

如果你想忽略 ESLint 的默认文件模式（`**/*.js`、`**/*.cjs` 和 `**/*.mjs`），但仍要对特定文件或目录进行代码检查，可以使用否定模式取消忽略它们：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["**/*.js", "**/*.cjs", "**/*.mjs", "!**/src/**/*.js"]),
]);
```

此配置会忽略匹配默认模式的所有文件，但 `src` 目录中的 JavaScript 文件除外。

::: important
请注意，只有全局 `ignores` 模式可以匹配目录。
特定于某项配置的 `ignores` 模式只能匹配文件名。
:::

你也可以在命令行中使用 [`--ignore-pattern`](../command-line-interface#--ignore-pattern) 取消忽略文件，例如：

{{ npx_tabs({
    package: "eslint",
    args: [".", "--ignore-pattern", "\'!node_modules/\'"]
}) }}

<a id="glob-pattern-resolution"></a>

## Glob 模式的解析方式

glob 模式的求值方式取决于它们的位置和使用方式：

1. 在 `eslint.config.js` 文件中使用 `globalIgnores()` 时，glob 模式相对于 `eslint.config.js` 文件进行求值。
1. 在通过命令行选项 [`--config`](../command-line-interface#-c---config) 指定的备用配置文件中使用 `globalIgnores()` 时，glob 模式相对于当前工作目录进行求值。
1. 使用 [`--ignore-pattern`](../command-line-interface#--ignore-pattern) 时，glob 模式相对于当前工作目录进行求值。

<a id="name-the-global-ignores-config"></a>

## 为全局忽略配置命名

默认情况下，`globalIgnores()` 会为表示忽略项的配置指定一个名称。你可以向 `globalIgnores()` 提供第二个参数，将此名称改为你想使用的名称，而非默认名称：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["build/**/*"], "Ignore Build Directory"),
]);
```

此示例中的字符串 `"Ignore Build Directory"` 是为全局忽略项创建的配置名称。这有助于调试。

<a id="ignored-file-warnings"></a>

## 被忽略文件的警告

将目录传递给 ESLint CLI 时，其中的文件和目录会被静默忽略。如果将特定文件传递给 ESLint，它会发出警告，说明该文件已跳过。例如，假设你的 `eslint.config.js` 文件如下所示：

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores(["foo.js"])]);
```

然后运行：

{{ npx_tabs({
    package: "eslint",
    args: ["foo.js"]
}) }}

你会看到以下警告：

```text
foo.js
  0:0  warning  File ignored because of a matching ignore pattern. Use "--no-ignore" to disable file ignore settings or use "--no-warn-ignored" to suppress this warning.

✖ 1 problem (0 errors, 1 warning)
```

出现此消息是因为 ESLint 无法确定你是否确实想对该文件进行代码检查。正如消息所述，你可以使用 `--no-ignore` 停用忽略规则。

<a id="include-gitignore-files"></a>

## 包含 `.gitignore` 文件

如果你想包含 [`.gitignore`](https://git-scm.com/docs/gitignore) 文件中的模式，或任何其他采用 gitignore 风格模式的文件中的模式，可以使用 `includeIgnoreFile` 工具函数。

```js
// eslint.config.js

import { defineConfig, includeIgnoreFile } from "eslint/config";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
	includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
	{
		// your overrides
	},
]);
```

此函数会自动加载指定文件，并将 gitignore 风格的模式转换为包含 `ignores` glob 模式的配置对象。`{ gitignoreResolution: true }` 选项可确保模式相对于指定文件所在位置进行解析。

也可以提供一个忽略文件路径数组：

```js
// eslint.config.js

import { defineConfig, includeIgnoreFile } from "eslint/config";
import { fileURLToPath } from "node:url";

const rootGitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));
const nestedGitignorePath = fileURLToPath(
	new URL("some/other/folder/.gitignore", import.meta.url),
);

export default defineConfig([
	includeIgnoreFile([rootGitignorePath, nestedGitignorePath], {
		gitignoreResolution: true,
	}),
	{
		// your overrides
	},
]);
```

在这种情况下，将返回一个配置对象数组。

<a id="include-other-ignore-files"></a>

### 包含其他忽略文件

如果省略 `{ gitignoreResolution: true }`，或指定 `{ gitignoreResolution: false" }`，`includeIgnoreFile()` 会将忽略模式解释为相对于 ESLint 配置文件所在的位置。

```js
// eslint.config.js

import { defineConfig, includeIgnoreFile } from "eslint/config";
import { fileURLToPath } from "node:url";

const eslintIgnorePath = fileURLToPath(
	new URL("eslint-ignore-patterns", import.meta.url),
);

export default defineConfig([
	includeIgnoreFile(eslintIgnorePath),
	{
		// your overrides
	},
]);
```

与此不同，`.gitignore` 文件的模式应相对于 `.gitignore` 文件本身所在的位置进行解释。因此，使用 `.gitignore` 文件中的忽略模式时，应始终设置 `{ gitignoreResolution: true }`，以指示 `includeIgnoreFile()` 采用这种解析方式。

<a id="customize-name-of-output-configs"></a>

### 自定义输出配置的名称

默认情况下，`includeIgnoreFile()` 会为表示忽略项的配置指定一个名称。你可以在 `includeIgnoreFile()` 的第二个参数中提供名称，以覆盖默认名称：

```js
// eslint.config.js

import { defineConfig, includeIgnoreFile } from "eslint/config";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
	includeIgnoreFile(gitignorePath, {
		gitignoreResolution: true,
		name: "Imported .gitignore patterns",
	}),
	{
		// your overrides
	},
]);
```
