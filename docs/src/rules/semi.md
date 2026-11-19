---
title: semi
rule_type: layout
related_rules:
- no-extra-semi
- no-unexpected-multiline
- semi-spacing
further_reading:
- https://blog.izs.me/2010/12/an-open-letter-to-javascript-leaders-regarding/
- https://web.archive.org/web/20200420230322/http://inimino.org/~inimino/blog/javascript_semicolons
---
JavaScript 并不要求在每条语句末尾添加分号。在很多情况下，JavaScript 引擎可以判断应在何处添加分号，并自动插入。此功能称为**自动分号插入（ASI）**，被认为是 JavaScript 最具争议的特性之一。例如，以下两行代码都是有效的：

```js
var name = "ESLint"
var website = "eslint.org";
```

在第一行中，JavaScript 引擎会自动插入分号，因此这不被视为语法错误。JavaScript 引擎仍然知道如何解析这一行，也知道行尾表示语句结束。

关于 ASI 的争论通常有两种观点。第一种观点认为，我们应该假装 ASI 不存在，始终手动添加分号。其理由是，始终添加分号比记住何时需要或不需要分号更容易，因此可以降低引入错误的可能性。

不过，对于使用分号的人来说，ASI 机制有时会带来一些棘手的问题。例如，看看下面的代码：

```js
return
{
    name: "ESLint"
};
```

这看起来可能像是一个返回对象字面量的 `return` 语句，但 JavaScript 引擎会将这段代码解析为：

```js
return;
{
    name: "ESLint";
}
```

实际上，`return` 语句后插入了一个分号，导致其后的代码（块中的带标签语句）无法执行。此规则和 [no-unreachable](no-unreachable) 规则可以保护你的代码免受此类问题影响。

另一方面，有人认为，既然分号会自动插入，它们就是可选的，不需要手动添加。不过，对于不使用分号的人来说，ASI 机制也可能带来棘手的问题。例如，看看下面的代码：

```js
var globalCounter = { }

(function () {
    var n = 0
    globalCounter.increment = function () {
        return ++n
    }
})()
```

在这个例子中，第一行后不会插入分号，从而导致运行时错误（因为空对象被当作函数调用）。[no-unexpected-multiline](no-unexpected-multiline) 规则可以保护你的代码免受此类问题影响。

虽然 ASI 让编码风格有了更多自由，但无论你是否使用分号，它也可能导致代码以出乎意料的方式运行。因此，最好了解 ASI 何时会生效、何时不会生效，并让 ESLint 保护你的代码免受这些潜在意外的影响。简而言之，正如 Isaac Schlueter 曾经所说，除非符合以下任一情况，否则 `\n` 字符总会结束一条语句（就像分号一样）：

1. 语句中有未闭合的括号、数组字面量或对象字面量，或者以其他无效的语句结束方式结尾。（例如，以 `.` 或 `,` 结尾。）
1. 该行是 `--` 或 `++`（此时它会对下一个标记执行递减或递增操作）。
1. 它是 `for()`、`while()`、`do`、`if()` 或 `else`，且后面没有 `{`
1. 下一行以 `[`, `(`, `+`, `*`, `/`, `-`, `,`, `.` 或其他只能出现在单个表达式中两个标记之间的二元运算符开头。

<a id="rule-details"></a>

## 规则详情

此规则用于强制统一分号的使用方式。

<a id="options"></a>

## 选项

此规则有两个选项：字符串选项和对象选项。

字符串选项：

* `"always"`（默认值）要求在语句末尾添加分号
* `"never"` 禁止在语句末尾添加分号（但以 `[`, `(`, `/`, `+` 或 `-` 开头的语句除外，以避免歧义）

对象选项（当使用 `"always"` 时）：

* `"omitLastInOneLineBlock": true` 禁止在花括号（因此也包括块内容）位于同一行的代码块末尾添加分号
* `"omitLastInOneLineClassBody": true` 禁止在花括号（因此也包括类主体内容）位于同一行的类主体末尾添加分号

对象选项（当使用 `"never"` 时）：

* `"beforeStatementContinuationChars": "any"`（默认值）忽略语句末尾是否有分号（或缺少分号），前提是下一行以 `[`, `(`, `/`, `+` 或 `-` 开头。
* `"beforeStatementContinuationChars": "always"` 如果下一行以 `[`, `(`, `/`, `+` 或 `-` 开头，则要求在语句末尾添加分号。
* `"beforeStatementContinuationChars": "never"` 即使下一行以 `[`, `(`, `/`, `+` 或 `-` 开头，只要不会造成 ASI 隐患，就禁止在语句末尾添加分号。

**注意：**`beforeStatementContinuationChars` 不适用于类字段，因为类字段不是语句。

<a id="always"></a>

### 始终

此规则在默认的 `"always"` 选项下，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint semi: ["error", "always"]*/

var name = "ESLint"

object.method = function() {
    // ...
}

class Foo {
    bar = 1
}
```

:::

此规则在默认的 `"always"` 选项下，以下代码示例属于**正确**：

::: correct

```js
/*eslint semi: "error"*/

var name = "ESLint";

object.method = function() {
    // ...
};

class Foo {
    bar = 1;
}
```

:::

#### omitLastInOneLineBlock

使用 `"always", { "omitLastInOneLineBlock": true }` 选项时，以下是其他**正确**代码示例：

::: correct

```js
/*eslint semi: ["error", "always", { "omitLastInOneLineBlock": true}] */

if (foo) { bar() }

if (foo) { bar(); baz() }

function f() { bar(); baz() }

class C {
    foo() { bar(); baz() }

    static { bar(); baz() }
}
```

:::

#### omitLastInOneLineClassBody

使用 `"always", { "omitLastInOneLineClassBody": true }` 选项时，以下是其他**正确**代码示例：

::: correct

```js
/*eslint semi: ["error", "always", { "omitLastInOneLineClassBody": true}] */

export class SomeClass{
    logType(){
        console.log(this.type);
        console.log(this.anotherType);
    }
}

export class Variant1 extends SomeClass{type=1}
export class Variant2 extends SomeClass{type=2; anotherType=3}
```

:::

<a id="never"></a>

### 从不

使用 `"never"` 选项时，以下代码示例属于**错误**：

::: incorrect

```js
/*eslint semi: ["error", "never"]*/

var name = "ESLint";

object.method = function() {
    // ...
};

class Foo {
    bar = 1;
}
```

:::

使用 `"never"` 选项时，以下代码示例属于**正确**：

::: correct

```js
/*eslint semi: ["error", "never"]*/

var name = "ESLint"

object.method = function() {
    // ...
}

var name = "ESLint"

;(function() {
    // ...
})()

import a from "a"
(function() {
    // ...
})()

import b from "b"
;(function() {
    // ...
})()

class Foo {
    bar = 1
}
```

:::

#### beforeStatementContinuationChars

使用 `"never", { "beforeStatementContinuationChars": "always" }` 选项时，以下是其他**错误**代码示例：

::: incorrect

```js
/*eslint semi: ["error", "never", { "beforeStatementContinuationChars": "always"}] */
import a from "a"

(function() {
    // ...
})()
```

:::

使用 `"never", { "beforeStatementContinuationChars": "never" }` 选项时，以下是其他**错误**代码示例：

::: incorrect

```js
/*eslint semi: ["error", "never", { "beforeStatementContinuationChars": "never"}] */
import a from "a"

;(function() {
    // ...
})()
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不想以任何特定方式强制要求使用（或省略）分号，可以关闭此规则。
