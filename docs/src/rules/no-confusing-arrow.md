---
title: no-confusing-arrow
rule_type: suggestion
related_rules:
- no-constant-condition
- arrow-parens
---
箭头函数（`=>`）的语法与某些比较运算符（`>`、`<`、`<=` 和 `>=`）相似。本规则会对在可能与比较运算符混淆的地方使用箭头函数语法的情况发出警告。

下面的示例中，`=>` 的用法可能会造成混淆：

```js
// The intent is not clear
var x = a => 1 ? 2 : 3;
// Did the author mean this
var x = function (a) {
    return 1 ? 2 : 3;
};
// Or this
var x = a <= 1 ? 2 : 3;
```

<a id="rule-details"></a>

## 规则详情

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-confusing-arrow: "error"*/

var x = a => 1 ? 2 : 3;
var x = (a) => 1 ? 2 : 3;
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-confusing-arrow: "error"*/

var x = a => (1 ? 2 : 3);
var x = (a) => (1 ? 2 : 3);
var x = (a) => {
    return 1 ? 2 : 3;
};
var x = a => { return 1 ? 2 : 3; };
```

:::

<a id="options"></a>

## 选项

本规则接受两个选项参数，默认值如下：

```json
{
    "rules": {
        "no-confusing-arrow": [
            "error",
            { "allowParens": true, "onlyOneSimpleParam": false }
        ]
    }
}
```

`allowParens` 是一个布尔设置，可以为 `true`（默认值）或 `false`：

1. `true` 会放宽规则，接受圆括号作为有效的“防止混淆”语法。
2. `false` 即使表达式被圆括号括起来，也会发出警告。

使用 `{"allowParens": false}` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-confusing-arrow: ["error", {"allowParens": false}]*/

var x = a => (1 ? 2 : 3);
var x = (a) => (1 ? 2 : 3);
```

:::

`onlyOneSimpleParam` 是一个布尔设置，可以为 `true` 或 `false`（默认值）：

1. `true` 会放宽规则：如果箭头函数没有参数、参数多于一个，或参数不是标识符，则不会报告错误。
2. `false` 无论参数如何，都会发出警告。

使用 `{"onlyOneSimpleParam": true}` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint no-confusing-arrow: ["error", {"onlyOneSimpleParam": true}]*/

() => 1 ? 2 : 3;
(a, b) => 1 ? 2 : 3;
(a = b) => 1 ? 2 : 3;
({ a }) => 1 ? 2 : 3;
([a]) => 1 ? 2 : 3;
(...a) => 1 ? 2 : 3;
```

:::