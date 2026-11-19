---
title: yoda
rule_type: suggestion
further_reading:
- https://en.wikipedia.org/wiki/Yoda_conditions
- http://thomas.tuerke.net/on/design/?with=1249091668#msg1146181680
---



尤达条件之所以得名，是因为条件中的字面量位于前面，而变量位于后面。例如，以下就是一个尤达条件：

```js
if ("red" === color) {
    // ...
}
```

之所以称为尤达条件，是因为它读起来像是“如果红色等于颜色”，类似于《星球大战》角色尤达的说话方式。对比另一种操作数排列方式：

```js
if (color === "red") {
    // ...
}
```

这通常读作“如果颜色等于红色”，可以说是描述这种比较更自然的方式。

尤达条件的支持者指出，由于无法给字面量赋值，因此不可能误将 `=` 用作 `==`。这样做会导致语法错误，让你能尽早发现问题。因此，在工具尚未普及的早期编程中，这种做法十分常见。

尤达条件的反对者指出，工具让我们成为了更优秀的程序员，因为工具会捕获误将 `=` 用作 `==` 的情况（ESLint 会为你捕获这种错误）。因此，他们认为，这种模式带来的好处并不足以弥补使用尤达条件时对代码可读性的损害。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保将变量与字面量进行比较的条件具有一致的风格。

<a id="options"></a>

## 选项

此规则接受一个字符串选项：

* 如果使用默认值 `"never"`，比较中绝不能使用尤达条件。
* 如果使用 `"always"`，字面量必须始终位于前面。

默认选项 `"never"` 可以通过对象字面量中的选项指定例外：

* 如果属性 `"exceptRange"` 为 `true`，那么对于直接用括号括起来的范围比较，此规则*允许*使用尤达条件；这些括号也可以是 `if` 或 `while` 条件本身的括号。默认值为 `false`。*范围*比较用于测试变量是否位于两个字面量所界定的范围之内或之外。
* 如果属性 `"onlyEquality"` 为 `true`，那么此规则*仅*针对相等运算符 `==` 和 `===` 报告尤达条件。默认值为 `false`。

`onlyEquality` 选项允许的例外范围比 `exceptRange` 更广，因此同时使用这两个选项没有意义。

<a id="never"></a>

### never

默认选项 `"never"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint yoda: "error"*/

if ("red" === color) {
    // ...
}

if (`red` === color) {
    // ...
}

if (`red` === `${color}`) {
    // ...
}

if (true == flag) {
    // ...
}

if (5 > count) {
    // ...
}

if (-1 < str.indexOf(substr)) {
    // ...
}

if (0 <= x && x < 1) {
    // ...
}
```

:::

默认选项 `"never"` 下的**正确**代码示例：

::: correct

```js
/*eslint yoda: "error"*/

if (5 & value) {
    // ...
}

if (value === "red") {
    // ...
}

if (value === `red`) {
    // ...
}

if (`${value}` === `red`) {

}
```

:::

<a id="exceptrange"></a>

### exceptRange

使用选项 `"never", { "exceptRange": true }` 时的**正确**代码示例：

::: correct

```js
/*eslint yoda: ["error", "never", { "exceptRange": true }]*/

function isReddish(color) {
    return (color.hue < 60 || 300 < color.hue);
}

if (x < -1 || 1 < x) {
    // ...
}

if (count < 10 && (0 <= rand && rand < 1)) {
    // ...
}

if (`blue` < x && x < `green`) {
    // ...
}

function howLong(arr) {
    return (0 <= arr.length && arr.length < 10) ? "short" : "long";
}
```

:::

<a id="onlyequality"></a>

### onlyEquality

使用选项 `"never", { "onlyEquality": true }` 时的**正确**代码示例：

::: correct

```js
/*eslint yoda: ["error", "never", { "onlyEquality": true }]*/

if (x < -1 || 9 < x) {
}

if (x !== 'foo' && 'bar' != x) {
}

if (x !== `foo` && `bar` != x) {
}
```

:::

<a id="always"></a>

### always

选项 `"always"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint yoda: ["error", "always"]*/

if (color == "blue") {
    // ...
}

if (color == `blue`) {
    // ...
}
```

:::

选项 `"always"` 下的**正确**代码示例：

::: correct

```js
/*eslint yoda: ["error", "always"]*/

if ("blue" == value) {
    // ...
}

if (`blue` == value) {
    // ...
}

if (`blue` == `${value}`) {
    // ...
}

if (-1 < str.indexOf(substr)) {
    // ...
}
```

:::