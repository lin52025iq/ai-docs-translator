---
title: no-func-assign
rule_type: problem
handled_by_typescript: true
---



JavaScript 函数可以写成 FunctionDeclaration `function foo() { ... }`，也可以写成 FunctionExpression `const foo = function() { ... };`。虽然 JavaScript 解释器可能允许这种做法，但覆盖或重新赋值给以 FunctionDeclaration 形式编写的函数，通常表明存在错误或问题。

```js
function foo() {}
foo = bar;
```

<a id="rule-details"></a>

## 规则详情

此规则禁止对 `function` 声明重新赋值。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-func-assign: "error"*/

function foo() {}
foo = bar;

function baz() {
    baz = bar;
}

let a = function hello() {
  hello = 123;
};
```

:::

与 JSHint 中对应规则不同，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-func-assign: "error"*/

foo = bar;
function foo() {}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-func-assign: "error"*/

let foo = function () {}
foo = bar;

function baz(baz) { // `baz` is shadowed.
    baz = bar;
}

function qux() {
    const qux = bar;  // `qux` is shadowed.
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
