---
title: consistent-this
rule_type: suggestion
---


通常需要捕获当前执行上下文，以便之后使用。一个典型例子是 jQuery 回调：

```js
const that = this;
jQuery('li').click(function (event) {
    // here, "this" is the HTMLElement where the click event occurred
    that.setFoo(42);
});
```

`this` 有许多常用别名，例如 `that`、`self` 或 `me`。最好确保整个应用始终一致地使用团队选定的别名。

<a id="rule-details"></a>

## 规则详情

此规则对使用指定别名的变量作出以下两项要求：

* 如果声明了一个使用指定名称的变量，则必须在声明时初始化为 `this`，或在与声明相同的作用域内将其赋值为 `this`。
* 如果某个变量被初始化为 `this` 或被赋值为 `this`，则该变量的名称必须是指定别名之一。

<a id="options"></a>

## 选项

此规则有一个或多个字符串选项：

* `this` 的指定别名（默认为 `"that"`）

以下是使用默认选项 `"that"` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint consistent-this: ["error", "that"]*/

let that = 42;

let self = this;

that = 42;

self = this;
```

:::

以下是使用默认选项 `"that"` 时符合此规则的代码示例：

::: correct

```js
/*eslint consistent-this: ["error", "that"]*/

let that = this;

const self = 42;

let foo;

that = this;

foo.bar = this;
```

:::

以下是使用默认选项 `"that"` 且变量未初始化时违反此规则的代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint consistent-this: ["error", "that"]*/

let that;
function f() {
    that = this;
}
```

:::

以下是使用默认选项 `"that"` 且变量未初始化时符合此规则的代码示例：

声明变量 `that`，并将 `this` 赋值给它。

::: correct

```js
/*eslint consistent-this: ["error", "that"]*/

let that;
that = this;
```

:::

声明两个变量 `foo` 和 `that`，将 `foo` 初始化，然后把 `this` 赋值给 `that`。

::: correct

```js
/*eslint consistent-this: ["error", "that"]*/

let foo = 42, that;
that = this;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果需要捕获嵌套上下文，`consistent-this` 可能会带来问题。这类代码通常难以阅读和维护，因此建议考虑重构。
