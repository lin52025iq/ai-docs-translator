---
title: space-infix-ops
rule_type: layout
---
虽然格式偏好因人而异，但许多风格指南都要求在运算符两侧添加空格，例如：

```js
var sum = 1 + 2;
```

这条规则的支持者认为，这样可以让代码更易读，也更容易发现潜在错误，例如：

```js
var sum = i+++2;
```

虽然这符合 JavaScript 语法，但很难判断作者的意图。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保中缀运算符两侧都有空格。

<a id="options"></a>

## 选项

此规则接受一个选项参数，默认值如下：

```json
"space-infix-ops": ["error", { "int32Hint": false }]
```

### `int32Hint`

将 `int32Hint` 选项设为 `true`（默认值为 `false`），即可允许 `a|0` 不带空格。

```js
var foo = bar|0; // `foo` is forced to be signed 32 bit integer
```

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-infix-ops: "error"*/

a+b

a+ b

a +b

a?b:c

const a={b:1};

var {b=0}=bar;

function foo(a=0) { }
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint space-infix-ops: "error"*/

a + b

a       + b

a ? b : c

const a = {b:1};

var {b = 0} = bar;

function foo(a = 0) { }
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不在意中缀运算符两侧空格的一致性，可以关闭此规则。
