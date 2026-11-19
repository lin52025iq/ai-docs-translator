---
title: prefer-named-capture-group
rule_type: suggestion
related_rules:
- no-invalid-regexp
---


<a id="rule-details"></a>
## 规则详情

随着 ECMAScript 2018 的发布，正则表达式中可以使用命名捕获组，这有助于提高可读性。
此规则旨在鼓励在正则表达式中使用命名捕获组，而不是编号捕获组：

```js
const regex = /(?<year>[0-9]{4})/;
```

另外，如果你的目的不是_捕获_结果，而只是表示备选项，请使用非捕获组：

```js
const regex = /(?:cauli|sun)flower/;
```

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-named-capture-group: "error"*/

const foo = /(ba[rz])/;
const bar = new RegExp('(ba[rz])');
const baz = RegExp('(ba[rz])');

foo.exec('bar')[1]; // Retrieve the group result.
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint prefer-named-capture-group: "error"*/

const foo = /(?<id>ba[rz])/;
const bar = new RegExp('(?<id>ba[rz])');
const baz = RegExp('(?<id>ba[rz])');
const xyz = /xyz(?:zy|abc)/;

foo.exec('bar').groups.id; // Retrieve the group result.
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不应使用此规则

如果你的目标环境是 ECMAScript 2017 或更早版本，则不应使用此规则，因为此 ECMAScript 特性仅在 ECMAScript 2018 或更新版本的环境中受支持。
