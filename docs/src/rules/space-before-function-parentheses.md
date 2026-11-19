---
title: space-before-function-parentheses

related_rules:
- space-after-keywords
- space-return-throw-case
---

此规则用于确保函数定义中左括号前的空格用法一致。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [space-before-function-paren](space-before-function-paren) 规则取代。为与其他规则名称保持一致，该规则的名称从 “parentheses” 改为 “paren”。
:::

格式化函数时，函数名或 `function` 关键字与左括号之间可以有空格。具名函数的 `function` 关键字与函数名之间也必须有空格，而匿名函数则不需要空格。例如：

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

有些风格指南要求匿名函数的 `function` 关键字后有空格，而另一些则规定不加空格。同样，函数名后是否需要空格也因风格指南而异。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保函数括号前的空格用法一致，因此当空格与指定的偏好不符时会发出警告。

此规则接受一个参数。如果参数为默认选项 `"always"`，则所有具名函数和匿名函数的函数括号前都必须有空格。如果参数为 `"never"`，则所有具名函数和匿名函数的函数括号前都不得有空格。如果希望具名函数和匿名函数使用不同的空格规则，可以将配置对象作为规则参数，分别进行配置（例如 `{"anonymous": "always", "named": "never"}`）。

使用默认选项 `"always"` 时，此规则的**错误**代码示例：

::: incorrect

```js
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
```

:::

使用默认选项 `"always"` 时，此规则的**正确**代码示例：

::: correct

```js
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
```

:::

使用选项 `"never"` 时，此规则的**错误**代码示例：

::: incorrect

```js
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
```

:::

使用选项 `"never"` 时，此规则的**正确**代码示例：

::: correct

```js
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
```

:::

使用选项 `{"anonymous": "always", "named": "never"}` 时，此规则的**错误**代码示例：

::: incorrect

```js
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

使用选项 `{"anonymous": "always", "named": "never"}` 时，此规则的**正确**代码示例：

::: correct

```js
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

使用选项 `{"anonymous": "never", "named": "always"}` 时，此规则的**错误**代码示例：

::: incorrect

```js
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

使用选项 `{"anonymous": "never", "named": "always"}` 时，此规则的**正确**代码示例：

::: correct

```js
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

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不关心函数括号前空格的一致性，可以关闭此规则。
