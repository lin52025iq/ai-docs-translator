---
title: no-unused-expressions
rule_type: suggestion
---


没有影响程序状态的未使用表达式表明存在逻辑错误。

例如，`n + 1;` 并非语法错误，但它可能是输入错误，程序员原本想写的是赋值语句 `n += 1;`。有时，某些构建工具可能会在生产环境中移除这类未使用的表达式，从而可能破坏应用程序逻辑。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除不会影响程序状态的未使用表达式。

此规则不适用于函数调用或使用 `new` 运算符的构造函数调用，因为它们可能会对程序状态产生*副作用*。

```js
let i = 0;
function increment() { i += 1; }
increment(); // return value is unused, but i changed as a side effect

let nThings = 0;
function Thing() { nThings += 1; }
new Thing(); // constructed object is unused, but nThings changed as a side effect
```

在 ES5+ 环境中，此规则不适用于指令（即脚本、模块或函数开头处的字面量字符串表达式，例如 `"use strict";`）。在 ES3 环境中，默认情况下指令会被视为未使用的表达式，但可以通过 `ignoreDirectives` 选项更改此行为。

除非序列表达式（使用逗号的表达式，例如 `a = 1, b = 2`）的返回值被赋值或用于条件求值，或者函数调用使用了该序列表达式的值，否则它们始终会被视为未使用。

<a id="options"></a>

## 选项

此规则在默认状态下不需要任何参数。如果要启用以下一个或多个选项，可以传入一个设置如下的对象：

* 将 `allowShortCircuit` 设为 `true`，即可在表达式中使用短路求值（默认值：`false`）。
* 将 `allowTernary` 设为 `true`，即可像使用短路求值一样在表达式中使用三元运算符（默认值：`false`）。
* 将 `allowTaggedTemplates` 设为 `true`，即可在表达式中使用带标签的模板字面量（默认值：`false`）。
* 将 `enforceForJSX` 设为 `true`，即可标记未使用的 JSX 元素表达式（默认值：`false`）。
* 将 `ignoreDirectives` 设为 `true`，即可在使用 `ecmaVersion: 3` 进行代码检查时，不将指令报告为未使用的表达式（默认值：`false`）。

只有在所有代码路径都直接改变状态（例如赋值语句）或可能产生*副作用*（例如函数调用）时，这些选项才允许未使用的表达式。

默认选项 `{ "allowShortCircuit": false, "allowTernary": false }` 下的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-expressions: "error"*/

0

if(0) 0

{0}

f(0), {}

a && b()

a, b()

c = a, b;

a() && function namedFunctionInExpressionContext () {f();}

(function anIncompleteIIFE () {});

injectGlobal`body{ color: red; }`

```

:::

默认选项 `{ "allowShortCircuit": false, "allowTernary": false }` 下的**正确**代码示例：

::: correct

```js
/*eslint no-unused-expressions: "error"*/

{} // In this context, this is a block statement, not an object literal

{ myLabel: foo() } // In this context, this is a block statement with a label and expression, not an object literal

function namedFunctionDeclaration () {}

(function aGenuineIIFE () {}());

f()

a = 0

new C

delete a.b

void a
```

:::

请注意，只有当一个或多个字符串表达式语句（带或不带分号）不位于脚本、模块或函数的开头（即它们单独出现且中间没有其他语句）时，才会被视为未使用。否则，它们会被视为“指令序言”的一部分，而 JavaScript 引擎可能会使用该部分。这包括“严格模式”指令。

关于指令，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unused-expressions: "error"*/

"use strict";
"use asm"
"use stricter";
"use babel"
"any other strings like this in the directive prologue";
"this is still the directive prologue";

function foo() {
    "bar";
}

class Foo {
    someMethod() {
        "use strict";
    }
}
```

:::

关于指令，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-expressions: "error"*/

doSomething();
"use strict"; // this isn't in a directive prologue, because there is a non-directive statement before it

function foo() {
    "bar" + 1;
}

class Foo {
    static {
        "use strict"; // class static blocks do not have directive prologues
    }
}
```

:::

<a id="allowshortcircuit"></a>

### 允许短路求值

`{ "allowShortCircuit": true }` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/

a || b
```

:::

`{ "allowShortCircuit": true }` 选项下的**正确**代码示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/

a && b()
a() || (b = c)
```

:::

<a id="allowternary"></a>

### 允许三元运算符

`{ "allowTernary": true }` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/

a ? b : 0
a ? b : c()
```

:::

`{ "allowTernary": true }` 选项下的**正确**代码示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/

