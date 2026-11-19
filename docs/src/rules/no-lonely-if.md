---
title: no-lonely-if
rule_type: suggestion
---



如果 `if` 语句是 `else` 块中的唯一语句，通常使用 `else if` 的形式会更清晰。

```js
if (foo) {
    // ...
} else {
    if (bar) {
        // ...
    }
}
```

应改写为

```js
if (foo) {
    // ...
} else if (bar) {
    // ...
}
```

<a id="rule-details"></a>
## 规则详情

此规则禁止在 `else` 块中仅包含 `if` 语句。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
}

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
} else {
    // ...
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不使用该规则

如果不要求使用 `else if` 的形式时代码更清晰，请禁用此规则。
