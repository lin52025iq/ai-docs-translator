---
title: space-in-brackets

related_rules:
- array-bracket-spacing
- object-curly-spacing
- space-in-parens
- computed-property-spacing
---

强制要求对象字面量的大括号和数组字面量的方括号内的空格保持一致。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [object-curly-spacing](object-curly-spacing) 和 [array-bracket-spacing](array-bracket-spacing) 规则取代。
:::

虽然格式偏好因人而异，但许多风格指南要求或禁止在括号内添加空格：

```js
var obj = { foo: 'bar' };
var arr = [ 'foo', 'bar' ];
foo[ 'bar' ];

var obj = {foo: 'bar'};
var arr = ['foo', 'bar'];
foo['bar'];
```

<a id="rule-details"></a>

## 规则详情

此规则旨在确保方括号内的空格用法一致：可以禁止括号与其他标记之间的空格，也可以强制添加空格。与相邻值之间隔着换行符的括号不受此规则约束，因为这是一种常见模式。作为数组首个或末个元素的对象字面量也会被忽略。

<a id="options"></a>

## 选项

此规则有两个选项：

* `"always"` 强制要求对象字面量和数组字面量内有空格
* `"never"` 强制要求对象字面量和数组字面量内没有空格（默认值）

根据你的代码规范，可以在配置中指定其中一个选项：

```json
"space-in-brackets": ["error", "always"]
```

<a id="never"></a>

### "never"

使用默认选项 `"never"` 时，此规则的**错误**代码示例：

::: incorrect

```js
foo[ 'bar' ];
foo['bar' ];

var arr = [ 'foo', 'bar' ];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar'];
var arr = [[ 'foo' ], 'bar'];
var arr = ['foo',
  'bar'
];

var obj = { 'foo': 'bar' };
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux' }, bar};
```

:::

使用默认选项 `"never"` 时，此规则的**正确**代码示例：

::: correct

```js
// When options are ["error", "never"]

foo['bar'];
foo[
  'bar'
];
foo[
  'bar'];

var arr = [];
var arr = ['foo', 'bar', 'baz'];
var arr = [['foo'], 'bar', 'baz'];
var arr = [
  'foo',
  'bar',
  'baz'
];

var arr = [
  'foo',
  'bar'];

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
```

:::

<a id="always"></a>

### "always"

使用选项 `"always"` 时，此规则的**错误**代码示例：

::: incorrect

```js
foo['bar'];
foo['bar' ];
foo[ 'bar'];

var arr = ['foo', 'bar'];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar' ];
var arr = ['foo',
  'bar'
];

var arr = [
  'foo',
  'bar'];

var obj = {'foo': 'bar'};
var obj = {'foo': 'bar' };
var obj = { baz: {'foo': 'qux'}, bar};
var obj = {baz: { 'foo': 'qux' }, bar};
var obj = {'foo': 'bar'
};

var obj = {
  'foo':'bar'};
```

:::

使用选项 `"always"` 时，此规则的**正确**代码示例：

::: correct

```js
foo[ 'bar' ];
foo[
  'bar'
];

var arr = [];
var arr = [ 'foo', 'bar', 'baz' ];
var arr = [ [ 'foo' ], 'bar', 'baz' ];

var arr = [
  'foo',
  'bar',
  'baz'
];

var obj = {};
var obj = { 'foo': 'bar' };
var obj = { 'foo': { 'bar': 'baz' }, 'qux': 'quxx' };
var obj = {
  'foo': 'bar'
};
```

:::

请注意，`"always"` 有一个特殊情况：`{}` 和 `[]` 不会被视为问题。

<a id="exceptions"></a>

### 例外

可以将对象字面量作为第三个数组项，用于指定空格例外。这些例外是在第一个选项的上下文中生效的。也就是说，如果设置 `"always"` 来强制添加空格，而某个例外设为 `false`，则匹配该例外的情况将禁止添加空格。同样，如果设置 `"never"` 来禁止添加空格，而某个例外设为 `true`，则匹配该例外的情况将强制添加空格。

