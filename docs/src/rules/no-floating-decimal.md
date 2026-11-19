---
title: no-floating-decimal
rule_type: suggestion
---
JavaScript 中的浮点数包含小数点，并且小数点前后不一定要有数字。例如，以下都是有效的 JavaScript 数字：

```js
var num = .5;
var num = 2.;
var num = -.7;
```

这种数字格式虽然不会导致语法错误，却可能让人难以区分真正的小数和点运算符。因此，有些人建议小数点前后都应始终包含数字，以明确表示其意图是创建一个小数。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除缺少前置或后置数字的小数点；只要数值包含小数点，但小数点前后任一侧缺少数字，就会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-floating-decimal: "error"*/

var num = .5;
var num = 2.;
var num = -.7;
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-floating-decimal: "error"*/

var num = 0.5;
var num = 2.0;
var num = -0.7;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不担心浮点数值可能被误解，就可以放心地关闭此规则。

<a id="compatibility"></a>

## 兼容性

* **JSHint**：W008、W047