---
title: require-await
rule_type: suggestion
related_rules:
- require-yield
---


JavaScript 中的异步函数在两个重要方面与其他函数表现不同：

1. 返回值始终是 `Promise`。
2. 可以在异步函数中使用 `await` 运算符。

使用异步函数的主要原因通常是使用 `await` 运算符，例如：

```js
async function fetchData(processDataItem) {
    const response = await fetch(DATA_URL);
    const data = await response.json();

    return data.map(processDataItem);
}
```

不使用 `await` 的异步函数可能并不需要是异步函数，也可能是重构时无意间造成的结果。

注意：此规则会忽略异步生成器函数。这是因为生成器通过 yield 而不是 return 返回值；异步生成器可能会产出另一个异步生成器的所有值，而完全不需要使用 await。

<a id="rule-details"></a>

## 规则详情

此规则会对不包含 `await` 表达式的异步函数发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint require-await: "error"*/

async function foo() {
    doSomething();
}

bar(async () => {
    doSomething();
});
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint require-await: "error"*/

async function foo() {
    await doSomething();
}

bar(async () => {
    await doSomething();
});

function baz() {
    doSomething();
}

bar(() => {
    doSomething();
});

async function resourceManagement() {
    await using resource = getAsyncResource();
    resource.use();
}

// Allow empty functions.
async function noop() {}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

异步函数旨在与 promise 配合使用，因此抛出错误时会调用 promise 的拒绝处理程序（例如 `catch()`）。例如：

```js
async function fail() {
    throw new Error("Failure!");
}

fail().catch(error => {
    console.log(error.message);
});
```

在此例中，`fail()` 函数抛出的错误预期由之后指定的 `catch()` 处理程序捕获。若将 `fail()` 函数转换为同步函数，就需要重构对 `fail()` 的调用，改用 `try-catch` 语句，而不是使用 promise。

如果你在异步函数中抛出错误是出于此目的，则可以考虑禁用此规则。
