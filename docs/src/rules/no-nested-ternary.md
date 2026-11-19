---
title: no-nested-ternary
rule_type: suggestion
related_rules:
- no-ternary
- no-unneeded-ternary
---


嵌套三元表达式会让代码更难理解。

```js
const foo = bar ? baz : qux === quxx ? bing : bam;
```

<a id="rule-details"></a>

## 规则详情

`no-nested-ternary` 规则禁止使用嵌套三元表达式。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-nested-ternary: "error"*/

const thing = foo ? bar : baz === qux ? quxx : foobar;

foo ? baz === qux ? quxx() : foobar() : bar();
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-nested-ternary: "error"*/

const thing = foo ? bar : foobar;

let otherThing;

if (foo) {
  otherThing = bar;
} else if (baz === qux) {
  otherThing = quxx;
} else {
  otherThing = foobar;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
