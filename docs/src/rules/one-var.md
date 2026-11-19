---
title: one-var
rule_type: suggestion
---

在 JavaScript 代码的任意位置，都可以使用 `var`、`let`、`const`、`using` 或 `await using` 声明变量。变量声明有许多不同的风格和偏好，其中一种选择是确定单个函数中允许有多少条变量声明。

对此有两种观点：

1. 函数中的所有变量只使用一条变量声明。这条声明通常放在函数顶部。
1. 每个要定义的变量都使用一条变量声明。

例如：

```js
// one variable declaration per function
function foo() {
    var bar, baz;
}

// multiple variable declarations per function
function foo() {
    var bar;
    var baz;
}
```

只使用一条声明的观点源于 ECMAScript 6 之前的行为，当时没有块级作用域，只有函数作用域。由于所有 `var` 语句无论如何都会提升到函数顶部，因此有人认为，在函数顶部使用一条声明来声明所有变量，可以避免作用域规则带来的困惑。

<a id="rule-details"></a>

## 规则详情

此规则要求在函数作用域（对于 `var`）或块级作用域（对于 `let`、`const`、`using` 和 `await using`）中，将变量一起声明或分别声明。

<a id="options"></a>

## 选项

此规则有一个选项，可以是字符串选项或对象选项。

字符串选项：

* `"always"`（默认值）要求每个作用域只有一条变量声明
* `"never"` 要求每个作用域有多条变量声明
* `"consecutive"` 允许每个作用域有多条变量声明，但要求将连续的变量声明合并为一条声明

对象选项：

* `"var": "always"` 要求每个函数只有一条 `var` 声明
* `"var": "never"` 要求每个函数有多条 `var` 声明
* `"var": "consecutive"` 要求将连续的 `var` 声明合并为一条声明
* `"let": "always"` 要求每个块只有一条 `let` 声明
* `"let": "never"` 要求每个块有多条 `let` 声明
* `"let": "consecutive"` 要求将连续的 `let` 声明合并为一条声明
* `"const": "always"` 要求每个块只有一条 `const` 声明
* `"const": "never"` 要求每个块有多条 `const` 声明
* `"const": "consecutive"` 要求将连续的 `const` 声明合并为一条声明
* `"using": "always"` 要求每个块只有一条 `using` 声明
* `"using": "never"` 要求每个块有多条 `using` 声明
* `"using": "consecutive"` 要求将连续的 `using` 声明合并为一条声明
* `"awaitUsing": "always"` 要求每个块只有一条 `await using` 声明
* `"awaitUsing": "never"` 要求每个块有多条 `await using` 声明
* `"awaitUsing": "consecutive"` 要求将连续的 `await using` 声明合并为一条声明
* `"separateRequires": true` 强制要求将 `requires` 与声明分开

另一种对象选项：

* `"initialized": "always"` 要求每个作用域中已初始化的变量只使用一条变量声明
* `"initialized": "never"` 要求每个作用域中已初始化的变量使用多条变量声明
* `"initialized": "consecutive"` 要求将连续的已初始化变量声明合并为一条声明
* `"uninitialized": "always"` 要求每个作用域中未初始化的变量只使用一条变量声明
* `"uninitialized": "never"` 要求每个作用域中未初始化的变量使用多条变量声明
* `"uninitialized": "consecutive"` 要求将连续的未初始化变量声明合并为一条声明

<a id="always"></a>

### 始终

使用默认选项 `"always"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", "always"]*/

function foo1() {
    var bar;
    var baz;
    let qux;
    let norf;
}

function foo2(){
    const bar = false;
    const baz = true;
    let qux;
    let norf;
}

function foo3() {
    var bar;

    if (baz) {
        var qux = true;
    }
}

class C {
    static {
        var foo;
        var bar;
    }

    static {
        var foo;
        if (bar) {
            var baz = true;
        }
    }

    static {
        let foo;
        let bar;
    }
}
```

:::

使用默认选项 `"always"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", "always"]*/

function foo1() {
    var bar,
        baz;
    let qux,
        norf;
}

function foo2(){
    const bar = true,
        baz = false;
    let qux,
        norf;
}

function foo3() {
    var bar,
        qux;

    if (baz) {
        qux = true;
    }
}

function foo4(){
    let bar;

    if (baz) {
        let qux;
    }
}

class C {
    static {
        var foo, bar;
    }

    static {
        var foo, baz;
        if (bar) {
            baz = true;
        }
    }

    static {
        let foo, bar;
    }

    static {
        let foo;
        if (bar) {
            let baz;
        }
    }
}
```

