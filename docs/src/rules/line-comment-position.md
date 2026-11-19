---
title: line-comment-position
rule_type: layout
---

行注释可以放在代码上方或旁边。此规则帮助团队保持一致的风格。

```js
// above comment
var foo = "bar";  // beside comment
```

<a id="rule-details"></a>
## 规则详情

此规则强制行注释使用一致的位置。块注释不受此规则影响。默认情况下，此规则会忽略以以下单词开头的注释：`eslint`、`jshint`、`jslint`、`istanbul`、`global`、`exported`、`jscs`、`falls through`。

<a id="options"></a>
## 选项

此规则接受一个参数，可以是字符串或对象。字符串设置与 `position` 属性（如下所述）的设置相同。对象选项具有以下属性：

<a id="position"></a>
### 位置

`position` 选项有两个设置：

* `above`（默认值）要求行注释只能放在代码上方的独立行中。
* `beside` 要求行注释只能放在代码行末尾。

<a id="position-above"></a>
#### position：above

`{ "position": "above" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "position": "above" }]*/
// valid comment
1 + 1;
```

:::

`{ "position": "above" }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "position": "above" }]*/
1 + 1; // invalid comment
```

:::

<a id="position-beside"></a>
#### position：beside

`{ "position": "beside" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "position": "beside" }]*/
1 + 1; // valid comment
```

:::

`{ "position": "beside" }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "position": "beside" }]*/
// invalid comment
1 + 1;
```

:::

### ignorePattern

默认情况下，此规则会忽略以以下单词开头的注释：`eslint`、`jshint`、`jslint`、`istanbul`、`global`、`exported`、`jscs`、`falls through`。也可以提供其他正则表达式。

`ignorePattern` 选项的**正确**代码示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma" }]*/
1 + 1; // pragma valid comment
```

:::

`ignorePattern` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma" }]*/
1 + 1; // invalid comment
```

:::

### applyDefaultIgnorePatterns

即使提供了 `ignorePattern`，也会应用默认忽略模式。如果要省略默认模式，请将此选项设为 `false`。

`{ "applyDefaultIgnorePatterns": false }` 选项的**正确**代码示例：

::: correct

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma", "applyDefaultIgnorePatterns": false }]*/
1 + 1; // pragma valid comment
```

:::

`{ "applyDefaultIgnorePatterns": false }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint line-comment-position: ["error", { "ignorePattern": "pragma", "applyDefaultIgnorePatterns": false }]*/
1 + 1; // falls through
```

:::

**已弃用：**对象属性 `applyDefaultPatterns` 已弃用。请改用属性 `applyDefaultIgnorePatterns`。

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你不介意行注释风格不一致，可以关闭此规则。

<a id="compatibility"></a>
## 兼容性

**JSCS**：[validateCommentPosition](https://jscs-dev.github.io/rule/validateCommentPosition)
