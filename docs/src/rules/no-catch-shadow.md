---
title: no-catch-shadow
rule_type: suggestion
---

在 IE 8 及更早版本中，如果外层作用域中的变量与 catch 子句参数同名，catch 子句参数可能会覆盖该变量的值。

```js
var err = "x";

try {
    throw "problem";
} catch (err) {

}

console.log(err)    // err is 'problem', not 'x'
```

<a id="rule-details"></a>

## 规则详情

此规则旨在防止程序中出现意外行为，这种行为可能由 IE 8 及更早版本中的一个错误引起：catch 子句参数可能会泄漏到外层作用域中。每当此规则遇到与外层作用域中的变量同名的 catch 子句参数时，都会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-catch-shadow: "error"*/

var err = "x";

try {
    throw "problem";
} catch (err) {

}

function error() {
    // ...
};

try {
    throw "problem";
} catch (error) {

}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-catch-shadow: "error"*/

var err = "x";

try {
    throw "problem";
} catch (e) {

}

function error() {
    // ...
};

try {
    throw "problem";
} catch (e) {

}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果无需支持 IE 8 及更早版本，就应关闭此规则。
