---
title: 核心概念
eleventyNavigation:
    key: core concepts
    title: 核心概念
    parent: use eslint
    order: 2
---

本页概述了 ESLint 的一些核心概念。

<a id="what-is-eslint"></a>

## 什么是 ESLint？

ESLint 是一个可配置的 JavaScript 代码检查工具。它可以帮助你发现并修复 JavaScript 代码中的问题。这些问题可能是潜在的运行时错误、未遵循最佳实践，也可能是代码风格问题。

<a id="rules"></a>

## 规则

规则是 ESLint 的核心构建模块。规则会检查你的代码是否符合特定要求，并规定在不符合要求时应如何处理。规则还可以包含该规则专属的其他配置选项。

例如，[`semi`](../../rules/semi) 规则允许你指定 JavaScript 语句是否必须以分号 (`;`) 结尾。你可以设置为始终要求使用分号，也可以要求语句绝不以分号结尾。

ESLint 内置了数百条规则，供你使用。你也可以创建自定义规则，或使用他人通过[插件](#plugins)创建的规则。

更多信息请参阅[规则](../../rules/)。

<a id="rule-fixes"></a>

### 规则修复

规则可以选择为发现的违规问题提供修复。修复可以安全地纠正违规问题，而不会改变应用程序逻辑。

可以使用 [`--fix` 命令行选项](../command-line-interface#--fix)或编辑器扩展自动应用修复。

可能提供修复的规则会在[规则](../../rules/)中以 🔧 标记。

<a id="rule-suggestions"></a>

### 规则建议

规则可以选择在提供修复之外或代替修复，提供建议。建议与修复有两点不同：

1. 建议可能会改变应用程序逻辑，因此无法自动应用。
1. 建议无法通过 ESLint CLI 应用，只能通过编辑器集成使用。

可能提供建议的规则会在[规则](../../rules/)中以 💡 标记。

<a id="configuration-files"></a>

## 配置文件

ESLint 配置文件用于设置项目中的 ESLint 配置。你可以在其中指定内置规则及其执行方式、包含自定义规则的插件、可共享配置、规则适用的文件等。

更多信息请参阅[配置文件](../configure/configuration-files)。

<a id="shareable-configurations"></a>

## 可共享配置

可共享配置是通过 npm 共享的 ESLint 配置。

可共享配置通常用于使用 ESLint 内置规则强制执行代码风格指南。例如，可共享配置 [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) 实现了广受欢迎的 Airbnb JavaScript 风格指南。

更多信息请参阅[使用可共享配置包](../configure/configuration-files#use-a-shareable-configuration-package)。

<a id="plugins"></a>

## 插件

ESLint 插件是一个 npm 模块，其中可以包含一组 ESLint 规则、配置、处理器和语言。插件通常包含自定义规则。插件可用于强制执行代码风格指南，并支持 JavaScript 扩展（如 [TypeScript](https://www.typescriptlang.org)）、库（如 [React](https://react.dev)）和框架（如 [Angular](https://angular.dev)）。

插件的一种常见用途是强制执行框架的最佳实践。例如，[@angular-eslint/eslint-plugin](https://www.npmjs.com/package/@angular-eslint/eslint-plugin) 包含了使用 Angular 框架的最佳实践。

更多信息请参阅[配置插件](../configure/plugins)。

<a id="parsers"></a>

## 解析器

ESLint 解析器会将代码转换为抽象语法树，以便 ESLint 对其进行评估。默认情况下，ESLint 使用内置的 [Espree](https://github.com/eslint/js/tree/main/packages/espree) 解析器，它与标准 JavaScript 运行时和版本兼容。

自定义解析器可让 ESLint 解析非标准 JavaScript 语法。自定义解析器通常作为可共享配置或插件的一部分提供，因此你无需直接使用它们。

例如，[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 是 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 项目中的自定义解析器，可让 ESLint 解析 TypeScript 代码。

<a id="custom-processors"></a>

## 自定义处理器

ESLint 处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 对这些代码进行代码检查。你也可以使用处理器在解析 JavaScript 代码之前对其进行处理。

例如，[@eslint/markdown](https://github.com/eslint/markdown) 包含一个自定义处理器，可让你对 Markdown 代码块中的 JavaScript 代码进行代码检查。

<a id="formatters"></a>

## 格式化程序

ESLint 格式化程序用于控制 CLI 中代码检查结果的显示方式。

更多信息请参阅[格式化程序](../formatters/)。

<a id="integrations"></a>

## 集成

ESLint 之所以如此实用，一个重要原因是它拥有丰富的集成生态系统。例如，许多代码编辑器都提供 ESLint 扩展，可在你编写代码时在文件中显示 ESLint 的检查结果，这样你就无需使用 ESLint CLI 查看代码检查结果。

更多信息请参阅[集成](../integrations)。

<a id="cli--nodejs-api"></a>

## CLI 和 Node.js API

ESLint CLI 是一个命令行界面，可让你在终端中执行代码检查。CLI 提供了各种选项，你可以将这些选项传递给命令。

ESLint Node.js API 可让你在 Node.js 代码中以编程方式使用 ESLint。开发插件、集成和其他与 ESLint 相关的工具时，API 会很有用。

除非你要以某种方式扩展 ESLint，否则应使用 CLI。

更多信息请参阅[命令行界面](../command-line-interface)和 [Node.js API](../../integrate/nodejs-api)。