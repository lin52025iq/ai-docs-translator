---
title: no-use-before-define
rule_type: problem
---


在 JavaScript 中，ES6 之前，变量和函数声明会提升到作用域顶部，因此可以在代码中正式声明标识符之前使用它们。这可能会令人困惑，有些人认为最好始终先声明变量和函数，再使用它们。

在 ES6 中，块级绑定（`let` 和 `const`）引入了“暂时性死区”：任何在变量声明前访问变量的尝试都会抛出 `ReferenceError`。

<a id="rule-details"></a>

## 规则详情

当此规则遇到对尚未声明的标识符的引用时，会发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-use-before-define: "error"*/

alert(a);
var a = 10;

f();
function f() {}

function g() {
    return b;
}
var b = 1;

{
    alert(c);
    let c = 1;
}

{
    class C extends C {}
}

{
    class C {
        static x = "foo";
        [C.x]() {}
    }
}

{
    const C = class {
        static x = C;
    }
}

{
    const C = class {
        static {
            C.x = "foo";
        }
    }
}

export { foo };
const foo = 1;
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-use-before-define: "error"*/

var a;
a = 10;
alert(a);

function f() {}
f(1);

var b = 1;
function g() {
    return b;
}

{
    let c;
    c++;
}

{
    class C {
        static x = C;
    }
}

{
    const C = class C {
        static x = C;
    }
}

{
    const C = class {
        x = C;
    }
}

{
    const C = class C {
        static {
            C.x = "foo";
        }
    }
}

const foo = 1;
export { foo };
```

:::

<a id="options"></a>

## 选项

```json
{
    "no-use-before-define": ["error", {
        "functions": true,
        "classes": true,
        "variables": true,
        "allowNamedExports": false,
        "enums": true,
        "typedefs": true,
        "ignoreTypeReferences": true
    }]
}
```

* `functions` (`boolean`) -
  此标志决定规则是否检查函数声明。
  如果此项为 `true`，规则会对函数声明之前的每个函数引用发出警告。
  否则，规则会忽略这些引用。
  函数声明会提升，因此禁用此选项是安全的（请注意，某些惯用模式，例如[相互递归](https://en.wikipedia.org/wiki/Mutual_recursion)，与启用此选项不兼容）。
  默认值为 `true`。
* `classes` (`boolean`) -
  此标志决定规则是否检查上层作用域中的类声明。
  如果此项为 `true`，规则会对类声明之前的每个类引用发出警告。
  否则，只要声明位于上层函数作用域中，规则就会忽略此类引用。
  在声明之前直接调用的同步、非生成器函数表达式（IIFE）中的引用仍会被报告，因为函数体会立即执行。
  类声明不会提升，因此禁用此选项可能会有风险。
  默认值为 `true`。
* `variables` (`boolean`) -
  此标志决定规则是否检查上层作用域中的变量声明。
  如果此项为 `true`，规则会对变量声明之前的每个变量引用发出警告。
  否则，如果声明位于上层作用域中，规则会忽略该引用；但如果引用与声明位于同一作用域中，仍会报告。
  在声明之前直接调用的同步、非生成器函数表达式（IIFE）中的引用也会被报告，因为函数体会立即执行。
  默认值为 `true`。
* `allowNamedExports` (`boolean`) -
  如果此标志设为 `true`，规则始终允许在 `export {};` 声明中出现引用。
  即使变量在代码后面才声明，这些引用也是安全的。
  默认值为 `false`。

此规则还支持 TypeScript 类型语法。以下选项可启用对 `type`、`interface` 和 `enum` 声明引用的检查：

* `enums` (`boolean`) -
  如果为 `true`，规则会对定义之前的每个 `enum` 引用发出警告。
  默认值为 `true`。
* `typedefs` (`boolean`) -
  如果为 `true`，规则会对声明之前的每个类型 `alias` 或 `interface` 引用发出警告。如果为 `false`，则允许在类型 `alias` 和 `interface` 定义之前使用它们。
  默认值为 `true`。
* `ignoreTypeReferences` (`boolean`) -
  如果为 `true`，规则会忽略所有类型引用，例如类型注解和断言中的引用。
  默认值为 `true`。

此规则接受字符串 `"nofunc"` 作为选项。
`"nofunc"` 等同于 `{ "functions": false, "classes": true, "variables": true, "allowNamedExports": false, "enums": true, "typedefs": true, "ignoreTypeReferences": true }`。

<a id="functions"></a>

### 函数

`{ "functions": false }` 选项的正确代码示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "functions": false }]*/

f();
function f() {}
```

:::

此选项允许引用函数声明。有关函数表达式和箭头函数，请参阅 [`variables`](#variables) 选项。

<a id="classes"></a>

### 类

`{ "classes": false }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-use-before-define: ["error", { "classes": false }]*/

new A();
class A {
}

{
    class C extends C {}
}

{
    class C extends D {}
    class D {}
}

{
    class C {
        static x = "foo";
        [C.x]() {}
    }
}

{
    class C {
        static {
            new D();
        }
    }
    class D {}
}
```

:::

`{ "classes": false }` 选项的正确代码示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "classes": false }]*/

function foo() {
    return new A();
}

