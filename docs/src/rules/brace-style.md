---
title: brace-style
rule_type: layout
related_rules:
- block-spacing
- space-before-blocks
further_reading:
- https://en.wikipedia.org/wiki/Indent_style
---
花括号风格与编程中的[缩进风格](https://en.wikipedia.org/wiki/Indent_style)密切相关，用于描述花括号相对于控制语句及其主体的位置。世界上的花括号风格可能有十几种，甚至更多。

*唯一正确的花括号风格*是 JavaScript 中最常见的花括号风格之一，其块的左花括号与相应的语句或声明位于同一行。例如：

```js
if (foo) {
  bar();
} else {
  baz();
}
```

唯一正确的花括号风格有一种常见变体，称为 Stroustrup 风格。在这种风格中，`if-else` 结构中的 `else` 语句，以及 `catch` 和 `finally`，都必须另起一行，放在前一个右花括号之后。例如：

```js
if (foo) {
  bar();
}
else {
  baz();
}
```

另一种风格称为 [Allman](https://en.wikipedia.org/wiki/Indent_style#Allman_style) 风格，要求所有花括号都单独占一行，且不额外缩进。例如：

```js
if (foo)
{
  bar();
}
else
{
  baz();
}
```

虽然没有哪种风格被认为优于其他风格，但大多数开发者都认同，在整个项目中保持风格一致，对项目的长期可维护性很重要。

<a id="rule-details"></a>

## 规则详情

此规则强制要求块的花括号风格保持一致。

<a id="options"></a>

## 选项

此规则接受一个字符串选项：

* `"1tbs"`（默认值）强制采用唯一正确的花括号风格。
* `"stroustrup"` 强制采用 Stroustrup 风格。
* `"allman"` 强制采用 Allman 风格。

此规则还接受一个用于例外情况的对象选项：

* `"allowSingleLine": true`（默认值为 `false`）允许块的左、右花括号位于*同一*行。

### 1tbs

使用默认选项 `"1tbs"` 时，此规则的错误代码示例如下：

:::incorrect

```js
/*eslint brace-style: "error"*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

if (foo) {
  bar();
}
else {
  baz();
}

class C
{
    static
    {
        foo();
    }
}
```

:::

使用默认选项 `"1tbs"` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint brace-style: "error"*/

function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
} else {
  baz();
}

try {
  somethingRisky();
} catch(e) {
  handleError();
}

class C {
    static {
        foo();
    }
}

// when there are no braces, there are no problems
if (foo) bar();
else if (baz) boom();
```

:::

使用选项 `"1tbs", { "allowSingleLine": true }` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint brace-style: ["error", "1tbs", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); } else { baz(); }

try { somethingRisky(); } catch(e) { handleError(); }

if (foo) { baz(); } else {
  boom();
}

if (foo) { baz(); } else if (bar) {
  boom();
}

if (foo) { baz(); } else
if (bar) {
  boom();
}

if (foo) { baz(); } else if (bar) {
  boom();
}

try { somethingRisky(); } catch(e) {
  handleError();
}

class C {
    static { foo(); }
}

class D { static { foo(); } }
```

:::

### stroustrup

使用选项 `"stroustrup"` 时，此规则的错误代码示例如下：

:::incorrect

```js
/*eslint brace-style: ["error", "stroustrup"]*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

class C
{
    static
    {
        foo();
    }
}

if (foo) {
  bar();
} else {
  baz();
}
```

:::

使用选项 `"stroustrup"` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint brace-style: ["error", "stroustrup"]*/

function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
}
else {
  baz();
}

try {
  somethingRisky();
}
catch(e) {
  handleError();
}

class C {
    static {
        foo();
    }
}

// when there are no braces, there are no problems
if (foo) bar();
else if (baz) boom();
```

:::

使用选项 `"stroustrup", { "allowSingleLine": true }` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint brace-style: ["error", "stroustrup", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); }
else { baz(); }

try { somethingRisky(); }
catch(e) { handleError(); }

class C {
    static { foo(); }
}

class D { static { foo(); } }
```

:::

### allman

使用选项 `"allman"` 时，此规则的错误代码示例如下：

:::incorrect

```js
/*eslint brace-style: ["error", "allman"]*/

function foo() {
  return true;
}

if (foo)
{
  bar(); }

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

class C {
    static {
        foo();
    }
}

if (foo) {
  bar();
} else {
  baz();
}
```

:::

使用选项 `"allman"` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint brace-style: ["error", "allman"]*/

function foo()
{
  return true;
}

if (foo)
{
  bar();
}

if (foo)
{
  bar();
}
else
{
  baz();
}

try
{
  somethingRisky();
}
catch(e)
{
  handleError();
}

class C
{
    static
    {
        foo();
    }
}

// when there are no braces, there are no problems
if (foo) bar();
else if (baz) boom();
```

:::

使用选项 `"allman", { "allowSingleLine": true }` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint brace-style: ["error", "allman", { "allowSingleLine": true }]*/

function nop() { return; }

if (foo) { bar(); }

if (foo) { bar(); }
else { baz(); }

try { somethingRisky(); }
catch(e) { handleError(); }

class C
{
    static { foo(); }

    static
    { foo(); }
}

class D { static { foo(); } }
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不想强制采用特定的花括号风格，就不要启用此规则。
