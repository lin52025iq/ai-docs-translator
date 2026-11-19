---
title: no-unmodified-loop-condition
rule_type: problem
---


循环条件中的变量通常会在循环中被修改。
如果没有被修改，则可能是一个错误。

```js
while (node) {
    doSomething(node);
}
```

```js
while (node) {
    doSomething(node);
    node = node.parent;
}
```

<a id="rule-details"></a>
## 规则详情

此规则会查找循环条件中的引用，然后检查这些引用所对应的变量是否在循环中被修改。

默认情况下，如果引用位于二元表达式或三元表达式中，此规则会改为检查整个表达式的结果。`checkConditionalExpressions` 选项可以阻止此规则仅因引用属于同一个三元表达式而将它们归为一组。
如果引用位于动态表达式（例如 `CallExpression`、`YieldExpression` 等）中，此规则会忽略它。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-unmodified-loop-condition: "error"*/

let node = something;

while (node) {
    doSomething(node);
}
node = other;

for (let j = 0; j < 5;) {
    doSomething(j);
}

while (node !== root) {
    doSomething(node);
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-unmodified-loop-condition: "error"*/

while (node) {
    doSomething(node);
    node = node.parent;
}

for (let j = 0; j < items.length; ++j) {
    doSomething(items[j]);
}

// OK, the result of this binary expression is changed in this loop.
while (node !== root) {
    doSomething(node);
    node = node.parent;
}

// OK, the result of this ternary expression is changed in this loop.
while (node ? A : B) {
    doSomething(node);
    node = node.parent;
}

// A property might be a getter which has side effect...
// Or "doSomething" can modify "obj.foo".
while (obj.foo) {
    doSomething(obj);
}

// A function call can return various values.
while (check(obj)) {
    doSomething(obj);
}
```

:::

<a id="options"></a>
## 选项

此规则有一个对象选项：

* `"checkConditionalExpressions": false`（默认值）：检查整个三元表达式的结果
* `"checkConditionalExpressions": true`：独立检查三元表达式中的每个分支

当使用 `{ "checkConditionalExpressions": true }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/* eslint no-unmodified-loop-condition: ["error", { "checkConditionalExpressions": true }] */

let chunk = getInitialChunk();
let done = false;

while (chunk ? !done : false) {
    chunk = nextOrNull();
}
```

:::

<a id="when-not-to-use-it"></a>
## 何时不使用

如果你不希望收到关于循环条件中引用的提示，可以安全地禁用此规则。
