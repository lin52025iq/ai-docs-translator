---
title: no-useless-constructor
rule_type: suggestion
---


ES2015 会在未指定类构造函数时提供默认构造函数。因此，以下示例中的空构造函数，或仅委托给父类的构造函数，都没有必要：

```js
class A {
    constructor () {
    }
}

class B extends A {
    constructor (value) {
      super(value);
    }
}
```

<a id="rule-details"></a>

## 规则详情

此规则会标记可以安全删除且不会改变类行为的构造函数。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-useless-constructor: "error"*/

class A {
    constructor () {
    }
}

class B extends A {
    constructor (...args) {
      super(...args);
    }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-useless-constructor: "error"*/

class A { }

class B {
    constructor () {
        doSomething();
    }
}

class C extends A {
    constructor() {
        super('foo');
    }
}

class D extends A {
    constructor() {
        super();
        doSomething();
    }
}
```

:::

此规则还支持 TypeScript 类型语法。

此规则的**错误** TypeScript 代码示例：

::: incorrect

```ts
/* eslint no-useless-constructor: "error" */

class A {
    public constructor() {}
}
```

:::

此规则的**正确** TypeScript 代码示例：

::: correct

```ts
/* eslint no-useless-constructor: "error" */

class A {
    protected constructor() {}
}

class B extends A {
    public constructor() {
        super();
    }
}

class C {
    constructor(@decorated param) {}
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果不希望收到有关不必要构造函数的提示，可以放心禁用此规则。
