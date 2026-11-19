---
title: prefer-rest-params
rule_type: suggestion
related_rules:
- prefer-spread
---


ES2015 引入了剩余参数。
我们可以在可变参数函数中使用这一特性，而不是使用 `arguments` 变量。

`arguments` 没有 `Array.prototype` 的方法，因此使用起来有些不便。

<a id="rule-details"></a>
## 规则详情

此规则旨在标记对 `arguments` 变量的使用。

此规则下的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint prefer-rest-params: "error"*/

function foo() {
    console.log(arguments);
}

function foo(action) {
    const args = Array.prototype.slice.call(arguments, 1);
    action.apply(null, args);
}

function foo(action) {
    const args = [].slice.call(arguments, 1);
    action.apply(null, args);
}
```

:::

此规则下的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint prefer-rest-params: "error"*/

function foo(...args) {
    console.log(args);
}

function foo(action, ...args) {
    action.apply(null, args); // or `action(...args)`, related to the `prefer-spread` rule.
}

// Note: the implicit arguments can be overwritten.
function foo(arguments) {
    console.log(arguments); // This is the first argument.
}
function foo() {
    const arguments = 0;
    console.log(arguments); // This is a local variable.
}
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不应使用

不应在 ES3/5 环境中使用此规则。

在 ES2015 (ES6) 或更高版本中，如果你不希望收到有关 `arguments` 变量的提示，则可以放心地禁用此规则。