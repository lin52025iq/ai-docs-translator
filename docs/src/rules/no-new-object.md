---
title: no-new-object
rule_type: suggestion
related_rules:
- no-array-constructor
- no-new-wrappers
---

在 JavaScript 中，`Object` 构造函数用于创建新的通用对象，例如：

```js
var myObject = new Object();
```

然而，这与使用更简洁的对象字面量语法并无不同：

```js
var myObject = {};
```

因此，许多人更愿意始终使用对象字面量语法，而不使用 `Object` 构造函数。

这两种方式在性能上没有差异，但对象字面量形式能够节省字节且更加简洁，因此已成为创建新对象的事实标准。

<a id="rule-details"></a>

## 规则详情

此规则禁止使用 `new` 调用 `Object` 构造函数。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-new-object: "error"*/

var myObject = new Object();

new Object();

var foo = new Object("foo");
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-new-object: "error"*/

var myObject = new CustomObject();

var myObject = {};

var Object = function Object() {};
new Object();

var foo = Object("foo");
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你希望允许使用 `new` 调用 `Object` 构造函数，可以放心关闭此规则。
