---
title: no-new
rule_type: suggestion
---


使用构造函数时，通常会通过 `new` 创建特定类型的对象，并将该对象存储在变量中，例如：

```js
const person = new Person();
```

使用 `new` 却不存储结果的情况则不太常见，例如：

```js
new Person();
```

在这种情况下，创建的对象会被丢弃，因为没有在任何地方存储对它的引用。在许多情况下，这意味着应该将构造函数替换为不需要使用 `new` 的函数。

<a id="rule-details"></a>

## 规则详情

此规则旨在保持一致性和惯例，禁止使用 `new` 关键字调用构造函数，却不将生成的对象赋值给变量。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-new: "error"*/

new Thing();
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-new: "error"*/

const thing = new Thing();

Foo();
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
