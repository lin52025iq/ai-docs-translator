---
title: space-unary-word-ops

---

要求一元字运算符后有空格。

:::important
此规则已在 ESLint v0.10.0 中移除，并由 [space-unary-ops](space-unary-ops) 规则取代。
:::

<a id="rule-details"></a>

## 规则详情

此规则的**错误**代码示例：

::: incorrect

```js
typeof!a
```

:::

::: incorrect

```js
void{a:0}
```

:::

::: incorrect

```js
new[a][0]
```

:::

::: incorrect

```js
delete(a.b)
```

:::

此规则的**正确**代码示例：

::: correct

```js
delete a.b
```

:::

::: correct

```js
new C
```

:::

::: correct

```js
void 0
```

:::
