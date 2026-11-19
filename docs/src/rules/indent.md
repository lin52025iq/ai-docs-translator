---
title: indent
rule_type: layout
---

有许多常见的规范要求对嵌套代码块和语句使用特定的缩进方式，例如：

```js
function hello(indentSize, type) {
    if (indentSize === 4 && type !== 'tab') {
        console.log('Each next indentation will increase on 4 spaces');
    }
}
```

不同风格指南推荐的常见缩进方式如下：

* 两个空格，不多于两个空格且不使用制表符：Google、npm、Node.js、Idiomatic、Felix
* 制表符：jQuery
* 四个空格：Crockford

<a id="rule-details"></a>

## 规则详细信息

此规则强制使用一致的缩进风格。默认风格为 `4 spaces`。

<a id="options"></a>

## 选项

此规则有一个混合选项：

例如，使用 2 个空格缩进：

```json
{
    "indent": ["error", 2]
}
```

或者使用制表符缩进：

```json
{
    "indent": ["error", "tab"]
}
```

以下是此规则使用默认选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: "error"*/

if (a) {
  b=c;
  function foo(d) {
    e=f;
  }
}
```

:::

以下是此规则使用默认选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: "error"*/

if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
```

:::

此规则还有一个对象选项：

* 可使用 `"ignoredNodes"` 禁用对任意 AST 节点的缩进检查。该选项接受一个 [selectors](../extend/selectors) 数组。如果某个 AST 节点与任一选择器匹配，则会忽略该节点的直接子节点所对应标记的缩进。如果你不认同此规则对特定语法模式强制采用的缩进方式，可以使用此选项作为例外来放宽规则。
* `"SwitchCase"`（默认值：0）强制规定 `switch` 语句中 `case` 子句的缩进级别。
* `"VariableDeclarator"`（默认值：1）强制规定 `var` 声明符的缩进级别；也可以接受一个对象，为 `var`、`let` 和 `const` 声明分别定义规则。它还可以设为 `"first"`，表示所有声明符都应与第一个声明符对齐。
* `"outerIIFEBody"`（默认值：1）强制规定文件级 IIFE 的缩进级别。也可以将其设为 `"off"`，以禁用对文件级 IIFE 的检查。
* `"MemberExpression"`（默认值：1）强制规定多行属性链的缩进级别。也可以将其设为 `"off"`，以禁用对 MemberExpression 缩进的检查。
* `"FunctionDeclaration"` 接受一个对象，用于定义函数声明的规则。
    * `parameters`（默认值：1）强制规定函数声明中参数的缩进级别。可以设为一个表示缩进级别的数字，也可以设为字符串 `"first"`，表示声明中的所有参数都必须与第一个参数对齐。也可以将其设为 `"off"`，以禁用对 FunctionDeclaration 参数的检查。
    * `body`（默认值：1）强制规定函数声明中函数体的缩进级别。
* `"FunctionExpression"` 接受一个对象，用于定义函数表达式的规则。
    * `parameters`（默认值：1）强制规定函数表达式中参数的缩进级别。可以设为一个表示缩进级别的数字，也可以设为字符串 `"first"`，表示表达式中的所有参数都必须与第一个参数对齐。也可以将其设为 `"off"`，以禁用对 FunctionExpression 参数的检查。
    * `body`（默认值：1）强制规定函数表达式中函数体的缩进级别。
* `"StaticBlock"` 接受一个对象，用于定义类静态代码块的规则。
    * `body`（默认值：1）强制规定类静态代码块中代码体的缩进级别。
* `"CallExpression"` 接受一个对象，用于定义函数调用表达式的规则。
    * `arguments`（默认值：1）强制规定调用表达式中参数的缩进级别。可以设为一个表示缩进级别的数字，也可以设为字符串 `"first"`，表示表达式中的所有参数都必须与第一个参数对齐。也可以将其设为 `"off"`，以禁用对 CallExpression 参数的检查。
