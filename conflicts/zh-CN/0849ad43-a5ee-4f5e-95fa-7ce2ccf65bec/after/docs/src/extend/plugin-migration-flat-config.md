---
title: 插件迁移到扁平配置
eleventyNavigation:
    key: plugin flat config
    parent: create plugins
    title: 迁移到扁平配置
    order: 5
---

从 ESLint v9.0.0 开始，默认配置系统将采用新的扁平配置系统。为了让你的插件能够与扁平配置文件配合使用，你需要对现有插件进行一些更改。

<a id="recommended-plugin-structure"></a>

## 推荐的插件结构

为了让你的插件更容易在扁平配置系统中使用，建议将现有插件入口点改为以下形式：

```js
const plugin = {
\tmeta: {},
\tconfigs: {},
\trules: {},
\tprocessors: {},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

这种结构能让你在进行本页讨论的其他更改时拥有最大的灵活性。

<a id="adding-plugin-meta-information"></a>

## 添加插件元信息

在旧的 eslintrc 配置系统中，ESLint 可以根据包名获取插件信息；但在扁平配置中，ESLint 无法再获取插件包的名称。为补充缺失的信息，你应该添加一个 `meta` 键，其中至少包含 `name` 键，最好也包含 `version` 键，例如：

```js
const plugin = {
\tmeta: {
\t\tname: "eslint-plugin-example",
\t\tversion: "1.0.0",
\t},
\tconfigs: {},
\trules: {},
\tprocessors: {},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

如果你的插件以 npm 包的形式发布，`name` 和 `version` 应与 `package.json` 文件中的值相同；否则，你可以为它们指定任意值。

如果没有这些元信息，你的插件将无法与 `--cache` 和 `--print-config` 命令行选项配合使用。

<a id="migrating-rules-for-flat-config"></a>

## 为扁平配置迁移规则

无需更改插件中的 `rules` 键。它的工作方式与旧的 eslintrc 配置系统完全相同。

<a id="migrating-processors-for-flat-config"></a>

## 为扁平配置迁移处理器

每个处理器都应指定一个 `meta` 对象。有关更多信息，请参阅[完整文档](custom-processors)。

只要你没有使用以文件扩展名命名的处理器，插件中的 `processors` 键就无需进行其他更改。如果你使用了以文件扩展名命名的处理器，则必须将名称改为有效标识符（数字和字母）。在旧的配置系统中，以文件扩展名命名的处理器会自动应用；而在扁平配置中则不会。以下是以文件扩展名命名的处理器示例：

```js
const plugin = {
\tconfigs: {},
\trules: {},
\tprocessors: {
\t\t// no longer supported
\t\t".md": {
\t\t\tpreprocess() {},
\t\t\tpostprocess() {},
\t\t},
\t},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

`".md"` 不再是有效的处理器名称，因此必须将它替换为有效标识符，例如 `markdown`：

```js
const plugin = {
\tconfigs: {},
\trules: {},
\tprocessors: {
\t\t// works in both old and new config systems
\t\tmarkdown: {
\t\t\tpreprocess() {},
\t\t\tpostprocess() {},
\t\t},
\t},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

要使用这个重命名后的处理器，你还需要在配置中手动指定它，例如：

```js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
\t{
\t\tfiles: ["**/*.md"],
\t\tplugins: {
\t\t\texample,
\t\t},
\t\tprocessor: "example/markdown",
\t},
]);
```

如果你重命名了以文件扩展名命名的处理器，应更新插件文档并告知用户。

<a id="migrating-configs-for-flat-config"></a>

## 为扁平配置迁移配置

如果你的插件导出的配置会引用该插件本身，则需要将这些配置更新为扁平配置格式。迁移时，需要在 `plugins` 键中直接引用插件。例如，下面是名为 `eslint-plugin-example` 的插件在旧配置系统格式下导出的配置：

```js
// plugin name: eslint-plugin-example
module.exports = {
    configs: {

        // the config referenced by example/recommended
        recommended: {
            plugins: ["example"],
            rules: {
                "example/rule1": "error",
                "example/rule2": "error"
            }
        }
    },
    rules: {
        rule1: {},
        rule2: {};
    }
};
```

要迁移到扁平配置格式，你需要按照推荐的插件结构，在定义 `plugin` 变量之后再添加配置，如下所示：

```js
const plugin = {
\tconfigs: {},
\trules: {},
\tprocessors: {},
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
\trecommended: {
\t\tplugins: {
\t\t\texample: plugin,
\t\t},
\t\trules: {
\t\t\t"example/rule1": "error",
\t\t\t"example/rule2": "error",
\t\t},
\t},
});

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

之后，用户就可以像这样使用导出的配置：

```js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
\t// use recommended config and provide your own overrides
\t{
\t\tfiles: ["**/*.js", "**/*.cjs", "**/*.mjs"],
\t\tplugins: {
\t\t\texample,
\t\t},
\t\textends: ["example/recommended"],
\t\trules: {
\t\t\t"example/rule1": "warn",
\t\t},
\t},
]);
```

如果你的配置扩展了其他配置，可以导出一个数组：

```js
const baseConfig = require("./base-config");

