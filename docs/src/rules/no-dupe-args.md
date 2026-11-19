---
title: no-dupe-args
rule_type: problem
handled_by_typescript: true
---



如果函数定义中有多个参数使用相同的名称，最后一次出现的名称会“遮蔽”前面出现的名称。名称重复可能是输入错误。

<a id="rule-details"></a>

## 规则详情

此规则禁止在函数声明或表达式中使用重复的参数名称。此规则不适用于箭头函数或类方法，因为解析器会报告错误。

如果 ESLint 以严格模式解析代码，解析器（而非此规则）会报告错误。

此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-dupe-args: "error"*/

function foo(a, b, a) {
    console.log("value of the second a:", a);
}

const bar = function (a, b, a) {
    console.log("value of the second a:", a);
};
```

:::

此规则的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-dupe-args: "error"*/

function foo(a, b, c) {
    console.log(a, b, c);
}

const bar = function (a, b, c) {
    console.log(a, b, c);
};
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
