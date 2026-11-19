---
title: semi-spacing
rule_type: layout
related_rules:
- semi
- no-extra-semi
- comma-spacing
- block-spacing
- space-in-parens
---
JavaScript 允许在分号前后添加不必要的空格。

禁止或强制要求在分号周围添加空格，可以提高程序的可读性。

```js
var a = "b" ;

var c = "d";var e = "f";
```

<a id="rule-details"></a>

## 规则详情

此规则旨在强制规定分号周围的空格。此规则会禁止在表达式的分号前使用空格。

此规则不会检查以下情况中的空格：

* 如果分号是该行的第一个令牌，则不检查分号后的空格。

* 如果分号前面是左括号（`(` 或 `{`），则不检查分号前的空格；如果分号后面是右括号（`)` 或 `}`），则不检查分号后的空格。这些空格由 `space-in-parens` 或 `block-spacing` 检查。

* 条件为空的 for 循环（`for(;;)`）中分号周围的空格。

<a id="options"></a>

## 选项

此规则接受一个对象作为选项，其中包含两个键 `before` 和 `after`，它们的值为布尔值 `true` 或 `false`。
如果 `before` 为 `true`，则强制要求在分号前添加空格；如果为 `false`，则禁止在分号前添加空格。
如果 `after` 为 `true`，则强制要求在分号后添加空格；如果为 `false`，则禁止在分号后添加空格。
仅当分号不位于行尾时，才会应用 `after` 选项。

默认值为 `{"before": false, "after": true}`。

```json
    "semi-spacing": ["error", {"before": false, "after": true}]
```

### `{"before": false, "after": true}`

这是默认选项。它强制要求在分号后添加空格，并禁止在分号前添加空格。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint semi-spacing: "error"*/

var foo ;
var foo;var bar;
throw new Error("error") ;
while (a) { break ; }
for (i = 0 ; i < 10 ; i++) {}
for (i = 0;i < 10;i++) {}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint semi-spacing: "error"*/

var foo;
var foo; var bar;
throw new Error("error");
while (a) { break; }
for (i = 0; i < 10; i++) {}
for (;;) {}
if (true) {;}
;foo();
```

:::

### `{"before": true, "after": false}`

此选项强制要求在分号前添加空格，并禁止在分号后添加空格。

使用 `{"before": true, "after": false}` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint semi-spacing: ["error", { "before": true, "after": false }]*/

var foo;
var foo ; var bar;
throw new Error("error");
while (a) { break; }
for (i = 0;i < 10;i++) {}
for (i = 0; i < 10; i++) {}
```

:::

使用 `{"before": true, "after": false}` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint semi-spacing: ["error", { "before": true, "after": false }]*/

var foo ;
var foo ;var bar ;
throw new Error("error") ;
while (a) {break ;}
for (i = 0 ;i < 10 ;i++) {}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不关心分号前后空格的一致性，可以关闭此规则。
