---
title: no-mixed-operators
rule_type: suggestion
related_rules:
- no-extra-parens
---
用括号括起复杂表达式，可以明确开发者的意图，使代码更易读。
当表达式中连续使用不同运算符且没有用括号括起来时，此规则会发出警告。

```js
var foo = a && b || c || d;    /*BAD: Unexpected mix of '&&' and '||'.*/
var foo = (a && b) || c || d;  /*GOOD*/
var foo = a && (b || c || d);  /*GOOD*/
```

**注意：**
此规则预期对每一对混用的运算符各报告一个错误。因此，对于每两个连续使用的混合运算符，都会显示一个单独的错误，并指出违反规则的特定运算符所在位置：

```js
var foo = a && b || c || d;
```

将生成：

```shell
1:13  Unexpected mix of '&&' and '||'. (no-mixed-operators)
1:18  Unexpected mix of '&&' and '||'. (no-mixed-operators)
```

<a id="rule-details"></a>

## 规则详情

此规则检查 `BinaryExpression`、`LogicalExpression` 和 `ConditionalExpression`。

此规则可能与 [no-extra-parens](no-extra-parens) 规则冲突。
如果同时使用此规则和 [no-extra-parens](no-extra-parens) 规则，则需要使用 [no-extra-parens](no-extra-parens) 规则的 `nestedBinaryExpressions` 选项。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-mixed-operators: "error"*/

var foo = a && b < 0 || c > 0 || d + 1 === 0;
var foo = a + b * c;
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-mixed-operators: "error"*/

var foo = a || b || c;
var foo = a && b && c;
var foo = (a && b < 0) || c > 0 || d + 1 === 0;
var foo = a && (b < 0 || c > 0 || d + 1 === 0);
var foo = a + (b * c);
var foo = (a + b) * c;
```

:::

<a id="options"></a>

## 选项

```json
{
    "no-mixed-operators": [
        "error",
        {
            "groups": [
                ["+", "-", "*", "/", "%", "**"],
                ["&", "|", "^", "~", "<<", ">>", ">>>"],
                ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                ["&&", "||"],
                ["in", "instanceof"]
            ],
            "allowSamePrecedence": true
        }
    ]
}
```

此规则有 2 个选项。

* `groups` (`string[][]`) - 指定要检查的运算符组。`groups` 选项是一个组列表，每个组是一个二元运算符列表。默认运算符组包括算术、位运算、比较、逻辑和关系运算符。注意：三元运算符(?:)可以属于任意组，且默认允许与其他运算符混用。

* `allowSamePrecedence` (`boolean`) - 指定是否允许混用优先级相同的运算符。默认值为 `true`。

<a id="groups"></a>

### 分组

以下运算符可用于 `groups` 选项：

* 算术运算符：`"+"`、`"-"`、`"*"`、`"/"`、`"%"`、`"**"`
* 位运算符：`"&"`、`"|"`、`"^"`、`"~"`、`"<<"`、`">>"`、`">>>"`
* 比较运算符：`"=="`、`"!="`、`"==="`、`"!=="`、`">"`、`">="`、`"<"`、`"<="`
* 逻辑运算符：`"&&"`、`"||"`
* 空值合并运算符：`"??"`
* 关系运算符：`"in"`、`"instanceof"`
* 三元运算符：`?:`

现在，考虑以下分组配置：`{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}`。
此配置指定了 2 个组：位运算符和逻辑运算符。
此规则仅检查运算符是否属于同一组。
在这种情况下，此规则会检查位运算符和逻辑运算符是否混用，而忽略所有其他运算符。

使用 `{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}]*/

var foo = a && b < 0 || c > 0 || d + 1 === 0;
var foo = a & b | c;
```

:::

::: incorrect

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&&", "||", "?:"]]}]*/

var foo = a || b ? c : d;

var bar = a ? b || c : d;

var baz = a ? b : c || d;
```

:::

使用 `{"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]]}]*/

var foo = a || b > 0 || c + 1 === 0;
var foo = a && b > 0 && c + 1 === 0;
var foo = (a && b < 0) || c > 0 || d + 1 === 0;
var foo = a && (b < 0 ||  c > 0 || d + 1 === 0);
var foo = (a & b) | c;
var foo = a & (b | c);
var foo = a + b * c;
var foo = a + (b * c);
var foo = (a + b) * c;
```

:::

::: correct

```js
/*eslint no-mixed-operators: ["error", {"groups": [["&&", "||", "?:"]]}]*/

var foo = (a || b) ? c : d;
var foo = a || (b ? c : d);

var bar = a ? (b || c) : d;

var baz = a ? b : (c || d);
var baz = (a ? b : c) || d;
```

:::

<a id="allowsameprecedence"></a>

### 允许相同优先级

使用 `{"allowSamePrecedence": true}` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-mixed-operators: ["error", {"allowSamePrecedence": true}]*/

// + and - have the same precedence.
var foo = a + b - c;
```

:::

使用 `{"allowSamePrecedence": false}` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-mixed-operators: ["error", {"allowSamePrecedence": false}]*/

// + and - have the same precedence.
var foo = a + b - c;
```

:::

使用 `{"allowSamePrecedence": false}` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-mixed-operators: ["error", {"allowSamePrecedence": false}]*/

// + and - have the same precedence.
var foo = (a + b) - c;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果不希望收到有关混用运算符的通知，可以放心地禁用此规则。
