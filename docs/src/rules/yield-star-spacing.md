---
title: yield-star-spacing
rule_type: layout
further_reading:
- https://leanpub.com/understandinges6/read/#leanpub-auto-generators
---

<a id="rule-details"></a>

## 规则详情

此规则要求在 `yield*` 表达式中的 `*` 周围添加空格。

<a id="options"></a>

## 选项

此规则接受一个对象作为选项，该对象包含 `before` 和 `after` 两个键，其值为布尔值 `true` 或 `false`。

* `before` 用于设置 `yield` 和 `*` 之间的空格。
  如果值为 `true`，则必须有一个空格，否则不允许有空格。

* `after` 用于设置 `*` 和参数之间的空格。
  如果值为 `true`，则必须有一个空格，否则不允许有空格。

默认值为 `{"before": false, "after": true}`。

```json
"yield-star-spacing": ["error", {"before": true, "after": false}]
```

此选项也支持使用字符串简写：

* `{"before": false, "after": true}` → `"after"`
* `{"before": true, "after": false}` → `"before"`
* `{"before": true, "after": true}` → `"both"`
* `{"before": false, "after": false}` → `"neither"`

```json
"yield-star-spacing": ["error", "after"]
```

<a id="after"></a>

### after

以下代码在使用默认选项 `"after"` 时符合此规则：

::: correct

```js
/*eslint yield-star-spacing: ["error", "after"]*/

function* generator() {
  yield* other();
}
```

:::

<a id="before"></a>

### before

以下代码在使用选项 `"before"` 时符合此规则：

::: correct

```js
/*eslint yield-star-spacing: ["error", "before"]*/

function *generator() {
  yield *other();
}
```

:::

<a id="both"></a>

### both

以下代码在使用选项 `"both"` 时符合此规则：

::: correct

```js
/*eslint yield-star-spacing: ["error", "both"]*/

function * generator() {
  yield * other();
}
```

:::

<a id="neither"></a>

### neither

以下代码在使用选项 `"neither"` 时符合此规则：

::: correct

```js
/*eslint yield-star-spacing: ["error", "neither"]*/

function*generator() {
  yield*other();
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你的项目不会使用生成器，或者你不在意空格的一致性，就不需要使用此规则。
