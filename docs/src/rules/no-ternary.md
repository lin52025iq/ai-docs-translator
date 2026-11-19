---
title: no-ternary
rule_type: suggestion
related_rules:
- no-nested-ternary
- no-unneeded-ternary
---


三元运算符用于有条件地为变量赋值。有些人认为，使用三元运算符会导致代码难以理解。

```js
const foo = isBar ? baz : qux;
```

<a id="rule-details"></a>

## 规则详情

此规则禁止使用三元运算符。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-ternary: "error"*/

const foo = isBar ? baz : qux;

function quux() {
  return foo ? bar() : baz();
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-ternary: "error"*/

let foo;

if (isBar) {
    foo = baz;
} else {
    foo = qux;
}

function quux() {
    if (foo) {
        return bar();
    } else {
        return baz();
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
