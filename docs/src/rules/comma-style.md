---
title: comma-style
rule_type: layout
related_rules:
- operator-linebreak
further_reading:
- https://gist.github.com/isaacs/357981
---
逗号样式规则用于强制逗号分隔列表遵循特定样式。JavaScript 中主要使用两种逗号样式：

* 标准样式：逗号放在当前行的末尾
* 逗号前置样式：逗号放在下一行的开头

使用逗号前置样式的一个理由是，它有助于发现缺失的逗号和尾随逗号。这些逗号问题可能会带来麻烦：变量声明中缺少逗号可能导致全局变量泄漏，而尾随逗号可能会在较旧版本的 IE 中引发错误。

<a id="rule-details"></a>

## 规则详情

此规则会在数组字面量、对象字面量和变量声明中强制使用一致的逗号样式。

以下两种情况不适用此规则：

* 逗号前后都有换行符（孤立逗号）
* 单行数组字面量、对象字面量和变量声明

<a id="options"></a>

## 选项

此规则接受一个字符串选项：

* `"last"`（默认值）要求逗号位于数组元素、对象属性或变量声明之后，并且与其位于同一行
* `"first"` 要求逗号位于数组元素、对象属性或变量声明之前，并且与其位于同一行

此规则还接受一个额外的 `exceptions` 对象：

* `"exceptions"` 包含的属性名称对应于 JavaScript 代码抽象语法树（AST）中的节点类型：

    * `"ArrayExpression": true` 忽略数组字面量中的逗号样式
    * `"ArrayPattern": true` 忽略解构数组模式中的逗号样式
    * `"ArrowFunctionExpression": true` 忽略箭头函数表达式参数中的逗号样式
    * `"CallExpression": true` 忽略函数调用参数中的逗号样式
    * `"FunctionDeclaration": true` 忽略函数声明参数中的逗号样式
    * `"FunctionExpression": true` 忽略函数表达式参数中的逗号样式
    * `"ImportDeclaration": true` 忽略导入声明说明符中的逗号样式
    * `"ObjectExpression": true` 忽略对象字面量中的逗号样式
    * `"ObjectPattern": true` 忽略解构对象模式中的逗号样式
    * `"VariableDeclaration": true` 忽略变量声明中的逗号样式
    * `"NewExpression": true` 忽略构造函数表达式参数中的逗号样式

可以使用 [AST Explorer](https://astexplorer.net/) 和 espree 解析器来确定 [ESTree](https://github.com/estree/estree) 定义的节点类型。

<a id="last"></a>

### last

以下是使用默认选项 `"last"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-style: ["error", "last"]*/

var foo = 1
,
bar = 2;

var foo = 1
  , bar = 2;

var foo = ["apples"
           , "oranges"];

function baz() {
    return {
        "a": 1
        ,"b:": 2
    };
}
```

:::

以下是使用默认选项 `"last"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-style: ["error", "last"]*/

var foo = 1, bar = 2;

var foo = 1,
    bar = 2;

var foo = ["apples",
           "oranges"];

function baz() {
    return {
        "a": 1,
        "b:": 2
    };
}
```

:::

<a id="first"></a>

### first

以下是使用选项 `"first"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-style: ["error", "first"]*/

var foo = 1,
    bar = 2;

var foo = ["apples",
           "oranges"];

function baz() {
    return {
        "a": 1,
        "b:": 2
    };
}
```

:::

以下是使用选项 `"first"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-style: ["error", "first"]*/

var foo = 1, bar = 2;

var foo = 1
    ,bar = 2;

var foo = ["apples"
          ,"oranges"];

function baz() {
    return {
        "a": 1
        ,"b:": 2
    };
}
```

:::

<a id="exceptions"></a>

### exceptions

一种使用场景是仅在 var 语句中强制使用逗号样式。

以下是使用示例选项 `"first", { "exceptions": { … } }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-style: ["error", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }]*/

var o = {},
    a = [];
```

:::

以下是使用示例选项 `"first", { "exceptions": { … } }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-style: ["error", "first", { "exceptions": { "ArrayExpression": true, "ObjectExpression": true } }]*/

var o = {fst:1,
         snd: [1,
               2]}
  , a = [];
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你的项目不需要强制使用一致的逗号样式，可以放心关闭此规则。
