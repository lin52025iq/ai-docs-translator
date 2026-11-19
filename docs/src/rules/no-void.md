---
title: no-void
rule_type: suggestion
related_rules:
- no-undef-init
- no-undefined
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
- https://oreilly.com/javascript/excerpts/javascript-good-parts/bad-parts.html
---


`void` 运算符接受一个操作数并返回 `undefined`：`void expression` 会对 `expression` 求值并返回 `undefined`。它可用于忽略 `expression` 可能产生的任何副作用：

使用 `void` 运算符的常见情况是获取一个“纯粹的” `undefined` 值，因为在 ES5 之前，`undefined` 变量是可变的：

```js
// will always return undefined
(function(){
    return void 0;
})();

// will return 1 in ES3 and undefined in ES5+
(function(){
    undefined = 1;
    return undefined;
})();

// will throw TypeError in ES5+
(function(){
    'use strict';
    undefined = 1;
})();
```

另一个常见用途是压缩代码，因为 `void 0` 比 `undefined` 短：

```js
foo = void 0;
foo = undefined;
```

与 IIFE（立即调用函数表达式）一起使用时，`void` 可用于强制将 function 关键字视为表达式而非声明：

```js
let foo = 1;
void function(){ foo = 1; }() // will assign foo a value of 1
+function(){ foo = 1; }() // same as above
```

```js
function(){ foo = 1; }() // will throw SyntaxError
```

某些代码风格禁止使用 `void` 运算符，认为它不直观且难以阅读。

<a id="rule-details"></a>

## 规则详情

此规则旨在禁止使用 `void` 运算符。

此规则下的错误代码示例：

::: incorrect

```js
/*eslint no-void: "error"*/

void foo
void someFunction();

const foo = void bar();
function baz() {
    return void 0;
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `allowAsStatement` 设置为 `true` 时，允许将 `void` 运算符用作语句（默认值为 `false`）。

<a id="allowasstatement"></a>

### allowAsStatement

当 `allowAsStatement` 设置为 true 时，对于将 `void` 运算符用作语句的情况，此规则不会报错；也就是说，当它未用于表达式位置时（例如变量赋值或函数返回中），不会报错。

`{ "allowAsStatement": true }` 的错误代码示例：

::: incorrect

```js
/*eslint no-void: ["error", { "allowAsStatement": true }]*/

const foo = void bar();
function baz() {
    return void 0;
}
```

:::

`{ "allowAsStatement": true }` 的正确代码示例：

::: correct

```js
/*eslint no-void: ["error", { "allowAsStatement": true }]*/

void foo;
void someFunction();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你有意使用 `void` 运算符，可以禁用此规则。
