---
title: 自定义规则教程
eleventyNavigation:
    key: custom rule tutorial
    parent: create plugins
    title: 自定义规则教程
    order: 1
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}
{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

本教程介绍如何为 ESLint 创建自定义规则，并通过插件分发该规则。

你可以创建自定义规则，验证代码是否符合特定预期，并确定代码不符合预期时应如何处理。插件会打包自定义规则和其他配置，让你可以轻松地在不同项目中分享和复用它们。

如需详细了解自定义规则和插件，请参阅以下文档：

- [自定义规则](custom-rules)
- [插件](plugins)

<a id="why-create-a-custom-rule"></a>
## 为什么要创建自定义规则？

如果 ESLint 的[内置规则](../rules/)和社区发布的自定义规则无法满足你的需求，可以创建自定义规则。你可以创建自定义规则来强制执行公司或项目的最佳实践、防止特定错误再次发生，或确保符合某种风格指南。

在创建并非专门针对你的公司或项目的自定义规则之前，最好先在网上搜索一下，看看是否有人发布了能满足你使用场景的自定义规则插件。该规则很可能已经存在。

<a id="prerequisites"></a>
## 前提条件

开始之前，请确保你的开发环境中已安装以下软件：

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/)

本教程还假设你已基本了解 ESLint 和 ESLint 规则。

<a id="the-custom-rule"></a>
## 自定义规则

本教程中的自定义规则要求所有名为 `foo` 的 `const` 变量都赋值为字符串字面量 `"bar"`。该规则定义在文件 `enforce-foo-bar.js` 中。该规则还会建议将赋给 `const foo` 的任何其他值替换为 `"bar"`。

例如，假设你有以下 `foo.js` 文件：

```javascript
// foo.js

const foo = "baz123";
```

使用该规则运行 ESLint 时，会将 `"baz123"` 标记为变量 `foo` 的错误值。如果 ESLint 以自动修复模式运行，就会修改文件，使其内容如下：

```javascript
// foo.js

const foo = "bar";
```

<a id="step-1-set-up-your-project"></a>
## 第 1 步：设置项目

首先，为你的自定义规则创建一个新项目。创建一个新目录，在其中初始化一个 npm 项目，并为自定义规则创建一个新文件：

```shell
mkdir eslint-custom-rule-example # create directory
cd eslint-custom-rule-example # enter the directory
npm init -y # init new npm project
touch enforce-foo-bar.js # create file enforce-foo-bar.js
```

<a id="step-2-stub-out-the-rule-file"></a>
## 第 2 步：创建规则文件框架

在 `enforce-foo-bar.js` 文件中，为 `enforce-foo-bar` 自定义规则添加一些框架代码。同时，添加一个 `meta` 对象，包含规则的一些基本信息。

```javascript
// enforce-foo-bar.js

module.exports = {
	meta: {
		// TODO: add metadata
	},
	create(context) {
		return {
			// TODO: add callback function(s)
		};
	},
};
```

<a id="step-3-add-rule-metadata"></a>
## 第 3 步：添加规则元数据

编写规则之前，先为规则对象添加一些元数据。ESLint 在运行规则时会使用这些信息。

首先，导出一个对象，其中包含 `meta` 属性，用于存放规则的元数据，例如规则类型、文档信息和可修复性。在本例中，规则类型为“problem”，描述为“强制要求名为 `foo` 的变量只能赋值为 'bar'。”，并且该规则可以通过修改代码进行修复。

由于该规则针对 JavaScript，我们还添加 `languages: ["js/js"]`，声明它仅适用于内置的 JavaScript 语言。如果在非 JavaScript 语言中启用该规则，ESLint 会抛出错误。

```javascript
// enforce-foo-bar.js

module.exports = {
	meta: {
		type: "problem",
		docs: {
			description:
				"Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
		},
		fixable: "code",
		schema: [],
		languages: ["js/js"],
	},
	create(context) {
		return {
			// TODO: add callback function(s)
		};
	},
};
```

