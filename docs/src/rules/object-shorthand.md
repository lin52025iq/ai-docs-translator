---
title: object-shorthand
rule_type: suggestion
related_rules:
- no-useless-rename
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
---



ECMAScript 6 提供了一种简洁的语法，用于定义对象字面量的方法和属性。这种语法可以让复杂对象字面量的定义更加简洁。

下面是几个使用 ES5 语法的常见示例：

```js
// properties
const foo = {
    x: x,
    y: y,
    z: z,
};

// methods
const bar = {
    a: function() {},
    b: function() {}
};
```

以下是对应的 ES6 写法：

```js
// properties
const foo = {x, y, z};

// methods
const bar = {
    a() {},
    b() {}
};
```

<a id="rule-details"></a>

## 规则详情

此规则要求使用简写语法。它适用于对象字面量中定义的所有方法（包括生成器），以及键名与所赋值变量名相同的所有属性。

以下属性都会触发警告：

```js
/*eslint object-shorthand: "error"*/

const foo = {
    w: function() {},
    x: function *() {},
    [y]: function() {},
    z: z
};
```

在这种情况下，预期的语法如下：

```js
/*eslint object-shorthand: "error"*/

const foo = {
    w() {},
    *x() {},
    [y]() {},
    z
};
```

此规则不会标记对象字面量中的箭头函数。以下代码*不会*触发警告：

```js
/*eslint object-shorthand: "error"*/

const foo = {
    x: (y) => y
};
```

<a id="options"></a>

## 选项

此规则接受一个选项，用于指定何时应用此规则。该选项可以设为以下值之一：

* `"always"`（默认值）要求在任何可能的情况下都使用简写形式。
* `"methods"` 要求使用方法简写形式（也适用于生成器）。
* `"properties"` 要求使用属性简写形式（键名与变量名相同时）。
* `"never"` 要求对象字面量中不使用任何属性或方法简写形式。
* `"consistent"` 要求对象字面量中统一使用简写形式或完整形式。
* `"consistent-as-needed"` 要求对象字面量中统一使用简写形式或完整形式，但在任何可能的情况下都使用简写形式。

可以像这样在配置中设置该选项：

```json
{
    "object-shorthand": ["error", "always"]
}
```

此外，此规则还接受一个可选的对象配置：

* `"avoidQuotes": true` 表示对象键为字符串字面量时优先使用完整语法（默认值：`false`）。请注意，只有当字符串选项设为 `"always"`、`"methods"` 或 `"properties"` 时，才能启用此选项。
* `"ignoreConstructors": true` 可用于阻止此规则报告构造函数相关错误。（默认情况下，此规则对构造函数和其他函数一视同仁。）请注意，只有当字符串选项设为 `"always"` 或 `"methods"` 时，才能启用此选项。
* `"methodsIgnorePattern"`（`string`）对于名称匹配此正则表达式模式的方法，不强制使用方法简写形式。请注意，只有当字符串选项设为 `"always"` 或 `"methods"` 时，才能使用此选项。
* `"avoidExplicitReturnArrows": true` 表示函数属性优先使用方法，而不是显式返回值的箭头函数。（默认情况下，此规则允许使用其中任一种形式。）请注意，只有当字符串选项设为 `"always"` 或 `"methods"` 时，才能启用此选项。

当 `"never"` 或 `"avoidQuotes"` 会要求使用完整语法时，如果对象方法为 `super` 引用提供绑定，则会被忽略，因为将其转换为完整语法会生成无效的 JavaScript。

### avoidQuotes

```json
{
    "object-shorthand": ["error", "always", { "avoidQuotes": true }]
}
```

在此规则的 `"always", { "avoidQuotes": true }` 选项下，以下代码是**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/

const foo = {
    "bar-baz"() {}
};
```

:::

在此规则的 `"always", { "avoidQuotes": true }` 选项下，以下代码是**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "avoidQuotes": true }]*/

const foo = {
    "bar-baz": function() {},
    "qux": qux
};
```

:::

### ignoreConstructors

```json
{
    "object-shorthand": ["error", "always", { "ignoreConstructors": true }]
}
```

在此规则的 `"always", { "ignoreConstructors": true }` 选项下，以下代码是**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "ignoreConstructors": true }]*/

const foo = {
    ConstructorFunction: function() {}
};
```

:::

```json
{
    "object-shorthand": ["error", "methods", { "ignoreConstructors": false }]
}
```

在此规则的 `"methods", { "ignoreConstructors": false }` 选项下，以下代码是**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: ["error", "methods", { "ignoreConstructors": false }]*/

const foo = {
	"ConstructorFunction": function() {}
};
```

:::

在此规则的 `"methods", { "ignoreConstructors": false }` 选项下，以下代码是**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "methods", { "ignoreConstructors": false }]*/

const foo = {
	"ConstructorFunction"() {}
};
```

:::

### methodsIgnorePattern

在此规则的 `"always", { "methodsIgnorePattern": "^bar$" }` 选项下，以下代码是**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "methodsIgnorePattern": "^bar$" }]*/

const foo = {
    bar: function() {}
};
```

:::

### avoidExplicitReturnArrows

```json
{
    "object-shorthand": ["error", "always", { "avoidExplicitReturnArrows": true }]
}
```

在此规则的 `"always", { "avoidExplicitReturnArrows": true }` 选项下，以下代码是**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/

const foo = {
  foo: (bar, baz) => {
    return bar + baz;
  },

  qux: (foobar) => {
    return foobar * 2;
  }
};
```

:::

在此规则的 `"always", { "avoidExplicitReturnArrows": true }` 选项下，以下代码是**正确**示例：

::: correct

```js
/*eslint object-shorthand: ["error", "always", { "avoidExplicitReturnArrows": true }]*/

const foo = {
  foo(bar, baz) {
    return bar + baz;
  },

  qux: foobar => foobar * 2
};
```

:::

在此规则的 `"consistent"` 选项下，以下代码是**错误**示例：

::: incorrect

```js
/*eslint object-shorthand: [2, "consistent"]*/

const foo = {
    a,
    b: "foo",
};
```

:::

在此规则的 `"consistent"` 选项下，以下代码是**正确**示例：

::: correct

```js
/*eslint object-shorthand: [2, "consistent"]*/

const foo = {
    a: a,
    b: "foo"
};

const bar = {
    a,
    b,
};
```

:::

以下代码是 `"consistent-as-needed"` 选项下的**错误**示例，该选项与 `"consistent"` 非常相似：

::: incorrect

```js
/*eslint object-shorthand: [2, "consistent-as-needed"]*/

const foo = {
    a: a,
    b: b,
};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

尚未使用 ES6 环境的用户不应应用此规则。其他用户可能会觉得简写语法过于简洁，难以阅读，因此不希望通过此规则鼓励使用简写语法。
