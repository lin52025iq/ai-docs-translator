---
title: eol-last
rule_type: layout
---
非空文件末尾带有换行符是常见的 UNIX 惯例。末尾换行符的好处包括可以串联或追加文件，以及将文件输出到终端时不会干扰 shell 提示符。

<a id="rule-details"></a>

## 规则详情

此规则要求非空文件末尾至少有一个换行符（或不带换行符）。

在 v0.16.0 之前，此规则还要求文件末尾只有一行。如果仍需要此行为，可以启用带有 `maxEOF` 的 [no-multiple-empty-lines](no-multiple-empty-lines) 和/或 [no-trailing-spaces](no-trailing-spaces)。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint eol-last: ["error", "always"]*/

function doSomething() {
  var foo = 2;
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint eol-last: ["error", "always"]*/

function doSomething() {
  var foo = 2;
}

```

:::

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"always"`（默认值）要求文件以换行符（LF）结尾
* `"never"` 要求文件末尾不带换行符
* `"unix"`（已弃用）与 `"always"` 相同
* `"windows"`（已弃用）与 `"always"` 相同，但自动修复时会使用 CRLF 字符

**已弃用：**选项 `"unix"` 和 `"windows"` 已弃用。如果需要强制使用特定的换行符样式，请将此规则与 `linebreak-style` 配合使用。
