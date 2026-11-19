---
title: 调试配置
eleventyNavigation:
    key: debug config
    parent: configure
    title: 调试配置
    order: 8
---

{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

ESLint 会根据你的配置文件和命令行选项，为每个接受代码检查的文件生成配置。配置文件越大，就越难确定为什么文件没有按预期接受代码检查。为帮助调试配置，ESLint 提供了几种工具。

<a id="run-the-cli-in-debug-mode"></a>

## 在调试模式下运行 CLI

**适用情况：** 你不确定是否读取了正确的配置文件。如果同一项目中有多个配置文件，就可能出现这种情况。

**操作方法：** 使用 [`--debug`](../command-line-interface#--debug) 命令行标志运行 ESLint，并传入要检查的文件，如下所示：

{{ npx_tabs({
    package: "eslint",
    args: ["--debug", "file.js"]
}) }}

这会将 ESLint 的所有调试信息输出到控制台。你应将这些输出复制到文件中，然后搜索 `eslint.config.js`，以查看加载的是哪个文件。以下是一些示例输出：

```text
eslint:eslint Using file patterns: [ 'bin/eslint.js' ] +0ms
eslint:eslint Searching for eslint.config.js +0ms
eslint:eslint Loading config from C:\Users\nzakas\projects\eslint\eslint\eslint.config.js +5ms
eslint:eslint Config file URL is file:///C:/Users/nzakas/projects/eslint/eslint/eslint.config.js +0ms
```

<a id="print-a-files-calculated-configuration"></a>

## 打印文件计算后的配置

**适用情况：** 你不确定为什么代码检查没有产生预期结果，例如规则配置似乎未生效，或者使用了错误的语言选项。

**操作方法：** 使用 [`--print-config`](../command-line-interface#--print-config) 命令行标志运行 ESLint，并传入要检查的文件，如下所示：

{{ npx_tabs({
    package: "eslint",
    args: ["--print-config", "file.js"]
}) }}

这会输出文件计算后配置的 JSON 表示形式，例如：

```json
{
	"linterOptions": {
		"reportUnusedDisableDirectives": 1
	},
	"language": "@/js",
	"languageOptions": {
		"sourceType": "module",
		"ecmaVersion": "latest"
	},
	"plugins": ["@"],
	"rules": {
		"prefer-const": 2
	}
}
```

::: tip
你不会看到 `files`、`ignores` 或 `name` 条目，因为它们只用于计算最终配置，因此不会出现在结果中。你会看到 ESLint 自身应用的任何默认配置。
:::

<a id="use-the-config-inspector"></a>

## 使用配置检查器

**适用情况：** 你不确定配置文件中的某些配置对象是否与给定的文件名匹配。

**操作方法：** 使用 [`--inspect-config`](../command-line-interface#--inspect-config) 命令行标志运行 ESLint，并传入要检查的文件，如下所示：

{{ npx_tabs({
    package: "eslint",
    args: ["--inspect-config"]
}) }}

这会通过安装并启动 [`@eslint/config-inspector`](https://github.com/eslint/config-inspector) 来启动配置检查器。随后，你可以输入相关文件名，查看哪些配置对象会应用于该文件。

![配置检查器截图，显示与 index.js 匹配的配置对象](../../assets/images/configure/config-inspector.png)

配置检查器还会显示哪些规则已弃用、你正在使用多少条可用规则等信息。
