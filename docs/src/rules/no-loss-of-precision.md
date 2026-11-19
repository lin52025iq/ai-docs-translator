---
title: no-loss-of-precision
rule_type: problem
---



此规则禁止使用在运行时转换为 JS `Number` 时，由于 64 位浮点数舍入而丢失精度的数字字面量。

<a id="rule-details"></a>
## 规则详情

在 JS 中，`Number` 根据 [IEEE 754 标准](https://en.wikipedia.org/wiki/IEEE_754)以双精度浮点数的形式存储。因此，数字只能在一定的位数范围内保持准确。如果程序员输入了更多位数，这些多出的位数在转换为 `Number` 类型时就会丢失，从而导致意外行为。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-loss-of-precision: "error"*/

const a = 9007199254740993
const b = 5123000000000000000000000000001
const c = 1230000000000000000000000.0
const d = .1230000000000000000000000
const e = 0X20000000000001
const f = 0X2_000000000_0001;
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-loss-of-precision: "error"*/

const a = 12345
const b = 123.456
const c = 123e34
const d = 12300000000000000000000000
const e = 0x1FFFFFFFFFFFFF
const f = 9007199254740991
const g = 9007_1992547409_91
```

:::

<a id="options"></a>
## 选项

此规则没有选项。
