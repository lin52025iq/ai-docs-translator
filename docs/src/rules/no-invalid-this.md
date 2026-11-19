---
title: no-invalid-this
rule_type: suggestion
handled_by_typescript: true
extra_typescript_info: Note that, technically, TypeScript will only catch this if you have the `strict` or `noImplicitThis` flags enabled. These are enabled in most TypeScript projects, since they are considered to be best practice.
---


在严格模式下，类或类式对象之外的 `this` 关键字可能是 `undefined`，并导致 `TypeError`。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记在 `this` 的值为 `undefined` 的上下文中使用 `this` 关键字的情况。

脚本顶层的 `this` 始终被视为有效，因为无论是否处于严格模式，它都指向全局对象。

ECMAScript 模块顶层的 `this` 始终被视为无效，因为其值为 `undefined`。

对于函数内部的 `this`，此规则基本上会检查包含 `this` 关键字的函数是否为构造函数或方法。请注意，箭头函数具有词法 `this`，因此此规则会检查它们所在的外层上下文。

此规则根据以下条件判断函数是否为构造函数：

* 函数名以大写字母开头。
* 函数被赋值给一个以大写字母开头的变量。
* 函数是 ES2015 类的构造函数。

此规则根据以下条件判断函数是否为方法：

* 函数位于对象字面量中。
* 函数被赋值给某个属性。
* 函数是 ES2015 类的方法、getter 或 setter。

此外，此规则允许在以下函数中使用 `this` 关键字：

* 直接调用该函数的 `call/apply/bind` 方法。
* 如果提供了 `thisArg`，该函数是数组方法（如 `.forEach()`）的回调函数。
* 函数的 JSDoc 注释中包含 `@this` 标签。

此规则始终允许在以下上下文中使用 `this` 关键字：

* 脚本顶层。
* 类字段初始化器中。
* 类静态代码块中。

其他情况均视为问题。

此规则**仅**适用于严格模式。
在 ESLint 配置中设置 `"languageOptions": { "sourceType": "module" }` 后，即使没有 `"use strict"` 指令，代码也处于严格模式。

以下是此规则在严格模式下的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-invalid-this: "error"*/

"use strict";

(function() {
    this.a = 0;
    baz(() => this);
})();

function foo() {
    this.a = 0;
    baz(() => this);
}

const bar = function() {
    this.a = 0;
    baz(() => this);
};

foo(function() {
    this.a = 0;
    baz(() => this);
});

const obj = {
    aaa: function() {
        return function foo() {
            // There is in a method `aaa`, but `foo` is not a method.
            this.a = 0;
            baz(() => this);
        };
    }
};

foo.forEach(function() {
    this.a = 0;
    baz(() => this);
});
```

:::

以下是此规则在严格模式下的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-invalid-this: "error"*/

"use strict";

this.a = 0;
baz(() => this);

function Foo() {
    // OK, this is in a legacy style constructor.
    this.a = 0;
    baz(() => this);
}

class Bar {
    constructor() {
        // OK, this is in a constructor.
        this.a = 0;
        baz(() => this);
    }
}

const obj = {
    foo: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
};

const obj1 = {
    foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
};

const obj2 = {
    get foo() {
        // OK, this is in a method (this function is on object literal).
        return this.a;
    }
};

const obj3 = Object.create(null, {
    foo: {value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }}
});

Object.defineProperty(obj, "foo", {
    value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }
});

Object.defineProperties(obj, {
    foo: {value: function foo() {
        // OK, this is in a method (this function is on object literal).
        this.a = 0;
    }}
});

function Foo() {
    this.foo = function foo() {
        // OK, this is in a method (this function assigns to a property).
        this.a = 0;
        baz(() => this);
    };
}

obj.foo = function foo() {
    // OK, this is in a method (this function assigns to a property).
    this.a = 0;
};

Foo.prototype.foo = function foo() {
    // OK, this is in a method (this function assigns to a property).
    this.a = 0;
};

class Baz {

    // OK, this is in a class field initializer.
    a = this.b;

    // OK, static initializers also have valid this.
    static a = this.b;

    foo() {
        // OK, this is in a method.
        this.a = 0;
        baz(() => this);
    }

    static foo() {
        // OK, this is in a method (static methods also have valid this).
        this.a = 0;
        baz(() => this);
    }

    static {
        // OK, static blocks also have valid this.
        this.a = 0;
        baz(() => this);
    }
}

const bar = (function foo() {
    // OK, the `bind` method of this function is called directly.
    this.a = 0;
}).bind(obj);

foo.forEach(function() {
    // OK, `thisArg` of `.forEach()` is given.
    this.a = 0;
    baz(() => this);
}, thisArg);

/** @this Foo */
function foo() {
    // OK, this function has a `@this` tag in its JSDoc comment.
    this.a = 0;
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项，其中包含一个选项：

* `"capIsConstructor": false`（默认值为 `true`）会禁用“名称以大写字母开头的函数是构造函数”这一假设。

### capIsConstructor

默认情况下，此规则始终允许在名称以大写字母开头的函数，以及被赋值给名称以大写字母开头的变量的匿名函数中使用 `this`，假定这些函数用作构造函数。

如果希望将这些函数视为“普通”函数，请将 `"capIsConstructor"` 设置为 `false`。

以下是将 `"capIsConstructor"` 选项设为 `false` 时，此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-invalid-this: ["error", { "capIsConstructor": false }]*/

"use strict";

function Foo() {
    this.a = 0;
}

const bar = function Foo() {
    this.a = 0;
}

const Bar = function() {
    this.a = 0;
};

Baz = function() {
    this.a = 0;
};
```

:::

以下是将 `"capIsConstructor"` 选项设为 `false` 时，此规则的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-invalid-this: ["error", { "capIsConstructor": false }]*/

"use strict";

obj.Foo = function Foo() {
    // OK, this is in a method.
    this.a = 0;
};
```

:::

此规则还支持 TypeScript 类型语法。

以下是此规则的 **TypeScript 错误**代码示例：

:::incorrect

```ts
/*eslint no-invalid-this: "error"*/

function foo(bar: string) {
    this.prop;
    console.log(bar)
}

/** @this Obj */
foo(function() {
    console.log(this);
    z(x => console.log(x, this));
});

function foo() {
  class C {
    accessor [this.a] = foo;
  }
}
```

:::

以下是此规则的 **TypeScript 正确**代码示例：

:::correct

```ts
/*eslint no-invalid-this: "error"*/

interface SomeType {
    prop: string;
}

function foo(this: SomeType) {
    this.prop;
}

class A {
    a = 5;
    b = this.a;
    accessor c = this.a;
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果不希望收到关于在类或类式对象之外使用 `this` 关键字的提示，可以放心禁用此规则。
