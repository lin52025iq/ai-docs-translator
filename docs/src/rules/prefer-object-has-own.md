---
title: prefer-object-has-own
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
---



下面这样的代码非常常见：

```js
if (Object.prototype.hasOwnProperty.call(object, "foo")) {
  console.log("has property foo");
}
```

这种做法很常见，因为 `Object.prototype` 上的方法有时可能不可用或被重新定义（参见 [no-prototype-builtins](no-prototype-builtins) 规则）。

`Object.hasOwn()` 在 ES2022 中引入，是 `Object.prototype.hasOwnProperty.call()` 的简短替代写法：

```js
if (Object.hasOwn(object, "foo")) {
  console.log("has property foo")
}
```

<a id="rule-details"></a>

## 规则详情

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-object-has-own: "error"*/

Object.prototype.hasOwnProperty.call(obj, "a");

Object.hasOwnProperty.call(obj, "a");

({}).hasOwnProperty.call(obj, "a");

const hasProperty = Object.prototype.hasOwnProperty.call(object, property);
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint prefer-object-has-own: "error"*/

Object.hasOwn(obj, "a");

const hasProperty = Object.hasOwn(object, property);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 不适用的情况

除非你的代码库支持 ES2022，否则不应使用此规则。
