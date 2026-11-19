---
title: no-return-await
rule_type: suggestion
further_reading:
- https://v8.dev/blog/fast-async
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://jakearchibald.com/2017/await-vs-return-vs-return-await/
---

现在不再建议使用 `no-return-await` 规则，原因如下：

* 对 promise 使用 `return await` 不会产生额外的微任务。
* `return await` 能提供更好的调试堆栈跟踪。

历史背景：刚引入 promise 时，调用 `return await` 会引入一个额外的微任务：一个用于 `await`，另一个用于异步函数的返回值。每个额外的微任务都会延迟结果的计算，因此添加了这条规则，以帮助避免这种性能陷阱。后来，[ECMA-262 更改了](https://github.com/tc39/ecma262/pull/1250) `return await` 的工作方式，使其只会创建一个微任务，这意味着这条规则已不再必要。

<a id="rule-details"></a>

## 规则详情

除了 `try` 代码块中的用法外，这条规则会对所有 `return await` 用法发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-return-await: "error"*/

async function foo() {
    return await bar();
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-return-await: "error"*/

async function foo1() {
    return bar();
}

async function foo2() {
    await bar();
    return;
}

// This is essentially the same as `return await bar();`, but the rule checks only `await` in `return` statements
async function foo3() {
    const x = await bar();
    return x;
}

// In this example the `await` is necessary to be able to catch errors thrown from `bar()`
async function foo4() {
    try {
        return await bar();
    } catch (error) {}
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

不应使用这条规则。没有理由避免使用 `return await`。

---