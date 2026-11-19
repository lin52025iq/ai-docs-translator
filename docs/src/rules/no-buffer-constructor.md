---
title: no-buffer-constructor
rule_type: problem
further_reading:
- https://nodejs.org/api/buffer.html
- https://github.com/ChALkeR/notes/blob/master/Lets-fix-Buffer-API.md
- https://github.com/nodejs/node/issues/4660
---

在 Node.js 中，`Buffer` 构造函数的行为会因参数类型不同而异。未经类型验证就将用户输入传递给 `Buffer()`，可能导致远程内存泄露和拒绝服务等安全漏洞。因此，`Buffer` 构造函数已被弃用，不应再使用。请改用创建方法 `Buffer.from`、`Buffer.alloc` 和 `Buffer.allocUnsafe`。

<a id="rule-details"></a>

## 规则详情

此规则禁止调用或构造 `Buffer()` 构造函数。

此规则的错误代码示例：

::: incorrect

```js
/* eslint no-buffer-constructor: error */

new Buffer(5);
new Buffer([1, 2, 3]);

Buffer(5);
Buffer([1, 2, 3]);

new Buffer(res.body.amount);
new Buffer(res.body.values);
```

:::

此规则的正确代码示例：

::: correct

```js
/* eslint no-buffer-constructor: error */

Buffer.alloc(5);
Buffer.allocUnsafe(5);
Buffer.from([1, 2, 3]);

Buffer.alloc(res.body.amount);
Buffer.from(res.body.values);
```

:::

<a id="when-not-to-use-it"></a>

## 不适用的情况

如果你不使用 Node.js，或者仍需支持不具备 `Buffer.from` 等方法的 Node.js 版本，则不应启用此规则。
