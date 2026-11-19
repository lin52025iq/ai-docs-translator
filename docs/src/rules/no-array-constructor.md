---
title: no-array-constructor
rule_type: suggestion
related_rules:
- no-new-wrappers
- no-object-constructor
---


通常不建议使用 `Array` 构造函数创建新数组，而应使用数组字面量表示法，因为它存在单参数陷阱，而且 `Array` 全局对象可能会被重新定义。例外情况是：为有意创建指定大小的稀疏数组，可以向 `Array` 构造函数传入单个数值参数。

<a id="rule-details"></a>

## 规则详情

此规则禁止使用 `Array` 构造函数。

此规则的错误代码示例：

:::incorrect

```js
/*eslint no-array-constructor: "error"*/

Array();

Array(0, 1, 2);

new Array(0, 1, 2);

Array(...args);
```

:::

此规则的正确代码示例：

:::correct

```js
/*eslint no-array-constructor: "error"*/

Array(500);

new Array(someOtherArray.length);

[0, 1, 2];

const createArray = Array => new Array();
```

:::

此规则还支持 TypeScript 类型语法。

正确代码示例：

:::correct

```ts
/*eslint no-array-constructor: "error"*/

new Array<number>(1, 2, 3);

new Array<Foo>();

Array<number>(1, 2, 3);

Array<Foo>();

Array?.foo();
```

:::

错误代码示例：

:::incorrect

```ts
/*eslint no-array-constructor: "error"*/

new Array();

new Array(0, 1, 2);

Array?.(x, y);

Array?.(0, 1, 2);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 不使用此规则的情形

此规则针对的是几乎普遍存在的风格问题。不过，如果你更喜欢使用构造函数风格，也可以禁用此规则。
