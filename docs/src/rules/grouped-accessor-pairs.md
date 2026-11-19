---
title: grouped-accessor-pairs
rule_type: suggestion
related_rules:
- accessor-pairs
- no-dupe-keys
- no-dupe-class-members
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
---


同一属性的 getter 和 setter 不一定必须相邻定义。

例如，以下语句会创建相同的对象：

```js
const o = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    },
    b: 1
};

const o1 = {
    get a() {
        return this.val;
    },
    b: 1,
    set a(value) {
        this.val = value;
    }
};
```

虽然允许在对象或类定义中的任意位置定义 getter 或 setter，但将同一属性的访问器函数放在一起被认为是一种最佳实践。

换句话说，如果某个属性同时具有 getter 和 setter，那么 setter 应紧接在 getter 后定义，反之亦然。

<a id="rule-details"></a>
## 规则详情

此规则要求在对象字面量、类声明和类表达式中，将同一属性的访问器函数定义在一起。

此外，此规则还可以强制使用一致的顺序（`getBeforeSet` 或 `setBeforeGet`）。

此规则不要求 getter 或 setter 必须成对存在。如果你还想强制要求 getter/setter 成对出现，请参阅 [accessor-pairs](accessor-pairs)。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint grouped-accessor-pairs: "error"*/

const foo = {
    get a() {
        return this.val;
    },
    b: 1,
    set a(value) {
        this.val = value;
    }
};

const bar = {
    set b(value) {
        this.val = value;
    },
    a: 1,
    get b() {
        return this.val;
    }
}

class Foo {
    set a(value) {
        this.val = value;
    }
    b(){}
    get a() {
        return this.val;
    }
}

const Bar = class {
    static get a() {
        return this.val;
    }
    b(){}
    static set a(value) {
        this.val = value;
    }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint grouped-accessor-pairs: "error"*/

const foo = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    },
    b: 1
};

const bar = {
    set b(value) {
        this.val = value;
    },
    get b() {
        return this.val;
    },
    a: 1
}

class Foo {
    set a(value) {
        this.val = value;
    }
    get a() {
        return this.val;
    }
    b(){}
}

const Bar = class {
    static get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
    b(){}
}
```

:::

<a id="options"></a>
## 选项

此规则有一个主要的字符串选项和一个可选的次要对象选项。
字符串选项指定顺序：
* `"anyOrder"`（默认值）不强制顺序。
* `"getBeforeSet"`：如果某个属性同时具有 getter 和 setter，则要求先定义 getter，再定义 setter。
* `"setBeforeGet"`：如果某个属性同时具有 getter 和 setter，则要求先定义 setter，再定义 getter。

可选的对象选项用于选择是否检查其他类似对象的结构：
* `enforceForTSTypes`：同时检查 TypeScript 类型（接口和类型字面量）

<a id="getbeforeset"></a>
### getBeforeSet

使用 `"getBeforeSet"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint grouped-accessor-pairs: ["error", "getBeforeSet"]*/

const foo = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

class Foo {
    set a(value) {
        this.val = value;
    }
    get a() {
        return this.val;
    }
}

const Bar = class {
    static set a(value) {
        this.val = value;
    }
    static get a() {
        return this.val;
    }
}
```

:::

使用 `"getBeforeSet"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint grouped-accessor-pairs: ["error", "getBeforeSet"]*/

const foo = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    }
};

class Foo {
    get a() {
        return this.val;
    }
    set a(value) {
        this.val = value;
    }
}

const Bar = class {
    static get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
}
```

:::

<a id="setbeforeget"></a>
### setBeforeGet

使用 `"setBeforeGet"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint grouped-accessor-pairs: ["error", "setBeforeGet"]*/

const foo = {
    get a() {
        return this.val;
    },
    set a(value) {
        this.val = value;
    }
};

class Foo {
    get a() {
        return this.val;
    }
    set a(value) {
        this.val = value;
    }
}

const Bar = class {
    static get a() {
        return this.val;
    }
    static set a(value) {
        this.val = value;
    }
}
```

:::

使用 `"setBeforeGet"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint grouped-accessor-pairs: ["error", "setBeforeGet"]*/

const foo = {
    set a(value) {
        this.val = value;
    },
    get a() {
        return this.val;
    }
};

class Foo {
    set a(value) {
        this.val = value;
    }
    get a() {
        return this.val;
    }
}

const Bar = class {
    static set a(value) {
        this.val = value;
    }
    static get a() {
        return this.val;
    }
}
```

:::
<a id="enforcefortstypes"></a>
### enforceForTSTypes

使用 `["anyOrder", { enforceForTSTypes: true }]` 时，此规则的**错误**代码示例：

::: incorrect

```ts
/*eslint grouped-accessor-pairs: ["error", "anyOrder", { enforceForTSTypes: true }] */

interface I {
    get a(): string,
    between: true,
    set a(value: string): void
}

type T = {
    get a(): string,
    between: true,
    set a(value: string): void
};
```

:::

使用 `["anyOrder", { enforceForTSTypes: true }]` 时，此规则的**正确**代码示例：

::: correct

```ts
/*eslint grouped-accessor-pairs: ["error", "anyOrder", { enforceForTSTypes: true }] */

interface I {
    get a(): string,
    set a(value: string): void,
}

type T = {
    set a(value: string): void,
    get a(): string,
};
```

:::

<a id="known-limitations"></a>
## 已知限制

由于静态分析能力有限，此规则不会考虑可能产生的副作用。在某些情况下，对于具有计算属性键的 getter/setter，此规则可能会要求或未能要求将其放在一起或遵循特定顺序，如以下示例所示：

```js
/*eslint grouped-accessor-pairs: "error"*/

let a = 1;

// false warning (false positive)
const foo = {
    get [a++]() {
        return this.val;
    },
    b: 1,
    set [a++](value) {
        this.val = value;
    }
};

// missed warning (false negative)
const bar = {
    get [++a]() {
        return this.val;
    },
    b: 1,
    set [a](value) {
        this.val = value;
    }
};
```

此外，对于具有重复 getter 或 setter 的属性，此规则不会报告任何警告。

如果你还想禁止对象字面量中的重复键，请参阅 [no-dupe-keys](no-dupe-keys)。

如果你还想禁止类定义中的重复名称，请参阅 [no-dupe-class-members](no-dupe-class-members)。