---
title: no-proto
rule_type: suggestion
further_reading:
- https://johnresig.com/blog/objectgetprototypeof/
---


`__proto__` 属性自 ECMAScript 3.1 起已弃用，不应在代码中使用。请改用 `Object.getPrototypeOf` 和 `Object.setPrototypeOf`。

<a id="rule-details"></a>

## 规则详情

使用 `new` 运算符创建对象时，`__proto__` 会被设置为该对象构造函数的原始“prototype”属性。获取对象原型的首选方法是 `Object.getPrototypeOf`。若要更改对象的原型，请使用 `Object.setPrototypeOf`。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-proto: "error"*/

const a = obj.__proto__;

const a1 = obj["__proto__"];

obj.__proto__ = b;

obj["__proto__"] = b;
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-proto: "error"*/

const a = Object.getPrototypeOf(obj);

Object.setPrototypeOf(obj, b);

const c = { __proto__: a };
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果需要支持实现了 `__proto__` 属性、但未实现 `Object.getPrototypeOf` 或 `Object.setPrototypeOf` 的旧版浏览器，可以考虑关闭此规则。
