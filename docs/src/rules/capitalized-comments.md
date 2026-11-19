---
title: capitalized-comments
rule_type: suggestion
---



注释可用于为未来的开发者留下信息。为了让这些信息有用且不造成干扰，有时希望注释遵循特定的风格。注释格式风格的一个方面是注释的第一个单词应当首字母大写还是小写。

一般来说，任何一种注释风格都没有高下之分，但许多开发者都认同，保持风格一致有助于提高项目的可维护性。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保代码库中的注释风格一致，具体来说，就是要求或禁止注释的第一个词以大写字母开头。使用不区分大小写的字母时，此规则不会发出警告。

默认情况下，此规则要求注释以非小写字母开头。

此规则中**错误**代码的示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error"] */

// lowercase comment

```

:::

此规则中**正确**代码的示例：

:::correct

```js
/* eslint capitalized-comments: error */

// Capitalized comment

// 1. Non-letter at beginning of comment

// 丈 Non-Latin character at beginning of comment

/* istanbul ignore next */
/* jscs:enable */
/* jshint asi:true */
/* global foo */
/* globals foo */
/* exported myVar */
// https://github.com

/* eslint semi:2 */
/* eslint-disable */
foo
/* eslint-enable */
// eslint-disable-next-line
baz
bar // eslint-disable-line

```

:::

<a id="options"></a>

## 选项

此规则有两个选项：字符串值 `"always"` 或 `"never"`，用于决定是否要求或禁止注释第一个单词的首字母大写；还可以选择提供一个包含此规则更多配置参数的对象。

支持的对象选项如下：

* `ignorePattern`：一个字符串，表示此规则应忽略的单词的正则表达式模式。如果注释的第一个单词与该模式匹配，此规则就不会报告该注释。
    * 请注意，以下单词始终会被此规则忽略：`["jscs", "jshint", "eslint", "istanbul", "global", "globals", "exported"]`。
* `ignoreInlineComments`：如果此选项为 `true`，此规则不会报告代码中间的注释。默认值为 `false`。
* `ignoreConsecutiveComments`：如果此选项为 `true`，只要违反规则的注释紧跟在另一个注释后面，此规则就不会报告该注释。默认值为 `false`。

以下是一个配置示例：

```json
{
    "capitalized-comments": [
        "error",
        "always",
        {
            "ignorePattern": "pragma|ignored",
            "ignoreInlineComments": true
        }
    ]
}
```

<a id="always"></a>

### `"always"`

使用 `"always"` 选项时，此规则会报告所有以小写字母开头的注释。这是此规则的默认配置。

请注意，配置注释以及以 URL 开头的注释永远不会被报告。

此规则中**错误**代码的示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "always"] */

// lowercase comment

```

:::

此规则中**正确**代码的示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always"] */

// Capitalized comment

// 1. Non-letter at beginning of comment

// 丈 Non-Latin character at beginning of comment

/* istanbul ignore next */
/* jscs:enable */
/* jshint asi:true */
/* global foo */
/* globals foo */
/* exported myVar */
// https://github.com

/* eslint semi:2 */
/* eslint-disable */
foo
/* eslint-enable */
// eslint-disable-next-line
baz
bar // eslint-disable-line

```

:::

<a id="never"></a>

### `"never"`

使用 `"never"` 选项时，此规则会报告所有以大写字母开头的注释。

使用 `"never"` 选项时，**错误**代码的示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "never"] */

// Capitalized comment

```

:::

使用 `"never"` 选项时，**正确**代码的示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "never"] */

// lowercase comment

// 1. Non-letter at beginning of comment

// 丈 Non-Latin character at beginning of comment

```

:::

<a id="ignorepattern"></a>

### `ignorePattern`

`ignorePattern` 对象接受一个字符串值，该值用作正则表达式，并应用于注释的第一个单词。

将 `"ignorePattern"` 选项设置为 `"pragma"` 时，**正确**代码的示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "ignorePattern": "pragma" }] */

function foo() {
    /* pragma wrap(true) */
}

```

:::

<a id="ignoreinlinecomments"></a>

### `ignoreInlineComments`

将 `ignoreInlineComments` 选项设为 `true` 时，代码中间的注释（注释起始位置所在行上有一个标记，注释结束位置所在行上也有另一个标记）不会被此规则报告。

将 `"ignoreInlineComments"` 选项设为 `true` 时，**正确**代码的示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "ignoreInlineComments": true }] */

function foo(/* ignored */ a) {
}

```

:::

<a id="ignoreconsecutivecomments"></a>

### `ignoreConsecutiveComments`

如果将 `ignoreConsecutiveComments` 选项设为 `true`，那么只要违反规则的注释紧跟在另一个注释后面，此规则就不会报告该注释。此行为可以连续应用多次。

将 `ignoreConsecutiveComments` 设为 `true` 时，**正确**代码的示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */

foo();
// This comment is valid since it has the correct capitalization.
// this comment is ignored since it follows another comment,
// and this one as well because it follows yet another comment.

bar();
/* Here is a block comment which has the correct capitalization, */
/* but this one is ignored due to being consecutive; */
/*
 * in fact, even if any of these are multi-line, that is fine too.
 */
```

:::

将 `ignoreConsecutiveComments` 设为 `true` 时，**错误**代码的示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "always", { "ignoreConsecutiveComments": true }] */

foo();
// this comment is invalid, but only on this line.
// this comment does NOT get reported, since it is a consecutive comment.
```

:::

<a id="use-different-options-for-line-and-block-comments"></a>

### 为行注释和块注释使用不同选项

如果希望为行注释和块注释使用不同的配置，可以使用两个不同的对象配置（请注意，大小写选项对行注释和块注释的要求始终一致）：

```json
{
    "capitalized-comments": [
        "error",
        "always",
        {
            "line": {
                "ignorePattern": "pragma|ignored",
            },
            "block": {
                "ignoreInlineComments": true,
                "ignorePattern": "ignored"
            }
        }
    ]
}
```

使用不同的行注释和块注释配置时，**错误**代码的示例：

:::incorrect

```js
/* eslint capitalized-comments: ["error", "always", { "block": { "ignorePattern": "blockignore" } }] */

// capitalized line comment, this is incorrect, blockignore does not help here
/* lowercased block comment, this is incorrect too */

```

:::

使用不同的行注释和块注释配置时，**正确**代码的示例：

:::correct

```js
/* eslint capitalized-comments: ["error", "always", { "block": { "ignorePattern": "blockignore" } }] */

// Uppercase line comment, this is correct
/* blockignore lowercase block comment, this is correct due to ignorePattern */

```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不在意代码库中注释的语法风格，可以禁用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[requireCapitalizedComments](https://jscs-dev.github.io/rule/requireCapitalizedComments)
* **JSCS**：[disallowCapitalizedComments](https://jscs-dev.github.io/rule/disallowCapitalizedComments)
