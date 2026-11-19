---
title: func-names
rule_type: suggestion
further_reading:
- https://web.archive.org/web/20201112040809/http://markdaggett.com/blog/2013/02/15/functions-explained/
- https://2ality.com/2015/09/function-names-es6.html
---


一种日益常见的做法是为函数表达式命名，以便调试。例如：

```js
Foo.prototype.bar = function bar() {};
```

上例中第二个 `bar` 是可选的。如果省略函数名，当函数抛出异常时，堆栈跟踪中很可能会显示类似 `anonymous function` 的内容。如果为函数表达式指定可选的名称，堆栈跟踪中就会显示该函数表达式的名称。

<a id="rule-details"></a>

## 规则详情

此规则可以强制要求或禁止使用命名函数表达式。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"always"`（默认值）要求函数表达式必须有名称。
* `"as-needed"` 要求函数表达式有名称，但如果根据 ECMAScript 规范会自动分配名称，则不作要求。
* `"never"` 禁止命名函数表达式，但递归函数需要名称，因此例外。

此规则还有一个对象选项：

* `"generators": "always" | "as-needed" | "never"`
    * `"always"` 要求生成器必须命名。
    * `"as-needed"` 要求生成器必须命名，但如果根据 ECMAScript 规范会自动分配名称，则不作要求。
    * `"never"` 尽可能禁止为生成器命名。

如果未为 `generators` 指定值，生成器函数的行为将回退到基础选项。

请注意，`"always"` 和 `"as-needed"` 都要求 `export default` 声明中的函数表达式和函数声明必须有名称。

<a id="always"></a>

### 始终命名

此规则使用默认的 `"always"` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint func-names: ["error", "always"]*/

Foo.prototype.bar = function() {};

const cat = {
  meow: function() {}
}

(function() {
    // ...
}())

export default function() {}
```

:::

此规则使用默认的 `"always"` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint func-names: ["error", "always"]*/

Foo.prototype.bar = function bar() {};

const cat = {
  meow() {}
}

(function bar() {
    // ...
}())

export default function foo() {}
```

:::

<a id="as-needed"></a>

### 按需命名

ECMAScript 6 为所有函数引入了 `name` 属性。`name` 的值由函数周围的代码决定，具体来说，是通过检查能否推断出名称来确定的。例如，赋值给变量的函数会自动获得一个 `name` 属性，其值与变量名相同。之后，`name` 的值会用于堆栈跟踪，便于调试。

此规则使用 `"as-needed"` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint func-names: ["error", "as-needed"]*/

Foo.prototype.bar = function() {};

(function() {
    // ...
}())

export default function() {}
```

:::

此规则使用 `"as-needed"` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint func-names: ["error", "as-needed"]*/

const bar = function() {};

const cat = {
  meow: function() {}
}

class C {
    #bar = function() {};
    baz = function() {};
}

quux ??= function() {};

(function bar() {
    // ...
}())

export default function foo() {}
```

:::

<a id="never"></a>

### 从不命名

此规则使用 `"never"` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint func-names: ["error", "never"]*/

Foo.prototype.bar = function bar() {};

(function bar() {
    // ...
}())
```

:::

此规则使用 `"never"` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint func-names: ["error", "never"]*/

Foo.prototype.bar = function() {};

(function() {
    // ...
}())
```

:::

<a id="generators"></a>

### 生成器

此规则使用 `"always", { "generators": "as-needed" }` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint func-names: ["error", "always", { "generators": "as-needed" }]*/

(function*() {
    // ...
}())
```

:::

此规则使用 `"always", { "generators": "as-needed" }` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint func-names: ["error", "always", { "generators": "as-needed" }]*/

const foo = function*() {};
```

:::

此规则使用 `"always", { "generators": "never" }` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint func-names: ["error", "always", { "generators": "never" }]*/

const foo = bar(function *baz() {});
```

:::

此规则使用 `"always", { "generators": "never" }` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint func-names: ["error", "always", { "generators": "never" }]*/

const foo = bar(function *() {});
```

:::

此规则使用 `"as-needed", { "generators": "never" }` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint func-names: ["error", "as-needed", { "generators": "never" }]*/

const foo = bar(function *baz() {});
```

:::

此规则使用 `"as-needed", { "generators": "never" }` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint func-names: ["error", "as-needed", { "generators": "never" }]*/

const foo = bar(function *() {});
```

:::

此规则使用 `"never", { "generators": "always" }` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint func-names: ["error", "never", { "generators": "always" }]*/

const foo = bar(function *() {});
```

:::

此规则使用 `"never", { "generators": "always" }` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint func-names: ["error", "never", { "generators": "always" }]*/

const foo = bar(function *baz() {});
```

:::

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[requireAnonymousFunctions](https://jscs-dev.github.io/rule/requireAnonymousFunctions)
* **JSCS**：[disallowAnonymousFunctions](https://jscs-dev.github.io/rule/disallowAnonymousFunctions)
