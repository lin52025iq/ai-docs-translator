---
title: no-empty-character-class
rule_type: problem
---



由于正则表达式中的空字符类无法匹配任何内容，它们可能是输入错误。

```js
const foo = /^abc[]/;
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在正则表达式中使用空字符类。

此规则中**不正确**代码的示例：

::: incorrect

```js
/*eslint no-empty-character-class: "error"*/

/^abc[]/.test("abcdefg"); // false
"abcdefg".match(/^abc[]/); // null

/^abc[[]]/v.test("abcdefg"); // false
"abcdefg".match(/^abc[[]]/v); // null

/^abc[[]--[x]]/v.test("abcdefg"); // false
"abcdefg".match(/^abc[[]--[x]]/v); // null

/^abc[[d]&&[]]/v.test("abcdefg"); // false
"abcdefg".match(/^abc[[d]&&[]]/v); // null

const regex = /^abc[d[]]/v;
regex.test("abcdefg"); // true, the nested `[]` has no effect
"abcdefg".match(regex); // ["abcd"]
regex.test("abcefg"); // false, the nested `[]` has no effect
"abcefg".match(regex); // null
regex.test("abc"); // false, the nested `[]` has no effect
"abc".match(regex); // null
```

:::

此规则中**正确**代码的示例：

::: correct

```js
/*eslint no-empty-character-class: "error"*/

/^abc/.test("abcdefg"); // true
"abcdefg".match(/^abc/); // ["abc"]

/^abc[a-z]/.test("abcdefg"); // true
"abcdefg".match(/^abc[a-z]/); // ["abcd"]

/^abc[^]/.test("abcdefg"); // true
"abcdefg".match(/^abc[^]/); // ["abcd"]
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

此规则不会报告传递给 `RegExp` 构造函数调用的字符串参数中的空字符类。

本规则发生*漏报*的示例：

```js
/*eslint no-empty-character-class: "error"*/

const abcNeverMatches = new RegExp("^abc[]");
```
