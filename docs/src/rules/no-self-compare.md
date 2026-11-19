---
title: no-self-compare
rule_type: problem
---


将变量与其自身进行比较通常是错误的，可能是拼写错误，也可能是重构错误。这会使读者感到困惑，并可能导致运行时错误。

只有在测试变量是否为 `NaN` 时，才会将变量与其自身进行比较。不过，对于这种情况，更合适的做法是使用 `typeof x === 'number' && isNaN(x)` 或 [Number.isNaN ES2015 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)，而不是让代码读者自行判断自我比较的意图。

<a id="rule-details"></a>

## 规则详情

此错误用于指出可能令人困惑且毫无意义的代码。几乎没有需要将某个值与其自身进行比较的情况。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-self-compare: "error"*/

let x = 10;
if (x === x) {
    x = 20;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

此规则通过直接比较运算符两侧的词元来工作。如果两侧在结构上完全相同，就会将其标记为问题。不过，它不会考虑潜在的副作用，也不会考虑函数即使使用相同参数调用，也可能返回不同的对象。因此，在某些情况下可能产生误报，例如：

::: incorrect

```js
/*eslint no-self-compare: "error"*/

function parseDate(dateStr) {
  return new Date(dateStr);
}

if (parseDate('December 17, 1995 03:24:00') === parseDate('December 17, 1995 03:24:00')) {
  // do something
}

let counter = 0;
function incrementUnlessReachedMaximum() {
  return Math.min(counter += 1, 10);
}

if (incrementUnlessReachedMaximum() === incrementUnlessReachedMaximum()) {
  // ...
}
```

:::
