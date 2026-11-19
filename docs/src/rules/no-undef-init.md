---
title: no-undef-init
rule_type: suggestion
related_rules:
- no-undefined
- no-void
---



在 JavaScript 中，已声明但未初始化为任何值的变量会自动获得 `undefined` 值。例如：

```js
var foo;

console.log(foo === undefined);     // true
```

因此，没有必要将变量初始化为 `undefined`，例如：

```js
var foo = undefined;
```

避免将变量初始化为 `undefined` 是一种最佳实践。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除初始化为 `undefined` 的 `var` 和 `let` 变量声明。

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint no-undef-init: "error"*/

var foo = undefined;
let bar = undefined;
```

:::

此规则下的**正确**代码示例：

::: correct

```js
/*eslint no-undef-init: "error"*/

var foo;
let bar;
```

:::

请注意，此规则不检查 `const` 声明、`using` 声明、`await using` 声明、解构模式、函数参数和类字段。

此规则下的其他**正确**代码示例：

::: correct

```js
/*eslint no-undef-init: "error"*/

const foo = undefined;

using foo1 = undefined;

await using foo2 = undefined;

let { bar = undefined } = baz;

[quux = undefined] = quuux;

(foo = undefined) => {};

class Foo {
    bar = undefined;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

在某些情况下，将变量初始化为 `undefined` 与省略初始化的行为不同。

其中一种情况是 `var` 声明出现在循环内部。例如：

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint no-undef-init: "error"*/

for (i = 0; i < 10; i++) {
    var x = undefined;
    console.log(x);
    x = i;
}
```

:::

在这种情况下，`var x` 会被提升到循环之外，实际效果相当于：

```js
var x;

for (i = 0; i < 10; i++) {
    x = undefined;
    console.log(x);
    x = i;
}
```

如果移除初始化，循环的行为就会改变：

```js
for (i = 0; i < 10; i++) {
    var x;
    console.log(x);
    x = i;
}
```

这段代码等价于：

```js
var x;

for (i = 0; i < 10; i++) {
    console.log(x);
    x = i;
}
```

这与在循环中定义 `var x = undefined` 的结果不同，因为每次循环时 `x` 都不会再重置为 `undefined`。

如果你在循环中使用了此类初始化，则应禁用此规则。

此规则下的**正确**代码示例，因为规则在特定行被禁用：

::: correct

```js
/*eslint no-undef-init: "error"*/

for (i = 0; i < 10; i++) {
    var x = undefined; // eslint-disable-line no-undef-init
    console.log(x);
    x = i;
}
```

:::

另一种情况是使用 `var` 重新声明变量。例如：

```js
function foo() {
    var x = 1;
    console.log(x); // output: 1

    var x;
    console.log(x); // output: 1

    var x = undefined;
    console.log(x); // output: undefined
}

foo();
```

在这种情况下，你可以将其改为赋值（`x = undefined;`）来避免重新声明，也可以在特定行使用 eslint 禁用注释。
