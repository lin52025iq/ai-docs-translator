---
title: keyword-spacing
rule_type: layout
---
JavaScript 关键字是语法元素，例如 `try` 和 `if`。
这些关键字在语言中有特殊含义，因此通常会在代码编辑器中以不同颜色显示。
作为语言的重要组成部分，代码风格指南通常会规定关键字周围应如何使用空格。
例如，某份代码风格指南可能规定关键字两侧都必须有空格，这意味着 `if-else` 语句必须写成这样：

```js
if (foo) {
    // ...
} else {
    // ...
}
```

当然，你也可以使用禁止在关键字周围添加空格的代码风格指南。

不过，如果你想强制规定 `function` 关键字与其后左括号之间的空格风格，请参阅 [space-before-function-paren](space-before-function-paren)。

<a id="rule-details"></a>

## 规则详情

此规则要求关键字及类似关键字的标记周围的空格保持一致：`as`（在模块声明中）、`async`（用于异步函数）、`await`（用于 await 表达式）、`break`、`case`、`catch`、`class`、`const`、`continue`、`debugger`、`default`、`delete`、`do`、`else`、`export`、`extends`、`finally`、`for`、`from`（在模块声明中）、`function`、`get`（用于 getter）、`if`、`import`、`in`（用于 for-in 语句）、`let`、`new`、`of`（用于 for-of 语句）、`return`、`set`（用于 setter）、`static`、`super`、`switch`、`this`、`throw`、`try`、`typeof`、`var`、`void`、`while`、`with` 和 `yield`。此规则经过精心设计，不会与其他空格规则冲突：如果其他规则会报告问题，则此规则不会检查相应位置的空格。

<a id="options"></a>

## 选项

此规则接受一个对象选项：

* `"before": true`（默认值）要求关键字前至少有一个空格
* `"before": false` 禁止关键字前有空格
* `"after": true`（默认值）要求关键字后至少有一个空格
* `"after": false` 禁止关键字后有空格
* `"overrides"` 可针对指定关键字覆盖空格风格

<a id="before"></a>

### before

使用默认选项 `{ "before": true }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "before": true }]*/

if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}
```

:::

使用默认选项 `{ "before": true }` 时，此规则的正确代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint keyword-spacing: ["error", { "before": true }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}

// Avoid conflict with `array-bracket-spacing`
let a = [this];
let b = [function() {}];

// Avoid conflict with `arrow-spacing`
let c = ()=> this.foo;

// Avoid conflict with `block-spacing`
{function foo() {}}

// Avoid conflict with `comma-spacing`
let d = [100,this.foo, this.bar];

// Avoid conflict with `computed-property-spacing`
obj[this.foo] = 0;

// Avoid conflict with `generator-star-spacing`
function *bar() {}

// Avoid conflict with `key-spacing`
let obj1 = {
    foo:function() {}
};

// Avoid conflict with `object-curly-spacing`
let obj2 = {foo: this};

// Avoid conflict with `semi-spacing`
let e = this;function foo() {}

// Avoid conflict with `space-in-parens`
(function () {})();

// Avoid conflict with `space-infix-ops`
if ("foo"in {foo: 0}) {}
if (10+this.foo<= this.bar) {}

// Avoid conflict with `jsx-curly-spacing`
let f = <A foo={this.foo} bar={function(){}} />
```

:::

使用选项 `{ "before": false }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "before": false }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}
```

:::

使用选项 `{ "before": false }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "before": false }]*/

if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}
```

:::

<a id="after"></a>

### after

使用默认选项 `{ "after": true }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "after": true }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else{
    //...
}
```

:::

使用默认选项 `{ "after": true }` 时，此规则的正确代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint keyword-spacing: ["error", { "after": true }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}

// Avoid conflict with `array-bracket-spacing`
let a = [this];

// Avoid conflict with `arrow-spacing`
let b = ()=> this.foo;

// Avoid conflict with `comma-spacing`
let c = [100, this.foo, this.bar];

// Avoid conflict with `computed-property-spacing`
obj[this.foo] = 0;

// Avoid conflict with `generator-star-spacing`
function* foo() {}

// Avoid conflict with `key-spacing`
let obj1 = {
    foo:function() {}
};

// Avoid conflict with `func-call-spacing`
class A extends B {
    constructor() {
        super();
    }
}

// Avoid conflict with `object-curly-spacing`
let obj2 = {foo: this};

// Avoid conflict with `semi-spacing`
let d = this;function bar() {}

// Avoid conflict with `space-before-function-paren`
(function() {})();

// Avoid conflict with `space-infix-ops`
if ("foo"in{foo: 0}) {}
if (10+this.foo<= this.bar) {}

// Avoid conflict with `space-unary-ops`
function* baz(a) {
    return yield+a;
}

// Avoid conflict with `yield-star-spacing`
function* qux(a) {
    return yield* a;
}

// Avoid conflict with `jsx-curly-spacing`
let e = <A foo={this.foo} bar={function(){}} />
```

:::

使用选项 `{ "after": false }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint keyword-spacing: ["error", { "after": false }]*/

if (foo) {
    //...
} else if (bar) {
    //...
} else {
    //...
}
```

:::

使用选项 `{ "after": false }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "after": false }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else{
    //...
}
```

:::

<a id="overrides"></a>

### overrides

使用选项 `{ "overrides": { "if": { "after": false }, "for": { "after": false }, "while": { "after": false }, "static": { "after": false }, "as": { "after": false } } }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint keyword-spacing: ["error", { "overrides": {
  "if": { "after": false },
  "for": { "after": false },
  "while": { "after": false },
  "static": { "after": false },
  "as": { "after": false }
} }]*/

if(foo) {
    //...
} else if(bar) {
    //...
} else {
    //...
}

for(;;);

while(true) {
    //...
}

class C {
    static{
        //...
    }
}

export { C as"my class" };
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不想强制要求关键字周围的空格保持一致，可以安全地禁用此规则。
