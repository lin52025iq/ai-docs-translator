---
title: no-empty-class

---

禁止在正则表达式中使用空字符类。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [no-empty-character-class](no-empty-character-class) 规则取代。
:::

正则表达式中的空字符类无法匹配任何内容，可能导致代码无法按预期运行。

```js
var foo = /^abc[]/;
```

<a id="rule-details"></a>

## 规则详情

此规则旨在指出正则表达式中可能存在的拼写错误和意外行为，这些问题可能由使用空字符类引起。

此规则的错误代码示例：

::: incorrect

```js
var foo = /^abc[]/;

/^abc[]/.test(foo);

bar.match(/^abc[]/);
```

:::

此规则的正确代码示例：

::: correct

```js
var foo = /^abc/;

var foo = /^abc[a-z]/;

var bar = new RegExp("^abc[]");
```

:::