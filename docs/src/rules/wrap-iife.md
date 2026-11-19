---
title: wrap-iife
rule_type: layout
---
可以立即调用函数表达式，但不能立即调用函数声明。创建立即调用函数表达式（IIFE）的一种常见做法，是用括号包裹函数声明。左括号会使其中的函数被解析为表达式，而不是声明。

```js
// function expression could be unwrapped
var x = function () { return { y: 1 };}();

// function declaration must be wrapped
function () { /* side effects */ }(); // SyntaxError
```

<a id="rule-details"></a>

## 规则详情

此规则要求所有立即调用函数表达式都用括号包裹。

<a id="options"></a>

## 选项

此规则有两个选项：字符串选项和对象选项。

字符串选项：

* `"outside"` 强制始终包裹*调用*表达式。默认值为 `"outside"`。
* `"inside"` 强制始终包裹*函数*表达式。
* `"any"` 强制始终包裹，但允许采用任一种风格。

对象选项：

* `"functionPrototypeMethods": true` 还会强制包裹通过 `.call` 和 `.apply` 调用的函数表达式。默认值为 `false`。

<a id="outside"></a>

### 外侧

默认选项 `"outside"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint wrap-iife: ["error", "outside"]*/

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };})(); // wrapped function expression
```

:::

默认选项 `"outside"` 下的**正确**代码示例：

::: correct

```js
/*eslint wrap-iife: ["error", "outside"]*/

var x = (function () { return { y: 1 };}()); // wrapped call expression
```

:::

<a id="inside"></a>

### 内侧

选项 `"inside"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint wrap-iife: ["error", "inside"]*/

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };}()); // wrapped call expression
```

:::

选项 `"inside"` 下的**正确**代码示例：

::: correct

```js
/*eslint wrap-iife: ["error", "inside"]*/

var x = (function () { return { y: 1 };})(); // wrapped function expression
```

:::

<a id="any"></a>

### 任意

选项 `"any"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint wrap-iife: ["error", "any"]*/

var x = function () { return { y: 1 };}(); // unwrapped
```

:::

选项 `"any"` 下的**正确**代码示例：

::: correct

```js
/*eslint wrap-iife: ["error", "any"]*/

var x = (function () { return { y: 1 };}()); // wrapped call expression
var x = (function () { return { y: 1 };})(); // wrapped function expression
```

:::

<a id="functionprototypemethods"></a>

### 函数原型方法

此规则在选项 `"inside", { "functionPrototypeMethods": true }` 下的**错误**代码示例：

::: incorrect

```js
/* eslint wrap-iife: [2, "inside", { functionPrototypeMethods: true }] */

var x = function(){ foo(); }()
var x = (function(){ foo(); }())
var x = function(){ foo(); }.call(bar)
var x = (function(){ foo(); }.call(bar))
```

:::

此规则在选项 `"inside", { "functionPrototypeMethods": true }` 下的**正确**代码示例：

::: correct

```js
/* eslint wrap-iife: [2, "inside", { functionPrototypeMethods: true }] */

var x = (function(){ foo(); })()
var x = (function(){ foo(); }).call(bar)
```

:::
