---
title: implicit-arrow-linebreak
rule_type: layout
related_rules:
- brace-style
---
箭头函数体可以是一个表达式，从而隐式返回结果，而不必使用块语句体。强制隐式返回的表达式位于统一位置可能会很有用。

<a id="rule-details"></a>
## 规则详情

此规则旨在强制包含隐式返回的箭头函数将其表达式放在统一的位置。

<a id="options"></a>
### 选项

此规则接受一个字符串选项：

* `"beside"`（默认值）禁止在箭头函数体之前换行。
* `"below"` 要求在箭头函数体之前换行。

使用默认选项 `"beside"` 时，此规则的错误代码示例：

::: incorrect

```js
/* eslint implicit-arrow-linebreak: ["error", "beside"] */

(foo) =>
  bar;

(foo) =>
  (bar);

(foo) =>
  bar =>
    baz;

(foo) =>
(
  bar()
);
```

:::

使用默认选项 `"beside"` 时，此规则的正确代码示例：

::: correct

```js
/* eslint implicit-arrow-linebreak: ["error", "beside"] */

(foo) => bar;

(foo) => (bar);

(foo) => bar => baz;

(foo) => (
  bar()
);

// functions with block bodies allowed with this rule using any style
// to enforce a consistent location for this case, see the rule: `brace-style`
(foo) => {
  return bar();
}

(foo) =>
{
  return bar();
}
```

:::

使用选项 `"below"` 时，此规则的错误代码示例：

::: incorrect

```js
/* eslint implicit-arrow-linebreak: ["error", "below"] */

(foo) => bar;

(foo) => (bar);

(foo) => bar => baz;
```

:::

使用选项 `"below"` 时，此规则的正确代码示例：

::: correct

```js
/* eslint implicit-arrow-linebreak: ["error", "below"] */

(foo) =>
  bar;

(foo) =>
  (bar);

(foo) =>
  bar =>
    baz;
```

:::

<a id="when-not-to-use-it"></a>
## 何时不使用

如果你不在意隐式返回的箭头函数表达式是否位于统一的位置，就不应启用此规则。

如果你使用 [`arrow-body-style`](arrow-body-style) 的 `"always"` 选项，也可以禁用此规则，因为该选项会禁止在箭头函数中使用隐式返回。
