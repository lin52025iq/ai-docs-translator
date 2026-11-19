---
title: max-lines
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
further_reading:
- https://web.archive.org/web/20160725154648/http://www.mind2b.com/component/content/article/24-software-module-size-and-file-size
---


有些人认为大型文件是一种代码异味。大型文件往往承担很多工作，让人难以了解其中的情况。虽然没有客观标准规定文件中可接受的最大行数，但大多数人都会认同，行数不应达到数千行。通常建议将行数控制在 100 到 500 行之间。

<a id="rule-details"></a>

## 规则详情

此规则强制限制每个文件的最大行数，以提高可维护性并降低复杂性。

请注意，如果文件以换行符结尾，大多数编辑器会在末尾显示一个额外的空行。此规则不会计算这一额外行。

<a id="options"></a>

## 选项

此规则有一个数字或对象选项：

* `"max"`（默认值为 `300`）强制限制文件的最大行数。

* `"skipBlankLines": true` 忽略仅由空白字符组成的行。

* `"skipComments": true` 忽略仅包含注释的行。

### max

此规则的错误代码示例（max 值为 `3`）：

::: incorrect

```js
/*eslint max-lines: ["error", 3]*/
let a,
    b,
    c;
```

:::

::: incorrect

```js
/*eslint max-lines: ["error", 3]*/

let a,
    b,c;
```

:::

::: incorrect

```js
/*eslint max-lines: ["error", 3]*/
// a comment
let a,
    b,c;
```

:::

此规则的正确代码示例（max 值为 `3`）：

::: correct

```js
/*eslint max-lines: ["error", 3]*/
let a,
    b, c;
```

:::

::: correct

```js
/*eslint max-lines: ["error", 3]*/

let a, b, c;
```

:::

::: correct

```js
/*eslint max-lines: ["error", 3]*/
// a comment
let a, b, c;
```

:::

### skipBlankLines

使用 `{ "skipBlankLines": true }` 选项时的错误代码示例：

::: incorrect

```js
/*eslint max-lines: ["error", {"max": 3, "skipBlankLines": true}]*/

let a,
    b,
    c;
```

:::

使用 `{ "skipBlankLines": true }` 选项时的正确代码示例：

::: correct

```js
/*eslint max-lines: ["error", {"max": 3, "skipBlankLines": true}]*/

let a,
    b, c;
```

:::

### skipComments

使用 `{ "skipComments": true }` 选项时的错误代码示例：

::: incorrect

```js
/*eslint max-lines: ["error", {"max": 2, "skipComments": true}]*/
// a comment
let a,
    b,
    c;
```

:::

使用 `{ "skipComments": true }` 选项时的正确代码示例：

::: correct

```js
/*eslint max-lines: ["error", {"max": 2, "skipComments": true}]*/
// a comment
let a,
    b, c;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不关心文件中的行数，可以关闭此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[maximumNumberOfLines](https://jscs-dev.github.io/rule/maximumNumberOfLines)
