---
title: logical-assignment-operators
rule_type: suggestion
---

ES2021 为逻辑运算符 `||`、`&&` 和 `??` 引入了赋值运算符简写。
此前，只有 `+` 或 `*` 等数学运算才支持这种简写（参见规则 [operator-assignment](./operator-assignment)）。
如果赋值目标与逻辑表达式的左侧表达式相同，就可以使用这种简写。
例如，`a = a || b` 可以简写为 `a ||= b`。

<a id="rule-details"></a>

## 规则详情

此规则要求使用或禁止使用逻辑赋值运算符简写。

<a id="options"></a>

## 选项

此规则有一个字符串选项和一个对象选项。
字符串选项：

* `"always"`（默认）
* `"never"`

对象选项（仅当字符串选项设为 `"always"` 时可用）：

* `"enforceForIfStatements": false`（默认）不检查等价的 `if` 语句。
* `"enforceForIfStatements": true` 检查等价的 `if` 语句。

### always

此选项会检查可以使用逻辑赋值运算符简写的表达式。例如，`a = a || b` 可以简写为 `a ||= b`。
对于具有结合性的表达式，例如 `a = a || b || c`，规则会报告它们可以简写为 `a ||= b || c`；但如果使用括号明确指定求值顺序，则不会报告，例如 `a = (a || b) || c`。

在默认的 `"always"` 选项下，此规则的错误代码示例：

::: incorrect

```js
/*eslint logical-assignment-operators: ["error", "always"]*/

a = a || b
a = a && b
a = a ?? b
a || (a = b)
a && (a = b)
a ?? (a = b)
a = a || b || c
a = a && b && c
a = a ?? b ?? c
```

:::

在默认的 `"always"` 选项下，此规则的正确代码示例：

::: correct

```js
/*eslint logical-assignment-operators: ["error", "always"]*/

a = b
a += b
a ||= b
a = b || c
a || (b = c)

if (a) a = b

a = (a || b) || c
```

:::

### never

在 `"never"` 选项下，此规则的错误代码示例：

::: incorrect

```js
/*eslint logical-assignment-operators: ["error", "never"]*/

a ||= b
a &&= b
a ??= b
```

:::

在 `"never"` 选项下，此规则的正确代码示例：

::: correct

```js
/*eslint logical-assignment-operators: ["error", "never"]*/

a = a || b
a = a && b
a = a ?? b
```

:::

### enforceForIfStatements

此选项还会检查其他可以用逻辑赋值运算符表示的 `if` 语句模式。

在 `["always", { enforceForIfStatements: true }]` 选项下，此规则的错误代码示例：

::: incorrect

```js
/*eslint logical-assignment-operators: ["error", "always", { enforceForIfStatements: true }]*/

if (a) a = b // <=> a &&= b
if (!a) a = b // <=> a ||= b

if (a == null) a = b // <=> a ??= b
if (a === null || a === undefined) a = b // <=> a ??= b
```

:::

在 `["always", { enforceForIfStatements: true }]` 选项下，此规则的正确代码示例：

::: correct

```js
/*eslint logical-assignment-operators: ["error", "always", { enforceForIfStatements: true }]*/

if (a) b = c
if (a === 0) a = b
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

是否使用逻辑运算符赋值简写属于风格选择。关闭此规则可以让开发者根据具体情况选择可读性更好的风格。