如需详细了解规则元数据，请参阅[规则结构](custom-rules#rule-structure)。

<a id="step-4-add-rule-visitor-methods"></a>
## 第 4 步：添加规则访问者方法

定义规则的 `create` 函数。该函数接受一个 `context` 对象，并返回一个对象，其中的属性分别对应你想要处理的语法节点类型。本例中，你要处理 `VariableDeclarator` 节点。
你可以选择任意 [ESTree 节点类型](https://github.com/estree/estree)或[选择器](selectors)。

::: tip
你可以使用 [Code Explorer](https://explorer.eslint.org) 查看任何 JavaScript 代码的 AST。这有助于确定你想要针对的节点类型。
:::

在 `VariableDeclarator` 访问者方法中，检查节点是否表示 `const` 变量声明、变量名是否为 `foo`，以及它是否未被赋值为字符串 `"bar"`。你可以通过检查传递给 `VariableDeclaration` 方法的 `node` 来完成这些判断。

如果 `const foo` 声明被赋值为 `"bar"`，规则就不执行任何操作。如果 `const foo` **未**被赋值为 `"bar"`，那么 `context.report()` 会向 ESLint 报告错误。错误报告包含错误信息以及如何修复该错误的说明。

```javascript
// enforce-foo-bar.js
{% raw %}
module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce that a variable named `foo` can only be assigned a value of 'bar'."
        },
        fixable: "code",
        schema: [],
        languages: ["js/js"]
    },
    create(context) {
        return {

            // Performs action in the function on every variable declarator
            VariableDeclarator(node) {

                // Check if a `const` variable declaration
                if (node.parent.kind === "const") {

                    // Check if variable name is `foo`
                    if (node.id.type === "Identifier" && node.id.name === "foo") {

                        // Check if value of variable is "bar"
                        if (node.init && node.init.type === "Literal" && node.init.value !== "bar") {

                            /*
                             * Report error to ESLint. Error message uses
                             * a message placeholder to include the incorrect value
                             * in the error message.
                             * Also includes a `fix(fixer)` function that replaces
                             * any values assigned to `const foo` with "bar".
                             */
                            context.report({
                                node,
                                message: 'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
                                data: {
                                    notBar: node.init.value
                                },
                                fix(fixer) {
                                    return fixer.replaceText(node.init, '"bar"');
                                }
                            });
                        }
                    }
                }
            }
        };
    }
};
{% endraw %}
```

<a id="step-5-set-up-testing"></a>
## 第 5 步：设置测试

编写好规则后，就可以测试它，确保其按预期工作。

ESLint 提供内置的 [`RuleTester`](../integrate/nodejs-api#ruletester) 类来测试规则。你无需使用第三方测试库来测试 ESLint 规则，但 `RuleTester` 能与 Mocha 和 Jest 等工具无缝协作。

接下来，创建测试文件 `enforce-foo-bar.test.js`：

```shell
touch enforce-foo-bar.test.js
```

你将在测试文件中使用 `eslint` 包。请将其安装为开发依赖：

{{ npm_tabs({
    command: "install",
    packages: ["eslint"],
    args: ["--save-dev"]
}) }}

然后在 `package.json` 文件中添加测试脚本来运行测试：

```javascript
// package.json
{
    // ...other configuration
    "scripts": {
        "test": "node enforce-foo-bar.test.js"
    },
    // ...other configuration
}
```

<a id="step-6-write-the-test"></a>
## 第 6 步：编写测试

要使用 `RuleTester` 编写测试，请将该类和你的自定义规则导入 `enforce-foo-bar.test.js` 文件。

`RuleTester#run()` 方法会针对有效和无效的测试用例测试规则。如果规则未能通过任何测试场景，该方法就会抛出错误。
`RuleTester` 要求至少包含一个有效测试场景和一个无效测试场景。

```javascript
// enforce-foo-bar.test.js
const { RuleTester } = require("eslint");
const fooBarRule = require("./enforce-foo-bar");

const ruleTester = new RuleTester({
	// Must use at least ecmaVersion 2015 because
	// that's when `const` variables were introduced.
	languageOptions: { ecmaVersion: 2015 },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
	"enforce-foo-bar", // rule name
	fooBarRule, // rule code
	{
		// checks
		// 'valid' checks cases that should pass
		valid: [
			{
				code: "const foo = 'bar';",
			},
		],
		// 'invalid' checks cases that should not pass
		invalid: [
			{
				code: "const foo = 'baz';",
				output: 'const foo = "bar";',
				errors: 1,
			},
		],
	},
);

console.log("All tests passed!");
```

运行以下命令来执行测试：

```shell
npm test
```

如果测试通过，你应该会在控制台看到以下内容：

```shell
All tests passed!
```

<a id="step-7-bundle-the-custom-rule-in-a-plugin"></a>
## 第 7 步：将自定义规则打包到插件中

编写并验证自定义规则可正常工作后，就可以将它加入插件。使用插件，你可以将规则分享到 npm 包中，以便在其他项目中使用。

创建插件文件：

```shell
touch eslint-plugin-example.js
```

接下来编写插件代码。插件只是导出的 JavaScript 对象。要将规则加入插件，请把它放入插件的 `rules` 对象中。该对象包含规则名称及其源代码组成的键值对。

如需详细了解如何创建插件，请参阅[创建插件](plugins)。

```javascript
// eslint-plugin-example.js

const fooBarRule = require("./enforce-foo-bar");
const plugin = { rules: { "enforce-foo-bar": fooBarRule } };
module.exports = plugin;
```

<a id="step-8-use-the-plugin-locally"></a>
## 第 8 步：在本地使用插件

你可以使用本地定义的插件，在项目中执行自定义规则。要使用本地插件，请在 ESLint 配置文件的 `plugins` 属性中指定插件路径。

以下场景可能适合使用本地定义的插件：

- 你想在发布插件到 npm 之前先测试它。
- 你想使用插件，但不想将它发布到 npm。

在将插件加入项目之前，请使用[扁平配置文件](../use/configure/configuration-files) `eslint.config.js` 为项目创建 ESLint 配置：

```shell
touch eslint.config.js
```

然后将以下代码添加到 `eslint.config.js`：

```javascript
// eslint.config.js
"use strict";

// Import the `defineConfig` helper function
const { defineConfig } = require("eslint/config");
// Import the ESLint plugin locally
const eslintPluginExample = require("./eslint-plugin-example");

module.exports = defineConfig([
	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "commonjs",
			ecmaVersion: "latest",
		},
		// Using the eslint-plugin-example plugin defined locally
		plugins: { example: eslintPluginExample },
		rules: {
			"example/enforce-foo-bar": "error",
		},
	},
]);
```

在测试规则之前，你必须先创建一个用于测试规则的文件。

创建文件 `example.js`：

```shell
touch example.js
```

将以下代码添加到 `example.js`：

```javascript
// example.js

function correctFooBar() {
	const foo = "bar";
}

function incorrectFoo() {
	const foo = "baz"; // Problem!
}
```

现在，你已经可以使用本地定义的插件来测试自定义规则了。

对 `example.js` 运行 ESLint：

{{ npx_tabs({
    package: "eslint",
    args: ["example.js"]
}) }}

终端中会显示以下输出：

```text
/<path-to-directory>/eslint-custom-rule-example/example.js
  8:11  error  Value other than "bar" assigned to `const foo`. Unexpected value: baz  example/enforce-foo-bar

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

<a id="step-9-publish-the-plugin"></a>
## 第 9 步：发布插件

要将包含规则的插件发布到 npm，需要配置 `package.json`。在相应字段中添加以下内容：

1. `"name"`：包的唯一名称。npm 上不能有其他包使用相同名称。
1. `"main"`：插件文件的相对路径。按照本例，路径为 `"eslint-plugin-example.js"`。
1. `"description"`：包的描述，可在 npm 上查看。
1. `"peerDependencies"`：添加 `"eslint": ">=10.0.0"` 作为对等依赖项。使用该插件需要安装此版本或更高版本。将 `eslint` 声明为对等依赖项，意味着用户需要将该包与插件分开添加到项目中。
1. `"keywords"`：包含标准关键字 `["eslint", "eslintplugin", "eslint-plugin"]`，便于用户找到该包。你也可以添加其他可能与插件相关的关键字。

以下是一个完整示例，并附有注释，展示插件的 `package.json` 文件应包含哪些内容：

```javascript
// package.json
{
  // Name npm package.
  // Add your own package name. eslint-plugin-example is taken!
  "name": "eslint-plugin-example",
  "version": "1.0.0",
  "description": "ESLint plugin for enforce-foo-bar rule.",
  "main": "eslint-plugin-example.js", // plugin entry point
  "scripts": {
    "test": "node enforce-foo-bar.test.js"
  },
  // Add eslint>=10.0.0 as a peer dependency.
  "peerDependencies": {
    "eslint": ">=10.0.0"
  },
  // Add these standard keywords to make plugin easy to find!
  "keywords": [
    "eslint",
    "eslintplugin",
    "eslint-plugin"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^10.0.0"
  }
}
```

要发布该包，请运行 `npm publish` 并按照 CLI 提示操作。

之后，你应该就能在 npm 上看到已发布的包了！

<a id="step-10-use-the-published-custom-rule"></a>
## 第 10 步：使用已发布的自定义规则

接下来，你可以使用已发布的插件。

在项目中运行以下命令来下载该包：

{{ npm_tabs({
    command: "install",
    packages: ["eslint-plugin-example"],
    args: ["--save-dev"],
    comment: "Add your package name here"
}) }}

更新 `eslint.config.js`，以使用打包后的插件版本：

```javascript
// eslint.config.js
"use strict";

// Import the plugin downloaded from npm
const eslintPluginExample = require("eslint-plugin-example");

// ... rest of configuration
```

现在，你已经可以测试自定义规则了。

使用下载的插件，对你在第 8 步创建的 `example.js` 文件运行 ESLint：

{{ npx_tabs({
    package: "eslint",
    args: ["example.js"]
}) }}

终端中会显示以下输出：

```text
/<path-to-directory>/eslint-custom-rule-example/example.js
  8:11  error  Value other than "bar" assigned to `const foo`. Unexpected value: baz  example/enforce-foo-bar

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

如上面的消息所示，你可以使用 `--fix` 标志修复此问题，将变量赋值更正为 `"bar"`。

再次运行 ESLint，并加上 `--fix` 标志：

{{ npx_tabs({
    package: "eslint",
    args: ["example.js", "--fix"]
}) }}

运行后，终端中不会显示错误输出，但你可以在 `example.js` 中看到修复结果。内容应该如下：

```javascript
// example.js

// ... rest of file

function incorrectFoo() {
	const foo = "bar"; // Fixed!
}
```

<a id="summary"></a>
## 总结

在本教程中，你创建了一个自定义规则，要求所有名为 `foo` 的 `const` 变量都赋值为字符串 `"bar"`，并建议将赋给 `const foo` 的任何其他值替换为 `"bar"`。你还将该规则加入插件，并将插件发布到了 npm。

通过这些操作，你学到了以下实践，可用于创建其他自定义规则和插件：

1. 创建自定义 ESLint 规则
1. 测试自定义规则
1. 将规则打包到插件中
1. 发布插件
1. 使用插件中的规则

<a id="view-the-tutorial-code"></a>
## 查看教程代码

你可以查看[教程的带注释源代码](https://github.com/eslint/eslint/tree/main/docs/_examples/custom-rule-tutorial-code)。