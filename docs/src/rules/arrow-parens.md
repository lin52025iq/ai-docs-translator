---
title: arrow-parens
rule_type: layout
further_reading:
- https://github.com/airbnb/javascript#arrows--one-arg-parens
---
箭头函数恰好有一个参数时，可以省略圆括号。其他情况下，参数必须用圆括号括起来。此规则用于确保箭头函数中圆括号的使用保持一致。

<a id="rule-details"></a>

## 规则详情

无论参数数量是多少，此规则都会要求箭头函数的参数使用圆括号。例如：

```js
// Bad
a => {}

// Good
(a) => {}
```

遵循这种风格有助于你发现误写在条件中的箭头函数（`=>`），而这里原本可能是要使用 `>=` 这样的比较运算符。

```js
// Bad
if (a => 2) {
}

// Good
if (a >= 2) {
}
```

此规则也可以配置为：在不需要圆括号时，建议不要使用圆括号：

```js
// Bad
(a) => {}

// Good
a => {}
```

<a id="options"></a>

## 选项

此规则有一个字符串选项和一个对象选项。

字符串选项如下：

* `"always"`（默认值）要求所有情况下都在参数周围使用圆括号。
* `"as-needed"` 要求在可以省略圆括号时不使用圆括号。

`"as-needed"` 选项变体的对象属性如下：

* `"requireForBlockBody": true` 修改按需使用圆括号的规则：如果函数体是语句块（用花括号括起来），则要求使用圆括号。

### always

以下是使用默认选项 `"always"` 时违反此规则的代码示例：

:::incorrect

```js
/*eslint arrow-parens: ["error", "always"]*/

a => {};
a => a;
a => {'\n'};
a.then(foo => {});
a.then(foo => a);
a(foo => { if (true) {} });
```

:::

以下是使用默认选项 `"always"` 时符合此规则的代码示例：

:::correct

```js
/*eslint arrow-parens: ["error", "always"]*/

() => {};
(a) => {};
(a) => a;
(a) => {'\n'}
a.then((foo) => {});
a.then((foo) => { if (true) {} });
```

:::

<a id="if-statements"></a>

#### If 语句

此选项的一个好处是，可以防止在条件语句中错误地使用箭头函数：

```js
var a = 1;
var b = 2;
// ...
if (a => b) {
 console.log('bigger');
} else {
 console.log('smaller');
}
// outputs 'bigger', not smaller as expected
```

`if` 语句中的内容是一个箭头函数，而不是比较表达式。

如果确实有意使用箭头函数，应将其用圆括号括起来以消除歧义。

```js
var a = 1;
var b = 0;
// ...
if ((a) => b) {
 console.log('truthy value returned');
} else {
 console.log('falsy value returned');
}
// outputs 'truthy value returned'
```

下面是另一个展示这种行为的示例：

```js
var a = 1, b = 2, c = 3, d = 4;
var f = a => b ? c: d;
// f = ?
```

`f` 是一个箭头函数，它接受 `a` 作为参数，并返回 `b ? c: d` 的结果。

应将其改写如下：

```js
var a = 1, b = 2, c = 3, d = 4;
var f = (a) => b ? c: d;
```

### as-needed

以下是使用 `"as-needed"` 选项时违反此规则的代码示例：

:::incorrect

```js
/*eslint arrow-parens: ["error", "as-needed"]*/

(a) => {};
(a) => a;
(a) => {'\n'};
a.then((foo) => {});
a.then((foo) => a);
a((foo) => { if (true) {} });
const f = /** @type {number} */(a) => a + a;
const g = /* comment */ (a) => a + a;
const h = (a) /* comment */ => a + a;
```

:::

以下是使用 `"as-needed"` 选项时符合此规则的代码示例：

:::correct

```js
/*eslint arrow-parens: ["error", "as-needed"]*/

() => {};
a => {};
a => a;
a => {'\n'};
a.then(foo => {});
a.then(foo => { if (true) {} });
(a, b, c) => a;
(a = 10) => a;
([a, b]) => a;
({a, b}) => a;
const f = (/** @type {number} */a) => a + a;
const g = (/* comment */ a) => a + a;
const h = (a /* comment */) => a + a;
```

:::

### requireForBlockBody

以下是使用 `{ "requireForBlockBody": true }` 选项时违反此规则的代码示例：

:::incorrect

```js
/*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/

(a) => a;
a => {};
a => {'\n'};
a.map((x) => x * x);
a.map(x => {
  return x * x;
});
a.then(foo => {});
```

:::

以下是使用 `{ "requireForBlockBody": true }` 选项时符合此规则的代码示例：

:::correct

```js
/*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/

(a) => {};
(a) => {'\n'};
a => ({});
() => {};
a => a;
a.then((foo) => {});
a.then((foo) => { if (true) {} });
a((foo) => { if (true) {} });
(a, b, c) => a;
(a = 10) => a;
([a, b]) => a;
({a, b}) => a;
```

:::