---
title: prefer-promise-reject-errors
rule_type: suggestion
related_rules:
- no-throw-literal
further_reading:
- https://github.com/petkaantonov/bluebird/blob/master/docs/docs/warning-explanations.md#warning-a-promise-was-rejected-with-a-non-error
---


对于 Promise 中用户自定义的错误，最好只将内置 `Error` 对象的实例传递给 `reject()` 函数。`Error` 对象会自动保存堆栈跟踪，可用于通过确定错误来源来调试错误。如果 Promise 因非 `Error` 值而被拒绝，就很难确定拒绝发生的位置。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保 Promise 仅因 `Error` 对象而被拒绝。

<a id="options"></a>

## 选项

此规则接受一个可选的对象参数：

* `allowEmptyReject: true`（默认值为 `false`）允许调用不带参数的 `Promise.reject()`。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-promise-reject-errors: "error"*/

Promise.reject("something bad happened");

Promise.reject(5);

Promise.reject();

new Promise(function(resolve, reject) {
  reject("something bad happened");
});

new Promise(function(resolve, reject) {
  reject();
});

```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint prefer-promise-reject-errors: "error"*/

Promise.reject(new Error("something bad happened"));

Promise.reject(new TypeError("something bad happened"));

new Promise(function(resolve, reject) {
  reject(new Error("something bad happened"));
});

const foo = getUnknownValue();
Promise.reject(foo);
```

:::

启用 `allowEmptyReject: true` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}]*/

Promise.reject();

new Promise(function(resolve, reject) {
  reject();
});
```

:::

<a id="known-limitations"></a>

## 已知限制

由于静态分析能力有限，此规则无法保证你只使用 `Error` 对象拒绝 Promise。此规则会报告能够确定拒绝原因显然不是 `Error` 的情况，但对于无法确定给定原因是否为 `Error` 的情况则不会报告。有关此限制的更多信息，请参阅 `no-throw-literal` 规则中的[类似限制](no-throw-literal#known-limitations)。

为避免规则之间发生冲突，此规则不会报告 async 函数中 `throw` 语句使用的非错误值，即使这些值会导致 Promise 被拒绝。若要对这些情况进行代码检查，请使用 [`no-throw-literal`](no-throw-literal) 规则。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你使用自定义的非错误值作为 Promise 的拒绝原因，可以关闭此规则。
