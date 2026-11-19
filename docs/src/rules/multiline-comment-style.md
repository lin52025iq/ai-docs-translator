---
title: multiline-comment-style
rule_type: suggestion
---

许多风格指南要求多行注释采用特定的风格。例如，一些风格指南倾向于在多行注释中使用单个块注释，而另一些则倾向于使用连续的行注释。

<a id="rule-details"></a>

## 规则详情

此规则旨在强制多行注释采用特定的风格。

<a id="options"></a>

### 选项

此规则有一个字符串选项，其值可以是以下之一：

* `"starred-block"`（默认）：禁止使用连续的行注释，改用块注释。此外，要求块注释的每一行前都有对齐的 `*` 字符。
* `"bare-block"`：禁止使用连续的行注释，改用块注释，并禁止块注释的每一行前出现 `"*"` 字符。此选项会忽略 JSDoc 注释。
* `"separate-lines"`：禁止使用块注释，改用连续的行注释。默认情况下，此选项会忽略 JSDoc 注释。若要对 JSDoc 注释也应用此规则，请将 `checkJSDoc` 选项设为 `true`。

此规则始终忽略指令注释，例如 `/* eslint-disable */`。

使用默认的 `"starred-block"` 选项时，此规则的错误代码示例：

::: incorrect

```js

/* eslint multiline-comment-style: ["error", "starred-block"] */

// this line
// calls foo()
foo();

/* this line
calls foo() */
foo();

/* this comment
 * is missing a newline after /*
 */

/*
 * this comment
 * is missing a newline at the end */

/*
* the star in this line should have a space before it
 */

/*
 * the star on the following line should have a space before it
*/

```

:::

使用默认的 `"starred-block"` 选项时，此规则的正确代码示例：

::: correct

```js
/* eslint multiline-comment-style: ["error", "starred-block"] */

/*
 * this line
 * calls foo()
 */
foo();

// single-line comment
```

:::

使用 `"bare-block"` 选项时，此规则的错误代码示例：

::: incorrect

```js
/* eslint multiline-comment-style: ["error", "bare-block"] */

// this line
// calls foo()
foo();

/*
 * this line
 * calls foo()
 */
foo();
```

:::

使用 `"bare-block"` 选项时，此规则的正确代码示例：

::: correct

```js
/* eslint multiline-comment-style: ["error", "bare-block"] */

/* this line
   calls foo() */
foo();
```

:::

使用 `"separate-lines"` 选项时，此规则的错误代码示例：

::: incorrect

```js

/* eslint multiline-comment-style: ["error", "separate-lines"] */

/* This line
calls foo() */
foo();

/*
 * This line
 * calls foo()
 */
foo();

```

:::

使用 `"separate-lines"` 选项时，此规则的正确代码示例：

::: correct

```js
/* eslint multiline-comment-style: ["error", "separate-lines"] */

// This line
// calls foo()
foo();

```

:::

使用 `"separate-lines"` 选项并将 `checkJSDoc` 设为 `true` 时，此规则的错误代码示例：

::: incorrect

```js

/* eslint multiline-comment-style: ["error", "separate-lines", { "checkJSDoc": true }] */

/**
 * I am a JSDoc comment
 * and I'm not allowed
 */
foo();

```

:::

使用 `"separate-lines"` 选项并将 `checkJSDoc` 设为 `true` 时，此规则的正确代码示例：

::: correct

```js
/* eslint multiline-comment-style: ["error", "separate-lines", { "checkJSDoc": true }] */

// I am a JSDoc comment
// and I'm not allowed
foo();

```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不想强制多行注释采用特定的风格，可以禁用此规则。
