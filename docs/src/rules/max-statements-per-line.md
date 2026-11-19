---
title: max-statements-per-line
rule_type: layout
related_rules:
- max-depth
- max-len
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
---
一行代码中包含过多语句会难以阅读。人们通常从上到下阅读代码，尤其是在快速浏览时，因此限制单行允许的语句数量有助于提高代码的可读性和可维护性。

```js
function foo () { var bar; if (condition) { bar = 1; } else { bar = 2; } return true; } // too many statements
```

<a id="rule-details"></a>

## 规则详情

此规则强制限制每行允许的语句数量。

<a id="options"></a>

## 选项

### max

"max" 对象属性是可选的（默认值：1）。

此规则在默认选项 `{ "max": 1 }` 下的错误代码示例：

::: incorrect

```js
/*eslint max-statements-per-line: ["error", { "max": 1 }]*/

var bar; var baz;
if (condition) { bar = 1; }
for (var i = 0; i < length; ++i) { bar = 1; }
switch (discriminant) { default: break; }
function foo() { bar = 1; }
var qux = function qux() { bar = 1; };
(function foo() { bar = 1; })();
```

:::

此规则在默认选项 `{ "max": 1 }` 下的正确代码示例：

::: correct

```js
/*eslint max-statements-per-line: ["error", { "max": 1 }]*/

var bar, baz;
if (condition) bar = 1;
for (var i = 0; i < length; ++i);
switch (discriminant) { default: }
function foo() { }
var qux = function qux() { };
(function foo() { })();
```

:::

此规则在选项 `{ "max": 2 }` 下的错误代码示例：

::: incorrect

```js
/*eslint max-statements-per-line: ["error", { "max": 2 }]*/

var bar; var baz; var qux;
if (condition) { bar = 1; } else { baz = 2; }
for (var i = 0; i < length; ++i) { bar = 1; baz = 2; }
switch (discriminant) { case 'test': break; default: break; }
function foo() { bar = 1; baz = 2; }
var qux = function qux() { bar = 1; baz = 2; };
(function foo() { bar = 1; baz = 2; })();
```

:::

此规则在选项 `{ "max": 2 }` 下的正确代码示例：

::: correct

```js
/*eslint max-statements-per-line: ["error", { "max": 2 }]*/

var bar; var baz;
if (condition) bar = 1; if (condition) baz = 2;
for (var i = 0; i < length; ++i) { bar = 1; }
switch (discriminant) { default: break; }
function foo() { bar = 1; }
var qux = function qux() { bar = 1; };
(function foo() { var bar = 1; })();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不在意每行的语句数量，可以关闭此规则。
