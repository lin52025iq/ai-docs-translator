---
title: no-bitwise
rule_type: suggestion
---


在 JavaScript 中很少使用按位运算符，而且 `&` 或 `|` 往往只是误写成了 `&&` 或 `||`，从而导致意外行为。

```js
const x = y | z;
```

<a id="rule-details"></a>

## 规则详情

此规则禁止使用按位运算符。

此规则的**不正确**代码示例：

::: incorrect

```js
/*eslint no-bitwise: "error"*/

let x = y | z;

const x1 = y & z;

const x2 = y ^ z;

const x3 = ~ z;

const x4 = y << z;

const x5 = y >> z;

const x6 = y >>> z;

x |= y;

x &= y;

x ^= y;

x <<= y;

x >>= y;

x >>>= y;
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-bitwise: "error"*/

let x = y || z;

const x1 = y && z;

const x2 = y > z;

const x3 = y < z;

x += y;
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"allow"`：允许将一组按位运算符作为例外使用。
* `"int32Hint"`：允许在 `|0` 模式中使用按位或进行类型转换。

### allow

使用 `{ "allow": ["~"] }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint no-bitwise: ["error", { "allow": ["~"] }] */

~[1,2,3].indexOf(1) === -1;
```

:::

### int32Hint

使用 `{ "int32Hint": true }` 选项时的**正确**代码示例：

::: correct

```js
/*eslint no-bitwise: ["error", { "int32Hint": true }] */

const b = a|0;
```

:::
