---
title: no-template-curly-in-string
rule_type: problem
---


ECMAScript 6 允许程序员使用模板字面量创建包含变量或表达式的字符串，而不必进行字符串拼接：只需在两个反引号（\`）之间写入 `${variable}` 这样的表达式。想使用模板字面量时，很容易误用引号，例如写成 `"${variable}"`，结果得到的只是字面值 `"${variable}"`，而不是包含插入表达式值的字符串。

<a id="rule-details"></a>

## 规则详情

此规则旨在当普通字符串中包含看起来像模板字面量占位符的内容时发出警告。如果字符串中包含模板字面量占位符（`${something}`），且使用 `"` 或 `'` 作为引号，此规则就会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-template-curly-in-string: "error"*/
"Hello ${name}!";
'Hello ${name}!';
"Time: ${12 * 60 * 60 * 1000}";
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-template-curly-in-string: "error"*/
`Hello ${name}!`;
`Time: ${12 * 60 * 60 * 1000}`;

templateFunction`Hello ${name}`;
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

此规则不应在 ES3/5 环境中使用。
