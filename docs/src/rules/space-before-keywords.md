---
title: space-before-keywords

related_rules:
- space-after-keywords
- block-spacing
- space-return-throw-case
- space-unary-ops
- space-infix-ops
---

强制关键字前的空格保持一致。

::: important
此规则已在 ESLint v2.0.0 中移除，并由 [keyword-spacing](keyword-spacing) 规则取代。
:::

（可自动修复）[命令行](../use/command-line-interface#--fix)中的 `--fix` 选项会自动修复此规则报告的问题。

关键字是 JavaScript 的语法元素，例如 `function` 和 `if`。这些标识符在语言中有特殊含义，因此在代码编辑器中通常会以不同颜色显示。作为语言的重要组成部分，样式指南通常会规定关键字周围应使用何种空格。例如，样式指南可能规定关键字前必须有空格，这意味着 `if-else` 语句必须如下所示：

```js
if (foo) {
    // ...
} else {
    // ...
}
```

当然，你也可以使用不允许关键字前有空格的样式指南。

<a id="rule-details"></a>

## 规则详情

此规则将强制以下关键字前的空格保持一致：`if`、`else`、`for`、
`while`、`do`、`switch`、`throw`、`try`、`catch`、`finally`、`with`、`break`、`continue`、
`return`、`function`、`yield`、`class`，以及变量声明（`let`、`const`、`var`）
和标签语句。

此规则接受一个参数：`"always"` 或 `"never"`。如果为 `"always"`，关键字前必须至少有一个空格。如果为 `"never"`，则关键字 `else`、`while`（do...while）、`finally` 和 `catch` 前不允许有空格。默认值为 `"always"`。

此规则允许关键字前出现左花括号（`{`）。如果你希望更改此行为，可以考虑使用 [block-spacing](block-spacing) 规则。

使用默认选项 `"always"` 时，此规则下的**错误**代码示例如下：

::: incorrect

```js
/*eslint space-before-keywords: ["error", "always"]*/

if (foo) {
    // ...
}else {}

const foo = 'bar';let baz = 'qux';

var qux =function bar () {}

function bar() {
    if (foo) {return; }
}
```

:::

使用默认选项 `"always"` 时，此规则下的**正确**代码示例如下：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint space-before-keywords: ["error", "always"]*/

if (foo) {
    // ...
} else {}

(function() {})();

<Foo onClick={function bar() {}} />

for (let foo of ['bar', 'baz', 'qux']) {}
```

:::

使用选项 `"never"` 时，此规则下的**错误**代码示例如下：

::: incorrect

```js
/*eslint space-before-keywords: ["error", "never"]*/

if (foo) {
    // ...
} else {}

do {

}
while (foo)

try {} finally {}

try {} catch(e) {}
```

:::

使用选项 `"never"` 时，此规则下的**正确**代码示例如下：

::: correct

```js
/*eslint space-before-keywords: ["error", "never"]*/

if (foo) {
    // ...
}else {}

do {}while (foo)

try {}finally {}

try{}catch(e) {}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不希望强制关键字周围的空格保持一致。
