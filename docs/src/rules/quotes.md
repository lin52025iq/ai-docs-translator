---
title: quotes
rule_type: layout
---
JavaScript 可以通过三种方式定义字符串：双引号、单引号和反引号（从 ECMAScript 6 开始支持）。例如：

```js
var double = "double";
var single = 'single';
var backtick = `backtick`;    // ES6 only
```

以上每一行都会创建一个字符串，在某些情况下，这些方式可以互换使用。除了模板字面量（它允许解释其中嵌入的表达式）之外，在代码库中选择如何定义字符串属于风格问题。

许多代码库要求以一致的方式定义字符串。

<a id="rule-details"></a>

## 规则详情

此规则要求一致地使用反引号、双引号或单引号。

此规则能够识别诸如 `"use strict"` 这样的指令序言；如果更改指令序言的解释方式，则不会对此类指令发出警告或自动修复。

<a id="options"></a>

## 选项

此规则有两个选项：字符串选项和对象选项。

字符串选项：

* `"double"`（默认值）要求尽可能使用双引号
* `"single"` 要求尽可能使用单引号
* `"backtick"` 要求尽可能使用反引号

对象选项：

* `"avoidEscape": true` 允许字符串使用单引号或双引号，前提是字符串中包含一个引号，否则该引号必须转义
* `"allowTemplateLiterals": true` 允许字符串使用反引号

**已弃用**：对象属性 `avoid-escape` 已弃用；请改用对象属性 `avoidEscape`。

<a id="double"></a>

### 双引号

在默认的 `"double"` 选项下，以下代码示例不符合此规则：

::: incorrect

```js
/*eslint quotes: ["error", "double"]*/

var single = 'single';
var unescaped = 'a string containing "double" quotes';
var backtick = `back\ntick`; // you can use \n in single or double quoted strings
```

:::

在默认的 `"double"` 选项下，以下代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "double"]*/

var double = "double";
var backtick = `back
tick`;  // backticks are allowed due to newline
var backtick = tag`backtick`; // backticks are allowed due to tag
```

:::

<a id="single"></a>

### 单引号

在 `"single"` 选项下，以下代码示例不符合此规则：

::: incorrect

```js
/*eslint quotes: ["error", "single"]*/

var double = "double";
var unescaped = "a string containing 'single' quotes";
```

:::

在 `"single"` 选项下，以下代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "single"]*/

var single = 'single';
var backtick = `back${x}tick`; // backticks are allowed due to substitution
```

:::

<a id="backticks"></a>

### 反引号

在 `"backtick"` 选项下，以下代码示例不符合此规则：

::: incorrect

```js
/*eslint quotes: ["error", "backtick"]*/

var single = 'single';
var double = "double";
var unescaped = 'a string containing `backticks`';
```

:::

在 `"backtick"` 选项下，以下代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "backtick"]*/

"use strict"; // directives must use single or double quotes
var backtick = `backtick`;
var obj = { 'prop-name': `value` }; // backticks not allowed for property names
```

:::

### avoidEscape

在 `"double", { "avoidEscape": true }` 选项下，以下额外代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "double", { "avoidEscape": true }]*/

var single = 'a string containing "double" quotes';
```

:::

在 `"single", { "avoidEscape": true }` 选项下，以下额外代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "single", { "avoidEscape": true }]*/

var double = "a string containing 'single' quotes";
```

:::

在 `"backtick", { "avoidEscape": true }` 选项下，以下额外代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "backtick", { "avoidEscape": true }]*/

var double = "a string containing `backtick` quotes"
```

:::

### allowTemplateLiterals

在 `"double", { "allowTemplateLiterals": true }` 选项下，以下额外代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "double", { "allowTemplateLiterals": true }]*/

var double = "double";
var double = `double`;
```

:::

在 `"single", { "allowTemplateLiterals": true }` 选项下，以下额外代码示例符合此规则：

::: correct

```js
/*eslint quotes: ["error", "single", { "allowTemplateLiterals": true }]*/

var single = 'single';
var single = `single`;
```

:::

`{ "allowTemplateLiterals": false }` 不会禁止使用所有模板字面量。如果要禁止任何形式的模板字面量，请使用 [no-restricted-syntax](no-restricted-syntax)，并指定 `TemplateLiteral` 选择器。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果不需要统一字符串风格，可以放心禁用此规则。