---
title: space-after-function-name

---

在函数定义中，强制函数名后使用一致的空格。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [space-before-function-paren](space-before-function-paren) 规则取代。
:::

函数名与参数列表之间的空白字符是可选的。

```js
function withoutSpace(x) {
    // ...
}

function withSpace (x) {
    // ...
}
```

某些风格指南可能要求函数名后使用一致的空格。

<a id="rule-details"></a>

## 规则详情

此规则旨在强制函数名后使用一致的空格。它接受一个参数。如果参数为 `"always"`，则所有函数名后都必须至少有一个空格。如果参数为 `"never"`，则函数名与参数列表之间不能有空格。默认值为 `"never"`。

此规则的**错误**代码示例：

::: incorrect

```js
function foo (x) {
    // ...
}

var x = function named (x) {};

// When ["error", "always"]
function bar(x) {
    // ...
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
function foo(x) {
    // ...
}

var x = function named(x) {};

// When ["error", "always"]
function bar (x) {
    // ...
}
```

:::