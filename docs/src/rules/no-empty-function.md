---
title: no-empty-function
rule_type: suggestion
related_rules:
- no-empty
---


空函数会降低代码的可读性，因为读者需要猜测它是否是有意为空的。因此，为空函数编写清晰的注释是个好习惯。

```js
function foo() {
    // do nothing.
}
```

尤其是，箭头函数的空代码块可能会让开发者感到困惑。它与空对象字面量非常相似。

```js
list.map(() => {});   // This is a block, would return undefined.
list.map(() => ({})); // This is an empty object.
```

<a id="rule-details"></a>

## 规则详情

此规则旨在消除空函数。如果函数中包含注释，则不会被视为问题。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-empty-function: "error"*/

function foo() {}

const bar = function() {};

const bar1 = () => {};

function* baz() {}

const bar2 = function*() {};

const obj = {
    foo: function() {},

    foo: function*() {},

    foo() {},

    *foo() {},

    get foo() {},

    set foo(value) {}
};

class A {
    constructor() {}

    foo() {}

    *foo() {}

    get foo() {}

    set foo(value) {}

    static foo() {}

    static *foo() {}

    static get foo() {}

    static set foo(value) {}
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-empty-function: "error"*/

function foo() {
    // do nothing.
}

const baz = function() {
    // any clear comments.
};

const baz1 = () => {
    bar();
};

function* foobar() {
    // do nothing.
}

const baz2 = function*() {
    // do nothing.
};

const obj = {
    foo: function() {
        // do nothing.
    },

    foo: function*() {
        // do nothing.
    },

    foo() {
        // do nothing.
    },

    *foo() {
        // do nothing.
    },

    get foo() {
        // do nothing.
    },

    set foo(value) {
        // do nothing.
    }
};

class A {
    constructor() {
        // do nothing.
    }

    foo() {
        // do nothing.
    }

    *foo() {
        // do nothing.
    }

    get foo() {
        // do nothing.
    }

    set foo(value) {
        // do nothing.
    }

    static foo() {
        // do nothing.
    }

    static *foo() {
        // do nothing.
    }

    static get foo() {
        // do nothing.
    }

    static set foo(value) {
        // do nothing.
    }
}
```

:::

<a id="options"></a>

## 选项

此规则提供一个选项，用于允许特定类型的函数为空。

* `allow` (`string[]`) - 允许为空的函数类型列表。列表项可以是以下字符串之一。默认值为空数组 (`[]`)。
    * `"functions"` - 普通函数。
    * `"arrowFunctions"` - 箭头函数。
    * `"generatorFunctions"` - 生成器函数。
    * `"methods"` - 类方法和对象字面量中的方法简写。
    * `"generatorMethods"` - 带生成器的类方法和对象字面量中的方法简写。
    * `"getters"` - getter。
    * `"setters"` - setter。
    * `"constructors"` - 类构造函数。
    * `"asyncFunctions"` - 异步函数。
    * `"asyncMethods"` - 异步类方法和对象字面量中的方法简写。
    * `"privateConstructors"` - 私有类构造函数。（仅限 TypeScript）
    * `"protectedConstructors"` - 受保护的类构造函数。（仅限 TypeScript）
    * `"decoratedFunctions"` - 带装饰器的类方法。（仅限 TypeScript）
    * `"overrideMethods"` - 使用 override 关键字的方法。（仅限 TypeScript）

### allow: functions

`{ "allow": ["functions"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["functions"] }]*/

function foo() {}

const bar = function() {};

const obj = {
    foo: function() {}
};
```

:::

### allow: arrowFunctions

`{ "allow": ["arrowFunctions"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["arrowFunctions"] }]*/

const foo = () => {};
```

:::

### allow: generatorFunctions

`{ "allow": ["generatorFunctions"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["generatorFunctions"] }]*/

function* foo() {}

const bar = function*() {};

const obj = {
    foo: function*() {}
};
```

:::

### allow: methods

`{ "allow": ["methods"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["methods"] }]*/

const obj = {
    foo() {}
};

class A {
    foo() {}
    static foo() {}
}
```

:::

### allow: generatorMethods

`{ "allow": ["generatorMethods"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["generatorMethods"] }]*/

const obj = {
    *foo() {}
};

class A {
    *foo() {}
    static *foo() {}
}
```

:::

### allow: getters

`{ "allow": ["getters"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["getters"] }]*/

const obj = {
    get foo() {}
};

class A {
    get foo() {}
    static get foo() {}
}
```

:::

### allow: setters

`{ "allow": ["setters"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["setters"] }]*/

const obj = {
    set foo(value) {}
};

class A {
    set foo(value) {}
    static set foo(value) {}
}
```

:::

### allow: constructors

`{ "allow": ["constructors"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["constructors"] }]*/

class A {
    constructor() {}
}
```

:::

### allow: asyncFunctions

`{ "allow": ["asyncFunctions"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["asyncFunctions"] }]*/

async function a(){}
```

:::

### allow: asyncMethods

`{ "allow": ["asyncMethods"] }` 选项的正确代码示例：

::: correct

```js
/*eslint no-empty-function: ["error", { "allow": ["asyncMethods"] }]*/

const obj = {
    async foo() {}
};

class A {
    async foo() {}
    static async foo() {}
}
```

:::

### allow: privateConstructors

`{ "allow": ["privateConstructors"] }` 选项的正确 TypeScript 代码示例：

::: correct

```ts
/*eslint no-empty-function: ["error", { "allow": ["privateConstructors"] }]*/

class A {
    private constructor() {}
}
```

:::

### allow: protectedConstructors

`{ "allow": ["protectedConstructors"] }` 选项的正确 TypeScript 代码示例：

::: correct

```ts
/*eslint no-empty-function: ["error", { "allow": ["protectedConstructors"] }]*/

class A {
    protected constructor() {}
}
```

:::

### allow: decoratedFunctions

`{ "allow": ["decoratedFunctions"] }` 选项的正确 TypeScript 代码示例：

::: correct

```ts
/*eslint no-empty-function: ["error", { "allow": ["decoratedFunctions"] }]*/

class A {
    @decorator
    foo() {}
}
```

:::

### allow: overrideMethods

`{ "allow": ["overrideMethods"] }` 选项的正确 TypeScript 代码示例：

::: correct

```ts
/*eslint no-empty-function: ["error", { "allow": ["overrideMethods"] }]*/

abstract class Base {
    abstract method(): void;
}

class Derived extends Base {
    override method() {}
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不希望收到有关空函数的提示，可以安全地禁用此规则。
