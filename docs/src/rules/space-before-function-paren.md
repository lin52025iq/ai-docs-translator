---
title: space-before-function-paren
rule_type: layout
related_rules:
- keyword-spacing
---
格式化函数时，函数名或 `function` 关键字与左括号之间可以有空白。具名函数还要求 `function` 关键字与函数名之间有空格，而匿名函数则不需要空白。例如：

```js
function withoutSpace(x) {
    // ...
}

function withSpace (x) {
    // ...
}

var anonymousWithoutSpace = function() {};

var anonymousWithSpace = function () {};
```

某些代码风格指南要求匿名函数的 `function` 关键字后有空格，而另一些则规定不应有空白。同样，函数名后是否需要空格也因规范而异。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保函数括号前的空格保持一致，因此，只要空白与指定的偏好不符，就会发出警告。

<a id="options"></a>

## 选项

此规则有一个字符串选项或一个对象选项：

```js
{
    "space-before-function-paren": ["error", "always"],
    // or
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
    }],
}
```

* `always`（默认值）要求参数的 `(` 前有空格。
* `never` 禁止参数的 `(` 前出现空格。

为保持向后兼容，字符串选项不会检查异步箭头函数表达式。

你也可以为每种函数类型分别设置选项。以下每个选项都可以设为 `"always"`、`"never"` 或 `"ignore"`。默认值为 `"always"`。

* `anonymous` 用于匿名函数表达式（例如 `function () {}`）。
* `named` 用于具名函数表达式（例如 `function foo () {}`）。
* `asyncArrow` 用于异步箭头函数表达式（例如 `async () => {}`）。

### "always"

在此规则的默认选项 `"always"` 下，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint space-before-function-paren: "error"*/

function foo() {
    // ...
}

var bar = function() {
    // ...
};

var bar = function foo() {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var baz = {
    bar() {
        // ...
    }
};

var baz = async() => 1
```

:::

在此规则的默认选项 `"always"` 下，以下代码示例属于**正确**：

::: correct

```js
/*eslint space-before-function-paren: "error"*/

function foo () {
    // ...
}

var bar = function () {
    // ...
};

var bar = function foo () {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var baz = {
    bar () {
        // ...
    }
};

var baz = async () => 1
```

:::

### "never"

在此规则的选项为 `"never"` 时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", "never"]*/

function foo () {
    // ...
}

var bar = function () {
    // ...
};

var bar = function foo () {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var baz = {
    bar () {
        // ...
    }
};

var baz = async () => 1
```

:::

在此规则的选项为 `"never"` 时，以下代码示例属于**正确**：

::: correct

```js
/*eslint space-before-function-paren: ["error", "never"]*/

function foo() {
    // ...
}

var bar = function() {
    // ...
};

var bar = function foo() {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var baz = {
    bar() {
        // ...
    }
};

var baz = async() => 1
```

:::

### `{"anonymous": "always", "named": "never", "asyncArrow": "always"}`

在此规则的选项为 `{"anonymous": "always", "named": "never", "asyncArrow": "always"}` 时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}]*/

function foo () {
    // ...
}

var bar = function() {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var baz = {
    bar () {
        // ...
    }
};

var baz = async(a) => await a
```

:::

在此规则的选项为 `{"anonymous": "always", "named": "never", "asyncArrow": "always"}` 时，以下代码示例属于**正确**：

::: correct

```js
/*eslint space-before-function-paren: ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}]*/

function foo() {
    // ...
}

var bar = function () {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var baz = {
    bar() {
        // ...
    }
};

var baz = async (a) => await a
```

:::

### `{"anonymous": "never", "named": "always"}`

在此规则的选项为 `{"anonymous": "never", "named": "always"}` 时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "never", "named": "always" }]*/

function foo() {
    // ...
}

var bar = function () {
    // ...
};

class Foo {
    constructor() {
        // ...
    }
}

var baz = {
    bar() {
        // ...
    }
};
```

:::

在此规则的选项为 `{"anonymous": "never", "named": "always"}` 时，以下代码示例属于**正确**：

::: correct

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "never", "named": "always" }]*/

function foo () {
    // ...
}

var bar = function() {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var baz = {
    bar () {
        // ...
    }
};
```

:::

### `{"anonymous": "ignore", "named": "always"}`

在此规则的选项为 `{"anonymous": "ignore", "named": "always"}` 时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "ignore", "named": "always" }]*/

function foo() {
    // ...
}

class Foo {
    constructor() {
        // ...
    }
}

var baz = {
    bar() {
        // ...
    }
};
```

:::

在此规则的选项为 `{"anonymous": "ignore", "named": "always"}` 时，以下代码示例属于**正确**：

::: correct

```js
/*eslint space-before-function-paren: ["error", { "anonymous": "ignore", "named": "always" }]*/

var bar = function() {
    // ...
};

var bar = function () {
    // ...
};

function foo () {
    // ...
}

class Foo {
    constructor () {
        // ...
    }
}

var baz = {
    bar () {
        // ...
    }
};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不在意函数括号前空格的一致性，可以关闭此规则。
