---
title: no-iterator
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
- https://compat-table.github.io/compat-table/non-standard/#test-__iterator__
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Deprecated_and_obsolete_features#Object_methods
---


`__iterator__` 属性是 SpiderMonkey 对 JavaScript 的扩展，可用于创建与 JavaScript 的 `for in` 和 `for each` 结构兼容的自定义迭代器。不过，此属性现已过时，因此不应再使用。以下是它过去的工作方式示例：

```js
Foo.prototype.__iterator__ = function() {
    return new FooIterator(this);
}
```

应改用 ECMAScript 6 迭代器和生成器。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止因使用 `__iterator__` 属性而可能导致的错误，因为一些浏览器并未实现该属性。因此，每当此规则遇到 `__iterator__` 属性时，都会发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-iterator: "error"*/

Foo.prototype.__iterator__ = function() {
    return new FooIterator(this);
};

foo.__iterator__ = function () {};

foo["__iterator__"] = function () {};

```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-iterator: "error"*/

const __iterator__ = foo; // Not using the `__iterator__` property.
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
