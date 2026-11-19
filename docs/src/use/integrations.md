---
title: 集成
eleventyNavigation:
    key: integrations
    parent: use eslint
    title: 集成
    order: 9
---

本页面列出了集成了 ESLint 的社区项目。这些项目并非由 ESLint 团队维护。

如果你想推荐某个集成项目加入本页面，请[提交拉取请求](../contribute/pull-requests)。

<a id="editors"></a>

## 编辑器

- Sublime Text 3:
    - [SublimeLinter-eslint](https://github.com/SublimeLinter/SublimeLinter-eslint)
    - [Build Next](https://github.com/albertosantini/sublimetext-buildnext)
- Vim:
    - [ALE](https://github.com/dense-analysis/ale)
    - [Syntastic](https://github.com/vim-syntastic/syntastic/tree/master/syntax_checkers/javascript)
- Neovim:
    - [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#eslint)
    - [nvim-lint](https://github.com/mfussenegger/nvim-lint)
- Emacs：[Flycheck](https://www.flycheck.org/en/latest/) 通过 [javascript-eslint](https://www.flycheck.org/en/latest/languages.html#javascript) 检查器支持 ESLint。
- Eclipse Orion：ESLint 是[默认代码检查器](https://dev.eclipse.org/mhonarc/lists/orion-dev/msg02718.html)
- Eclipse IDE：[Tern ESLint 代码检查器](https://github.com/angelozerr/tern.java/wiki/Tern-Linter-ESLint)
- TextMate 2:
    - [eslint.tmbundle](https://github.com/ryanfitzer/eslint.tmbundle)
    - [javascript-eslint.tmbundle](https://github.com/natesilva/javascript-eslint.tmbundle)
- IntelliJ IDEA、WebStorm、PhpStorm、PyCharm、RubyMine 及其他 JetBrains IDE：[如何使用 ESLint](https://www.jetbrains.com/help/webstorm/eslint.html)
- Visual Studio：[在 VS 中检查 JavaScript 代码](https://learn.microsoft.com/en-us/visualstudio/javascript/linting-javascript?view=vs-2022)
- Visual Studio Code：[ESLint 扩展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Brackets：内置支持以及 [Brackets ESLint](https://github.com/brackets-userland/brackets-eslint)

<a id="build-tools"></a>

## 构建工具

- Grunt：[grunt-eslint](https://www.npmjs.com/package/grunt-eslint)
- Webpack：[eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)
- Rollup：[@rollup/plugin-eslint](https://www.npmjs.com/package/@rollup/plugin-eslint)

<a id="command-line-tools"></a>

## 命令行工具

- [ESLint Watch](https://www.npmjs.com/package/eslint-watch)
- [Qlty CLI](https://github.com/qltysh/qlty)
- [ESLint Nibble](https://github.com/IanVS/eslint-nibble)

<a id="source-control"></a>

## 源代码管理

- [Git 预提交钩子](https://coderwall.com/p/zq8jlq/eslint-pre-commit-hook)
- [仅检查暂存更改的 Git 预提交钩子](https://gist.github.com/dahjelle/8ddedf0aebd488208a9a7c829f19b9e8)
- [overcommit Git 钩子管理器](https://github.com/brigade/overcommit)
- [Mega-Linter](https://megalinter.io/latest/)：用于 CI 的代码检查器汇总工具，[其中集成了 eslint](https://megalinter.io/latest/descriptors/javascript_eslint/)

<a id="other-integration-lists"></a>

## 其他集成列表

你可以在 GitHub 仓库 [awesome-eslint](https://github.com/dustinspecker/awesome-eslint) 中找到其他热门 ESLint 集成项目的精选列表。