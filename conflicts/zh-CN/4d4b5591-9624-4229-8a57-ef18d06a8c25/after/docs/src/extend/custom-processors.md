---
title: 自定义处理器
eleventyNavigation:
    key: custom processors
    parent: create plugins
    title: 自定义处理器
    order: 3
---

你还可以创建自定义处理器，告知 ESLint 如何处理标准 JavaScript 以外的文件。例如，你可以编写自定义处理器，从 Markdown 文件中提取并处理 JavaScript（[@eslint/markdown](https://www.npmjs.com/package/@eslint/markdown) 就包含一个用于此目的的自定义处理器）。

::: tip
本页介绍如何创建可与扁平配置格式配合使用的自定义处理器。
:::

<a id="custom-processor-specification"></a>

## 自定义处理器规范

要创建自定义处理器，模块导出的对象必须符合以下接口：

```js
const plugin = {
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3",
	},
	processors: {
		"processor-name": {
			meta: {
				name: "eslint-processor-name",
				version: "1.2.3",
			},
			// takes text of the file and filename
			preprocess(text, filename) {
				// here, you can strip out any non-JS content
				// and split into multiple strings to lint

				return [
					// return an array of code blocks to lint
					{ text: code1, filename: "0.js" },
					{ text: code2, filename: "1.js" },
				];
			},

			// takes a Message[][] and filename
			postprocess(messages, filename) {
				// `messages` argument contains two-dimensional array of Message objects
				// where each top-level array item contains array of lint messages related
				// to the text that was returned in array from preprocess() method

				// you need to return a one-dimensional array of the messages you want to keep
				return [].concat(...messages);
			},

			supportsAutofix: true, // (optional, defaults to false)
		},
	},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

**`preprocess` 方法**接收文件内容和文件名作为参数，并返回一个待进行代码检查的代码块数组。这些代码块会分别进行代码检查，但仍会注册到该文件名下。

代码块有两个属性：`text` 和 `filename`。`text` 属性是代码块的内容，`filename` 属性是代码块的名称。代码块名称可以任意取，但应包含文件扩展名，以便 ESLint 知道如何处理当前代码块。ESLint 会检查项目配置中匹配的 `files` 条目，以确定是否应对这些代码块进行代码检查。

是否只返回非 JavaScript 文件中的一个部分，还是返回多个片段，由插件自行决定。例如，处理 `.html` 文件时，你可能希望将所有脚本合并后，只返回数组中的一个条目。不过，对于 `.md` 文件，你可以返回多个条目，因为每个 JavaScript 代码块都可能彼此独立。

**`postprocess` 方法**接收一个由代码检查消息数组组成的二维数组，以及文件名。输入数组中的每一项都对应 `preprocess` 方法返回的部分内容。`postprocess` 方法必须调整所有错误的位置，使其对应原始的、未经处理的代码中的位置，然后将这些错误汇总为一个一维数组并返回。

报告的问题在每条代码检查消息中包含以下位置信息：

```typescript
type LintMessage = {
	/// The 1-based line number where the message occurs.
	line?: number;

	/// The 1-based column number where the message occurs.
	column?: number;

	/// The 1-based line number of the end location.
	endLine?: number;

	/// The 1-based column number of the end location.
	endColumn?: number;

	/// If `true`, this is a fatal error.
	fatal?: boolean;

	/// Information for an autofix.
	fix: Fix;

	/// The error message.
	message: string;

	/// The ID of the rule which generated the message, or `null` if not applicable.
	ruleId: string | null;

	/// The severity of the message.
	severity: 0 | 1 | 2;

	/// Information for suggestions.
	suggestions?: Suggestion[];
};

type Fix = {
	range: [number, number];
	text: string;
};

type Suggestion = {
	desc?: string;
	messageId?: string;
	fix: Fix;
};
```

默认情况下，即使在命令行启用了 `--fix` 标志，ESLint 在使用自定义处理器时也不会执行自动修复。若要允许 ESLint 使用你的处理器时自动修复代码，请执行以下额外步骤：

1. 更新 `postprocess` 方法，同时转换所报告问题的 `fix` 属性。所有可自动修复的问题都有一个 `fix` 属性，它是一个符合以下结构的对象：

    ```typescript
    {
        range: [number, number],
        text: string
    }
    ```

    `range` 属性包含代码中的两个索引，分别指向将被替换的连续文本片段的起始和结束位置。`text` 属性表示用于替换指定范围的文本。

    在初始问题列表中，`fix` 属性指向经过处理的 JavaScript 中的修复位置。`postprocess` 方法应转换该对象，使其指向原始的、未经处理的文件中的修复位置。

2. 为处理器添加 `supportsAutofix: true` 属性。

你可以在一个插件中同时包含规则和自定义处理器，也可以在一个插件中包含多个处理器。若要支持多个扩展名，请将每个扩展名添加到 `processors` 元素中，并将它们指向同一个对象。

<a id="how-meta-objects-are-used"></a>

### 如何使用 `meta` 对象

`meta` 对象有助于 ESLint 缓存使用处理器的配置，并提供更易理解的调试消息。

<a id="plugin-meta-object"></a>

#### 插件的 `meta` 对象

[插件的 `meta` 对象](plugins#meta-data-in-plugins)提供有关插件本身的信息。当使用字符串格式 `plugin-name/processor-name` 指定处理器时，ESLint 会自动使用插件的 `meta` 为处理器生成名称。这是最常见的处理器指定方式。

示例：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
	{
		files: ["**/*.txt"], // apply processor to text files
		plugins: {
			example,
		},
		processor: "example/processor-name",
	},
	// ... other configs
]);
```

在此示例中，处理器名称为 `"example/processor-name"`，序列化配置时会使用该值。

<a id="processor-meta-object"></a>

#### 处理器的 `meta` 对象

每个处理器也可以指定自己的 `meta` 对象。当处理器对象直接传给配置中的 `processor` 时，会使用此信息。在这种情况下，ESLint 不知道该处理器属于哪个插件。`meta.name` 属性应与处理器名称一致，而 `meta.version` 属性应与处理器所在的 npm 包版本一致。最简单的做法是从你的 `package.json` 中读取这些信息。

示例：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
	{
		files: ["**/*.txt"],
		processor: example.processors["processor-name"],
	},
	// ... other configs
]);
```

在此示例中，直接指定 `example.processors["processor-name"]` 会使用处理器自身的 `meta` 对象。必须定义该对象，才能确保处理器未通过插件名称引用时仍能得到正确处理。

<a id="why-both-meta-objects-are-needed"></a>

#### 为什么需要两个 `meta` 对象

建议插件和每个处理器都提供各自的 `meta` 对象。这样，无论配置中如何指定处理器，依赖 `meta` 对象的功能（例如 `--print-config` 和 `--cache`）都能正常工作。

<a id="specify-processor-in-config-files"></a>

## 在配置文件中指定处理器

要在配置文件中使用插件提供的处理器，请导入插件，并在 `plugins` 键中指定一个命名空间以包含该插件。然后，在 `processor` 配置中使用该命名空间引用处理器，如下所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
	{
		files: ["**/*.txt"],
		plugins: {
			example,
		},
		processor: "example/processor-name",
	},
]);
```

有关详细信息，请参阅插件配置文档中的[指定处理器](../use/configure/plugins#specify-a-processor)。