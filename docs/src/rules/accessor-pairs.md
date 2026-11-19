---
title: accessor-pairs
rule_type: suggestion
related_rules:
- no-dupe-keys
- no-dupe-class-members
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
---


在 JavaScript 中，常见的错误是创建一个对象，只为某个属性定义 setter，却没有定义对应的 getter。没有 getter，就无法读取该属性，因此该属性最终不会被使用。

以下是一些示例：

```js
// Bad
const o = {
    set a(value) {
        this.val = value;
    }
};


// Good
const p = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

```

如果定义了 setter 却没有 getter，此规则会发出警告。使用 `getWithoutSet` 选项时，如果定义了 getter 却没有 setter，此规则也会发出警告。

<a id="rule-details"></a>

## 规则详情

此规则强制要求为每个定义了 setter 的属性提供 getter。

启用 `getWithoutSet` 选项后，此规则会强制要求为每个定义了 getter 的属性提供 setter。

此规则始终检查对象字面量和属性描述符。默认情况下，它还会检查类声明和类表达式。

<a id="options"></a>

## 选项

* `setWithoutGet` 设置为 `true` 时，如果 setter 没有 getter，则发出警告（默认值为 `true`）。
* `getWithoutSet` 设置为 `true` 时，如果 getter 没有 setter，则发出警告（默认值为 `false`）。
* `enforceForClassMembers` 设置为 `true` 时，此规则还会应用于类的 getter/setter（默认值为 `true`）。如果希望此规则忽略类声明和类表达式，请将 `enforceForClassMembers` 设置为 `false`。
* `enforceForTSTypes`：设置为 `true` 时，此规则还会应用于 TypeScript 类型定义（默认值为 `false`）。

<a id="setwithoutget"></a>

### setWithoutGet

对于默认的 `{ "setWithoutGet": true }` 选项，以下代码示例是**错误**的：

:::incorrect

```js
/*eslint accessor-pairs: "error"*/

const q = {
    set a(value) {
        this.val = value;
    }
};


const r = {d: 1};
Object.defineProperty(r, 'c', {
    set: function(value) {
        this.val = value;
    }
});

const r2 = {d: 1};
Object.defineProperty(r2, 'c', {
    'set': function(value) {
        this.val = value;
    }
});

const r3 = {d: 1};
Object.defineProperty(r3, 'c', {
    ['set']: function(value) {
        this.val = value;
    }
});
```

:::

对于默认的 `{ "setWithoutGet": true }` 选项，以下代码示例是**正确**的：

:::correct

```js
/*eslint accessor-pairs: "error"*/

const s = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

const t = {d: 1};
Object.defineProperty(t, 'c', {
    set: function(value) {
        this.val = value;
    },
    get: function() {
        return this.val;
    }
});

const t2 = {d: 1};
Object.defineProperty(t2, 'c', {
    'set': function(value) {
        this.val = value;
    },
    ['get']: function() {
        return this.val;
    }
});

```

:::

<a id="getwithoutset"></a>

### getWithoutSet

对于 `{ "getWithoutSet": true }` 选项，以下代码示例是**错误**的：

:::incorrect

```js
/*eslint accessor-pairs: ["error", { "getWithoutSet": true }]*/

const u = {
    set a(value) {
        this.val = value;
    }
};

const v = {
    get a() {
        return this.val;
    }
};

const w = {d: 1};
Object.defineProperty(w, 'c', {
    set: function(value) {
        this.val = value;
    }
});

const x = {d: 1};
Object.defineProperty(x, 'c', {
    get: function() {
        return this.val;
    }
});

const x2 = {d: 1};
Object.defineProperty(x2, 'c', {
    'get': function() {
        return this.val;
    }
});

const x3 = {d: 1};
Object.defineProperty(x3, 'c', {
    ['get']: function() {
        return this.val;
    }
});
```

:::

对于 `{ "getWithoutSet": true }` 选项，以下代码示例是**正确**的：

:::correct

```js
/*eslint accessor-pairs: ["error", { "getWithoutSet": true }]*/
const y = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

const z = {d: 1};
Object.defineProperty(z, 'c', {
    set: function(value) {
        this.val = value;
    },
    get: function() {
        return this.val;
    }
});

const z2 = {d: 1};
Object.defineProperty(z2, 'c', {
    'set': function(value) {
        this.val = value;
    },
    ['get']: function() {
        return this.val;
    }
});

```

:::

<a id="enforceforclassmembers"></a>

### enforceForClassMembers

当 `enforceForClassMembers` 设置为 `true`（默认值）时：

