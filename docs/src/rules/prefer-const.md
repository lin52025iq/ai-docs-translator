---
title: prefer-const
rule_type: suggestion
related_rules:
- no-var
- no-unassigned-vars
- no-use-before-define
---



如果变量从未被重新赋值，最好使用 `const` 声明。

`const` 声明会告诉读者“此变量不会被重新赋值”，从而减轻认知负担并提高可维护性。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记使用 `let` 关键字声明、但在初始赋值后从未被重新赋值的变量。

以下是此规则的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-const: "error"*/

// it's initialized and never reassigned.
let a = 3;
console.log(a);

let b;
b = 0;
console.log(b);

class C {
    static {
        let a;
        a = 0;
        console.log(a);
    }
}

// `i` is redefined (not reassigned) on each loop step.
for (let i in [1, 2, 3]) {
    console.log(i);
}

// `a` is redefined (not reassigned) on each loop step.
for (let a of [1, 2, 3]) {
    console.log(a);
}
```

:::

以下是此规则的**正确**代码示例：

::: correct

```js
/*eslint prefer-const: "error"*/

// using const.
const a = 0;

// it's never initialized.
let b;
console.log(b);

// it's reassigned after initialized.
let c;
c = 0;
c = 1;
console.log(c);

// it's initialized in a different block from the declaration.
let d;
if (true) {
    d = 0;
}
console.log(d);

// it's initialized in a different scope.
let e;
class C {
    #x;
    static {
        e = obj => obj.#x;
    }
}

// it's initialized at a place that we cannot write a variable declaration.
let f;
if (true) f = 0;
console.log(f);

// `i` gets a new binding each iteration
for (const i in [1, 2, 3]) {
  console.log(i);
}

// `a` gets a new binding each iteration
for (const a of [1, 2, 3]) {
  console.log(a);
}

// `end` is never reassigned, but we cannot separate the declarations without modifying the scope.
for (let i = 0, end = 10; i < end; ++i) {
    console.log(i);
}

// `predicate` is only assigned once but cannot be separately declared as `const`
let predicate;
[object.type, predicate] = foo();

// `g` is only assigned once but cannot be separately declared as `const`
let g;
const h = {};
({ g, c: h.c } = func());

// suggest to use `no-var` rule.
var i = 3;
console.log(i);
```

:::

<a id="options"></a>

## 选项

```json
{
    "prefer-const": ["error", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
    }]
}
```

<a id="destructuring"></a>

### 解构赋值

解构赋值中变量的处理方式。
共有 2 个取值：

* `"any"`（默认）- 如果解构赋值中的任何变量应使用 `const`，此规则就会针对这些变量发出警告。
* `"all"` - 只有解构赋值中的所有变量都应使用 `const` 时，此规则才会针对这些变量发出警告；否则会忽略它们。

默认 `{"destructuring": "any"}` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-const: "error"*/

let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
a = a + 1;
```

:::

默认 `{"destructuring": "any"}` 选项下的**正确**代码示例：

::: correct

```js
/*eslint prefer-const: "error"*/

// using const.
const {a: a0, b} = obj;
const a = a0 + 1;

// all variables are reassigned.
let {c, d} = obj;
c = c + 1;
d = d + 1;
```

:::

`{"destructuring": "all"}` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-const: ["error", {"destructuring": "all"}]*/

// all of `a` and `b` should be const, so those are warned.
let {a, b} = obj;    /*error 'a' is never reassigned, use 'const' instead.
                             'b' is never reassigned, use 'const' instead.*/
```

:::

`{"destructuring": "all"}` 选项下的**正确**代码示例：

::: correct

```js
/*eslint prefer-const: ["error", {"destructuring": "all"}]*/

// 'b' is never reassigned, but all of `a` and `b` should not be const, so those are ignored.
let {a, b} = obj;
a = a + 1;
```

:::

<a id="ignorereadbeforeassign"></a>

### 赋值前读取时忽略

此选项用于避免与 `no-use-before-define` 规则（未设置 `"nofunc"` 选项时）发生冲突。
如果指定 `true`，此规则将忽略在声明与首次赋值之间被读取的变量。
默认值为 `false`。

`{"ignoreReadBeforeAssign": true}` 选项下的**正确**代码示例：

::: correct

```js
/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}]*/

let timer;
function initialize() {
    if (foo()) {
        clearInterval(timer);
    }
}
timer = setInterval(initialize, 100);
```

:::

默认 `{"ignoreReadBeforeAssign": false}` 选项下的**正确**代码示例：

::: correct

```js
/*eslint prefer-const: ["error", {"ignoreReadBeforeAssign": false}]*/

const timer = setInterval(initialize, 100);
function initialize() {
    if (foo()) {
        clearInterval(timer);
    }
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不希望收到关于初始赋值后从未被重新赋值的变量的提示，可以放心禁用此规则。
