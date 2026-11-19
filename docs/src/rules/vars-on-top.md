---
title: vars-on-top
rule_type: suggestion
further_reading:
- https://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting
- https://danhough.com/blog/single-var-pattern-rant/
- https://benalman.com/news/2012/05/multiple-var-statements-javascript/
---


`vars-on-top` 规则会在变量声明未连续出现在函数作用域顶部或程序顶部时发出警告。
默认情况下，JavaScript 解释器总会将变量声明隐式地“提升”到其所在作用域的顶部。
此规则要求程序员手动将变量声明移至其所在作用域的顶部，以体现这种行为。

<a id="rule-details"></a>

## 规则详情

此规则旨在使所有变量声明都位于开头的一系列语句中。
允许多个声明有助于提高可维护性，因此此规则允许这样做。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint vars-on-top: "error"*/

// Variable declaration in a nested block, and a variable declaration after other statements:
function doSomething() {
    if (true) {
        var first = true;
    }
    var second;
}

// Variable declaration in for initializer:
function doSomethingElse() {
    for (var i=0; i<10; i++) {}
}
```

:::

::: incorrect

```js
/*eslint vars-on-top: "error"*/

// Variable declaration after other statements:
f();
var a;
```

:::

::: incorrect

```js
/*eslint vars-on-top: "error"*/

// Variables in class static blocks should be at the top of the static blocks.

class C {

    // Variable declaration in a nested block:
    static {
        if (something) {
            var a = true;
        }
    }

    // Variable declaration after other statements:
    static {
        f();
        var a;
    }

}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint vars-on-top: "error"*/

function doSomething() {
    var first;
    var second; //multiple declarations are allowed at the top
    if (true) {
        first = true;
    }
}

function doSomethingElse() {
    var i;
    for (i=0; i<10; i++) {}
}
```

:::

::: correct

```js
/*eslint vars-on-top: "error"*/

var a;
f();
```

:::

::: correct

```js
/*eslint vars-on-top: "error"*/

class C {

    static {
        var a;
        if (something) {
            a = true;
        }
    }

    static {
        var a;
        f();
    }

}
```

:::

::: correct

```js
/*eslint vars-on-top: "error"*/

// Directives may precede variable declarations.
"use strict";
var a;
f();

// Comments can describe variables.
function doSomething() {
    // this is the first var.
    var first;
    // this is the second var.
    var second;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
