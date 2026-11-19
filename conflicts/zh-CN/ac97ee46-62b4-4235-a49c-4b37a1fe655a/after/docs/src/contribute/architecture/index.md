---
title: 架构
eleventyNavigation:
    key: architecture
    parent: contribute to eslint
    title: 架构
    order: 6
---

:::img-container
<img alt="dependency graph" src="../../assets/images/architecture/dependency.svg">
:::

从整体上看，ESLint 由几个关键部分组成：

- `bin/eslint.js` - 这是命令行工具实际执行的文件。它只是一个简单的包装器，只负责启动 ESLint 并将命令行参数传递给 `cli`，除此之外不做任何事情。它被特意设计得很小，以免需要进行繁重的测试。
- `lib/api.js` - 这是 `require("eslint")` 的入口点。此文件会公开一个包含公共类 `Linter`、`ESLint`、`RuleTester` 和 `SourceCode` 的对象。
- `lib/cli.js` - 这是 ESLint CLI 的核心。它接收一个参数数组，然后使用 `ESLint` 类执行命令。主要调用是 `cli.execute()`。输入和输出也都由这一部分处理。
- `lib/eslint/` - 此模块包含 `ESLint` 类，它会查找源代码文件和配置文件，然后使用 `Linter` 类检查代码。这里还包括配置文件、语言、插件和格式化器的加载逻辑。
- `lib/languages/js/` - 默认 JavaScript 语言的实现，其中包括用于表示已解析源代码的 `SourceCode` 类。`SourceCode` 类接收源代码以及表示该代码的 AST 中的 `Program` 节点。
- `lib/linter/` - 此模块包含核心 `Linter` 类，它根据配置选项验证代码。此文件不进行文件 I/O，也完全不与 `console` 交互。需要验证源文本的 Node.js 程序应直接使用此接口。
- `lib/rule-tester/` - 此模块包含 `RuleTester` 类，它是 Mocha 风格测试 API 的包装器，可用于对规则进行单元测试。此类让我们能够为每条已实现的规则编写格式一致的测试，并确信每条规则都能正常工作。`RuleTester` 接口以 Mocha 为模型，使用 Mocha 的全局函数 `describe` 和 `it`，但也可以调整为适用于其他测试框架。
- `lib/rules/` - 此目录包含用于验证源代码的内置规则。

<a id="the-cli-object"></a>

## `cli` 对象

`cli` 对象是命令行界面的内部 API。具体来说，`bin/eslint.js` 文件只会将参数传递给 `cli` 对象，然后将返回的退出码赋给 `process.exitCode`。

其主要方法是 `cli.execute()`，它接收一个字符串数组，表示命令行选项（相当于传入去掉前两个参数后的 `process.argv`）。

此对象负责：

- 解析命令行参数。
- 从文件系统读取内容。
- 向控制台输出内容。
- 向文件系统输出内容。
- 使用格式化器。
- 返回正确的退出码。

此对象不得直接调用 `process.exit()`。

<a id="the-eslint-class"></a>

## `ESLint` 类

`ESLint` 类代表 CLI 的核心功能，但它不会读取命令行内容，也不会默认输出任何内容。它接收传递给 CLI 的许多（但不是全部）参数。它会读取配置文件和源文件，并管理传递给 `Linter` 对象的运行环境。

`ESLint` 实例的主要方法是 `lintFiles()`，它接收一个由文件路径、目录路径和 glob 模式组成的数组，并对这些路径和模式运行代码检查。

此对象负责：

- 管理 `Linter` 的运行环境。
- 从文件系统读取内容。
- 从配置文件（通常是 `eslint.config.js`）读取配置信息。
- 加载格式化器。

此对象不得：

- 直接调用 `process.exit()`。
- 向控制台输出内容。
- 使用已加载的格式化器。

<a id="the-linter-object"></a>

## `Linter` 对象

`Linter` 对象的主要方法是 `verify()`，它接收三个参数：要验证的源文本、配置对象和其他选项。此方法首先使用 `espree`（或配置语言所用的其他解析器）解析给定文本，并获取 AST。生成的 AST 同时包含行/列位置和范围位置，前者可用于报告问题所在位置，后者可用于获取与 AST 节点相关的源文本。

AST 会从上到下遍历：对于每个节点，`Linter` 对象都会发出一个与节点类型同名的事件（即 `"Identifier"`、`"WithStatement"` 等）。向上回溯子树时，会发出一个事件，其名称为 AST 类型名并附加 `":exit"`，例如 `"Identifier:exit"`。这使规则可以在遍历向下和向上时都采取操作。每个事件都会提供相应的 AST 节点。此外，ESLint 在处理 JavaScript 源代码时，代码路径分析还会发出带有特定参数的某些事件。

此对象负责：

- 检查提供的源文本。
- 为代码创建 AST。
- 在 AST 上执行规则。
- 返回执行结果。

此对象不得：

- 直接调用 `process.exit()`。
- 执行任何异步操作。
- 使用 Node.js 特有功能。
- 访问文件系统。
- 调用 `console.log()` 或任何类似方法。

<a id="rules"></a>

## 规则

单条规则是 ESLint 架构中最专门化的部分。规则能做的事情很有限，只是一组针对给定 AST 执行的指令。规则也会接收一些上下文信息，但其主要职责是检查 AST 并报告警告。

这些对象负责：

- 检查 AST 中是否存在特定模式。
- 在发现某些模式时报告警告。

这些对象不得：

- 直接调用 `process.exit()`。
- 执行任何异步操作。
- 使用 Node.js 特有功能。
- 访问文件系统。
- 调用 `console.log()` 或任何类似方法。
