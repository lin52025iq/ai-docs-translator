---
title: no-param-reassign
rule_type: suggestion
further_reading:
- https://spin.atomicobject.com/2011/04/10/javascript-don-t-reassign-your-function-arguments/
---


对声明为函数参数的变量赋值可能会产生误导，并导致令人困惑的行为，因为在非 `strict` 模式下，修改函数参数也会改变 `arguments` 对象（参见下文[何时不应使用](#when-not-to-use-it)）。通常，对函数参数赋值并非本意，往往表明存在错误或程序员失误。

此规则也可以配置为在函数参数被修改时报告问题。修改参数带来的副作用可能导致反直觉的执行流程，并使错误难以追查。

<a id="rule-details"></a>
## 规则详情

此规则旨在防止因修改或重新赋值函数参数而导致的意外行为。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-param-reassign: "error"*/

const foo = function(bar) {
    bar = 13;
}

const foo1 = function(bar) {
    bar++;
}

const foo2 = function(bar) {
    for (bar in baz) {}
}

const foo3 = function(bar) {
    for (bar of baz) {}
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-param-reassign: "error"*/

const foo = function(bar) {
    const baz = bar;
}
```

:::

<a id="options"></a>
## 选项

此规则接受一个对象选项，其中包含一个布尔属性 `"props"`，以及数组 `"ignorePropertyModificationsFor"` 和 `"ignorePropertyModificationsForRegex"`。`"props"` 默认为 `false`。如果将 `"props"` 设为 `true`，则此规则会针对参数属性的修改发出警告，除非这些参数包含在 `"ignorePropertyModificationsFor"` 或 `"ignorePropertyModificationsForRegex"` 中；这两个选项默认均为空数组。

### props

默认选项 `{ "props": false }` 的正确代码示例：

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": false }]*/

const foo = function(bar) {
    bar.prop = "value";
}

const foo1 = function(bar) {
    delete bar.aaa;
}

const foo2 = function(bar) {
    bar.aaa++;
}

const foo3 = function(bar) {
    for (bar.aaa in baz) {}
}

const foo4 = function(bar) {
    for (bar.aaa of baz) {}
}
```

:::

`{ "props": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-param-reassign: ["error", { "props": true }]*/

const foo = function(bar) {
    bar.prop = "value";
}

const foo1 = function(bar) {
    delete bar.aaa;
}

const foo2 = function(bar) {
    bar.aaa++;
}

const foo3 = function(bar) {
    for (bar.aaa in baz) {}
}

const foo4 = function(bar) {
    for (bar.aaa of baz) {}
}
```

:::

设置 `"ignorePropertyModificationsFor"` 后，`{ "props": true }` 选项的正确代码示例：

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["bar"] }]*/

const foo = function(bar) {
    bar.prop = "value";
}

const foo1 = function(bar) {
    delete bar.aaa;
}

const foo2 = function(bar) {
    bar.aaa++;
}

const foo3 = function(bar) {
    for (bar.aaa in baz) {}
}

const foo4 = function(bar) {
    for (bar.aaa of baz) {}
}
```

:::

设置 `"ignorePropertyModificationsForRegex"` 后，`{ "props": true }` 选项的正确代码示例：

::: correct

```js
/*eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsForRegex": ["^bar"] }]*/

const foo = function(barVar) {
    barVar.prop = "value";
}

const foo1 = function(barrito) {
    delete barrito.aaa;
}

const foo2 = function(bar_) {
    bar_.aaa++;
}

const foo3 = function(barBaz) {
    for (barBaz.aaa in baz) {}
}

const foo4 = function(barBaz) {
    for (barBaz.aaa of baz) {}
}
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你希望允许对函数参数赋值，可以放心地禁用此规则。

`strict` 模式代码不会将 arguments 对象的索引与各个参数绑定同步。因此，在 ESM 模块或其他 `strict` 模式函数中，此规则并非防止 arguments 对象被修改所必需。
