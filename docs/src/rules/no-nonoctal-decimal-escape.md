---
title: no-nonoctal-decimal-escape
rule_type: suggestion
related_rules:
- no-octal-escape
further_reading:
- https://tc39.es/ecma262/#prod-annexB-NonOctalDecimalEscapeSequence
---




虽然直到 ECMAScript 2021 才在语言规范中有所规定，但大多数 JavaScript 引擎都允许在字符串字面量中使用 `\8` 和 `\9` 转义序列，并将它们视为“无效”转义：

```js
"\8" === "8"; // true
"\9" === "9"; // true
```

从 ECMAScript 2021 开始，这些转义序列被规定为[非八进制十进制转义序列](https://tc39.es/ecma262/#prod-annexB-NonOctalDecimalEscapeSequence)，行为保持不变。

不过，ECMAScript 规范将字符串字面量中的 `\8` 和 `\9` 视为遗留功能。如果 ECMAScript 宿主不是 Web 浏览器，则可以不支持这种语法。浏览器仍必须支持它，但仅限非严格模式。

无论目标环境是什么，编写新代码时都不应使用这些转义序列。

<a id="rule-details"></a>

## 规则详情

此规则禁止在字符串字面量中使用 `\8` 和 `\9` 转义序列。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-nonoctal-decimal-escape: "error"*/

"\8";

"\9";

const foo = "w\8less";

const bar = "December 1\9";

const baz = "Don't use \8 and \9 escapes.";

const quux = "\0\8";
```

:::

此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-nonoctal-decimal-escape: "error"*/

"8";

"9";

const foo = "w8less";

const bar = "December 19";

const baz = "Don't use \\8 and \\9 escapes.";

const quux = "\0\u0038";
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
