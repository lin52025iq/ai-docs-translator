---
title: template-tag-spacing
rule_type: layout
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals
- https://exploringjs.com/es6/ch_template-literals.html#_examples-of-using-tagged-template-literals
---

<!-- markdownlint-disable-next-line MD051 -->
在 ES6 中，可以创建名为[标签模板字面量](#further-reading)的函数，其参数由模板字面量中的字符串和表达式组成。

使用标签模板字面量时，可以在标签函数和模板字面量之间插入空白。由于空白是可选的，以下两行等效：

```js
let hello = func`Hello world`;
let hello = func `Hello world`;
```

<a id="rule-details"></a>

## 规则详情

此规则旨在保持模板标签函数与其模板字面量之间的间距一致。

<a id="options"></a>

## 选项

```json
{
    "template-tag-spacing": ["error", "never"]
}
```

此规则有一个选项，其值可以设为 `"never"` 或 `"always"`。

* `"never"`（默认）- 禁止在标签函数与其模板字面量之间使用空格。
* `"always"` - 要求在标签函数与其模板字面量之间使用一个或多个空格。

### never

以下是使用默认选项 `"never"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint template-tag-spacing: "error"*/

func `Hello world`;
```

:::

以下是使用默认选项 `"never"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint template-tag-spacing: "error"*/

func`Hello world`;
```

:::

### always

以下是使用选项 `"always"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint template-tag-spacing: ["error", "always"]*/

func`Hello world`;
```

:::

以下是使用选项 `"always"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint template-tag-spacing: ["error", "always"]*/

func `Hello world`;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不希望在标签函数与其模板字面量之间使用空格时收到提示，可以安全地禁用此规则。
