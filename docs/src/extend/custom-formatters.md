---
title: 自定义格式化器
eleventyNavigation:
    key: custom formatters
    parent: extend eslint
    title: 自定义格式化器
    order: 4
---

自定义格式化器可以按照最适合你需求的格式显示代码检查结果，无论是特定的文件格式、某种显示样式，还是针对特定工具优化的格式。

ESLint 还提供可供使用的[内置格式化器](../use/formatters/)。

你可以直接在项目中使用自定义格式化器，也可以创建 npm 包单独分发。

<a id="create-a-custom-formatter"></a>

## 创建自定义格式化器

每个格式化器都是一个函数，它接收一个 `results` 对象和一个 `context` 作为参数，并返回一个字符串。例如，内置的 [JSON 格式化器](../use/formatters/#json)实现如下：

```js
//my-awesome-formatter.js
module.exports = function (results, context) {
	return JSON.stringify(results, null, 2);
};
```

格式化器也可以是异步函数（从 ESLint v8.4.0 开始支持），下面是一个简单的示例：

```js
//my-awesome-formatter.js
module.exports = async function (results) {
	const formatted = await asyncTask();
	return formatted;
};
```

要使用此格式化器运行 ESLint，可以使用 [`-f`（或 `--format`）](../use/command-line-interface#-f---format)命令行标志。本地定义的自定义格式化器路径必须以句点（`.`）开头，例如 `./my-awesome-formatter.js` 或 `../formatters/my-awesome-formatter.js`。

```bash
eslint -f ./my-awesome-formatter.js src/
```

本节其余部分介绍有关如何使用自定义格式化器函数的参考信息。

<a id="the-results-argument"></a>

### `results` 参数

传递给格式化器的 `results` 对象是一个 [`LintResult`](../integrate/nodejs-api#-lintresult-type) 对象数组，其中包含各个文件的代码检查结果。输出示例如下：

```js
[
	{
		filePath: "/path/to/a/file.js",
		messages: [
			{
				ruleId: "curly",
				severity: 2,
				message: "Expected { after 'if' condition.",
				line: 2,
				column: 1,
			},
			{
				ruleId: "no-process-exit",
				severity: 2,
				message: "Don't use process.exit(); throw an error instead.",
				line: 3,
				column: 1,
			},
		],
		errorCount: 2,
		warningCount: 0,
		fixableErrorCount: 0,
		fixableWarningCount: 0,
		source: "var err = doStuff();\nif (err) console.log('failed tests: ' + err);\nprocess.exit(1);\n",
	},
	{
		filePath: "/path/to/Gruntfile.js",
		messages: [],
		errorCount: 0,
		warningCount: 0,
		fixableErrorCount: 0,
		fixableWarningCount: 0,
	},
];
```

<a id="the-context-argument"></a>

### `context` 参数

格式化器函数接收一个 `context` 对象作为第二个参数。该对象具有以下属性：

- `color`（可选）：如果设置了 `--color`，此属性为 `true`；如果设置了 `--no-color`，则为 `false`。如果没有提供这两个选项中的任何一个，则省略此属性。
- `cwd`：当前工作目录。该值来自 [ESLint](../integrate/nodejs-api#-new-eslintoptions) 类的 `cwd` 构造函数选项。
- `maxWarningsExceeded`（可选）：如果设置了 `--max-warnings`，且警告数量超出限制，则此属性的值为一个包含以下两个属性的对象：
    - `maxWarnings`：`--max-warnings` 选项的值
    - `foundWarnings`：代码检查发现的警告数量
- `rulesMeta`：规则的 `meta` 属性值。有关规则的更多信息，请参阅[自定义规则](custom-rules)页面。

例如，如果运行了 `no-extra-semi` 规则，该对象看起来会是这样：

```js
{
    cwd: "/path/to/cwd",
    maxWarningsExceeded: {
        maxWarnings: 5,
        foundWarnings: 6
    },
    rulesMeta: {
        "no-extra-semi": {
            type: "suggestion",
            docs: {
                description: "disallow unnecessary semicolons",
                recommended: true,
                url: "https://eslint.org/docs/rules/no-extra-semi"
            },
            fixable: "code",
            schema: [],
            messages: {
                unexpected: "Unnecessary semicolon."
            }
        }
    },
}
```

**注意：**如果通过已弃用的 `CLIEngine` 类执行代码检查，`context` 参数可能会有所不同，因为其值由 API 用户决定。如果你想支持旧版环境，请检查 `context` 参数是否符合预期。

<a id="passing-arguments-to-formatters"></a>

### 向格式化器传递参数

虽然格式化器函数除了 results 对象和 context 之外不会接收其他参数，但你可以使用下面介绍的方法向自定义格式化器传递额外数据。

<a id="use-environment-variables"></a>

#### 使用环境变量

自定义格式化器可以访问环境变量，因此能够根据环境变量数据改变行为。

下面的示例使用 `FORMATTER_SKIP_WARNINGS` 环境变量来决定是否在结果中显示警告：

```js
module.exports = function (results) {
	var skipWarnings = process.env.FORMATTER_SKIP_WARNINGS === "true";

	var results = results || [];
	var summary = results.reduce(
		function (seq, current) {
			current.messages.forEach(function (msg) {
				var logMessage = {
					filePath: current.filePath,
					ruleId: msg.ruleId,
					message: msg.message,
					line: msg.line,
					column: msg.column,
				};

				if (msg.severity === 1) {
					logMessage.type = "warning";
					seq.warnings.push(logMessage);
				}
				if (msg.severity === 2) {
					logMessage.type = "error";
					seq.errors.push(logMessage);
				}
			});
			return seq;
		},
		{
			errors: [],
			warnings: [],
		},
	);

	if (summary.errors.length > 0 || summary.warnings.length > 0) {
		var warnings = !skipWarnings ? summary.warnings : []; // skip the warnings in that case

		var lines = summary.errors
			.concat(warnings)
			.map(function (msg) {
				return (
					"\n" +
					msg.type +
					" " +
					msg.ruleId +
					"\n  " +
					msg.filePath +
					":" +
					msg.line +
					":" +
					msg.column
				);
			})
			.join("\n");

		return lines + "\n";
	}
};
```

你可以像这样设置环境变量并使用此自定义格式化器运行 ESLint：

```bash
FORMATTER_SKIP_WARNINGS=true eslint -f ./my-awesome-formatter.js src/
```

输出如下：

```bash
error space-infix-ops
  src/configs/bundler.js:6:8

error semi
  src/configs/bundler.js:6:10
```

<a id="complex-argument-passing"></a>

#### 传递复杂参数

如果自定义格式化器模式无法提供你所需的足够选项来格式化 ESLint 结果，最佳做法是使用 ESLint 内置的 [JSON 格式化器](../use/formatters/#json)，并将其输出通过管道传递给另一个程序。例如：

```bash
eslint -f json src/ | your-program-that-reads-JSON --option
```

在此示例中，`your-program-that-reads-json` 程序可以接收 ESLint 结果的原始 JSON，并在输出自己的结果格式之前对其进行处理。你可以向该程序传递任意数量的命令行参数，以便自定义输出。

<a id="formatting-for-terminals"></a>

### 适用于终端的格式

[iTerm2](https://www.iterm2.com/) 或 [Guake](http://guake.org/) 等现代终端要求结果采用特定格式，以便在点击文件名时自动打开文件。大多数终端都支持以下格式：

```bash
file:line:column
```

<a id="packaging-a-custom-formatter"></a>

## 打包自定义格式化器

自定义格式化器可以通过 npm 包分发。为此，请创建一个名称格式为 `eslint-formatter-*` 的 npm 包，其中 `*` 是格式化器的名称（例如 `eslint-formatter-awesome`）。然后，项目应安装该包，并像这样使用 [`-f`（或 `--format`）](../use/command-line-interface#-f---format)标志调用自定义格式化器：

```bash
eslint -f awesome src/
```

如果指定的格式化器名称不是以句点开头，ESLint 会查找以 `eslint-formatter-` 开头的包。因此，使用已打包的自定义格式化器时，无需输入 `eslint-formatter-`。

自定义格式化器的 `package.json` 提示：

- [`main`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#main) 入口必须指向实现自定义格式化器的 JavaScript 文件。
- 添加以下 [`keywords`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#keywords)，帮助用户找到你的格式化器：
    - `"eslint"`
    - `"eslint-formatter"`
    - `"eslintformatter"`

查看 npm 上的所有[自定义格式化器](https://www.npmjs.com/search?q=eslint-formatter)。

<a id="examples"></a>

## 示例

<a id="summary-formatter"></a>

### 汇总格式化器

仅报告错误和警告总数的格式化器如下所示：

```javascript
module.exports = function (results, context) {
	// accumulate the errors and warnings
	var summary = results.reduce(
		function (seq, current) {
			seq.errors += current.errorCount;
			seq.warnings += current.warningCount;
			return seq;
		},
		{ errors: 0, warnings: 0 },
	);

	if (summary.errors > 0 || summary.warnings > 0) {
		return (
			"Errors: " +
			summary.errors +
			", Warnings: " +
			summary.warnings +
			"\n"
		);
	}

	return "";
};
```

使用上述汇总格式化器运行 `eslint`：

```bash
eslint -f ./my-awesome-formatter.js src/
```

将产生以下输出：

```bash
Errors: 2, Warnings: 4
```

<a id="detailed-formatter"></a>

### 详细格式化器

更复杂的报告可能如下所示：

```javascript
module.exports = function (results, context) {
	var results = results || [];

	var summary = results.reduce(
		function (seq, current) {
			current.messages.forEach(function (msg) {
				var logMessage = {
					filePath: current.filePath,
					ruleId: msg.ruleId,
					ruleUrl: context.rulesMeta[msg.ruleId].docs.url,
					message: msg.message,
					line: msg.line,
					column: msg.column,
				};

				if (msg.severity === 1) {
					logMessage.type = "warning";
					seq.warnings.push(logMessage);
				}
				if (msg.severity === 2) {
					logMessage.type = "error";
					seq.errors.push(logMessage);
				}
			});
			return seq;
		},
		{
			errors: [],
			warnings: [],
		},
	);

	if (summary.errors.length > 0 || summary.warnings.length > 0) {
		var lines = summary.errors
			.concat(summary.warnings)
			.map(function (msg) {
				return (
					"\n" +
					msg.type +
					" " +
					msg.ruleId +
					(msg.ruleUrl ? " (" + msg.ruleUrl + ")" : "") +
					"\n  " +
					msg.filePath +
					":" +
					msg.line +
					":" +
					msg.column
				);
			})
			.join("\n");

		return lines + "\n";
	}
};
```

使用此自定义格式化器运行 ESLint：

```bash
eslint -f ./my-awesome-formatter.js src/
```

输出如下：

```bash
error space-infix-ops (https://eslint.org/docs/rules/space-infix-ops)
  src/configs/bundler.js:6:8
error semi (https://eslint.org/docs/rules/semi)
  src/configs/bundler.js:6:10
warning no-unused-vars (https://eslint.org/docs/rules/no-unused-vars)
  src/configs/bundler.js:5:6
warning no-unused-vars (https://eslint.org/docs/rules/no-unused-vars)
  src/configs/bundler.js:6:6
warning no-shadow (https://eslint.org/docs/rules/no-shadow)
  src/configs/bundler.js:65:32
warning no-unused-vars (https://eslint.org/docs/rules/no-unused-vars)
  src/configs/clean.js:3:6
```
