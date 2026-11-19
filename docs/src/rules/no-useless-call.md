---
title: no-useless-call
rule_type: suggestion
related_rules:
- prefer-spread
---


函数调用可以通过 `Function.prototype.call()` 和 `Function.prototype.apply()` 来实现。
但与普通函数调用相比，`Function.prototype.call()` 和 `Function.prototype.apply()` 的速度更慢。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记可替换为普通函数调用的 `Function.prototype.call()` 和 `Function.prototype.apply()` 用法。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-useless-call: "error"*/

// These are same as `foo(1, 2, 3);`
foo.call(undefined, 1, 2, 3);
foo.apply(undefined, [1, 2, 3]);
foo.call(null, 1, 2, 3);
foo.apply(null, [1, 2, 3]);

// These are same as `obj.foo(1, 2, 3);`
obj.foo.call(obj, 1, 2, 3);
obj.foo.apply(obj, [1, 2, 3]);
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-useless-call: "error"*/

// The `this` binding is different.
foo.call(obj, 1, 2, 3);
foo.apply(obj, [1, 2, 3]);
obj.foo.call(null, 1, 2, 3);
obj.foo.apply(null, [1, 2, 3]);
obj.foo.call(otherObj, 1, 2, 3);
obj.foo.apply(otherObj, [1, 2, 3]);

// The argument list is variadic.
// Those are warned by the `prefer-spread` rule.
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

此规则通过静态比较代码来检查 `thisArg` 是否发生变化。
因此，如果有关 `thisArg` 的代码是动态表达式，此规则就无法正确判断。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-useless-call: "error"*/

a[i++].foo.call(a[i++], 1, 2, 3);
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-useless-call: "error"*/

a[++i].foo.call(a[i], 1, 2, 3);
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不希望收到有关不必要的 `.call()` 和 `.apply()` 的提示，可以放心禁用此规则。
