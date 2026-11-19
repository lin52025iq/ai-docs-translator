---
title: no-inner-declarations
rule_type: problem
---



在 JavaScript 中，ES6 之前，函数声明只能出现在程序的顶层或另一个函数体的顶层，不过解析器有时会[错误地接受它们出现在其他位置](https://code.google.com/p/esprima/issues/detail?id=422)。这仅适用于函数声明；命名或匿名函数表达式可以出现在任何允许表达式出现的位置。

```js
// Good
function doSomething() { }

// Bad
if (test) {
    function doSomethingElse () { }
}

function anotherThing() {
    var fn;

    if (test) {

        // Good
        fn = function expression() { };

        // Bad
        function declaration() { }
    }
}
```

在 ES6 中，[块级函数](https://leanpub.com/understandinges6/read#leanpub-auto-block-level-functions)（在代码块内声明的函数）的作用域仅限于其声明所在的代码块；只有在严格模式下（带有 `"use strict"` 标记的代码或 ESM 模块），才能在代码块作用域之外访问和调用它们。在非严格模式下，可以在代码块作用域之外访问和调用它们。

```js
"use strict";

if (test) {
    function doSomething () { }

    doSomething(); // no error
}

doSomething(); // error
```

变量声明可以出现在任何允许语句出现的位置，即使是在其他代码块深处嵌套的位置。由于变量提升，这通常并不可取；将声明移至程序或函数体的顶层可以提高代码清晰度。请注意，[块级绑定](https://leanpub.com/understandinges6/read#leanpub-auto-block-bindings)（`let`、`const`）不会被提升，因此不受此规则影响。

```js
// Good
var foo = 42;

// Good
if (foo) {
    let bar1;
}

// Bad
while (test) {
    var bar2;
}

function doSomething() {
    // Good
    var baz = true;

    // Bad
    if (baz) {
        var quux;
    }
}
```

<a id="rule-details"></a>

## 规则详情

此规则要求函数声明以及（可选的）变量声明必须位于程序的顶层、函数体的顶层，或类静态代码块的顶层。

<a id="options"></a>

## 选项

此规则接受一个字符串选项和一个对象选项：

* `"functions"`（默认值）禁止在嵌套代码块中声明 `function`
* `"both"` 禁止在嵌套代码块中声明 `function` 和 `var`
* `{ blockScopedFunctions: "allow" }`（默认值）此选项允许在严格模式下（带有 `"use strict"` 标记的代码或 ESM 模块）于嵌套代码块中声明 `function`，且 `languageOptions.ecmaVersion` 必须设为 `2015` 或更高版本。将此选项设为 `"disallow"` 即可禁用该行为。

### functions

使用默认选项 `"functions"` 时，以下代码示例违反此规则：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-inner-declarations: "error"*/

// script, non-strict code

if (test) {
    function doSomething() { }
}

function doSomethingElse() {
    if (test) {
        function doAnotherThing() { }
    }
}

if (foo) function f(){}
```

:::

使用默认选项 `"functions"` 时，以下代码示例符合此规则：

::: correct { "sourceType": "script" }

```js
/*eslint no-inner-declarations: "error"*/

function doSomething() { }

function doSomethingElse() {
    function doAnotherThing() { }
}

function doSomethingElse() {
    "use strict";

    if (test) {
        function doAnotherThing() { }
    }
}

class C {
    static {
        function doSomething() { }
    }
}

if (test) {
    asyncCall(id, function (err, data) { });
}

var fn;
if (test) {
    fn = function fnExpression() { };
}

if (foo) var a;
```

:::

### both

使用选项 `"both"` 时，以下代码示例违反此规则：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-inner-declarations: ["error", "both"]*/

if (test) {
    var foo = 42;
}

function doAnotherThing() {
    if (test) {
        var bar = 81;
    }
}

if (foo) var a;

if (foo) function f(){}

class C {
    static {
        if (test) {
            var something;
        }
    }
}
```

:::

使用选项 `"both"` 时，以下代码示例符合此规则：

::: correct { "sourceType": "script" }

```js
/*eslint no-inner-declarations: ["error", "both"]*/

var bar = 42;

if (test) {
    let baz = 43;
}

function doAnotherThing() {
    var baz = 81;
}

class C {
    static {
        var something;
    }
}
```

:::

### blockScopedFunctions

当 `ecmaVersion: 2015` 且使用 `{ blockScopedFunctions: "disallow" }` 选项时，以下代码示例违反此规则：

::: incorrect { "sourceType": "script", "ecmaVersion": 2015 }

```js
/*eslint no-inner-declarations: ["error", "functions", { blockScopedFunctions: "disallow" }]*/

// non-strict code

if (test) {
    function doSomething() { }
}

function doSomething() {
    if (test) {
        function doSomethingElse() { }
    }
}

// strict code

function foo() {
    "use strict";

    if (test) {
        function bar() { }
    }
}
```

:::

当 `ecmaVersion: 2015` 且使用 `{ blockScopedFunctions: "disallow" }` 选项时，以下代码示例符合此规则：

::: correct { "sourceType": "script", "ecmaVersion": 2015 }

```js
/*eslint no-inner-declarations: ["error", "functions", { blockScopedFunctions: "disallow" }]*/

function doSomething() { }

function doSomething() {
    function doSomethingElse() { }
}
```

:::

当 `ecmaVersion: 2015` 且使用 `{ blockScopedFunctions: "allow" }` 选项时，以下代码示例符合此规则：

::: correct { "sourceType": "script", "ecmaVersion": 2015 }

```js
/*eslint no-inner-declarations: ["error", "functions", { blockScopedFunctions: "allow" }]*/

"use strict";

if (test) {
    function doSomething() { }
}

function doSomething() {
    if (test) {
        function doSomethingElse() { }
    }
}

// OR

function foo() {
    "use strict";

    if (test) {
        function bar() { }
    }
}
```

:::

`ESM modules` 以及 `class` 声明和表达式始终处于严格模式。

::: correct

```js
/*eslint no-inner-declarations: ["error", "functions", { blockScopedFunctions: "allow" }]*/

if (test) {
    function doSomething() { }
}

function doSomethingElse() {
    if (test) {
        function doAnotherThing() { }
    }
}

class Some {
    static {
        if (test) {
            function doSomething() { }
        }
    }
}

const C = class {
    static {
        if (test) {
            function doSomething() { }
        }
    }
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

默认情况下，此规则仅在函数声明行为未明确定义、因而可能不一致的环境（ES6 之前的环境），或适用旧版语义的环境（非严格模式代码）中禁止内部函数声明。如果代码面向 ES6 之前的环境，或未处于严格模式，应启用此规则以避免意外行为。

在 ES6+ 环境的严格模式代码中，内部函数声明的行为定义明确且一致——它们始终具有块级作用域。如果代码仅面向 ES6+ 环境且处于严格模式（ES 模块，或带有 `"use strict"` 指令的代码），则无需启用此规则；除非你出于风格考虑想禁止内部函数，此时应将此规则的选项设为 `blockScopedFunctions: "disallow"`。

使用 [block-scoped-var](block-scoped-var) 时，或者即使存在变量提升，在嵌套代码块中声明变量也可以接受时，请禁用对变量声明的检查。
