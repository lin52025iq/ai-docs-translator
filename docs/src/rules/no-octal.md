---
title: no-octal
rule_type: suggestion
---



八进制字面量是以零开头的数值，例如：

```js
const num = 071;      // 57
```

由于用于标识八进制字面量的前导零一直是 JavaScript 代码中造成混淆和错误的源头，ECMAScript 5 弃用了八进制数值字面量。

<a id="rule-details"></a>

## 规则详情

此规则禁止使用八进制字面量。

如果 ESLint 在严格模式下解析代码，则会由解析器（而非此规则）报告错误。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-octal: "error"*/

const num = 071;
const result = 5 + 07;
```

:::

此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-octal: "error"*/

const num  = "071";
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="compatibility"></a>

## 兼容性

* **JSHint**：W115

