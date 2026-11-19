---
title: no-multi-assign
rule_type: suggestion
---


链接多个变量的赋值可能会导致意外结果，而且难以阅读。

```js
(function() {
    const foo = bar = 0; // Did you mean `foo = bar == 0`?
    bar = 1;             // This will not fail since `bar` is not constant.
})();
console.log(bar);        // This will output 1 since `bar` is not scoped.
```

<a id="rule-details"></a>
## 规则详情

此规则禁止在单条语句中进行多次赋值。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-multi-assign: "error"*/

let a = b = c = 5;

const foo = bar = "baz";

let d =
    e =
    c;

class Foo {
    a = b = 10;
}

a = b = "quux";
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-multi-assign: "error"*/

let a = 5;
let b = 5;
const c = 5;

const foo = "baz";
const bar = "baz";

let d = c;
let e = c;

class Foo {
    a = 10;
    b = 10;
}

a = "quux";
b = "quux";
```

:::

<a id="options"></a>
## 选项

此规则有一个对象选项：

* `"ignoreNonDeclaration"`：设为 `true` 时，此规则允许不包含在声明中初始化变量或初始化类字段的赋值链。默认值为 `false`。

### ignoreNonDeclaration

`{ "ignoreNonDeclaration": true }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-multi-assign: ["error", { "ignoreNonDeclaration": true }]*/

let a;
let b;
a = b = "baz";

const x = {};
const y = {};
x.one = y.one = 1;
```

:::

`{ "ignoreNonDeclaration": true }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-multi-assign: ["error", { "ignoreNonDeclaration": true }]*/

let a = b = "baz";

const foo = bar = 1;

class Foo {
    a = b = 10;
}
```

:::