* `"ArrayExpression"`（默认值：1）强制规定数组元素的缩进级别。也可以设为字符串 `"first"`，表示数组中的所有元素都应与第一个元素对齐。还可以设为 `"off"`，以禁用对数组元素的检查。
* `"ObjectExpression"`（默认值：1）强制规定对象属性的缩进级别。也可以设为字符串 `"first"`，表示对象中的所有属性都应与第一个属性对齐。还可以设为 `"off"`，以禁用对对象属性的检查。
* `"ImportDeclaration"`（默认值：1）强制规定导入语句的缩进级别。也可以设为字符串 `"first"`，表示模块导入的所有成员都应与列表中的第一个成员对齐。还可以设为 `"off"`，以禁用对导入模块成员的检查。
* `"flatTernaryExpressions": true`（默认值为 `false`）要求嵌套在其他三元表达式中的三元表达式不缩进。
* `"offsetTernaryExpressions": true`（默认值为 `false`）要求三元表达式的值缩进。
* `"ignoreComments"`（默认值：false）可用于注释不需要与前一行或后一行的节点对齐的情况。

缩进级别表示指定缩进量的倍数。例如：

* 缩进为 4 个空格且 `VariableDeclarator` 设为 `2` 时，多行变量声明将缩进 8 个空格。
* 缩进为 2 个空格且 `VariableDeclarator` 设为 `2` 时，多行变量声明将缩进 4 个空格。
* 缩进为 2 个空格且 `VariableDeclarator` 设为 `{"var": 2, "let": 2, "const": 3}` 时，多行变量声明中 `var` 和 `let` 语句将缩进 4 个空格，`const` 语句将缩进 6 个空格。
* 缩进为制表符且 `VariableDeclarator` 设为 `2` 时，多行变量声明将缩进 2 个制表符。
* 缩进为 2 个空格且 `SwitchCase` 设为 `0` 时，`case` 子句相对于 `switch` 语句不会缩进。
* 缩进为 2 个空格且 `SwitchCase` 设为 `1` 时，`case` 子句相对于 `switch` 语句缩进 2 个空格。
* 缩进为 2 个空格且 `SwitchCase` 设为 `2` 时，`case` 子句相对于 `switch` 语句缩进 4 个空格。
* 缩进为制表符且 `SwitchCase` 设为 `2` 时，`case` 子句相对于 `switch` 语句缩进 2 个制表符。
* 缩进为 2 个空格且 `MemberExpression` 设为 `0` 时，多行属性链将缩进 0 个空格。
* 缩进为 2 个空格且 `MemberExpression` 设为 `1` 时，多行属性链将缩进 2 个空格。
* 缩进为 2 个空格且 `MemberExpression` 设为 `2` 时，多行属性链将缩进 4 个空格。
* 缩进为 4 个空格且 `MemberExpression` 设为 `0` 时，多行属性链将缩进 0 个空格。
* 缩进为 4 个空格且 `MemberExpression` 设为 `1` 时，多行属性链将缩进 4 个空格。
* 缩进为 4 个空格且 `MemberExpression` 设为 `2` 时，多行属性链将缩进 8 个空格。

<a id="tab"></a>

### 制表符

以下是此规则使用 `"tab"` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", "tab"]*/

if (a) {
     b=c;
function foo(d) {
           e=f;
 }
}
```

:::

以下是此规则使用 `"tab"` 选项时的**正确**代码示例：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: correct

```js
/*eslint indent: ["error", "tab"]*/

if (a) {
	b=c;
	function foo(d) {
		e=f;
	}
}
```

:::
<!-- markdownlint-restore -->

### ignoredNodes

以下配置会忽略 `ConditionalExpression`（“三元表达式”）节点的缩进：

以下是此规则使用 `4, { "ignoredNodes": ["ConditionalExpression"] }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ignoredNodes": ["ConditionalExpression"] }]*/

var a = foo
      ? bar
      : baz;

var a = foo
                ? bar
: baz;
```

:::

以下配置会忽略 IIFE 函数体中的缩进。

以下是此规则使用 `4, { "ignoredNodes": ["CallExpression > FunctionExpression.callee > BlockStatement.body"] }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ignoredNodes": ["CallExpression > FunctionExpression.callee > BlockStatement.body"] }]*/

(function() {

foo();
bar();

})();
```

:::

所有 AST 节点类型都可以在 [ESTree](https://github.com/estree/estree) 规范中找到。你可以使用 [AST Explorer](https://astexplorer.net/) 和 espree 解析器检查代码片段的 AST 树。

### SwitchCase

以下是此规则使用 `2, { "SwitchCase": 1 }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
case "a":
    break;
