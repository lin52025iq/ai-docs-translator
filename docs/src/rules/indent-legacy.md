---
title: indent-legacy
rule_type: layout
---

ESLint 4.0.0 重写了 [`indent`](indent) 规则，现在报告的错误比之前版本更多。为了简化迁移到 4.0.0 的过程，新增了 `indent-legacy` 规则，作为 ESLint 3.x 中 `indent` 规则的快照。如果升级到 4.0.0 后构建失败，可以禁用 `indent` 并启用 `indent-legacy`，作为快速修复。之后，你应切换回 `indent` 规则，以获取未来版本中的错误修复和改进。

---

有一些常见的代码风格指南要求嵌套代码块和语句采用特定缩进，例如：

```js
function hello(indentSize, type) {
    if (indentSize === 4 && type !== 'tab') {
        console.log('Each next indentation will increase on 4 spaces');
    }
}
```

不同风格指南中推荐的最常见方案如下：

* 两个空格，不得更多，且不使用制表符：Google、npm、Node.js、Idiomatic、Felix
* 制表符：jQuery
* 四个空格：Crockford

<a id="rule-details"></a>

## 规则详情

此规则强制采用一致的缩进风格。默认风格为 `4 spaces`。

<a id="options"></a>

## 选项

此规则有一个混合选项：

例如，使用 2 个空格缩进：

```json
{
    "indent-legacy": ["error", 2]
}
```

或使用制表符缩进：

```json
{
    "indent-legacy": ["error", "tab"]
}
```

此规则使用默认选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: "error"*/

if (a) {
  b=c;
  function foo(d) {
    e=f;
  }
}
```

:::

此规则使用默认选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: "error"*/

if (a) {
    b=c;
    function foo(d) {
        e=f;
    }
}
```

:::

此规则还有一个对象选项：

* `"SwitchCase"`（默认值：0）强制规定 `switch` 语句中 `case` 子句的缩进级别
* `"VariableDeclarator"`（默认值：1）强制规定 `var` 声明符的缩进级别；也可以接收一个对象，为 `var`、`let` 和 `const` 声明分别定义规则。
* `"outerIIFEBody"`（默认值：1）强制规定文件级 IIFE 的缩进级别。
* `"MemberExpression"`（默认关闭）强制规定多行属性链的缩进级别（变量声明和赋值中的情况除外）
* `"FunctionDeclaration"` 接收一个对象，用于定义函数声明的规则。
    * `parameters`（默认关闭）强制规定函数声明中参数的缩进级别。可以是表示缩进级别的数字，也可以是字符串 `"first"`，表示声明中的所有参数都必须与第一个参数对齐。
    * `body`（默认值：1）强制规定函数声明函数体的缩进级别。
* `"FunctionExpression"` 接收一个对象，用于定义函数表达式的规则。
    * `parameters`（默认关闭）强制规定函数表达式中参数的缩进级别。可以是表示缩进级别的数字，也可以是字符串 `"first"`，表示表达式中的所有参数都必须与第一个参数对齐。
    * `body`（默认值：1）强制规定函数表达式函数体的缩进级别。
* `"CallExpression"` 接收一个对象，用于定义函数调用表达式的规则。
    * `arguments`（默认关闭）强制规定调用表达式中实参的缩进级别。可以是表示缩进级别的数字，也可以是字符串 `"first"`，表示表达式中的所有实参都必须与第一个实参对齐。
* `"ArrayExpression"`（默认值：1）强制规定数组元素的缩进级别。也可以设置为字符串 `"first"`，表示数组中的所有元素都应与第一个元素对齐。
* `"ObjectExpression"`（默认值：1）强制规定对象属性的缩进级别。也可以设置为字符串 `"first"`，表示对象中的所有属性都应与第一个属性对齐。

缩进级别表示所指定缩进单位的倍数。例如：

