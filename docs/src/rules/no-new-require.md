---
title: no-new-require
rule_type: suggestion
---

`require` 函数用于引入位于独立文件中的模块，例如：

```js
var appHeader = require('app-header');
```

有些模块会返回一个构造函数，这可能导致出现如下代码：

```js
var appHeader = new require('app-header');
```

遗憾的是，这种写法很容易造成混淆，因为代码作者很可能原本想写的是：

```js
var appHeader = new (require('app-header'));
```

因此，通常最好禁止这种表达式。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除 `new require` 表达式的使用。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-new-require: "error"*/

var appHeader = new require('app-header');
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-new-require: "error"*/

var AppHeader = require('app-header');
var appHeader = new AppHeader();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你使用的是自定义的 `require` 实现，并且代码绝不会用于预期使用标准 `require`（CommonJS、Node.js、AMD）的项目中，则可以放心关闭此规则。
