---
title: valid-typeof
rule_type: problem
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
---




对于绝大多数使用场景，`typeof` 运算符的结果都是以下字符串字面量之一：`"undefined"`、`"object"`、`"boolean"`、`"number"`、`"string"`、`"function"`、`"symbol"` 和 `"bigint"`。将 `typeof` 运算符的结果与其他字符串字面量进行比较通常是拼写错误。

<a id="rule-details"></a>

## 规则详情

此规则要求将 `typeof` 表达式与有效的字符串字面量进行比较。

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint valid-typeof: "error"*/

typeof foo === "strnig"
typeof foo == "undefimed"
typeof bar != "nunber"
typeof bar !== "fucntion"
```

:::

此规则下的**正确**代码示例：

::: correct

```js
/*eslint valid-typeof: "error"*/

typeof foo === "string"
typeof bar == "undefined"
typeof foo === baz
typeof bar === typeof qux
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"requireStringLiterals": true` 允许将 `typeof` 表达式仅与字符串字面量或其他 `typeof` 表达式进行比较，并禁止与任何其他值进行比较。默认值为 `false`。

### requireStringLiterals

启用 `{ "requireStringLiterals": true }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

typeof foo === undefined
typeof bar == Object
typeof baz === "strnig"
typeof qux === "some invalid type"
typeof baz === anotherVariable
typeof foo == 5
```

:::

启用 `{ "requireStringLiterals": true }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint valid-typeof: ["error", { "requireStringLiterals": true }]*/

typeof foo === "undefined"
typeof bar == "object"
typeof baz === "string"
typeof bar === typeof qux
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你要对宿主对象使用 `typeof` 运算符，可以考虑关闭此规则。

