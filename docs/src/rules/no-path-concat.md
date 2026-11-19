---
title: no-path-concat
rule_type: suggestion
---

在 Node.js 中，全局变量 `__dirname` 和 `__filename` 分别包含当前正在执行的脚本文件的目录路径和文件路径。有时，开发者会尝试使用这些变量来创建指向其他文件的路径，例如：

```js
var fullPath = __dirname + "/foo.js";
```

不过，这样做有几个问题。首先，你无法确定脚本运行在哪种系统上。Node.js 可以在任何计算机上运行，包括使用不同路径分隔符的 Windows。因此，使用字符串拼接并假设路径分隔符采用 Unix 风格，很容易创建无效路径。此外，还可能出现重复的分隔符，或以其他方式得到无效路径。

为避免在如何创建正确路径方面产生混淆，Node.js 提供了 `path` 模块。该模块会利用特定于系统的信息，始终返回正确的值。因此，可以将前面的示例改写为：

```js
var fullPath = path.join(__dirname, "foo.js");
```

此示例无需包含分隔符，因为 `path.join()` 会以最合适的方式处理。或者，你可以使用 `path.resolve()` 获取绝对路径：

```js
var fullPath = path.resolve(__dirname, "foo.js");
```

在创建文件或目录路径时，无论何处使用字符串拼接，`path.join()` 和 `path.resolve()` 都是合适的替代方案。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止在 Node.js 中使用字符串拼接目录路径。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-path-concat: "error"*/

var fullPath = __dirname + "/foo.js";

var fullPath = __filename + "/foo.js";

```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-path-concat: "error"*/

var fullPath = dirname + "/foo.js";
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你希望允许使用字符串拼接路径名。
