---
title: no-eq-null
rule_type: suggestion
related_rules:
- eqeqeq
---


不使用类型检查运算符（`==` 或 `!=`）与 `null` 比较可能会产生意外结果，因为比较结果不仅在与 `null` 比较时会是 `true`，与 `undefined` 比较时也会是 `true`。

```js
if (foo == null) {
  bar();
}
```

<a id="rule-details"></a>
## 规则详情

`no-eq-null` 规则旨在确保与 `null` 的比较只匹配 `null`，而不匹配 `undefined`，从而减少潜在错误和不期望的行为。因此，该规则会标记使用 `==` 和 `!=` 与 `null` 进行比较的情况。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-eq-null: "error"*/

if (foo == null) {
  bar();
}

while (qux != null) {
  baz();
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-eq-null: "error"*/

if (foo === null) {
  bar();
}

while (qux !== null) {
  baz();
}

if (foo === null || foo === undefined) {
  bar();
}

while (qux !== null && qux !== undefined) {
  baz();
}
```

:::

此规则会为每个被报告的比较提供两条建议：

* 将 `==` 或 `!=` 替换为 `===` 或 `!==`，以便只与 `null` 比较。当另一个操作数为 `undefined` 时，这会改变比较结果。
* 替换运算符，并添加与 `undefined` 的比较，例如 `foo === null || foo === undefined`，以继续同时与 `null` 和 `undefined` 比较。只有当另一个操作数可以安全地重复使用时（例如 `foo` 或 `foo.bar`），才会提供此建议。

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 不适用场景

如果你希望普遍强制使用类型检查运算，请改用功能更强大的 [eqeqeq](./eqeqeq)。

<a id="compatibility"></a>
## 兼容性

* **JSHint**：此规则对应于 JSHint 的 `eqnull` 规则。
