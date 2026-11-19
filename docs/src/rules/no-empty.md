---
title: no-empty
rule_type: suggestion
related_rules:
- no-empty-function
---



空代码块语句虽然严格来说不算错误，但通常是未完成重构的结果。它们会让代码阅读者感到困惑。

<a id="rule-details"></a>

## 规则详情

此规则禁止空代码块语句。此规则会忽略包含注释的代码块语句（例如，在 `try` 语句的空 `catch` 或 `finally` 代码块中添加注释，表示无论是否发生错误，都应继续执行）。

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint no-empty: "error"*/

if (foo) {
}

while (foo) {
}

switch(foo) {
}

try {
    doSomething();
} catch(ex) {

} finally {

}
```

:::

此规则下的**正确**代码示例：

::: correct

```js
/*eslint no-empty: "error"*/

if (foo) {
    // empty
}

while (foo) {
    /* empty */
}

switch(foo) {
    /* empty */
}

try {
    doSomething();
} catch (ex) {
    // continue regardless of error
}

try {
    doSomething();
} finally {
    /* continue regardless of error */
}
```

:::

<a id="options"></a>

## 选项

此规则有一个用于例外情况的对象选项：

* `"allowEmptyCatch": true` 允许空 `catch` 子句（即不包含注释的子句）

### allowEmptyCatch

启用 `{ "allowEmptyCatch": true }` 选项后，此规则下的其他**正确**代码示例：

::: correct

```js
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
try {
    doSomething();
} catch (ex) {}

try {
    doSomething();
}
catch (ex) {}
finally {
    /* continue regardless of error */
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你有意使用空代码块语句，可以禁用此规则。
