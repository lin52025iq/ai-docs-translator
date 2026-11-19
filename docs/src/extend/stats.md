---
title: 统计数据
eleventyNavigation:
    key: stats data
    parent: extend eslint
    title: 统计数据
    order: 6
---

{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

虽然可以通过设置 [TIMING](./custom-rules#profile-rule-performance) 环境变量来分析一次 ESLint 运行中各规则的整体性能，但有时获取更_细粒度_的计时数据（每个文件中每条规则的代码检查时间）或收集其他关注的指标也很有用。尤其是在开发新的[自定义插件](./plugins)，以及评估或基准测试新的语言或规则集时。对于这些用例，你可以选择收集 ESLint 的运行时统计数据。

<a id="enable-stats-collection"></a>

## 启用统计数据收集

要启用统计数据收集，可以采用以下任一方式：

1. 使用 `--stats` CLI 选项。它会将统计数据传递给用于输出 ESLint 结果的格式化器。（注意：并非所有格式化器都会输出统计数据。）
1. 将 `stats: true` 设为 `ESLint` 构造函数的选项。

启用统计数据后，每个 [LintResult](../integrate/nodejs-api#-lintresult-type) 对象都会新增一个 `stats` 键，其中包含解析时间、修复时间以及每条规则的代码检查时间等数据。

因此，这些数据不会通过 stdout 提供，但可以通过 CLI 使用格式化器轻松处理，也可以通过 Node.js API 按照你的特定需求处理。

<a id="-stats-type"></a>

## ◆ 统计数据类型

`Stats` 值是每次代码检查运行的计时信息。它包含在 [LintResult](../integrate/nodejs-api#-lintresult-type) 类型的 `stats` 属性中，具有以下属性：

- `fixPasses` (`number`)<br>
  ESLint 在代码检查后至少应用了一次修复的次数。
- `times` (`{ passes: TimePass[] }`)<br>
  对文件进行解析、修复和代码检查所花费的时间；其中代码检查时间是每条规则的计时信息。
    - `TimePass` (`{ parse?: ParseTime, rules?: Record<string, RuleTime>, fix: FixTime, total: number }`)<br>
      一个包含解析、修复和代码检查所花费时间的对象
        - `ParseTime` (`{ total: number }`)<br>
          解析文件所花费的总时间。如果没有执行解析，例如处理器的 `preprocess()` 方法返回空数组，则会省略 `parse` 属性。
        - `RuleTime` (`{ total: number }`)<br>
          某条规则所花费的总时间。
        - `FixTime` (`{ total: number }`)<br>
          对代码应用修复所花费的总时间。

<a id="cli-usage"></a>

### CLI 用法

来看下面这个示例：

```js [file-to-fix.js]
/*eslint no-regex-spaces: "error", wrap-regex: "error"*/

function a() {
	return / foo/.test("bar");
}
```

使用 `--stats` 运行 ESLint，并通过内置的 [`json` 格式化器](../use/formatters/)输出 JSON：

{{ npx_tabs({
    package: "eslint",
    args: ["file-to-fix.js", "--fix", "--stats", "-f", "json"]
}) }}

这会在格式化后的代码检查结果对象中生成以下 `stats` 条目：

```json
{
	"times": {
		"passes": [
			{
				"parse": {
					"total": 3.975959
				},
				"rules": {
					"no-regex-spaces": {
						"total": 0.160792
					},
					"wrap-regex": {
						"total": 0.422626
					}
				},
				"fix": {
					"total": 0.080208
				},
				"total": 12.765959
			},
			{
				"parse": {
					"total": 0.623542
				},
				"rules": {
					"no-regex-spaces": {
						"total": 0.043084
					},
					"wrap-regex": {
						"total": 0.007959
					}
				},
				"fix": {
					"total": 0
				},
				"total": 1.148875
			}
		]
	},
	"fixPasses": 1
}
```

请注意，对于上面的简单示例，所有规则用时之和应当可以直接与 TIMING 输出的第一列进行比较。运行同一命令并设置 `TIMING=all`，即可验证这一点：

```bash
$ TIMING=all npx eslint file-to-fix.js --fix --stats -f json
...
Rule            | Time (ms) | Relative
:---------------|----------:|--------:
wrap-regex      |     0.431 |    67.9%
no-regex-spaces |     0.204 |    32.1%
```

<a id="api-usage"></a>

### API 用法

你也可以通过 Node.js API 实现相同的功能：将 `stats: true` 作为选项传递给 `ESLint` 构造函数。例如：

```js
const { ESLint } = require("eslint");

(async function main() {
	// 1. Create an instance.
	const eslint = new ESLint({ stats: true, fix: true });

	// 2. Lint files.
	const results = await eslint.lintFiles(["file-to-fix.js"]);

	// 3. Format the results.
	const formatter = await eslint.loadFormatter("json");
	const resultText = formatter.format(results);

	// 4. Output it.
	console.log(resultText);
})().catch(error => {
	process.exitCode = 1;
	console.error(error);
});
```
