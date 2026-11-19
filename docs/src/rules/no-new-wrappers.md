---
title: no-new-wrappers
rule_type: suggestion
related_rules:
- no-array-constructor
- no-object-constructor
further_reading:
- https://www.inkling.com/read/javascript-definitive-guide-david-flanagan-6th/chapter-3/wrapper-objects
---


JavaScript 中有三种具有包装对象的原始类型：字符串、数字和布尔值。它们分别由构造函数 `String`、`Number` 和 `Boolean` 表示。每当读取这些原始值之一时，都会使用原始类型包装对象，为它们提供类似对象的功能，例如方法。在幕后，系统会创建并销毁相应包装类型的对象，因此你可以在原始值上调用方法，例如：

```js
const text = "Hello world".substring(2);
```

在这个示例中，幕后会构造一个 `String` 对象。`substring()` 方法存在于 `String.prototype` 上，因此字符串实例可以访问它。

也可以手动创建新的包装对象实例：

```js
const stringObject = new String("Hello world");
const numberObject = new Number(33);
const booleanObject = new Boolean(false);
```

虽然可以这样做，但没有充分理由将这些原始类型包装对象用作构造函数。它们往往只会让其他开发者感到困惑，因为它们看起来应该像原始值一样工作，实际上却并非如此。例如：

```js
const stringObject = new String("Hello world");
console.log(typeof stringObject);       // "object"

const text = "Hello world";
console.log(typeof text);               // "string"

const booleanObject = new Boolean(false);
if (booleanObject) {    // all objects are truthy!
    console.log("This executes");
}
```

第一个问题是，原始类型包装对象实际上是对象。这意味着 `typeof` 会返回 `"object"`，而不是 `"string"`、`"number"` 或 `"boolean"`。第二个问题与布尔对象有关。所有对象都是真值，因此即使 `Boolean` 实例的实际值为 `false`，它也始终会被判定为 `true`。

因此，最佳实践是避免将原始类型包装对象与 `new` 一起使用。

<a id="rule-details"></a>

## 规则详情

此规则旨在禁止使用 `new` 运算符创建 `String`、`Number` 和 `Boolean` 实例。因此，每当发现 `new String`、`new Number` 或 `new Boolean` 时，都会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-new-wrappers: "error"*/

const stringObject = new String("Hello world");
const numberObject = new Number(33);
const booleanObject = new Boolean(false);

const stringObject2 = new String;
const numberObject2 = new Number;
const booleanObject2 = new Boolean;
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-new-wrappers: "error"*/

const text = String(someValue);
const num = Number(someValue);

const object = new MyString();
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你希望允许使用原始类型包装对象，可以安全地禁用此规则。
