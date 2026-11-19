---
title: no-unsafe-negation
rule_type: problem
handled_by_typescript: true
---




开发者可能会在想要表示和的相反数 `-(a + b)` 时，误写成 `-a + b`；同样，他们也可能误写成 `!key in object`，而他们几乎肯定是想写 `!(key in object)`，以测试某个键是否不在对象中。`!obj instanceof Ctor` 也是类似的情况。

<a id="rule-details"></a>

## 规则详情

此规则禁止对以下关系运算符的左操作数取反：

* [`in` 运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)。
* [`instanceof` 运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)。

此规则中**错误**代码的示例：

::: incorrect

```js
/*eslint no-unsafe-negation: "error"*/

if (!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
}

if (!obj instanceof Ctor) {
    // operator precedence makes it equivalent to (!obj) instanceof Ctor
    // and it equivalent to always false since boolean values are not objects.
}
```

:::

此规则中**正确**代码的示例：

::: correct

```js
/*eslint no-unsafe-negation: "error"*/

if (!(key in object)) {
    // key is not in object
}

if (!(obj instanceof Ctor)) {
    // obj is not an instance of Ctor
}
```

:::

<a id="exception"></a>

### 例外情况

在少数确实需要对左操作数取反的情况下，此规则允许例外。
如果整个取反表达式都明确地用括号括起来，此规则就不会报告问题。

此规则中**正确**代码的示例：

::: correct

```js
/*eslint no-unsafe-negation: "error"*/

if ((!foo) in object) {
    // allowed, because the negation is explicitly wrapped in parentheses
    // it is equivalent to (foo ? "false" : "true") in object
    // this is allowed as an exception for rare situations when that is the intended meaning
}

if(("" + !foo) in object) {
    // you can also make the intention more explicit, with type conversion
}
```

:::

此规则中**错误**代码的示例：

::: incorrect

```js
/*eslint no-unsafe-negation: "error"*/

if (!(foo) in object) {
    // this is not an allowed exception
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"enforceForOrderingRelations": false`（默认值）允许对排序关系运算符（`<`、`>`、`<=`、`>=`）的左侧取反
* `"enforceForOrderingRelations": true` 禁止对排序关系运算符的左侧取反

<a id="enforcefororderingrelations"></a>

### enforceForOrderingRelations

将此选项设为 `true` 后，此规则还会检查以下运算符：

* `<` 运算符。
* `>` 运算符。
* `<=` 运算符。
* `>=` 运算符。

这样做是为了避免诸如 `! a < b` 这样的表达式（它等价于 `(a ? 0 : 1) < b`），因为实际意图通常是 `!(a < b)`。

启用 `{ "enforceForOrderingRelations": true }` 选项时，此规则还会将以下代码视为**错误**：

::: incorrect

```js
/*eslint no-unsafe-negation: ["error", { "enforceForOrderingRelations": true }]*/

if (! a < b) {}

while (! a > b) {}

foo = ! a <= b;

foo = ! a >= b;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不希望收到有关不安全逻辑取反的提示，可以安全地禁用此规则。
