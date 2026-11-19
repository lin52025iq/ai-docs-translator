---
title: no-ex-assign
rule_type: problem
further_reading:
- https://bocoup.com/blog/the-catch-with-try-catch
---



如果 `try` 语句中的 `catch` 子句意外（或故意）将另一个值赋给异常参数，那么从此之后就无法再引用该错误。
由于没有 `arguments` 对象提供访问此数据的替代方式，给该参数赋值会造成彻底的破坏。

<a id="rule-details"></a>

## 规则详情

此规则禁止在 `catch` 子句中重新赋值异常。

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    e = 10;
}
```

:::

此规则下的**正确**代码示例：

::: correct

```js
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    const foo = 10;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
