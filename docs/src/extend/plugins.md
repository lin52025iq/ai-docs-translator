---
title: 创建插件
eleventyNavigation:
    key: create plugins
    parent: extend eslint
    title: 创建插件
    order: 2
---

ESLint 插件通过添加额外功能来扩展 ESLint。在大多数情况下，你可以创建插件来封装希望在多个项目之间共享的额外功能，从而扩展 ESLint。

<a id="create-a-plugin"></a>

## 创建插件

插件是一个 JavaScript 对象，它向 ESLint 暴露特定属性：

- `meta` - 插件相关信息。
- `configs` - 包含命名配置的对象。
- `rules` - 包含自定义规则定义的对象。
- `processors` - 包含命名处理器的对象。

首先，创建一个 JavaScript 文件，并导出一个包含你希望 ESLint 使用的属性的对象。为了让插件尽可能易于维护，我们建议将插件入口文件整理成如下形式：

```js
const plugin = {
	meta: {},
	configs: {},
	rules: {},
	processors: {},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

如果计划将插件作为 npm 包分发，请确保导出插件对象的模块是包的默认导出。这样，当在命令行的 [`--plugin` 选项](../use/command-line-interface#--plugin)中指定插件时，ESLint 就可以导入它。

<a id="meta-data-in-plugins"></a>

### 插件中的元数据

为了便于调试并更有效地缓存插件，建议在插件根目录的 `meta` 对象中提供 `name`、`version` 和 `namespace`，如下所示：

```js
const plugin = {
	// preferred location of name and version
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3",
		namespace: "example",
	},
	rules: {
		// add rules here
	},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

`meta.name` 属性应与插件的 npm 包名称一致，`meta.version` 属性应与插件的 npm 包版本一致。`meta.namespace` 属性应与用户用于访问插件的规则、处理器、语言和配置的前缀一致。命名空间通常是包名称中 `eslint-plugin-` 后面的部分，因此此示例使用了 `"example"`。提供命名空间后，即使用户在配置文件中指定了不同的命名空间，`defineConfig()` 函数也能找到你的插件。

最简单的方式是从 `package.json` 中读取名称和版本信息，如下例所示：

```js
import fs from "fs";

const pkg = JSON.parse(
	fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const plugin = {
	// preferred location of name and version
	meta: {
		name: pkg.name,
		version: pkg.version,
		namespace: "example",
	},
	rules: {
		// add rules here
	},
};

export default plugin;
```

::: tip
插件名称没有限制，但遵循以下命名约定有助于其他人在 [npm](https://npmjs.com) 上找到你的插件：

- **无作用域：** 如果你的 npm 包名称不使用作用域（不以 `@` 开头），插件名称应以 `eslint-plugin-` 开头，例如 `eslint-plugin-example`。
- **使用作用域：** 如果你的 npm 包名称使用作用域，插件名称应采用 `@<scope>/eslint-plugin-<plugin-name>` 格式，例如 `@jquery/eslint-plugin-jquery`；也可以采用 `@<scope>/eslint-plugin` 格式，例如 `@jquery/eslint-plugin`。

:::

你也可以选择在插件根目录暴露 `name` 和 `version` 属性，例如：

```js
const plugin = {
	// alternate location of name and version
	name: "eslint-plugin-example",
	version: "1.2.3",
	rules: {
		// add rules here
	},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

::: important
虽然 `meta` 对象是提供插件名称和版本的首选方式，但这种格式也可以接受，并且是为了向后兼容而提供的。
:::

<a id="rules-in-plugins"></a>

### 插件中的规则

插件可以暴露供 ESLint 使用的自定义规则。为此，插件必须导出一个 `rules` 对象，其中包含从规则 ID 到规则的键值映射。规则 ID 无须遵循任何命名约定，但不能包含 `/` 字符（例如，可以是 `dollar-sign`，但不能是 `foo/dollar-sign`）。有关如何在插件中创建自定义规则的更多信息，请参阅[自定义规则](custom-rules)。

```js
const plugin = {
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3",
	},
	rules: {
		"dollar-sign": {
			create(context) {
				// rule implementation ...
			},
		},
	},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

若要在配置文件中使用插件的规则，请导入插件并将其添加到 `plugins` 键中，同时指定一个命名空间。然后在 `rules` 配置中使用该命名空间引用规则，如下所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
	{
		files: ["**/*.js"], // any patterns you want to apply the config to
		plugins: {
			example,
		},
		rules: {
			"example/dollar-sign": "error",
		},
	},
]);
```

::: warning
不以 `@` 开头的命名空间不能包含 `/`；以 `@` 开头的命名空间可以包含 `/`。例如，`eslint/plugin` 不是有效的命名空间，但 `@eslint/plugin` 是有效的。此限制是为了向后兼容 eslintrc 对插件命名的限制。
:::

<a id="processors-in-plugins"></a>

### 插件中的处理器

插件可以通过提供 `processors` 对象，暴露供配置文件使用的[处理器](custom-processors)。与规则类似，`processors` 对象中的每个键都是处理器的名称，每个值则是处理器对象本身。示例如下：

```js
const plugin = {
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3",
	},
	processors: {
		"processor-name": {
			preprocess(text, filename) {
				/* ... */
			},
			postprocess(messages, filename) {
				/* ... */
			},
		},
	},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