* 缩进单位为 4 个空格，且 `VariableDeclarator` 设置为 `2` 时，多行变量声明将缩进 8 个空格。
* 缩进单位为 2 个空格，且 `VariableDeclarator` 设置为 `2` 时，多行变量声明将缩进 4 个空格。
* 缩进单位为 2 个空格，且 `VariableDeclarator` 设置为 `{"var": 2, "let": 2, "const": 3}` 时，`var` 和 `let` 多行变量声明将缩进 4 个空格，`const` 语句将缩进 6 个空格。
* 缩进单位为制表符，且 `VariableDeclarator` 设置为 `2` 时，多行变量声明将缩进 2 个制表符。
* 缩进单位为 2 个空格，且 `SwitchCase` 设置为 `0` 时，`case` 子句相对于 `switch` 语句不缩进。
* 缩进单位为 2 个空格，且 `SwitchCase` 设置为 `1` 时，`case` 子句相对于 `switch` 语句缩进 2 个空格。
* 缩进单位为 2 个空格，且 `SwitchCase` 设置为 `2` 时，`case` 子句相对于 `switch` 语句缩进 4 个空格。
* 缩进单位为制表符，且 `SwitchCase` 设置为 `2` 时，`case` 子句相对于 `switch` 语句缩进 2 个制表符。
* 缩进单位为 2 个空格，且 `MemberExpression` 设置为 `0` 时，多行属性链缩进 0 个空格。
* 缩进单位为 2 个空格，且 `MemberExpression` 设置为 `1` 时，多行属性链缩进 2 个空格。
* 缩进单位为 2 个空格，且 `MemberExpression` 设置为 `2` 时，多行属性链缩进 4 个空格。
* 缩进单位为 4 个空格，且 `MemberExpression` 设置为 `0` 时，多行属性链缩进 0 个空格。
* 缩进单位为 4 个空格，且 `MemberExpression` 设置为 `1` 时，多行属性链缩进 4 个空格。
* 缩进单位为 4 个空格，且 `MemberExpression` 设置为 `2` 时，多行属性链缩进 8 个空格。

<a id="tab"></a>

### 制表符

此规则使用 `"tab"` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", "tab"]*/

if (a) {
     b=c;
function foo(d) {
           e=f;
 }
}
```

:::

此规则使用 `"tab"` 选项时，以下代码示例为**正确**：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: correct

```js
/*eslint indent-legacy: ["error", "tab"]*/

if (a) {
	b=c;
	function foo(d) {
		e=f;
	}
}
```

:::
<!-- markdownlint-restore -->

### SwitchCase

此规则使用 `2, { "SwitchCase": 1 }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
case "a":
    break;
case "b":
    break;
}
```

:::

此规则使用 `2, { "SwitchCase": 1 }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "SwitchCase": 1 }]*/

switch(a){
  case "a":
    break;
  case "b":
    break;
}
```

:::

### VariableDeclarator

此规则使用 `2, { "VariableDeclarator": 1 }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "VariableDeclarator": 1 }]*/

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

此规则使用 `2, { "VariableDeclarator": 1 }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "VariableDeclarator": 1 }]*/

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

此规则使用 `2, { "VariableDeclarator": 2 }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "VariableDeclarator": 2 }]*/

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

此规则使用 `2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }]*/

var a,
    b,
    c;
let e,
    f,
    g;
const h = 1,
      i = 2,
      j = 3;
```

:::

### outerIIFEBody

此规则使用 `2, { "outerIIFEBody": 0 }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

  function foo(x) {
    return x + 1;
  }

})();

if(y) {
console.log('foo');
}
```

:::

此规则使用 `2, {"outerIIFEBody": 0}` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "outerIIFEBody": 0 }]*/

(function() {

function foo(x) {
  return x + 1;
}

})();

if(y) {
  console.log('foo');
}
```

:::

### MemberExpression

此规则使用 `2, { "MemberExpression": 1 }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "MemberExpression": 1 }]*/

