---
title: Node.js API 参考
eleventyNavigation:
    key: node.js api
    parent: integrate eslint
    title: Node.js API 参考
    order: 2
---

虽然 ESLint 的设计初衷是在命令行中运行，但也可以通过 Node.js API 以编程方式使用 ESLint。Node.js API 的目的是让插件和工具作者能够直接使用 ESLint 的功能，而无需经过命令行界面。

**注意：** 使用未文档化的 API 部分，风险自负。只有本文档中特别提及的部分才获准使用，并且会保持稳定可靠。未文档化的部分都不稳定，随时可能更改或移除。

<a id="eslint-class"></a>

## ESLint 类

`ESLint` 类是 Node.js 应用程序中主要使用的类。

此类依赖 Node.js [`fs`](https://nodejs.org/api/fs.html) 模块和文件系统，因此不能在浏览器中使用。如果要在浏览器中检查代码，请改用 [`Linter`](#linter) 类。

下面是使用 `ESLint` 类的简单示例：

```js
const { ESLint } = require("eslint");

(async function main() {
	// 1. Create an instance.
	const eslint = new ESLint();

	// 2. Lint files.
	const results = await eslint.lintFiles(["lib/**/*.js"]);

	// 3. Format the results.
	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	// 4. Output it.
	console.log(resultText);
})().catch(error => {
	process.exitCode = 1;
	console.error(error);
});
```

下面是自动修复代码检查问题的示例：

```js
const { ESLint } = require("eslint");

(async function main() {
	// 1. Create an instance with the `fix` option.
	const eslint = new ESLint({ fix: true });

	// 2. Lint files. This doesn't modify target files.
	const results = await eslint.lintFiles(["lib/**/*.js"]);

	// 3. Modify the files with the fixed code.
	await ESLint.outputFixes(results);

	// 4. Format the results.
	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	// 5. Output it.
	console.log(resultText);
})().catch(error => {
	process.exitCode = 1;
	console.error(error);
});
```

下面是使用 `ESLint` 类和 [`lintText`](#-eslintlinttextcode-options) API 的示例：

```js
const { ESLint } = require("eslint");

const testCode = `
  const name = "eslint";
  if(true) {
    console.log("constant condition warning")
  };
`;

(async function main() {
	// 1. Create an instance
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: {
			languageOptions: {
				ecmaVersion: 2018,
				sourceType: "commonjs",
			},
		},
	});

	// 2. Lint text.
	const results = await eslint.lintText(testCode);

	// 3. Format the results.
	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	// 4. Output it.
	console.log(resultText);
})().catch(error => {
	process.exitCode = 1;
	console.error(error);
});
```

<a id="-new-eslintoptions"></a>

### ◆ new ESLint(options)

```js
const eslint = new ESLint(options);
```

创建一个新的 `ESLint` 实例。

<a id="parameters"></a>

#### 参数

`ESLint` 构造函数接受一个 `options` 对象。如果省略 `options` 对象，则所有选项都使用默认值。`options` 对象具有以下属性。

<a id="file-enumeration"></a>

##### 文件枚举

- `options.cwd` (`string`)<br>
  默认值为 `process.cwd()`。工作目录。必须是绝对路径。
- `options.errorOnUnmatchedPattern` (`boolean`)<br>
  默认值为 `true`。除非设置为 `false`，否则未找到目标文件时，[`eslint.lintFiles()`][eslint-lintfiles] 方法会抛出错误。
- `options.globInputPaths` (`boolean`)<br>
  默认值为 `true`。如果设置为 `false`，[`eslint.lintFiles()`][eslint-lintfiles] 方法不会解析 glob 模式。
- `options.ignore` (`boolean`)<br>
  默认值为 `true`。如果设置为 `false`，[`eslint.lintFiles()`][eslint-lintfiles] 方法不会遵循配置中的 `ignorePatterns`。
- `options.ignorePatterns` (`string[] | null`)<br>
  默认值为 `null`。除配置中的忽略规则外，还要使用的文件忽略模式。这些模式相对于 `cwd`。
- `options.passOnNoPatterns` (`boolean`)<br>
  默认值为 `false`。设为 `true` 时，缺少模式会导致代码检查操作提前结束，且不报告任何失败。
- `options.warnIgnored` (`boolean`)<br>
  默认值为 `true`。文件列表包含被忽略的文件时显示警告。

<a id="linting"></a>

##### 代码检查

- `options.allowInlineConfig` (`boolean`)<br>
  默认值为 `true`。如果设置为 `false`，ESLint 会禁用源代码中的指令注释。此选项为 `false` 时，会覆盖配置中的 `noInlineConfig` 设置。
- `options.baseConfig` (`Config | Config[] | null`)<br>
  默认值为 `null`。[配置对象]，由此实例使用的所有配置扩展。可以使用此选项定义默认设置，以便在配置文件未设置相关选项时使用。
- `options.overrideConfig` (`Config | Config[] | null`)<br>
  默认值为 `null`。[配置对象]，添加在任何现有配置之后，因此（如果使用了配置文件）其设置会在配置文件内容之后生效。
- `options.overrideConfigFile` (`null | true | string`)<br>
  默认值为 `null`。默认情况下，ESLint 会搜索配置文件。此选项设为 `true` 时，ESLint 不会搜索配置文件。此选项设为 `string` 值时，ESLint 不会搜索配置文件，而会使用提供的值作为配置文件路径。
- `options.plugins` (`Record<string, Plugin> | null`)<br>
  默认值为 `null`。ESLint 在配置的 `plugins` 设置中使用的插件实现。这是一个类似映射的对象。键是插件 ID，每个值是相应的实现。
- `options.ruleFilter` (`({ruleId: string, severity: number}) => boolean`)<br>
  默认值为 `() => true`。用于筛选要运行的规则的谓词函数。调用此函数时会传入一个包含 `ruleId` 和 `severity` 的对象；如果应运行该规则，则返回 `true`。
- `options.stats` (`boolean`)<br>
  默认值为 `false`。设为 `true` 时，代码检查结果中会包含额外的统计信息（参见 [Stats 类型](../extend/stats#-stats-type)）。

<a id="autofix"></a>

##### 自动修复

- `options.fix` (`boolean | (message: LintMessage) => boolean`)<br>
  默认值为 `false`。如果设为 `true`，[`eslint.lintFiles()`][eslint-lintfiles] 和 [`eslint.lintText()`][eslint-linttext] 方法会以自动修复模式运行。如果提供谓词函数，这些方法会将每条代码检查消息传递给该函数，然后只使用函数返回 `true` 的消息。
- `options.fixTypes` (`("directive" | "problem" | "suggestion" | "layout")[] | null`)<br>
  默认值为 `null`。[`eslint.lintFiles()`][eslint-lintfiles] 和 [`eslint.lintText()`][eslint-linttext] 方法用于自动修复的规则类型。

<a id="cache-related"></a>

##### 缓存相关

- `options.cache` (`boolean`)<br>
  默认值为 `false`。如果设为 `true`，[`eslint.lintFiles()`][eslint-lintfiles] 方法会缓存代码检查结果，并在各目标文件未更改时使用缓存。请注意，升级 ESLint 插件时，ESLint 不会清除缓存。在这种情况下，必须手动删除缓存文件。即使向 [`eslint.lintText()`][eslint-linttext] 方法传递了 `options.filePath`，该方法也不会使用缓存。
- `options.cacheLocation` (`string`)<br>
  默认值为 `.eslintcache`。[`eslint.lintFiles()`][eslint-lintfiles] 方法会将缓存写入此文件。
- `options.cacheStrategy` (`string`)<br>
  默认值为 `"metadata"`。用于检测文件是否已更改的缓存策略。可以是 `"metadata"` 或 `"content"`。

<a id="suppressions"></a>

##### 抑制项

- `options.applySuppressions` (`boolean`)<br>
  默认值为 `false`。如果设为 `true`，抑制文件中的抑制项会自动应用到 [`eslint.lintFiles()`][eslint-lintfiles] 和 [`eslint.lintText()`][eslint-linttext] 的结果中。使用 `eslint.lintText()` 时，还必须提供 `filePath` 选项，抑制项才会生效。
- `options.suppressionsLocation` (`string`)<br>
  默认值为 `"eslint-suppressions.json"`。抑制文件的路径。该路径可以是绝对路径，也可以是相对于 `cwd` 的路径。

<a id="other-options"></a>

##### 其他选项

- `options.concurrency` (`number | "auto" | "off"`)<br>
  默认值为 `"off"`。默认情况下，ESLint 会在调用线程中检查所有文件。如果此选项指定一个整数，ESLint 最多会使用指定数量的工作线程并发检查文件。`"auto"` 会自动选择设置。指定此选项时，所有其他选项都必须是[可克隆的](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)。
- `options.flags` (`string[]`)<br>
  默认值为 `[]`。要为此实例启用的功能标志。

<a id="-eslintlintfilespatterns"></a>

### ◆ eslint.lintFiles(patterns)

```js
const results = await eslint.lintFiles(patterns);
```

此方法会对与 glob 模式匹配的文件进行代码检查，然后返回结果。

<a id="parameters-1"></a>

#### 参数

- `patterns` (`string | string[]`)<br>
  代码检查目标文件。可以是文件路径、目录路径和 glob 模式。

<a id="return-value"></a>

#### 返回值

- (`Promise<LintResult[]>`)<br>
  此 Promise 成功兑现后会得到一个 [LintResult] 对象数组。

<a id="-eslintlinttextcode-options"></a>

### ◆ eslint.lintText(code, options)

```js
const results = await eslint.lintText(code, options);
```

此方法会对给定的源代码文本进行代码检查，然后返回结果。

默认情况下，此方法使用适用于当前工作目录（构造函数选项 `cwd`）中各文件的配置。如果要使用其他配置，请传递 `options.filePath`，ESLint 会加载与 [`eslint.lintFiles()`][eslint-lintfiles] 对 `options.filePath` 所指文件使用的相同配置。

如果配置为忽略 `options.filePath` 的值，此方法会返回空数组。如果同时设置了 `options.warnIgnored` 和 `options.filePath` 选项，此方法会返回一个 [LintResult] 对象。在这种情况下，结果可能包含一条指明文件已被忽略的警告。

<a id="parameters-2"></a>

#### 参数

第二个参数 `options` 可以省略。

- `code` (`string`)<br>
  要检查的源代码文本。
- `options.filePath` (`string`)<br>
  可选。源代码文本对应的文件路径。如果省略，`result.filePath` 会是字符串 `"<text>"`。
- `options.warnIgnored` (`boolean`)<br>
  可选，默认值为传递给构造函数的 `options.warnIgnored`。如果设为 `true`，且 `options.filePath` 是 ESLint 应忽略的文件，此方法会返回一条包含警告消息的代码检查结果。

<a id="return-value-1"></a>

#### 返回值

- (`Promise<LintResult[]>`)<br>
  此 Promise 成功兑现后会得到一个 [LintResult] 对象数组。即使只有一个代码检查结果，这里仍返回数组，以便此方法与 [`eslint.lintFiles()`][eslint-lintfiles] 方法保持相似的接口。

<a id="-eslintgetrulesmetaforresultsresults"></a>

### ◆ eslint.getRulesMetaForResults(results)

```js
const results = await eslint.lintFiles(patterns);
const rulesMeta = eslint.getRulesMetaForResults(results);
```

此方法会返回一个对象，其中包含给定 `results` 中触发代码检查错误的每条规则的元信息。

<a id="parameters-3"></a>

#### 参数

- `results` (`LintResult[]`)<br>
  调用 `ESLint#lintFiles()` 或 `ESLint#lintText()` 后返回的 [LintResult] 对象数组。

<a id="return-value-2"></a>

#### 返回值

- (`Object`)<br>
  一个对象，其属性名是 `results` 中的规则 ID，属性值是相应规则的元信息（如果可用）。

<a id="-eslintcalculateconfigforfilefilepath"></a>

### ◆ eslint.calculateConfigForFile(filePath)

```js
const config = await eslint.calculateConfigForFile(filePath);
```

此方法会计算给定文件的配置，可用于调试。

<a id="parameters-4"></a>

#### 参数

- `filePath` (`string`)<br>
  要计算其配置的文件路径。不能使用目录路径，因为 ESLint 无法处理 `overrides` 设置。

<a id="return-value-3"></a>

#### 返回值

- (`Promise<Object>`)<br>
  此 Promise 成功兑现后会得到一个配置对象。

<a id="-eslintfindconfigfilefilepath"></a>

### ◆ eslint.findConfigFile(filePath)

```js
const configFilePath = await eslint.findConfigFile(filePath);
```

此方法会根据传递给构造函数的选项，查找此 `ESLint` 实例将使用的配置文件。

<a id="parameters-5"></a>

#### 参数

- `filePath` (`string`)<br>
  可选。要查找关联配置文件的文件路径。如果省略，ESLint 会根据此实例的当前工作目录确定配置文件。

<a id="return-value-4"></a>

#### 返回值

- (`Promise<string | undefined>`)<br>
  此 Promise 成功兑现后会得到正在使用的配置文件的绝对路径；如果未使用配置文件，则为 `undefined`（例如设置了 `overrideConfigFile: true` 时）。

<a id="-eslintispathignoredfilepath"></a>

### ◆ eslint.isPathIgnored(filePath)

```js
const isPathIgnored = await eslint.isPathIgnored(filePath);
```

此方法会检查给定文件是否被配置忽略。

<a id="parameters-6"></a>

#### 参数

- `filePath` (`string`)<br>
  要检查的文件路径。

<a id="return-value-5"></a>

#### 返回值

- (`Promise<boolean>`)<br>
  此 Promise 成功兑现后会得到一个布尔值，表示文件是否被忽略。如果文件被忽略，则返回 `true`。

<a id="-eslintloadformatternameorpath"></a>

### ◆ eslint.loadFormatter(nameOrPath)

```js
const formatter = await eslint.loadFormatter(nameOrPath);
```

此方法会加载格式化程序。格式化程序会将代码检查结果转换为便于人或机器读取的字符串。

<a id="parameters-7"></a>

#### 参数

- `nameOrPath` (`string | undefined`)<br>
  要检查的文件路径。允许使用以下值：
    - `undefined`。此时会加载内置的 `"stylish"` 格式化程序。
    - [内置格式化程序][builtin-formatters]的名称。
    - [第三方格式化程序][third-party-formatters]的名称。例如：
        - `"foo"` 会加载 `eslint-formatter-foo`。
        - `"@foo"` 会加载 `@foo/eslint-formatter`。
        - `"@foo/bar"` 会加载 `@foo/eslint-formatter-bar`。
    - 定义格式化程序的文件路径。路径必须包含一个或多个路径分隔符（`/`），以便与名称区分。例如，以 `./` 开头。

<a id="return-value-6"></a>

#### 返回值

- (`Promise<LoadedFormatter>`)<br>
  此 Promise 成功兑现后会得到一个 [LoadedFormatter] 对象。

<a id="-eslinthasflagflagname"></a>

### ◆ eslint.hasFlag(flagName)

此方法用于确定是否设置了给定的功能标志，如下例所示：

```js
if (eslint.hasFlag("x_feature")) {
	// handle flag
}
```

<a id="parameters-8"></a>

#### 参数

- `flagName` (`string`)<br>
  要检查的标志。

<a id="return-value-7"></a>

#### 返回值

- (`boolean`)<br>
  如果已启用该标志，则为 True。

<a id="-eslintversion"></a>

### ◆ ESLint.version

```js
const version = ESLint.version;
```

ESLint 的版本字符串，例如 `"7.0.0"`。

这是一个静态属性。

<a id="-eslintdefaultconfig"></a>

### ◆ ESLint.defaultConfig

```js
const defaultConfig = ESLint.defaultConfig;
```

ESLint 内部使用的默认配置。此属性提供给希望使用与 ESLint 相同的默认值来计算配置的工具。请注意，默认配置可能会随版本而变化，因此不应依赖其中一定存在任何特定键或值。

这是一个静态属性。

<a id="-eslintfromoptionsmoduleoptionsurl"></a>

### ◆ ESLint.fromOptionsModule(optionsURL)

```js
const eslint = await ESLint.fromOptionsModule(optionsURL);
```

此方法会创建一个 `ESLint` 类实例，并从模块加载选项，例如：

```js
// eslint-options.js

import config from "./my-eslint-config.js";

export default {
	concurrency: "auto",
	overrideConfig: config,
	overrideConfigFile: true,
	stats: true,
};
```

```js
// main.js

...
const optionsURL = new URL("./eslint-options.js", import.meta.url);
const eslint = await ESLint.fromOptionsModule(optionsURL);
...
```

`concurrency` 选项要求所有其他选项都可克隆，以便传递给工作线程。但是，当选项从模块加载时，此限制不适用，因为此时传递给工作线程的是模块 URL，而不是选项对象。

这是一个静态方法。

<a id="parameters-9"></a>

#### 参数

- `optionsURL` (`URL`)<br>
  选项模块的 URL。可以是任何有效的 URL，例如文件 URL 或数据 URL。

<a id="return-value-8"></a>

#### 返回值

- (`Promise<ESLint>`)<br>
  一个新的 `ESLint` 类实例。

<a id="-eslintoutputfixesresults"></a>

### ◆ ESLint.outputFixes(results)

```js
await ESLint.outputFixes(results);
```

此方法会将 ESLint 自动修复功能修改后的代码写入相应文件。如果任何已修改的文件不存在，此方法不会执行任何操作。

这是一个静态方法。

<a id="parameters-10"></a>

#### 参数

- `results` (`LintResult[]`)<br>
  要写入的 [LintResult] 对象。

<a id="return-value-9"></a>

#### 返回值

- (`Promise<void>`)<br>
  此 Promise 会在所有文件写入完成后兑现。

<a id="-eslintgeterrorresultsresults"></a>

### ◆ ESLint.getErrorResults(results)

```js
const filteredResults = ESLint.getErrorResults(results);
```

此方法会复制给定结果并移除警告。返回值仅包含错误。

这是一个静态方法。

<a id="parameters-11"></a>

#### 参数

- `results` (`LintResult[]`)<br>
  要筛选的 [LintResult] 对象。

<a id="return-value-10"></a>

#### 返回值

- (`LintResult[]`)<br>
  筛选后的 [LintResult] 对象。

<a id="-lintresult-type"></a>

### ◆ LintResult 类型

`LintResult` 值包含每个文件的代码检查结果信息。[`eslint.lintFiles()`][eslint-lintfiles] 和 [`eslint.lintText()`][eslint-linttext] 方法会返回此值。它具有以下属性：

- `filePath` (`string`)<br>
  此结果对应文件的绝对路径。如果文件路径未知（即未向 [`eslint.lintText()`][eslint-linttext] 方法传递 `options.filePath` 选项），此值为字符串 `"<text>"`。
- `messages` (`LintMessage[]`)<br>
  [LintMessage] 对象数组。
- `suppressedMessages` (`SuppressedLintMessage[]`)<br>
  [SuppressedLintMessage] 对象数组。
- `fixableErrorCount` (`number`)<br>
  可由构造函数选项 `fix` 自动修复的错误数量。
- `fixableWarningCount` (`number`)<br>
  可由构造函数选项 `fix` 自动修复的警告数量。
- `errorCount` (`number`)<br>
  错误数量，包括可修复错误和致命错误。
- `fatalErrorCount` (`number`)<br>
  致命错误的数量。
- `warningCount` (`number`)<br>
  警告数量，包括可修复的警告。
- `output` (`string | undefined`)<br>
  修改后的源代码文本。如果不存在任何可修复消息，此属性为 `undefined`。
- `source` (`string | undefined`)<br>
  原始源代码文本。如果不存在任何消息，或者存在 `output` 属性，此属性为 `undefined`。
- `stats` (`Stats | undefined`)<br>
  [Stats](../extend/stats#-stats-type) 对象。此对象包含通过 `stats` 选项收集的代码检查性能统计信息。
- `usedDeprecatedRules` (`{ ruleId: string; replacedBy: string[]; info: DeprecatedInfo | undefined }[]`)<br>
  用于检查此文件的已弃用规则的信息。
  如果规则使用了[新的 `deprecated` 属性](../extend/rule-deprecation)，则 `info` 属性会设为 `rule.meta.deprecated`。

<a id="-lintmessage-type"></a>

### ◆ LintMessage 类型

`LintMessage` 值包含每条代码检查错误的信息。[LintResult] 类型的 `messages` 属性中包含此值。它具有以下属性：

- `ruleId` (`string` | `null`)<br>
  生成此代码检查消息的规则名称。如果此消息由 ESLint 核心而非规则生成，则值为 `null`。
- `severity` (`1 | 2`)<br>
  此消息的严重程度。`1` 表示警告，`2` 表示错误。
- `fatal` (`boolean | undefined`)<br>
  如果这是与规则无关的致命错误（例如解析错误），则值为 `true`。
- `message` (`string`)<br>
  错误消息。
- `messageId` (`string | undefined`)<br>
  代码检查错误的消息 ID。如果规则不使用消息 ID，此属性为 `undefined`。
- `line` (`number | undefined`)<br>
  此消息起始位置所在的行号，从 1 开始计数。
- `column` (`number | undefined`)<br>
  此消息起始位置所在的列号，从 1 开始计数。
- `endLine` (`number | undefined`)<br>
  此消息结束位置所在的行号，从 1 开始计数。如果此消息不表示一个范围，此属性为 `undefined`。
- `endColumn` (`number | undefined`)<br>
  此消息结束位置所在的列号，从 1 开始计数。如果此消息不表示一个范围，此属性为 `undefined`。
- `fix` (`EditInfo | undefined`)<br>
  自动修复的 [EditInfo] 对象。如果此消息无法修复，此属性为 `undefined`。
- `suggestions` (`{ desc: string; fix: EditInfo; messageId?: string; data?: object }[] | undefined`)<br>
  建议列表。每条建议由描述和用于修复代码的 [EditInfo] 对象组成。编辑器集成等 API 用户可以选择其中一条建议来修复此消息对应的问题。如果此消息没有任何建议，此属性为 `undefined`。

<a id="-suppressedlintmessage-type"></a>

### ◆ SuppressedLintMessage 类型

`SuppressedLintMessage` 值包含每条被抑制的代码检查错误的信息。[LintResult] 类型的 `suppressedMessages` 属性中包含此值。它具有以下属性：

- `ruleId` (`string` | `null`)<br>
  与 [LintMessage] 类型中的 `ruleId` 相同。
- `severity` (`1 | 2`)<br>
  与 [LintMessage] 类型中的 `severity` 相同。
- `fatal` (`boolean | undefined`)<br>
  与 [LintMessage] 类型中的 `fatal` 相同。
- `message` (`string`)<br>
  与 [LintMessage] 类型中的 `message` 相同。
- `messageId` (`string | undefined`)<br>
  与 [LintMessage] 类型中的 `messageId` 相同。
- `line` (`number | undefined`)<br>
  与 [LintMessage] 类型中的 `line` 相同。
- `column` (`number | undefined`)<br>
  与 [LintMessage] 类型中的 `column` 相同。
- `endLine` (`number | undefined`)<br>
  与 [LintMessage] 类型中的 `endLine` 相同。
- `endColumn` (`number | undefined`)<br>
  与 [LintMessage] 类型中的 `endColumn` 相同。
- `fix` (`EditInfo | undefined`)<br>
  与 [LintMessage] 类型中的 `fix` 相同。
- `suggestions` (`{ desc: string; fix: EditInfo; messageId?: string; data?: object }[] | undefined`)<br>
  与 [LintMessage] 类型中的 `suggestions` 相同。
- `suppressions` (`{ kind: string; justification: string}[]`)<br>
  抑制项列表。每个抑制项由类型和理由组成。

<a id="-editinfo-type"></a>

### ◆ EditInfo 类型

`EditInfo` 值包含编辑文本所需的信息。[LintMessage] 类型的 `fix` 和 `suggestions` 属性中包含此值。它具有以下属性：

- `range` (`[number, number]`)<br>
  一对从 0 开始计数的索引，表示要从源代码文本中移除的范围。
- `text` (`string`)<br>
  要添加的文本。

此编辑信息表示将 `range` 属性指定的范围替换为 `text` 属性的值。这类似于 `sourceCodeText.slice(0, edit.range[0]) + edit.text + sourceCodeText.slice(edit.range[1])`。因此，如果 `range[0]` 和 `range[1]` 属性的值相同，则表示添加；如果 `text` 属性的值为空字符串，则表示移除。

<a id="-loadedformatter-type"></a>

### ◆ LoadedFormatter 类型

`LoadedFormatter` 值是将 [LintResult] 对象转换为文本的对象。[eslint.loadFormatter()][eslint-loadformatter] 方法会返回此值。它具有以下方法：

- `format` (`(results: LintResult[], resultsMeta?: ResultsMeta) => string | Promise<string>`)<br>
  将 [LintResult] 对象转换为文本的方法。`resultsMeta` 是可选参数，主要供 ESLint CLI 使用，其中可以包含 `color` 和 `maxWarningsExceeded` 属性。当此方法调用底层格式化程序函数时，这些属性会通过 [`context`](../extend/custom-formatters#the-context-argument) 对象传递。请注意，ESLint 会自动生成 `context` 对象的 `cwd` 和 `rulesMeta` 属性，因此调用此方法时通常无需传递第二个参数。

---

<a id="loadeslint"></a>

## loadESLint()

`loadESLint()` 函数供希望支持不同 ESLint 版本的集成使用。在 ESLint v10.0.0 及更高版本中，它始终返回使用扁平配置系统的 `ESLint` 类：

```js
const { loadESLint } = require("eslint");

const DefaultESLint = await loadESLint();
```

在 ESLint v9 及更早版本中，`loadESLint()` 接受 `useFlatConfig` 选项，用于在扁平配置和 eslintrc 实现之间进行选择。由于 ESLint v10.0.0 移除了对 eslintrc 的支持，现在会忽略此选项。

然后，可以使用返回的构造函数实例化一个新的 `ESLint` 实例，如下所示：

```js
const DefaultESLint = await loadESLint();
const eslint = new DefaultESLint();
```

如果你的集成还支持更早版本的 ESLint，请检查 `configType` 属性，以确定返回的构造函数使用哪种配置系统。在 ESLint v10.0.0 及更高版本中，该属性始终为 `"flat"`；而在更早版本中，可能为 `"eslintrc"`：

```js
const DefaultESLint = await loadESLint();

if (DefaultESLint.configType === "flat") {
	// do something specific to flat config
}
```

**如果你的集成只需要支持 ESLint v10.0.0 及更高版本，建议直接使用 `ESLint` 构造函数。**

<a id="sourcecode"></a>

## SourceCode

`SourceCode` 类型表示 ESLint 执行代码检查时使用的已解析源代码。它在 ESLint 内部使用，同时也可供已经解析的代码使用。可以将表示代码的文本字符串和符合 [ESTree](https://github.com/estree/estree) 格式的抽象语法树（AST）传递给 `SourceCode`，以创建其实例。AST 必须包含位置信息、范围信息、注释和令牌：

```js
const SourceCode = require("eslint").SourceCode;

const code = new SourceCode("var foo = bar;", ast);
```

如果 AST 缺少任何必需信息，`SourceCode` 构造函数会抛出错误。

`SourceCode` 构造函数会移除 Unicode BOM。
请注意，AST 也应从移除了 BOM 的文本解析得到。

```js
const SourceCode = require("eslint").SourceCode;

const code = new SourceCode("\uFEFFvar foo = bar;", ast);

assert(code.hasBOM === true);
assert(code.text === "var foo = bar;");
```

<a id="sourcecodesplitlines"></a>

### SourceCode#splitLines()

这是 `SourceCode` 上的一个静态函数，用于将源代码文本拆分为行数组。

```js
const SourceCode = require("eslint").SourceCode;

const code = "var a = 1;\nvar b = 2;";

// split code into an array
const codeLines = SourceCode.splitLines(code);

/*
    Value of codeLines will be
    [
        "var a = 1;",
        "var b = 2;"
    ]
 */
```

---

<a id="linter"></a>

## Linter

`Linter` 对象负责实际评估 JavaScript 代码。它不执行任何文件系统操作，只会解析并报告代码问题。特别是，`Linter` 对象不会处理配置文件。除非你是在浏览器中工作，否则通常应改用 [ESLint 类](#eslint-class)。

`Linter` 是一个构造函数，可以传入要使用的选项来创建新实例。可用选项如下：

- `cwd` - 应视为当前工作目录的目录路径。规则可以通过 `context.cwd` 访问此值（参见[上下文对象](../extend/custom-rules#the-context-object)）。如果 `cwd` 为 `undefined`，且全局 `process` 对象已定义（例如在 Node.js 运行时中），则会将其规范化为 `process.cwd()`；否则仍为 `undefined`。

例如：

```js
const Linter = require("eslint").Linter;
const linter1 = new Linter({ cwd: "path/to/project" });
const linter2 = new Linter();
```

在此示例中，`linter1` 上运行的规则会从 `context.cwd` 获取 `path/to/project`。
在 `linter2` 上运行的规则，如果全局 `process` 对象已定义，则会获取 `process.cwd()`；否则会获取 `undefined`（例如在浏览器 <https://eslint.org/demo> 中）。

<a id="linterverify"></a>

### Linter#verify

`Linter` 上最重要的方法是 `verify()`，它会对给定文本启动代码检查。此方法接受三个参数：

- `code` - 要检查的源代码（字符串或 `SourceCode` 实例）。
- `config` - [配置对象]或配置对象数组。
    - **注意：** 如果要检查文本并从文件系统读取配置，请改用 [`ESLint#lintFiles()`][eslint-lintfiles] 或 [`ESLint#lintText()`][eslint-linttext]。
- `options` -（可选）本次运行的其他选项。
    - `filename` -（可选）要与源代码关联的文件名。
    - `preprocess` -（可选）[插件中的处理器](../extend/plugins#processors-in-plugins)文档中称为 `preprocess` 方法的函数。
    - `postprocess` -（可选）[插件中的处理器](../extend/plugins#processors-in-plugins)文档中称为 `postprocess` 方法的函数。
    - `filterCodeBlock` -（可选）用于确定代码检查器应采用哪些代码块的函数。此函数接收两个参数：第一个参数是代码块的虚拟文件名，第二个参数是代码块文本。如果函数返回 `true`，代码检查器就会采用该代码块。如果省略此函数，代码检查器只会采用 `*.js` 代码块。如果提供了 `filterCodeBlock` 函数，它会覆盖此默认行为，因此代码检查器不会自动采用 `*.js` 代码块。
    - `disableFixes` -（可选）设为 `true` 时，代码检查结果中不会包含 `fix` 或 `suggestions` 属性。
    - `allowInlineConfig` -（可选）设为 `false` 可禁止内联注释更改 ESLint 规则。
    - `reportUnusedDisableDirectives` -（可选）设为 `true` 时，如果禁用区域本来就不会报告任何问题，则会为未使用的 `eslint-disable` 和 `eslint-enable` 指令添加错误报告。
    - `ruleFilter` -（可选）用于确定应运行哪些规则的谓词函数。它接收一个包含 `ruleId` 和 `severity` 的对象；如果应运行该规则，则返回 `true`。

如果第三个参数是字符串，则会将其解释为 `filename`。

可以像这样调用 `verify()`：

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verify(
	"var foo;",
	{
		rules: {
			semi: 2,
		},
	},
	{ filename: "foo.js" },
);

// or using SourceCode

const Linter = require("eslint").Linter,
	linter = new Linter(),
	SourceCode = require("eslint").SourceCode;

const code = new SourceCode("var foo = bar;", ast);

const messages = linter.verify(
	code,
	{
		rules: {
			semi: 2,
		},
	},
	{ filename: "foo.js" },
);
```

`verify()` 方法会返回一个对象数组，其中包含代码检查警告和错误的信息。示例如下：

```js
[
	{
		fatal: false,
		ruleId: "semi",
		severity: 2,
		line: 1,
		column: 23,
		message: "Expected a semicolon.",
		fix: {
			range: [1, 15],
			text: ";",
		},
	},
];
```

每条代码检查消息包含以下信息：

- `column` - 错误所在的列。
- `fatal` - 通常省略；如果发生解析错误（与规则无关），则会设为 `true`。
- `line` - 错误所在的行。
- `message` - 应输出的消息。
- `messageId` - 用于生成消息的消息 ID（如果规则不使用消息 ID，则省略此属性）。
- `ruleId` - 触发消息的规则 ID（如果 `fatal` 为 `true`，则为 `null`）。
- `severity` - 根据配置取值为 1 或 2。
- `endColumn` - 错误所在范围的结束列（如果没有范围，则省略此属性）。
- `endLine` - 错误所在范围的结束行（如果没有范围，则省略此属性）。
- `fix` - 描述问题修复方式的对象（如果没有可用修复，则省略此属性）。
- `suggestions` - 描述可能的代码检查修复方式的对象数组，编辑器可通过编程方式启用这些修复（详情参见[使用规则](../extend/custom-rules#providing-suggestions)）。

可以通过 `getSuppressedMessages()` 方法获取上一次运行中被抑制的消息。如果之前没有运行过，`getSuppressedMessage()` 会返回空列表。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verify(
	"var foo = bar; // eslint-disable-line -- Need to suppress",
	{
		rules: {
			semi: ["error", "never"],
		},
	},
	{ filename: "foo.js" },
);
const suppressedMessages = linter.getSuppressedMessages();

console.log(suppressedMessages[0].suppressions); // [{ "kind": "directive", "justification": "Need to suppress" }]
```

也可以使用 `getSourceCode()` 方法获取 `linter` 内部使用的 `SourceCode` 对象实例：

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verify(
	"var foo = bar;",
	{
		rules: {
			semi: 2,
		},
	},
	{ filename: "foo.js" },
);

const code = linter.getSourceCode();

console.log(code.text); // "var foo = bar;"
```

通过这种方式，可以获取上一次运行 `linter.verify()` 时使用的文本和 AST。

<a id="linterverifyandfix"></a>

### Linter#verifyAndFix()

此方法与 verify 类似，但还会运行自动修复逻辑，类似于命令行中的 `--fix` 标志。结果对象会包含自动修复后的代码，以及代码中未被自动修复的剩余代码检查消息。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

const messages = linter.verifyAndFix("var foo", {
	rules: {
		semi: 2,
	},
});
```

此方法的输出对象：

```js
{
    fixed: true,
    output: "var foo;",
    messages: []
}
```

其中包含以下信息：

- `fixed` - 如果代码已修复，则为 True。
- `output` - 修复后的代码文本（如果未应用任何修复，可能与输入相同）。
- `messages` - 给定代码的所有消息集合（包含与上文 `verify` 部分所述相同的信息）。

<a id="linterversionlinterversion"></a>

### Linter#version/Linter.version

每个 `Linter` 实例都有一个 `version` 属性，其中包含该 `Linter` 实例所属 ESLint 版本的语义化版本号。

```js
const Linter = require("eslint").Linter;
const linter = new Linter();

linter.version; // => '9.0.0'
```

也可以不实例化 `Linter`，直接读取 `Linter.version` 属性：

```js
const Linter = require("eslint").Linter;

Linter.version; // => '9.0.0'
```

<a id="lintergettimes"></a>

### Linter#getTimes()

此方法用于获取文件在解析、修复和代码检查上所花费的时间。参见 [Stats](../extend/stats#-stats-type) 对象的 `times` 属性。

<a id="lintergetfixpasscount"></a>

### Linter#getFixPassCount()

此方法用于获取执行自动修复的次数。参见 [Stats](../extend/stats#-stats-type) 对象的 `fixPasses` 属性。

<a id="linterhasflag"></a>

### Linter#hasFlag()

此方法用于确定是否设置了给定的功能标志，如下例所示：

```js
const Linter = require("eslint").Linter;
const linter = new Linter({ flags: ["x_feature"] });

console.log(linter.hasFlag("x_feature")); // true
```

---

<a id="ruletester"></a>

## RuleTester

`eslint.RuleTester` 是用于为 ESLint 规则编写测试的工具。它在内部用于 ESLint 自带的规则，插件也可以使用它。

用法示例：

```js
"use strict";

const rule = require("../../../lib/rules/my-rule"),
	RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("my-rule", rule, {
	valid: [
		{
			code: "var foo = true",
			options: [{ allowFoo: true }],
		},
	],

	invalid: [
		{
			code: "var invalidVariable = true",
			errors: [{ message: "Unexpected invalid variable." }],
		},
		{
			code: "var invalidVariable = true",
			errors: [{ message: /^Unexpected.+variable/ }],
		},
	],

	// optional
	assertionOptions: {
		requireMessage: true,
		requireLocation: false,
		requireData: true,
	},
});
```

`RuleTester` 构造函数接受一个可选对象参数，可用于为测试用例指定默认值。例如，如果所有测试用例都使用 ES2015，可以将其设为默认值：

```js
const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 2015 } });
```

::: tip
如果没有为 `RuleTester` 构造函数指定任何选项，则会使用 ESLint 默认值（`languageOptions: { ecmaVersion: "latest", sourceType: "module" }`）。
:::

<a id="ruletestersetdefaultconfigconfig"></a>

### RuleTester.setDefaultConfig(config)

```js
const RuleTester = require("eslint").RuleTester;

// Apply a default config for subsequently created RuleTester instances
RuleTester.setDefaultConfig({
	languageOptions: { ecmaVersion: 2022, sourceType: "module" },
});

const ruleTester = new RuleTester(); // picks up defaults above
```

设置此调用之后创建的 `RuleTester` 实例所使用的默认配置。

这是一个静态方法。

<a id="parameters-12"></a>

#### 参数

- `config` (`Config`)<br>
  默认应用于所有测试的[配置对象]。此配置会先于每个实例的 `RuleTester` 构造函数选项以及每个测试的配置应用。如果 `config` 不是对象，则会抛出 `TypeError`。

<a id="ruletestergetdefaultconfig"></a>

### RuleTester.getDefaultConfig()

```js
const currentDefaultConfig = RuleTester.getDefaultConfig();
```

返回 `RuleTester` 当前使用的默认配置。

这是一个静态方法。

<a id="return-value-11"></a>

#### 返回值

- (`Config`)<br>
  当前默认配置对象。

<a id="ruletesterresetdefaultconfig"></a>

### RuleTester.resetDefaultConfig()

```js
RuleTester.resetDefaultConfig();
```

将之后创建的 `RuleTester` 实例的默认配置重置为 ESLint 内置默认值。

这是一个静态方法。

<a id="ruletesterrun"></a>

### RuleTester#run()

`RuleTester#run()` 方法用于运行测试。应向其传递以下参数：

- 规则的名称（字符串）。
- 规则对象本身（参见[“使用规则”](../extend/custom-rules)）。
- 一个包含 `valid` 和 `invalid` 属性的对象，这两个属性分别是包含测试用例的数组。
    - 也可以在此对象中传递 `assertionOptions` 属性，为 `invalid` 测试用例的断言配置要求，以确保一致性。

测试用例是一个具有以下属性的对象：

- `name`（字符串，可选）：测试用例的名称，便于查找。
- `code`（字符串，必需）：要运行规则检查的源代码。
- `options`（数组，可选）：传递给规则的选项。此列表中不应包含规则严重程度。
- `before`（函数，可选）：测试用例之前执行的函数。
- `after`（函数，可选）：无论测试用例结果如何，都会在测试之后执行的函数。
- `filename`（字符串，可选）：给定测试用例的文件名（适用于需要断言文件名的规则）。
- `only`（布尔值，可选）：在支持的测试框架中仅运行此测试用例，以便调试。

除了上述属性外，无效测试用例还可以包含以下属性：

- `errors`（数字或数组，必需）：断言规则对这段代码运行时预期生成的错误的某些属性。如果是数字，则断言生成的错误数量；否则应为对象列表，每个对象包含一条已报告错误的信息。错误可使用以下属性（除非另有说明，均为可选）：
    - `message`（字符串/正则表达式）：错误消息。必须提供此属性或 `messageId`。
    - `messageId`（字符串）：错误的 ID。必须提供此属性或 `message`。详情参见[使用 `messageId` 测试错误](#testing-errors-with-messageid)。
    - `data`（对象）：可与 `messageId` 一起使用的占位符数据。
    - `line`（数字）：已报告位置的行号，从 1 开始计数。
    - `column`（数字）：已报告位置的列号，从 1 开始计数。
    - `endLine`（数字）：已报告位置结束处的行号，从 1 开始计数。
    - `endColumn`（数字）：已报告位置结束处的列号，从 1 开始计数。
    - `suggestions`（数组）：包含要检查的建议详情的对象数组。如果规则会生成建议，则此属性为必需。详情参见[测试建议](#testing-suggestions)。

    如果错误以字符串而非对象的形式提供，则使用该字符串断言错误的 `message`。

- `output`（字符串；如果规则会修复代码，则为必需）：断言使用此规则执行一轮自动修复（例如使用命令行标志 `--fix`）时生成的输出。如果此值为 `null` 或省略，则断言所有已报告问题都不提供自动修复。

测试用例的任何其他属性都会直接作为配置选项传递给代码检查器。例如，测试用例可以使用 `languageOptions` 属性配置解析器行为：

```js
{
    code: "let foo;",
    languageOptions: { ecmaVersion: 2015 }
}
```

如果有效测试用例只使用 `code` 属性，也可以选择将其作为包含代码的字符串提供，而不必使用包含 `code` 键的对象。

可以选择配置以下 `assertionOptions`，它们适用于本次调用中的所有错误断言：

- `requireMessage`（布尔值/`"message"`/`"messageId"`，可选）：
    - 如果为 `true`，每个 `errors` 块都必须检查预期错误消息，可以通过 `errors` 数组中的字符串/正则表达式值，或错误对象中的 `message`/`messageId` 检查。
    - 如果为 `"message"`，每个 `errors` 块都必须检查预期错误消息，可以通过 `errors` 数组中的字符串/正则表达式值，或错误对象中的 `message` 检查。
    - 如果为 `"messageId"`，每个 `errors` 块都必须通过错误对象中的 `messageId` 检查预期错误消息。
- `requireLocation`（布尔值，可选）：如果为 `true`，每个 `errors` 块都必须是对象数组，且每个对象必须包含位置属性 `line`、`column`、`endLine` 和 `endColumn`。如果实际错误不包含 `endLine` 和 `endColumn`，可以省略这两个属性。
- `requireData`（布尔值/`"error"`/`"suggestion"`，可选）：
    - 如果为 `true`，每个指定了 `messageId` 的错误对象和每个指定了 `messageId` 的建议对象，在 `messageId` 引用的消息含有[占位符](../extend/custom-rules#use-message-placeholders)时，还必须指定 `data`。
    - 如果为 `"error"`，每个指定了 `messageId` 的错误对象，在 `messageId` 引用的消息含有[占位符](../extend/custom-rules#use-message-placeholders)时，还必须指定 `data`。
    - 如果为 `"suggestion"`，每个指定了 `messageId` 的建议对象，在 `messageId` 引用的消息含有[占位符](../extend/custom-rules#use-message-placeholders)时，还必须指定 `data`。

<a id="testing-errors-with-messageid"></a>

### 使用 `messageId` 测试错误

如果待测试规则使用 `messageId`，可以在测试用例中使用 `messageId` 属性，断言已报告错误的 `messageId`，而不是其 `message`。

```js
{
    code: "let foo;",
    errors: [{ messageId: "unexpected" }]
}
```

对于含有占位符的消息，测试用例还可以使用 `data` 属性，进一步断言已报告错误的 `message`。

```js
{
    code: "let foo;",
    errors: [{ messageId: "unexpected", data: { name: "foo" } }]
}
```

请注意，测试用例中的 `data` 不会断言传递给 `context.report` 的 `data`。相反，它用于生成预期消息文本，然后将该文本与收到的 `message` 进行比较。

<a id="testing-fixes"></a>

### 测试修复

可以使用无效测试用例的 `output` 属性测试应用修复后的结果。只有预期指定的 `code` 会应用修复时，才应使用 `output` 属性；如果预期代码不会发生变化，则可以省略 `output`。例如：

```js
ruleTester.run("my-rule-for-no-foo", rule, {
	valid: [],
	invalid: [
		{
			code: "var foo;",
			output: "var bar;",
			errors: [
				{
					messageId: "shouldBeBar",
					line: 1,
					column: 5,
				},
			],
		},
	],
});
```

此无效测试用例结束时，`RuleTester` 预期应用修复，使代码从 `var foo;` 变为 `var bar;`。如果应用修复后的输出不匹配，则测试失败。

::: important
ESLint 会尽力应用所有修复，但不保证所有修复都能应用。因此，应尽量在单独的 `RuleTester` 测试用例中测试每种修复，而不是在一个测试用例中测试多种修复。如果两个修复存在冲突（因为它们应用于同一段代码），`RuleTester` 只会应用第一个修复。
:::

<a id="testing-suggestions"></a>

### 测试建议

可以在错误对象上定义 `suggestions` 键来测试建议。如果此值是数字，则断言针对该错误提供的建议数量；否则应为对象数组，每个对象包含一条已提供建议的信息。可以使用以下属性：

- `desc`（字符串）：建议的 `desc` 值。必须提供此属性或 `messageId`。
- `messageId`（字符串）：使用 `messageId` 的建议对应的 `messageId` 值。必须提供此属性或 `desc`。
- `data`（对象）：可与 `messageId` 一起使用的占位符数据。
- `output`（字符串，必需）：表示将建议修复应用于输入代码后结果的代码字符串。

示例：

```js
ruleTester.run("my-rule-for-no-foo", rule, {
	valid: [],
	invalid: [
		{
			code: "var foo;",
			errors: [
				{
					suggestions: [
						{
							desc: "Rename identifier 'foo' to 'bar'",
							output: "var bar;",
						},
					],
				},
			],
		},
	],
});
```

建议测试对象中的 `messageId` 和 `data` 属性与错误测试对象中的工作方式相同。详情参见[使用 `messageId` 测试错误](#testing-errors-with-messageid)。

```js
ruleTester.run("my-rule-for-no-foo", rule, {
	valid: [],
	invalid: [
		{
			code: "var foo;",
			errors: [
				{
					suggestions: [
						{
							messageId: "renameFoo",
							data: { newName: "bar" },
							output: "var bar;",
						},
					],
				},
			],
		},
	],
});
```

<a id="customizing-ruletester"></a>

### 自定义 RuleTester

<a id="customizing-describe-and-it"></a>

#### 自定义 `describe` 和 `it`

`RuleTester` 依赖两个函数运行测试：`describe` 和 `it`。这些函数可以来自不同来源：

1. 如果 `RuleTester.describe` 和 `RuleTester.it` 已设置为函数值，`RuleTester` 就会使用 `RuleTester.describe` 和 `RuleTester.it` 运行测试。你可以用此方式自定义 `RuleTester` 的行为，使其适配正在使用的测试框架。

    如果 `RuleTester.itOnly` 已设置为函数值，遇到 `only: true` 的测试用例时，`RuleTester` 会调用 `RuleTester.itOnly`，而不是 `RuleTester.it`。如果未设置 `RuleTester.itOnly`，但 `RuleTester.it` 有 `only` 函数属性，则会回退使用 `RuleTester.it.only`。

2. 否则，如果 `describe` 和 `it` 作为全局变量存在，`RuleTester` 就会使用 `globalThis.describe` 和 `globalThis.it` 运行测试，并使用 `globalThis.it.only` 运行 `only: true` 的测试用例。这样，使用 [Mocha](https://mochajs.org/) 等框架时，无需任何额外配置即可使用 `RuleTester`。
3. 否则，`RuleTester#run` 会按顺序执行所有测试。如果其中一个测试失败，就会抛出错误。这意味着你可以直接使用 `Node.js` 执行调用 `RuleTester.run` 的测试文件，无需测试框架。

`RuleTester#run` 会使用两个参数调用 `describe` 函数：描述规则的字符串和回调函数。回调函数会使用两个参数调用 `it` 函数：描述测试用例的字符串和测试函数。测试通过时，测试函数会成功返回；测试失败时，会抛出错误。`only` 的签名与 `it` 相同。`RuleTester` 会为每个测试用例调用 `it` 或 `only`，即使其中有些用例设置了 `only: true`；测试框架负责实现测试用例排他性。（请注意，这是使用 [Mocha](https://mochajs.org/) 等框架时测试套件的标准行为；只有计划自定义 `RuleTester.describe`、`RuleTester.it` 或 `RuleTester.itOnly` 时，这些信息才相关。）

自定义 `RuleTester` 的示例：

```js
"use strict";

const RuleTester = require("eslint").RuleTester,
	test = require("my-test-runner"),
	myRule = require("../../../lib/rules/my-rule");

RuleTester.describe = function (text, method) {
	RuleTester.it.title = text;
	return method.call(this);
};

RuleTester.it = function (text, method) {
	test(RuleTester.it.title + ": " + text, method);
};

// then use RuleTester as documented

const ruleTester = new RuleTester();

ruleTester.run("my-rule", myRule, {
	valid: [
		// valid test cases
	],
	invalid: [
		// invalid test cases
	],
});
```

<a id="enforcing-assertionoptions-globally"></a>

#### 全局强制使用 `assertionOptions`

由于 `assertionOptions` 是针对每次 `run()` 调用指定的，因此若要在项目中的每次调用中强制使用相同选项，需要采用用户层模式。常见方法有两种：

<a id="option-1--subclass-ruletester-and-override-run"></a>

##### 选项 1 — 派生 RuleTester 子类并重写 `run()`

```js
const { RuleTester } = require("eslint");

class StrictRuleTester extends RuleTester {
	run(ruleName, rule, tests) {
		super.run(ruleName, rule, {
			...tests,
			assertionOptions: {
				// Default assertion options applied to every run() call.
				requireMessage: "messageId",
				requireLocation: true,
				// Per-call options are merged in and take precedence.
				...tests.assertionOptions,
			},
		});
	}
}

module.exports = StrictRuleTester;
```

<a id="option-2--helper-wrapper-function"></a>

##### 选项 2 — 辅助包装函数

```js
const { RuleTester } = require("eslint");

const ruleTester = new RuleTester();

function runWithStrictAssertions(ruleName, rule, tests) {
	return ruleTester.run(ruleName, rule, {
		...tests,
		assertionOptions: {
			// Default assertion options applied to every call.
			requireMessage: "messageId",
			requireLocation: true,
			// Per-call options are merged in and take precedence.
			...tests.assertionOptions,
		},
	});
}

module.exports = runWithStrictAssertions;
```

[配置对象]: ../use/configure/
[builtin-formatters]: ../use/formatters/
[third-party-formatters]: https://www.npmjs.com/search?q=eslintformatter
[eslint-lintfiles]: #-eslintlintfilespatterns
[eslint-linttext]: #-eslintlinttextcode-options
[eslint-loadformatter]: #-eslintloadformatternameorpath
[lintresult]: #-lintresult-type
[lintmessage]: #-lintmessage-type
[suppressedlintmessage]: #-suppressedlintmessage-type
[editinfo]: #-editinfo-type
[loadedformatter]: #-loadedformatter-type
