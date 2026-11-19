---
title: prefer-numeric-literals
rule_type: suggestion
---



`parseInt()` 和 `Number.parseInt()` 函数可用于将二进制、八进制和十六进制字符串转换为整数。由于 ES6 支持二进制、八进制和十六进制字面量，本规则鼓励使用这些数值字面量，而不是使用 `parseInt()` 或 `Number.parseInt()`。

```js
0b111110111 === 503;
0o767 === 503;
```

<a id="rule-details"></a>

## 规则详情

如果调用 `parseInt()` 或 `Number.parseInt()` 时传入两个参数：一个字符串，以及值为 2（二进制）、8（八进制）或 16（十六进制）的基数选项，则本规则会禁止这种调用。

本规则的错误代码示例如下：

::: incorrect

```js
/*eslint prefer-numeric-literals: "error"*/

parseInt("111110111", 2) === 503;
parseInt(`111110111`, 2) === 503;
parseInt("767", 8) === 503;
parseInt("1F7", 16) === 503;
Number.parseInt("111110111", 2) === 503;
Number.parseInt("767", 8) === 503;
Number.parseInt("1F7", 16) === 503;
```

:::

本规则的正确代码示例如下：

::: correct

```js
/*eslint prefer-numeric-literals: "error"*/

parseInt(1);
parseInt(1, 3);
Number.parseInt(1);
Number.parseInt(1, 3);

0b111110111 === 503;
0o767 === 503;
0x1F7 === 503;

a[parseInt](1,2);

parseInt(foo);
parseInt(foo, 2);
Number.parseInt(foo);
Number.parseInt(foo, 2);
```

:::

<a id="options"></a>

## 选项

本规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你希望允许使用 `parseInt()` 或 `Number.parseInt()` 处理二进制、八进制或十六进制整数，或者你没有使用 ES6（因为 ES5 及更早版本不支持二进制和八进制字面量），可以禁用本规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[requireNumericLiterals](https://jscs-dev.github.io/rule/requireNumericLiterals)

