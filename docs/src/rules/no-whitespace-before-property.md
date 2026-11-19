---
title: no-whitespace-before-property
rule_type: layout
---
JavaScript 允许对象与其属性之间存在空白。不过，空白使用不一致会降低代码的可读性，也可能导致错误。

```js
foo. bar .baz . quz
```

<a id="rule-details"></a>

## 规则详情

如果对象及其属性位于同一行，此规则会禁止点号周围或属性前左方括号之前出现空白。如果对象与属性位于不同行，则允许使用空白，因为较长的属性链通常会通过换行来提高可读性：

```js
foo
  .bar()
  .baz()
  .qux()
```

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint no-whitespace-before-property: "error"*/

foo [bar]

foo. bar

foo .bar

foo. bar. baz

foo. bar()
  .baz()

foo
  .bar(). baz()
```

:::

此规则下的**正确**代码示例：

::: correct

```js
/*eslint no-whitespace-before-property: "error"*/

foo.bar

foo[bar]

foo[ bar ]

foo.bar.baz

foo
  .bar().baz()

foo
  .bar()
  .baz()

foo.
  bar().
  baz()
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不介意对象及其属性位于同一行时，点号周围或属性前左方括号之前存在空白，则可以关闭此规则。
