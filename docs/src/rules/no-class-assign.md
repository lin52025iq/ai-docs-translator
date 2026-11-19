---
title: no-class-assign
rule_type: problem
handled_by_typescript: true
---



`ClassDeclaration` 会创建一个变量，而我们可以修改该变量。

```js
class A { }
A = 0;
```

但在大多数情况下，这种修改都是错误的。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记对类声明变量的修改。

此规则下的错误代码示例：

::: incorrect

```js
/*eslint no-class-assign: "error"*/

class A { }
A = 0;
```

:::

::: incorrect

```js
/*eslint no-class-assign: "error"*/

A = 0;
class A { }
```

:::

::: incorrect

```js
/*eslint no-class-assign: "error"*/

class A {
    b() {
        A = 0;
    }
}
```

:::

::: incorrect

```js
/*eslint no-class-assign: "error"*/

let A = class A {
    b() {
        A = 0;
        // `let A` is shadowed by the class name.
    }
}
```

:::

此规则下的正确代码示例：

::: correct

```js
/*eslint no-class-assign: "error"*/

let A = class A { }
A = 0; // A is a variable.
```

:::

::: correct

```js
/*eslint no-class-assign: "error"*/

let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```

:::

::: correct

```js
/*eslint no-class-assign: 2*/

class A {
    b(A) {
        A = 0; // A is a parameter.
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不希望收到关于修改类声明变量的提示，可以安全地禁用此规则。
