---
title: function-call-argument-newline
rule_type: layout
related_rules:
- function-paren-newline
- func-call-spacing
- object-property-newline
- array-element-newline
---
一些风格指南要求或禁止在函数调用的参数之间换行。

<a id="rule-details"></a>

## 规则详情

此规则强制要求在函数调用的参数之间换行。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"always"`（默认值）要求在参数之间换行
* `"never"` 禁止在参数之间换行
* `"consistent"` 要求在参数之间一致地使用换行

<a id="always"></a>

### always

使用默认选项 `"always"` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint function-call-argument-newline: ["error", "always"]*/

foo("one", "two", "three");

bar("one", "two", {
    one: 1,
    two: 2
});

baz("one", "two", (x) => {
    console.log(x);
});
```

:::

使用默认选项 `"always"` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint function-call-argument-newline: ["error", "always"]*/

foo(
    "one",
    "two",
    "three"
);

bar(
    "one",
    "two",
    { one: 1, two: 2 }
);
// or
bar(
    "one",
    "two",
    {
        one: 1,
        two: 2
    }
);

baz(
    "one",
    "two",
    (x) => {
        console.log(x);
    }
);
```

:::

<a id="never"></a>

### never

使用选项 `"never"` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint function-call-argument-newline: ["error", "never"]*/

foo(
    "one",
    "two", "three"
);

bar(
    "one",
    "two", {
        one: 1,
        two: 2
    }
);

baz(
    "one",
    "two", (x) => {
        console.log(x);
    }
);
```

:::

使用选项 `"never"` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint function-call-argument-newline: ["error", "never"]*/

foo("one", "two", "three");
// or
foo(
    "one", "two", "three"
);

bar("one", "two", { one: 1, two: 2 });
// or
bar("one", "two", {
    one: 1,
    two: 2
});

baz("one", "two", (x) => {
    console.log(x);
});
```

:::

<a id="consistent"></a>

### consistent

使用选项 `"consistent"` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint function-call-argument-newline: ["error", "consistent"]*/

foo("one", "two",
    "three");
//or
foo("one",
    "two", "three");

bar("one", "two",
    { one: 1, two: 2}
);

baz("one", "two",
    (x) => { console.log(x); }
);
```

:::

使用选项 `"consistent"` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint function-call-argument-newline: ["error", "consistent"]*/

foo("one", "two", "three");
// or
foo(
    "one",
    "two",
    "three"
);

bar("one", "two", {
    one: 1,
    two: 2
});
// or
bar(
    "one",
    "two",
    { one: 1, two: 2 }
);
// or
bar(
    "one",
    "two",
    {
        one: 1,
        two: 2
    }
);

baz("one", "two", (x) => {
    console.log(x);
});
// or
baz(
    "one",
    "two",
    (x) => {
        console.log(x);
    }
);
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不想强制要求在参数之间换行，就不要启用此规则。
