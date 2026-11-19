---
title: no-global-assign
rule_type: suggestion
related_rules:
- no-extend-native
- no-redeclare
- no-shadow
---



JavaScript 环境包含许多内置全局变量，例如浏览器中的 `window` 和 Node.js 中的 `process`。几乎在所有情况下，你都不应该给这些全局变量赋值，因为这样可能会导致无法再访问重要功能。例如，你可能不希望在浏览器代码中这样做：

```js
window = {};
```

像 `window` 这样的示例显而易见，但 JavaScript 环境通常提供数百个内置全局对象。你可能很难判断自己赋值的是否为全局变量。

<a id="rule-details"></a>
## 规则详情

此规则禁止修改只读全局变量。

ESLint 可以将全局变量配置为只读。

另请参阅：[指定全局变量](../use/configure/language-options#specify-globals)

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-global-assign: "error"*/

Object = null
undefined = 1
```

:::

::: incorrect

```js
/*eslint no-global-assign: "error"*/
/*global window:readonly*/

window = {}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-global-assign: "error"*/

a = 1
let b = 1
b = 2
```

:::

::: correct

```js
/*eslint no-global-assign: "error"*/
/*global onload:writable*/

onload = function() {}
```

:::

<a id="options"></a>
## 选项

此规则接受一个 `exceptions` 选项，可用于指定允许重新赋值的内置对象列表：

```json
{
    "rules": {
        "no-global-assign": ["error", {"exceptions": ["Object"]}]
    }
}
```

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你想要覆盖某个原生对象，则不应使用此规则。
