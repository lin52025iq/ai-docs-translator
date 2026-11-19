---
title: no-undefined
rule_type: suggestion
related_rules:
- no-undef-init
- no-void
- no-shadow-restricted-names
- no-global-assign
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
- https://javascriptweblog.wordpress.com/2010/08/16/understanding-undefined-and-preventing-referenceerrors/
- https://es5.github.io/#x15.1.1.3
---


在 JavaScript 中，`undefined` 变量实际上是全局对象的一个属性。因此，在 ECMAScript 3 中，可以改写 `undefined` 的值。尽管 ECMAScript 5 禁止改写 `undefined`，但仍然可以遮蔽 `undefined`，例如：

```js
function doSomething(data) {
    const undefined = "hi";

    // doesn't do what you think it does
    if (data === undefined) {
        // ...
    }

}
```

由于 `undefined` 可以被改写或遮蔽，读取 `undefined` 时可能会得到意料之外的值。（`null` 则不会如此，因为它是一个关键字，始终会产生相同的值。）为避免这种情况，可以完全不使用 `undefined`；一些风格指南就建议这样做，而本规则也强制执行这一做法。这些风格指南还建议：

* 应为 `undefined` 的变量只需保持未初始化状态。（在 JavaScript 中，所有未初始化的变量都会自动获得 `undefined` 值。）
* 应使用 `typeof` 检查值是否为 `undefined`。
* 必要时使用 `void` 运算符生成 `undefined` 值。

或者，你也可以使用 [no-global-assign](no-global-assign) 和 [no-shadow-restricted-names](no-shadow-restricted-names) 规则，防止 `undefined` 被遮蔽或赋予其他值。这样可以确保 `undefined` 始终保持其原本预期的值。

<a id="rule-details"></a>

## 规则详情

本规则旨在消除对 `undefined` 的使用，因此每当使用它时都会发出警告。

本规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-undefined: "error"*/

const foo = undefined;

const undefined = "foo";

if (foo === undefined) {
    // ...
}

function baz(undefined) {
    // ...
}

bar(undefined, "lorem");
```

:::

本规则的**正确**代码示例：

::: correct

```js
/*eslint no-undefined: "error"*/

const foo = void 0;

const Undefined = "foo";

if (typeof foo === "undefined") {
    // ...
}

global.undefined = "foo";

bar(void 0, "lorem");
```

:::

<a id="options"></a>

## 选项

本规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你希望允许在代码中使用 `undefined`，可以放心关闭本规则。
