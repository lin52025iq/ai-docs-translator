---
title: handle-callback-err
rule_type: suggestion
further_reading:
- https://github.com/maxogden/art-of-node#callbacks
- https://web.archive.org/web/20171224042620/https://docs.nodejitsu.com/articles/errors/what-are-the-error-conventions/
---

在 Node.js 中，处理异步行为的一种常见模式称为回调模式。
此模式要求将 `Error` 对象或 `null` 作为回调的第一个参数。
忘记处理这些错误可能会导致应用程序出现一些非常奇怪的行为。

```js
function loadData (err, data) {
    doSomething(); // forgot to handle error
}
```

<a id="rule-details"></a>

## 规则详情

此规则要求：在 Node.js 中使用回调模式时，应处理错误。

<a id="options"></a>

## 选项

此规则接受一个字符串选项：错误参数的名称。默认值为 `"err"`。

以下是此规则在默认参数名 `"err"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint handle-callback-err: "error"*/

function loadData (err, data) {
    doSomething();
}

```

:::

以下是此规则在默认参数名 `"err"` 下的**正确**代码示例：

::: correct

```js
/*eslint handle-callback-err: "error"*/

function loadData (err, data) {
    if (err) {
        console.log(err.stack);
    }
    doSomething();
}

function generateError (err) {
    if (err) {}
}
```

:::

以下是使用示例参数名 `"error"` 时的**正确**代码示例：

::: correct

```js
/*eslint handle-callback-err: ["error", "error"]*/

function loadData (error, data) {
    if (error) {
        console.log(error.stack);
    }
    doSomething();
}
```

:::

<a id="regular-expression"></a>

### 正则表达式

有时（尤其是在大型项目中），项目中错误变量的名称并不一致，因此需要更灵活的配置，以确保此规则报告所有未处理的错误。

如果配置的错误变量名称以 `^` 开头，则会将其视为正则表达式模式。

* 如果选项为 `"^(err|error|anySpecificError)$"`，此规则会报告参数名为 `err`、`error` 或 `anySpecificError` 的未处理错误。
* 如果选项为 `"^.+Error$"`，此规则会报告参数名以 `Error` 结尾的未处理错误（例如，`connectionError` 或 `validationError` 都会匹配）。
* 如果选项为 `"^.*(e|E)rr"`，此规则会报告参数名中包含 `err` 或 `Err` 的未处理错误（例如，`err`、`error`、`anyError`、`some_err` 都会匹配）。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

在某些情况下，应用程序忽略错误可能是安全的；不过，只有在确信其他形式的监控能够帮助你发现问题时，才应忽略错误。
