---
title: no-undef
rule_type: problem
handled_by_typescript: true
related_rules:
- no-global-assign
- no-redeclare
---



此规则可帮助你定位潜在的 ReferenceError，这些错误可能由变量名或参数名拼写错误，或意外创建隐式全局变量（例如在 `for` 循环初始化语句中忘记使用 `var` 关键字）导致。

<a id="rule-details"></a>

## 规则详情

除非在 `/*global ...*/` 注释中明确提及变量，或在[配置文件的 `globals` 键](../use/configure/language-options#specify-globals)中指定变量，否则任何对未声明变量的引用都会触发警告。常见的使用场景是，你有意使用在其他地方定义的全局变量（例如，在从 HTML 加载的脚本中定义的全局变量）。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-undef: "error"*/

const foo = someFunction();
const bar = a + 1;
```

:::

使用 `global` 声明时，此规则的**正确**代码示例：

::: correct

```js
/*global someFunction, a*/
/*eslint no-undef: "error"*/

const foo = someFunction();
const bar = a + 1;
```

:::

请注意，此规则不会禁止对只读全局变量赋值。
如果你还想禁止此类赋值，请参阅 [no-global-assign](no-global-assign)。

此规则也不会禁止重新声明全局变量。
如果你还想禁止此类重复声明，请参阅 [no-redeclare](no-redeclare)。

<a id="options"></a>

## 选项

* 将 `typeof` 设置为 true 后，会对在 typeof 检查中使用的变量发出警告（默认值为 false）。

### typeof

默认选项 `{ "typeof": false }` 的**正确**代码示例：

::: correct

```js
/*eslint no-undef: "error"*/

if (typeof UndefinedIdentifier === "undefined") {
    // do something ...
}
```

:::

如果你想禁止对未声明的变量进行 `typeof` 检查，可以使用此选项。

选项为 `{ "typeof": true }` 时的**错误**代码示例：

::: incorrect

```js
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```

:::

选项为 `{ "typeof": true }` 且使用 `global` 声明时的**正确**代码示例：

::: correct

```js
/*global a*/
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不喜欢显式声明全局变量。

<a id="compatibility"></a>

## 兼容性

此规则与 [JSHint](https://jshint.com/) 和 [JSLint](https://www.jslint.com) 对全局变量的处理方式兼容。
