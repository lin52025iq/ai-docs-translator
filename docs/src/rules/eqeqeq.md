---
title: eqeqeq
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness
---



通常认为，使用类型安全的相等运算符 `===` 和 `!==`，而不是对应的普通运算符 `==` 和 `!=`，是一种良好实践。

这是因为 `==` 和 `!=` 会执行类型强制转换，而其遵循的 [抽象相等比较算法](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)相当晦涩。
例如，以下语句的结果都被视为 `true`：

* `[] == false`
* `[] == ![]`
* `3 == "03"`

如果其中任何一种情况出现在 `a == b` 这类看似无害的语句中，就很难发现实际问题。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除类型不安全的相等运算符。

此规则的错误代码示例：

::: incorrect

```js
/*eslint eqeqeq: "error"*/

if (x == 42) { }

if ("" == text) { }

if (obj.getStuff() != undefined) { }
```

:::

命令行中的 `--fix` 选项会自动修复此规则报告的部分问题。只有当其中一个操作数是 `typeof` 表达式，或者两个操作数都是类型相同的字面量时，才会修复问题。

在其他情况下，规则会提供建议；如果操作数的类型不同，应用建议可能会改变运行时行为。

<a id="options"></a>

## 选项

### always

`"always"` 选项（默认值）会要求在所有情况下都使用 `===` 和 `!==`（除非你选择对 `null` 进行更具体的处理，见下文）。

`"always"` 选项的错误代码示例：

::: incorrect

```js
/*eslint eqeqeq: ["error", "always"]*/

a == b
foo == true
bananas != 1
value == undefined
typeof foo == 'undefined'
'hello' != 'world'
0 == 0
true == true
foo == null

```

:::

`"always"` 选项的正确代码示例：

::: correct

```js
/*eslint eqeqeq: ["error", "always"]*/

a === b
foo === true
bananas !== 1
value === undefined
typeof foo === 'undefined'
'hello' !== 'world'
0 === 0
true === true
foo === null

```

:::

此规则还可以接受第二个参数，该参数应为一个对象，并支持以下属性：

* `"null"`：自定义此规则对 `null` 字面量的处理方式。可选值：
    * `always`（默认值）- 始终使用 `===` 或 `!==`。
    * `never` - 对 `null` 不使用 `===` 或 `!==`。
    * `ignore` - 不对 `null` 应用此规则。

### smart

`"smart"` 选项要求使用 `===` 和 `!==`，但以下情况除外：

* 比较两个字面量值。
* 求取 `typeof` 的值。
* 与 `null` 比较。

`"smart"` 选项的错误代码示例：

::: incorrect

```js
/*eslint eqeqeq: ["error", "smart"]*/

// comparing two variables requires ===
a == b

// only one side is a literal
foo == true
bananas != 1

// comparing to undefined requires ===
value == undefined
```

:::

`"smart"` 选项的正确代码示例：

::: correct

```js
/*eslint eqeqeq: ["error", "smart"]*/

typeof foo == 'undefined'
'hello' != 'world'
0 == 0
true == true
foo == null
```

:::

### allow-null

**已弃用：**请改用此选项的替代方式：使用 `"always"`，并传入值为 `"ignore"` 的 `"null"` 选项属性。这会告知 ESLint 始终强制使用严格相等运算符，但与 `null` 字面量比较时除外。

```js
["error", "always", {"null": "ignore"}]
```

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不想强制规定相等运算符的使用风格，可以放心地禁用此规则。
