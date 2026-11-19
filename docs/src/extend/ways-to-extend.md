---
title: 扩展 ESLint 的方式
eleventyNavigation:
    key: ways to extend
    parent: extend eslint
    title: 扩展 ESLint 的方式
    order: 1
---

ESLint 具有很强的可插拔性和可配置性。你可以通过多种方式扩展 ESLint 的功能。

本页介绍扩展 ESLint 的各种方式，以及这些扩展如何协同工作。

<a id="plugins"></a>

## 插件

插件可让你为项目添加自定义 ESLint 规则和自定义处理器。你可以将插件作为 npm 模块发布。

插件很有用，因为你的项目可能需要一些核心 `eslint` 包中未包含的 ESLint 配置。例如，如果你使用 [React](https://react.dev/) 这样的前端 JavaScript 库或 [Vue](https://vuejs.org/) 这样的框架，这些工具的某些功能需要使用 ESLint 核心规则范围之外的自定义规则。

插件通常会配有一份 ESLint 配置，用于将插件中的一组功能应用到项目中。你也可以在插件中包含配置。

例如，[`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) 是一个 ESLint 插件，其中包含专为 React 项目设计的规则。这些规则包括强制一致地使用 React 组件生命周期方法，以及要求在渲染动态列表时使用 key 属性。

要详细了解如何创建可包含在插件中的扩展，请参阅以下文档：

- [自定义规则](custom-rules)
- [自定义处理器](custom-processors)
- [插件中的配置](plugins#configs-in-plugins)

要详细了解如何将这些扩展打包到插件中，请参阅[插件](plugins)。

<a id="shareable-configs"></a>

## 可共享配置

ESLint 可共享配置是预先定义的 ESLint 配置，可用于你的项目。它们会将规则和其他配置打包到一个 npm 包中。配置文件中可以包含的任何内容，都可以放入可共享配置中。

你可以独立发布可共享配置，也可以将它作为插件的一部分发布。

例如，广受欢迎的可共享配置 [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb) 除了包含各种规则，还包含一些[解析器选项](../use/configure/language-options#specify-parser-options)。这组 ESLint 规则旨在与 [Airbnb JavaScript 风格指南](https://github.com/airbnb/javascript)保持一致。使用 `eslint-config-airbnb` 可共享配置，可以在项目中自动强制执行 Airbnb 风格指南，而无需手动配置每条规则。

要详细了解如何创建可共享配置，请参阅[共享配置](shareable-configs)。

<a id="custom-formatters"></a>

## 自定义格式化器

自定义格式化器会获取 ESLint 代码检查结果，并以你定义的格式输出。无论你需要特定文件格式、某种显示样式，还是针对特定工具优化的格式，自定义格式化器都能以最符合需求的方式显示代码检查结果。只有在[内置格式化器](../use/formatters/)无法满足你的使用场景时，才需要创建自定义格式化器。

例如，自定义格式化器 [eslint-formatter-gitlab](https://www.npmjs.com/package/eslint-formatter-gitlab) 可用于在 [GitLab](https://about.gitlab.com/) 代码质量报告中显示 ESLint 结果。

要详细了解如何创建自定义格式化器，请参阅[自定义格式化器](custom-formatters)。

<a id="custom-parsers"></a>

## 自定义解析器

ESLint 自定义解析器可扩展 ESLint，使其支持对代码中的新语言特性或自定义语法进行代码检查。解析器负责将代码转换为抽象语法树（AST），以便 ESLint 对其进行分析和代码检查。

ESLint 内置了 JavaScript 解析器（Espree），但自定义解析器可以让你检查其他语言的代码，也可以扩展内置解析器的代码检查能力。

例如，自定义解析器 [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser) 扩展了 ESLint，使其能够检查 TypeScript 代码。

自定义解析器也可以包含在插件中。

要详细了解如何创建自定义解析器，请参阅[自定义解析器](custom-parsers)。