---
title: no-octal-escape
rule_type: suggestion
---


根据 ECMAScript 5 规范，字符串字面量中的八进制转义序列已被弃用，不应再使用。应改用 Unicode 转义序列。

```js
const foo = "Copyright \251";
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在字符串字面量中使用八进制转义序列。

如果 ESLint 在严格模式下解析代码，解析器（而非此规则）会报告错误。

此规则的**错误**代码示例：

::: incorrect  { "sourceType": "script" }

```js
/*eslint no-octal-escape: "error"*/

const foo = "Copyright \251";
```

:::

此规则的**正确**代码示例：

::: correct  { "sourceType": "script" }

```js
/*eslint no-octal-escape: "error"*/

const foo = "Copyright \u00A9";   // unicode

const buz = "Copyright \xA9";     // hexadecimal
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
