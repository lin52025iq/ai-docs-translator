---
title: operator-assignment
rule_type: suggestion
---



JavaScript 提供了简写运算符，可将变量赋值与一些简单的数学运算合并。例如，`x = x + 4` 可以简写为 `x += 4`。支持的简写形式如下：

```text
 Shorthand | Separate
-----------|------------
 x += y    | x = x + y
 x -= y    | x = x - y
 x *= y    | x = x * y
 x /= y    | x = x / y
 x %= y    | x = x % y
 x **= y   | x = x ** y
 x <<= y   | x = x << y
 x >>= y   | x = x >> y
 x >>>= y  | x = x >>> y
 x &= y    | x = x & y
 x ^= y    | x = x ^ y
 x |= y    | x = x | y
```

<a id="rule-details"></a>
## 规则详情

此规则要求在可能的情况下使用赋值运算符简写，或禁止使用此类简写。

此规则适用于上表列出的运算符。它不会报告逻辑赋值运算符 `&&=`、`||=` 和 `??=`，因为这些运算符的短路行为与其他赋值运算符不同。

<a id="options"></a>
## 选项

此规则只有一个字符串选项：

* `"always"`（默认值）要求在可能的情况下使用赋值运算符简写
* `"never"` 禁止使用赋值运算符简写

<a id="always"></a>
### 始终

使用默认选项 `"always"` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint operator-assignment: ["error", "always"]*/

x = x + y;
x = y * x;
x[0] = x[0] / y;
x.y = x.y << z;
```

:::

使用默认选项 `"always"` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint operator-assignment: ["error", "always"]*/

x = y;
x += y;
x = y * z;
x = (x * y) * z;
x[0] /= y;
x[foo()] = x[foo()] % 2;
x = y + x; // `+` is not always commutative (e.g. x = "abc")
```

:::

<a id="never"></a>
### 从不

使用选项 `"never"` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint operator-assignment: ["error", "never"]*/

x *= y;
x ^= (y + z) / foo();
```

:::

使用选项 `"never"` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint operator-assignment: ["error", "never"]*/

x = x + y;
x.y = x.y / a.b;
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用此规则

是否使用赋值运算符简写是一种风格选择。关闭此规则后，开发者可以根据具体情况选择自己认为更易读的写法。
