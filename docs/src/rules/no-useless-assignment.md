---
title: no-useless-assignment
rule_type: suggestion
related_rules:
- no-unused-vars
further_reading:
- https://en.wikipedia.org/wiki/Dead_store
- https://rules.sonarsource.com/javascript/RSPEC-1854/
- https://cwe.mitre.org/data/definitions/563.html
- https://wiki.sei.cmu.edu/confluence/display/c/MSC13-C.+Detect+and+remove+unused+values
- https://wiki.sei.cmu.edu/confluence/display/java/MSC56-J.+Detect+and+remove+superfluous+code+and+values
---


[维基百科对“无用存储”（dead store）的描述](https://en.wikipedia.org/wiki/Dead_store)如下：

> 在计算机编程中，如果一个局部变量被赋值后，后续指令都没有读取该值，则称其为**无用存储**。

“无用存储”会浪费处理资源和内存，因此最好删除对变量不必要的赋值。

此外，如果作者原本打算使用该变量，那么无用存储附近很可能存在错误。
例如：

* 应该使用已存储的值，却忘了使用。
* 要赋值的变量名称写错了。

```js
let id = "x1234";    // this is a "dead store" - this value ("x1234") is never read

id = generateId();

doSomethingWith(id);
```

<a id="rule-details"></a>

## 规则详情

此规则旨在报告未使用所赋值的变量赋值操作。

此规则的错误代码示例：

::: incorrect

```js
/* eslint no-useless-assignment: "error" */

function fn1() {
    let v = 'used';
    doSomething(v);
    v = 'unused';
}

function fn2() {
    let v = 'used';
    if (condition) {
        v = 'unused';
        return
    }
    doSomething(v);
}

function fn3() {
    let v = 'used';
    if (condition) {
        doSomething(v);
    } else {
        v = 'unused';
    }
}

function fn4() {
    let v = 'unused';
    if (condition) {
        v = 'used';
        doSomething(v);
        return
    }
}

function fn5() {
    let v = 'used';
    if (condition) {
        let v = 'used';
        console.log(v);
        v = 'unused';
    }
    console.log(v);
}
```

:::

此规则的正确代码示例：

::: correct

```js
/* eslint no-useless-assignment: "error" */

function fn1() {
    let v = 'used';
    doSomething(v);
    v = 'used-2';
    doSomething(v);
}

function fn2() {
    let v = 'used';
    if (condition) {
        v = 'used-2';
        doSomething(v);
        return
    }
    doSomething(v);
}

function fn3() {
    let v = 'used';
    if (condition) {
        doSomething(v);
    } else {
        v = 'used-2';
        doSomething(v);
    }
}

function fn4() {
    let v = 'used';
    for (let i = 0; i < 10; i++) {
        doSomething(v);
        v = 'used in next iteration';
    }
}
```

:::

此规则不会报告从未读取过的变量，因为它们显然是未使用的变量。如果希望报告这类变量，请启用 [no-unused-vars](./no-unused-vars) 规则。

::: correct

```js
/* eslint no-useless-assignment: "error" */

function fn() {
    let v = 'unused';
    v = 'unused-2'
    doSomething();
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

如果某些变量重新赋值操作发生在 `try` 代码块中，此规则不会报告。这是有意为之，因为由于可能提前退出或存在错误处理逻辑，这些赋值仍可能在相应的 `catch` 代码块中或 `try-catch` 结构之后被观察到。

```js
function foo() {
    let bar;
    try {
        bar = 2;
        unsafeFn();
        return { error: undefined };
    } catch {
        return { bar }; // `bar` is observed in the catch block
    }
}   
function unsafeFn() {
    throw new Error();
}

function foo() {
    let bar;
    try {
        bar = 2; // This assignment is relevant if unsafeFn() throws an error
        unsafeFn();
        bar = 4;
    } catch {
        // Error handling
    }
    return bar;
}   
function unsafeFn() {
    throw new Error();
}
```

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果不希望收到有关从未读取的值的提示，可以放心禁用此规则。
