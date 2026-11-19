---
title: init-declarations
rule_type: suggestion
related_rules:
- no-unassigned-vars
---


在 JavaScript 中，变量可以在声明时赋值，也可以在之后的任意时刻通过赋值语句赋值。例如，在以下代码中，`foo` 在声明时初始化，而 `bar` 则在之后初始化。

```js
let foo = 1;
let bar;

if (foo) {
    bar = 1;
} else {
    bar = 2;
}
```

<a id="rule-details"></a>

## 规则详情

此规则旨在强制要求或禁止在声明时初始化变量。例如，在以下代码中，`foo` 在声明时初始化，而 `bar` 则没有。

```js
let foo = 1;
let bar;

bar = 2;
```

此规则旨在使变量初始化和声明的方式保持一致。

<a id="options"></a>

## 选项

此规则接受两个选项：

1. 一个字符串，只能是 `"always"`（默认值），表示强制要求在声明时初始化；或 `"never"`，表示禁止在声明时初始化。此规则适用于 `var`、`let`、`const`、`using` 和 `await using` 变量。不过，对于 `const`、`using` 和 `await using` 变量，`"never"` 会被忽略，因为不初始化这些变量会导致解析错误。
2. 一个用于进一步控制此规则行为的对象。目前唯一可用的参数是 `ignoreForLoopInit`，它表示设置为 `"never"` 时，是否允许在 `for` 循环中声明变量时初始化。因为这是一个非常常见的用例。

可以按如下方式配置此规则：

变量必须在声明时初始化（默认值）

```json
{
    "init-declarations": ["error", "always"],
}
```

变量不得在声明时初始化

```json
{
    "init-declarations": ["error", "never"]
}
```

变量不得在声明时初始化，但允许在 for 循环中这样做

```json
{
    "init-declarations": ["error", "never", { "ignoreForLoopInit": true }]
}
```

### always

默认选项 `"always"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint init-declarations: ["error", "always"]*/

function foo() {
    var bar;
    let baz;
}
```

:::

默认选项 `"always"` 下的**正确**代码示例：

::: correct

```js
/*eslint init-declarations: ["error", "always"]*/

function foo() {
    var bar = 1;
    let baz = 2;
    const qux = 3;
	using quux = getSomething();
}

async function foobar() {
	await using quux = getSomething();
}
```

:::

### never

选项 `"never"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint init-declarations: ["error", "never"]*/

function foo() {
    var bar = 1;
    let baz = 2;

    for (let i = 0; i < 1; i++) {}
}
```

:::

选项 `"never"` 下的**正确**代码示例：

::: correct

```js
/*eslint init-declarations: ["error", "never"]*/

function foo() {
    var bar;
    let baz;
    const buzz = 1;
	using quux = getSomething();
}

async function foobar() {
	await using quux = getSomething();
}
```

:::

选项 `"never"` 会忽略 `const`、`using` 和 `await using` 变量的初始化。

### ignoreForLoopInit

选项 `"never", { "ignoreForLoopInit": true }` 下的**正确**代码示例：

::: correct

```js
/*eslint init-declarations: ["error", "never", { "ignoreForLoopInit": true }]*/
for (let i = 0; i < 1; i++) {}
```

:::

此规则还支持 TypeScript 类型语法。

此规则的 TypeScript **错误**代码示例：

::: incorrect

```ts
/* eslint init-declarations: ["error", "never"] */

let arr: string[] = ['arr', 'ar'];

const class1 = class NAME {
	constructor() {
	  var name1: string = 'hello';
	}
};

namespace myLib {
	let numberOfGreetings: number = 2;
}

```

:::

::: incorrect

```ts
/* eslint init-declarations: ["error", "always"] */

namespace myLib {
	let numberOfGreetings: number;
}

namespace myLib1 {
	const foo: number;
	namespace myLib2 {
	  let bar: string;
	  namespace myLib3 {
		let baz: object;
	  }
	}
}

```

:::

此规则的 TypeScript **正确**代码示例：

::: correct

```ts
/* eslint init-declarations: ["error", "never"] */

declare const foo: number;

declare namespace myLib {
	let numberOfGreetings: number;
}

interface GreetingSettings {
	greeting: string;
	duration?: number;
	color?: string;
}
```

:::

::: correct

```ts
/* eslint init-declarations: ["error", "always"] */

declare const foo: number;

declare namespace myLib {
	let numberOfGreetings: number;
}

interface GreetingSettings {
	greeting: string;
	duration?: number;
	color?: string;
}

```

:::


<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不在意变量以何种方式初始化，就不应使用此规则。
