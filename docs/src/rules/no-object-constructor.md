---
title: no-object-constructor
rule_type: suggestion
related_rules:
- no-array-constructor
- no-new-wrappers
---

通常不建议使用 `Object` 构造函数创建新的空对象，而应使用对象字面量表示法，因为它更简洁，而且全局变量 `Object` 可能会被重新定义。
例外情况是，使用 `Object` 构造函数有意包装作为参数传入的指定值。

<a id="rule-details"></a>

## 规则详情

此规则禁止在不带参数的情况下调用 `Object` 构造函数。

此规则的错误代码示例：

:::incorrect

```js
/*eslint no-object-constructor: "error"*/

Object();

new Object();
```

:::

此规则的正确代码示例：

:::correct

```js
/*eslint no-object-constructor: "error"*/

Object("foo");

const obj = { a: 1, b: 2 };

const isObject = value => value === Object(value);

const createObject = Object => new Object();
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果希望允许使用 `Object` 构造函数，可以放心关闭此规则。
