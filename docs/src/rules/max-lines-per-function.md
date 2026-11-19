---
title: max-lines-per-function
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-lines
- max-nested-callbacks
- max-params
- max-statements
---


有些人认为大型函数是一种代码异味。大型函数往往承担很多职责，可能让人难以理解代码的运行逻辑。许多编码风格指南都规定了函数行数上限。本规则可帮助强制执行这一风格要求。

<a id="rule-details"></a>

## 规则详情

本规则限制每个函数的最大行数，以提高可维护性并降低复杂度。

<a id="why-not-use-max-statements-or-other-complexity-measurement-rules-instead"></a>

### 为什么不使用 `max-statements` 或其他复杂度度量规则？

如下例所示，嵌套的长方法链通常会拆分到多行，以提高可读性：

```js
function() {
    return m("div", [
        m("table", {className: "table table-striped latest-data"}, [
            m("tbody",
                data.map(function(db) {
                    return m("tr", {key: db.dbname}, [
                        m("td", {className: "dbname"}, db.dbname),
                        m("td", {className: "query-count"},  [
                            m("span", {className: db.lastSample.countClassName}, db.lastSample.nbQueries)
                        ])
                    ])
                })
            )
        ])
    ])
}
```

* `max-statements` 只会将其报告为 1 条语句，尽管代码有 16 行。
* `complexity` 只会报告复杂度为 1
* `max-nested-callbacks` 只会报告 1
* `max-depth` 会报告深度为 0

<a id="options"></a>

## 选项

本规则有以下可通过对象指定的选项：

* `"max"`（默认值为 `50`）规定函数的最大行数。

* `"skipBlankLines"`（默认值为 `false`）忽略仅由空白字符组成的行。

* `"skipComments"`（默认值为 `false`）忽略仅包含注释的行。

* `"IIFEs"`（默认值为 `false`）将 IIFE 中的代码也纳入统计。

也可以为 `max` 选项指定单个整数：

```json
"max-lines-per-function": ["error", 20]
```

等同于

```json
"max-lines-per-function": ["error", { "max": 20 }]
```

<a id="code"></a>

### 代码

以下是指定最大行数时违反本规则的代码示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", 2]*/
function foo() {
    const x = 0;
}
```

:::

::: incorrect

```js
/*eslint max-lines-per-function: ["error", 3]*/
function foo() {
    // a comment
    const x = 0;
}
```

:::

::: incorrect

```js
/*eslint max-lines-per-function: ["error", 4]*/
function foo() {
    // a comment followed by a blank line

    const x = 0;
}
```

:::

以下是指定最大行数时符合本规则的代码示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", 3]*/
function foo() {
    const x = 0;
}
```

:::

::: correct

```js
/*eslint max-lines-per-function: ["error", 4]*/
function foo() {
    // a comment
    const x = 0;
}
```

:::

::: correct

```js
/*eslint max-lines-per-function: ["error", 5]*/
function foo() {
    // a comment followed by a blank line

    const x = 0;
}
```

:::

<a id="skipblanklines"></a>

### 忽略空行

以下是使用 `{ "skipBlankLines": true }` 选项时违反本规则的代码示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", {"max": 2, "skipBlankLines": true}]*/
function foo() {

    const x = 0;
}
```

:::

以下是使用 `{ "skipBlankLines": true }` 选项时符合本规则的代码示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", {"max": 3, "skipBlankLines": true}]*/
function foo() {

    const x = 0;
}
```

:::

<a id="skipcomments"></a>

### 忽略注释

以下是使用 `{ "skipComments": true }` 选项时违反本规则的代码示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", {"max": 2, "skipComments": true}]*/
function foo() {
    // a comment
    const x = 0;
}
```

:::

以下是使用 `{ "skipComments": true }` 选项时符合本规则的代码示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", {"max": 3, "skipComments": true}]*/
function foo() {
    // a comment
    const x = 0;
}
```

:::

<a id="iifes"></a>

### 立即调用的函数表达式（IIFE）

以下是使用 `{ "IIFEs": true }` 选项时违反本规则的代码示例：

::: incorrect

```js
/*eslint max-lines-per-function: ["error", {"max": 2, "IIFEs": true}]*/
(function(){
    const x = 0;
}());

(() => {
    const x = 0;
})();
```

:::

以下是使用 `{ "IIFEs": true }` 选项时符合本规则的代码示例：

::: correct

```js
/*eslint max-lines-per-function: ["error", {"max": 3, "IIFEs": true}]*/
(function(){
    const x = 0;
}());

(() => {
    const x = 0;
})();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不关心函数的行数，可以关闭本规则。
