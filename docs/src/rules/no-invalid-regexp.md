---
title: no-invalid-regexp
rule_type: problem
further_reading:
- https://es5.github.io/#x7.8.5
---



正则表达式字面量中的无效模式会在解析代码时导致 `SyntaxError`，而 `RegExp` 构造函数中的无效字符串只有在代码执行时才会抛出 `SyntaxError`。

<a id="rule-details"></a>

## 规则详情

此规则禁止在 `RegExp` 构造函数中使用无效的正则表达式字符串。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-invalid-regexp: "error"*/

RegExp('[')

RegExp('.', 'z')

new RegExp('\\')
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-invalid-regexp: "error"*/

RegExp('.')

new RegExp

this.RegExp('[')
```

:::

请注意，无论解析器设置如何，此规则都会根据最新的 ECMAScript 规范验证正则表达式。

如果出于任何原因想要允许其他构造函数标志，可以使用 `allowConstructorFlags` 选项指定这些标志。此后，规则将忽略这些标志。

<a id="options"></a>

## 选项

此规则有一个用于例外情况的对象选项：

* `"allowConstructorFlags"` 是一个区分大小写的标志数组

### allowConstructorFlags

使用 `{ "allowConstructorFlags": ["a", "z"] }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint no-invalid-regexp: ["error", { "allowConstructorFlags": ["a", "z"] }]*/

new RegExp('.', 'a')

new RegExp('.', 'az')
```

:::
