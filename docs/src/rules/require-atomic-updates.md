---
title: require-atomic-updates
rule_type: problem
---


编写异步代码时，可能会产生难以察觉的竞态条件错误。请看下面的示例：

```js
let totalLength = 0;

async function addLengthOfSinglePage(pageNum) {
  totalLength += await getPageLength(pageNum);
}

Promise.all([addLengthOfSinglePage(1), addLengthOfSinglePage(2)]).then(() => {
  console.log('The combined length of both pages is', totalLength);
});
```

这段代码看起来会把调用 `getPageLength(1)` 和 `getPageLength(2)` 得到的结果相加，但实际上，`totalLength` 的最终值只会是其中一页的长度。问题出在语句 `totalLength += await getPageLength(pageNum);`。这条语句会先读取 `totalLength` 的初始值，然后调用 `getPageLength(pageNum)` 并等待该 Promise 完成。最后，它会将 `totalLength` 的值设为 `await getPageLength(pageNum)` 与 `totalLength` *初始值*之和。如果在 `getPageLength(pageNum)` 的 Promise 尚未完成期间，`totalLength` 变量在另一次函数调用中被更新，那么由于新值未被读取就被覆盖，这次更新会丢失。

解决此问题的一种方法是，确保在更新 `totalLength` 的同时读取它，如下所示：

```js
async function addLengthOfSinglePage(pageNum) {
  const lengthOfThisPage = await getPageLength(pageNum);

  totalLength += lengthOfThisPage;
}
```

另一种解决方法是完全避免使用可变变量引用：

```js
Promise.all([getPageLength(1), getPageLength(2)]).then(pageLengths => {
  const totalLength = pageLengths.reduce((accumulator, length) => accumulator + length, 0);

  console.log('The combined length of both pages is', totalLength);
});
```

<a id="rule-details"></a>

## 规则详情

此规则旨在报告那些可能基于过时值进行的变量或属性赋值。

<a id="variables"></a>

### 变量

当此规则在生成器函数或异步函数中检测到以下执行流程时，会报告对变量的赋值：

1. 读取变量。
2. `yield` 或 `await` 暂停函数。
3. 函数恢复执行后，将一个值赋给第 1 步中的变量。

第 3 步中的赋值会被报告，因为它可能无法正确求值：第 1 步读取的变量值可能在第 2 步和第 3 步之间发生变化。具体而言，如果其他执行上下文可以访问该变量（例如，它不是局部变量，因此其他函数可以修改它），那么在函数于第 2 步暂停期间，该变量的值可能已在其他地方发生变化。

请注意，在以下任一情况下，此规则都不会报告第 3 步中的赋值：

* 如果在第 2 步和第 3 步之间再次读取该变量。
* 如果函数暂停期间无法访问该变量（例如，它是局部变量）。

此规则的错误代码示例：

::: incorrect

```js
/* eslint require-atomic-updates: error */

let result;

async function foo() {
    result += await something;
}

async function bar() {
    result = result + await something;
}

async function baz() {
    result = result + doSomething(await somethingElse);
}

async function qux() {
    if (!result) {
        result = await initialize();
    }
}

function* generator() {
    result += yield;
}
```

:::

此规则的正确代码示例：

::: correct

```js
/* eslint require-atomic-updates: error */

let result;

async function foobar() {
    result = await something + result;
}

async function baz() {
    const tmp = doSomething(await somethingElse);
    result += tmp;
}

async function qux() {
    if (!result) {
        const tmp = await initialize();
        if (!result) {
            result = tmp;
        }
    }
}

async function quux() {
    let localVariable = 0;
    localVariable += await something;
}

function* generator() {
    result = (yield) + result;
}
```

:::

<a id="properties"></a>

### 属性

当此规则在生成器函数或异步函数中检测到以下执行流程时，会报告通过变量对属性进行的赋值：

1. 读取变量或对象属性。
2. `yield` 或 `await` 暂停函数。
3. 函数恢复执行后，将一个值赋给某个属性。

这与变量的处理逻辑相似，但更严格，因为第 3 步中的属性不必与第 1 步中的属性相同。此规则假定该流程取决于对象的整体状态。

此规则的错误代码示例：

::: incorrect

```js
/* eslint require-atomic-updates: error */

async function foo(obj) {
    if (!obj.done) {
        obj.something = await getSomething();
    }
}
```

:::

此规则的正确代码示例：

::: correct

```js
/* eslint require-atomic-updates: error */

async function foo(obj) {
    if (!obj.done) {
        const tmp = await getSomething();
        if (!obj.done) {
            obj.something = tmp;
        }
    }
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"allowProperties"`：设为 `true` 时，此规则不会报告对属性的赋值。默认值为 `false`。

### allowProperties

启用 `{ "allowProperties": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/* eslint require-atomic-updates: ["error", { "allowProperties": true }] */

async function foo(obj) {
    if (!obj.done) {
        obj.something = await getSomething();
    }
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不使用异步函数或生成器函数，就不需要启用此规则。

</translated_document>