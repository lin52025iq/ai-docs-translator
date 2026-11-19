---
title: padding-line-between-statements
rule_type: layout
---
此规则要求或禁止指定两种语句之间出现空行。
适当的空行有助于开发者理解代码。

例如，以下配置要求变量声明和 `return` 语句之间有一个空行。

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "var", next: "return" }
]*/

function foo() {
    var a = 1;

    return a;
}
```

<a id="rule-details"></a>

## 规则详情

如果未提供任何配置，此规则不会执行任何操作。

配置是一个包含 3 个属性的对象：`blankLine`、`prev` 和 `next`。例如，`{ blankLine: "always", prev: "var", next: "return" }` 表示“变量声明和 `return` 语句之间必须有一个或多个空行”。
你可以提供任意数量的配置。如果一对语句匹配多项配置，则使用最后一项匹配的配置。

```json
{
    "padding-line-between-statements": [
        "error",
        { "blankLine": LINEBREAK_TYPE, "prev": STATEMENT_TYPE, "next": STATEMENT_TYPE },
        { "blankLine": LINEBREAK_TYPE, "prev": STATEMENT_TYPE, "next": STATEMENT_TYPE },
        { "blankLine": LINEBREAK_TYPE, "prev": STATEMENT_TYPE, "next": STATEMENT_TYPE },
        { "blankLine": LINEBREAK_TYPE, "prev": STATEMENT_TYPE, "next": STATEMENT_TYPE },
        ...
    ]
}
```

* `LINEBREAK_TYPE` 可以是以下值之一。
    * `"any"` 表示忽略这对语句。
    * `"never"` 表示禁止空行。
    * `"always"` 表示必须有一个或多个空行。请注意，包含注释的行不计为空行。

* `STATEMENT_TYPE` 可以是以下值之一，也可以是由以下值组成的数组。
    * `"*"` 是通配符，可匹配任何语句。
    * `"block"` 是独立代码块。
    * `"block-like"` 是类似代码块的语句。它匹配最后一个标记是代码块右花括号的语句；例如 `{ }`、`if (a) { }` 和 `while (a) { }`。也匹配立即调用的函数表达式语句。
    * `"break"` 是 `break` 语句。
    * `"case"` 是 `switch` 语句中的 `case` 子句。
    * `"cjs-export"` 是 CommonJS 的 `export` 语句；例如 `module.exports = 0`、`module.exports.foo = 1` 和 `exports.foo = 2`。这是赋值语句的一种特殊情况。
    * `"cjs-import"` 是 CommonJS 的 `import` 语句；例如 `const foo = require("foo")`。这是变量声明的一种特殊情况。
    * `"class"` 是 `class` 声明。
    * `"const"` 是单行和多行 `const` 变量声明。
    * `"continue"` 是 `continue` 语句。
    * `"debugger"` 是 `debugger` 语句。
    * `"default"` 是 `switch` 语句中的 `default` 子句。
    * `"directive"` 是指令序言。它匹配指令，例如 `"use strict"`。
    * `"do"` 是 `do-while` 语句。它匹配所有第一个标记为 `do` 关键字的语句。
    * `"empty"` 是空语句。
    * `"export"` 是 `export` 声明。
    * `"expression"` 是表达式语句。
    * `"for"` 是 `for` 循环系列。它匹配所有第一个标记为 `for` 关键字的语句。
    * `"function"` 是函数声明。
    * `"if"` 是 `if` 语句。
    * `"iife"` 是立即调用的函数表达式语句。它匹配对函数表达式的调用，该表达式前面可以有一元运算符。
    * `"import"` 是 `import` 声明。
    * `"let"` 是单行和多行 `let` 变量声明。
    * `"multiline-block-like"` 是类似代码块的语句。它与 `block-like` 类型相同，但仅匹配多行代码块。
    * `"multiline-const"` 是多行 `const` 变量声明。
    * `"multiline-expression"` 是表达式语句。它与 `expression` 类型相同，但仅匹配多行语句。
    * `"multiline-let"` 是多行 `let` 变量声明。
    * `"multiline-var"` 是多行 `var` 变量声明。
    * `"return"` 是 `return` 语句。
    * `"singleline-const"` 是单行 `const` 变量声明。
    * `"singleline-let"` 是单行 `let` 变量声明。
    * `"singleline-var"` 是单行 `var` 变量声明。
    * `"switch"` 是 `switch` 语句。
    * `"throw"` 是 `throw` 语句。
    * `"try"` 是 `try` 语句。
    * `"var"` 是单行和多行 `var` 变量声明。
    * `"while"` 是 `while` 循环语句。
    * `"with"` 是 `with` 语句。

此配置会要求所有 `return` 语句前都有空行，类似于 [newline-before-return](newline-before-return) 规则。

配置 `[{ blankLine: "always", prev: "*", next: "return" }]` 的**错误**代码示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "*", next: "return" }
]*/

function foo() {
    bar();
    return;
}
```

