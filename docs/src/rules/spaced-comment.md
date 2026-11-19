---
title: spaced-comment
rule_type: suggestion
related_rules:
- spaced-line-comment
---
一些风格指南要求或禁止在注释开头的 `//` 或 `/*` 后立即出现空白。
在 `//` 或 `/*` 后添加空白有助于阅读注释文本。
另一方面，注释掉代码时，如果不必在 `//` 或 `/*` 后添加空白，操作会更方便。

<a id="rule-details"></a>
## 规则详情

此规则会确保注释开头 `//` 或 `/*` 后的空格用法保持一致。它还针对各种文档注释风格提供了若干例外。

<a id="options"></a>
## 选项

此规则接受两个选项。

* 第一个选项是字符串，可以是 `"always"` 或 `"never"`。默认值为 `"always"`。

    * 如果为 `"always"`，则 `//` 或 `/*` 后必须至少有一个空白字符。

    * 如果为 `"never"`，则后面不应有空白字符。

* 此规则还可以接受第二个选项，即包含以下任一键的对象：`"exceptions"` 和 `"markers"`。

    * `"exceptions"` 的值是一个字符串模式数组，其中的模式被视为此规则的例外。如果注释开头与某个模式匹配，并且该模式重复直到行尾，或者在单行注释中重复直到 `*/`，规则就不会发出警告。
    请注意，如果第一个参数是 `"never"`，则会忽略例外。

    ```js
    "spaced-comment": ["error", "always", { "exceptions": ["-", "+"] }]
    ```

    * `"markers"` 的值是一个字符串模式数组，这些模式被视为文档块风格注释的标记，例如额外的 `/`，用于表示由 doxygen、vsdoc 等工具读取的文档。这类注释必须包含额外字符。
    无论第一个参数的值是什么，`"markers"` 数组都会生效，例如 `"always"` 或 `"never"`。

    ```js
    "spaced-comment": ["error", "always", { "markers": ["/"] }]
    ```

标记和例外的区别在于，标记只会出现在注释开头，而例外可以出现在注释字符串的任何位置。

你也可以为块注释和行注释分别定义例外和标记。`"block"` 对象还可以包含一个额外的键 `"balanced"`，其布尔值用于指定行内块注释的空格是否应成对出现。默认值为 `false`。

* 如果 `"balanced": true` 且使用 `"always"`，则 `/*` 后必须至少有一个空白字符，且 `*/` 前必须至少有一个空白字符。

* 如果 `"balanced": true` 且使用 `"never"`，则 `/*` 后和 `*/` 前都不应有空白字符。

* 如果 `"balanced": false`，则不强制要求空白成对出现。

```json
"spaced-comment": ["error", "always", {
    "line": {
        "markers": ["/"],
        "exceptions": ["-", "+"]
    },
    "block": {
        "markers": ["!"],
        "exceptions": ["*"],
        "balanced": true
    }
}]
```

### always

此规则在使用 `"always"` 选项时的错误代码示例：

::: incorrect

```js
/*eslint spaced-comment: ["error", "always"]*/

//This is a comment with no whitespace at the beginning

/*This is a comment with no whitespace at the beginning */
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true } }] */
/* This is a comment with whitespace at the beginning but not the end*/
```

:::

此规则在使用 `"always"` 选项时的正确代码示例：

::: correct

```js
/* eslint spaced-comment: ["error", "always"] */

// This is a comment with a whitespace at the beginning

/* This is a comment with a whitespace at the beginning */

/*
 * This is a comment with a whitespace at the beginning
 */

/*
This comment has a newline
*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always"] */

/**
* I am jsdoc
*/
```

:::

### never

此规则在使用 `"never"` 选项时的错误代码示例：

::: incorrect

```js
/*eslint spaced-comment: ["error", "never"]*/

// This is a comment with a whitespace at the beginning

/* This is a comment with a whitespace at the beginning */

/* \nThis is a comment with a whitespace at the beginning */
```

:::

::: incorrect

```js
/*eslint spaced-comment: ["error", "never", { "block": { "balanced": true } }]*/
/*This is a comment with whitespace at the end */
```

:::

此规则在使用 `"never"` 选项时的正确代码示例：

::: correct

```js
/*eslint spaced-comment: ["error", "never"]*/

/*This is a comment with no whitespace at the beginning */
```

:::

::: correct

```js
/*eslint spaced-comment: ["error", "never"]*/

/**
* I am jsdoc
*/
```

:::

### exceptions

此规则在使用 `"always"` 选项并结合 `"exceptions"` 时的错误代码示例：

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["-"] } }] */

//--------------
// Comment block
//--------------
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-", "+"] }] */

//------++++++++
// Comment block
//------++++++++
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-", "+"] }] */

/*------++++++++*/
/* Comment block */
/*------++++++++*/
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "line": { "exceptions": ["-+"] } }] */

/*-+-+-+-+-+-+-+*/
// Comment block
/*-+-+-+-+-+-+-+*/
```

:::

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["*"] } }] */

/******** COMMENT *******/
```

:::

此规则在使用 `"always"` 选项并结合 `"exceptions"` 时的正确代码示例：

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-"] }] */

//--------------
// Comment block
//--------------
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "line": { "exceptions": ["-"] } }] */

//--------------
// Comment block
//--------------
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */

/****************
 * Comment block
 ****************/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "exceptions": ["-+"] }] */

//-+-+-+-+-+-+-+
// Comment block
//-+-+-+-+-+-+-+

/*-+-+-+-+-+-+-+*/
// Comment block
/*-+-+-+-+-+-+-+*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["-+"] } }] */

/*-+-+-+-+-+-+-+*/
// Comment block
/*-+-+-+-+-+-+-+*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "block": { "exceptions": ["*"] } }] */

/***************/

/********
COMMENT
*******/
```

:::

### markers

此规则在使用 `"always"` 选项并结合 `"markers"` 时的错误代码示例：

::: incorrect

```js
/* eslint spaced-comment: ["error", "always", { "markers": ["/"] }] */

///This is a comment with a marker but without whitespace
```

:::

::: incorrect

```js
/*eslint spaced-comment: ["error", "always", { "block": { "markers": ["!"], "balanced": true } }]*/
/*! This is a comment with a marker but without whitespace at the end*/
```

:::

::: incorrect

```js
/*eslint spaced-comment: ["error", "never", { "block": { "markers": ["!"], "balanced": true } }]*/
/*!This is a comment with a marker but with whitespace at the end */
```

:::

此规则在使用 `"always"` 选项并结合 `"markers"` 时的正确代码示例：

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "markers": ["/"] }] */

/// This is a comment with a marker
```

:::

::: correct

```js
/*eslint spaced-comment: ["error", "never", { "markers": ["!<"] }]*/

//!<This is a line comment with a marker

/*!<this is a block comment with a marker
subsequent lines are ignored
*/
```

:::

::: correct

```js
/* eslint spaced-comment: ["error", "always", { "markers": ["global"] }] */

/*global ABC*/
```

:::

