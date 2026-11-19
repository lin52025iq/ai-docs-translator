---
title: no-empty-label

related_rules:
- no-labels
- no-label-var
- no-unused-labels
---

禁止在循环和 switch 语句以外的内容上使用标签。

::: important
此规则已在 ESLint v2.0.0 中移除，并由 [no-labels](no-labels) 规则取代。
:::

标签语句仅与带标签的 break 和 continue 语句结合使用。ECMAScript 没有 goto 语句。

<a id="rule-details"></a>

## 规则详情

当标签用于标记非迭代语句或非 switch 语句时，会出现此错误。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-empty-label: "error"*/

labeled:
var x = 10;
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-empty-label: "error"*/

labeled:
for (var i=10; i; i--) {
    // ...
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不希望收到有关标签用法的提示，可以安全地禁用此规则。
