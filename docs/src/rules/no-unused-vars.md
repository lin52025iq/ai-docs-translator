---
title: no-unused-vars
rule_type: problem
related_rules:
- no-unassigned-vars
- no-useless-assignment
---



声明后未在代码任何位置使用的变量，很可能是重构不完整造成的错误。这类变量会占用代码空间，也可能让读者感到困惑。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除未使用的变量、函数和函数参数。

满足以下任一条件时，变量 `foo` 即被视为已使用：

* 它被调用（`foo()`）或实例化（`new foo()`）
* 它被读取（`let bar = foo`）
* 它作为参数传递给函数（`doSomething(foo)`）
* 它在传递给另一个函数的函数内部被读取（`doSomething(function() { foo(); })`）

如果变量只被声明（`let foo = 5`）或赋值（`foo = 7`），则不视为已使用。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-vars: "error"*/
/*global some_unused_var*/

// It checks variables you have defined as global
some_unused_var = 42;

let x;

// Write-only variables are not considered as used.
let y = 10;
y = 5;

// A read for a modification of itself is not considered as used.
let z = 0;
z = z + 1;

// By default, unused arguments cause warnings.
(function(foo) {
    return 5;
})();

// Unused recursive functions also cause warnings.
function fact(n) {
    if (n < 2) return 1;
    return n * fact(n - 1);
}

// When a function definition destructures an array, unused entries from the array also cause warnings.
function getY([x, y]) {
    return y;
}
getY(["a", "b"]);
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: "error"*/

const x = 10;
alert(x);

// foo is considered used here
myFunc(function foo() {
    // ...
}.bind(this));

(function(foo) {
    return foo;
})();

var myFunc;
myFunc = setTimeout(function() {
    // myFunc is considered used
    myFunc();
}, 50);

// Only the second argument from the destructured array is used.
function getY([, y]) {
    return y;
}
getY(["a", "b"]);
```

:::

<a id="exported"></a>

### 导出

在 CommonJS 或 ECMAScript 模块之外的环境中，你可以使用 `var` 创建一个供其他脚本使用的全局变量。你可以使用 `/* exported variableName */` 注释块来表示该变量正在被导出，因此不应被视为未使用。

请注意，在以下任何情况下，`/* exported */` 都不起作用：

* `languageOptions.sourceType` 为 `module`（默认值）或 `commonjs` 时
* `languageOptions.parserOptions.ecmaFeatures.globalReturn` 为 `true` 时

行注释 `// exported variableName` 不起作用，因为 `exported` 并非仅针对当前行。

```js
/* exported global_var */

var global_var = 42;
```

`no-unused-vars` 使用 `/* exported variableName */` 时的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-unused-vars: "error"*/
/* exported global_var */

