---
title: no-mixed-requires
rule_type: suggestion
---

在 Node.js 社区中，通常会将通过调用 `require` 初始化模块的语句与其他变量声明分开，有时还会按模块类型分组。此规则可帮助你强制执行这一约定。

<a id="rule-details"></a>

## 规则详情

启用此规则后，每条 `var` 语句都必须满足以下条件：

* 变量声明可以全都不是 require 声明，也可以全都是 require 声明（默认）
* 所有 require 声明必须属于同一类型（分组）

此规则将变量声明分为六种类型：

* `core`：所需[核心模块][1]的声明
* `file`：所需[文件模块][2]的声明
* `module`：所需的 [node_modules 文件夹][3]中模块的声明
* `computed`：无法确定类型的所需模块的声明（可能是因为模块名是计算得出的，也可能是因为调用 require 时没有传入参数）
* `uninitialized`：未初始化的声明
* `other`：其他任何类型的声明

本文将前四种类型统称为 *require 声明*。

```js
var fs = require('fs'),        // "core"     \
    async = require('async'),  // "module"   |- these are "require declaration"s
    foo = require('./foo'),    // "file"     |
    bar = require(getName()),  // "computed" /
    baz = 42,                  // "other"
    bam;                       // "uninitialized"
```

<a id="options"></a>

## 选项

此规则可接受一个对象字面量选项，其中两个属性的默认值均为 `false`。

使用一个布尔选项 `true` 配置此规则的方式已弃用。

以下示例展示了在默认选项 `{ "grouping": false, "allowCall": false }` 下违反此规则的代码：

::: incorrect

```js
/*eslint no-mixed-requires: "error"*/

var fs = require('fs'),
    i = 0;

var async = require('async'),
    debug = require('diagnostics').someFunction('my-module'),
    eslint = require('eslint');
```

:::

以下示例展示了在默认选项 `{ "grouping": false, "allowCall": false }` 下符合此规则的代码：

::: correct

```js
/*eslint no-mixed-requires: "error"*/

// only require declarations (grouping off)
var eventEmitter = require('events').EventEmitter,
    myUtils = require('./utils'),
    util = require('util'),
    bar = require(getBarModuleName());

// only non-require declarations
var foo = 42,
    bar = 'baz';

// always valid regardless of grouping because all declarations are of the same type
var foo = require('foo' + VERSION),
    bar = require(getBarModuleName()),
    baz = require();
```

:::

<a id="grouping"></a>

### 分组

以下示例展示了使用 `{ "grouping": true }` 选项时违反此规则的代码：

::: incorrect

```js
/*eslint no-mixed-requires: ["error", { "grouping": true }]*/

// invalid because of mixed types "core" and "module"
var fs = require('fs'),
    async = require('async');

// invalid because of mixed types "file" and "unknown"
var foo = require('foo'),
    bar = require(getBarModuleName());
```

:::

<a id="allowcall"></a>

### 允许调用

以下示例展示了使用 `{ "allowCall": true }` 选项时违反此规则的代码：

::: incorrect

```js
/*eslint no-mixed-requires: ["error", { "allowCall": true }]*/

var async = require('async'),
    debug = require('diagnostics').someFunction('my-module'), /* allowCall doesn't allow calling any function */
    eslint = require('eslint');
```

:::

以下示例展示了使用 `{ "allowCall": true }` 选项时符合此规则的代码：

::: correct

```js
/*eslint no-mixed-requires: ["error", { "allowCall": true }]*/

var async = require('async'),
    debug = require('diagnostics')('my-module'),
    eslint = require('eslint');
```

:::

<a id="known-limitations"></a>

## 已知限制

* 此实现无法识别名称为 `require`、可能会遮蔽 Node.js 全局 `require` 的本地函数。

* 在内部，核心模块列表通过 `require("repl")._builtinLibs` 获取。如果 ESLint 和你的应用使用不同版本的 Node.js，那么各版本的核心模块列表可能不同。
  上述 `_builtinLibs` 属性从 0.8 版本起可用；对于更早的版本，会使用硬编码的模块名称列表作为回退。如果你的 Node.js 版本早于 0.6，该列表可能不准确。

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你使用 [UMD][4] 之类的模式，其中由 `require` 加载的模块并未在变量声明中加载，那么此规则显然不会起作用。

[1]: https://nodejs.org/api/modules.html#modules_core_modules
[2]: https://nodejs.org/api/modules.html#modules_file_modules
[3]: https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders
[4]: https://github.com/umdjs/umd