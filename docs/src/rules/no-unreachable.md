---
title: no-unreachable
rule_type: problem
handled_by_typescript: true
extra_typescript_info: >-
    TypeScript must be configured with
    [`allowUnreachableCode: false`](https://www.typescriptlang.org/tsconfig#allowUnreachableCode)
    for it to consider unreachable code an error.
---



由于 `return`、`throw`、`continue` 和 `break` 语句会无条件退出代码块，因此它们之后的任何语句都无法执行。不可达语句通常是错误。

```js
function fn() {
    x = 1;
    return x;
    x = 3; // this will never execute
}
```

另一种常见错误是在构造函数未调用 `super()` 的子类中定义实例字段。子类的实例字段只有在调用 `super()` 后才会添加到实例中。如果没有调用 `super()`，这些字段定义就不会生效，因此属于不可达代码。

```js
class C extends B {
    #x; // this will never be added to instances

    constructor() {
        return {};
    }
}
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在 `return`、`throw`、`continue` 和 `break` 语句之后出现不可达代码。此规则还会标记构造函数中没有调用 `super()` 的子类里的实例字段定义。

以下是此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-unreachable: "error"*/

function foo() {
    return true;
    console.log("done");
}

function bar() {
    throw new Error("Oops!");
    console.log("done");
}

while(value) {
    break;
    console.log("done");
}

throw new Error("Oops!");
console.log("done");

function baz() {
    if (Math.random() < 0.5) {
        return;
    } else {
        throw new Error();
    }
    console.log("done");
}

for (;;) {}
console.log("done");
```

:::

由于 JavaScript 的函数和变量提升，以下是此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unreachable: "error"*/

function foo() {
    return bar();
    function bar() {
        return 1;
    }
}

function bar() {
    return x;
    var x;
}

switch (foo) {
    case 1:
        break;
        var x;
}
```

:::

以下是此规则的其他**错误**代码示例：

::: incorrect

```js
/*eslint no-unreachable: "error"*/

class C extends B {
    #x; // unreachable
    #y = 1; // unreachable
    a; // unreachable
    b = 1; // unreachable

    constructor() {
        return {};
    }
}
```

:::

以下是此规则的其他**正确**代码示例：

::: correct

```js
/*eslint no-unreachable: "error"*/

class D extends B {
    #x;
    #y = 1;
    a;
    b = 1;

    constructor() {
        super();
    }
}

class E extends B {
    #x;
    #y = 1;
    a;
    b = 1;

    // implicit constructor always calls `super()`
}

class F extends B {
    static #x;
    static #y = 1;
    static a;
    static b = 1;

    constructor() {
        return {};
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
