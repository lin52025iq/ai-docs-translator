---
title: func-call-spacing
rule_type: layout
related_rules:
- no-spaced-func
---
调用函数时，开发者可以在函数名和调用它的括号之间插入可选空白。以下各组函数调用是等价的：

```js
alert('Hello');
alert ('Hello');

console.log(42);
console.log (42);

new Date();
new Date ();
```

<a id="rule-details"></a>

## 规则详情

此规则要求或禁止在函数名与调用它的左括号之间添加空格。

<a id="options"></a>

## 选项

此规则接受一个字符串选项：

* `"never"`（默认值）禁止在函数名与左括号之间添加空格。
* `"always"` 要求在函数名与左括号之间添加空格。

此外，在 `"always"` 模式下，还可以设置第二个对象选项，其中包含一个布尔属性 `allowNewlines`。

### never

使用默认选项 `"never"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint func-call-spacing: ["error", "never"]*/

fn ();

fn
();
```

:::

使用默认选项 `"never"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint func-call-spacing: ["error", "never"]*/

fn();
```

:::

### always

使用选项 `"always"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint func-call-spacing: ["error", "always"]*/

fn();

fn
();
```

:::

使用选项 `"always"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint func-call-spacing: ["error", "always"]*/

fn ();
```

:::

#### allowNewlines

默认情况下，`"always"` 不允许换行。若要在 `"always"` 模式下允许换行，请将 `allowNewlines` 选项设为 `true`。规则不会要求换行。

启用 `allowNewlines` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint func-call-spacing: ["error", "always", { "allowNewlines": true }]*/

fn();
```

:::

启用 `allowNewlines` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint func-call-spacing: ["error", "always", { "allowNewlines": true }]*/

fn (); // Newlines are never required.

fn
();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你的项目不需要对函数调用中的空格风格进行统一约束，可以放心关闭此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[disallowSpacesInCallExpression](https://jscs-dev.github.io/rule/disallowSpacesInCallExpression)
* **JSCS**：[requireSpacesInCallExpression](https://jscs-dev.github.io/rule/requireSpacesInCallExpression)
