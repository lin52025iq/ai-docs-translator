---
title: array-callback-return
rule_type: problem
---


`Array` 有多种用于筛选、映射和归约的方法。
如果我们忘记在这些方法的回调中编写 `return` 语句，很可能是个错误。如果你不想使用 return，或者不需要返回结果，可以考虑改用 [.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)。

```js
// example: convert ['a', 'b', 'c'] --> {a: 0, b: 1, c: 2}
const indexMap = myArray.reduce(function(memo, item, index) {
  memo[item] = index;
}, {}); // Error: cannot set property 'b' of undefined
```

<a id="rule-details"></a>

## 规则详情

此规则要求在数组方法的回调中使用 `return` 语句。此外，还可以通过 `checkForEach` 选项要求 `forEach` 数组方法的回调**不**返回值。

此规则会查找以下方法的回调函数，并检查其中 `return` 语句的使用情况。

* [`Array.from`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.from)
* [`Array.fromAsync`](https://tc39.es/ecma262/#sec-array.fromasync)
* [`Array.prototype.every`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.every)
* [`Array.prototype.filter`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.filter)
* [`Array.prototype.find`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.find)
* [`Array.prototype.findIndex`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.findindex)
* [`Array.prototype.findLast`](https://www.ecma-international.org/ecma-262/14.0/#sec-array.prototype.findlast)
* [`Array.prototype.findLastIndex`](https://www.ecma-international.org/ecma-262/14.0/#sec-array.prototype.findlastindex)
* [`Array.prototype.flatMap`](https://www.ecma-international.org/ecma-262/10.0/#sec-array.prototype.flatmap)
* [`Array.prototype.forEach`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.foreach)（可选，取决于 `checkForEach` 参数）
* [`Array.prototype.map`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.map)
* [`Array.prototype.reduce`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.reduce)
* [`Array.prototype.reduceRight`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.reduceright)
* [`Array.prototype.some`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.some)
* [`Array.prototype.sort`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort)
* [`Array.prototype.toSorted`](https://www.ecma-international.org/ecma-262/14.0/#sec-array.prototype.tosorted)
* 如果适用，也包括类型化数组上的上述方法。

此规则的**错误**代码示例：

:::incorrect

```js
/*eslint array-callback-return: "error"*/

const indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
}, {});

const foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
        return true;
    }
});

const bar = foo.filter(function(x) {
    if (x) {
        return true;
    } else {
        return;
    }
});
```

:::

此规则的**正确**代码示例：

:::correct

```js
/*eslint array-callback-return: "error"*/

const indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
    return memo;
}, {});

const foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
        return true;
    }
    return false;
});

const bar = foo.map(node => node.getAttribute("id"));
```

:::

<a id="options"></a>

## 选项

此规则接受一个包含三个选项的配置对象：

* `"allowImplicit": false`（默认值）设为 `true` 时，允许要求返回值的方法的回调使用不含表达式的 `return` 语句，隐式返回 `undefined`。
* `"checkForEach": false`（默认值）设为 `true` 时，规则还会报告返回值的 `forEach` 回调。
* `"allowVoid": false`（默认值）设为 `true` 时，允许在 `forEach` 回调中使用 `void`，因此规则不会报告带有 `void` 运算符的返回值。

**注意：**`{ "allowVoid": true }` 仅在设置了 `checkForEach` 选项时生效。

### allowImplicit

`{ "allowImplicit": true }` 选项的**正确**代码示例：

:::correct

```js
/*eslint array-callback-return: ["error", { allowImplicit: true }]*/
const undefAllTheThings = myArray.map(function(item) {
    return;
});
```

:::

### checkForEach

`{ "checkForEach": true }` 选项的**错误**代码示例：

:::incorrect

```js
/*eslint array-callback-return: ["error", { checkForEach: true }]*/

myArray.forEach(function(item) {
    return handleItem(item);
});

myArray.forEach(function(item) {
    if (item < 0) {
        return x;
    }
    handleItem(item);
});

myArray.forEach(function(item) {
    if (item < 0) {
        return void x;
    }
    handleItem(item);
});

myArray.forEach(item => handleItem(item));

myArray.forEach(item => void handleItem(item));

myArray.forEach(item => {
    return handleItem(item);
});

myArray.forEach(item => {
    return void handleItem(item);
});
```

:::

`{ "checkForEach": true }` 选项的**正确**代码示例：

:::correct

```js
/*eslint array-callback-return: ["error", { checkForEach: true }]*/

myArray.forEach(function(item) {
    handleItem(item)
});

myArray.forEach(function(item) {
    if (item < 0) {
        return;
    }
    handleItem(item);
});

myArray.forEach(function(item) {
    handleItem(item);
    return;
});

myArray.forEach(item => {
    handleItem(item);
});
```

:::

### allowVoid

`{ "allowVoid": true }` 选项的**正确**代码示例：

:::correct

```js
/*eslint array-callback-return: ["error", { checkForEach: true, allowVoid: true }]*/

myArray.forEach(item => void handleItem(item));

myArray.forEach(item => {
    return void handleItem(item);
});

myArray.forEach(item => {
    if (item < 0) {
        return void x;
    }
    handleItem(item);
});
```

:::

<a id="known-limitations"></a>

## 已知限制

此规则会检查名称与给定名称相同的方法的回调函数，*即使*拥有该方法的对象*并非*数组。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不希望对数组方法回调中使用 `return` 语句发出警告，可以放心禁用此规则。
