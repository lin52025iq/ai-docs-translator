---
title: space-in-parens
rule_type: layout
related_rules:
- array-bracket-spacing
- object-curly-spacing
- computed-property-spacing
---
有些代码风格指南要求或禁止在括号内添加空格：

```js
foo( 'bar' );
var x = ( 1 + 2 ) * 3;

foo('bar');
var x = (1 + 2) * 3;
```

<a id="rule-details"></a>

## 规则详情

此规则通过禁止或要求在 `(` 右侧和 `)` 左侧添加一个或多个空格，来确保括号内侧的空格保持一致。

只要没有使用 `"empty"` 异常明确禁止空括号，就允许使用 `()`。

<a id="options"></a>

## 选项

此规则有两个选项：

* `"never"`（默认）要求括号内不含空格
* `"always"` 要求括号内有空格

根据你的代码约定，可以在配置中指定其中一个选项：

```json
"space-in-parens": ["error", "always"]
```

### "never"

以下示例中，使用此规则的默认选项 `"never"` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never"]*/

foo( );

foo( 'bar');
foo('bar' );
foo( 'bar' );

foo( /* bar */ );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```

:::

以下示例中，使用此规则的默认选项 `"never"` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "never"]*/

foo();

foo('bar');

foo(/* bar */);

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```

:::

### "always"

以下示例中，使用选项 `"always"` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always"]*/

foo( 'bar');
foo('bar' );
foo('bar');

foo(/* bar */);

var foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```

:::

以下示例中，使用选项 `"always"` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "always"]*/

foo();
foo( );

foo( 'bar' );

foo( /* bar */ );

var foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );
```

:::

<a id="exceptions"></a>

### 异常

可以将对象字面量用作第三个数组项，以指定异常；其中键为 `"exceptions"`，值为数组。这些异常的效果取决于第一个选项。也就是说，如果设置 `"always"` 来要求添加空格，那么任何“异常”都会**禁止**添加空格。反之，如果设置 `"never"` 来禁止添加空格，那么任何“异常”都会**要求**添加空格。

请注意，此规则只会检查圆括号内的空格；不会检查花括号或方括号内的空格，但当这些括号与左圆括号或右圆括号相邻时，会要求或禁止在它们与圆括号之间添加空格。

可用的异常如下：`["{}", "[]", "()", "empty"]`。

<a id="empty-exception"></a>

### 空内容异常

空括号异常及其行为：

* `always` 允许使用 `()` 和 `( )`
* `never`（默认）要求使用 `()`
* `always` 配合 `empty` 异常时要求使用 `()`
* `never` 配合 `empty` 异常时要求使用 `( )`（此时禁止使用不带空格的空括号）

以下示例中，使用选项 `"never", { "exceptions": ["{}"] }` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo(1, {bar: 'baz'});
```

:::

以下示例中，使用选项 `"never", { "exceptions": ["{}"] }` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo(1, {bar: 'baz'} );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["{}"] }` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo( {bar: 'baz'} );
foo( 1, {bar: 'baz'} );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["{}"] }` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}"] }]*/

foo({bar: 'baz'});
foo( 1, {bar: 'baz'});
```

:::

以下示例中，使用选项 `"never", { "exceptions": ["[]"] }` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1);
```

:::

以下示例中，使用选项 `"never", { "exceptions": ["[]"] }` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1);
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["[]"] }` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo( [bar, baz] );
foo( [bar, baz], 1 );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["[]"] }` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["[]"] }]*/

foo([bar, baz]);
foo([bar, baz], 1 );
```

:::

以下示例中，使用选项 `"never", { "exceptions": ["()"] }]` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo((1 + 2));
foo((1 + 2), 1);
foo(bar());
```

:::

以下示例中，使用选项 `"never", { "exceptions": ["()"] }]` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["()"] }]*/

foo( (1 + 2) );
foo( (1 + 2), 1);
foo(bar() );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["()"] }]` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo( ( 1 + 2 ) );
foo( ( 1 + 2 ), 1 );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["()"] }]` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["()"] }]*/

foo(( 1 + 2 ));
foo(( 1 + 2 ), 1 );
```

:::

`"empty"` 异常针对空括号，其作用方式与其他异常相同，即反转第一个选项的行为。

以下示例中，使用选项 `"never", { "exceptions": ["empty"] }]` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo();
```

:::

以下示例中，使用选项 `"never", { "exceptions": ["empty"] }]` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "never", { "exceptions": ["empty"] }]*/

foo( );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["empty"] }]` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo( );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["empty"] }]` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["empty"] }]*/

foo();
```

:::

你可以在 `"exceptions"` 数组中包含多个条目。

以下示例中，使用选项 `"always", { "exceptions": ["{}", "[]"] }]` 时，代码**不正确**：

::: incorrect

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar( {bar:'baz'} );
baz( 1, [1,2] );
foo( {bar: 'baz'}, [1, 2] );
```

:::

以下示例中，使用选项 `"always", { "exceptions": ["{}", "[]"] }]` 时，代码**正确**：

::: correct

```js
/*eslint space-in-parens: ["error", "always", { "exceptions": ["{}", "[]"] }]*/

bar({bar:'baz'});
baz( 1, [1,2]);
foo({bar: 'baz'}, [1, 2]);
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不关心圆括号内空格的一致性，可以关闭此规则。
