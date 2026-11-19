---
title: no-new-native-nonconstructor
layout: doc
rule_type: problem
handled_by_typescript: true
related_rules:
- no-obj-calls
further_reading:
- https://tc39.es/ecma262/#sec-symbol-constructor
- https://tc39.es/ecma262/#sec-bigint-constructor
---



在 JavaScript 中，通常约定以大写字母开头的全局变量表示可以使用 `new` 运算符实例化的类，例如 `new Array` 和 `new Map`。但令人困惑的是，JavaScript 也提供了一些以大写字母开头、不能使用 `new` 运算符调用的全局变量；如果尝试这样做，就会抛出错误。这些通常是与数据类型相关的函数，很容易被误认为是类。请看以下示例：

```js
// throws a TypeError
const foo = new Symbol("foo");

// throws a TypeError
const result = new BigInt(9007199254740991);
```

`new Symbol` 和 `new BigInt` 都会抛出类型错误，因为它们是函数而不是类。假设大写字母表示类，很容易犯下这个错误。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止意外使用 `new` 运算符调用 JavaScript 原生全局函数。此类函数包括：

* `Symbol`
* `BigInt`

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-new-native-nonconstructor: "error"*/

const foo = new Symbol('foo');
const bar = new BigInt(9007199254740991);
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-new-native-nonconstructor: "error"*/

const foo = Symbol('foo');
const bar = BigInt(9007199254740991);

// Ignores shadowed Symbol.
function baz(Symbol) {
    const qux = new Symbol("baz");
}
function quux(BigInt) {
    const corge = new BigInt(9007199254740991);
}

```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

不应在 ES3/5 环境中使用此规则。

