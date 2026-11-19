---
title: no-shadow
rule_type: suggestion
related_rules:
- no-shadow-restricted-names
further_reading:
- https://en.wikipedia.org/wiki/Variable_shadowing
---


变量遮蔽是指局部变量与其所在作用域中的变量同名的情况。例如：

```js
const a = 3;
function b() {
    const a = 10;
}
```

在这种情况下，`b()` 中的变量 `a` 遮蔽了全局作用域中的变量 `a`。这会让代码难以阅读，而且全局变量也无法访问。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除被遮蔽的变量声明。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-shadow: "error"*/

const a = 3;
function b() {
    const a = 10;
}

const c = function () {
    const a = 10;
}

function d(a) {
    a = 10;
}
d(a);

if (true) {
    const a = 5;
}

const f = wrap(function f() {});

const C = wrap(class C {});
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-shadow: "error"*/

const a = 3;
function b(c) {
    const d = 10;
    if (c) {
        const e = 20;
    }
}

/*
 * Function and class names are allowed to shadow a variable
 * if the function/class expression is assigned to the variable
 * as its initializer or default value.
 */
const f = function f() {};
const g = foo ? (bar || function g() {}) : baz;
const { h = function h() {} } = obj;
function qux(i = function i() {}) {}
const C = class C {};
```

:::

<a id="options"></a>

## 选项

此规则接受一个对象作为选项，包含以下属性：
- `"builtinGlobals"`
- `"hoist"`
- `"allow"`
- `"ignoreOnInitialization"`
- `"ignoreTypeValueShadow"`（仅限 TypeScript）
- `"ignoreFunctionTypeParameterNameValueShadow"`（仅限 TypeScript）

```json
{
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [], "ignoreOnInitialization": false }]
}
```

### builtinGlobals

`builtinGlobals` 选项默认为 `false`。
如果设置为 `true`，此规则会阻止遮蔽内置全局变量，例如 `Object`、`Array`、`Number` 等。

`{ "builtinGlobals": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "builtinGlobals": true }]*/

function foo() {
    const Object = 0;
}
```

:::

### hoist

`hoist` 选项有五种设置：

- `functions`（默认值）——在外层函数声明之前报告变量遮蔽。
- `all`——在外层变量或函数声明之前报告所有变量遮蔽。
- `never`——在外层变量或函数声明之前不报告变量遮蔽。
- `types`（仅限 TypeScript）——在外层类型声明之前报告变量遮蔽。
- `functions-and-types`（仅限 TypeScript）——在外层函数或类型声明之前报告变量遮蔽。

#### hoist: functions

默认 `{ "hoist": "functions" }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "hoist": "functions" }]*/

if (true) {
    const b = 6;
}

function b() {}
```

:::

尽管 `if` 语句中的 `const b` 位于外层作用域的 *函数* 声明之前，但这仍然是错误的。

默认 `{ "hoist": "functions" }` 选项的正确代码示例：

::: correct

```js
/*eslint no-shadow: ["error", { "hoist": "functions" }]*/

if (true) {
    const a = 3;
}

const a = 5;
```

:::

因为 `if` 语句中的 `const a` 位于外层作用域的 *变量* 声明之前，所以这是正确的。

#### hoist: all

`{ "hoist": "all" }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "hoist": "all" }]*/

if (true) {
    const a = 3;
    const b = 6;
}

const a = 5;
function b() {}
```

:::

#### hoist: never

`{ "hoist": "never" }` 选项的正确代码示例：

::: correct

```js
/*eslint no-shadow: ["error", { "hoist": "never" }]*/

if (true) {
    const a = 3;
    const b = 6;
}

const a = 5;
function b() {}
```

:::

因为 `if` 语句中的 `const a` 和 `const b` 位于外层作用域的声明之前，所以它们是正确的。

#### hoist: types

`{ "hoist": "types" }` 选项的错误代码示例：

::: incorrect

```ts
/*eslint no-shadow: ["error", { "hoist": "types" }]*/

type Bar<Foo> = 1;
type Foo = 1;
```

:::

#### hoist: functions-and-types

`{ "hoist": "functions-and-types" }` 选项的错误代码示例：

::: incorrect

```ts
/*eslint no-shadow: ["error", { "hoist": "functions-and-types" }]*/

// types
type Bar<Foo> = 1;
type Foo = 1;

