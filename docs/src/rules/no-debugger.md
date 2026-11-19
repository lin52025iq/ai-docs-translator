---
title: no-debugger
rule_type: problem
related_rules:
- no-alert
- no-console
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
---



`debugger` 语句用于告知正在执行的 JavaScript 环境停止执行，并在代码当前位置启动调试器。随着现代调试和开发工具的出现，这种做法已不再被视为良好实践。生产代码中绝对不应包含 `debugger`，因为它会导致浏览器停止执行代码并打开相应的调试器。

<a id="rule-details"></a>

## 规则详情

本规则禁止使用 `debugger` 语句。

本规则的错误代码示例：

::: incorrect

```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    debugger;
    return Boolean(x);
}
```

:::

本规则的正确代码示例：

::: correct

```js
/*eslint no-debugger: "error"*/

function isTruthy(x) {
    return Boolean(x); // set a breakpoint at this line
}
```

:::

<a id="options"></a>

## 选项

本规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你的代码仍处于开发阶段，而且不想担心移除 `debugger` 语句，可以关闭此规则。通常，你会希望在部署前测试代码时重新启用它。
