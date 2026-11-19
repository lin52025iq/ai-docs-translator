---
title: no-extra-parens
rule_type: layout
related_rules:
- arrow-parens
- no-cond-assign
- no-return-assign
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
---
此规则限制括号的使用，仅在必要时才允许使用。

<a id="rule-details"></a>

## 规则详情

此规则始终忽略以下情况中的多余括号：

* 正则表达式字面量，例如 `(/abc/).test(var)`，以避免与 [wrap-regex](wrap-regex) 规则冲突
* 立即调用的函数表达式（也称为 IIFE），例如 `var x = (function () {})();` 和 `var x = (function () {}());`，以避免与 [wrap-iife](wrap-iife) 规则冲突
* 箭头函数参数，以避免与 [arrow-parens](arrow-parens) 规则冲突

此规则报告的问题可以自动修复，但如果移除括号会创建新的指令，则不会自动修复，因为这可能改变代码的语义。
例如，以下脚本会在控制台打印 `object`，但如果移除 `"use strict"` 两侧的括号，它将改为打印 `undefined`。

```js
<!--
// this is a script
// -->

("use strict");

function test() {
    console.log(typeof this);
}

test();
```

在这种情况下，规则不会尝试移除 `"use strict"` 两侧的括号，但仍会将其报告为问题。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"all"`（默认值）禁止在*任何*表达式周围使用不必要的括号。
* `"functions"` 仅禁止在函数表达式周围使用不必要的括号。

此规则还有一个对象选项，用于设置 `"all"` 选项的例外情况：

* `"conditionalAssign": false` 允许在条件测试表达式中的赋值两侧使用多余的括号。
* `"returnAssign": false` 允许在 `return` 语句中的赋值两侧使用多余的括号。
* `"nestedBinaryExpressions": false` 允许在嵌套二元表达式中使用多余的括号。
* `"ternaryOperandBinaryExpressions": false` 允许在三元运算符 `?:` 的操作数二元表达式周围使用多余的括号。
* `"ignoreJSX": "none|all|multi-line|single-line"` 允许在无、全部、多行或单行 JSX 组件周围使用多余的括号。默认值为 `none`。
* `"enforceForArrowConditionals": false` 允许在作为箭头函数主体的三元表达式周围使用多余的括号。
* `"enforceForSequenceExpressions": false` 允许在序列表达式周围使用多余的括号。
* `"enforceForNewInMemberExpressions": false` 允许在成员表达式中的 `new` 表达式周围使用多余的括号。
* `"enforceForFunctionPrototypeMethods": false` 允许在函数表达式上直接调用 `.call` 和 `.apply` 方法时，以及在相同上下文中的函数表达式周围使用多余的括号。
* `"allowParensAfterCommentPattern": "any-string-pattern"` 允许在匹配某个正则表达式的注释之后使用多余的括号。

### all

使用默认的 `"all"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint no-extra-parens: "error" */

a = (b * c);

(a * b) + c;

for (a in (b, c));

for (a in (b));

for (a of (b));

typeof (a);

(Object.prototype.toString.call());

class A {
    [(x)] = 1;
}

class B {
    x = (y + z);
}
```

:::

使用默认的 `"all"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: "error" */

(0).toString();

({}.toString.call());

(function(){}) ? a() : b();

(/^a$/).test(x);

for (a of (b, c));

for (a of b);

for (a in b, c);

for (a in b);

class A {
    [x] = 1;
}

class B {
    x = y + z;
}
```

:::

### conditionalAssign

使用 `"all"` 和 `{ "conditionalAssign": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "conditionalAssign": false }] */

while ((foo = bar())) {}

if ((foo = bar())) {}

do; while ((foo = bar()))

for (;(a = b););
```

:::

### returnAssign

使用 `"all"` 和 `{ "returnAssign": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "returnAssign": false }] */

function a1(b) {
  return (b = 1);
}

function a2(b) {
  return b ? (c = d) : (c = e);
}

b => (b = 1);

b => b ? (c = d) : (c = e);
```

:::

### nestedBinaryExpressions

使用 `"all"` 和 `{ "nestedBinaryExpressions": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "nestedBinaryExpressions": false }] */

