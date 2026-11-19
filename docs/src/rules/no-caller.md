---
title: no-caller
rule_type: suggestion
---


使用 `arguments.caller` 和 `arguments.callee` 会导致多种代码优化无法实现。它们将在未来版本的 JavaScript 中弃用，并且在 ECMAScript 5 的严格模式下禁止使用。

```js
function foo() {
    const callee = arguments.callee;
}
```

<a id="rule-details"></a>

## 规则详情

此规则旨在通过禁止使用 `arguments.caller` 和 `arguments.callee`，劝阻使用已弃用且次优的代码。因此，当使用 `arguments.caller` 和 `arguments.callee` 时，此规则会发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-caller: "error"*/

function foo(n) {
    if (n <= 0) {
        return;
    }

    arguments.callee(n - 1);
}

[1,2,3,4,5].map(function(n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-caller: "error"*/

function foo(n) {
    if (n <= 0) {
        return;
    }

    foo(n - 1);
}

[1,2,3,4,5].map(function factorial(n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
});
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
