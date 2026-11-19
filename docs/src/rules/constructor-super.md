---
title: constructor-super
rule_type: problem
handled_by_typescript: true
---

派生类的构造函数必须调用 `super()`。
非派生类的构造函数不得调用 `super()`。
如果不遵守这一要求，JavaScript 引擎会在运行时抛出错误。

此规则会检查是否存在有效的 `super()` 调用。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记无效或缺失的 `super()` 调用。

由于类中没有 `extends` 子句，因此这是一个语法错误：

```js
class A {
    constructor() {
        super();
    }
}
```

此规则的**错误**代码示例：

:::incorrect

```js
/*eslint constructor-super: "error"*/

class A extends B {
    constructor() { }  // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class C extends null {
    constructor() {
        super();  // Would throw a TypeError.
    }
}

class D extends null {
    constructor() { }  // Would throw a ReferenceError.
}
```

:::

此规则的**正确**代码示例：

:::correct

```js
/*eslint constructor-super: "error"*/

class A {
    constructor() { }
}

class B extends C {
    constructor() {
        super();
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不希望收到构造函数中 `super()` 调用无效或缺失的通知，可以安全地禁用此规则。