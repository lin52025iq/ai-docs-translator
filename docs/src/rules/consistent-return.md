---
title: consistent-return
rule_type: suggestion
---


与会强制函数返回指定类型值的静态类型语言不同，JavaScript 允许函数中的不同代码路径返回不同类型的值。

JavaScript 中一个容易令人困惑的地方是：如果满足以下任一条件，函数就会返回 `undefined`：

* 函数退出前没有执行 `return` 语句。
* 函数执行了 `return`，但没有显式指定值。
* 函数执行了 `return undefined`。
* 函数执行了 `return void`，后面跟着一个表达式（例如函数调用）。
* 函数执行了 `return`，后面跟着其他任何求值结果为 `undefined` 的表达式。

如果函数中的某些代码路径显式返回了值，而另一些代码路径没有显式返回值，这可能是类型错误，尤其是在大型函数中。以下示例中：

* 一条经过函数的代码路径返回布尔值 `true`。
* 另一条代码路径没有显式返回值，因此会隐式返回 `undefined`。

```js
function doSomething(condition) {
    if (condition) {
        return true;
    } else {
        return;
    }
}
```

<a id="rule-details"></a>

## 规则详情

此规则要求 `return` 语句始终指定值，或者始终不指定值。此规则会忽略名称以大写字母开头的函数定义，因为构造函数（通过 `new` 运算符调用时）如果没有显式返回其他对象，就会隐式返回已实例化的对象。

此规则的错误代码示例：

::: incorrect

```js
/*eslint consistent-return: "error"*/

function doSomething(condition) {
    if (condition) {
        return true;
    } else {
        return;
    }
}

function doSomethingElse(condition) {
    if (condition) {
        return true;
    }
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint consistent-return: "error"*/

function doSomething(condition) {
    if (condition) {
        return true;
    } else {
        return false;
    }
}

function Foo() {
    if (!(this instanceof Foo)) {
        return new Foo();
    }

    this.a = 0;
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"treatUndefinedAsUnspecified": false`（默认值）：始终指定返回值，或者只隐式返回 `undefined`。
* `"treatUndefinedAsUnspecified": true`：始终指定返回值，或者显式或隐式返回 `undefined`。

### treatUndefinedAsUnspecified

使用默认选项 `{ "treatUndefinedAsUnspecified": false }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": false }]*/

function foo(callback) {
    if (callback) {
        return void callback();
    }
    // no return statement
}

function bar(condition) {
    if (condition) {
        return undefined;
    }
    // no return statement
}
```

:::

使用选项 `{ "treatUndefinedAsUnspecified": true }` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }]*/

function foo(callback) {
    if (callback) {
        return void callback();
    }
    return true;
}

function bar(condition) {
    if (condition) {
        return undefined;
    }
    return true;
}
```

:::

使用选项 `{ "treatUndefinedAsUnspecified": true }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }]*/

function foo(callback) {
    if (callback) {
        return void callback();
    }
    // no return statement
}

function bar(condition) {
    if (condition) {
        return undefined;
    }
    // no return statement
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你希望函数根据代码分支采用不同的 `return` 行为，那么可以安全地禁用此规则。
