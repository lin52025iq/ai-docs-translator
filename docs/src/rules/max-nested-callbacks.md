---
title: max-nested-callbacks
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-lines
- max-lines-per-function
- max-params
- max-statements
further_reading:
- https://book.mixu.net/node/ch7.html
- https://web.archive.org/web/20220104141150/https://howtonode.org/control-flow
- https://web.archive.org/web/20220127215850/https://howtonode.org/control-flow-part-ii
---


许多 JavaScript 库使用回调模式来管理异步操作。任何复杂度的程序都很可能需要管理多个并发级别各异的异步操作。一个很容易遇到的常见陷阱是嵌套回调：回调嵌套得越深，代码就越难阅读。

```js
foo(function () {
    bar(function () {
        baz(function() {
            qux(function () {

            });
        });
    });
});
```

<a id="rule-details"></a>

## 规则详情

此规则限制回调的最大嵌套深度，以提高代码清晰度。

<a id="options"></a>

## 选项

此规则接受数字或对象选项：

* `"max"`（默认值为 `10`）限制回调的最大嵌套深度
* `"checkConstructorCallCallbacks"`（默认值为 `false`）还会检查传递给构造函数调用的回调

**已弃用：** 对象属性 `maximum` 已弃用；请改用对象属性 `max`。

### max

启用 `{ "max": 3 }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint max-nested-callbacks: ["error", 3]*/

foo1(function() {
    foo2(function() {
        foo3(function() {
            foo4(function() {
                // Do something
            });
        });
    });
});
```

:::

启用 `{ "max": 3 }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint max-nested-callbacks: ["error", 3]*/

foo1(handleFoo1);

function handleFoo1() {
    foo2(handleFoo2);
}

function handleFoo2() {
    foo3(handleFoo3);
}

function handleFoo3() {
    foo4(handleFoo4);
}

function handleFoo4() {
    foo5();
}
```

:::

### checkConstructorCallCallbacks

启用 `{ "checkConstructorCallCallbacks": true }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint max-nested-callbacks: ["error", { "checkConstructorCallCallbacks": true, "max": 1 }]*/

setTimeout(() => {
    new Promise(function nested() {});
});
```

:::

启用 `{ "checkConstructorCallCallbacks": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint max-nested-callbacks: ["error", { "checkConstructorCallCallbacks": true, "max": 1 }]*/

function handler() {
    new Promise(() => {});
}

setTimeout(handler);
```

:::
