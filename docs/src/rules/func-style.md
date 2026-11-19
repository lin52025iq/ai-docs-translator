---
title: func-style
rule_type: suggestion
further_reading:
- https://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
---

在 JavaScript 中定义函数有两种方式：`function` 声明和赋值给变量的函数表达式。函数声明是以 `function` 关键字开头的语句。函数表达式可以是箭头函数，也可以使用 `function` 关键字并带有可选名称。以下是一些示例：

```js
// function declaration
function doSomething() {
    // ...
}

// arrow function expression assigned to a variable
const doSomethingElse = () => {
    // ...
};

// function expression assigned to a variable
const doSomethingAgain = function() {
    // ...
};
```

`function` 声明与函数表达式的主要区别在于，声明会被*提升*到其定义所在作用域的顶部，因此你可以在函数声明之前编写使用该函数的代码。例如：

```js
doSomething(); // ok

function doSomething() {
    // ...
}
```

对于函数表达式，必须先定义函数再使用，否则会导致错误。例如：

```js
doSomething();  // error!

const doSomething = function() {
    // ...
};
```

在这种情况下，调用时 `doSomething` 的值是 `undefined`，因此会导致运行时错误。

由于这些行为不同，人们通常会制定指南来规定应使用哪种函数风格。这里并没有绝对正确或错误的选择，只是个人偏好不同。

<a id="rule-details"></a>
## 规则详情

此规则强制采用特定的函数风格：`function` 声明，或赋值给变量的函数表达式。你可以在配置中指定偏好的风格。

注意：此规则并不适用于*所有*函数。例如，作为参数传递给另一个函数的回调函数不受此规则检查。

<a id="options"></a>
## 选项

此规则有一个字符串选项：

* `"expression"`（默认值）要求使用函数表达式，而不是函数声明
* `"declaration"` 要求使用函数声明，而不是函数表达式

此规则还有一个用于两种例外情况的对象选项：

* `"allowArrowFunctions"`：`true`（默认值为 `false`）允许使用箭头函数。此选项仅在字符串选项设为 `"declaration"` 时生效（字符串选项设为 `"expression"` 时始终允许箭头函数，无论此选项如何设置）
* `"allowTypeAnnotation"`：`true`（默认值为 `false`）允许在变量声明带有类型注释时使用函数表达式和箭头函数，不受 `allowArrowFunctions` 选项影响。此选项仅在字符串选项设为 `"declaration"` 时生效。（仅适用于 TypeScript）
* `"overrides"`：
    * `"namedExports": "expression" | "declaration" | "ignore"`：用于覆盖命名导出中的函数风格
        * `"expression"`：与字符串选项相同
        * `"declaration"`：与字符串选项相同
        * `"ignore"`：两种风格均可接受

<a id="expression"></a>
### 表达式

使用默认选项 `"expression"` 时，以下代码示例违反此规则：

::: incorrect

```js
/*eslint func-style: ["error", "expression"]*/

function foo() {
    // ...
}
```

:::

使用默认选项 `"expression"` 时，以下代码示例符合此规则：

::: correct

```js
/*eslint func-style: ["error", "expression"]*/

const foo = function() {
    // ...
};

const foo1 = () => {};

// allowed as allowArrowFunctions : false is applied only for declaration
```

:::

此规则不会将重载的函数声明报告为错误。这类函数使用相同名称进行多次声明，但参数类型或返回类型不同（TypeScript 中常用这种方式，为同一函数的不同调用方式提供类型信息）。

使用默认选项 `"expression"` 时，以下 TypeScript 代码示例符合此规则：

::: correct

```ts
/*eslint func-style: ["error", "expression"]*/

function process(value: string): string;
function process(value: number): number;
function process(value: unknown) {
    return value;
}
```

:::

<a id="declaration"></a>
### 声明

使用选项 `"declaration"` 时，以下代码示例违反此规则：

::: incorrect

```js
/*eslint func-style: ["error", "declaration"]*/

const foo = function() {
    // ...
};

const foo1 = () => {};
```

:::

使用选项 `"declaration"` 时，以下代码示例符合此规则：

::: correct

```js
/*eslint func-style: ["error", "declaration"]*/

function foo() {
    // ...
}

// Methods (functions assigned to objects) are not checked by this rule
SomeObject.foo = function() {
    // ...
};
```

:::

<a id="allowarrowfunctions"></a>
### 允许箭头函数

使用选项 `"declaration", { "allowArrowFunctions": true }` 时，以下额外的代码示例符合此规则：

::: correct

```js
/*eslint func-style: ["error", "declaration", { "allowArrowFunctions": true }]*/

const foo = () => {};
```

:::

<a id="allowtypeannotation"></a>
### 允许类型注释

使用选项 `"declaration", { "allowTypeAnnotation": true }` 时，以下 TypeScript 代码示例违反此规则：

::: incorrect

```ts
/*eslint func-style: ["error", "declaration", { "allowTypeAnnotation": true }]*/

const foo = function(): void {};
```

:::

使用选项 `"declaration", { "allowTypeAnnotation": true }` 时，以下 TypeScript 代码示例符合此规则：

::: correct

```ts
/*eslint func-style: ["error", "declaration", { "allowTypeAnnotation": true }]*/

type Fn = () => undefined;

const foo: Fn = function() {};

const bar: Fn = () => {};
```

:::

<a id="overrides"></a>
### 覆盖项

#### namedExports

<a id="expression-1"></a>
##### 表达式

使用选项 `"declaration"` 和 `{"overrides": { "namedExports": "expression" }}` 时，以下代码示例违反此规则：

::: incorrect

```js
/*eslint func-style: ["error", "declaration", { "overrides": { "namedExports": "expression" } }]*/

export function foo() {
    // ...
}
```

:::

使用选项 `"declaration"` 和 `{"overrides": { "namedExports": "expression" }}` 时，以下代码示例符合此规则：

::: correct

```js
/*eslint func-style: ["error", "declaration", { "overrides": { "namedExports": "expression" } }]*/

export const foo = function() {
    // ...
};

export const bar = () => {};
```

:::

<a id="declaration-1"></a>
##### 声明

使用选项 `"expression"` 和 `{"overrides": { "namedExports": "declaration" }}` 时，以下代码示例违反此规则：

::: incorrect

```js
/*eslint func-style: ["error", "expression", { "overrides": { "namedExports": "declaration" } }]*/

export const foo = function() {
    // ...
};

export const bar = () => {};
```

:::

使用选项 `"expression"` 和 `{"overrides": { "namedExports": "declaration" }}` 时，以下代码示例符合此规则：

::: correct

```js
/*eslint func-style: ["error", "expression", { "overrides": { "namedExports": "declaration" } }]*/

export function foo() {
    // ...
}
```

:::

使用选项 `"expression"` 和 `{ "allowTypeAnnotation": true, "overrides": { "namedExports": "declaration" }}` 时，以下代码示例符合此规则：

::: correct

```ts
/*eslint func-style: ["error", "expression", { "allowTypeAnnotation": true, "overrides": { "namedExports": "declaration" } }]*/

export const foo: () => void = function () {}
```

:::

##### ignore

使用选项 `{"overrides": { "namedExports": "ignore" }}` 时，以下代码示例符合此规则：

::: correct

```js
/*eslint func-style: ["error", "expression", { "overrides": { "namedExports": "ignore" } }]*/

export const foo = function() {
    // ...
};

export const bar = () => {};

export function baz() {
    // ...
}
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用此规则

如果你希望开发者自行决定如何编写函数，可以禁用此规则。
