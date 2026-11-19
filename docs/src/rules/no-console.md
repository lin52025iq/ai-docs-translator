---
title: no-console
rule_type: suggestion
related_rules:
- no-alert
- no-debugger
---


在设计为于浏览器中运行的 JavaScript 中，最佳实践是避免使用 `console` 的方法。这类消息被视为用于调试，因此不适合随代码发送给客户端。通常，在将代码部署到生产环境之前，应移除对 `console` 的调用。

```js
console.log("Made it here.");
console.error("That shouldn't have happened.");
```

<a id="rule-details"></a>

## 规则详情

此规则禁止调用或赋值给 `console` 对象的方法。

此规则的错误示例：

::: incorrect

```js
/* eslint no-console: "error" */

console.log("Log a debug level message.");
console.warn("Log a warn level message.");
console.error("Log an error level message.");
console.log = foo();
```

:::

此规则的正确示例：

::: correct

```js
/* eslint no-console: "error" */

// custom console
Console.log("Hello world!");
```

:::

<a id="options"></a>

## 选项

此规则提供一个对象选项，用于指定例外：

* `"allow"` 是一个字符串数组，列出 `console` 对象中允许使用的方法

以下示例使用 `{ "allow": ["warn", "error"] }` 选项，展示了此规则的其他正确代码：

::: correct

```js
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

console.warn("Log a warn level message.");
console.error("Log an error level message.");
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

不过，如果你使用 Node.js，`console` 用于向用户输出信息，因此不完全是用于调试。如果你是为 Node.js 开发，通常不需要启用此规则。

另一种可能不适用此规则的情况是：你想强制要求调用 `console`，但不限制覆盖 `console`。例如：

```js
/* eslint no-console: ["error", { allow: ["warn"] }] */
console.error = function (message) {
  throw new Error(message);
};
```

在上面的示例中，`no-console` 规则会使 ESLint 报错。对于上述示例，你可以禁用此规则：

```js
// eslint-disable-next-line no-console
console.error = function (message) {
  throw new Error(message);
};

// or

console.error = function (message) {  // eslint-disable-line no-console
  throw new Error(message);
};
```

不过，你可能不想手动添加 `eslint-disable-next-line` 或 `eslint-disable-line`。你可以通过 `no-restricted-syntax` 规则实现仅在调用 console 时收到错误的效果：

```json
{
    "rules": {
        "no-console": "off",
        "no-restricted-syntax": [
            "error",
            {
                "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
                "message": "Unexpected property on console object was called"
            }
        ]
    }
}
```