* `"getWithoutSet": true` 还会针对类中没有 setter 的 getter 发出警告。
* `"setWithoutGet": true` 还会针对类中没有 getter 的 setter 发出警告。

对于 `{ "getWithoutSet": true, "enforceForClassMembers": true }`，以下代码示例是**错误**的：

:::incorrect

```js
/*eslint accessor-pairs: ["error", { "getWithoutSet": true, "enforceForClassMembers": true }]*/

class Foo {
    get a() {
        return this.val;
    }
}

class Bar {
    static get a() {
        return this.val;
    }
}

const Baz = class {
    get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
}
```

:::

对于 `{ "setWithoutGet": true, "enforceForClassMembers": true }`，以下代码示例是**错误**的：

:::incorrect

```js
/*eslint accessor-pairs: ["error", { "setWithoutGet": true, "enforceForClassMembers": true }]*/

class Foo {
    set a(value) {
        this.val = value;
    }
}

const Bar = class {
    static set a(value) {
        this.val = value;
    }
}
```

:::

当 `enforceForClassMembers` 设置为 `false` 时，此规则会忽略类。

对于 `{ "getWithoutSet": true, "setWithoutGet": true, "enforceForClassMembers": false }`，以下代码示例是**正确**的：

:::correct

```js
/*eslint accessor-pairs: ["error", {
    "getWithoutSet": true, "setWithoutGet": true, "enforceForClassMembers": false
}]*/

class Foo {
    get a() {
        return this.val;
    }
}

class Bar {
    static set a(value) {
        this.val = value;
    }
}

const Baz = class {
    static get a() {
        return this.val;
    }
}

const Quux = class {
    set a(value) {
        this.val = value;
    }
}
```

:::

<a id="enforcefortstypes"></a>

### enforceForTSTypes

当 `enforceForTSTypes` 设置为 `true` 时：

* `"getWithoutSet": true` 还会针对 TypeScript 类型中没有 setter 的 getter 发出警告。
* `"setWithoutGet": true` 还会针对 TypeScript 类型中没有 getter 的 setter 发出警告。

对于 `{ "getWithoutSet": true, "enforceForTSTypes": true }`，以下代码示例是**错误**的：

:::incorrect

```ts
/*eslint accessor-pairs: ["error", { "getWithoutSet": true, "enforceForTSTypes": true }]*/

interface I {
    get a(): string
}

type T = {
    get a(): number
}
```

:::

对于 `{ "setWithoutGet": true, "enforceForTSTypes": true }`，以下代码示例是**错误**的：

:::incorrect

```ts
/*eslint accessor-pairs: ["error", { "setWithoutGet": true, "enforceForTSTypes": true }]*/

interface I {
    set a(value: unknown): void
}

type T = {
    set a(value: unknown): void
}
```

:::

当 `enforceForTSTypes` 设置为 `false` 时，此规则会忽略 TypeScript 类型。

对于 `{ "getWithoutSet": true, "setWithoutGet": true, "enforceForTSTypes": false }`，以下代码示例是**正确**的：

:::correct

```ts
/*eslint accessor-pairs: ["error", {
    "getWithoutSet": true, "setWithoutGet": true, "enforceForTSTypes": false
}]*/

interface I {
    get a(): string
}

type T = {
    set a(value: unknown): void
}
```

:::

<a id="known-limitations"></a>

## 已知限制

受静态分析能力的限制，此规则不会考虑可能产生的副作用。在某些情况下，如果 getter/setter 使用了计算属性键，此规则可能不会报告缺失的配对，如下例所示：

```js
/*eslint accessor-pairs: "error"*/

const z = 1;

// no warnings
const a = {
    get [z++]() {
        return this.val;
    },
    set [z++](value) {
        this.val = value;
    }
};
```

此外，此规则不会禁止对象字面量和类定义中的重复键；在某些存在重复键的情况下，此规则可能不会报告 getter/setter 配对缺失，如下例所示：

```js
/*eslint accessor-pairs: "error"*/

// no warnings
const b = {
    get a() {
        return this.val;
    },
    a: 1,
    set a(value) {
        this.val = value;
    }
};
```

上述代码创建了一个对象，其中属性 `"a"` 只有 setter。

如果还想禁止对象字面量中的重复键，请参阅 [no-dupe-keys](no-dupe-keys)。

如果还想禁止类定义中的重复名称，请参阅 [no-dupe-class-members](no-dupe-class-members)。

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不关心对象上的 setter 和 getter 是否同时存在，可以关闭此规则。
