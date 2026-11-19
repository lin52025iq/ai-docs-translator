---
title: prefer-object-spread
rule_type: suggestion
---



当以对象字面量作为第一个参数调用 `Object.assign` 时，此规则要求改用对象展开语法。此规则还会对仅传入一个对象字面量参数的 `Object.assign` 调用发出警告，因为这种情况下不需要调用 `Object.assign`。

对象展开语法于 ES2018 引入，是一种声明式替代方案，相较于更加动态、命令式的 `Object.assign`，它的性能可能更好。

<a id="rule-details"></a>

## 规则详情

此规则的错误代码示例：

::: incorrect

```js
/*eslint prefer-object-spread: "error"*/

Object.assign({}, foo);

Object.assign({}, {foo: 'bar'});

Object.assign({ foo: 'bar'}, baz);

Object.assign({}, baz, { foo: 'bar' });

Object.assign({}, { ...baz });

// Object.assign with a single argument that is an object literal
Object.assign({});

Object.assign({ foo: bar });
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint prefer-object-spread: "error"*/

({ ...foo });

({ ...baz, foo: 'bar' });

// Any Object.assign call without an object literal as the first argument
Object.assign(foo, { bar: baz });

Object.assign(foo, bar);

Object.assign(foo, { bar, baz });

Object.assign(foo, { ...baz });
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

除非代码库支持 ES2018，否则不应使用此规则。
