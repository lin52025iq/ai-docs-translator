---
title: array-bracket-spacing
rule_type: layout
related_rules:
- space-in-parens
- object-curly-spacing
- computed-property-spacing
---
许多风格指南要求或禁止在数组方括号与其他标记之间添加空格。此规则适用于数组字面量和解构赋值（ECMAScript 6）。

```js
var arr = [ 'foo', 'bar' ];
var [ x, y ] = z;

var arr = ['foo', 'bar'];
var [x,y] = z;
```

<a id="rule-details"></a>

## 规则详情

此规则用于确保数组方括号内的空格保持一致。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"never"`（默认值）禁止在数组方括号内添加空格
* `"always"` 要求在数组方括号内添加一个或多个空格或换行符

此规则有一个对象选项，用于设置 `"never"` 选项的例外情况：

* `"singleValue": true` 要求在只包含一个元素的数组字面量的方括号内添加一个或多个空格或换行符
* `"objectsInArrays": true` 要求在数组字面量的方括号与其对象字面量元素的大括号之间添加一个或多个空格或换行符，即 `[ {` 或 `} ]`
* `"arraysInArrays": true` 要求在数组字面量的方括号与其数组字面量元素的方括号之间添加一个或多个空格或换行符，即 `[ [` 或 `] ]`

此规则有一个对象选项，用于设置 `"always"` 选项的例外情况：

* `"singleValue": false` 禁止在只包含一个元素的数组字面量的方括号内添加空格
* `"objectsInArrays": false` 禁止在数组字面量的方括号与其对象字面量元素的大括号之间添加空格，即 `[{` 或 `}]`
* `"arraysInArrays": false` 禁止在数组字面量的方括号与其数组字面量元素的方括号之间添加空格，即 `[[` 或 `]]`

此规则内置了以下例外情况：

* `"never"`（以及 `"always"` 选项的例外情况）允许在数组方括号内换行，因为这是一种常见的写法
* `"always"` 不要求在空数组字面量 `[]` 中添加空格或换行符

### never

使用默认的 `"never"` 选项时，此规则下的**错误**代码示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "never"]*/

var arr = [ 'foo', 'bar' ];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar'];
var arr = [[ 'foo' ], 'bar'];
var arr = [ 'foo',
  'bar'
];
var [ x, y ] = z;
var [ x,y ] = z;
var [ x, ...y ] = z;
var [ ,,x, ] = z;
```

:::

使用默认的 `"never"` 选项时，此规则下的**正确**代码示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "never"]*/

var arr = [];
var arr = ['foo', 'bar', 'baz'];
var arr = [['foo'], 'bar', 'baz'];
var arr = [
  'foo',
  'bar',
  'baz'
];
var arr = ['foo',
  'bar'
];
var arr = [
  'foo',
  'bar'];

var [x, y] = z;
var [x,y] = z;
var [x, ...y] = z;
var [,,x,] = z;
```

:::

### always

使用 `"always"` 选项时，此规则下的**错误**代码示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always"]*/

var arr = ['foo', 'bar'];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar' ];
var arr = ['foo',
  'bar'
];
var arr = [
  'foo',
  'bar'];

var [x, y] = z;
var [x,y] = z;
var [x, ...y] = z;
var [,,x,] = z;
```

:::

使用 `"always"` 选项时，此规则下的**正确**代码示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always"]*/

var arr = [];
var arr = [ 'foo', 'bar', 'baz' ];
var arr = [ [ 'foo' ], 'bar', 'baz' ];
var arr = [ 'foo',
  'bar'
];
var arr = [
  'foo',
  'bar' ];
var arr = [
  'foo',
  'bar',
  'baz'
];

var [ x, y ] = z;
var [ x,y ] = z;
var [ x, ...y ] = z;
var [ ,,x, ] = z;
```

:::

### singleValue

使用 `"always", { "singleValue": false }` 选项时，此规则下的**错误**代码示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always", { "singleValue": false }]*/

var foo = [ 'foo' ];
var foo = [ 'foo'];
var foo = ['foo' ];
var foo = [ 1 ];
var foo = [ 1];
var foo = [1 ];
var foo = [ [ 1, 2 ] ];
var foo = [ { 'foo': 'bar' } ];
```

:::

使用 `"always", { "singleValue": false }` 选项时，此规则下的**正确**代码示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always", { "singleValue": false }]*/

var foo = ['foo'];
var foo = [1];
var foo = [[ 1, 1 ]];
var foo = [{ 'foo': 'bar' }];
```

:::

### objectsInArrays

使用 `"always", { "objectsInArrays": false }` 选项时，此规则下的**错误**代码示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always", { "objectsInArrays": false }]*/

var arr = [ { 'foo': 'bar' } ];
var arr = [ {
  'foo': 'bar'
} ]
```

:::

使用 `"always", { "objectsInArrays": false }` 选项时，此规则下的**正确**代码示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always", { "objectsInArrays": false }]*/

var arr = [{ 'foo': 'bar' }];
var arr = [{
  'foo': 'bar'
}];
```

:::

### arraysInArrays

使用 `"always", { "arraysInArrays": false }` 选项时，此规则下的**错误**代码示例：

:::incorrect

```js
/*eslint array-bracket-spacing: ["error", "always", { "arraysInArrays": false }]*/

var arr = [ [ 1, 2 ], 2, 3, 4 ];
var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];
```

:::

使用 `"always", { "arraysInArrays": false }` 选项时，此规则下的**正确**代码示例：

:::correct

```js
/*eslint array-bracket-spacing: ["error", "always", { "arraysInArrays": false }]*/

var arr = [[ 1, 2 ], 2, 3, 4 ];
var arr = [[ 1, 2 ], 2, [ 3, 4 ]];
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不在意数组方括号间空格的一致性，可以关闭此规则。
