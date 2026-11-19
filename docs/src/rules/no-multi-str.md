---
title: no-multi-str
rule_type: suggestion
---


在 JavaScript 中，可以通过在换行符前使用反斜杠来创建多行字符串，例如：

```js
const x = "Line 1 \
         Line 2";
```

有些人认为这是一种不好的做法，因为这是 JavaScript 中一项未记录的特性，后来才被正式规范化。

<a id="rule-details"></a>

## 规则详情

此规则旨在阻止使用多行字符串。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-multi-str: "error"*/

const x = "some very \
long text";
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-multi-str: "error"*/

const x = "some very long text";

const y = "some very " +
        "long text";
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
