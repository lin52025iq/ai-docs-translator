---
title: 配置规则
eleventyNavigation:
    key: configure rules
    parent: configure
    title: 配置规则
    order: 3
---

::: tip
本页介绍如何使用扁平配置格式配置规则。
:::

规则是 ESLint 的核心构建模块。规则会检查代码是否符合特定预期，并规定代码不符合预期时该如何处理。规则还可以包含针对该规则的其他配置选项。

ESLint 内置了大量[内置规则](../../rules/)，你也可以通过插件添加更多规则。你可以通过配置注释或配置文件修改项目使用的规则。

<a id="rule-severities"></a>

## 规则严重级别

要更改规则的严重级别，请将规则 ID 设置为以下值之一：

- `"off"` 或 `0` - 关闭规则。
- `"warn"` 或 `1` - 启用规则并将其设为警告（不影响退出代码）。
- `"error"` 或 `2` - 启用规则并将其设为错误（触发时退出代码为 1）。

通常会将规则设为 `"error"`，以便在持续集成测试、提交前检查和合并拉取请求时强制遵守规则，因为这样会使 ESLint 以非零退出代码退出。

如果你不想强制遵守某条规则，但仍希望 ESLint 报告该规则的违规情况，请将严重级别设为 `"warn"`。这种做法通常用于引入一条最终会设为 `"error"` 的新规则；规则标记的并非潜在的构建时或运行时错误（例如未使用的变量）；或者规则无法确定是否确实存在问题（例如规则可能产生误报，需要人工审核）。

<a id="use-configuration-comments"></a>

### 使用配置注释

要在文件中使用配置注释配置规则，请使用以下格式的注释：

```js
/* eslint eqeqeq: "off", curly: "error" */
```

在此示例中，[`eqeqeq`](../../rules/eqeqeq) 已关闭，而 [`curly`](../../rules/curly) 已启用并设为错误。你也可以使用数字表示规则严重级别：

```js
/* eslint eqeqeq: 0, curly: 2 */
```

此示例与上一个示例相同，只是使用数字代码而不是字符串值。[`eqeqeq`](../../rules/eqeqeq) 规则已关闭，而 [`curly`](../../rules/curly) 规则已设为错误。

如果规则有其他选项，可以使用数组字面量语法指定，例如：

```js
/* eslint quotes: ["error", "double"], curly: 2 */
```

此注释为 [`quotes`](../../rules/quotes) 规则指定了 `"double"` 选项。数组中的第一项始终是规则严重级别（数字或字符串）。

<a id="configuration-comment-descriptions"></a>

#### 配置注释说明

配置注释可以包含说明，用于解释为何需要此注释。说明必须写在配置之后，并以两个或更多连续的 `-` 字符与配置分隔。例如：

```js
/* eslint eqeqeq: "off", curly: "error" -- Here's a description about why this configuration is necessary. */
```

```js
/* eslint eqeqeq: "off", curly: "error"
    --------
    Here's a description about why this configuration is necessary. */
```

```js
/* eslint eqeqeq: "off", curly: "error"
 * --------
 * This will not work due to the line above starting with a '*' character.
 */
```

<a id="report-unused-eslint-inline-config-comments"></a>

#### 报告未使用的 `eslint` 行内配置注释

要报告未使用的 `eslint` 行内配置注释（即没有改变现有配置的注释），请使用 `reportUnusedInlineConfigs` 设置。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		linterOptions: {
			reportUnusedInlineConfigs: "error",
		},
	},
]);
```

此设置默认为 `"off"`。

此设置类似于 [`--report-unused-inline-configs`](../command-line-interface#--report-unused-inline-configs) CLI 选项。

::: tip
如需了解如何强制遵循配置注释方面的最佳实践，请参阅 [`eslint-plugin-eslint-comments`](https://github.com/eslint-community/eslint-plugin-eslint-comments)（[文档](https://eslint-community.github.io/eslint-plugin-eslint-comments/)）。
:::

<a id="use-configuration-files"></a>

### 使用配置文件

要在[配置文件](./configuration-files#configuration-file)中配置规则，请使用 `rules` 键，并指定错误级别和所需的任何选项。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			eqeqeq: "off",
			"no-unused-vars": "error",
			"prefer-const": ["error", { ignoreReadBeforeAssign: true }],
		},
	},
]);
```

如果多个配置对象指定了同一条规则，规则配置会合并，后面的对象优先于前面的对象。例如：

```js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: ["error", "never"],
		},
	},
	{
		rules: {
			semi: ["warn", "always"],
		},
	},
]);
```

使用此配置时，`semi` 的最终规则配置为 `["warn", "always"]`，因为它在数组中最后出现。该数组表示配置包含严重级别和任意选项。你也可以像下面这样只定义字符串或数字来更改严重级别：

```js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: ["error", "never"],
		},
	},
	{
		rules: {
			semi: "warn",
		},
	},
]);
```

在这里，第二个配置对象只覆盖了严重级别，因此 `semi` 的最终配置为 `["warn", "never"]`。

::: important
通过配置注释配置的规则具有最高优先级，并且会在所有配置文件设置之后应用。
:::

<a id="rules-from-plugins"></a>

## 插件中的规则

要配置插件中定义的规则，请在规则 ID 前加上插件命名空间和 `/`。

