---
title: operator-linebreak
rule_type: layout
related_rules:
- comma-style
---
当语句过长，无法放在同一行时，通常会在分隔表达式的运算符旁插入换行符。首先想到的风格可能是将运算符放在行末，遵循英语标点规则。

```js
var fullHeight = borderTop +
                 innerHeight +
                 borderBottom;
```

有些开发者认为，将运算符放在行首能让代码更易读。

```js
var fullHeight = borderTop
               + innerHeight
               + borderBottom;
```

<a id="rule-details"></a>

## 规则详情

此规则用于强制运算符采用一致的换行风格。

<a id="options"></a>

## 选项

此规则有两个选项：字符串选项和对象选项。

字符串选项：

* `"after"` 要求在运算符后换行
* `"before"` 要求在运算符前换行
* `"none"` 禁止在运算符任一侧换行

对象选项：

* `"overrides"` 为指定运算符覆盖全局设置

默认配置为 `"after", { "overrides": { "?": "before", ":": "before" } }`

### after

使用 `"after"` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "after"]*/

foo = 1
+
2;

foo = 1
    + 2;

foo
    = 5;

if (someCondition
    || otherCondition) {
}

answer = everything
  ? 42
  : foo;

class Foo {
    a
        = 1;
    [b]
        = 2;
    [c
    ]
        = 3;
}
```

:::

使用 `"after"` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after"]*/

foo = 1 + 2;

foo = 1 +
      2;

foo =
    5;

if (someCondition ||
    otherCondition) {
}

answer = everything ?
  42 :
  foo;

class Foo {
    a =
        1;
    [b] =
        2;
    [c
    ] =
        3;
    d = 4;
}
```

:::

### before

使用 `"before"` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "before"]*/

foo = 1 +
      2;

foo =
    5;

if (someCondition ||
    otherCondition) {
}

answer = everything ?
  42 :
  foo;

class Foo {
    a =
        1;
    [b] =
        2;
    [c
    ] =
        3;
}
```

:::

使用 `"before"` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "before"]*/

foo = 1 + 2;

foo = 1
    + 2;

foo
    = 5;

if (someCondition
    || otherCondition) {
}

answer = everything
  ? 42
  : foo;

class Foo {
    a
        = 1;
    [b]
        = 2;
    [c
    ]
        = 3;
    d = 4;
}
```

:::

### none

使用 `"none"` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "none"]*/

foo = 1 +
      2;

foo = 1
    + 2;

if (someCondition ||
    otherCondition) {
}

if (someCondition
    || otherCondition) {
}

answer = everything
  ? 42
  : foo;

answer = everything ?
  42 :
  foo;

class Foo {
    a =
        1;
    [b] =
        2;
    [c
    ] =
        3;
    d
        = 4;
    [e]
        = 5;
    [f
    ]
        = 6;
}
```

:::

使用 `"none"` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "none"]*/

foo = 1 + 2;

foo = 5;

if (someCondition || otherCondition) {
}

answer = everything ? 42 : foo;

class Foo {
    a = 1;
    [b] = 2;
    [c
    ] = 3;
    d = 4;
    [e] = 5;
    [f
    ] = 6;
}
```

:::

### overrides

使用 `{ "overrides": { "+=": "before" } }` 选项时，此规则的其他错误代码示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "+=": "before" } }]*/

var thing = 'thing';
thing +=
  's';
```

:::

使用 `{ "overrides": { "+=": "before" } }` 选项时，此规则的其他正确代码示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "+=": "before" } }]*/

var thing = 'thing';
thing
  += 's';
```

:::

使用 `{ "overrides": { "?": "ignore", ":": "ignore" } }` 选项时，此规则的其他正确代码示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "?": "ignore", ":": "ignore" } }]*/

answer = everything ?
  42
  : foo;

answer = everything
  ?
  42
  :
  foo;
```

:::

使用默认选项 `"after", { "overrides": { "?": "before", ":": "before" } }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "?": "before", ":": "before" } }]*/

foo = 1
+
2;

foo = 1
    + 2;

foo
    = 5;

if (someCondition
    || otherCondition) {
}

answer = everything ?
  42 :
  foo;
```

:::

使用默认选项 `"after", { "overrides": { "?": "before", ":": "before" } }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint operator-linebreak: ["error", "after", { "overrides": { "?": "before", ":": "before" } }]*/

foo = 1 + 2;

foo = 1 +
      2;

foo =
    5;

if (someCondition ||
    otherCondition) {
}

answer = everything
  ? 42
  : foo;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果项目不会采用统一的运算符换行风格，请关闭此规则。
