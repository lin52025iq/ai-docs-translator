---
title: no-useless-computed-key
rule_type: suggestion
---



对于如下使用字面量的计算属性，使用方括号是多余的：

```js
const foo = {["a"]: "b"};
```

可以将代码改写为：

```js
const foo = {"a": "b"};
```

<a id="rule-details"></a>

## 规则详情

此规则禁止不必要地使用计算属性键。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-useless-computed-key: "error"*/

const a = { ['0']: 0 };
const b = { ['0+1,234']: 0 };
const c = { [0]: 0 };
const d = { ['x']: 0 };
const e = { ['x']() {} };

const { [0]: foo } = obj;
const { ['x']: bar } = obj;

class Foo {
    ["foo"] = "bar";

    [0]() {}
    ['a']() {}
    get ['b']() {}
    set ['c'](value) {}

    static ["foo"] = "bar";

    static ['a']() {}
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-useless-computed-key: "error"*/

const a = { 'a': 0 };
const b = { 0: 0 };
const c = { x() {} };
const d = { a: 0 };
const e = { '0+1,234': 0 };

const { 0: foo } = obj;
const { 'x': bar } = obj;

class Foo {
    "foo" = "bar";

    0() {}
    'a'() {}
    get 'b'() {}
    set 'c'(value) {}

    static "foo" = "bar";

    static 'a'() {}
}
```

:::

此规则的其他正确代码示例：

::: correct

```js
/*eslint no-useless-computed-key: "error"*/

const c = {
    "__proto__": foo, // defines object's prototype

    ["__proto__"]: bar // defines a property named "__proto__"
};

class Foo {
    ["constructor"]; // instance field named "constructor"

    "constructor"() {} // the constructor of this class

    ["constructor"]() {} // method named "constructor"

    static ["constructor"]; // static field named "constructor"

    static ["prototype"]; // runtime error, it would be a parsing error without `[]`
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* 将 `enforceForClassMembers` 设为 `false` 可对类成员禁用此规则（默认为 `true`）。

### enforceForClassMembers

默认情况下，此规则也会检查类声明和类表达式，因为 `enforceForClassMembers` 的默认值为 `true`。

将 `enforceForClassMembers` 设为 `false` 时，此规则允许在类字段、类方法、类 getter 和类 setter 中使用不必要的计算属性键。

使用 `{ "enforceForClassMembers": false }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": false }]*/

const obj = {
    ["foo"]: "bar",
    [42]: "baz",

    ['a']() {},
    get ['b']() {},
    set ['c'](value) {}
};
```

:::

使用 `{ "enforceForClassMembers": false }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": false }]*/

class SomeClass {
    ["foo"] = "bar";
    [42] = "baz";

    ['a']() {}
    get ['b']() {}
    set ['c'](value) {}

    static ["foo"] = "bar";
    static ['baz']() {}
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不希望收到有关不必要的计算属性键的提示，可以放心地禁用此规则。
