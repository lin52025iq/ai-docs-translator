---
title: no-empty-static-block
layout: doc
rule_type: suggestion
related_rules:
- no-empty
- no-empty-function
further_reading:
- https://github.com/tc39/proposal-class-static-block
---

空的静态块虽然并非技术上的错误，但通常是由于重构未完成造成的。阅读代码时，它们可能会引起困惑。

<a id="rule-details"></a>

## 规则详情

此规则禁止空的静态块。此规则会忽略包含注释的静态块。

此规则的**错误**示例：

::: incorrect

```js
/*eslint no-empty-static-block: "error"*/

class Foo {
    static {}
}
```

:::

此规则的**正确**示例：

:::correct

```js
/*eslint no-empty-static-block: "error"*/

class Foo {
    static {
        bar();
    }
}

class Bar {
    static {
        // comment
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

在 ES2022 之前的环境中，不应使用此规则。
