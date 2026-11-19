---
title: callback-return
rule_type: suggestion
related_rules:
- handle-callback-err
further_reading:
- https://github.com/maxogden/art-of-node#callbacks
- https://web.archive.org/web/20171224042620/https://docs.nodejitsu.com/articles/errors/what-are-the-error-conventions/
---

回调模式是 JavaScript 中大多数 I/O 和事件驱动编程的核心。

```js
function doSomething(err, callback) {
    if (err) {
        return callback(err);
    }
    callback();
}
```

为避免多次调用回调，每当在主函数体之外触发回调时，都应使用 `return`。忽略这一做法往往会导致操作重复执行等问题。例如，在 HTTP 请求中，你可能会尝试多次发送 HTTP 标头，从而导致 Node.js `throw` 出 `Can't render headers after they are sent to the client.` 错误。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保在主函数块之外使用的回调始终属于某个 `return` 语句，或紧邻该语句之前。此规则根据被调用函数的名称来判断哪些函数是回调。

<a id="options"></a>

## 选项

此规则接受一个选项：可能的回调名称数组，其中可以包含对象方法。默认的回调名称为 `callback`、`cb` 和 `next`。

<a id="default-callback-names"></a>

### 默认回调名称

以下示例展示了使用默认选项 `["callback", "cb", "next"]` 时违反此规则的代码：

:::incorrect

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        callback(err);
    }
    callback();
}
```

:::

以下示例展示了使用默认选项 `["callback", "cb", "next"]` 时符合此规则的代码：

:::correct

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        return callback(err);
    }
    callback();
}
```

:::

<a id="supplied-callback-names"></a>

### 指定的回调名称

以下示例展示了使用选项 `["done", "send.error", "send.success"]` 时违反此规则的代码：

:::incorrect

```js
/*eslint callback-return: ["error", ["done", "send.error", "send.success"]]*/

function foo(err, done) {
    if (err) {
        done(err);
    }
    done();
}

function bar(err, send) {
    if (err) {
        send.error(err);
    }
    send.success();
}
```

:::

以下示例展示了使用选项 `["done", "send.error", "send.success"]` 时符合此规则的代码：

:::correct

```js
/*eslint callback-return: ["error", ["done", "send.error", "send.success"]]*/

function foo(err, done) {
    if (err) {
        return done(err);
    }
    done();
}

function bar(err, send) {
    if (err) {
        return send.error(err);
    }
    send.success();
}
```

:::

<a id="known-limitations"></a>

## 已知限制

由于很难通过静态分析理解程序的含义，此规则有以下限制：

* *假阴性*：此规则报告代码正确，但程序实际多次调用了回调（这属于错误行为）。
* *假阳性*：此规则报告代码有误，但程序实际上只调用了一次回调（这属于正确行为）。

<a id="passing-the-callback-by-reference"></a>

### 通过引用传递回调

如果回调是某个函数的参数（例如 `setTimeout`），此规则的静态分析无法检测到程序会调用该回调。

以下示例展示了此规则报告代码正确时出现的*假阴性*：

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        setTimeout(callback, 0); // this is bad, but WILL NOT warn
    }
    callback();
}
```

<a id="triggering-the-callback-within-a-nested-function"></a>

### 在嵌套函数中触发回调

此规则的静态分析无法检测到程序在嵌套函数或立即调用函数表达式（IIFE）中调用回调。

以下示例展示了此规则报告代码正确时出现的*假阴性*：

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        process.nextTick(function() {
            return callback(); // this is bad, but WILL NOT warn
        });
    }
    callback();
}
```

<a id="ifelse-statements"></a>

### If/else 语句

此规则的静态分析无法检测到程序在 `if` 语句的每个分支中都只调用一次回调。

以下示例展示了此规则报告代码有误时出现的*假阳性*：

```js
/*eslint callback-return: "error"*/

function foo(err, callback) {
    if (err) {
        callback(err); // this is fine, but WILL warn
    } else {
        callback();    // this is fine, but WILL warn
    }
}
```

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

在某些情况下，你可能希望多次调用回调函数。这时，此规则可能会导致错误行为。此时，你可以为这类回调指定一个专用名称，并将其排除在触发警告的回调名称列表之外。
