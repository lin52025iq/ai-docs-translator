---
title: no-this-before-super
rule_type: problem
handled_by_typescript: true
---



在派生类的构造函数中，如果在调用 `super()` 之前使用 `this`/`super`，就会引发引用错误。

此规则会检查构造函数中的 `this`/`super` 关键字，并报告在 `super()` 之前使用的情况。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记在调用 `super()` 之前使用的 `this`/`super` 关键字。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-this-before-super: "error"*/

class A1 extends B {
    constructor() {
        this.a = 0;
        super();
    }
}

class A2 extends B {
    constructor() {
        this.foo();
        super();
    }
}

class A3 extends B {
    constructor() {
        super.foo();
        super();
    }
}

class A4 extends B {
    constructor() {
        super(this.foo());
    }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-this-before-super: "error"*/

class A1 {
    constructor() {
        this.a = 0; // OK, this class doesn't have an `extends` clause.
    }
}

class A2 extends B {
    constructor() {
        super();
        this.a = 0; // OK, this is after `super()`.
    }
}

class A3 extends B {
    foo() {
        this.a = 0; // OK. this is not in a constructor.
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不希望收到在构造函数中于 `super()` 之前使用 `this`/`super` 的提示，可以放心禁用此规则。
