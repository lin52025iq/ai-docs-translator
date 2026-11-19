---
title: no-unneeded-ternary
rule_type: suggestion
related_rules:
- no-ternary
- no-nested-ternary
---



在 JavaScript 中，一个常见错误是使用条件表达式在两个布尔值之间进行选择，而不是使用 `!` 将测试结果转换为布尔值。
以下是一些示例：

```js
// Bad
const isYes = answer === 1 ? true : false;

// Good
const isYes = answer === 1;

// Bad
const isNo = answer === 1 ? false : true;

// Good
const isNo = answer !== 1;
```

另一个常见错误是将同一个变量同时用作条件测试和后续表达式。在这种情况下，可以使用逻辑 `OR` 实现相同的功能。
示例如下：

```js
// Bad
foo(bar ? bar : 1);

// Good
foo(bar || 1);
```

<a id="rule-details"></a>

## 规则详情

当存在更简单的替代写法时，此规则会禁止使用三元运算符。

此规则下的错误代码示例：

::: incorrect

```js
/*eslint no-unneeded-ternary: "error"*/

const a = x === 2 ? true : false;

const b = x ? true : false;
```

:::

此规则下的正确代码示例：

::: correct

```js
/*eslint no-unneeded-ternary: "error"*/

const a = x === 2 ? "Yes" : "No";

const b = x !== false;

const c = x ? "Yes" : "No";

const d = x ? y : x;

f(x ? x : 1); // default assignment - would be disallowed if defaultAssignment option set to false. See option details below.
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"defaultAssignment": true`（默认值）允许将条件表达式用作默认赋值模式
* `"defaultAssignment": false` 禁止将条件表达式用作默认赋值模式

### defaultAssignment

设置为 `true` 时（也是默认值），`defaultAssignment` 选项允许使用 `x ? x : expr` 形式的表达式（其中 `x` 是任意标识符，`expr` 是任意表达式）。

启用 `{ "defaultAssignment": false }` 选项后，此规则下其他错误代码示例如下：

::: incorrect

```js
/*eslint no-unneeded-ternary: ["error", { "defaultAssignment": false }]*/

const a = x ? x : 1;

f(x ? x : 1);
```

:::

请注意，`defaultAssignment: false` 仍允许使用 `x ? expr : x` 形式的表达式（标识符位于三元表达式右侧）。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不在意条件表达式中不必要的复杂性，可以关闭此规则。
