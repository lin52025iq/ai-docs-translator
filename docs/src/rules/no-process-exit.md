---
title: no-process-exit
rule_type: suggestion
---

在 Node.js 中，`process.exit()` 方法用于立即停止 Node.js 进程并退出。这是一项危险操作，因为它可能在任何时间、任何方法中发生，导致 Node.js 应用程序在发生错误时完全停止。例如：

```js
if (somethingBadHappened) {
    console.error("Something bad happened!");
    process.exit(1);
}
```

这段代码可能出现在任何模块中；当 `somethingBadHappened` 为真值时，它会停止整个应用程序。这样一来，应用程序就没有机会处理错误。通常，更好的做法是抛出错误，让应用程序妥善处理：

```js
if (somethingBadHappened) {
    throw new Error("Something bad happened!");
}
```

通过这种方式抛出错误，应用程序的其他部分就有机会处理错误，而不是直接停止整个应用程序。如果错误一路冒泡到进程且未得到处理，进程就会退出，并返回非零退出码，因此最终结果相同。

如果使用 `process.exit()` 只是为了指定退出码，可以改为设置 [`process.exitCode`](https://nodejs.org/api/process.html#process_process_exitcode)（在 Node.js 0.11.8 中引入）。

<a id="rule-details"></a>

## 规则详情

此规则旨在禁止在 Node.js JavaScript 中使用 `process.exit()`。因此，只要在代码中发现 `process.exit()`，就会发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-process-exit: "error"*/

process.exit(1);
process.exit(0);
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-process-exit: "error"*/

Process.exit();
var exit = process.exit;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

Node.js 应用程序中可能有一部分负责确定退出时应返回的正确退出码。在这种情况下，应关闭此规则，以便正确处理退出码。
