---
title: newline-after-var
rule_type: layout
---

目前，变量声明与其余代码之间的分隔方式并不统一。一些开发者会在 var 语句与其余代码之间留一个空行，例如：

```js
var foo;

// do something with foo
```

而另一些开发者则完全不留空行。

```js
var foo;
// do something with foo
```

问题在于，这些开发者可能会在同一个项目中协作。本规则规定 `var`、`let` 或 `const` 语句后是否允许留空行，帮助整个项目的代码风格保持一致。

<a id="rule-details"></a>

## 规则详情

本规则规定 `var`、`let` 或 `const` 语句后是否必须留空行，以确保整个项目的代码风格保持一致。

<a id="options"></a>

## 选项

本规则接受一个字符串选项：

* `"always"`（默认值）要求在 `var`、`let` 或 `const` 语句后留一个空行

  紧跟在 var 语句后面一行的注释会被视为额外的 var 语句。

* `"never"` 禁止在 `var`、`let` 或 `const` 语句后留空行

<a id="always"></a>

### 始终

以下代码在默认的 `"always"` 选项下会被本规则判定为**不正确**：

::: incorrect

```js
/*eslint newline-after-var: ["error", "always"]*/

var greet = "hello,",
    name = "world";
console.log(greet, name);

let hello = "hello,",
    world = "world";
console.log(hello, world);

var greet = "hello,";
const NAME = "world";
console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");
console.log(greet, name);
```

:::

以下代码在默认的 `"always"` 选项下会被本规则判定为**正确**：

::: correct

```js
/*eslint newline-after-var: ["error", "always"]*/

var greet = "hello,",
    name = "world";

console.log(greet, name);

let hello = "hello,",
    world = "world";

console.log(hello, world);

var greet = "hello,";
const NAME = "world";

console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");

console.log(greet, name);
```

:::

<a id="never"></a>

### 从不

以下代码在 `"never"` 选项下会被本规则判定为**不正确**：

::: incorrect

```js
/*eslint newline-after-var: ["error", "never"]*/

var greet = "hello,",
    name = "world";

console.log(greet, name);

let hello = "hello,",
    world = "world";

console.log(hello, world);

var greet = "hello,";
const NAME = "world";

console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");

console.log(greet, name);
```

:::

以下代码在 `"never"` 选项下会被本规则判定为**正确**：

::: correct

```js
/*eslint newline-after-var: ["error", "never"]*/

var greet = "hello,",
    name = "world";
console.log(greet, name);

let hello = "hello,",
    world = "world";
console.log(hello, world);

var greet = "hello,";
const NAME = "world";
console.log(greet, NAME);

var greet = "hello,";
var name = "world";
// var name = require("world");
console.log(greet, name);
```

:::