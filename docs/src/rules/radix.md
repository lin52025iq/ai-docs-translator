---
title: radix
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
- https://davidwalsh.name/parseint-radix
---



使用 `parseInt()` 函数时，通常会省略第二个参数（基数），让函数尝试根据第一个参数判断数字的类型。默认情况下，`parseInt()` 会自动识别十进制和十六进制（通过 `0x` 前缀）。在 ECMAScript 5 之前，`parseInt()` 也会自动识别八进制字面量，这会导致问题，因为许多开发者以为开头的 `0` 会被忽略。

这种困惑促使人们建议始终为 `parseInt()` 使用基数参数，以避免意外后果。因此，不要这样写：

```js
const num = parseInt("071");      // 57
```

而要这样写：

```js
const num = parseInt("071", 10);  // 71
```

ECMAScript 5 改变了 `parseInt()` 的行为，使其不再自动识别八进制字面量，而是将它们视为十进制字面量。不过，第一个参数按十六进制和十进制解释时的差异，使许多开发者仍继续使用基数参数，以确保字符串按预期方式解析。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止字符串被意外转换为与预期基数不同的数字。

此规则的错误代码示例：

::: incorrect

```js
/*eslint radix: "error"*/

const num = parseInt("071");

const num1 = parseInt(someValue);

const num2 = parseInt("071", "abc");

const num3 = parseInt("071", 37);

const num4 = parseInt();
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint radix: "error"*/

const num = parseInt("071", 10);

const num1 = parseInt("071", 8);

const num2 = parseFloat(someValue);
```

:::

<a id="options"></a>

## 选项

**已弃用：**字符串选项 `"always"` 和 `"as-needed"` 已弃用。设置其中任一选项都不会改变此规则的行为；此规则现在始终要求提供基数，这与指定 `"always"` 选项时的行为相同。由于默认基数取决于 `parseInt()` 的第一个参数，此规则认为始终需要提供第二个参数（基数）。

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你希望在未指定基数参数时使用 `parseInt()` 函数的默认行为，可以关闭此规则。
