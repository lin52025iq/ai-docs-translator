---
title: prefer-spread
rule_type: suggestion
related_rules:
- no-useless-call
---


在 ES2015 之前，必须使用 `Function.prototype.apply()` 调用可变参数函数。

```js
const args = [1, 2, 3, 4];
Math.max.apply(Math, args);
```

在 ES2015 中，可以使用展开语法调用可变参数函数。

```js
const args = [1, 2, 3, 4];
Math.max(...args);
```

<a id="rule-details"></a>

## 规则详情

此规则旨在标记可以使用展开语法代替 `Function.prototype.apply()` 的情况。

此规则的错误代码示例：

::: incorrect

```js
/*eslint prefer-spread: "error"*/

foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint prefer-spread: "error"*/

// Using spread syntax
foo(...args);
obj.foo(...args);

// The `this` binding is different.
foo.apply(obj, args);
obj.foo.apply(null, args);
obj.foo.apply(otherObj, args);

// The argument list is not variadic.
// Those are warned by the `no-useless-call` rule.
foo.apply(undefined, [1, 2, 3]);
foo.apply(null, [1, 2, 3]);
obj.foo.apply(obj, [1, 2, 3]);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

此规则通过静态分析代码来检查 `this` 参数是否发生变化。因此，如果 `this` 参数是在动态表达式中计算的，此规则无法检测到违规情况。

```js
/*eslint prefer-spread: "error"*/

// This warns.
a[i++].foo.apply(a[i++], args);

// This does not warn.
a[++i].foo.apply(a[i], args);
```

<a id="when-not-to-use-it"></a>

## 何时不应使用

不应在 ES3/5 环境中使用此规则。

在 ES2015 (ES6) 或更高版本中，如果你不希望收到关于调用 `Function.prototype.apply()` 的提示，可以安全地禁用此规则。