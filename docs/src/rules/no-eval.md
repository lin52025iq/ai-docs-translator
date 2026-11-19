---
title: no-eval
rule_type: suggestion
related_rules:
- no-implied-eval
further_reading:
- https://ericlippert.com/2003/11/01/eval-is-evil-part-one/
- https://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/
---


JavaScript 的 `eval()` 函数可能具有危险性，而且经常被误用。对不可信代码使用 `eval()` 可能会使程序遭受多种注入攻击。在大多数情况下，可以用更好的替代方案来解决问题，而无需使用 `eval()`。

```js
const obj = { x: "foo" },
    key = "x",
    value = eval("obj." + key);
```

<a id="rule-details"></a>

## 规则详情

此规则旨在通过禁止使用 `eval()` 函数，避免可能具有危险性、不必要且运行缓慢的代码。因此，每当使用 `eval()` 函数时，都会发出警告。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-eval: "error"*/

const obj = { x: "foo" },
    key = "x",
    value = eval("obj." + key);

(0, eval)("const a = 0");

const foo = eval;
foo("const a = 0");

// This `this` is the global object.
this.eval("const a = 0");
```

:::

使用 `window` 全局变量时，此规则的其他错误代码示例：

::: incorrect

```js
/*eslint no-eval: "error"*/
/*global window*/

window.eval("const a = 0");
```

:::

使用 `global` 全局变量时，此规则的其他错误代码示例：

::: incorrect

```js
/*eslint no-eval: "error"*/
/*global global*/

global.eval("const a = 0");
```

:::

此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-eval: "error"*/

const obj = { x: "foo" },
    key = "x",
    value = obj[key];

class A {
    foo() {
        // This is a user-defined method.
        this.eval("const a = 0");
    }

    eval() {
    }

    static {
        // This is a user-defined static method.
        this.eval("const a = 0");
    }

    static eval() {
    }
}
```

:::

<a id="options"></a>

## 选项

### allowIndirect

此规则提供了一个选项，用于允许[“间接 eval”](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#direct_and_indirect_eval)。
间接调用 `eval` 比直接调用 `eval` 危险性低，因为它们无法动态更改作用域。因此，它们对性能的负面影响也不会达到直接调用 `eval` 的程度。

```js
{
    "no-eval": ["error", {"allowIndirect": true}] // default is false
}
```

启用 `{"allowIndirect": true}` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint no-eval: ["error", {"allowIndirect": true} ]*/

const obj = { x: "foo" },
    key = "x",
    value = eval("obj." + key);
```

:::

启用 `{"allowIndirect": true}` 选项时，此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-eval: ["error", {"allowIndirect": true} ]*/

(0, eval)("const a = 0");

const foo = eval;
foo("const a = 0");

this.eval("const a = 0");
```

:::

::: correct

```js
/*eslint no-eval: ["error", {"allowIndirect": true} ]*/
/*global window*/

window.eval("const a = 0");
```

:::

::: correct

```js
/*eslint no-eval: ["error", {"allowIndirect": true} ]*/
/*global global*/

global.eval("const a = 0");
```

:::

<a id="known-limitations"></a>

## 已知限制

* 即使 `eval()` 并非全局对象上的 `eval`，此规则也会对每次调用发出警告。
  这样做是为了检测直接调用 `eval` 的情况。例如：

  ```js
  module.exports = function(eval) {
      // If the value of this `eval` is built-in `eval` function, this is a
      // call of direct `eval`.
      eval("const a = 0");
  };
  ```

* 此规则无法检测全局对象被重命名的情况。例如：

  ```js
  const foo = window;
  foo.eval("const a = 0");
  ```