// functions
if (true) {
  const b = 6;
}

function b() {}
```

:::

### allow

`allow` 选项是一个标识符名称数组，其中的名称允许被遮蔽。例如，`"resolve"`、`"reject"`、`"done"`、`"cb"`。

`{ "allow": ["done"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-shadow: ["error", { "allow": ["done"] }]*/

import async from 'async';

function foo(done) {
  async.map([1, 2], function (e, done) {
    done(null, e * 2)
  }, done);
}

foo(function (err, result) {
  console.log({ err, result });
});
```

:::

### ignoreOnInitialization

`ignoreOnInitialization` 选项默认为 `false`。如果设置为 `true`，当被遮蔽的变量可能尚未初始化时，此选项会阻止在变量初始化表达式中报告遮蔽。

被遮蔽的变量必须位于左侧。遮蔽变量必须位于右侧，并在回调函数或 IIFE 中声明。

`{ "ignoreOnInitialization": "true" }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-shadow: ["error", { "ignoreOnInitialization": true }]*/

const x = x => x;
```

:::

因为遮蔽变量 `x` 会遮蔽已经初始化的被遮蔽变量 `x`。

`{ "ignoreOnInitialization": true }` 选项的正确代码示例：

::: correct

```js
/*eslint no-shadow: ["error", { "ignoreOnInitialization": true }]*/

const x = foo(x => x)

const y = (y => y)()
```

:::

对回调函数采用此规则的理由是，假定它们会在初始化期间被调用，因此在使用遮蔽变量时，被遮蔽的变量尚未初始化。

### ignoreTypeValueShadow

是否忽略与变量同名的类型。默认值：`true`。

通常这样做是安全的，因为在类型位置使用变量必须借助 typeof 运算符，因此几乎不会造成混淆。

`{ "ignoreTypeValueShadow": true }` 的正确代码示例：

::: correct

```ts
/*eslint no-shadow: ["error", { "ignoreTypeValueShadow": true }]*/

type Foo = number;
interface Bar {
  prop: number;
}

function f() {
  const Foo = 1;
  const Bar = 'test';
}
```

:::

**注意：**变量遮蔽特指位于不同嵌套作用域中的两个同名标识符。这与重复声明不同；重复声明是指两个同名标识符位于同一作用域中。重复声明由 [`no-redeclare`](/rules/no-redeclare) 规则处理。


### ignoreFunctionTypeParameterNameValueShadow

是否忽略与变量同名的函数参数。默认值：`true`。

函数类型的每个参数都会在该函数类型的作用域内创建一个值变量。这样做是为了让你之后可以使用 typeof 运算符引用该类型：

```ts
type Func = (test: string) => typeof test;

declare const fn: Func;
const result = fn('str'); // typeof result === string
```

这意味着，函数类型的参数会遮蔽父作用域中的值变量名称：

```ts
let test = 1;
type TestType = typeof test; // === number
type Func = (test: string) => typeof test; // this "test" references the argument, not the variable

declare const fn: Func;
const result = fn('str'); // typeof result === string
```

如果函数类型的返回类型位置没有使用 `typeof` 运算符，则可以安全地启用此选项。

`{ "ignoreFunctionTypeParameterNameValueShadow": true }` 的正确代码示例：

::: correct

```ts
/*eslint no-shadow: ["error", { "ignoreFunctionTypeParameterNameValueShadow": true }]*/

const test = 1;
type Func = (test: string) => typeof test;
```

:::

<a id="why-does-the-rule-report-on-enum-members-that-share-the-same-name-as-a-variable-in-a-parent-scope"></a>

### 为什么规则会报告与父作用域中的变量同名的枚举成员？

这不是错误——规则的行为完全符合预期！此报告是正确的，因为枚举有一个鲜为人知的特性：枚举成员会在枚举自身的作用域中引入一个变量，因此无需限定名称即可引用它们。

下面用一个简单示例来说明：

```ts
const A = 2;
enum Test {
  A = 1,
  B = A,
}

console.log(Test.B); // what should be logged?
```

乍一看，你可能会认为它应该输出 `2`，因为外层变量 A 的值是 `2`。然而，实际输出的是 `1`，也就是 `Test.A` 的值。这是因为在枚举内部，`B = A` 会被视为 `B = Test.A`。由于这种行为，枚举成员遮蔽了外层变量声明。