case "b":
    break;
}
```

:::

以下是此规则使用 `2, { "SwitchCase": 1 }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
  case "a":
    break;
  case "b":
    break;
}
```

:::

### VariableDeclarator

以下是此规则使用 `2, { "VariableDeclarator": 1 }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": 1 }]*/

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
    h = 2,
    i = 3;
```

:::

以下是此规则使用 `2, { "VariableDeclarator": 1 }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": 1 }]*/

var a,
  b,
  c;
let d,
  e,
  f;
const g = 1,
  h = 2,
  i = 3;
```

:::

以下是此规则使用 `2, { "VariableDeclarator": 2 }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": 2 }]*/

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
    h = 2,
    i = 3;
```

:::

以下是此规则使用 `2, { "VariableDeclarator": "first" }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": "first" }]*/

var a,
  b,
  c;
let d,
  e,
  f;
const g = 1,
  h = 2,
  i = 3;
```

:::

以下是此规则使用 `2, { "VariableDeclarator": "first" }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": "first" }]*/

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
      h = 2,
      i = 3;
```

:::

以下是此规则使用 `2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }]*/

var a,
    b,
    c;
let d,
    e,
    f;
const g = 1,
      h = 2,
      i = 3;
```

:::

### outerIIFEBody

以下是此规则使用 `2, { "outerIIFEBody": 0 }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

  function foo(x) {
    return x + 1;
  }

})();

if (y) {
console.log('foo');
}
```

:::

以下是此规则使用 `2, { "outerIIFEBody": 0 }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

function foo(x) {
  return x + 1;
}

})();

if (y) {
  console.log('foo');
}
```

:::

以下是此规则使用 `2, { "outerIIFEBody":  "off" }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "outerIIFEBody": "off" }]*/

(function() {

function foo(x) {
  return x + 1;
}

})();

(function() {

  function foo(x) {
    return x + 1;
  }

})();

if (y) {
  console.log('foo');
}
```

:::

### MemberExpression

以下是此规则使用 `2, { "MemberExpression": 1 }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "MemberExpression": 1 }]*/

foo
.bar
.baz()
```

:::

以下是此规则使用 `2, { "MemberExpression": 1 }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "MemberExpression": 1 }]*/

foo
  .bar
  .baz();
```

:::

### FunctionDeclaration

以下是此规则使用 `2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
  baz,
  qux) {
    qux();
}
```

:::

以下是此规则使用 `2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
    baz,
    qux) {
  qux();
}
```

:::

以下是此规则使用 `2, { "FunctionDeclaration": {"parameters": "first"} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
  qux, boop) {
  qux();
}
```

:::

以下是此规则使用 `2, { "FunctionDeclaration": {"parameters": "first"} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
             qux, boop) {
  qux();
}
```

:::

### FunctionExpression

以下是此规则使用 `2, { "FunctionExpression": {"body": 1, "parameters": 2} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
  baz,
  qux) {
    qux();
}
```

:::

以下是此规则使用 `2, { "FunctionExpression": {"body": 1, "parameters": 2} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
    baz,
    qux) {
  qux();
}
```

:::

以下是此规则使用 `2, { "FunctionExpression": {"parameters": "first"} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
  qux, boop) {
  qux();
}
```

:::

以下是此规则使用 `2, { "FunctionExpression": {"parameters": "first"} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
                   qux, boop) {
  qux();
}
```

:::

### StaticBlock

以下是此规则使用 `2, { "StaticBlock": {"body": 1} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 1} }]*/

class C {
  static {
      foo();
  }
}
```

:::

以下是此规则使用 `2, { "StaticBlock": {"body": 1} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 1} }]*/

class C {
  static {
    foo();
  }
}
```

:::

以下是此规则使用 `2, { "StaticBlock": {"body": 2} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 2} }]*/

class C {
  static {
    foo();
  }
}
```

:::

以下是此规则使用 `2, { "StaticBlock": {"body": 2} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "StaticBlock": {"body": 2} }]*/

