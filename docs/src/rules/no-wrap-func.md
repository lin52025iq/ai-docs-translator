---
title: no-wrap-func

---

禁止在函数表达式周围使用不必要的括号。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [no-extra-parens](no-extra-parens) 规则取代。新规则中的 `"functions"` 选项与已移除的规则等效。
:::

虽然可以用括号包裹函数，但如果代码中还包含立即调用的函数表达式 (IIFE)，就可能造成混淆，因为括号通常用于区分这两种情况。例如：

```js
var foo = (function() {
    // IIFE
}());

var bar = (function() {
    // not an IIFE
});
```

<a id="rule-details"></a>

## 规则详情

当此规则遇到用括号包裹、且后面没有调用括号的函数表达式时，会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
var a = (function() {/*...*/});
```

:::

此规则的**正确**代码示例：

::: correct

```js
var a = function() {/*...*/};

(function() {/*...*/})();
```

:::