x = a || (b && c);
x = a + (b * c);
x = (a * b) / c;
```

:::

### ternaryOperandBinaryExpressions

使用 `"all"` 和 `{ "ternaryOperandBinaryExpressions": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "ternaryOperandBinaryExpressions": false }] */

(a && b) ? foo : bar;

(a - b > a) ? foo : bar;

foo ? (bar || baz) : qux;

foo ? bar : (baz || qux);
```

:::

### ignoreJSX

使用 `all` 和 `{ "ignoreJSX": "all" }` 选项时，此规则的**正确**代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "all" }] */
const ThisComponent = (<div />)
const ThatComponent = (
    <div
        prop={true}
    />
)
```

:::

使用 `all` 和 `{ "ignoreJSX": "multi-line" }` 选项时，此规则的**错误**代码示例：

::: incorrect { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "multi-line" }] */
const ThisComponent = (<div />)
const ThatComponent = (<div><p /></div>)
```

:::

使用 `all` 和 `{ "ignoreJSX": "multi-line" }` 选项时，此规则的**正确**代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "multi-line" }] */
const ThisComponent = (
    <div>
        <p />
    </div>
)
const ThatComponent = (
    <div
        prop={true}
    />
)
```

:::

使用 `all` 和 `{ "ignoreJSX": "single-line" }` 选项时，此规则的**错误**代码示例：

::: incorrect { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "single-line" }] */
const ThisComponent = (
    <div>
        <p />
    </div>
)
const ThatComponent = (
    <div
        prop={true}
    />
)
```

:::

使用 `all` 和 `{ "ignoreJSX": "single-line" }` 选项时，此规则的**正确**代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/* eslint no-extra-parens: ["error", "all", { ignoreJSX: "single-line" }] */
const ThisComponent = (<div />)
const ThatComponent = (<div><p /></div>)
```

:::

### enforceForArrowConditionals

使用 `"all"` 和 `{ "enforceForArrowConditionals": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForArrowConditionals": false }] */

const b = a => 1 ? 2 : 3;
const d = c => (1 ? 2 : 3);
```

:::

### enforceForSequenceExpressions

使用 `"all"` 和 `{ "enforceForSequenceExpressions": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForSequenceExpressions": false }] */

(a, b);

if ((val = foo(), val < 10)) {}

while ((val = foo(), val < 10));
```

:::

### enforceForNewInMemberExpressions

使用 `"all"` 和 `{ "enforceForNewInMemberExpressions": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForNewInMemberExpressions": false }] */

const foo = (new Bar()).baz;

const quux = (new Bar())[baz];

(new Bar()).doSomething();
```

:::

### enforceForFunctionPrototypeMethods

使用 `"all"` 和 `{ "enforceForFunctionPrototypeMethods": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "enforceForFunctionPrototypeMethods": false }] */

const foo = (function () {}).call();

const bar = (function () {}).apply();

const baz = (function () {}.call());

const quux = (function () {}.apply());
```

:::

### allowParensAfterCommentPattern

若要使此规则允许在特定注释之后使用多余的括号，请将此选项设为字符串模式；该模式会传递给 [`RegExp` 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)。

使用 `"all"` 和 `{ "allowParensAfterCommentPattern": "@type" }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "all", { "allowParensAfterCommentPattern": "@type" }] */

const span = /**@type {HTMLSpanElement}*/(event.currentTarget);

if (/** @type {Foo | Bar} */(options).baz) console.log('Lint free');

foo(/** @type {Bar} */ (bar), options, {
    name: "name",
    path: "path",
});

if (foo) {
    /** @type {Bar} */
    (bar).prop = false;
}
```

:::

### functions

使用 `"functions"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint no-extra-parens: ["error", "functions"] */

((function foo() {}))();

var y = (function () {return 1;});
```

:::

使用 `"functions"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-extra-parens: ["error", "functions"] */

(0).toString();

(Object.prototype.toString.call());

({}.toString.call());

(function(){} ? a() : b());

(/^a$/).test(x);

a = (b * c);

(a * b) + c;

typeof (a);
```

:::