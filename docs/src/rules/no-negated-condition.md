---
title: no-negated-condition
rule_type: suggestion
---


否定条件更难理解。通过反转条件，可以让代码更易读。

<a id="rule-details"></a>
## 规则详情

此规则禁止在以下任一位置使用否定条件：

* 带有 `else` 分支的 `if` 语句
* 三元表达式

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-negated-condition: "error"*/

if (!a) {
    doSomething();
} else {
    doSomethingElse();
}

if (a != b) {
    doSomething();
} else {
    doSomethingElse();
}

if (a !== b) {
    doSomething();
} else {
    doSomethingElse();
}

!a ? c : b
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-negated-condition: "error"*/

if (!a) {
    doSomething();
}

if (!a) {
    doSomething();
} else if (b) {
    doSomething();
}

if (a != b) {
    doSomething();
}

a ? b : c
```

:::

<a id="options"></a>
## 选项

此规则没有选项。
