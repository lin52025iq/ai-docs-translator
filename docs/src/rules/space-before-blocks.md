---
title: space-before-blocks
rule_type: layout
related_rules:
- keyword-spacing
- arrow-spacing
- switch-colon-spacing
- block-spacing
- brace-style
---
一致性是任何风格指南的重要组成部分。
虽然代码块左花括号的位置属于个人偏好，
但整个项目中应保持一致。
风格不一致会分散读者的注意力，使其无法关注代码的重要部分。

<a id="rule-details"></a>

## 规则详情

此规则用于确保代码块前空格的一致性。它仅适用于未在新行开始的代码块。

* 此规则忽略 `=>` 与代码块之间的空格。这类空格由 `arrow-spacing` 规则处理。
* 此规则忽略关键字与代码块之间的空格。这类空格由 `keyword-spacing` 规则处理。
* 此规则忽略 switch case 中 `:` 与代码块之间的空格。这类空格由 `switch-colon-spacing` 规则处理。

<a id="options"></a>

## 选项

此规则接受一个参数。如果设为 `"always"`，则代码块前必须至少有一个空格。如果设为 `"never"`，则代码块前不得有空格。如果希望函数代码块、关键字代码块和类使用不同的空格规则，可以将可选配置对象作为规则参数，分别配置这些情况。如果配置对象中的任何值为 `"off"`，则不会对相应类型的代码块强制执行这两种风格中的任何一种。

( 例如：`{ "functions": "never", "keywords": "always", "classes": "always" }` )

默认值为 `"always"`。

### "always"

使用 "always" 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-before-blocks: "error"*/

if (a){
    b();
}

function a(){}

for (;;){
    b();
}

try {} catch(a){}

class Foo{
  constructor(){}
}
```

:::

使用 `"always"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint space-before-blocks: "error"*/

if (a) {
    b();
}

if (a) {
    b();
} else{ /*no error. this is checked by `keyword-spacing` rule.*/
    c();
}

class C {
    static{} /*no error. this is checked by `keyword-spacing` rule.*/
}

function a() {}

for (;;) {
    b();
}

try {} catch(a) {}
```

:::

### "never"

使用 `"never"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-before-blocks: ["error", "never"]*/

if (a) {
    b();
}

function a() {}

for (;;) {
    b();
}

try {} catch(a) {}
```

:::

使用 `"never"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint space-before-blocks: ["error", "never"]*/

if (a){
    b();
}

function a(){}

for (;;){
    b();
}

try{} catch(a){}

class Foo{
  constructor(){}
}
```

:::

配置为 `{ "functions": "never", "keywords": "always", "classes": "never" }` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "always", "classes": "never" }]*/

function a() {}

try {} catch(a){}

class Foo{
  constructor() {}
}
```

:::

配置为 `{ "functions": "never", "keywords": "always", "classes": "never" }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "always", "classes": "never" }]*/

for (;;) {
  // ...
}

describe(function(){
  // ...
});

class Foo{
  constructor(){}
}
```

:::

配置为 `{ "functions": "always", "keywords": "never", "classes": "never" }` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-before-blocks: ["error", { "functions": "always", "keywords": "never", "classes": "never" }]*/

function a(){}

try {} catch(a) {}

class Foo {
  constructor(){}
}
```

:::

配置为 `{ "functions": "always", "keywords": "never", "classes": "never" }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint space-before-blocks: ["error", { "functions": "always", "keywords": "never", "classes": "never" }]*/

if (a){
  b();
}

var a = function() {}

class Foo{
  constructor() {}
}
```

:::

配置为 `{ "functions": "never", "keywords": "never", "classes": "always" }` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "never", "classes": "always" }]*/

class Foo{
  constructor(){}
}
```

:::

配置为 `{ "functions": "never", "keywords": "never", "classes": "always" }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint space-before-blocks: ["error", { "functions": "never", "keywords": "never", "classes": "always" }]*/

class Foo {
  constructor(){}
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不关心代码块前空格的一致性，可以关闭此规则。
