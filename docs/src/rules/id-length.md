---
title: id-length
rule_type: suggestion
related_rules:
- new-cap
- func-names
- camelcase
---


像 `e`、`x`、`_t` 这样非常短的标识符名称，或像 `hashGeneratorResultOutputContainerObject` 这样非常长的名称，会降低代码的可读性，也可能使代码更难维护。为避免这种情况，可以规定标识符的最小长度和/或最大长度。

```js
const x = 5; // too short; difficult to understand its purpose without context
```

<a id="rule-details"></a>
## 规则详情

此规则用于强制执行标识符长度的最小值和/或最大值约定。

此规则统计[字素](https://unicode.org/reports/tr29/#Default_Grapheme_Cluster_Table)，而不是使用[`String length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)。

<a id="options"></a>
## 选项

以下是使用默认选项时违反此规则的代码示例：

::: incorrect

```js
/*eslint id-length: "error"*/     // default is minimum 2-chars ({ "min": 2 })

const x = 5;
obj.e = document.body;
const foo = function (e) { };
try {
    dangerousStuff();
} catch (e) {
    // ignore as many do
}
const myObj = { a: 1 };
(a) => { a * a };
class y { }
class Foo { x() {} }
class Bar { #x() {} }
class Baz { x = 1 }
class Qux { #x = 1 }
function bar(...x) { }
function baz([x]) { }
const [z] = arr;
const { prop: [i]} = {};
function qux({x}) { }
const { j } = {};
const { prop: a} = {};
({ prop: obj.x } = {});
```

:::

以下是使用默认选项时符合此规则的代码示例：

::: correct

```js
/*eslint id-length: "error"*/     // default is minimum 2-chars ({ "min": 2 })

const num = 5;
function _f() { return 42; }
function _func() { return 42; }
obj.el = document.body;
const foo = function (evt) { /* do stuff */ };
try {
    dangerousStuff();
} catch (error) {
    // ignore as many do
}
const myObj = { apple: 1 };
(num) => { num * num };
function bar(num = 0) { }
class MyClass { }
class Foo { method() {} }
class Bar { #method() {} }
class Baz { field = 1 }
class Qux { #field = 1 }
function baz(...args) { }
function qux([longName]) { }
const { prop } = {};
const { prop: [name] } = {};
const [longName] = arr;
function foobar({ prop }) { }
function foobaz({ a: prop }) { }
const { a: property } = {};
({ prop: obj.longName } = {});
const data = { "x": 1 };  // excused because of quotes
data["y"] = 3;  // excused because of calculated property access
```

:::

此规则有一个对象选项：

* `"min"`（默认值：`2`）强制标识符达到最小长度
* `"max"`（默认值：`Infinity`）强制标识符不超过最大长度
* `"properties": always`（默认值）对属性名称强制执行标识符长度约定
* `"properties": never` 不对属性名称执行标识符长度约定
* `"exceptions"` 接受一个指定标识符名称的数组
* `"exceptionPatterns"` 是一个字符串数组，表示正则表达式模式；与任一模式匹配的标识符均可使用。

<a id="min"></a>
### 最小长度

以下是在 `{ "min": 4 }` 选项下违反此规则的代码示例：

::: incorrect

```js
/*eslint id-length: ["error", { "min": 4 }]*/

const val = 5;
obj.e = document.body;
function foo (e) { };
try {
    dangerousStuff();
} catch (e) {
    // ignore as many do
}
const myObj = { a: 1 };
(val) => { val * val };
class y { }
class Foo { x() {} }
function bar(...x) { }
const { x } = {};
const { prop: a} = {};
const [i] = arr;
const { prop: [num]} = {};
({ prop: obj.x } = {});
```

:::

以下是在 `{ "min": 4 }` 选项下符合此规则的代码示例：

::: correct

```js
/*eslint id-length: ["error", { "min": 4 }]*/

const value = 5;
function func() { return 42; }
object.element = document.body;
const foobar = function (event) { /* do stuff */ };
try {
    dangerousStuff();
} catch (error) {
    // ignore as many do
}
const myObj = { apple: 1 };
(value) => { value * value };
function foobaz(value = 0) { }
class MyClass { }
class Foobar { method() {} }
function barbaz(...args) { }
const { prop } = {};
const [longName] = foo;
const { a: [name] } = {};
const { a: record } = {};
({ prop: object.name } = {});
const data = { "x": 1 };  // excused because of quotes
data["y"] = 3;  // excused because of calculated property access
```

:::

<a id="max"></a>
### 最大长度

以下是在 `{ "max": 10 }` 选项下违反此规则的代码示例：

::: incorrect

```js
/*eslint id-length: ["error", { "max": 10 }]*/

const reallyLongVarName = 5;
function reallyLongFuncName() { return 42; }
obj.reallyLongPropName = document.body;
const foo = function (reallyLongArgName) { /* do stuff */ };
try {
    dangerousStuff();
} catch (reallyLongErrorName) {
    // ignore as many do
}
(reallyLongArgName) => { return !reallyLongArgName; };
const [reallyLongFirstElementName] = arr;
```

:::

以下是在 `{ "max": 10 }` 选项下符合此规则的代码示例：

::: correct

```js
/*eslint id-length: ["error", { "max": 10 }]*/

const varName = 5;
function funcName() { return 42; }
obj.propName = document.body;
const foo = function (arg) { /* do stuff */ };
try {
    dangerousStuff();
} catch (error) {
    // ignore as many do
}
(arg) => { return !arg; };
const [first] = arr;
```

:::

<a id="properties"></a>
### 属性

以下是在 `{ "properties": "never" }` 选项下符合此规则的代码示例：

::: correct

```js
/*eslint id-length: ["error", { "properties": "never" }]*/

const myObj = { a: 1 };
({ a: obj.x.y.z } = {});
({ prop: obj.i } = {});
```

:::

<a id="exceptions"></a>
### 例外项

以下是在 `{ "exceptions": ["x", "y", "z", "ζ"] }` 选项下的其他符合此规则的代码示例：

::: correct

```js
/*eslint id-length: ["error", { "exceptions": ["x", "y", "z", "ζ", "i"] }]*/

const x = 5;
function y() { return 42; }
obj.x = document.body;
const foo = function (x) { /* do stuff */ };
try {
    dangerousStuff();
} catch (x) {
    // ignore as many do
}
(x) => { return x * x; };
const [i] = arr;
const { z } = foo;
const { a: ζ } = foo;
```

:::

<a id="exceptionpatterns"></a>
### 例外模式

以下是在 `{ "exceptionPatterns": ["E|S", "[x-z]"] }` 选项下的其他符合此规则的代码示例：

::: correct

```js
/*eslint id-length: ["error", { "exceptionPatterns": ["E|S|X", "[x-z]"] }]*/

const E = 5;
function S() { return 42; }
obj.x = document.body;
const foo = function (x) { /* do stuff */ };
try {
    dangerousStuff();
} catch (x) {
    // ignore as many do
}
(y) => {return  y * y};
const [X] = arr;
const { y } = foo;
const { a: z } = foo;
```

:::
