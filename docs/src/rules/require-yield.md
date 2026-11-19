---
title: require-yield
rule_type: suggestion
related_rules:
- require-await
---



<a id="rule-details"></a>
## 规则详情

对于没有 `yield` 关键字的生成器函数，此规则会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint require-yield: "error"*/

function* foo() {
  return 10;
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint require-yield: "error"*/

function* foo() {
  yield 5;
  return 10;
}

function bar() {
  return 10;
}

// This rule does not warn on empty generator functions.
function* baz() { }
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你不希望对没有 `yield` 表达式的生成器函数发出通知，可以放心禁用此规则。
