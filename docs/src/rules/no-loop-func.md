---
title: no-loop-func
rule_type: suggestion
---


在循环中编写函数往往会导致错误，这是因为函数会围绕循环创建闭包。例如：

```js
for (var i = 0; i < 10; i++) {
    funcs[i] = function() {
        return i;
    };
}
```

在这种情况下，你可能会认为循环中创建的每个函数都会返回不同的数字。实际上，每个函数都返回 10，因为这是作用域中 `i` 的最后一个值。

`let` 或 `const` 可以缓解这个问题。

```js
for (let i = 0; i < 10; i++) {
    funcs[i] = function() {
        return i;
    };
}
```

在这种情况下，循环中创建的每个函数都会按预期返回不同的数字。

<a id="rule-details"></a>

## 规则详情

此错误用于指出一段可能无法按预期运行的代码，也可能表明你对语言的工作方式存在误解。如果不修复此错误，代码可能仍能正常运行，但在某些情况下会出现意料之外的行为。

此规则禁止在循环内包含不安全引用（例如，引用外部作用域中已修改的变量）的函数。此规则会忽略 IIFE，但不会忽略异步函数或生成器函数。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-loop-func: "error"*/

var i = 0;
while(i < 5) {
    var a = function() { return i; };
    a();

    i++;
}

var i = 0;
do {
    function a() { return i; };
    a();

    i++
} while (i < 5);

let foo = 0;
for (let i = 0; i < 10; ++i) {
    //Bad, `foo` is not in the loop-block's scope and `foo` is modified in/after the loop
    setTimeout(() => console.log(foo));
    foo += 1;
}

for (let i = 0; i < 10; ++i) {
    //Bad, `foo` is not in the loop-block's scope and `foo` is modified in/after the loop
    setTimeout(() => console.log(foo));
}
foo = 100;

var arr = [];

for (var i = 0; i < 5; i++) {
    arr.push((f => f)(() => i));
}

for (var i = 0; i < 5; i++) {
    arr.push((() => {
        return () => i;
    })());
}

for (var i = 0; i < 5; i++) {
    (function fun () {
        if (arr.includes(fun)) return i;
        else arr.push(fun);
    })();
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-loop-func: "error"*/

var a = function() {};

for (var i=10; i; i--) {
    a();
}

for (var i=10; i; i--) {
    var a = function() {}; // OK, no references to variables in the outer scopes.
    a();
}

for (let i=10; i; i--) {
    var a = function() { return i; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (const i of foo) {
    var a = function() { return i; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (using i of foo) {
    var a = function() { return i; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (var i=10; i; i--) {
    const foo = getsomething(i);
    var a = function() { return foo; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (var i=10; i; i--) {
    using foo = getsomething(i);
    var a = function() { return foo; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

for (var i=10; i; i--) {
    await using foo = getsomething(i);
    var a = function() { return foo; }; // OK, all references are referring to block scoped variables in the loop.
    a();
}

var foo = 100;
for (let i=10; i; i--) {
    var a = function() { return foo; }; // OK, all references are referring to never modified variables.
    a();
}
//... no modifications of foo after this loop ...

var arr = [];

for (var i=10; i; i--) {
    (function() { return i; })();
}

for (var i = 0; i < 5; i++) {
    arr.push((f => f)((() => i)()));
}

for (var i = 0; i < 5; i++) {
    arr.push((() => {
        return (() => i)();
    })());
}
```

:::

此规则还支持 TypeScript 类型语法。

此规则的正确 TypeScript 代码示例：

::: correct

```ts
/*eslint no-loop-func: "error"*/

type MyType = 1;
let someArray: MyType[] = [];
for (let i = 0; i < 10; i += 1) {
	someArray = someArray.filter((item: MyType) => !!item);
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

此规则无法判断函数实例是否会立即调用后丢弃，还是可能会被存储以供后续使用。

```js
const foo = [1, 2, 3, 4];
var i = 0;

while(foo.some(e => e > i)){
    i += 1;
}
```

这里，`some` 方法会立即对数组中的每个元素执行回调函数，然后丢弃该函数实例。该函数不会在循环迭代的作用域之外存储或重复使用。因此，这段代码会按预期运行。

在这种情况下，可以使用 `eslint-disable` 注释。