:::

<a id="never"></a>

### 从不

使用选项 `"never"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", "never"]*/

function foo1() {
    var bar,
        baz;
    const qux = true,
        foobar = false;
}

function foo2() {
    var bar,
        qux;

    if (baz) {
        qux = true;
    }
}

function foo3(){
    let bar = true,
        baz = false;
}

class C {
    static {
        var foo, bar;
        let baz, qux;
    }
}
```

:::

使用选项 `"never"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", "never"]*/

function foo1() {
    var bar;
    var baz;
}

function foo2() {
    var bar;

    if (baz) {
        var qux = true;
    }
}

function foo3() {
    let bar;

    if (baz) {
        let qux = true;
    }
}

class C {
    static {
        var foo;
        var bar;
        let baz;
        let qux;
    }
}

// declarations with multiple variables are allowed in for-loop initializers
for (var i = 0, len = arr.length; i < len; i++) {
    doSomething(arr[i]);
}
```

:::

<a id="consecutive"></a>

### 连续

使用选项 `"consecutive"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", "consecutive"]*/

function foo1() {
    var bar;
    var baz;
}

function foo2(){
    var bar = 1;
    var baz = 2;

    qux();

    var qux = 3;
    var quux;
}

class C {
    static {
        var foo;
        var bar;
        let baz;
        let qux;
    }
}
```

:::

使用选项 `"consecutive"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", "consecutive"]*/

function foo1() {
    var bar,
        baz;
}

function foo2(){
    var bar = 1,
        baz = 2;

    qux();

    var qux = 3,
        quux;
}

class C {
    static {
        var foo, bar;
        let baz, qux;
        doSomething();
        let quux;
        var quuux;
    }
}
```

:::

<a id="var-let-const-using-and-awaitusing"></a>

### var、let、const、using 和 awaitUsing

使用选项 `{ var: "always", let: "never", const: "never", using: "never", awaitUsing: "never" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "always", let: "never", const: "never", using: "never", awaitUsing: "never" }]*/

function foo1() {
    var bar;
    var baz;
    let qux,
        norf;
}

function foo2() {
    const bar = 1,
          baz = 2;
    let qux,
        norf;
}

async function foo3() {
    using bar = 1,
          baz = 2;
    await using qux = 3,
                norf = 4;
}
```

:::

使用选项 `{ var: "always", let: "never", const: "never", using: "never", awaitUsing: "never" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { var: "always", let: "never", const: "never", using: "never", awaitUsing: "never" }]*/

function foo1() {
    var bar,
        baz;
    let qux;
    let norf;
}

function foo2() {
    const bar = 1;
    const baz = 2;
    let qux;
    let norf;
}

async function foo3() {
    using bar = 1;
    using baz = 2;
    await using qux = 3;
    await using norf = 4;
}
```

:::

使用选项 `{ var: "never" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "never" }]*/

function foo() {
    var bar,
        baz;
}
```

:::

使用选项 `{ var: "never" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { var: "never" }]*/

async function foo() {
    var bar;
    var baz;

    // `const`, `let`, `using` and `await using` declarations are ignored if they are not specified
    const foobar = 1;
    const foobaz = 2;
    const barfoo = 1, bazfoo = 2;
    let qux;
    let norf;
    let fooqux, foonorf;
    using foobarfoo = 1;
    using foobazfoo = 2;
    using bazbarfoo = 1, bazfoobar = 2;
    await using foobarbaz = 1;
    await using foobazqux = 2;
    await using bazbarqux = 1, bazfooqux = 2;
}
```

:::

`separateRequires` 选项适用于初始化表达式为 `require()` 调用的任何变量。它不会检查 `require` 指向的是 CommonJS 全局变量，还是具有相同名称的局部绑定（例如函数参数）。

使用选项 `{ separateRequires: true }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/

var foo = require("foo"),
    bar = "bar";
```

:::

使用选项 `{ separateRequires: true }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/

var foo = require("foo");
var bar = "bar";
```

:::

::: correct

