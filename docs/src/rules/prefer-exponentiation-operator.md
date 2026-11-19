---
title: prefer-exponentiation-operator
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation
- https://bugs.chromium.org/p/v8/issues/detail?id=5848
---



ES2016 引入的中缀求幂运算符 `**` 是标准 `Math.pow` 函数的替代方案。

与函数表示法相比，中缀表示法被认为更易读，因此也更值得优先使用。

<a id="rule-details"></a>

## 规则详情

此规则禁止调用 `Math.pow`，并建议改用 `**` 运算符。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-exponentiation-operator: "error"*/

const foo = Math.pow(2, 8);

const bar = Math.pow(a, b);

let baz = Math.pow(a + b, c + d);

let quux = Math.pow(-1, n);
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint prefer-exponentiation-operator: "error"*/

const foo = 2 ** 8;

const bar = a ** b;

let baz = (a + b) ** (c + d);

let quux = (-1) ** n;
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

除非你的代码库支持 ES2016，否则不应使用此规则。
