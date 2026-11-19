---
title: no-useless-concat
rule_type: suggestion
---


拼接两个字符串没有必要，例如：

```js
const foo = "a" + "b";
```

这段代码可能是重构的结果：某个变量从拼接表达式中被移除（例如从 `"a" + b + "b"` 中移除）。在这种情况下，拼接并无必要，可以将代码改写为：

```js
const foo = "ab";
```

<a id="rule-details"></a>

## 规则详情

此规则旨在标记可以合并为单个字面量的两个字面量的拼接。字面量可以是字符串或模板字符串。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-useless-concat: "error"*/

const a = `some` + `string`;

// these are the same as "10"
const b = '1' + '0';
const c = '1' + `0`;
const d = `1` + '0';
const e = `1` + `0`;
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-useless-concat: "error"*/

// when a non string is included
const a = a + b;
const b = '1' + a;
const c = 1 + '1';
const d = 1 - 2;
// when the string concatenation is multiline
const e = "foo" +
    "bar";
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不希望收到有关不必要字符串拼接的提示，可以放心禁用此规则。
