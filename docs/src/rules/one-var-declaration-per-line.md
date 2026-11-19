---
title: one-var-declaration-per-line
rule_type: suggestion
related_rules:
- one-var
---
有些开发者会在同一行声明多个 var 语句：

```js
var foo, bar, baz;
```

另一些开发者则倾向于每行声明一个 var。

```js
var foo,
    bar,
    baz;
```

在项目代码库中统一采用其中一种风格，有助于保持代码一致性。

<a id="rule-details"></a>

## 规则详情

此规则要求变量声明周围的换行保持一致。此规则会忽略 `for` 循环条件中的变量声明。

<a id="options"></a>

## 选项

此规则只有一个字符串选项：

* `"initializations"`（默认值）要求变量初始化周围有换行
* `"always"` 要求变量声明周围有换行

### initializations

使用默认选项 `"initializations"` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint one-var-declaration-per-line: ["error", "initializations"]*/

var a, b, c = 0;

let d,
    e = 0, f;
```

:::

使用默认选项 `"initializations"` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint one-var-declaration-per-line: ["error", "initializations"]*/

var a, b;

let c,
    d;

let e,
    f = 0;
```

:::

### always

使用选项 `"always"` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint one-var-declaration-per-line: ["error", "always"]*/

var a, b;

let c, d = 0;

const e = 0, f = 0;
```

:::

使用选项 `"always"` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint one-var-declaration-per-line: ["error", "always"]*/

var a,
    b;

let c,
    d = 0;
```

:::
