---
title: prefer-template
rule_type: suggestion
related_rules:
- no-useless-concat
---



在 ES2015 (ES6) 中，我们可以使用模板字面量代替字符串拼接。

```js
const str = "Hello, " + name + "!";
```

```js
const str = `Hello, ${name}!`;
```

<a id="rule-details"></a>

## 规则详情

此规则旨在标记与字符串一起使用的 `+` 运算符。

以下示例展示了此规则的**错误**代码：

::: incorrect

```js
/*eslint prefer-template: "error"*/

const str = "Hello, " + name + "!";
const str1 = "Time: " + (12 * 60 * 60 * 1000);
```

:::

以下示例展示了此规则的**正确**代码：

::: correct

```js
/*eslint prefer-template: "error"*/

const str = "Hello World!";
const str1 = `Hello, ${name}!`;
const str2 = `Time: ${12 * 60 * 60 * 1000}`;

// This is reported by `no-useless-concat`.
const str4 = "Hello, " + "World!";
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

此规则不应在 ES3/5 环境中使用。

在 ES2015 (ES6) 或更高版本中，如果不想收到有关字符串拼接的提示，可以放心禁用此规则。
