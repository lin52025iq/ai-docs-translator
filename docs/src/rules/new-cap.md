---
title: new-cap
rule_type: suggestion
---


JavaScript 中的 `new` 运算符会创建特定对象类型的新实例。该对象类型由构造函数表示。由于构造函数只是普通函数，唯一能表明其用途的特征就是调用时使用了 `new`。原生 JavaScript 函数以大写字母开头，以区分用作构造函数的函数和其他函数。许多风格指南建议遵循这一模式，以便更容易判断哪些函数用作构造函数。

```js
const friend = new Person();
```

<a id="rule-details"></a>

## 规则详情

此规则要求构造函数名称以大写字母开头。某些内置标识符不受此规则限制，包括：

* `Array`
* `Boolean`
* `Date`
* `Error`
* `Function`
* `Number`
* `Object`
* `RegExp`
* `String`
* `Symbol`
* `BigInt`

只有当这些标识符引用全局内置对象时，才不受此规则限制；可以直接引用，也可以将其作为全局对象（`global`、`globalThis`、`self` 或 `window`）的属性引用。在相同条件下，`Date.UTC()` 也不受限制。

此规则的**正确**代码示例：

::: correct

```js
/*eslint new-cap: "error"*/

function foo(arg) {
    return Boolean(arg);
}

function bar(arg) {
    return globalThis.Boolean(arg);
}

const time = Date.UTC(2000, 0);

const otherTime = globalThis.Date.UTC(2000, 0);
```

:::

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint new-cap: "error"*/

function String(value) {
    return value + "";
}

const foo = String(42);

const Date = { UTC() { return 0; } };

const time = Date.UTC(2000, 0);
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"newIsCap": true`（默认值）要求所有 `new` 运算符都与以大写字母开头的函数一起使用。
* `"newIsCap": false` 允许 `new` 运算符与以小写或大写字母开头的函数一起使用。
* `"capIsNew": true`（默认值）要求所有以大写字母开头的函数都使用 `new` 运算符调用。
* `"capIsNew": false` 允许不使用 `new` 运算符调用以大写字母开头的函数。
* `"newIsCapExceptions"` 允许对指定的以小写字母开头的函数名称使用 `new` 运算符。
* `"newIsCapExceptionPattern"` 允许对匹配指定正则表达式模式的任意以小写字母开头的函数名称使用 `new` 运算符。
* `"capIsNewExceptions"` 允许不使用 `new` 运算符调用指定的以大写字母开头的函数名称。
* `"capIsNewExceptionPattern"` 允许不使用 `new` 运算符调用匹配指定正则表达式模式的任意以大写字母开头的函数名称。
* `"properties": true`（默认值）启用对对象属性的检查。
* `"properties": false` 禁用对对象属性的检查。

### newIsCap

在默认选项 `{ "newIsCap": true }` 下，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint new-cap: ["error", { "newIsCap": true }]*/

const friend = new person();
```

:::

在默认选项 `{ "newIsCap": true }` 下，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCap": true }]*/

const friend = new Person();
```

:::

在选项 `{ "newIsCap": false }` 下，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCap": false }]*/

const friend = new person();
```

:::

### capIsNew

在默认选项 `{ "capIsNew": true }` 下，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint new-cap: ["error", { "capIsNew": true }]*/

const colleague = Person();
```

:::

在默认选项 `{ "capIsNew": true }` 下，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNew": true }]*/

const colleague = new Person();
```

:::

在选项 `{ "capIsNew": false }` 下，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNew": false }]*/

const colleague = Person();
```

:::

### newIsCapExceptions

在选项 `{ "newIsCapExceptions": ["events"] }` 下，以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptions": ["events"] }]*/

const events = require('events');

const emitter = new events();
```

:::

### newIsCapExceptionPattern

在选项 `{ "newIsCapExceptionPattern": "^person\\.." }` 下，以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptionPattern": "^person\\.." }]*/

const friend = new person.acquaintance();

const bestFriend = new person.friend();
```

:::

在选项 `{ "newIsCapExceptionPattern": "\\.bar$" }` 下，以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "newIsCapExceptionPattern": "\\.bar$" }]*/

const friend = new person.bar();
```

:::

### capIsNewExceptions

在选项 `{ "capIsNewExceptions": ["Person"] }` 下，以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptions": ["Person"] }]*/

function foo(arg) {
    return Person(arg);
}
```

:::

### capIsNewExceptionPattern

在选项 `{ "capIsNewExceptionPattern": "^person\\.." }` 下，以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^person\\.." }]*/

const friend = person.Acquaintance();
const bestFriend = person.Friend();
```

:::

在选项 `{ "capIsNewExceptionPattern": "\\.Bar$" }` 下，以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "\\.Bar$" }]*/

foo.Bar();
```

:::

在选项 `{ "capIsNewExceptionPattern": "^Foo" }` 下，以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "capIsNewExceptionPattern": "^Foo" }]*/

const x = Foo(42);

const y = Foobar(42);

const z = Foo.Bar(42);
```

:::

### properties

在默认选项 `{ "properties": true }` 下，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint new-cap: ["error", { "properties": true }]*/

const friend = new person.acquaintance();
```

:::

在默认选项 `{ "properties": true }` 下，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "properties": true }]*/

const friend = new person.Acquaintance();
```

:::

在选项 `{ "properties": false }` 下，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-cap: ["error", { "properties": false }]*/

const friend = new person.acquaintance();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你的约定不要求构造函数名称以大写字母开头，或不要求以大写字母开头的函数只能用作构造函数，请关闭此规则。
