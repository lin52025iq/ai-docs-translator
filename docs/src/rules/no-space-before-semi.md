---
title: no-space-before-semi

related_rules:
- semi
- no-extra-semi
---

禁止在分号前添加空格。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [semi-spacing](semi-spacing) 规则取代。
:::

JavaScript 允许在表达式和结束分号之间添加不必要的空格。

空格问题也会让代码显得不一致，更难阅读。

```js
var thing = function () {
  var test = 12 ;
}  ;
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在表达式的分号前使用空格。

此规则的**错误**代码示例：

::: incorrect

```js
var foo = "bar" ;

var foo = function() {} ;

var foo = function() {
} ;

var foo = 1 + 2 ;
```

:::

此规则的**正确**代码示例：

::: correct

```js
;(function(){}());

var foo = "bar";
```

:::