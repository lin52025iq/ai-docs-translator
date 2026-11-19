---
title: no-magic-numbers
rule_type: suggestion
---


“魔法数字”是指在代码中多次出现、却没有明确含义的数字。
最好用具名常量替换它们。

```js
const now = Date.now(),
    inOneHour = now + (60 * 60 * 1000);
```

<a id="rule-details"></a>

## 规则详情

`no-magic-numbers` 规则旨在确保将特殊数字声明为常量，以明确其含义，从而提高代码的可读性并简化重构。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-magic-numbers: "error"*/

const dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * 0.25);
```

:::

::: incorrect

```js
/*eslint no-magic-numbers: "error"*/

const data = ['foo', 'bar', 'baz'];

const dataLast = data[2];
```

:::

::: incorrect

```js
/*eslint no-magic-numbers: "error"*/

let SECONDS;

SECONDS = 60;
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-magic-numbers: "error"*/

const TAX = 0.25;

const dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * TAX);
```

:::

<a id="options"></a>

## 选项

<a id="ignore"></a>

### 忽略指定数值

要忽略的数字数组。默认值为 `[]`。
如果提供此选项，其值必须是 `Array`。

数组可以包含 `number` 和 `string` 类型的值。
如果值为字符串，则文本必须能解析为 `bigint` 字面量（例如，`"100n"`）。

对于示例选项 `{ "ignore": [1] }`，以下代码正确：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignore": [1] }]*/

const data = ['foo', 'bar', 'baz'];
const dataLast = data.length && data[data.length - 1];
```

:::

对于示例选项 `{ "ignore": ["1n"] }`，以下代码正确：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignore": ["1n"] }]*/

foo(1n);
```

:::

<a id="ignorearrayindexes"></a>

### 忽略数组索引

布尔值，用于指定在数组索引上下文中使用的数字（例如 `data[2]`）是否可以接受。默认值为 `false`。

此选项仅允许有效的数组索引：即会被强制转换为 `"0"`、`"1"`、`"2"`……`"4294967294"` 之一的数字。

数组是对象，因此可以具有诸如 `"-1"` 或 `"2.5"` 这样的属性名。不过，这些只是普通的对象属性，并不代表数组元素。它们不会影响数组的 `length`，也会被 `.map` 或 `.forEach` 等数组方法忽略。

此外，由于最大[数组长度](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)为 2<sup>32</sup> - 1，所有大于 2<sup>32</sup> - 2 的值也只代表普通属性名，因此不视为数组索引。

对于选项 `{ "ignoreArrayIndexes": true }`，以下代码正确：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/

const item = data[2];

data[100] = a;

f(data[0]);

a = data[-0]; // same as data[0], -0 will be coerced to "0"
a = data[+1]; // same as data[1], +1 will be coerced to "1"

a = data[0xAB];

a = data[5.6e1];

a = data[10n]; // same as data[10], 10n will be coerced to "10"

a = data[4294967294]; // max array index
```

:::

对于选项 `{ "ignoreArrayIndexes": true }`，以下代码错误：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/

f(2); // not used as array index

a = data[-1];

a = data[2.5];

a = data[5.67e1];

a = data[-10n];

a = data[4294967295]; // above the max array index

a = data[1e500]; // same as data["Infinity"]
```

:::

<a id="ignoredefaultvalues"></a>

### 忽略默认值

布尔值，用于指定默认值赋值中使用的数字是否可以接受。默认值为 `false`。

对于选项 `{ "ignoreDefaultValues": true }`，以下代码正确：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreDefaultValues": true }]*/

const { tax = 0.25 } = accountancy;

function mapParallel(concurrency = 3) { /***/ }
```

:::

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreDefaultValues": true }]*/

let head;
[head = 100] = []
```

:::

<a id="ignoreclassfieldinitialvalues"></a>

### 忽略类字段初始值

布尔值，用于指定用作类字段初始值的数字是否可以接受。默认值为 `false`。

对于选项 `{ "ignoreClassFieldInitialValues": true }`，以下代码正确：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "ignoreClassFieldInitialValues": true }]*/

class C {
    foo = 2;
    bar = -3;
    tux = +1;
    #baz = 4;
    static qux = 5;
}
```

:::

对于选项 `{ "ignoreClassFieldInitialValues": true }`，以下代码错误：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "ignoreClassFieldInitialValues": true }]*/

