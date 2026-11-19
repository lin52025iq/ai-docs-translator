---
title: dot-location
rule_type: layout
related_rules:
- newline-after-var
- dot-notation
---
JavaScript 允许在成员表达式中的点号前后换行。

统一在点号前或后换行可以大大提高代码的可读性。

```js
var a = universe.
        galaxy;

var b = universe
       .galaxy;
```

<a id="rule-details"></a>
## 规则详情

此规则旨在强制成员表达式中的换行保持一致，避免在点号前后混合换行。

<a id="options"></a>
## 选项

此规则接受一个字符串选项：

* 如果值为 `"object"`（默认值），成员表达式中的点号应与对象部分位于同一行。
* 如果值为 `"property"`，成员表达式中的点号应与属性部分位于同一行。

<a id="object"></a>
### object

默认的 `"object"` 选项要求点号与对象位于同一行。

默认 `"object"` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint dot-location: ["error", "object"]*/

var foo = object
.property;
```

:::

默认 `"object"` 选项下的**正确**代码示例：

::: correct

```js
/*eslint dot-location: ["error", "object"]*/

var foo = object.
property;

var bar = (
    object
).
property;

var baz = object.property;
```

:::

<a id="property"></a>
### property

`"property"` 选项要求点号与属性位于同一行。

`"property"` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint dot-location: ["error", "property"]*/

var foo = object.
property;
```

:::

`"property"` 选项下的**正确**代码示例：

::: correct

```js
/*eslint dot-location: ["error", "property"]*/

var foo = object
.property;
var bar = object.property;
```

:::

<a id="when-not-to-use-it"></a>
## 何时不使用

如果你不在意成员表达式中点号前后的换行是否一致，可以关闭此规则。
