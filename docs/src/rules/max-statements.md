---
title: max-statements
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
---


`max-statements` 规则允许你指定函数中允许的最大语句数。

```js
function foo() {
  const bar = 1; // one statement
  const baz = 2; // two statements
  const qux = 3; // three statements
}
```

<a id="rule-details"></a>

## 规则详情

此规则限制函数块中允许的最大语句数。

<a id="options"></a>

## 选项

此规则有一个数字或对象选项：

* `"max"`（默认值为 `10`）限制函数块中允许的最大语句数。

**已弃用：** 对象属性 `maximum` 已弃用；请改用对象属性 `max`。

此规则还有一个对象选项：

* `"ignoreTopLevelFunctions": true` 忽略顶层函数。

### max

使用默认选项 `{ "max": 10 }` 时，此规则的**错误**代码示例如下：

::: incorrect

```js
/*eslint max-statements: ["error", 10]*/

function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  const foo10 = 10;

  const foo11 = 11; // Too many.
}

const bar = () => {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  const foo10 = 10;

  const foo11 = 11; // Too many.
};
```

:::

使用默认选项 `{ "max": 10 }` 时，此规则的**正确**代码示例如下：

::: correct

```js
/*eslint max-statements: ["error", 10]*/

function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  return function () { // 10

    // The number of statements in the inner function does not count toward the
    // statement maximum.

    let bar;
    let baz;
    return 42;
  };
}

const bar = () => {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  return function () { // 10

    // The number of statements in the inner function does not count toward the
    // statement maximum.

    let bar;
    let baz;
    return 42;
  };
}
```

:::

请注意，此规则不适用于类静态代码块，并且类静态代码块中的语句不计入外层函数的语句数。

使用选项 `{ "max": 2 }` 时，此规则的**正确**代码示例如下：

::: correct

```js
/*eslint max-statements: ["error", 2]*/

function foo() {
    let one;
    let two = class {
        static {
            let three;
            let four;
            let five;
            if (six) {
                let seven;
                let eight;
                let nine;
            }
        }
    };
}
```

:::

### ignoreTopLevelFunctions

使用选项 `{ "max": 10 }, { "ignoreTopLevelFunctions": true }` 时，此规则的其他**正确**代码示例如下：

::: correct

```js
/*eslint max-statements: ["error", 10, { "ignoreTopLevelFunctions": true }]*/

function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  const foo10 = 10;
  const foo11 = 11;
}
```

:::
