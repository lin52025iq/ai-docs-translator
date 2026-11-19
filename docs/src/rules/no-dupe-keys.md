---
title: no-dupe-keys
rule_type: problem
handled_by_typescript: true
---



对象字面量中存在多个键相同的属性，可能会导致应用程序出现意外行为。

```js
const foo = {
    bar: "baz",
    bar: "qux"
};
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在对象字面量中使用重复的键。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-dupe-keys: "error"*/

const foo = {
    bar: "baz",
    bar: "qux"
};

const bar = {
    "bar": "baz",
    bar: "qux"
};

const baz = {
    0x1: "baz",
    1: "qux"
};
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-dupe-keys: "error"*/

const foo = {
    bar: "baz",
    quxx: "qux"
};

const obj = {
    "__proto__": baz, // defines object's prototype
    ["__proto__"]: qux // defines a property named "__proto__"
};
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
