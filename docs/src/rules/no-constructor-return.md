---
title: no-constructor-return
rule_type: problem
---


在 JavaScript 中，在类的构造函数中返回一个值可能是错误的。禁止这种模式可以避免因不熟悉该语言或复制粘贴错误而导致的问题。

<a id="rule-details"></a>
## 规则详情

此规则禁止在类的构造函数中使用 return 语句。请注意，不返回任何内容是允许的。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-constructor-return: "error"*/

class A {
    constructor(a) {
        this.a = a;
        return a;
    }
}

class B {
    constructor(f) {
        if (!f) {
            return 'falsy';
        }
    }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-constructor-return: "error"*/

class C {
    constructor(c) {
        this.c = c;
    }
}

class D {
    constructor(f) {
        if (!f) {
            return;  // Flow control.
        }

        f();
    }
}

class E {
    constructor() {
        return;
    }
}

```

:::

<a id="options"></a>
## 选项

此规则没有选项。
