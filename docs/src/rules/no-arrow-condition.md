---
title: no-arrow-condition

related_rules:
- arrow-parens
- no-confusing-arrow
- no-constant-condition
---

禁止在需要测试条件的地方使用箭头函数。

::: important
此规则已在 ESLint v2.0.0 中移除，并由 [no-confusing-arrow](no-confusing-arrow) 和 [no-constant-condition](no-constant-condition) 规则组合取代。
:::

箭头函数（`=>`）的语法与某些比较运算符（`>`、`<`、`<=` 和 `>=`）相似。此规则会在需要条件的地方使用箭头函数语法时发出警告。即使箭头函数的参数用括号括起来，此规则仍会对此发出警告。

下面是一个最可能将 `=>` 误写为其他符号的示例：

```js
// This is probably a typo
if (a => 1) {}
// And should instead be
if (a >= 1) {}
```

在某些情况下，`=>` 的用法也可能产生歧义，应改写代码，以更清楚地表达作者的意图：

```js
// The intent is not clear
var x = a => 1 ? 2 : 3
// Did the author mean this
var x = function (a) { return a >= 1 ? 2 : 3 }
// Or this
var x = a <= 1 ? 2 : 3
```

<a id="rule-details"></a>

## 规则详情

此规则的**错误**代码示例：

:::incorrect

```js
/*eslint no-arrow-condition: "error"*/

if (a => 1) {}
while (a => 1) {}
for (var a = 1; a => 10; a++) {}
a => 1 ? 2 : 3
(a => 1) ? 2 : 3
var x = a => 1 ? 2 : 3
var x = (a) => 1 ? 2 : 3
```

:::
