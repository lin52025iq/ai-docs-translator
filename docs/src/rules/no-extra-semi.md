---
title: no-extra-semi
rule_type: suggestion
related_rules:
- semi
- semi-spacing
---
输入错误以及对何处需要分号的误解，可能会导致出现不必要的分号。虽然多余的分号严格来说并不算错误，但会让代码阅读者感到困惑。

<a id="rule-details"></a>

## 规则详情

此规则禁止使用不必要的分号。

此规则报告的问题可以自动修复，但如果删除分号会导致后续语句变成指令（例如 `"use strict"`），则不会自动修复。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-extra-semi: "error"*/

var x = 5;;

function foo() {
    // code
};

class C {
    field;;

    method() {
        // code
    };

    static {
        // code
    };
};
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-extra-semi: "error"*/

var x = 5;

function foo() {
    // code
}

var bar = function() {
    // code
};

class C {
    field;

    method() {
        // code
    }

    static {
        // code
    }
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你有意使用多余的分号，可以禁用此规则。