```js
/*eslint one-var: ["error", { separateRequires: true, var: "always" }]*/

var foo = require("foo"),
    bar = require("bar");
```

:::

使用选项 `{ var: "never", let: "consecutive", const: "consecutive", using: "consecutive", awaitUsing: "consecutive" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive", using: "consecutive", awaitUsing: "consecutive" }]*/

function foo1() {
    let a,
        b;
    let c;

    var d,
        e;
}

function foo2() {
    const a = 1,
        b = 2;
    const c = 3;

    var d,
        e;
}

function foo3() {
    using a = 1,
        b = 2;
    using c = 3;

    var d,
        e;
}

async function foo4() {
    await using a = 1,
        b = 2;
    await using c = 3;

    var d,
        e;
}
```

:::

使用选项 `{ var: "never", let: "consecutive", const: "consecutive", using: "consecutive", awaitUsing: "consecutive" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { var: "never", let: "consecutive", const: "consecutive", using: "consecutive", awaitUsing: "consecutive" }]*/

function foo1() {
    let a,
        b;

    var d;
    var e;

    let f;
}

function foo2() {
    const a = 1,
          b = 2;

    var c;
    var d;

    const e = 3;
}

function foo3() {
    using a = 1,
          b = 2;

    var c;
    var d;

    using e = 3;
}

async function foo4() {
    await using a = 1,
          b = 2;

    var c;
    var d;

    await using e = 3;
}
```

:::

使用选项 `{ var: "consecutive" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { var: "consecutive" }]*/

function foo() {
    var a;
    var b;
}
```

:::

使用选项 `{ var: "consecutive" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { var: "consecutive" }]*/

async function foo() {
    var a,
        b;
 
    // `const`, `let`, `using`, and `await using` declarations are ignored if they are not specified
    const c = 1;
    const d = 2;
    let e;
    let f;
    using g = 3;
    using h = 4;
    await using i = 5;
    await using j = 6;
}
```

:::

<a id="initialized-and-uninitialized"></a>

### 已初始化和未初始化

使用选项 `{ "initialized": "always", "uninitialized": "never" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/

function foo() {
    var a, b, c;
    var foo = true;
    var bar = false;
}
```

:::

使用选项 `{ "initialized": "always", "uninitialized": "never" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "always", "uninitialized": "never" }]*/

function foo() {
    var a;
    var b;
    var c;
    var foo = true,
        bar = false;
}

for (let z of foo) {
    doSomething(z);
}

let z;
for (z of foo) {
    doSomething(z);
}
```

:::

使用选项 `{ "initialized": "never" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "never" }]*/

function foo() {
    var foo = true,
        bar = false;
}
```

:::

使用选项 `{ "initialized": "never" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "never" }]*/

function foo() {
    var foo = true;
    var bar = false;
    var a, b, c; // Uninitialized variables are ignored
}
```

:::

使用选项 `{ "initialized": "consecutive", "uninitialized": "never" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/

function foo() {
    var a = 1;
    var b = 2;
    var c,
        d;
    var e = 3;
    var f = 4;
}
```

:::

使用选项 `{ "initialized": "consecutive", "uninitialized": "never" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "consecutive", "uninitialized": "never" }]*/

function foo() {
    var a = 1,
        b = 2;
    var c;
    var d;
    var e = 3,
        f = 4;
}
```

:::

使用选项 `{ "initialized": "consecutive" }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint one-var: ["error", { "initialized": "consecutive" }]*/

function foo() {
    var a = 1;
    var b = 2;

    foo();

    var c = 3;
    var d = 4;
}
```

:::

使用选项 `{ "initialized": "consecutive" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint one-var: ["error", { "initialized": "consecutive" }]*/

function foo() {
    var a = 1,
        b = 2;

    foo();

    var c = 3,
        d = 4;
}
```

:::

<a id="compatibility"></a>

## 兼容性

* **JSHint**：此规则对应于 JSHint 的 `onevar` 规则，但允许分别配置 `let` 和 `const`。
* **JSCS**：此规则大致对应于 [disallowMultipleVarDecl](https://jscs-dev.github.io/rule/disallowMultipleVarDecl)。
* **JSCS**：此规则的 `separateRequires` 选项大致对应于 [requireMultipleVarDecl](https://jscs-dev.github.io/rule/requireMultipleVarDecl)。