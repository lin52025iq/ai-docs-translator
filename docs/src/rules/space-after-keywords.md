---
title: space-after-keywords

---

强制关键字后的空格保持一致。

:::important
此规则已在 ESLint v2.0.0 中移除，并由 [keyword-spacing](keyword-spacing) 规则取代。
:::

某些代码风格指南要求或禁止在特定关键字后添加空格。

```js
if (condition) {
    doSomething();
} else {
    doSomethingElse();
}

if(condition) {
    doSomething();
}else{
    doSomethingElse();
}
```

<a id="rule-details"></a>

## 规则详情

此规则将强制 `if`、`else`、`for`、`while`、`do`、`switch`、`try`、`catch`、`finally` 和 `with` 关键字后的空格保持一致。

此规则接受一个参数。如果参数为 `"always"`，则关键字后必须至少有一个空格。如果参数为 `"never"`，则关键字后不能有空格。默认值为 `"always"`。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-after-keywords: "error"*/

if(a) {}

if (a) {} else{}

do{} while (a);
```

:::

::: incorrect

```js
/*eslint space-after-keywords: ["error", "never"]*/

if (a) {}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint space-after-keywords: "error"*/

if (a) {}

if (a) {} else {}
```

:::

::: correct

```js
/*eslint space-after-keywords: ["error", "never"]*/

if(a) {}
```

:::