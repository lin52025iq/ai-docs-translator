---
title: no-sparse-arrays
rule_type: problem
further_reading:
- https://www.nczonline.net/blog/2007/09/09/inconsistent-array-literals/
---



稀疏数组包含空槽位，最常见的情况是在数组字面量中使用多个逗号，例如：

```js
const items = [,,];
```

在此示例中，`items` 数组的 `length` 为 2，但 `items[0]` 和 `items[1]` 实际上都没有值。数组字面量中只有逗号也有效，再加上数组设置了 `length`，却没有设置实际的元素值，这些因素让许多开发者对稀疏数组感到困惑。请看下面的例子：

```js
const colors = [ "red",, "blue" ];
```

在此示例中，`colors` 数组的 `length` 为 3。但开发者是有意在数组中间留空，还是不小心打错了？

以这种方式定义稀疏数组容易引起混淆，因此建议避免使用，除非你确定它们对代码有用。

<a id="rule-details"></a>

## 规则详情

此规则禁止包含“空洞”的稀疏数组字面量，即逗号前没有元素的情况。但最后一个元素后的尾随逗号不在此规则的限制范围内。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-sparse-arrays: "error"*/

const items = [,];
const colors = [ "red",, "blue" ];
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-sparse-arrays: "error"*/

const items = [];
const arr = new Array(23);

// trailing comma (after the last element) is not a problem
const colors = [ "red", "blue", ];
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你想使用稀疏数组，可以放心禁用此规则。
