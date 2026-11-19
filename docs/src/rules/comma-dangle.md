---
title: comma-dangle
rule_type: layout
---
根据 ECMAScript 5（以及 ECMAScript 3！）规范，对象字面量中的尾随逗号是有效的。不过，IE8（非 IE8 文档模式下）及更早版本在 JavaScript 中遇到尾随逗号时会报错。

```js
var foo = {
    bar: "baz",
    qux: "quux",
};
```

尾随逗号可以简化向对象和数组中添加或删除项目的操作，因为只需修改对应的行即可。
支持使用尾随逗号的另一个理由是：在对象或数组中添加或删除项目时，它能让差异更加清晰：

不够清晰：

```diff
 var foo = {
-    bar: "baz",
-    qux: "quux"
+    bar: "baz"
 };
```

更加清晰：

```diff
 var foo = {
     bar: "baz",
-    qux: "quux",
 };
```

<a id="rule-details"></a>

## 规则详情

此规则要求在对象和数组字面量中一致地使用尾随逗号。

<a id="options"></a>

## 选项

此规则可以使用字符串选项或对象选项：

```json
{
    "comma-dangle": ["error", "never"],
    // or
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "never"
    }]
}
```

* `"never"`（默认）禁止使用尾随逗号
* `"always"` 要求使用尾随逗号
* `"always-multiline"` 要求当最后一个元素或属性与闭合的 `]` 或 `}` 位于*不同*行时使用尾随逗号；当最后一个元素或属性与闭合的 `]` 或 `}` 位于*同一*行时，则禁止使用尾随逗号
* `"only-multiline"` 允许（但不要求）当最后一个元素或属性与闭合的 `]` 或 `}` 位于*不同*行时使用尾随逗号；当最后一个元素或属性与闭合的 `]` 或 `}` 位于*同一*行时，则禁止使用尾随逗号

你也可以使用对象选项，分别为每种语法配置此规则。
以下每个选项都可以设置为 `"never"`、`"always"`、`"always-multiline"`、`"only-multiline"` 或 `"ignore"`。
除非另有说明，每个选项的默认值均为 `"never"`。

* `arrays` 用于数组字面量和解构数组模式。（例如 `let [a,] = [1,];`）
* `objects` 用于对象字面量和解构对象模式。（例如 `let {a,} = {a: 1};`）
* `imports` 用于 ES 模块的导入声明。（例如 `import {a,} from "foo";`）
* `exports` 用于 ES 模块的导出声明。（例如 `export {a,};`）
* `functions` 用于函数声明和函数调用。（例如 `(function(a,){ })(b,);`）
    * 只有在对 ECMAScript 2017 或更高版本进行代码检查时，才应启用 `functions`。

<a id="never"></a>

### never

使用默认选项 `"never"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "never"]*/

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

使用默认选项 `"never"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-dangle: ["error", "never"]*/

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

<a id="always"></a>

### always

使用选项 `"always"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "always"]*/

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

使用选项 `"always"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-dangle: ["error", "always"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var arr = [1,2,];

foo({
  bar: "baz",
  qux: "quux",
},);
```

:::

<a id="always-multiline"></a>

### always-multiline

使用选项 `"always-multiline"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "always-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux"
};

var foo = { bar: "baz", qux: "quux", };

var arr = [1,2,];

var arr = [1,
    2,];

var arr = [
    1,
    2
];

foo({
  bar: "baz",
  qux: "quux"
});
```

:::

使用选项 `"always-multiline"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-dangle: ["error", "always-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {bar: "baz", qux: "quux"};
var arr = [1,2];

var arr = [1,
    2];

var arr = [
    1,
    2,
];

foo({
  bar: "baz",
  qux: "quux",
});
```

:::

<a id="only-multiline"></a>

### only-multiline

使用选项 `"only-multiline"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", "only-multiline"]*/

var foo = { bar: "baz", qux: "quux", };

var arr = [1,2,];

var arr = [1,
    2,];

```

:::

使用选项 `"only-multiline"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-dangle: ["error", "only-multiline"]*/

var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {
    bar: "baz",
    qux: "quux"
};

var foo = {bar: "baz", qux: "quux"};
var arr = [1,2];

var arr = [1,
    2];

var arr = [
    1,
    2,
];

var arr = [
    1,
    2
];

foo({
  bar: "baz",
  qux: "quux",
});

foo({
  bar: "baz",
  qux: "quux"
});
```

:::

<a id="functions"></a>

### functions

使用选项 `{"functions": "never"}` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", {"functions": "never"}]*/

function foo(a, b,) {
}

foo(a, b,);
new foo(a, b,);
```

:::

使用选项 `{"functions": "never"}` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-dangle: ["error", {"functions": "never"}]*/

function foo(a, b) {
}

foo(a, b);
new foo(a, b);
```

:::

使用选项 `{"functions": "always"}` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint comma-dangle: ["error", {"functions": "always"}]*/

function foo(a, b) {
}

foo(a, b);
new foo(a, b);
```

:::

使用选项 `{"functions": "always"}` 时，此规则的正确代码示例：

:::correct

```js
/*eslint comma-dangle: ["error", {"functions": "always"}]*/

function foo(a, b,) {
}

foo(a, b,);
new foo(a, b,);
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不在意尾随逗号，可以关闭此规则。
