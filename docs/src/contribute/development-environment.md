---
title: 设置开发环境
eleventyNavigation:
    key: development environment
    parent: contribute to eslint
    title: 设置开发环境
    order: 7
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}

ESLint 的开发环境非常轻量，因此更新代码既快速又简单。本指南将逐步介绍如何设置本地开发环境，以便你为该项目贡献代码。

<a id="step-1-install-nodejs"></a>

## 步骤 1：安装 Node.js

前往 <https://nodejs.org/>，下载并安装适用于你的操作系统的最新稳定版本。

大多数安装程序都自带 [npm](https://www.npmjs.com/)，但如果 npm 因某些原因无法在你的系统上运行，可以按照网站上的说明手动安装。

<a id="step-2-fork-and-checkout-your-own-eslint-repository"></a>

## 步骤 2：派生并检出你自己的 ESLint 仓库

前往 <https://github.com/eslint/eslint> 并点击“Fork”按钮。按照 [GitHub 文档](https://help.github.com/articles/fork-a-repo)进行派生和克隆。

克隆你的派生仓库：

```shell
git clone https://github.com/<Your GitHub Username>/eslint
```

克隆仓库后，运行 `npm install` 以获取所有必需的依赖项：

```shell
cd eslint
```

{{ npm_tabs({
    command: "install",
    packages: [],
    args: []
}) }}

此步骤需要连接互联网才能完成。你会看到系统正在下载许多实用工具。

**注意：**每次从主仓库拉取更新后，最好重新运行 `npm install`，以确保拥有最新的开发依赖项。

<a id="step-3-add-the-upstream-source"></a>

## 步骤 3：添加上游源

_上游源_是进行活跃开发的 ESLint 主仓库。虽然你没有权限向上游推送更改，但可以从上游拉取代码，因此可以随时获取最新代码。

要为 ESLint 添加上游源，请在你的仓库中运行以下命令：

```shell
git remote add upstream git@github.com:eslint/eslint.git
```

现在，远程仓库 `upstream` 指向上游源。

<a id="step-4-install-the-yeoman-generator"></a>

## 步骤 4：安装 Yeoman 生成器

[Yeoman](https://yeoman.io) 是一种脚手架生成器，ESLint 使用它来简化新规则的开发。如果你尚未安装 Yeoman，可以通过 npm 安装：

{{ npm_tabs({
    command: "install",
    packages: ["yo"],
    args: ["--global"]
}) }}

然后，你可以安装 ESLint 的 Yeoman 生成器：

{{ npm_tabs({
    command: "install",
    packages: ["generator-eslint"],
    args: ["--global"]
}) }}

有关如何使用它的说明，请参阅[生成器文档](https://github.com/eslint/generator-eslint)。

<a id="step-5-run-the-tests"></a>

## 步骤 5：运行测试

运行测试是确保开发环境设置正确的最佳方式。请确保你位于 `eslint` 目录中，然后运行：

```shell
npm test
```

测试需要几分钟才能完成。如果有任何测试失败，很可能是环境设置中的某个环节未能正确完成。上游测试始终可以通过。

<a id="reference-information"></a>

## 参考信息

<a id="directory-structure"></a>

### 目录结构

ESLint 的目录和文件结构如下：

- `bin` - 安装 ESLint 后可用的可执行文件。
- `conf` - 默认配置信息。
- `docs` - 项目文档。
- `lib` - 包含源代码。
    - `formatters` - 定义格式化器的所有源文件。
    - `rules` - 定义规则的所有源文件。
- `tests` - 主要的单元测试目录。
    - `lib` - 源代码的测试。
        - `formatters` - 格式化器的测试。
        - `rules` - 规则的测试。

<a id="workflow"></a>

### 工作流程

设置好开发环境后，你就可以修改并提交 ESLint 源文件。要成功完成此操作，必须严格遵循我们的[拉取请求提交工作流程](./pull-requests)。

<a id="build-scripts"></a>

### 构建脚本

ESLint 提供了多个构建脚本，可帮助完成开发中的各种工作。

#### npm test

主要使用的脚本是 `npm test`，它会执行以下操作：

1. 对所有 JavaScript（包括测试）和 JSON 文件进行代码检查。
1. 在 Node.js 上运行所有测试。
1. 检查代码覆盖率目标。
1. 生成供浏览器使用的 `build/eslint.js`。
1. 在 PhantomJS 中运行部分测试。

完成更改后、提交拉取请求之前，请务必运行此脚本。

**注意：**完整的代码覆盖率报告会输出到 `/coverage`。

#### npm run lint

仅对仓库中的 JavaScript 和 JSON 文件进行代码检查。

#### npm run webpack

生成供浏览器使用的 ESLint 版本 `build/eslint.js`。
