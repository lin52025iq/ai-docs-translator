---
title: no-control-regex
rule_type: problem
related_rules:
- no-div-regex
- no-regex-spaces
---



控制字符是 ASCII 范围 0-31 中的特殊不可见字符。这些字符很少用于 JavaScript 字符串，因此，包含显式匹配这些字符的元素的正则表达式很可能是错误的。

<a id="rule-details"></a>

## 规则详情

此规则禁止在正则表达式中使用控制字符以及匹配控制字符的某些转义序列。

以下正则表达式模式元素被视为可能的输入错误，因此此规则会禁止它们：

* 从 `\x00` 到 `\x1F` 的十六进制字符转义。
* 从 `\u0000` 到 `\u001F` 的 Unicode 字符转义。
* 从 `\u{0}` 到 `\u{1F}` 的 Unicode 码点转义。
* U+0000 到 U+001F 范围内未转义的原始字符。

此规则允许使用 `\t` 和 `\n` 等控制转义。也允许使用 `\cA`-`\cZ`（以及 `\ca`-`\cz`）等控制字母转义，因为以这种方式书写控制字符，可以明确表达匹配控制字符的意图；而上述十六进制、Unicode 和原始字符形式则可能会掩盖这一意图。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-control-regex: "error"*/

const pattern1 = /\x00/;
const pattern2 = /\x0C/;
const pattern3 = /\x1F/;
const pattern4 = /\u000C/;
const pattern5 = /\u{C}/u;
const pattern6 = new RegExp("\x0C"); // raw U+000C character in the pattern
const pattern7 = new RegExp("\\x0C"); // \x0C pattern
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-control-regex: "error"*/

const pattern1 = /\x20/;
const pattern2 = /\u0020/;
const pattern3 = /\u{20}/u;
const pattern4 = /\t/;
const pattern5 = /\n/;
const pattern6 = new RegExp("\x20");
const pattern7 = new RegExp("\\t");
const pattern8 = new RegExp("\\n");
const pattern9 = /\cJ/; // control letter escape for U+000A
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

检查 `RegExp` 构造函数调用时，此规则会检查求值后的正则表达式模式。因此，虽然此规则原本允许使用 `\t` 这样的语法，但它不允许 `new RegExp("\t")`，因为求值后的模式（`"\t"` 的字符串值）包含原始控制字符（TAB 字符）。

```js
/*eslint no-control-regex: "error"*/

new RegExp("\t"); // disallowed since the pattern is: <TAB>

new RegExp("\\t"); // allowed since the pattern is: \t
```

`new RegExp("\t")` 和 `new RegExp("\\t")` 的行为没有区别，而且两种情况下匹配 TAB 字符的意图都很明确。对于此规则而言，它们同样有效，但规则只允许 `new RegExp("\\t")`。

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果需要使用控制字符模式匹配，则应关闭此规则。
