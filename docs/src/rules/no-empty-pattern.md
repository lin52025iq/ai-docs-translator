---
title: no-empty-pattern
rule_type: problem
---



使用解构时，可能会创建一个不起作用的模式。当嵌入式对象解构模式右侧使用空花括号时，就会发生这种情况，例如：

```js
// doesn't create any variables
const {a: {}} = foo;
```

在这段代码中，不会创建任何新变量，因为 `a` 只是一个定位辅助项，而 `{}` 本应包含要创建的变量，例如：

```js
// creates variable b
const {a: { b }} = foo;
```

很多时候，空对象模式是一个错误，作者原本想使用默认值，例如：

```js
// creates variable a
const {a = {}} = foo;
```

这两种模式之间的区别很微妙，尤其是因为有问题的空模式看起来就像对象字面量。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记解构对象和数组中的所有空模式，因此每当遇到空模式时都会报告问题。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-empty-pattern: "error"*/

const {} = foo;
const [] = foo;
const {a: {}} = foo;
const {a: []} = foo;
function foo({}) {}
function bar([]) {}
function baz({a: {}}) {}
function qux({a: []}) {}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-empty-pattern: "error"*/

const {a = {}} = foo;
const {b = []} = foo;
function foo({a = {}}) {}
function bar({a = []}) {}
```

:::

<a id="options"></a>

## 选项

此规则有一个用于设置例外的对象选项：

### allowObjectPatternsAsParameters

默认设置为 `false`。将此选项设为 `true` 后，函数参数中允许使用空对象模式。

**注意：** 此规则不允许函数参数中使用空数组模式。

启用 `{"allowObjectPatternsAsParameters": true}` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-empty-pattern: ["error", { "allowObjectPatternsAsParameters": true }]*/

function foo({a: {}}) {}
const bar = function({a: {}}) {};
const qux = ({a: {}}) => {};
const quux = ({} = bar) => {};
const item = ({} = { bar: 1 }) => {};

function baz([]) {}
```

:::

启用 `{"allowObjectPatternsAsParameters": true}` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-empty-pattern: ["error", { "allowObjectPatternsAsParameters": true }]*/

function foo({}) {}
const bar = function({}) {};
const qux = ({}) => {};

function baz({} = {}) {}
```

:::