foo
.bar
.baz()
```

:::

此规则使用 `2, { "MemberExpression": 1 }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "MemberExpression": 1 }]*/

foo
  .bar
  .baz();

// Any indentation is permitted in variable declarations and assignments.
var bip = aardvark.badger
                  .coyote;
```

:::

### FunctionDeclaration

此规则使用 `2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
  baz,
  qux) {
    qux();
}
```

:::

此规则使用 `2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "FunctionDeclaration": {"body": 1, "parameters": 2} }]*/

function foo(bar,
    baz,
    qux) {
  qux();
}
```

:::

此规则使用 `2, { "FunctionDeclaration": {"parameters": "first"} }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
  qux, boop) {
  qux();
}
```

:::

此规则使用 `2, { "FunctionDeclaration": {"parameters": "first"} }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}]*/

function foo(bar, baz,
             qux, boop) {
  qux();
}
```

:::

### FunctionExpression

此规则使用 `2, { "FunctionExpression": {"body": 1, "parameters": 2} }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
  baz,
  qux) {
    qux();
}
```

:::

此规则使用 `2, { "FunctionExpression": {"body": 1, "parameters": 2} }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "FunctionExpression": {"body": 1, "parameters": 2} }]*/

var foo = function(bar,
    baz,
    qux) {
  qux();
}
```

:::

此规则使用 `2, { "FunctionExpression": {"parameters": "first"} }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
  qux, boop) {
  qux();
}
```

:::

此规则使用 `2, { "FunctionExpression": {"parameters": "first"} }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, {"FunctionExpression": {"parameters": "first"}}]*/

var foo = function(bar, baz,
                   qux, boop) {
  qux();
}
```

:::

### CallExpression

此规则使用 `2, { "CallExpression": {"arguments": 1} }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
    baz,
      qux
);
```

:::

此规则使用 `2, { "CallExpression": {"arguments": 1} }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "CallExpression": {"arguments": 1} }]*/

foo(bar,
  baz,
  qux
);
```

:::

此规则使用 `2, { "CallExpression": {"arguments": "first"} }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
  baz, boop, beep);
```

:::

此规则使用 `2, { "CallExpression": {"arguments": "first"} }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, {"CallExpression": {"arguments": "first"}}]*/

foo(bar, baz,
    baz, boop, beep);
```

:::

### ArrayExpression

此规则使用 `2, { "ArrayExpression": 1 }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
    bar,
baz,
      qux
];
```

:::

此规则使用 `2, { "ArrayExpression": 1 }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "ArrayExpression": 1 }]*/

var foo = [
  bar,
  baz,
  qux
];
```

:::

此规则使用 `2, { "ArrayExpression": "first" }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
  baz,
  qux
];
```

:::

此规则使用 `2, { "ArrayExpression": "first" }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, {"ArrayExpression": "first"}]*/

var foo = [bar,
           baz,
           qux
];
```

:::

### ObjectExpression

此规则使用 `2, { "ObjectExpression": 1 }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
    bar: 1,
baz: 2,
      qux: 3
};
```

:::

此规则使用 `2, { "ObjectExpression": 1 }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, { "ObjectExpression": 1 }]*/

var foo = {
  bar: 1,
  baz: 2,
  qux: 3
};
```

:::

此规则使用 `2, { "ObjectExpression": "first" }` 选项时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint indent-legacy: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
  baz: 2 };
```

:::

此规则使用 `2, { "ObjectExpression": "first" }` 选项时，以下代码示例为**正确**：

::: correct

```js
/*eslint indent-legacy: ["error", 2, {"ObjectExpression": "first"}]*/

var foo = { bar: 1,
            baz: 2 };
```

:::

<a id="compatibility"></a>

## 兼容性

* **JSHint**：`indent`
* **JSCS**：[validateIndentation](https://jscs-dev.github.io/rule/validateIndentation)
