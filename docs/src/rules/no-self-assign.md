---
title: no-self-assign
rule_type: problem
---



自我赋值不会产生任何效果，因此很可能是重构未完成导致的错误。这些赋值表明仍有工作尚未完成。

```js
foo = foo;
[bar, baz] = [bar, qiz];
```

<a id="rule-details"></a>

## 规则详情

此规则旨在消除自我赋值。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-self-assign: "error"*/

foo = foo;

[a, b] = [a, b];

[a, ...b] = [x, ...b];

({a, b} = {a, x});

foo &&= foo;
foo ||= foo;
foo ??= foo;
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-self-assign: "error"*/

foo = bar;
[a, b] = [b, a];

// This pattern is warned by the `no-use-before-define` rule.
let foo = foo;

// The default values have an effect.
[foo = 1] = [foo];

// non-self-assignments with properties.
obj.a = obj.b;
obj.a.b = obj.c.b;
obj.a.b = obj.a.c;
obj[a] = obj["a"];

// This ignores if there is a function call.
obj.a().b = obj.a().b;
a().b = a().b;

// `&=` and `|=` have an effect on non-integers.
foo &= foo;
foo |= foo;

// Known limitation: this does not support computed properties except single literal or single identifier.
obj[a + b] = obj[a + b];
obj["a" + "b"] = obj["a" + "b"];
```

:::

<a id="options"></a>

## 选项

此规则还可以选择检查属性。

```json
{
    "no-self-assign": ["error", {"props": true}]
}
```

* `props` - 如果此值为 `true`，`no-self-assign` 规则会对属性的自我赋值发出警告。默认值为 `true`。

### props

使用 `{ "props": false }` 选项时的正确代码示例：

::: correct

```js
/*eslint no-self-assign: ["error", {"props": false}]*/

// self-assignments with properties.
obj.a = obj.a;
obj.a.b = obj.a.b;
obj["a"] = obj["a"];
obj[a] = obj[a];
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不希望收到有关自我赋值的提示，可以放心地禁用此规则。
