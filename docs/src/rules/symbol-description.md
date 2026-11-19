---
title: symbol-description
rule_type: suggestion
further_reading:
- https://www.ecma-international.org/ecma-262/6.0/#sec-symbol-description
---


`Symbol` 函数可以有一个可选的描述：

```js
const foo = Symbol("some description");

const someString = "some description";
const bar = Symbol(someString);
```

使用 `description` 可以让调试更轻松：记录 symbol 时会使用该描述：

```js
const foo = Symbol("some description");

> console.log(foo);
// Symbol(some description)
```

在调试过程中观察到 symbol 时，该描述也有助于识别它。

<a id="rule-details"></a>
## 规则详情

此规则要求创建 symbol 时提供描述。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint symbol-description: "error"*/

const foo = Symbol();
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint symbol-description: "error"*/

const foo = Symbol("some description");

const someString = "some description";
const bar = Symbol(someString);
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不应使用

此规则不应在 ES3/5 环境中使用。
此外，如果你不想强制要求创建 Symbol 时提供 `description`，可以安全地关闭此规则。
