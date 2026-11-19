---
title: no-implicit-coercion
rule_type: suggestion
---



在 JavaScript 中，有许多不同的方式可以转换值的类型。
其中一些可能难以阅读和理解。

例如：

```js
const b = !!foo;
const b1 = ~foo.indexOf(".");
const n = +foo;
const n1 = -(-foo);
const n2 = foo - 0;
const n3 = 1 * foo;
const s = "" + foo;
foo += ``;
```

这些写法可以替换为以下代码：

```js
const b = Boolean(foo);
const b1 = foo.indexOf(".") !== -1;
const n = Number(foo);
const n1 = Number(foo);
const n2 = Number(foo);
const n3 = Number(foo);
const s = String(foo);
foo = String(foo);
```

<a id="rule-details"></a>

## 规则详情

此规则旨在标记较短的类型转换写法，并建议使用更易于理解的写法。

<a id="options"></a>

## 选项

此规则有三个主要选项，以及一个用于按需允许某些强制转换的覆盖选项。

* `"boolean"`（默认为 `true`）- 为 `true` 时，此规则会对 `boolean` 类型的较短转换写法发出警告。
* `"number"`（默认为 `true`）- 为 `true` 时，此规则会对 `number` 类型的较短转换写法发出警告。
* `"string"`（默认为 `true`）- 为 `true` 时，此规则会对 `string` 类型的较短转换写法发出警告。
* `"disallowTemplateShorthand"`（默认为 `false`）- 为 `true` 时，此规则会对使用 `${expression}` 形式的 `string` 类型转换发出警告。
* `"allow"`（默认为 `empty`）- 此数组中的每个条目可以是 `~`、`!!`、`+`、`- -`、`-` 或 `*`，用于允许相应的运算符。

请注意，`allow` 列表中的运算符 `+` 会同时允许 `+foo`（数字强制转换）和 `"" + foo`（字符串强制转换）。

<a id="boolean"></a>

### 布尔值

默认选项 `{ "boolean": true }` 下的**错误**代码示例：

::: incorrect

```js
/*eslint no-implicit-coercion: "error"*/

const b = !!foo;
const b1 = ~foo.indexOf(".");
// bitwise not is incorrect only with `indexOf`/`lastIndexOf` method calling.
```

:::

默认选项 `{ "boolean": true }` 下的**正确**代码示例：

::: correct

```js
/*eslint no-implicit-coercion: "error"*/

const b = Boolean(foo);
const b1 = foo.indexOf(".") !== -1;

const n = ~foo; // This is a just bitwise not.
```

:::

<a id="number"></a>

### 数字

默认选项 `{ "number": true }` 下的**错误**代码示例：

::: incorrect

```js
/*eslint no-implicit-coercion: "error"*/

const n = +foo;
const n1 = -(-foo);
const n2 = foo - 0;
const n3 = 1 * foo;
```

:::

默认选项 `{ "number": true }` 下的**正确**代码示例：

::: correct

```js
/*eslint no-implicit-coercion: "error"*/

const n = Number(foo);
const n1 = parseFloat(foo);
const n2 = parseInt(foo, 10);

const n3 = foo * 1/4; // `* 1` is allowed when followed by the `/` operator
```

:::

<a id="string"></a>

### 字符串

默认选项 `{ "string": true }` 下的**错误**代码示例：

::: incorrect

```js
/*eslint no-implicit-coercion: "error"*/

const s = "" + foo;
const s1 = `` + foo;
foo += "";
foo += ``;
```

:::

默认选项 `{ "string": true }` 下的**正确**代码示例：

::: correct

```js
/*eslint no-implicit-coercion: "error"*/

const s = String(foo);
foo = String(foo);
```

:::

<a id="disallowtemplateshorthand"></a>

### 禁止模板简写

此选项**不受** `string` 选项影响。

选项 `{ "disallowTemplateShorthand": true }` 下的**错误**代码示例：

::: incorrect

```js
/*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": true }]*/

const s = `${foo}`;
```

:::

选项 `{ "disallowTemplateShorthand": true }` 下的**正确**代码示例：

::: correct

```js
/*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": true }]*/

const s = String(foo);

const s1 = `a${foo}`;

const s2 = `${foo}b`;

const s3 = `${foo}${bar}`;

const s4 = tag`${foo}`;
```

:::

默认选项 `{ "disallowTemplateShorthand": false }` 下的**正确**代码示例：

::: correct

```js
/*eslint no-implicit-coercion: ["error", { "disallowTemplateShorthand": false }]*/

const s = `${foo}`;
```

:::

<a id="allow"></a>

### 允许

使用 `allow` 列表，可以覆盖默认设置并允许特定运算符。

示例选项 `{ "allow": ["!!", "~"] }` 下的**正确**代码示例：

::: correct

```js
/*eslint no-implicit-coercion: [2, { "allow": ["!!", "~"] } ]*/

const b = !!foo;
const b1 = ~foo.indexOf(".");
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果不希望收到关于较短类型转换写法的提示，可以放心禁用此规则。
