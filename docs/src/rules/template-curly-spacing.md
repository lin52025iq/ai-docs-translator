---
title: template-curly-spacing
rule_type: layout
---
我们可以使用一对 `${` 和 `}` 在模板字符串中嵌入表达式。

此规则可以根据风格指南，强制要求在花括号内添加空格。

```js
let hello = `hello, ${people.name}!`;
```

<a id="rule-details"></a>

## 规则详情

此规则旨在确保模板字面量内部的空格用法保持一致。

<a id="options"></a>

## 选项

```json
{
    "template-curly-spacing": ["error", "never"]
}
```

此规则有一个选项，其值可以是 `"never"` 或 `"always"`。

* `"never"`（默认值）- 禁止在花括号内添加空格。
* `"always"` - 要求在花括号内添加一个或多个空格。

### never

以下是使用默认选项 `"never"` 时，此规则判定为**不正确**的代码示例：

::: incorrect

```js
/*eslint template-curly-spacing: "error"*/

`hello, ${ people.name}!`;
`hello, ${people.name }!`;

`hello, ${ people.name }!`;
```

:::

以下是使用默认选项 `"never"` 时，此规则判定为**正确**的代码示例：

::: correct

```js
/*eslint template-curly-spacing: "error"*/

`hello, ${people.name}!`;

`hello, ${
    people.name
}!`;
```

:::

### always

以下是使用选项 `"always"` 时，此规则判定为**不正确**的代码示例：

::: incorrect

```js
/*eslint template-curly-spacing: ["error", "always"]*/

`hello, ${ people.name}!`;
`hello, ${people.name }!`;

`hello, ${people.name}!`;
```

:::

以下是使用选项 `"always"` 时，此规则判定为**正确**的代码示例：

::: correct

```js
/*eslint template-curly-spacing: ["error", "always"]*/

`hello, ${ people.name }!`;

`hello, ${
    people.name
}!`;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不希望收到关于模板字符串中空格用法的提示，可以放心禁用此规则。
