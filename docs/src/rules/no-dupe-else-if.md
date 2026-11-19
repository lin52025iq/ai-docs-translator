---
title: no-dupe-else-if
rule_type: problem
related_rules:
- no-duplicate-case
- no-lonely-if
---



`if-else-if` 链通常用于根据特定条件，从多个可能的分支中只执行一个（或至多一个）分支。

```js
if (a) {
    foo();
} else if (b) {
    bar();
} else if (c) {
    baz();
}
```

同一条链中存在两个相同的测试条件，几乎总是代码错误。除非表达式具有副作用，否则重复的条件会与链中较早出现的相同表达式一样，求值得到 `true` 或 `false`，这意味着对应分支永远不会执行。

```js
if (a) {
    foo();
} else if (b) {
    bar();
} else if (b) {
    baz();
}
```

在上面的示例中，`baz()` 永远不会执行。显然，只有当 `b` 求值为 `true` 时，才可能执行 `baz()`；但在这种情况下，由于 `bar()` 在链中更靠前，会执行 `bar()`。

<a id="rule-details"></a>

## 规则详情

此规则禁止在同一条 `if-else-if` 链中出现重复条件。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-dupe-else-if: "error"*/

if (isSomething(x)) {
    foo();
} else if (isSomething(x)) {
    bar();
}

if (a) {
    foo();
} else if (b) {
    bar();
} else if (c && d) {
    baz();
} else if (c && d) {
    quux();
} else {
    quuux();
}

if (n === 1) {
    foo();
} else if (n === 2) {
    bar();
} else if (n === 3) {
    baz();
} else if (n === 2) {
    quux();
} else if (n === 5) {
    quuux();
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-dupe-else-if: "error"*/

if (isSomething(x)) {
    foo();
} else if (isSomethingElse(x)) {
    bar();
}

if (a) {
    foo();
} else if (b) {
    bar();
} else if (c && d) {
    baz();
} else if (c && e) {
    quux();
} else {
    quuux();
}

if (n === 1) {
    foo();
} else if (n === 2) {
    bar();
} else if (n === 3) {
    baz();
} else if (n === 4) {
    quux();
} else if (n === 5) {
    quuux();
}
```

:::

此规则还可以检测一些条件并不完全相同、但由于 `||` 和 `&&` 运算符的逻辑导致分支永远无法执行的情况。

此规则的其他错误代码示例：

::: incorrect

```js
/*eslint no-dupe-else-if: "error"*/

if (a || b) {
    foo();
} else if (a) {
    bar();
}

if (a) {
    foo();
} else if (b) {
    bar();
} else if (a || b) {
    baz();
}

if (a) {
    foo();
} else if (a && b) {
    bar();
}

if (a && b) {
    foo();
} else if (a && b && c) {
    bar();
}

if (a || b) {
    foo();
} else if (b && c) {
    bar();
}

if (a) {
    foo();
} else if (b && c) {
    bar();
} else if (d && (c && e && b || a)) {
    baz();
}
```

:::

请注意，此规则不会将链中的条件与语句内部的条件进行比较，因此在以下情况下不会发出警告：

```js
if (a) {
    if (a) {
        foo();
    }
}

if (a) {
    foo();
} else {
    if (a) {
        bar();
    }
}
```

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

在少数情况下，如果确实需要在同一条链中使用相同的测试条件（这必然意味着链中的表达式会产生并依赖副作用），则必须关闭此规则。