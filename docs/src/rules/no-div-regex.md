---
title: no-div-regex
rule_type: suggestion
related_rules:
- no-control-regex
- no-regex-spaces
---



正则表达式字面量开头的 `/=` 字符可能会与除法赋值运算符混淆。

```js
function bar() { return /=foo/; }
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在正则表达式字面量开头的斜杠 (`/`) 后使用等号 (`=`)，因为 `/=` 字符可能会与除法赋值运算符混淆。

此规则的错误代码示例：

:::incorrect

```js
/*eslint no-div-regex: "error"*/

function bar() { return /=foo/; }
```

:::

此规则的正确代码示例：

:::correct

```js
/*eslint no-div-regex: "error"*/

function bar() { return /[=]foo/; }
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