var global_var = 42;
```

:::

<a id="options"></a>

## 选项

此规则接受一个参数，可以是字符串或对象。字符串设置与 `vars` 属性的设置相同（如下所述）。

默认情况下，此规则对捕获的错误和变量启用 `all` 选项，对参数启用 `after-used` 选项。

```json
{
    "rules": {
        "no-unused-vars": ["error", {
            "vars": "all",
            "args": "after-used",
            "caughtErrors": "all",
            "ignoreRestSiblings": false,
            "ignoreUsingDeclarations": false,
            "reportUsedIgnorePattern": false
        }]
    }
}
```

<a id="vars"></a>

### vars

`vars` 选项有两种设置：

* `"all"` 检查所有变量是否已使用，包括全局作用域中的变量。不过，它不检查由其他选项（如 `args` 和 `caughtErrors`）处理的变量。这是默认设置。
* `"local"` 允许全局作用域中的变量未被使用。

<a id="vars-local"></a>

#### vars: local

`{ "vars": "local" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/*global some_unused_var */

some_unused_var = 42;
```

:::

`"languageOptions": { "sourceType": "script" }` 时，`{ "vars": "local" }` 选项的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-unused-vars: ["error", { "vars": "local" }]*/

const foo = 42;

let bar;

let baz = 42;

var qux;

var quux = 42;
```

:::

<a id="varsignorepattern"></a>

### varsIgnorePattern

`varsIgnorePattern` 选项用于指定不检查使用情况的例外：变量名称匹配正则表达式模式时将被忽略。例如，变量名称中包含 `ignored` 或 `Ignored`。不过，该选项不处理由其他选项（如 `argsIgnorePattern` 和 `caughtErrorsIgnorePattern`）处理的变量。

`{ "varsIgnorePattern": "[iI]gnored" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

const firstVarIgnored = 1;
const secondVar = 2;
console.log(secondVar);
```

:::

<a id="args"></a>

### args

`args` 选项有三种设置：

* `after-used` - 不检查最后一个已使用参数之前未使用的位置参数，但会检查所有命名参数以及最后一个已使用参数之后的所有位置参数。
* `all` - 所有命名参数都必须使用。
* `none` - 不检查参数。

<a id="args-after-used"></a>

#### args: after-used

默认 `{ "args": "after-used" }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "args": "after-used" }]*/

// 2 errors, for the parameters after the last used parameter (bar)
// "baz" is defined but never used
// "qux" is defined but never used
(function(foo, bar, baz, qux) {
    return bar;
})();
```

:::

默认 `{ "args": "after-used" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", {"args": "after-used"}]*/

(function(foo, bar, baz, qux) {
    return qux;
})();
```

:::

<a id="args-all"></a>

#### args: all

`{ "args": "all" }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "args": "all" }]*/

// 2 errors
// "foo" is defined but never used
// "baz" is defined but never used
(function(foo, bar, baz) {
    return bar;
})();
```

:::

<a id="args-none"></a>

#### args: none

`{ "args": "none" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "args": "none" }]*/

(function(foo, bar, baz) {
    return bar;
})();
```

:::

<a id="argsignorepattern"></a>

### argsIgnorePattern

`argsIgnorePattern` 选项用于指定不检查使用情况的例外：参数名称匹配正则表达式模式时将被忽略。例如，变量名称以下划线开头。

`{ "argsIgnorePattern": "^_" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

function foo(x, _y) {
    return x + 1;
}
foo();
```

:::

<a id="caughterrors"></a>

### caughtErrors

`caughtErrors` 选项用于验证 `catch` 块的参数。

它有两种设置：

* `all` - 所有命名参数都必须使用。这是默认设置。
* `none` - 不检查错误对象。

<a id="caughterrors-all"></a>

#### caughtErrors: all

不指定此选项等同于将其设为 `all`。

`{ "caughtErrors": "all" }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "all" }]*/

// 1 error
// "err" is defined but never used
try {
    //...
} catch (err) {
    console.error("errors");
}
```

:::

<a id="caughterrors-none"></a>

#### caughtErrors: none

`{ "caughtErrors": "none" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "none" }]*/

try {
    //...
} catch (err) {
    console.error("errors");
}
```

:::

<a id="caughterrorsignorepattern"></a>

### caughtErrorsIgnorePattern

`caughtErrorsIgnorePattern` 选项用于指定不检查使用情况的例外：catch 参数名称匹配正则表达式模式时将被忽略。例如，变量名称以字符串 'ignore' 开头。

`{ "caughtErrorsIgnorePattern": "^ignore" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "all", "caughtErrorsIgnorePattern": "^ignore" }]*/

try {
    //...
} catch (ignoreErr) {
    console.error("errors");
}
```

:::

<a id="destructuredarrayignorepattern"></a>

### destructuredArrayIgnorePattern

`destructuredArrayIgnorePattern` 选项用于指定不检查使用情况的例外：数组解构模式中的元素名称匹配正则表达式模式时将被忽略。例如，变量名称以下划线开头。

`{ "destructuredArrayIgnorePattern": "^_" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "destructuredArrayIgnorePattern": "^_" }]*/

const [a, _b, c] = ["a", "b", "c"];
console.log(a+c);

const { x: [_a, foo] } = bar;
console.log(foo);

function baz([_c, x]) {
    x;
}
baz();

function test({p: [_q, r]}) {
    r;
}
test();

let _m, n;
foo.forEach(item => {
    [_m, n] = item;
    console.log(n);
});

let _o, p;
_o = 1;
[_o, p] = foo;
p;
```

:::

<a id="ignorerestsiblings"></a>

### ignoreRestSiblings

`ignoreRestSiblings` 选项是一个布尔值（默认值：`false`）。使用[剩余属性](https://github.com/tc39/proposal-object-rest-spread)可以从对象中“省略”属性，但默认情况下，同级属性会被标记为“未使用”。启用此选项后，剩余属性的同级属性将被忽略。

`{ "ignoreRestSiblings": true }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

// 'foo' and 'bar' were ignored because they have a rest property sibling.
const { foo, ...rest } = data;
console.log(rest);

// OR

let bar;
({ bar, ...rest } = data);
```

:::

<a id="ignoreclasswithstaticinitblock"></a>

### ignoreClassWithStaticInitBlock

`ignoreClassWithStaticInitBlock` 选项是一个布尔值（默认值：`false`）。静态初始化块允许你初始化静态变量，并在类定义求值期间执行代码；这意味着静态块代码会在不创建类的新实例的情况下执行。将此选项设为 `true` 时，此规则会忽略包含静态初始化块的类。

`{ "ignoreClassWithStaticInitBlock": true }` 选项的**错误**代码示例

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "ignoreClassWithStaticInitBlock": true }]*/

