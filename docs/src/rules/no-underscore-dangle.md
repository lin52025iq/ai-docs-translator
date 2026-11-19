---
title: no-underscore-dangle
rule_type: suggestion
---

说到标识符的命名约定，首尾下划线可能是 JavaScript 中最容易引起争议的一种。首尾下划线指位于标识符开头或结尾的下划线，例如：

```js
let _foo;
```

在 JavaScript 中，使用首尾下划线标记“私有”成员由来已久，最早可以追溯到 SpiderMonkey 添加 `__defineGetter__()` 等非标准方法。从那时起，使用单个下划线前缀来表示某个成员不属于对象的公共接口，已成为最流行的约定。

建议使用 ECMAScript 2022 引入的正式[私有类特性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)来封装私有数据和方法，而不是依赖命名约定。

允许标识符使用首尾下划线纯粹是一种约定，不会影响性能、可读性或复杂度。即使启用了此规则，首尾下划线也无法提供与私有类特性相同的封装优势。

<a id="rule-details"></a>

## 规则详情

此规则禁止在标识符中使用首尾下划线。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-underscore-dangle: "error"*/

let foo_;
const __proto__ = {};
foo._bar();
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-underscore-dangle: "error"*/

const _ = require('underscore');
const obj = _.contains(items, item);
obj.__proto__ = {};
const file = __filename;
function foo(_bar) {};
const bar = { onClick(_bar) {} };
const baz = (_bar) => {};
```

:::

<a id="options"></a>

## 选项

此规则接受一个对象选项：

* `"allow"` 允许指定的标识符使用首尾下划线
* `"allowAfterThis": false`（默认值）禁止在 `this` 对象的成员中使用首尾下划线
* `"allowAfterSuper": false`（默认值）禁止在 `super` 对象的成员中使用首尾下划线
* `"allowAfterThisConstructor": false`（默认值）禁止在 `this.constructor` 对象的成员中使用首尾下划线
* `"enforceInMethodNames": false`（默认值）允许在方法名中使用首尾下划线
* `"enforceInClassFields": false`（默认值）允许在 es2022 类字段名中使用首尾下划线
* `"allowInArrayDestructuring": true`（默认值）允许通过数组解构赋值的变量名使用首尾下划线
* `"allowInObjectDestructuring": true`（默认值）允许通过对象解构赋值的变量名使用首尾下划线
* `"allowFunctionParams": true`（默认值）允许函数参数名使用首尾下划线

<a id="allow"></a>

### allow

使用 `{ "allow": ["foo_", "_bar"] }` 选项时，此规则的其他正确代码示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allow": ["foo_", "_bar"] }]*/

let foo_;
foo._bar();
```

:::

<a id="allowafterthis"></a>

### allowAfterThis

使用 `{ "allowAfterThis": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

const a = this.foo_;
this._bar();
```

:::

<a id="allowaftersuper"></a>

### allowAfterSuper

使用 `{ "allowAfterSuper": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allowAfterSuper": true }]*/

class Foo extends Bar {
  doSomething() {
    const a = super.foo_;
    super._bar();
  }
}
```

:::

<a id="allowafterthisconstructor"></a>

### allowAfterThisConstructor

使用 `{ "allowAfterThisConstructor": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allowAfterThisConstructor": true }]*/

const a = this.constructor.foo_;
this.constructor._bar();
```

:::

<a id="enforceinmethodnames"></a>

### enforceInMethodNames

使用 `{ "enforceInMethodNames": true }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "enforceInMethodNames": true }]*/

class Foo {
  _bar() {}
}

class Bar {
  bar_() {}
}

const o1 = {
  _bar() {}
};

const o2 = {
  bar_() {}
};
```

:::

<a id="enforceinclassfields"></a>

### enforceInClassFields

使用 `{ "enforceInClassFields": true }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "enforceInClassFields": true }]*/

class Foo {
    _bar;
}

class Bar {
    _bar = () => {};
}

class Baz {
    bar_;
}

class Qux {
    #_bar;
}

class FooBar {
    #bar_;
}
```

:::

<a id="allowinarraydestructuring"></a>

### allowInArrayDestructuring

使用 `{ "allowInArrayDestructuring": false }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "allowInArrayDestructuring": false }]*/

const [_foo, _bar] = list;
const [foo_, ..._qux] = list;
const [foo, [bar, _baz]] = list;
```

:::

<a id="allowinobjectdestructuring"></a>

### allowInObjectDestructuring

使用 `{ "allowInObjectDestructuring": false }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "allowInObjectDestructuring": false }]*/

const { foo, bar: _bar } = collection;
const { qux, xyz, _baz } = collection;
```

:::

使用 `{ "allowInObjectDestructuring": false }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint no-underscore-dangle: ["error", { "allowInObjectDestructuring": false }]*/

const { foo, bar, _baz: { a, b } } = collection;
const { qux, xyz, _baz: baz } = collection;
```

:::

<a id="allowfunctionparams"></a>

### allowFunctionParams

使用 `{ "allowFunctionParams": false }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-underscore-dangle: ["error", { "allowFunctionParams": false }]*/

function foo1 (_bar) {}
function foo2 (_bar = 0) {}
function foo3 (..._bar) {}

const foo4 = function onClick (_bar) {}
const foo5 = function onClick (_bar = 0) {}
const foo6 = function onClick (..._bar) {}

const foo7 = (_bar) => {};
const foo8 = (_bar = 0) => {};
const foo9 = (..._bar) => {};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你希望允许标识符使用首尾下划线，可以放心关闭此规则。
