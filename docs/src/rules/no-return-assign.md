---
title: no-return-assign
rule_type: suggestion
---


JavaScript 有一个有趣但有时也令人困惑的特点：几乎可以在任何位置进行赋值。因此，一个误写的等号可能会导致赋值，而原本真正想做的其实是比较。使用 `return` 语句时尤其如此。例如：

```js
function doSomething() {
    return foo = bar + 2;
}
```

这里很难判断 `return` 语句的意图。函数可能是想返回 `bar + 2` 的结果，但那为什么还要给 `foo` 赋值呢？也可能原本想使用 `==` 这样的比较运算符，而这段代码其实是个错误。

由于这种歧义，最佳实践是不要在 `return` 语句中使用赋值。

<a id="rule-details"></a>

## 规则详情

此规则旨在禁止在 `return` 语句中进行赋值。因此，只要在 `return` 中发现赋值，就会发出警告。

<a id="options"></a>

## 选项

此规则接受一个字符串选项，其值必须是以下其中之一：

* `except-parens`（默认）：除非赋值表达式被括号括起，否则禁止赋值。
* `always`：禁止所有赋值。

### except-parens

这是默认选项。
除非赋值表达式被括号括起，否则禁止赋值。

默认选项 `"except-parens"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint no-return-assign: "error"*/

function doSomething() {
    return foo = bar + 2;
}

function doSomethingElse() {
    return foo += 2;
}

const foo = (a, b) => a = b

const bar = (a, b, c) => (a = b, c == b)

function doSomethingMore() {
    return foo = bar && foo > 0;
}
```

:::

默认选项 `"except-parens"` 下的**正确**代码示例：

::: correct

```js
/*eslint no-return-assign: "error"*/

function doSomething() {
    return foo == bar + 2;
}

function doSomethingElse() {
    return foo === bar + 2;
}

function doSomethingMore() {
    return (foo = bar + 2);
}

const foo = (a, b) => (a = b)

const bar = (a, b, c) => ((a = b), c == b)

function doAnotherThing() {
    return (foo = bar) && foo > 0;
}
```

:::

### always

此选项禁止在 `return` 语句中进行任何赋值。
所有赋值都会被视为问题。

`"always"` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint no-return-assign: ["error", "always"]*/

function doSomething() {
    return foo = bar + 2;
}

function doSomethingElse() {
    return foo += 2;
}

function doSomethingMore() {
    return (foo = bar + 2);
}
```

:::

`"always"` 选项下的**正确**代码示例：

::: correct

```js
/*eslint no-return-assign: ["error", "always"]*/

function doSomething() {
    return foo == bar + 2;
}

function doSomethingElse() {
    return foo === bar + 2;
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你希望允许在 `return` 语句中使用赋值运算符，可以放心地禁用此规则。