class A {
}
```

:::

<a id="variables"></a>

### 变量

`{ "variables": false }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-use-before-define: ["error", { "variables": false }]*/

console.log(foo);
var foo = 1;

f();
const f = () => {};

g();
const g = function() {};

{
    const C = class {
        static x = C;
    }
}

{
    const C = class {
        static x = foo;
    }
    const foo = 1;
}

{
    class C {
        static {
            this.x = foo;
        }
    }
    const foo = 1;
}

{
    (() => {
        console.log(foo);
    })();
    const foo = 1;
}
```

:::

`{ "variables": false }` 选项的正确代码示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "variables": false }]*/

function baz() {
    console.log(foo);
}
var foo = 1;

const a = () => f();
function b() { return f(); }
const c = function() { return f(); }
const f = () => {};

const e = function() { return g(); }
const g = function() {}

{
    const C = class {
        x = foo;
    }
    const foo = 1;
}
```

:::

<a id="allownamedexports"></a>

### 允许命名导出

`{ "allowNamedExports": true }` 选项的正确代码示例：

::: correct

```js
/*eslint no-use-before-define: ["error", { "allowNamedExports": true }]*/

export { a, b, f, C };

const a = 1;

let b;

function f () {}

class C {}
```

:::

`{ "allowNamedExports": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-use-before-define: ["error", { "allowNamedExports": true }]*/

export default a;
const a = 1;

const b = c;
export const c = 1;

export function foo() {
    return d;
}
const d = 1;
```

:::

<a id="enums-typescript-only"></a>

### 枚举（仅限 TypeScript）

`{ "enums": true }` 选项的错误代码示例：

::: incorrect

```ts
/*eslint no-use-before-define: ["error", { "enums": true }]*/

const x = Foo.FOO;

enum Foo {
  FOO,
}
```

:::

`{ "enums": true }` 选项的正确代码示例：

::: correct

```ts
/*eslint no-use-before-define: ["error", { "enums": true }]*/

enum Foo {
  FOO,
}

const x = Foo.FOO;
```

:::

<a id="typedefs-typescript-only"></a>

### 类型定义（仅限 TypeScript）

`{ "enums": true }` 和 `{ "ignoreTypeReferences": false }` 选项的错误代码示例：

::: incorrect

```ts
/*eslint no-use-before-define: ["error", { "typedefs": true, "ignoreTypeReferences": false }]*/

let myVar: StringOrNumber;

type StringOrNumber = string | number;

const x: Foo = {};

interface Foo {}
```

:::

`{ "typedefs": true }` 和 `{ "ignoreTypeReferences": false }` 选项的正确代码示例：

::: correct

```ts
/*eslint no-use-before-define: ["error", { "typedefs": true, "ignoreTypeReferences": false }]*/

type StringOrNumber = string | number;

let myVar: StringOrNumber;

interface Foo {}

const x: Foo = {};
```

:::

<a id="ignoretypereferences-typescript-only"></a>

### 忽略类型引用（仅限 TypeScript）

`{ "ignoreTypeReferences": false }` 选项的错误代码示例：

::: incorrect

```ts
/*eslint no-use-before-define: ["error", { "ignoreTypeReferences": false }]*/

let var1: StringOrNumber;

type StringOrNumber = string | number;

let var2: Enum;

enum Enum {}
```

:::

`{ "ignoreTypeReferences": false }` 选项的正确代码示例：

::: correct

```ts
/*eslint no-use-before-define: ["error", { "ignoreTypeReferences": false }]*/

type StringOrNumber = string | number;

let myVar: StringOrNumber;

enum Enum {}

let var2: Enum;
```

`{ "ignoreTypeReferences": false }` 和 `{ "typedefs": false }` 选项的正确代码示例：

::: correct

```ts
/*eslint no-use-before-define: ["error", { "ignoreTypeReferences": false, "typedefs": false, }]*/

let myVar: StringOrNumber;

type StringOrNumber = string | number;

const x: Foo = {};

interface Foo {}
```

:::

<a id="nofunc"></a>

### nofunc

`"nofunc"` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-use-before-define: ["error", "nofunc"]*/

a();
var a = function() {};

console.log(foo);
var foo = 1;

function f() {
    return b;
}
var b = 1;

new A();
class A {
}

function g() {
    return new B();
}
class B {
}

export default bar;
const bar = 1;

export { baz };
const baz = 1;
```

:::

::: incorrect

```ts
/*eslint no-use-before-define: ["error", "nofunc"]*/

function foo(): Foo {
	return Foo.FOO;
}
	
enum Foo {
	FOO,
}
```

:::

`"nofunc"` 选项的正确代码示例：

::: correct

```js
/*eslint no-use-before-define: ["error", "nofunc"]*/

f();
function f() {}

class A {
}
new A();

var a = 10;
alert(a);

const foo = 1;
export { foo };

const bar = 1;
export default bar;
``` 

:::

::: correct

```ts
/*eslint no-use-before-define: ["error", "nofunc"]*/
	
enum Foo {
	FOO,
}

const foo = Foo.Foo;
``` 

:::

</rejected_candidate_66736a18cd8048d69e28ea77e98c2d3c>