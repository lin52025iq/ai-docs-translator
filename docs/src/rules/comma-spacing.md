---
title: comma-spacing
rule_type: layout
related_rules:
- array-bracket-spacing
- comma-style
- object-curly-spacing
- space-in-brackets
- space-in-parens
- space-infix-ops
- space-after-keywords
- space-unary-ops
- space-return-throw-case
further_reading:
- https://www.crockford.com/code.html
- https://dojotoolkit.org/reference-guide/1.9/developer/styleguide.html
---
逗号周围的空格有助于提高列表的可读性。虽然大多数语言风格指南都建议在逗号后添加空格，而不是在逗号前添加空格，但具体偏好取决于项目。

```js
var foo = 1, bar = 2;
var foo = 1 ,bar = 2;
```

<a id="rule-details"></a>

## 规则详情

此规则要求在变量声明、数组字面量、对象字面量、函数参数和序列表达式中的逗号前后保持一致的空格格式。

以下情况不适用此规则：

* 两个逗号之间
* 左方括号 `[` 与逗号之间，以避免与 [`array-bracket-spacing`](array-bracket-spacing) 规则冲突
* 逗号与右方括号 `]` 之间，以避免与 [`array-bracket-spacing`](array-bracket-spacing) 规则冲突
* 逗号与右花括号 `}` 之间，以避免与 [`object-curly-spacing`](object-curly-spacing) 规则冲突
* 逗号与右圆括号 `)` 之间，以避免与 [`space-in-parens`](space-in-parens) 规则冲突

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"before": false`（默认值）禁止在逗号前添加空格
* `"before": true` 要求在逗号前添加一个或多个空格
* `"after": true`（默认值）要求在逗号后添加一个或多个空格
* `"after": false` 禁止在逗号后添加空格

<a id="after"></a>

### 逗号后

以下是此规则使用默认选项 `{ "before": false, "after": true }` 时的**错误**代码示例：

:::incorrect

```js
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

var foo = 1 ,bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function baz(a ,b){}
a ,b
```

:::

以下是此规则使用默认选项 `{ "before": false, "after": true }` 时的**正确**代码示例：

:::correct

```js
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

var foo = 1, bar = 2
    , baz = 3;
var arr = [1, 2];
var arr = [1,, 3]
var obj = {"foo": "bar", "baz": "qur"};
foo(a, b);
new Foo(a, b);
function qur(a, b){}
a, b
```

:::

以下是此规则使用默认选项 `{ "before": false, "after": true }` 时的其他**正确**代码示例：

:::correct

```js
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

// this rule does not enforce spacing between two commas
var arr = [
    ,,
    , ,
];

// this rule does not enforce spacing after `[` and before `]`
var arr = [,];
var arr = [ , ];
var arr = [a, b,];
[,] = arr;
[ , ] = arr;
[a, b,] = arr;

// this rule does not enforce spacing before `}`
var obj = {x, y,};
var {z, q,} = obj;
import {foo, bar,} from "mod";

// this rule does not enforce spacing before `)`
foo(a, b,)
```

:::

<a id="before"></a>

### 逗号前

以下是此规则使用选项 `{ "before": true, "after": false }` 时的**错误**代码示例：

:::incorrect

```js
/*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

var foo = 1, bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar", "baz": "qur"};
new Foo(a,b);
function baz(a,b){}
a, b
```

:::

以下是此规则使用选项 `{ "before": true, "after": false }` 时的**正确**代码示例：

:::correct

```js
/*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

var foo = 1 ,bar = 2 ,
    baz = true;
var arr = [1 ,2];
var arr = [1 ,,3]
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function qur(a ,b){}
a ,b
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果项目不打算采用一致的逗号空格格式，请关闭此规则。
