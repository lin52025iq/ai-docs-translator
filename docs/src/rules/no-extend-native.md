---
title: no-extend-native
rule_type: suggestion
related_rules:
- no-global-assign
---


在 JavaScript 中，你可以扩展任何对象，包括内置对象或“原生”对象。有时，人们会更改这些原生对象的行为，从而破坏代码其他部分对它们的假设。

例如，下面我们重写了一个内置方法，这会影响所有对象，甚至其他内置对象。

```js
// seems harmless
Object.prototype.extra = 55;

// loop through some userIds
const users = {
    "123": "Stan",
    "456": "David"
};

// not what you'd expect
for (const id in users) {
    console.log(id); // "123", "456", "extra"
}
```

避免这个问题的常见建议是在 `for` 循环内部使用 `users.hasOwnProperty(id)` 进行包装。不过，如果在整个代码库中严格执行此规则，就不需要采取这一步了。

<a id="rule-details"></a>

## 规则详情

禁止直接修改内置对象的原型。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-extend-native: "error"*/

Object.prototype.a = "a";
Object.defineProperty(Array.prototype, "times", { value: 999 });
```

:::

<a id="options"></a>

## 选项

此规则接受一个 `exceptions` 选项，可用于指定允许扩展的内置对象列表。

<a id="exceptions"></a>

### 例外

以下是示例 `{ "exceptions": ["Object"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/

Object.prototype.a = "a";
```

:::

<a id="known-limitations"></a>

## 已知限制

此规则*不会*报告以下这些不太明显的内置对象原型修改方式：

```js
const x = Object;
x.prototype.thing = a;

eval("Array.prototype.forEach = 'muhahaha'");

with(Array) {
    prototype.thing = 'thing';
};

window.Function.prototype.bind = 'tight';
```

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你正在使用垫片，尝试用最新规范修补旧版 JavaScript，可能需要禁用此规则。例如，这类垫片可能会以兼容未来规范的方式实现 `Function.prototype.bind` 或 `Array.prototype.forEach`。