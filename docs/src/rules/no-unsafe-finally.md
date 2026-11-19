---
title: no-unsafe-finally
rule_type: problem
---



JavaScript 会暂停 `try` 和 `catch` 块中的控制流语句，直到 `finally` 块执行完毕。因此，在 `finally` 中使用 `return`、`throw`、`break` 或 `continue` 时，`try` 和 `catch` 中的控制流语句会被覆盖，这被认为是意外行为。例如：

```js
// We expect this function to return 1;
(() => {
    try {
        return 1; // 1 is returned but suspended until finally block ends
    } catch(err) {
        return 2;
    } finally {
        return 3; // 3 is returned before 1, which we did not expect
    }
})();

// > 3
```

```js
// We expect this function to throw an error, then return
(() => {
    try {
        throw new Error("Try"); // error is thrown but suspended until finally block ends
    } finally {
        return 3; // 3 is returned before the error is thrown, which we did not expect
    }
})();

// > 3
```

```js
// We expect this function to throw Try(...) error from the catch block
(() => {
    try {
        throw new Error("Try")
    } catch(err) {
        throw err; // The error thrown from try block is caught and rethrown
    } finally {
        throw new Error("Finally"); // Finally(...) is thrown, which we did not expect
    }
})();

// > Uncaught Error: Finally(...)
```

```js
// We expect this function to return 0 from try block.
(() => {
  label: try {
    return 0; // 0 is returned but suspended until finally block ends
  } finally {
    break label; // It breaks out the try-finally block, before 0 is returned.
  }
  return 1;
})();

// > 1
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在 `finally` 块中使用 `return`、`throw`、`break` 和 `continue` 语句。此规则允许间接使用这些语句，例如在 `function` 或 `class` 定义中使用。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        return 3;
    }
};
```

:::

::: incorrect

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        throw new Error;
    }
};
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        console.log("hola!");
    }
};
```

:::

::: correct

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        let a = function() {
            return "hola!";
        }
    }
};
```

:::

::: correct

```js
/*eslint no-unsafe-finally: "error"*/
let foo = function(a) {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        switch(a) {
            case 1: {
                console.log("hola!")
                break;
            }
        }
    }
};
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你希望允许在 `finally` 块中执行控制流操作，可以关闭此规则。

请注意，在生成器函数中[将 `return` 与 `try`/`finally` 配合使用](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return#using_return_with_try...finally)，可以覆盖返回值。
如果你想使用生成器函数的这一特性，可以通过 `eslint-disable` 注释禁用此规则。
