---
title: no-extra-boolean-cast
rule_type: suggestion
---

在 `if` 语句的测试条件等上下文中，表达式的结果本就会被强制转换为布尔值，因此通过双重否定（`!!`）或调用 `Boolean` 转换为布尔值是不必要的。例如，以下 `if` 语句是等价的：

```js
if (!!foo) {
    // ...
}

if (Boolean(foo)) {
    // ...
}

if (foo) {
    // ...
}
```

<a id="rule-details"></a>

## 规则详情

此规则禁止不必要的布尔值转换。

此规则中**错误**代码的示例：

::: incorrect

```js
/*eslint no-extra-boolean-cast: "error"*/

const foo = !!!bar;

const foo1 = !!bar ? baz : bat;

const foo2 = Boolean(!!bar);

const foo3 = new Boolean(!!bar);

if (!!foo) {
    // ...
}

if (Boolean(foo)) {
    // ...
}

while (!!foo) {
    // ...
}

do {
    // ...
} while (Boolean(foo));

for (; !!foo; ) {
    // ...
}
```

:::

此规则中**正确**代码的示例：

::: correct

```js
/*eslint no-extra-boolean-cast: "error"*/

const foo = !!bar;
const foo1 = Boolean(bar);

function qux() {
    return !!bar;
}

foo = bar ? !!baz : !!bat;
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

*   当 `"enforceForInnerExpressions"` 设置为 `true` 时，除了检查默认上下文外，还会检查结果用于布尔上下文的表达式中是否存在多余的布尔值转换。请参阅以下示例。默认值为 `false`，这表示此规则默认不会针对内部表达式中的多余布尔值转换发出警告。

**已弃用：**对象属性 `enforceForLogicalOperands` 已弃用（[eslint#18222](https://github.com/eslint/eslint/pull/18222)）。请改用 `enforceForInnerExpressions`。

### enforceForInnerExpressions

将 `"enforceForInnerExpressions"` 选项设为 `true` 时，此规则中**错误**代码的示例：

::: incorrect

```js
/*eslint no-extra-boolean-cast: ["error", {"enforceForInnerExpressions": true}]*/

if (!!foo || bar) {
    //...
}

while (!!foo && bar) {
    //...
}

if ((!!foo || bar) && !!baz) {
    //...
}

const foo = new Boolean(!!bar || baz);

foo && Boolean(bar) ? baz : bat;

const ternaryBranches = Boolean(bar ? !!baz : bat);

const nullishCoalescingOperator = Boolean(bar ?? Boolean(baz));

const commaOperator = Boolean((bar, baz, !!bat));

// another comma operator example
for (let i = 0; console.log(i), Boolean(i < 10); i++) {
    // ...
}
```

:::

将 `"enforceForInnerExpressions"` 选项设为 `true` 时，此规则中**正确**代码的示例：

::: correct

```js
/*eslint no-extra-boolean-cast: ["error", {"enforceForInnerExpressions": true}]*/

// Note that `||` and `&&` alone aren't a boolean context for either operand
// since the resultant value need not be a boolean without casting.
const foo = !!bar || baz;

if (foo || bar) {
    //...
}

while (foo && bar) {
    //...
}

if ((foo || bar) && baz) {
    //...
}

const foo1 = new Boolean(bar || baz);

foo && bar ? baz : bat;

const ternaryBranches = Boolean(bar ? baz : bat);

const nullishCoalescingOperator = Boolean(bar ?? baz);

const commaOperator = Boolean((bar, baz, bat));

// another comma operator example
for (let i = 0; console.log(i), i < 10; i++) {
    // ...
}

// comma operator in non-final position
Boolean((Boolean(bar), baz, bat));
```

:::