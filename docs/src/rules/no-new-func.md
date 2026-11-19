---
title: no-new-func
rule_type: suggestion
---


在 JavaScript 中，可以使用 `Function` 构造函数在运行时通过字符串创建函数，例如：

```js
const a = new Function("a", "b", "return a + b");
const b = Function("a", "b", "return a + b");
const c = Function.call(null, "a", "b", "return a + b");
const d = Function.apply(null, ["a", "b", "return a + b"]);
const x = Function.bind(null, "a", "b", "return a + b")();
```

许多人认为这是一种不良实践，因为这类函数难以调试和阅读。此外，内容安全策略（CSP）指令可能会禁止使用 `eval()` 及类似方法从字符串创建代码。

<a id="rule-details"></a>

## 规则详情

此错误用于指出不良实践。将字符串传递给 `Function` 构造函数时，就要求引擎解析该字符串，这与调用 `eval` 函数时的情况非常相似。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-new-func: "error"*/

const a = new Function("a", "b", "return a + b");
const b = Function("a", "b", "return a + b");
const c = Function.call(null, "a", "b", "return a + b");
const d = Function.apply(null, ["a", "b", "return a + b"]);
const x = Function.bind(null, "a", "b", "return a + b")();
const y = Function.bind(null, "a", "b", "return a + b"); // assuming that the result of Function.bind(...) will be eventually called.
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-new-func: "error"*/

const x = function (a, b) {
    return a + b;
};
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

在某些更高级的场景中，如果确实需要使用 `Function` 构造函数。