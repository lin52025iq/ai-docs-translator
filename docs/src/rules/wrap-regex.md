---
title: wrap-regex
rule_type: layout
---
在某些情况下使用正则表达式时，它看起来可能像除法运算符。例如：

```js
function a() {
    return /foo/.test("bar");
}
```

<a id="rule-details"></a>

## 规则详情

此规则用于区分斜杠运算符，并使代码更易读。

此规则下**错误**代码示例：

::: incorrect

```js
/*eslint wrap-regex: "error"*/

function a() {
    return /foo/.test("bar");
}
```

:::

此规则下**正确**代码示例：

::: correct

```js
/*eslint wrap-regex: "error"*/

function a() {
    return (/foo/).test("bar");
}
```

:::
