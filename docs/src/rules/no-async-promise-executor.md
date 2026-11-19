---
title: no-async-promise-executor
rule_type: problem
---



`new Promise` 构造函数接受一个 *执行器* 函数作为参数，该函数有 `resolve` 和 `reject` 参数，可用于控制所创建 Promise 的状态。例如：

```js
const result = new Promise(function executor(resolve, reject) {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});
```

执行器函数也可以是 `async function`。但这通常是个错误，原因有以下几点：

* 如果异步执行器函数抛出错误，该错误会丢失，也不会导致新构造的 `Promise` 被拒绝。这可能会让某些错误难以调试和处理。
* 如果 Promise 执行器函数使用了 `await`，这通常表明实际上并不需要使用 `new Promise` 构造函数，或者可以缩小 `new Promise` 构造函数的作用范围。

<a id="rule-details"></a>

## 规则详情

此规则旨在禁止使用异步 Promise 执行器函数。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-async-promise-executor: "error"*/

const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = new Promise(async (resolve, reject) => {
  resolve(await foo);
});
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-async-promise-executor: "error"*/

const foo = new Promise((resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = Promise.resolve(foo);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你的代码库不支持 `async function` 语法，就无需启用此规则。