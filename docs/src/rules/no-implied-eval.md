---
title: no-implied-eval
rule_type: suggestion
related_rules:
- no-eval
---


在 JavaScript 中，避免使用 `eval()` 被认为是一种良好实践。这样做会带来安全和性能方面的影响，因此许多代码检查工具（包括 ESLint）都建议禁止使用 `eval()`。不过，还有一些其他方式也可以传入字符串并将其解释为 JavaScript 代码，同样存在类似问题。

第一种方式是使用 `setTimeout()`、`setInterval()` 或 `execScript()`（仅限 Internet Explorer），它们都可以将 JavaScript 代码字符串作为第一个参数。例如：

```js
setTimeout("alert('Hi!');", 100);
```

这被视为隐式 `eval()`，因为传入了 JavaScript 代码字符串并将其解释执行。`setInterval()` 和 `execScript()` 也可以这样使用。两者都会在全局作用域中解释 JavaScript 代码。对于 `setTimeout()` 和 `setInterval()`，第一个参数也可以是函数，这种做法更安全，性能也更好：

```js
setTimeout(function() {
    alert("Hi!");
}, 100);
```

最佳实践是始终将函数作为 `setTimeout()` 和 `setInterval()` 的第一个参数（并避免使用 `execScript()`）。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除通过使用 `setTimeout()`、`setInterval()` 或 `execScript()` 产生的隐式 `eval()`。因此，如果这两个函数中的任意一个以字符串作为第一个参数，规则就会发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-implied-eval: "error"*/
/*global window, setTimeout, setInterval, execScript*/

setTimeout("alert('Hi!');", 100);

setInterval("alert('Hi!');", 100);

execScript("alert('Hi!')");

window.setTimeout("count = 5", 10);

window.setInterval("foo = bar", 10);
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-implied-eval: "error"*/
/*global setTimeout, setInterval*/

setTimeout(function() {
    alert("Hi!");
}, 100);

setInterval(function() {
    alert("Hi!");
}, 100);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你希望允许将字符串作为参数传递给 `setTimeout()` 和 `setInterval()`，则可以安全地禁用此规则。
