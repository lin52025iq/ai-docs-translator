---
title: sort-vars
rule_type: suggestion
related_rules:
- sort-keys
- sort-imports
---



在同一代码块中声明多个变量时，有些开发者喜欢按字母顺序排列变量名，以便日后更容易找到所需变量。另一些开发者则认为这样会增加复杂性和维护负担。

<a id="rule-details"></a>
## 规则详情

此规则会检查所有变量声明块，并确认其中的变量是否按字母顺序排列。
此规则的默认配置区分大小写。

此规则的错误代码示例：

::: incorrect

```js
/*eslint sort-vars: "error"*/

let b, a;

let c, D, e;

let f, F;
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint sort-vars: "error"*/

let a, b, c, d;

let _a = 10;
let _b = 20;

let E, e;

let G, f, h;
```

:::

字母顺序列表从第一个变量开始维护，并排除任何被视为问题的变量。因此，以下代码会产生两个问题：

```js
/*eslint sort-vars: "error"*/

let c, d, a, b;
```

而下面这段代码只会产生一个问题：

```js
/*eslint sort-vars: "error"*/

let c, d, a, e;
```

<a id="options"></a>
## 选项

此规则接受一个对象选项：

* `"ignoreCase": true`（默认值为 `false`）忽略变量顺序中的大小写区别

### ignoreCase

启用 `{ "ignoreCase": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint sort-vars: ["error", { "ignoreCase": true }]*/

let a, A;

let c, D, e;
```

:::

<a id="when-not-to-use-it"></a>
## 不适用的情形

此规则是一种格式偏好，不遵循它不会对代码质量产生负面影响。如果按字母顺序排列变量不属于你的编码规范，可以禁用此规则。