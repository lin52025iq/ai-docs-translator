---
title: no-compare-neg-zero
rule_type: problem
---



<a id="rule-details"></a>
## 规则详情

该规则应对尝试与 `-0` 进行比较的代码发出警告，因为这种比较无法按预期工作。也就是说，像 `x === -0` 这样的代码对于 `+0` 和 `-0` 都会通过。作者可能原本想使用 `Object.is(x, -0)`。

此规则的**错误**代码示例：

::: incorrect

```js
/* eslint no-compare-neg-zero: "error" */

if (x === -0) {
    // doSomething()...
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/* eslint no-compare-neg-zero: "error" */

if (x === 0) {
    // doSomething()...
}
```

:::

::: correct

```js
/* eslint no-compare-neg-zero: "error" */

if (Object.is(x, -0)) {
    // doSomething()...
}
```

:::

<a id="options"></a>
## 选项

此规则没有选项。
