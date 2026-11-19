---
title: object-curly-spacing
rule_type: layout
related_rules:
- array-bracket-spacing
- comma-spacing
- computed-property-spacing
- space-in-parens
---
虽然格式偏好因人而异，但许多风格指南会要求或禁止在以下情况下于花括号之间添加空格：

```js
// simple object literals
var obj = { foo: "bar" };

// nested object literals
var obj = { foo: { zoo: "bar" } };

// destructuring assignment (EcmaScript 6)
var { x, y } = y;

// import/export declarations (EcmaScript 6)
import { foo } from "bar";
export { foo };
```

<a id="rule-details"></a>

## 规则详情

此规则要求对象字面量、解构赋值以及导入/导出说明符的花括号内空格保持一致。

<a id="options"></a>

## 选项

此规则有两个选项：字符串选项和对象选项。

字符串选项：

* `"never"`（默认值）禁止在花括号内添加空格
* `"always"` 要求在花括号内添加空格（`{}` 除外）

对象选项：

* `"arraysInObjects": true` 要求在以数组元素开头和/或结尾的对象的花括号内添加空格（仅当第一个选项设为 `never` 时适用）
* `"arraysInObjects": false` 禁止在以数组元素开头和/或结尾的对象的花括号内添加空格（仅当第一个选项设为 `always` 时适用）
* `"objectsInObjects": true` 要求在以对象元素开头和/或结尾的对象的花括号内添加空格（仅当第一个选项设为 `never` 时适用）
* `"objectsInObjects": false` 禁止在以对象元素开头和/或结尾的对象的花括号内添加空格（仅当第一个选项设为 `always` 时适用）

### never

使用默认选项 `"never"` 时，此规则的以下代码示例**错误**：

::: incorrect

```js
/*eslint object-curly-spacing: ["error", "never"]*/

var obj = { 'foo': 'bar' };
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux'}, bar};
var {x } = y;
import { foo } from 'bar';
```

:::

使用默认选项 `"never"` 时，此规则的以下代码示例**正确**：

::: correct

```js
/*eslint object-curly-spacing: ["error", "never"]*/

var obj = {'foo': 'bar'};
var obj = {'foo': {'bar': 'baz'}, 'qux': 'quxx'};
var obj = {
  'foo': 'bar'
};
var obj = {'foo': 'bar'
};
var obj = {
  'foo':'bar'};
var obj = {};
var {x} = y;
import {foo} from 'bar';
```

:::

### always

使用选项 `"always"` 时，此规则的以下代码示例**错误**：

::: incorrect

```js
/*eslint object-curly-spacing: ["error", "always"]*/

var obj = {'foo': 'bar'};
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux' }, bar};
var obj = {'foo': 'bar'
};
var obj = {
  'foo':'bar'};
var {x} = y;
import {foo } from 'bar';
```

:::

使用选项 `"always"` 时，此规则的以下代码示例**正确**：

::: correct

```js
/*eslint object-curly-spacing: ["error", "always"]*/

var obj = {};
var obj = { 'foo': 'bar' };
var obj = { 'foo': { 'bar': 'baz' }, 'qux': 'quxx' };
var obj = {
  'foo': 'bar'
};
var { x } = y;
import { foo } from 'bar';
```

:::

#### arraysInObjects

使用选项 `"never", { "arraysInObjects": true }` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "never", { "arraysInObjects": true }]*/

var obj = {"foo": [ 1, 2 ] };
var obj = {"foo": [ "baz", "bar" ] };
```

:::

使用选项 `"always", { "arraysInObjects": false }` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "always", { "arraysInObjects": false }]*/

var obj = { "foo": [ 1, 2 ]};
var obj = { "foo": [ "baz", "bar" ]};
```

:::

#### objectsInObjects

使用选项 `"never", { "objectsInObjects": true }` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "never", { "objectsInObjects": true }]*/

var obj = {"foo": {"baz": 1, "bar": 2} };
```

:::

使用选项 `"always", { "objectsInObjects": false }` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint object-curly-spacing: ["error", "always", { "objectsInObjects": false }]*/

var obj = { "foo": { "baz": 1, "bar": 2 }};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不关心花括号之间空格的一致性，可以关闭此规则。