a ? b() : c()
a ? (b = c) : d()
```

:::

<a id="allowshortcircuit-and-allowternary"></a>

### 允许短路求值和三元运算符

`{ "allowShortCircuit": true, "allowTernary": true }` 选项下的**正确**代码示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/

a ? b() || (c = d) : e()
```

:::

<a id="allowtaggedtemplates"></a>

### 允许带标签的模板字面量

`{ "allowTaggedTemplates": true }` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }]*/

`some untagged template string`;
```

:::

`{ "allowTaggedTemplates": true }` 选项下的**正确**代码示例：

::: correct

```js
/*eslint no-unused-expressions: ["error", { "allowTaggedTemplates": true }]*/

tag`some tagged template string`;
```

:::

<a id="enforceforjsx"></a>

### 对 JSX 强制执行

JSX 最常用于 React 生态系统，在该生态系统中，它会被编译为 `React.createElement` 表达式。虽然这些调用没有副作用，但 `no-unused-expressions` 规则不会自动标记它们。如果你使用 React 或任何其他没有副作用的 JSX pragma，可以启用此选项来标记这些表达式。

`{ "enforceForJSX": true }` 选项下的**错误**代码示例：

::: incorrect { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint no-unused-expressions: ["error", { "enforceForJSX": true }]*/

<MyComponent />;

<></>;
```

:::

`{ "enforceForJSX": true }` 选项下的**正确**代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint no-unused-expressions: ["error", { "enforceForJSX": true }]*/

const myComponentPartial = <MyComponent />;

const myFragment = <></>;
```

:::

<a id="ignoredirectives"></a>

### 忽略指令

设为 `false`（默认值）时，在使用 `ecmaVersion: 3` 进行代码检查时，此规则会将指令（如 `"use strict"`）报告为未使用的表达式。此默认行为是因为 ES3 环境并未正式支持指令，因此在这种特定情况下，这类字符串实际上属于未使用的表达式。

将此选项设为 `true`，即可防止指令被报告为未使用，即使指定了 `ecmaVersion: 3` 也是如此。此选项主要适用于需要维护单一代码库的项目：该代码库包含指令，同时还要兼容较旧的 ES3 环境和现代的 ES5+ 环境。

**注意：**在 ES5+ 环境中，无论此设置为何，指令始终会被忽略。

`{ "ignoreDirectives": false }` 选项和 `ecmaVersion: 3` 下的**错误**代码示例：

::: incorrect { "ecmaVersion": 3, "sourceType": "script" }

```js
/*eslint no-unused-expressions: ["error", { "ignoreDirectives": false }]*/

"use strict";
"use asm"
"use stricter";
"use babel"
"any other strings like this in the directive prologue";
"this is still the directive prologue";

function foo() {
    "bar";
}
```

:::

`{ "ignoreDirectives": true }` 选项和 `ecmaVersion: 3` 下的**正确**代码示例：

::: correct { "ecmaVersion": 3, "sourceType": "script" }

```js
/*eslint no-unused-expressions: ["error", { "ignoreDirectives": true }]*/

"use strict";
"use asm"
"use stricter";
"use babel"
"any other strings like this in the directive prologue";
"this is still the directive prologue";

function foo() {
    "bar";
}
```

:::

<a id="typescript-support"></a>

### TypeScript 支持

此规则支持 TypeScript 特有的表达式，并遵循以下准则：

1. 在模块和命名空间声明中允许使用指令（如 `'use strict'`）
2. 如果类型相关表达式中包装的值表达式未被使用，则该类型相关表达式也会被视为未使用：
   * 类型断言（`x as number`、`<number>x`）
   * 非空断言（`x!`）
   * 类型实例化（`Set<number>`）

**注意：**虽然类型表达式不会产生运行时副作用（例如，`x!` 在运行时等价于 `x`），但它们可以用于测试目的的类型断言。

使用 TypeScript 时，此规则的**正确**代码示例：

::: correct

```ts
/* eslint no-unused-expressions: "error" */

// Type expressions wrapping function calls are allowed
function getSet() {
    return Set;
}
getSet()<number>;
getSet() as Set<unknown>;
getSet()!;

// Directives in modules and namespaces
module Foo {
    'use strict';
    'hello world';
}

namespace Bar {
    'use strict';
    export class Baz {}
}
```

:::

使用 TypeScript 时，此规则的**错误**代码示例：

::: incorrect

```ts
/* eslint no-unused-expressions: "error" */

// Standalone type expressions
Set<number>;
1 as number;
window!;

// Expressions inside namespaces
namespace Bar {
    123;
}
```

:::
