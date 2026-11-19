---
title: no-extra-bind
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
- https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
---



`bind()` 方法用于创建具有特定 `this` 值的函数，也可以选择将参数绑定到特定值。使用它来指定 `this` 的值时，函数体中必须确实使用 `this`。例如：

```js
const boundGetName = (function getName() {
    return this.name;
}).bind({ name: "ESLint" });

console.log(boundGetName());      // "ESLint"
```

这段代码展示了如何正确使用 `bind()` 来设置 `this` 的值。

有时在维护代码的过程中，函数体中的 `this` 值会被移除。这样就可能留下一个毫无作用的 `bind()` 调用：

```js
// useless bind
const boundGetName = (function getName() {
    return "ESLint";
}).bind({ name: "ESLint" });

console.log(boundGetName());      // "ESLint"
```

在这段代码中，对 `this` 的引用已被移除，但仍然使用了 `bind()`。此时，`bind()` 只会带来不必要的开销（并影响性能），可以安全地移除。

<a id="rule-details"></a>

## 规则详情

此规则旨在避免不必要地使用 `bind()`，因此，当立即调用函数表达式（IIFE）使用了 `bind()`，但没有适当的 `this` 值时，规则会发出警告。此规则不会标记用于绑定函数参数的 `bind()`。

**注意：** 箭头函数的 `this` 值无法通过 `bind()` 设置。此规则会将箭头函数上的所有 `bind()` 用法都标记为问题。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-extra-bind: "error"*/

const x = function () {
    foo();
}.bind(bar);

const y = (() => {
    foo();
}).bind(bar);

const z = (() => {
    this.foo();
}).bind(bar);

const a = function () {
    (function () {
      this.foo();
    }());
}.bind(bar);

const b = function () {
    function foo() {
      this.bar();
    }
}.bind(baz);
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-extra-bind: "error"*/

const x = function () {
    this.foo();
}.bind(bar);

const y = function (a) {
    return a + 1;
}.bind(foo, bar);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不在意不必要的 `bind()` 调用，可以安全地禁用此规则。
