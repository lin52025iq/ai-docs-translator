---
title: no-implicit-globals
rule_type: suggestion
related_rules:
- no-undef
- no-global-assign
- no-unused-vars
further_reading:
- https://benalman.com/news/2010/11/immediately-invoked-function-expression/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Undeclared_var
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone
---


最佳实践是避免用原本属于脚本局部作用域的变量“污染”全局作用域。

脚本创建的全局变量可能与其他脚本创建的全局变量发生命名冲突，通常会导致运行时错误或意外行为。

此规则禁止以下情况：

* 在全局作用域中创建一个或多个变量的声明。
* 全局变量泄漏。
* 重新声明只读全局变量，以及对只读全局变量赋值。

需要创建全局变量时，可以通过给全局对象的属性赋值来显式创建。

此规则主要适用于浏览器脚本。ES 模块和 CommonJS 模块中的顶层声明会创建模块作用域变量。ES 模块还会隐式启用 `strict` 模式，从而避免全局变量泄漏。

默认情况下，此规则不检查 `const`、`let` 和 `class` 声明。

<a id="rule-details"></a>

## 规则详情

<a id="var-and-function-declarations"></a>

### `var` 和 `function` 声明

编写浏览器脚本时，开发者常常会忘记，顶层作用域中的变量和函数声明会成为 `window` 对象上的全局变量。模块则有自己的作用域。若有意创建全局变量，应将其显式赋值给 `window` 或 `self`。否则，原本要在脚本中局部使用的变量应放在 IIFE 中。

此规则禁止在顶层脚本作用域中使用 `var` 和 `function` 声明。ES 模块和 CommonJS 模块具有模块作用域，因此不受此限制。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-implicit-globals: "error"*/

var foo = 1;

function bar() {}
```

:::

此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-implicit-globals: "error"*/

// explicitly set on window
window.foo = 1;
window.bar = function() {};

// intended to be scope to this file
(function() {
  var foo = 1;

  function bar() {}
})();
```

:::

在 ESLint 配置中设置 `"languageOptions": { "sourceType": "module" }` 时，此规则的正确代码示例：

::: correct

```js
/*eslint no-implicit-globals: "error"*/

// foo and bar are local to module
var foo = 1;
function bar() {}
```

:::

<a id="global-variable-leaks"></a>

### 全局变量泄漏

当代码未处于 `strict` 模式时，对未声明变量赋值会创建一个新的全局变量。即使代码位于函数中，也会发生这种情况。

ES 模块不受此限制，因为模块代码会隐式处于 `strict` 模式。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-implicit-globals: "error"*/

foo = 1;

Bar.prototype.baz = function () {
    a = 1; // Intended to be this.a = 1;
};
```

:::

<a id="read-only-global-variables"></a>

### 只读全局变量

此规则还禁止重新声明只读全局变量，以及对只读全局变量赋值。

只读全局变量可以是内置的 ES 全局变量（例如 `Array`），也可以是在配置文件或 `/*global */` 注释中定义为 `readonly` 的全局变量。

另请参阅：[指定全局变量](../use/configure/language-options#specify-globals)

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-implicit-globals: "error"*/

/*global foo:readonly*/

foo = 1;

Array = [];
var Object;
```

:::

<a id="exported"></a>

### exported

你可以像在 [`no-unused-vars`](./no-unused-vars) 中一样使用 `/* exported variableName */` 块注释。详情请参阅 [`no-unused-vars` 的 exported 部分](./no-unused-vars#exported)。

`/* exported variableName */` 用法的正确代码示例：

::: correct { "sourceType": "script" }

```js
/* eslint no-implicit-globals: error */
/* exported global_var */

var global_var = 42;
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* 将 `"lexicalBindings"` 设为 `true`，即可让此规则也检查 `const`、`let` 和 `class` 声明。

<a id="const-let-and-class-declarations"></a>

### `const`、`let` 和 `class` 声明

词法声明 `const` 和 `let` 以及 `class` 声明会创建块级作用域变量。

但是，在浏览器脚本的顶层声明这些变量时，它们并非“脚本作用域”变量。实际上，它们是在全局作用域中创建的，可能会与其他脚本中的 `var`、`const` 和 `let` 变量以及 `function` 和 `class` 声明发生命名冲突。ES 模块和 CommonJS 模块不受此限制。

如果变量只应在脚本中局部使用，请将代码放在代码块或立即调用函数表达式（IIFE）中。

将 `"lexicalBindings"` 选项设为 `false`（默认值）时，此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": false}]*/

const foo = 1;

let baz;

class Bar {}
```

:::

将 `"lexicalBindings"` 选项设为 `true` 时，此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

const foo = 1;

let baz;

class Bar {}
```

:::

将 `"lexicalBindings"` 选项设为 `true` 时，此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

{
    const foo = 1;
    let baz;
    class Bar {}
}

(function() {
    const foo = 1;
    let baz;
    class Bar {}
}());
```

:::

如果你打算创建可供其他脚本使用的全局 `const` 或 `let` 变量，或全局 `class` 声明，请注意这些方式与传统方法（即 `var` 声明以及给全局 `window` 对象的属性赋值）相比存在一些差异：

* 词法声明的变量不能按条件创建。脚本不能先检查变量是否存在，再创建一个新变量。`var` 变量也总是会被创建，但重复声明不会导致运行时异常。
* 词法声明的变量不会在全局对象上创建属性，而使用该变量的脚本可能会预期存在这样的属性。
* 词法声明的变量会遮蔽全局对象的属性；如果使用该变量的脚本同时使用该属性，可能会导致错误。
* 如果初始化时抛出异常，词法声明的变量可能会导致永久性的 Temporal Dead Zone（TDZ）。即使是 `typeof` 检查，也无法避免 TDZ 引用异常。

将 `"lexicalBindings"` 选项设为 `true` 时，此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

const MyGlobalFunction = (function() {
    const a = 1;
    let b = 2;
    return function() {
        return a + b;
    }
}());
```

:::

将 `"lexicalBindings"` 选项设为 `true` 时，此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-implicit-globals: ["error", {"lexicalBindings": true}]*/

window.MyGlobalFunction = (function() {
    const a = 1;
    let b = 2;
    return function() {
        return a + b;
    }
}());
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

对于浏览器脚本，如果你希望能够在全局作用域中显式声明变量和函数，并且代码处于严格模式，或者不希望此规则针对未声明变量发出警告，同时也不希望此规则针对只读全局变量发出警告，则可以禁用此规则。

对于 CommonJS 模块，如果代码处于严格模式，或者不希望此规则针对未声明变量发出警告，同时也不希望此规则针对只读全局变量发出警告，则可以禁用此规则。

对于 ES 模块，如果不希望此规则针对只读全局变量发出警告，则可以禁用此规则。
