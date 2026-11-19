---
title: no-delete-var
rule_type: suggestion
---



`delete` 运算符用于从对象中移除属性。对变量使用 `delete` 运算符可能会导致意外行为。

<a id="rule-details"></a>

## 规则详情

此规则禁止对变量使用 `delete` 运算符。

如果 ESLint 在严格模式下解析代码，则会由解析器（而非此规则）报告错误。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-delete-var: "error"*/

let x;
delete x;
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
