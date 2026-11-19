---
title: no-new-symbol
rule_type: problem
handled_by_typescript: true
further_reading:
- https://www.ecma-international.org/ecma-262/6.0/#sec-symbol-objects
---

`Symbol` 不应与 `new` 运算符一起使用，而应作为函数调用。

```js
var foo = new Symbol("foo");
```

这会抛出 `TypeError` 异常。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止意外使用 `new` 运算符调用 `Symbol`。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-new-symbol: "error"*/

var foo = new Symbol('foo');
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-new-symbol: "error"*/

var foo = Symbol('foo');

// Ignores shadowed Symbol.
function bar(Symbol) {
    const baz = new Symbol("baz");
}

```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

在 ES3/5 环境中不应使用此规则。
