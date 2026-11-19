---
title: no-multi-spaces
rule_type: layout
related_rules:
- key-spacing
- space-infix-ops
- space-in-brackets
- space-in-parens
- space-after-keywords
- space-unary-ops
- space-return-throw-case
---
连续出现的多个空格（非用于缩进的空格）通常是错误。例如：

```js

if(foo  === "bar") {}

```

这不太容易看出来，但 `foo` 和 `===` 之间有两个空格。通常不鼓励使用这样的多个空格，而应使用单个空格：

```js

if(foo === "bar") {}

```

<a id="rule-details"></a>

## 规则详情

此规则旨在禁止逻辑表达式、条件表达式、声明、数组元素、对象属性、序列表达式和函数参数周围出现多个空格。

此规则下的错误代码示例：

::: incorrect

```js
/*eslint no-multi-spaces: "error"*/

var a =  1;

if(foo   === "bar") {}

a <<  b

var arr = [1,  2];

a ?  b: c
```

:::

此规则下的正确代码示例：

::: correct

```js
/*eslint no-multi-spaces: "error"*/

var a = 1;

if(foo === "bar") {}

a << b

var arr = [1, 2];

a ? b: c
```

:::

<a id="options"></a>

## 选项

此规则的配置由一个对象构成，该对象具有以下属性：

* `"ignoreEOLComments": true`（默认为 `false`）会忽略行尾注释前的多个空格
* `"exceptions": { "Property": true }`（默认仅指定 `"Property"` 节点）用于指定要忽略的节点

### ignoreEOLComments

当选项为 `{ "ignoreEOLComments": false }`（默认值）时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint no-multi-spaces: ["error", { ignoreEOLComments: false }]*/

var x = 5;      // comment
var x = 5;      /* multiline
 * comment
 */
```

:::

当选项为 `{ "ignoreEOLComments": false }`（默认值）时，此规则下的正确代码示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { ignoreEOLComments: false }]*/

var x = 5; // comment
var x = 5; /* multiline
 * comment
 */
```

:::

当选项为 `{ "ignoreEOLComments": true }` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { ignoreEOLComments: true }]*/

var x = 5; // comment
var x = 5;      // comment
var x = 5; /* multiline
 * comment
 */
var x = 5;      /* multiline
 * comment
 */
```

:::

<a id="exceptions"></a>

### 例外情况

为避免与其他要求使用多个空格的规则相矛盾，此规则提供了 `exceptions` 选项，用于忽略特定节点。

此选项是一个对象，其属性名称应为 [ESTree](https://github.com/estree/estree) 定义的 AST 节点类型。确定 `exceptions` 的节点类型最简单的方法是使用 espree 解析器打开 [AST Explorer](https://astexplorer.net/)。

默认情况下仅忽略 `Property` 节点，因为对于 [key-spacing](key-spacing) 规则，对齐选项中的一些设置要求对象字面量的属性之间使用多个空格。

默认选项 `"exceptions": { "Property": true }` 下的正确代码示例：

::: correct

```js
/*eslint no-multi-spaces: "error"*/
/*eslint key-spacing: ["error", { align: "value" }]*/

var obj = {
    first:  "first",
    second: "second"
};
```

:::

选项 `"exceptions": { "Property": false }` 下的错误代码示例：

::: incorrect

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "Property": false } }]*/
/*eslint key-spacing: ["error", { align: "value" }]*/

var obj = {
    first:  "first",
    second: "second"
};
```

:::

选项 `"exceptions": { "BinaryExpression": true }` 下的正确代码示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "BinaryExpression": true } }]*/

var a = 1  *  2;
```

:::

选项 `"exceptions": { "VariableDeclarator": true }` 下的正确代码示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }]*/

var someVar      = 'foo';
var someOtherVar = 'barBaz';
```

:::

选项 `"exceptions": { "ImportDeclaration": true }` 下的正确代码示例：

::: correct

```js
/*eslint no-multi-spaces: ["error", { exceptions: { "ImportDeclaration": true } }]*/

import mod          from 'mod';
import someOtherMod from 'some-other-mod';
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不想检查并禁止多个空格，则应关闭此规则。