class C {
  static {
      foo();
  }
}
```

:::

### CallExpression

以下是此规则使用 `2, { "CallExpression": {"arguments": 1} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
    baz,
      qux
);
```

:::

以下是此规则使用 `2, { "CallExpression": {"arguments": 1} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
  baz,
  qux
);
```

:::

以下是此规则使用 `2, { "CallExpression": {"arguments": "first"} }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
  baz, boop, beep);
```

:::

以下是此规则使用 `2, { "CallExpression": {"arguments": "first"} }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
    baz, boop, beep);
```

:::

### ArrayExpression

以下是此规则使用 `2, { "ArrayExpression": 1 }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
    bar,
baz,
      qux
];
```

:::

以下是此规则使用 `2, { "ArrayExpression": 1 }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
  bar,
  baz,
  qux
];
```

:::

以下是此规则使用 `2, { "ArrayExpression": "first" }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
  baz,
  qux
];
```

:::

以下是此规则使用 `2, { "ArrayExpression": "first" }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
           baz,
           qux
];
```

:::

### ObjectExpression

以下是此规则使用 `2, { "ObjectExpression": 1 }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
    bar: 1,
baz: 2,
      qux: 3
};
```

:::

以下是此规则使用 `2, { "ObjectExpression": 1 }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
  bar: 1,
  baz: 2,
  qux: 3
};
```

:::

以下是此规则使用 `2, { "ObjectExpression": "first" }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
  baz: 2 };
```

:::

以下是此规则使用 `2, { "ObjectExpression": "first" }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
            baz: 2 };
```

:::

### ImportDeclaration

以下是此规则使用 `4, { "ImportDeclaration": 1 }` 选项（默认值）时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": 1 }]*/

import { foo,
    bar,
    baz,
} from 'qux';
```

:::

::: correct

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": 1 }]*/

import {
    foo,
    bar,
    baz,
} from 'qux';
```

:::

以下是此规则使用 `4, { "ImportDeclaration": "first" }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": "first" }]*/

import { foo,
    bar,
    baz,
} from 'qux';
```

:::

以下是此规则使用 `4, { "ImportDeclaration": "first" }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ImportDeclaration": "first" }]*/

import { foo,
         bar,
         baz,
} from 'qux';
```

:::

### flatTernaryExpressions

以下是此规则使用默认选项 `4, { "flatTernaryExpressions": false }` 时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

:::

以下是此规则使用默认选项 `4, { "flatTernaryExpressions": false }` 时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": false }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

:::

以下是此规则使用 `4, { "flatTernaryExpressions": true }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
        baz ? qux :
            boop;
```

:::

以下是此规则使用 `4, { "flatTernaryExpressions": true }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 4, { "flatTernaryExpressions": true }]*/

var a =
    foo ? bar :
    baz ? qux :
    boop;
```

:::

### offsetTernaryExpressions

以下是此规则使用默认选项 `2, { "offsetTernaryExpressions": false }` 时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": false }]*/

condition
  ? () => {
      return true
    }
  : () => {
      false
    }
```

:::

以下是此规则使用默认选项 `2, { "offsetTernaryExpressions": false }` 时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": false }]*/

condition
  ? () => {
    return true
  }
  : condition2
    ? () => {
      return true
    }
    : () => {
      return false
    }
```

:::

以下是此规则使用 `2, { "offsetTernaryExpressions": true }` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": true }]*/

condition
  ? () => {
    return true
  }
  : condition2
    ? () => {
      return true
    }
    : () => {
      return false
    }
```

:::

以下是此规则使用 `2, { "offsetTernaryExpressions": true }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 2, { "offsetTernaryExpressions": true }]*/

condition
  ? () => {
      return true
    }
  : condition2
    ? () => {
        return true
      }
    : () => {
        return false
      }
```

:::

### ignoreComments

以下是此规则使用 `4, { "ignoreComments": true }` 选项时的其他**正确**代码示例：

::: correct

```js
/*eslint indent: ["error", 4, { "ignoreComments": true }] */

if (foo) {
    doSomething();

// comment intentionally de-indented
    doSomethingElse();
}
```

:::

<a id="compatibility"></a>

## 兼容性

* **JSHint**：`indent`
* **JSCS**：[validateIndentation](https://jscs-dev.github.io/rule/validateIndentation)
