---
title: Node.js API 集成教程
eleventyNavigation:
    key: integrate with the node.js api tutorial
    parent: integrate eslint
    title: Node.js API 集成教程
    order: 1
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}

本指南将带你了解如何集成 `ESLint` 类来检查文件并获取结果，这对于与其他项目创建集成很有帮助。

<a id="why-create-an-integration"></a>

## 为什么要创建集成？

如果你正在开发以下类型的开发者工具，可能会希望创建 ESLint 集成：

- **代码编辑器和 IDE**：将 ESLint 集成到代码编辑器和 IDE 中，可以实时反馈代码质量，并在你输入时自动突出显示潜在问题。许多编辑器已经提供了 ESLint 插件，但如果现有插件无法满足你的特定需求，你可能需要创建自定义集成。

- **自定义代码检查工具**：如果你正在构建一个结合多个代码检查器或添加特定功能的自定义代码检查工具，可能会希望将 ESLint 集成到工具中，以提供 JavaScript 代码检查能力。

- **代码审查工具**：将 ESLint 集成到代码审查工具中，有助于自动识别代码库中的潜在问题。

- **学习平台**：如果你正在开发学习平台或编程教程，集成 ESLint 可以在用户学习 JavaScript 时提供实时反馈，帮助他们提升编程技能并学习最佳实践。

- **开发者工具集成**：如果你正在创建或扩展开发者工具（例如打包器或测试框架），可能会希望集成 ESLint 以提供代码检查能力。你可以将 ESLint 直接集成到工具中，也可以将其作为插件集成。

<a id="what-youll-build"></a>

## 你将构建什么

在本指南中，你将创建一个简单的 Node.js 项目，使用 `ESLint` 类检查文件并获取结果。

<a id="requirements"></a>

## 要求

本教程假设你熟悉 JavaScript 和 Node.js。

要完成本教程，你需要具备以下条件：

- Node.js (`^20.19.0`, `^22.13.0`, 或 `>=24`)
- npm
- 文本编辑器

<a id="step-1-setup"></a>

## 第 1 步：设置

首先，创建一个新的项目目录：

```shell
mkdir eslint-integration
cd eslint-integration
```

使用 `package.json` 文件初始化项目：

{{ npm_tabs({
    command: "init",
    packages: [],
    args: ["-y"]
}) }}

将 `eslint` 包作为依赖项安装（**而非**开发依赖项）：

{{ npm_tabs({
    command: "install",
    packages: ["eslint"],
    args: []
}) }}

在项目根目录中创建一个名为 `example-eslint-integration.js` 的新文件：

```shell
touch example-eslint-integration.js
```

<a id="step-2-import-and-configure-the-eslint-instance"></a>

## 第 2 步：导入并配置 `ESLint` 实例

从 `eslint` 包中导入 `ESLint` 类，并创建一个新实例。

你可以向 `ESLint` 构造函数传入一个选项对象来自定义 ESLint 配置：

```javascript
// example-eslint-integration.js

const { ESLint } = require("eslint");

// Create an instance of ESLint with the configuration passed to the function
function createESLintInstance(overrideConfig) {
	return new ESLint({
		overrideConfigFile: true,
		overrideConfig,
		fix: true,
	});
}
```

<a id="step-3-lint-and-fix-files"></a>

## 第 3 步：检查并修复文件

要检查文件，请使用 `ESLint` 实例的 `lintFiles` 方法。传给 `ESLint#lintFiles()` 的 `filePaths` 参数可以是字符串或字符串数组，表示你要检查的文件路径。文件路径可以是 glob 模式或文件名。

静态方法 `ESLint.outputFixes()` 接收调用 `ESLint#lintFiles()` 得到的检查结果，然后将修复后的代码写回源文件。

```javascript
// example-eslint-integration.js

// ... previous step's code to instantiate the ESLint instance

// Lint the specified files and return the results
async function lintAndFix(eslint, filePaths) {
	const results = await eslint.lintFiles(filePaths);

	// Apply automatic fixes and output fixed code
	await ESLint.outputFixes(results);

	return results;
}
```

<a id="step-4-output-results"></a>

## 第 4 步：输出结果

定义一个函数，将检查结果输出到控制台。该函数应根据你的集成需求进行定制。例如，你可以将检查结果报告到用户界面中。

在本例中，我们只会将结果记录到控制台：

```javascript
// example-eslint-integration.js

// ... previous step's code to instantiate the ESLint instance
// and get linting results.

// Log results to console if there are any problems
function outputLintingResults(results) {
	// Identify the number of problems found
	const problems = results.reduce(
		(acc, result) => acc + result.errorCount + result.warningCount,
		0,
	);

	if (problems > 0) {
		console.log("Linting errors found!");
		console.log(results);
	} else {
		console.log("No linting errors found.");
	}
	return results;
}
```

<a id="step-5-put-it-all-together"></a>

## 第 5 步：整合所有内容

将上述函数整合到一个名为 `lintFiles` 的新函数中。这个函数将作为集成的主要入口点：

```javascript
// example-eslint-integration.js

// Put previous functions all together
async function lintFiles(filePaths) {
	// The ESLint configuration. Alternatively, you could load the configuration
	// from a .eslintrc file or just use the default config.
	const overrideConfig = {
		languageOptions: {
			ecmaVersion: 2018,
			sourceType: "commonjs",
		},
		rules: {
			"no-console": "error",
			"no-unused-vars": "warn",
		},
	};

	const eslint = createESLintInstance(overrideConfig);
	const results = await lintAndFix(eslint, filePaths);
	return outputLintingResults(results);
}

// Export integration
module.exports = { lintFiles };
```

以下是 `example-eslint-integration.js` 的完整代码示例：

```javascript
const { ESLint } = require("eslint");

// Create an instance of ESLint with the configuration passed to the function
function createESLintInstance(overrideConfig) {
	return new ESLint({
		overrideConfigFile: true,
		overrideConfig,
		fix: true,
	});
}

// Lint the specified files and return the results
async function lintAndFix(eslint, filePaths) {
	const results = await eslint.lintFiles(filePaths);

	// Apply automatic fixes and output fixed code
	await ESLint.outputFixes(results);

	return results;
}

// Log results to console if there are any problems
function outputLintingResults(results) {
	// Identify the number of problems found
	const problems = results.reduce(
		(acc, result) => acc + result.errorCount + result.warningCount,
		0,
	);

	if (problems > 0) {
		console.log("Linting errors found!");
		console.log(results);
	} else {
		console.log("No linting errors found.");
	}
	return results;
}

// Put previous functions all together
async function lintFiles(filePaths) {
	// The ESLint configuration. Alternatively, you could load the configuration
	// from an eslint.config.js file or just use the default config.
	const overrideConfig = {
		languageOptions: {
			ecmaVersion: 2018,
			sourceType: "commonjs",
		},
		rules: {
			"no-console": "error",
			"no-unused-vars": "warn",
		},
	};

	const eslint = createESLintInstance(overrideConfig);
	const results = await lintAndFix(eslint, filePaths);
	return outputLintingResults(results);
}

// Export integration
module.exports = { lintFiles };
```

<a id="conclusion"></a>

## 总结

本教程介绍了如何在项目中使用 `ESLint` 类检查文件并获取结果的基本知识。你可以运用这些知识创建自定义集成，例如代码编辑器插件，从而实时反馈代码质量。

<a id="view-the-tutorial-code"></a>

## 查看教程代码

你可以查看[本教程的注释版源代码](https://github.com/eslint/eslint/tree/main/docs/_examples/integration-tutorial-code)。