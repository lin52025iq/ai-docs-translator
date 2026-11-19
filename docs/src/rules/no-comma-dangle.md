---
title: no-comma-dangle

---

禁止在对象字面量和数组字面量中使用尾随逗号。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [comma-dangle](comma-dangle) 规则取代。
:::

根据 ECMAScript 5（以及 ECMAScript 3！）规范，对象字面量中的尾随逗号是有效的；不过，在 IE8（非 IE8 文档模式）及更早版本中，JavaScript 遇到尾随逗号时会报错。

```js
var foo = {
    bar: "baz",
    qux: "quux",
};
```

<a id="rule-details"></a>

## 规则详情

此规则旨在检测对象字面量中的尾随逗号。因此，只要在对象字面量中遇到尾随逗号，就会发出警告。

此规则的错误代码示例：

::: incorrect

```js
var foo = {
    bar: "baz",
    qux: "quux",
};

var arr = [1,2,];

foo({
  bar: "baz",
  qux: "quux",
});
```

:::

此规则的正确代码示例：

::: correct

```js
var foo = {
    bar: "baz",
    qux: "quux"
};

var arr = [1,2];

foo({
  bar: "baz",
  qux: "quux"
});
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你的代码不会在 IE8 或更早版本中运行（例如 Node.js 应用），并且你希望允许使用尾随逗号，请关闭此规则。