class Foo {
    static myProperty = "some string";
    static mymethod() {
        return "some string";
    }
}

class Bar {
    static {
        let baz; // unused variable
    }
}
```

:::

`{ "ignoreClassWithStaticInitBlock": true }` 选项的**正确**代码示例

::: correct

```js
/*eslint no-unused-vars: ["error", { "ignoreClassWithStaticInitBlock": true }]*/

class Foo {
    static {
        let bar = "some string";

        console.log(bar);
    }
}
```

:::

<a id="ignoreusingdeclarations"></a>

### ignoreUsingDeclarations

`ignoreUsingDeclarations` 选项是一个布尔值（默认值：`false`）。显式资源管理允许在变量作用域结束时隐式调用 `Symbol.dispose` 或 `Symbol.asyncDispose` 方法，自动清理可释放对象。将此选项设为 `true` 时，此规则会忽略使用 `using` 或 `await using` 声明的变量。

`{ "ignoreUsingDeclarations": true }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "ignoreUsingDeclarations": true }]*/
const resource = getResource();
```

:::

`{ "ignoreUsingDeclarations": true }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "ignoreUsingDeclarations": true }]*/

using syncResource = getSyncResource();
await using asyncResource = getAsyncResource();
```

:::

<a id="reportusedignorepattern"></a>

### reportUsedIgnorePattern

`reportUsedIgnorePattern` 选项是一个布尔值（默认值：`false`）。
启用此选项后，如果变量已被使用，且匹配任何有效的忽略模式选项（`varsIgnorePattern`、`argsIgnorePattern`、`caughtErrorsIgnorePattern` 或
`destructuredArrayIgnorePattern`），就会报告这些变量。

`{ "reportUsedIgnorePattern": true }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-vars: ["error", { "reportUsedIgnorePattern": true, "varsIgnorePattern": "[iI]gnored" }]*/

const firstVarIgnored = 1;
const secondVar = 2;
console.log(firstVarIgnored, secondVar);
```

:::

`{ "reportUsedIgnorePattern": true }` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-unused-vars: ["error", { "reportUsedIgnorePattern": true, "varsIgnorePattern": "[iI]gnored" }]*/

const firstVar = 1;
const secondVar = 2;
console.log(firstVar, secondVar);
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不希望收到有关未使用变量或函数参数的提醒，可以放心关闭此规则。
