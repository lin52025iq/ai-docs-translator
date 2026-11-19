---
title: no-cond-assign
rule_type: problem
---



在条件语句中，很容易将比较运算符（例如 `==`）误写成赋值运算符（例如 `=`）。例如：

```js
// Check the user's job title
if (user.jobTitle = "manager") {
    // user.jobTitle is now incorrect
}
```

在条件语句中使用赋值运算符有其合理用途。不过，有时很难判断某个赋值是否出于有意。

<a id="rule-details"></a>

## 规则详情

此规则禁止在 `if`、`for`、`while` 和 `do...while` 语句的测试条件中使用含义不明确的赋值运算符。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"except-parens"`（默认）仅当测试条件中的赋值被括号括起时才允许使用（例如，允许在 `while` 或 `do...while` 循环的测试条件中重新赋值给变量）。
* `"always"` 禁止在测试条件中进行任何赋值。

<a id="except-parens"></a>

### except-parens

以下是使用默认选项 `"except-parens"` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint no-cond-assign: "error"*/

// Unintentional assignment
let x;
if (x = 0) {
    const b = 1;
}

// Practical example that is similar to an error
const setHeight = function (someNode) {
    do {
        someNode.height = "100px";
    } while (someNode = someNode.parentNode);
}
```

:::

以下是使用默认选项 `"except-parens"` 时符合此规则的代码示例：

::: correct

```js
/*eslint no-cond-assign: "error"*/

// Assignment replaced by comparison
let x;
if (x === 0) {
    const b = 1;
}

// Practical example that wraps the assignment in parentheses
const setHeight = function (someNode) {
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode));
}

// Practical example that wraps the assignment and tests for 'null'
const set_height = function (someNode) {
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode) !== null);
}
```

:::

<a id="always"></a>

### always

以下是使用选项 `"always"` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint no-cond-assign: ["error", "always"]*/

// Unintentional assignment
let x;
if (x = 0) {
    const b = 1;
}

// Practical example that is similar to an error
const setHeight = function (someNode) {
    do {
        someNode.height = "100px";
    } while (someNode = someNode.parentNode);
}

// Practical example that wraps the assignment in parentheses
const set_height = function (someNode) {
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode));
}

// Practical example that wraps the assignment and tests for 'null'
const heightSetter = function (someNode) {
    do {
        someNode.height = "100px";
    } while ((someNode = someNode.parentNode) !== null);
}
```

:::

以下是使用选项 `"always"` 时符合此规则的代码示例：

::: correct

```js
/*eslint no-cond-assign: ["error", "always"]*/

// Assignment replaced by comparison
let x;
if (x === 0) {
    const b = 1;
}
```

:::
