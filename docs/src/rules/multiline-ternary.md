---
title: multiline-ternary
rule_type: layout
related_rules:
- operator-linebreak
---
JavaScript 允许在三元表达式的操作数之间换行，这有助于提高程序的可读性。

例如：

```js
var foo = bar > baz ? value1 : value2;
```

上面的代码可以改写为以下形式，以提高可读性并更清晰地划分操作数：

```js

var foo = bar > baz ?
    value1 :
    value2;

var foo = bar > baz
    ? value1
    : value2;
```

<a id="rule-details"></a>

## 规则详情

此规则强制要求或禁止在三元表达式的操作数之间换行。
注意：此规则不强制要求运算符位于特定位置。如果你希望强制规定运算符的位置，请参阅 [operator-linebreak](operator-linebreak) 规则。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"always"`（默认值）强制要求在三元表达式的操作数之间换行。
* `"always-multiline"` 在表达式跨越多行时，强制要求在三元表达式的操作数之间换行。
* `"never"` 禁止在三元表达式的操作数之间换行。

<a id="always"></a>

### 始终换行

这是默认选项。

使用 `"always"` 选项时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint multiline-ternary: ["error", "always"]*/

foo > bar ? value1 : value2;

foo > bar ? value :
    value2;

foo > bar ?
    value : value2;
```

:::

使用 `"always"` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint multiline-ternary: ["error", "always"]*/

foo > bar ?
    value1 :
    value2;

foo > bar ?
    (baz > qux ?
        value1 :
        value2) :
    value3;

foo > bar
    ? (baz > qux
        ? value1
        : value2)
    : value3;
```

:::

<a id="always-multiline"></a>

### 多行时始终换行

使用 `"always-multiline"` 选项时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint multiline-ternary: ["error", "always-multiline"]*/

foo > bar ? value1 :
    value2;

foo > bar ?
    value1 : value2;

foo > bar &&
    bar > baz ? value1 : value2;
```

:::

使用 `"always-multiline"` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint multiline-ternary: ["error", "always-multiline"]*/

foo > bar ? value1 : value2;

foo > bar ?
    value1 :
    value2;

foo > bar ?
    (baz > qux ? value1 : value2) :
    value3;

foo > bar ?
    (baz > qux ?
        value1 :
        value2) :
    value3;

foo > bar &&
    bar > baz ?
        value1 :
        value2;

foo > bar
    ? baz > qux
        ? value1
        : value2
    : value3;
```

:::

<a id="never"></a>

### 从不换行

使用 `"never"` 选项时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint multiline-ternary: ["error", "never"]*/

foo > bar ? value :
    value2;

foo > bar ?
    value : value2;

foo >
    bar ?
    value1 :
    value2;
```

:::

使用 `"never"` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint multiline-ternary: ["error", "never"]*/

foo > bar ? value1 : value2;

foo > bar ? (baz > qux ? value1 : value2) : value3;

foo > bar ? (
    baz > qux ? value1 : value2
) : value3;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你对三元表达式的操作数是否应该换行没有严格的约定，可以放心地禁用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[requireMultiLineTernary](https://jscs-dev.github.io/rule/requireMultiLineTernary)

