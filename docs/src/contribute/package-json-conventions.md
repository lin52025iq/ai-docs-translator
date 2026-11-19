---
title: package.json 约定
eleventyNavigation:
    key: package.json conventions
    parent: contribute to eslint
    title: package.json 约定
    order: 9
---

以下内容适用于 `package.json` 文件中名为 "scripts" 的部分。

<a id="names"></a>

## 名称

npm 脚本名称只能包含小写字母、用于分隔部分的 `:`、用于分隔单词的 `-`，以及用于分隔文件扩展名的 `+`。每个部分的名称应为完整的英文单词（例如 `coverage`，而不是 `cov`），或广为人知且全部使用小写字母的首字母缩写（例如 `wasm`）。

以下是该提案的 ABNF 概要。

```abnf
name         = life-cycle / main target? option* ":watch"?
life-cycle   = "prepare" / "preinstall" / "install" / "postinstall" / "prepublish" / "preprepare" / "prepare" / "postprepare" / "prepack" / "postpack" / "prepublishOnly"
main         = "build" / "lint" ":fix"? / "fmt" ":check"? / "release" / "start" / "test" / "fetch"
target       = ":" word ("-" word)* / extension ("+" extension)*
option       = ":" word ("-" word)*
word         = ALPHA +
extension    = ( ALPHA / DIGIT )+
```

<a id="order"></a>

## 顺序

脚本名称必须按字母顺序出现在 `package.json` 文件中。本文列出的其他约定可确保字母顺序与逻辑分组相符。

<a id="main-script-names"></a>

## 主要脚本名称

除 [npm 生命周期脚本](https://docs.npmjs.com/cli/v8/using-npm/scripts#life-cycle-scripts) 外，所有脚本名称都必须以下列名称之一开头。

<a id="build"></a>

### 构建

从源代码和/或数据生成一组文件的脚本，名称必须以 `build` 开头。

如果某个包包含任何 `build:*` 脚本，可以有一个名为 `build` 的脚本。如果有，该脚本应产生与逐个运行每个 `build` 脚本相同的输出，并且必须只产生这些脚本运行结果的子集。

<a id="fetch"></a>

### 获取

从外部数据或资源生成一组文件的脚本，名称必须以 `fetch` 开头。

如果某个包包含任何 `fetch:*` 脚本，可以有一个名为 `fetch` 的脚本。如果有，该脚本应产生与逐个运行每个 `fetch` 脚本相同的输出，并且必须只产生这些脚本运行结果的子集。

<a id="release"></a>

### 发布

具有公开副作用的脚本（例如发布网站、提交到 Git 等）必须以 `release` 开头。

<a id="lint"></a>

### 代码检查

对文件进行静态分析的脚本（主要是运行 `eslint` 本身，但不限于此），名称必须以 `lint` 开头。

如果某个包包含任何 `lint:*` 脚本，就应有一个名为 `lint` 的脚本，并且该脚本必须运行逐个调用每个 `lint:*` 脚本时会执行的所有检查。

如果可以修复问题，代码检查工具不得自动应用修复，除非脚本包含 `:fix` 修饰符（见下文）。

<a id="fmt"></a>

### 格式化

用于格式化源代码的脚本，名称必须以 `fmt` 开头。

如果某个包包含任何 `fmt:*` 脚本，就应有一个名为 `fmt` 的脚本，用于修复所有源文件的格式。此外，还应有一个名为 `fmt:check` 的脚本，用于验证代码格式而不修改文件；如果有任何文件不符合要求，该脚本应以非零状态退出。

<a id="start"></a>

### 启动

`start` 脚本用于启动服务器。截至本文撰写时，没有任何 ESLint 包拥有多个 `start` 脚本，因此无需为 `start` 添加修饰符。

<a id="test"></a>

### 测试

为确保实际行为符合预期而执行代码的脚本，名称必须以 `test` 开头。

如果某个包包含任何 `test:*` 脚本，就应有一个名为 `test` 的脚本，并且该脚本必须运行逐个调用每个 `test:*` 脚本时会执行的所有测试。

测试脚本不应包含代码检查。

在可行时，测试脚本应报告测试覆盖率。

<a id="modifiers"></a>

## 修饰符

可以在上述标准脚本名称后附加一个或多个以下修饰符。如果目标带有修饰符，则修饰符的顺序必须与下文所列顺序一致（例如，使用 `lint:fix:js:watch`，而不是 `lint:watch:js:fix`）。

<a id="fix"></a>

### 修复

如果代码检查工具能够修复发现的问题，则添加一个副本脚本，并在脚本名称末尾附加 `:fix`，使其同时执行修复。

<a id="check"></a>

### 检查

如果脚本在不做任何修改的情况下验证代码或构件，则在脚本名称后附加 `:check`。此修饰符通常用于格式化工具（例如 `fmt:check`），以验证文件是否符合预期格式；如果发现任何问题，则以非零状态退出。带有 `:check` 修饰符的脚本不得更改任何文件或输出。

<a id="target"></a>

### 目标

所执行操作的目标名称。对于 `build` 脚本，应标明构建产物（例如“javascript”“css”或“website”）。对于 `lint` 或 `test` 脚本，应标明代码检查或测试的对象。对于 `start` 脚本，应标明要启动的服务器。

目标可以使用 `+` 分隔受影响文件扩展名的列表（例如 `cjs` 或 `less`）。如果扩展名不止一个，列表应按字母顺序排列。当文件扩展名存在变体时（例如 CommonJS 的 `cjs` 和 ESM 的 `mjs`），可以使用共同的扩展名部分，而不必逐一列出所有变体（例如使用 `js`，而不是 `cjs+jsx+mjs`）。

目标不应包含执行操作的工具名称（`eleventy`、`webpack` 等）。

<a id="options"></a>

### 选项

不属于其他修饰符的附加选项。

<a id="watch"></a>

### 监视

如果脚本会监视文件系统并响应变化，则在脚本名称后添加 `:watch`。
