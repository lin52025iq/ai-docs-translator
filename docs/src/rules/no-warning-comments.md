---
title: no-warning-comments
rule_type: suggestion
---


开发者经常会在尚未完成或需要审查的代码中添加注释。在认为代码已达到可投入生产的状态之前，你很可能需要先修复或审查代码，然后删除这些注释。

```js
// TODO: do something
// FIXME: this is not a good idea
```

<a id="rule-details"></a>

## 规则详情

此规则会报告包含配置中指定的任意预定义术语的注释。

<a id="options"></a>

## 选项

此规则接受一个选项对象字面量：

* `"terms"`：可选的匹配术语数组。默认为 `["todo", "fixme", "xxx"]`。术语匹配时不区分大小写，并且必须是完整单词：`fix` 会匹配 `FIX`，但不会匹配 `fixing`。术语可以由多个单词组成，例如 `really bad idea`。
* `"location"`：可选字符串，用于配置在注释的什么位置检查匹配项。默认为 `"start"`。起始位置从第一个非装饰字符开始，忽略空白字符、换行符以及 `decoration` 中指定的字符。另一个取值是 `anywhere`，表示在注释中的任意位置匹配。
* `"decoration"`：可选字符数组；当 location 为 `"start"` 时，注释开头的这些字符会被忽略。任意连续的空白字符或此属性中的字符都会被忽略。此选项在 location 为 `"anywhere"` 时无效。默认为 `[]`。

对于默认选项 `{ "terms": ["todo", "fixme", "xxx"], "location": "start" }`，以下代码**不正确**：

::: incorrect

```js
/*eslint no-warning-comments: "error"*/

/*
FIXME
*/
function callback(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  // TODO
}
```

:::

对于默认选项 `{ "terms": ["todo", "fixme", "xxx"], "location": "start" }`，以下代码**正确**：

::: correct

```js
/*eslint no-warning-comments: "error"*/

function callback(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  // NOT READY FOR PRIME TIME
  // but too bad, it is not a predefined warning term
}
```

:::

<a id="terms-and-location"></a>

### 术语与位置

对于选项 `{ "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }`，以下代码**不正确**：

::: incorrect

```js
/*eslint no-warning-comments: ["error", { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }]*/

// TODO: this
// todo: this too
// Even this: TODO
/*
 * The same goes for this TODO comment
 * Or a fixme
 * as well as any other term
 */
```

:::

对于选项 `{ "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }`，以下代码**正确**：

::: correct

```js
/*eslint no-warning-comments: ["error", { "terms": ["todo", "fixme", "any other term"], "location": "anywhere" }]*/

// This is to do
// even not any other    term
// any other terminal
/*
 * The same goes for block comments
 * with any other interesting term
 * or fix me this
 */
```

:::

<a id="decoration-characters"></a>

### 装饰字符

对于选项 `{ "decoration": ["*"] }`，以下代码**不正确**：

::: incorrect

```js
/*eslint no-warning-comments: ["error", { "decoration": ["*"] }]*/

//***** todo decorative asterisks are ignored *****//
/**
 * TODO new lines and asterisks are also ignored in block comments.
 */
```

:::

对于选项 `{ "decoration": ["/", "*"] }`，以下代码**不正确**：

::: incorrect

```js
/*eslint no-warning-comments: ["error", { "decoration": ["/", "*"] }]*/

////// TODO decorative slashes and whitespace are ignored //////
//***** todo decorative asterisks are also ignored *****//
/**
 * TODO new lines are also ignored in block comments.
 */
```

:::

对于选项 `{ "decoration": ["/", "*"] }`，以下代码**正确**：

::: correct

```js
/*eslint no-warning-comments: ["error", { "decoration": ["/", "*"] }]*/

//!TODO preceded by non-decoration character
/**
 *!TODO preceded by non-decoration character in a block comment
 */
```

:::

<a id="when-not-to-use-it"></a>

## 不应使用此规则的情况

* 如果你的大型代码库在开发时没有禁止使用这类警告术语的策略，你可能会遇到数百条警告或错误。如果你无法全部修复（例如没有时间），这可能会适得其反，因为你可能会忽略其他警告或错误，或者习惯了大量警告而不再留意它们。
* 原因与上一点相同：不应配置使用频率很高的术语（例如注释中使用的母语中的常见词语）。