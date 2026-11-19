---
title: no-negated-in-lhs
rule_type: problem
---

正如开发者可能会误将表示和的相反数的 `-(a + b)` 写成 `-a + b`，他们也可能会误写成 `!key in object`，而他们几乎肯定是想写 `!(key in object)`，以测试某个键是否不在对象中。

<a id="rule-details"></a>

## 规则详情

此规则禁止在 `in` 表达式中对左操作数取反。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-negated-in-lhs: "error"*/

if(!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-negated-in-lhs: "error"*/

if(!(key in object)) {
    // key is not in object
}

if(('' + !key) in object) {
    // make operator precedence and type conversion explicit
    // in a rare situation when that is the intended meaning
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

永远不要。
