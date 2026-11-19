---
title: no-prototype-builtins
rule_type: problem
---



在 ECMAScript 5.1 中新增了 `Object.create`，它可以创建具有指定 `[[Prototype]]` 的对象。`Object.create(null)` 是一种常见模式，用于创建将作为 Map 使用的对象。如果代码假定对象具有来自 `Object.prototype` 的属性，就可能导致错误。本规则禁止直接在对象上调用某些 `Object.prototype` 方法。

此外，对象可以包含遮蔽 `Object.prototype` 上内置方法的属性，这可能导致意外行为或拒绝服务安全漏洞。例如，如果 Web 服务器解析客户端传入的 JSON，并直接在解析后的对象上调用 `hasOwnProperty`，就会有安全风险，因为恶意客户端可以发送类似 `{"hasOwnProperty": 1}` 的 JSON 值，从而导致服务器崩溃。

为避免此类隐蔽的 bug，最好始终从 `Object.prototype` 调用这些方法。例如，应将 `foo.hasOwnProperty("bar")` 替换为 `Object.prototype.hasOwnProperty.call(foo, "bar")`。

<a id="rule-details"></a>

## 规则详情

本规则禁止直接在对象实例上调用某些 `Object.prototype` 方法。

本规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-prototype-builtins: "error"*/

const hasBarProperty = foo.hasOwnProperty("bar");

const isPrototypeOfBar = foo.isPrototypeOf(bar);

const barIsEnumerable = foo.propertyIsEnumerable("bar");
```

:::

本规则的**正确**代码示例：

::: correct

```js
/*eslint no-prototype-builtins: "error"*/

const hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

const isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);

const barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
```

:::

<a id="options"></a>

## 选项

本规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你的代码只访问具有硬编码键的对象，并且绝不会使用遮蔽 `Object.prototype` 方法或不继承自 `Object.prototype` 的对象，则可以关闭本规则。