module.exports = {
\tconfigs: {
\t\textendedConfig: [
\t\t\tbaseConfig,
\t\t\t{
\t\t\t\trules: {
\t\t\t\t\t"example/rule1": "error",
\t\t\t\t\t"example/rule2": "error",
\t\t\t\t},
\t\t\t},
\t\t],
\t},
};
```

你应该更新文档，让插件用户了解如何引用导出的配置。

有关更多信息，请参阅[完整文档](https://eslint.org/docs/latest/extend/plugins#configs-in-plugins)。

<a id="migrating-environments-for-flat-config"></a>

## 为扁平配置迁移环境

扁平配置不再支持环境，因此我们建议将环境转换为导出的配置。例如，假设你像这样导出了一个 `mocha` 环境：

```js
// plugin name: eslint-plugin-example
module.exports = {
    environments: {
        mocha: {
            globals: {
                it: true,
                xit: true,
                describe: true,
                xdescribe: true
            }
        }
    },
    rules: {
        rule1: {},
        rule2: {};
    }
};
```

要将此环境迁移为配置，你需要在 `plugin.configs` 对象中添加一个新键，并提供包含相同信息的扁平配置对象，如下所示：

```js
const plugin = {
\tconfigs: {},
\trules: {},
\tprocessors: {},
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
\tmocha: {
\t\tlanguageOptions: {
\t\t\tglobals: {
\t\t\t\tit: "writeable",
\t\t\t\txit: "writeable",
\t\t\t\tdescribe: "writeable",
\t\t\t\txdescribe: "writeable",
\t\t\t},
\t\t},
\t},
});

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;
```

之后，用户就可以像这样使用导出的配置：

```js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
\t{
\t\tfiles: ["**/tests/*.js"],
\t\tplugins: {
\t\t\texample,
\t\t},

\t\t// use the mocha globals
\t\textends: ["example/mocha"],

\t\t// and provide your own overrides
\t\tlanguageOptions: {
\t\t\tglobals: {
\t\t\t\tit: "readonly",
\t\t\t},
\t\t},
\t},
]);
```

你应该更新文档，让插件用户了解如何引用导出的配置。

<a id="backwards-compatibility"></a>

## 向后兼容

如果你的插件需要同时兼容新旧配置系统，则需要：

1. **导出 CommonJS 入口点。** 旧配置系统无法加载仅以 ESM 格式发布的插件。如果源代码使用 ESM，则需要使用打包工具生成 CommonJS 版本，并在 `package.json` 文件中使用 [`exports`](https://nodejs.org/api/packages.html#package-entry-points) 键，确保 Node.js 能找到 CommonJS 版本。
1. **保留 `environments` 键。** 如果你的插件导出了自定义环境，应按原样保留它们，并按照上述说明同时导出对应的扁平配置。ESLint 在扁平配置模式下运行时会忽略 `environments` 键。
1. **同时导出 eslintrc 和扁平配置。** 只有在使用配置时才会验证 `configs` 键，因此你可以在 `configs` 键中同时提供这两种格式的配置。我们建议为旧格式的配置名称添加 `legacy-` 前缀。例如，如果你的主要配置名为 `recommended`，且使用扁平配置格式，那么也可以添加一个名为 `legacy-recommended` 的 eslintrc 格式配置。如果你不想更改配置名称，也可以在 configs 对象中添加一个以 `"flat/"` 为前缀的额外条目（例如，`"flat/recommended"`）。有关详情，请参阅[旧版配置的向后兼容性](plugins#backwards-compatibility-for-legacy-configs)。

<a id="further-reading"></a>

## 延伸阅读

- [扁平配置文件格式概述博客文章](https://eslint.org/blog/2022/08/new-config-system-part-2/)
- [新配置系统 API 用法博客文章](https://eslint.org/blog/2022/08/new-config-system-part-3/)
- [新配置系统背景介绍博客文章](https://eslint.org/blog/2022/08/new-config-system-part-1/)