可以按如下方式添加例外：

对于 `"always"` 选项，将例外设为 `false` 以启用该例外：

```json
"space-in-brackets": ["error", "always", {
  "singleValue": false,
  "objectsInArrays": false,
  "arraysInArrays": false,
  "arraysInObjects": false,
  "objectsInObjects": false,
  "propertyName": false
}]
```

对于 `"never"` 选项，将例外设为 `true` 以启用该例外：

```json
"space-in-brackets": ["error", "never", {
  "singleValue": true,
  "objectsInArrays": true,
  "arraysInArrays": true,
  "arraysInObjects": true,
  "objectsInObjects": true,
  "propertyName": true
}]
```

可用的例外如下：

* `singleValue` 设置数组方括号内单个值周围的空格。
* `objectsInArrays` 设置作为数组首个或末个元素的对象字面量，其大括号与方括号之间的空格。
* `arraysInArrays` 设置作为数组首个或末个元素的数组字面量，其方括号之间的空格。
* `arraysInObjects` 设置作为对象末个元素的数组字面量，其方括号与大括号之间的空格。
* `objectsInObjects` 设置作为对象末个元素的对象字面量，其大括号与外层对象的大括号之间的空格。
* `propertyName` 设置计算成员表达式方括号内的空格。

以下示例均假设使用 `"always"` 选项。

当 `"singleValue"` 设为 `false` 时，此规则的**错误**代码示例：

::: incorrect

```js
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

当 `"singleValue"` 设为 `false` 时，此规则的**正确**代码示例：

::: correct

```js
var foo = ['foo'];
var foo = [1];
var foo = [[ 1, 1 ]];
var foo = [{ 'foo': 'bar' }];
```

:::

当 `"objectsInArrays"` 设为 `false` 时的**错误**代码示例：

::: incorrect

```js
var arr = [ { 'foo': 'bar' } ];
var arr = [ {
  'foo': 'bar'
} ]
```

:::

当 `"objectsInArrays"` 设为 `false` 时的**正确**代码示例：

::: correct

```js
var arr = [{ 'foo': 'bar' }];
var arr = [{
  'foo': 'bar'
}];
```

:::

当 `"arraysInArrays"` 设为 `false` 时的**错误**代码示例：

::: incorrect

```js
var arr = [ [ 1, 2 ], 2, 3, 4 ];
var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];
```

:::

当 `"arraysInArrays"` 设为 `false` 时的**正确**代码示例：

::: correct

```js
var arr = [[ 1, 2 ], 2, 3, 4 ];
var arr = [[ 1, 2 ], 2, [ 3, 4 ]];
```

:::

当 `"arraysInObjects"` 设为 `false` 时的**错误**代码示例：

::: incorrect

```js
var obj = { "foo": [ 1, 2 ] };
var obj = { "foo": [ "baz", "bar" ] };
```

:::

当 `"arraysInObjects"` 设为 `false` 时的**正确**代码示例：

::: correct

```js
var obj = { "foo": [ 1, 2 ]};
var obj = { "foo": [ "baz", "bar" ]};
```

:::

当 `"objectsInObjects"` 设为 `false` 时的**错误**代码示例：

::: incorrect

```js
var obj = { "foo": { "baz": 1, "bar": 2 } };
var obj = { "foo": [ "baz", "bar" ], "qux": { "baz": 1, "bar": 2 } };
```

:::

当 `"objectsInObjects"` 设为 `false` 时的**正确**代码示例：

::: correct

```js
var obj = { "foo": { "baz": 1, "bar": 2 }};
var obj = { "foo": [ "baz", "bar" ], "qux": { "baz": 1, "bar": 2 }};
```

:::

当 `"propertyName"` 设为 `false` 时的**错误**代码示例：

::: incorrect

```js
var foo = obj[ 1 ];
var foo = obj[ bar ];
```

:::

当 `"propertyName"` 设为 `false` 时的**正确**代码示例：

::: correct

```js
var foo = obj[bar];
var foo = obj[0, 1];
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不关心括号之间空格的一致性，可以关闭此规则。
