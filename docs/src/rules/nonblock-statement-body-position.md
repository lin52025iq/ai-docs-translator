---
title: nonblock-statement-body-position
rule_type: layout
further_reading:
- https://jscs-dev.github.io/rule/requireNewlineBeforeSingleStatementsInIf
---
编写 `if`、`else`、`while`、`do-while` 和 `for` 语句时，其主体可以是单条语句，而不是代码块。统一这些单条语句的位置会很有帮助。

例如，有些开发者会避免这样编写代码：

```js
if (foo)
  bar();
```

如果另一位开发者尝试在 `if` 语句中添加 `baz();`，可能会误将代码改成这样：

```js
if (foo)
  bar();
  baz(); // this line is not in the `if` statement!
```

为避免这个问题，可以要求所有单行 `if` 语句都紧跟在条件后面，中间不换行：

```js
if (foo) bar();
```

<a id="rule-details"></a>

## 规则详情

此规则旨在统一单行语句的位置。

请注意，此规则不会强制使用单行语句。如果要禁止单行语句，请改用 [`curly`](curly) 规则。

<a id="options"></a>

### 选项

此规则接受一个字符串选项：

* `"beside"`（默认）禁止在单行语句前换行。
* `"below"` 要求在单行语句前换行。
* `"any"` 不限制单行语句的位置。

此外，此规则还接受一个可选的对象选项，其中包含 `"overrides"` 键。它可用于为特定语句指定位置，以覆盖默认设置。例如：

* `"beside", { "overrides": { "while": "below" } }` 要求所有单行语句与其父语句位于同一行；但如果父语句是 `while` 语句，则单行语句不得与其位于同一行。
* `"below", { "overrides": { "do": "any" } }` 禁止所有单行语句与其父语句位于同一行；但如果父语句是 `do-while` 语句，则不限制单行语句的位置。

使用默认 `"beside"` 选项时，此规则下的**错误**代码示例如下：

::: incorrect

```js
/* eslint nonblock-statement-body-position: ["error", "beside"] */

if (foo)
  bar();
else
  baz();

while (foo)
  bar();

for (let i = 1; i < foo; i++)
  bar();

do
  bar();
while (foo)

```

:::

使用默认 `"beside"` 选项时，此规则下的**正确**代码示例如下：

::: correct

```js
/* eslint nonblock-statement-body-position: ["error", "beside"] */

if (foo) bar();
else baz();

while (foo) bar();

for (let i = 1; i < foo; i++) bar();

do bar(); while (foo)

if (foo) { // block statements are always allowed with this rule
  bar();
} else {
  baz();
}
```

:::

使用 `"below"` 选项时，此规则下的**错误**代码示例如下：

::: incorrect

```js
/* eslint nonblock-statement-body-position: ["error", "below"] */

if (foo) bar();
else baz();

while (foo) bar();

for (let i = 1; i < foo; i++) bar();

do bar(); while (foo)
```

:::

使用 `"below"` 选项时，此规则下的**正确**代码示例如下：

::: correct

```js
/* eslint nonblock-statement-body-position: ["error", "below"] */

if (foo)
  bar();
else
  baz();

while (foo)
  bar();

for (let i = 1; i < foo; i++)
  bar();

do
  bar();
while (foo)

if (foo) {
  // Although the second `if` statement is on the same line as the `else`, this is a very common
  // pattern, so it's not checked by this rule.
} else if (bar) {
}
```

:::

使用 `"beside", { "overrides": { "while": "below" } }` 规则时，此规则下的**错误**代码示例如下：

::: incorrect

```js
/* eslint nonblock-statement-body-position: ["error", "beside", { "overrides": { "while": "below" } }] */

if (foo)
  bar();

while (foo) bar();
```

:::

使用 `"beside", { "overrides": { "while": "below" } }` 规则时，此规则下的**正确**代码示例如下：

::: correct

```js
/* eslint nonblock-statement-body-position: ["error", "beside", { "overrides": { "while": "below" } }] */

if (foo) bar();

while (foo)
  bar();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不在意单行语句的位置是否统一，就不应启用此规则。如果使用 [`curly`](curly) 规则的 `"all"` 选项，也可以禁用此规则，因为该选项会完全禁止单行语句。