:::

配置 `[{ blankLine: "always", prev: "*", next: "return" }]` 的**正确**代码示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "*", next: "return" }
]*/

function foo1() {
    bar();

    return;
}

function foo2() {
    return;
}
```

:::

----

此配置会要求每组变量声明之后都有空行，类似于 [newline-after-var](newline-after-var) 规则。

配置 `[{ blankLine: "always", prev: ["const", "let", "var"], next: "*"}, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}]` 的**错误**代码示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
]*/

function foo1() {
    var a = 0;
    bar();
}

function foo2() {
    let a = 0;
    bar();
}

function foo3() {
    const a = 0;
    bar();
}

class C {
    static {
        let a = 0;
        bar();
    }
}
```

:::

配置 `[{ blankLine: "always", prev: ["const", "let", "var"], next: "*"}, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}]` 的**正确**代码示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
]*/

function foo1() {
    var a = 0;
    var b = 0;

    bar();
}

function foo2() {
    let a = 0;
    const b = 0;

    bar();
}

function foo3() {
    const a = 0;
    const b = 0;

    bar();
}

class C {
    static {
        let a = 0;
        let b = 0;

        bar();
    }
}
```

:::

----

此配置会要求所有指令序言之后都有空行，类似于 [lines-around-directive](lines-around-directive) 规则。

配置 `[{ blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }]` 的**错误**代码示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any",    prev: "directive", next: "directive" }
]*/

"use strict";
foo();
```

:::

配置 `[{ blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }]` 的**正确**代码示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any",    prev: "directive", next: "directive" }
]*/

"use strict";
"use asm";

foo();
```

:::

----

此配置会要求 `switch` 语句中的子句之间有空行。

配置 `[{ blankLine: "always", prev: ["case", "default"], next: "*" }]` 的**错误**代码示例：

::: incorrect

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["case", "default"], next: "*" }
]*/

switch (foo) {
    case 1:
        bar();
        break;
    case 2:
    case 3:
        baz();
        break;
    default:
        quux();
}
```

:::

配置 `[{ blankLine: "always", prev: ["case", "default"], next: "*" }]` 的**正确**代码示例：

::: correct

```js
/*eslint padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["case", "default"], next: "*" }
]*/

switch (foo) {
    case 1:
        bar();
        break;

    case 2:

    case 3:
        baz();
        break;

    default:
        quux();
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不希望针对换行发出警告，可以安全地禁用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS：** [requirePaddingNewLineAfterVariableDeclaration](https://jscs-dev.github.io/rule/requirePaddingNewLineAfterVariableDeclaration)
* **JSCS：** [requirePaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterBlocks)
* **JSCS：** [disallowPaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterBlocks)
* **JSCS：** [requirePaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterUseStrict)
* **JSCS：** [disallowPaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterUseStrict)
* **JSCS：** [requirePaddingNewLinesBeforeExport](https://jscs-dev.github.io/rule/requirePaddingNewLinesBeforeExport)
* **JSCS：** [disallowPaddingNewLinesBeforeExport](https://jscs-dev.github.io/rule/disallowPaddingNewLinesBeforeExport)
* **JSCS：** [requirePaddingNewlinesBeforeKeywords](https://jscs-dev.github.io/rule/requirePaddingNewlinesBeforeKeywords)
* **JSCS：** [disallowPaddingNewlinesBeforeKeywords](https://jscs-dev.github.io/rule/disallowPaddingNewlinesBeforeKeywords)