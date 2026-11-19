---
title: no-useless-backreference
rule_type: problem
related_rules:
- no-control-regex
- no-empty-character-class
- no-invalid-regexp
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
---



在 JavaScript 正则表达式中，语法上允许定义指向模式中另一个备选分支内分组的反向引用、指向出现在该反向引用之后的分组的反向引用、指向包含该反向引用的分组的反向引用，或指向位于否定环视中的分组的反向引用。然而，根据规范，在这些情况下，无论反向引用和分组出现的上下文如何，该反向引用最终都只会匹配零长度（空字符串）。

始终成功匹配零长度且无法匹配其他内容的反向引用毫无用处。它们基本上会被忽略，移除后也不会改变正则表达式的行为。

```js
const regex = /^(?:(a)|\1b)$/;

regex.test("a"); // true
regex.test("b"); // true!
regex.test("ab"); // false

const equivalentRegex = /^(?:(a)|b)$/;

equivalentRegex.test("a"); // true
equivalentRegex.test("b"); // true
equivalentRegex.test("ab"); // false
```

无用的反向引用可能是代码中的错误。它通常表明正则表达式未按预期工作。

<a id="rule-details"></a>

## 规则详情

此规则旨在检测并禁止正则表达式中的以下反向引用：

* 指向另一个备选分支中分组的反向引用，例如 `/(a)|\1b/`。在这种构造的正则表达式中，该反向引用试图匹配当时未参与匹配的分组所捕获的内容。
* 指向模式中后续分组的反向引用，例如 `/\1(a)/`。该分组尚未捕获任何内容，而且 ECMAScript 不支持向前引用。在向后匹配的后行断言中情况相反，因此此规则会禁止指向同一后行断言中前面分组的反向引用，例如 `/(?<=(a)\1)b/`。
* 在分组内部指向该分组自身的反向引用，例如 `/(\1)/`。与上一种情况类似，该分组尚未捕获任何内容，而且 ECMAScript 不支持嵌套引用。
* 指向否定环视中分组的反向引用，但反向引用不在同一个否定环视中时，例如 `/a(?!(b)).\1/`。否定环视（先行断言或后行断言）仅当其模式无法匹配时才会成功，这意味着该分组匹配失败。

根据 ECMAScript 规范，上述所有反向引用都是有效的，始终成功匹配零长度，并且无法匹配其他内容。因此，它们不会产生解析错误或运行时错误，但也不会影响正则表达式的行为。它们在语法上有效，但毫无用处。

对于来自其他语言的开发者来说，这可能令人惊讶，因为在其他语言中，有些此类反向引用可以发挥实际作用。

```js
// in some other languages, this pattern would successfully match "aab"

/^(?:(a)(?=a)|\1b)+$/.test("aab"); // false
```

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-useless-backreference: "error"*/

/^(?:(a)|\1b)$/; // reference to (a) into another alternative

/^(?:(a)|b(?:c|\1))$/; // reference to (a) into another alternative

/^(?:a|b(?:(c)|\1))$/; // reference to (c) into another alternative

/\1(a)/; // forward reference to (a)

RegExp('(a)\\2(b)'); // forward reference to (b)

/(?:a)(b)\2(c)/; // forward reference to (c)

/\k<foo>(?<foo>a)/; // forward reference to (?<foo>a)

/(?<=(a)\1)b/; // backward reference to (a) from within the same lookbehind

/(?<!(a)\1)b/; // backward reference to (a) from within the same lookbehind

new RegExp('(\\1)'); // nested reference to (\1)

/^((a)\1)$/; // nested reference to ((a)\1)

/a(?<foo>(.)b\1)/; // nested reference to (?<foo>(.)b\1)

/a(?!(b)).\1/; // reference to (b) into a negative lookahead

/(?<!(a))b\1/; // reference to (a) into a negative lookbehind
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-useless-backreference: "error"*/

/^(?:(a)|(b)\2)$/; // reference to (b)

/(a)\1/; // reference to (a)

RegExp('(a)\\1(b)'); // reference to (a)

/(a)(b)\2(c)/; // reference to (b)

/(?<foo>a)\k<foo>/; // reference to (?<foo>a)

/(?<=\1(a))b/; // reference to (a), correctly before the group as they're in the same lookbehind

/(?<=(a))b\1/; // reference to (a), correctly after the group as the backreference isn't in the lookbehind

new RegExp('(.)\\1'); // reference to (.)

/^(?:(a)\1)$/; // reference to (a)

/^((a)\2)$/; // reference to (a)

/a(?<foo>(.)b\2)/; // reference to (.)

/a(?!(b|c)\1)./; // reference to (b|c), correct as it's from within the same negative lookahead

/(?<!\1(a))b/; // reference to (a), correct as it's from within the same negative lookbehind
```

:::

请注意，此规则不旨在检测并禁止正则表达式中可能有误的反向引用语法用法，例如在字符类中使用反向引用语法，或尝试引用不存在的分组。根据上下文，语法上并非有效反向引用的 `\1`...`\9` 序列可能导致语法错误，也可能被解析为其他内容（例如旧式八进制转义序列）。

此规则的其他**正确**代码示例：

::: correct

```js
/*eslint no-useless-backreference: "error"*/

// comments describe behavior in a browser

/^[\1](a)$/.test("\x01a"); // true. In a character class, \1 is treated as an octal escape sequence.
/^\1$/.test("\x01"); // true. Since the group 1 doesn't exist, \1 is treated as an octal escape sequence.
/^(a)\1\2$/.test("aa\x02"); // true. In this case, \1 is a backreference, \2 is an octal escape sequence.
```

:::

<a id="options"></a>

## 选项

此规则没有选项。