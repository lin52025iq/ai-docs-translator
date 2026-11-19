---
title: no-lone-blocks
rule_type: suggestion
---


在 JavaScript 中，ES6 之前，用花括号括起来的独立代码块不会创建新的作用域，也没有任何用途。例如，下面的花括号对 `foo` 没有任何影响：

```js
{
    var foo = bar();
}
```

在 ES6 中，如果代码块中包含块级绑定（`let` 和 `const`）、类声明，或（在严格模式下的）函数声明，那么代码块可能会创建新的作用域。在这些情况下，代码块不被视为多余。

<a id="rule-details"></a>

## 规则详情

此规则旨在移除脚本顶层或其他代码块中不必要且可能造成混淆的代码块。

此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-lone-blocks: "error"*/

{}

if (foo) {
    bar();
    {
        baz();
    }
}

function bar() {
    {
        baz();
    }
}

{
    function foo() {}
}

{
    aLabel: {
    }
}

class C {
    static {
        {
            foo();
        }
    }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-lone-blocks: "error"*/

while (foo) {
    bar();
}

if (foo) {
    if (bar) {
        baz();
    }
}

function bar() {
    baz();
}

{
    let x = 1;
}

{
    const y = 1;
}

{
    class Foo {}
}

aLabel: {
}

class C {
    static {
        lbl: {
            if (something) {
                break lbl;
            }

            foo();
        }
    }
}
```

:::

在 ESLint 配置中通过 `"languageOptions": { "sourceType": "module" }` 使用 ES6 环境和严格模式，或在代码中使用 `"use strict"` 指令时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-lone-blocks: "error"*/

"use strict";

{
    function foo() {}
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
