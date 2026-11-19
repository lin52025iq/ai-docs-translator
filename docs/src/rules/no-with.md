---
title: no-with
rule_type: suggestion
further_reading:
- https://web.archive.org/web/20200717110117/https://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/
---



`with` 语句可能会带来问题，因为它会将对象的成员添加到当前作用域中，使得无法判断代码块中的变量实际指向什么。

<a id="rule-details"></a>
## 规则详情

此规则禁止使用 `with` 语句。

如果 ESLint 在严格模式下解析代码，则由解析器（而不是此规则）报告错误。

此规则的错误示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-with: "error"*/

with (point) {
    r = Math.sqrt(x * x + y * y); // is r a member of point?
}
```

:::

此规则的正确示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-with: "error"*/

const r = ({x, y}) => Math.sqrt(x * x + y * y);
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不应使用此规则

如果你有意使用 `with` 语句，可以禁用此规则。
