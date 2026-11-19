---
title: no-regex-spaces
rule_type: suggestion
related_rules:
- no-div-regex
- no-control-regex
---




正则表达式可能非常复杂，难以理解，因此应尽可能保持简单，以避免出错。正则表达式中比较容易出错的一种写法是使用多个空格，例如：

```js
const re = /foo   bar/;
```

在这个正则表达式中，很难看出预期匹配多少个空格。更好的做法是只使用一个空格，然后指定预期的空格数量，例如：

```js
const re = /foo {3}bar/;
```

这样就能非常清楚地看出预期匹配三个空格。

<a id="rule-details"></a>

## 规则详情

此规则禁止在正则表达式字面量中使用多个空格。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-regex-spaces: "error"*/

const re = /foo   bar/;
const re1 = new RegExp("foo   bar");
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-regex-spaces: "error"*/

const re = /foo {3}bar/;
const re1 = new RegExp("foo {3}bar");
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你想允许正则表达式中出现多个空格，可以放心关闭此规则。
