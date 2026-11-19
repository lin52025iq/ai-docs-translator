---
title: semi-style
rule_type: layout
related_rules:
- no-extra-semi
- semi
- semi-spacing
---
通常，分号位于行尾。但在不使用分号的代码风格中，分号位于行首。此规则强制分号出现在配置指定的位置。

<a id="rule-details"></a>

## 规则详情

此规则会报告分号周围的换行符。

此规则有一个选项。

```json
{
    "semi-style": ["error", "last"],
}
```

* `"last"`（默认值）强制分号位于语句末尾。
* `"first"` 强制分号位于语句开头。即使使用此选项，`for` 循环头部（`for(a;b;c){}`）中的分号也应位于行尾。

以下是此规则在使用 `"last"` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint semi-style: ["error", "last"]*/

foo()
;[1, 2, 3].forEach(bar)

for (
    var i = 0
    ; i < 10
    ; ++i
) {
    foo()
}

class C {
    static {
        foo()
        ;bar()
    }
}
```

:::

以下是此规则在使用 `"last"` 选项时的**正确**代码示例：

::: correct

```js
/*eslint semi-style: ["error", "last"]*/

foo();
[1, 2, 3].forEach(bar)

for (
    var i = 0;
    i < 10;
    ++i
) {
    foo()
}

class C {
    static {
        foo();
        bar()
    }
}
```

:::

以下是此规则在使用 `"first"` 选项时的**错误**代码示例：

::: incorrect

```js
/*eslint semi-style: ["error", "first"]*/

foo();
[1, 2, 3].forEach(bar)

for (
    var i = 0
    ; i < 10
    ; ++i
) {
    foo()
}

class C {
    static {
        foo();
        bar()
    }
}
```

:::

以下是此规则在使用 `"first"` 选项时的**正确**代码示例：

::: correct

```js
/*eslint semi-style: ["error", "first"]*/

foo()
;[1, 2, 3].forEach(bar)

for (
    var i = 0;
    i < 10;
    ++i
) {
    foo()
}

class C {
    static {
        foo()
        ;bar()
    }
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不希望收到有关分号位置的提示，可以安全地禁用此规则。