class C {
    foo = 2 + 3;
}

class D {
    2;
}
```

:::

<a id="enforceconst"></a>

### 强制使用 const

布尔值，用于指定是否检查数字变量声明中是否使用了 const 关键字。默认值为 `false`。

对于选项 `{ "enforceConst": true }`，以下代码错误：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "enforceConst": true }]*/

let TAX = 0.25;

let dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * TAX);
```

:::

<a id="detectobjects"></a>

### 检测对象

布尔值，用于指定是否检测例如设置对象属性时使用的数字。默认值为 `false`。

对于选项 `{ "detectObjects": true }`，以下代码错误：

::: incorrect

```js
/*eslint no-magic-numbers: ["error", { "detectObjects": true }]*/

const magic = {
  tax: 0.25
};

const dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * magic.tax);
```

:::

对于选项 `{ "detectObjects": true }`，以下代码正确：

::: correct

```js
/*eslint no-magic-numbers: ["error", { "detectObjects": true }]*/

const TAX = 0.25;

const magic = {
  tax: TAX
};

const dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * magic.tax);
```

:::

<a id="ignoreenums-typescript-only"></a>

### 忽略枚举（仅限 TypeScript）

指定是否可以接受 TypeScript 中使用的枚举。默认值为 `false`。

对于选项 `{ "ignoreEnums": false }`，以下代码错误：

::: incorrect

```ts
/*eslint no-magic-numbers: ["error", { "ignoreEnums": false }]*/

enum foo {
  SECOND = 1000,
}
```

:::

对于选项 `{ "ignoreEnums": true }`，以下代码正确：

::: correct

```ts
/*eslint no-magic-numbers: ["error", { "ignoreEnums": true }]*/

enum foo {
  SECOND = 1000,
}
```

:::

<a id="ignorenumericliteraltypes-typescript-only"></a>

### 忽略数字字面量类型（仅限 TypeScript）

指定是否可以接受 TypeScript 数字字面量类型中使用的数字。默认值为 `false`。

对于选项 `{ "ignoreNumericLiteralTypes": false }`，以下代码错误：

::: incorrect

```ts
/*eslint no-magic-numbers: ["error", { "ignoreNumericLiteralTypes": false }]*/

type Foo = 1 | 2 | 3;
```

:::

对于选项 `{ "ignoreNumericLiteralTypes": true }`，以下代码正确：

::: correct

```ts
/*eslint no-magic-numbers: ["error", { "ignoreNumericLiteralTypes": true }]*/

type Foo = 1 | 2 | 3;
```

:::

<a id="ignorereadonlyclassproperties-typescript-only"></a>

### 忽略只读类属性（仅限 TypeScript）

指定是否可以接受 TypeScript 只读类属性中使用的数字。默认值为 `false`。

对于选项 `{ "ignoreReadonlyClassProperties": false }`，以下代码错误：

::: incorrect

```ts
/*eslint no-magic-numbers: ["error", { "ignoreReadonlyClassProperties": false }]*/

class Foo {
  readonly A = 1;
  readonly B = 2;
  public static readonly C = 1;
  static readonly D = 1;
}
```

:::

对于选项 `{ "ignoreReadonlyClassProperties": true }`，以下代码正确：

::: correct

```ts
/*eslint no-magic-numbers: ["error", { "ignoreReadonlyClassProperties": true }]*/

class Foo {
  readonly A = 1;
  readonly B = 2;
  public static readonly C = 1;
  static readonly D = 1;
}
```

:::

<a id="ignoretypeindexes-typescript-only"></a>

### 忽略类型索引（仅限 TypeScript）

指定是否可以接受用于索引类型的数字。默认值为 `false`。

对于选项 `{ "ignoreTypeIndexes": false }`，以下代码错误：

::: incorrect

```ts
/*eslint no-magic-numbers: ["error", { "ignoreTypeIndexes": false }]*/

type Foo = Bar[0];
type Baz = Parameters<Foo>[2];
```

:::

对于选项 `{ "ignoreTypeIndexes": true }`，以下代码正确：

::: correct

```ts
/*eslint no-magic-numbers: ["error", { "ignoreTypeIndexes": true }]*/

type Foo = Bar[0];
type Baz = Parameters<Foo>[2];
```

:::