若要在配置文件中使用插件的处理器，请导入插件并将其添加到 `plugins` 键中，同时指定一个命名空间。然后在 `processor` 配置中使用该命名空间引用处理器，如下所示：

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

<a id="configs-in-plugins"></a>

### 插件中的配置

你可以在 `configs` 键下指定配置，将其打包到插件中。如果你想将一组自定义规则与启用推荐选项的配置打包在一起，这会很有用。每个插件支持多个配置。

你可以在插件所包含的配置中加入插件的单条规则。在配置中，必须在 `plugins` 对象中指定插件名称，并列出你希望启用的、属于该插件的规则。插件规则都必须带有插件命名空间前缀。示例如下：

```js
const plugin = {
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3",
	},
	configs: {},
	rules: {
		"dollar-sign": {
			create(context) {
				// rule implementation ...
			},
		},
	},
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
	recommended: [
		{
			plugins: {
				example: plugin,
			},
			rules: {
				"example/dollar-sign": "error",
			},
			languageOptions: {
				globals: {
					myGlobal: "readonly",
				},
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
		},
	],
});

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

此插件导出一个 `recommended` 配置，它是一个包含单个配置对象的数组。如果只有一个配置对象，也可以直接导出该对象，而不必将其放在数组中。

若要在配置文件中使用插件中的配置，请导入插件，并使用 `extends` 键引用配置名称，如下所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
	{
		files: ["**/*.js"], // any patterns you want to apply the config to
		plugins: {
			example,
		},
		extends: ["example/recommended"],
	},
]);
```

::: important
插件无法强制使用特定配置。用户必须在自己的配置文件中手动加入插件的配置。
:::

<a id="backwards-compatibility-for-legacy-configs"></a>

#### 旧版配置的向后兼容性

如果你的插件需要导出同时适用于当前（扁平配置）系统和旧版（eslintrc）系统的配置，可以在 `configs` 键中同时导出这两种配置类型。导出旧版配置时，我们建议在名称前加上 `"legacy-"`（例如 `"legacy-recommended"`），以便明确该配置的使用方式。

如果你的插件在 ESLint v9.0.0 之前就已存在，那么你可能已经有名为 `"recommended"` 的旧版配置。如果你不想更改配置名称，也可以在 `configs` 对象中额外添加一个以 `"flat/"` 为前缀的条目（例如 `"flat/recommended"`）。示例如下：

```js
const plugin = {
	meta: {
		name: "eslint-plugin-example",
		version: "1.2.3",
	},
	configs: {},
	rules: {
		"dollar-sign": {
			create(context) {
				// rule implementation ...
			},
		},
	},
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
	// flat config format
	"flat/recommended": [
		{
			plugins: {
				example: plugin,
			},
			rules: {
				"example/dollar-sign": "error",
			},
			languageOptions: {
				globals: {
					myGlobal: "readonly",
				},
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
		},
	],

	// eslintrc format
	recommended: {
		plugins: ["example"],
		rules: {
			"example/dollar-sign": "error",
		},
		globals: {
			myGlobal: "readonly",
		},
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
});

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

采用这种方式后，两种配置系统都能识别 `"recommended"`。旧配置系统使用 `recommended` 键，而当前配置系统使用 `flat/recommended` 键。`defineConfig()` 辅助函数会先查找 `recommended` 键；如果其格式不正确，则会查找 `flat/recommended` 键。如果之后不再需要支持旧配置系统，这种方式也为你提供了升级路径，届时可以将 `flat/recommended` 重命名为 `recommended`。

<a id="testing-a-plugin"></a>

## 测试插件

ESLint 提供了 [`RuleTester`](../integrate/nodejs-api#ruletester) 工具，方便你测试插件中的规则。

<a id="linting-a-plugin"></a>

## 检查插件

ESLint 插件也应该经过代码检查！建议使用以下工具的 `recommended` 配置对插件进行代码检查：

- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-plugin-eslint-plugin](https://www.npmjs.com/package/eslint-plugin-eslint-plugin)
- [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n)

<a id="share-plugins"></a>

## 分享插件

若要公开你的插件，必须将其发布到 npm。发布时，请务必：

1. **将 ESLint 列为对等依赖。** 插件是为配合 ESLint 使用而设计的，因此将 `eslint` 包添加为对等依赖非常重要。为此，请手动编辑 `package.json` 文件，加入 `peerDependencies` 代码块，如下所示：

    ```json
    {
    	"peerDependencies": {
    		"eslint": ">=10.0.0"
    	}
    }
    ```

2. **指定关键字。** ESLint 插件应在 `package.json` 文件中将 `eslint`、`eslintplugin` 和 `eslint-plugin` 指定为[关键字](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#keywords)。