例如，在[配置文件](./configuration-files#configuration-file)中：

```js
// eslint.config.js
import example from "eslint-plugin-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		plugins: {
			example,
		},
		rules: {
			"example/rule1": "warn",
		},
	},
]);
```

在此配置文件中，规则 `example/rule1` 来自名为 `eslint-plugin-example` 的插件。

你也可以在配置注释中使用这种格式，例如：

```js
/* eslint "example/rule1": "error" */
```

:::important
要在配置注释中使用插件规则，配置文件必须加载该插件，并在配置的 `plugins` 对象中指定它。配置注释本身无法加载插件。
:::

<a id="disable-rules"></a>

## 禁用规则

<a id="use-configuration-comments-1"></a>

### 使用配置注释

- **谨慎使用。** 只有在有明确且合理的理由时，才应限制并使用行内禁用 ESLint 规则的方式。行内禁用规则不应成为解决代码检查错误的默认方法。
- **说明原因。** 在注释的 `--` 部分之后添加说明，解释为何要禁用特定规则。说明应阐明禁用规则的原因，以及为何在这种特定情况下必须禁用。
- **临时解决方案。** 如果添加禁用注释只是为了解决紧急问题的临时措施，请创建后续任务，以妥善解决根本问题。这样可以确保稍后重新审视并移除禁用注释。
- **代码审查和结对编程。** 鼓励团队成员定期审查彼此的代码。代码审查有助于找出添加禁用注释的原因，并确保正确使用这些注释。
- **配置。** 尽可能优先使用 ESLint 配置文件，而不是禁用注释。配置文件可确保在整个项目中一致地处理规则。

要禁用文件某一部分中的规则警告，请使用以下格式的块注释：

```js
/* eslint-disable */

alert("foo");

/* eslint-enable */
```

你也可以禁用或启用特定规则的警告：

```js
/* eslint-disable no-alert, no-console */

alert("foo");
console.log("bar");

/* eslint-enable no-alert, no-console */
```

::: warning
如果 `/* eslint-enable */` 未列出任何特定规则，则会重新启用所有已禁用的规则。
:::

要禁用整个文件中的规则警告，请在文件顶部添加 `/* eslint-disable */` 块注释：

```js
/* eslint-disable */

alert("foo");
```

你也可以针对整个文件禁用或启用特定规则：

```js
/* eslint-disable no-alert */

alert("foo");
```

要确保某条规则永远不会应用（无论之后出现什么启用或禁用行）：

```js
/* eslint no-alert: "off" */

alert("foo");
```

要禁用特定行上的所有规则，请使用以下格式之一的行注释或块注释：

```js
alert("foo"); // eslint-disable-line

// eslint-disable-next-line
alert("foo");

/* eslint-disable-next-line */
alert("foo");

alert("foo"); /* eslint-disable-line */
```

要禁用特定行上的某条规则：

```js
alert("foo"); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert("foo");

alert("foo"); /* eslint-disable-line no-alert */

/* eslint-disable-next-line no-alert */
alert("foo");
```

要禁用特定行上的多条规则：

```js
alert("foo"); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert("foo");

alert("foo"); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert("foo");

/* eslint-disable-next-line
  no-alert,
  quotes,
  semi
*/
alert("foo");
```

以上所有方法也适用于插件规则。例如，要禁用 `eslint-plugin-example` 的 `rule-name` 规则，请将插件名称（`example`）和规则名称（`rule-name`）组合为 `example/rule-name`：

```js
foo(); // eslint-disable-line example/rule-name
foo(); /* eslint-disable-line example/rule-name */
```

::: tip
用于禁用文件某一部分警告的注释会告诉 ESLint 不要报告被禁用代码中的规则违规情况。不过，ESLint 仍会解析整个文件，因此被禁用的代码仍须是语法有效的 JavaScript。
:::

<a id="comment-descriptions"></a>

#### 注释说明

配置注释可以包含说明，用于解释为何需要禁用或重新启用规则。说明必须写在配置之后，并以两个或更多连续的 `-` 字符与配置分隔。例如：

```js
// eslint-disable-next-line no-console -- Here's a description about why this configuration is necessary.
console.log("hello");

/* eslint-disable-next-line no-console --
 * Here's a very long description about why this configuration is necessary
 * along with some additional information
 **/
console.log("hello");
```

<a id="use-configuration-files-1"></a>

### 使用配置文件

要在[配置文件](./configuration-files#configuration-file)中为一组文件禁用规则，请使用后续的配置对象并指定 `files` 键。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			"no-unused-expressions": "error",
		},
	},
	{
		files: ["*-test.js", "*.spec.js"],
		rules: {
			"no-unused-expressions": "off",
		},
	},
]);
```

<a id="disable-inline-comments"></a>

### 禁用行内注释

要禁用所有行内配置注释，请在配置文件中使用 `noInlineConfig` 设置。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		linterOptions: {
			noInlineConfig: true,
		},
		rules: {
			"no-unused-expressions": "error",
		},
	},
]);
```

你也可以使用 [`--no-inline-config`](../command-line-interface#--no-inline-config) CLI 选项来禁用规则注释以及其他行内配置。

<a id="report-unused-eslint-disable-comments"></a>

#### 报告未使用的 `eslint-disable` 注释

要报告未使用的 `eslint-disable` 注释（即禁用的规则在对应行上本来就不会报告问题），请使用 `reportUnusedDisableDirectives` 设置。例如：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
	},
]);
```

此设置默认为 `"warn"`。

此设置类似于 [`--report-unused-disable-directives`](../command-line-interface#--report-unused-disable-directives) 和 [`--report-unused-disable-directives-severity`](../command-line-interface#--report-unused-disable-directives-severity) CLI 选项。
