---
title: strict
rule_type: suggestion
---



严格模式指令是位于脚本或函数体开头的 `"use strict"` 字面量。它会启用严格模式语义。

如果指令出现在全局作用域中，严格模式将应用于整个脚本：

```js
"use strict";

// strict mode

function foo() {
    // strict mode
}
```

如果指令出现在函数体开头，严格模式只应用于该函数，包括其中包含的所有函数：

```js
function foo() {
    "use strict";
    // strict mode
}

function foo2() {
    // not strict mode
};

(function() {
    "use strict";
    function bar() {
        // strict mode
    }
}());
```

在 **CommonJS** 模块系统中，每个模块都由一个隐藏函数包裹，这会限制“全局”严格模式指令的作用范围。

在始终具有严格模式语义的 **ECMAScript** 模块中，不需要这些指令。

<a id="rule-details"></a>

## 规则详情

此规则要求或禁止使用严格模式指令。

如果 ESLint 配置在[解析器选项](../use/configure/language-options#specify-javascript-options)中指定了以下任一项，无论指定了什么选项，此规则都会禁止使用严格模式指令：

* `"sourceType": "module"`，即文件是 **ECMAScript** 模块。
* `"impliedStrict": true` 属性位于 `ecmaFeatures` 对象中。

对于参数列表非简单的函数（例如包含默认参数值的参数列表），无论指定了什么选项，此规则都会禁止使用严格模式指令，因为这在 **ECMAScript 2016** 及更高版本中属于语法错误。请参阅 [function](#function) 选项的示例。

无论指定了什么选项，此规则都不适用于类静态块，因为类静态块不包含指令。因此，类静态块中的 `"use strict"` 语句并不是指令，会被 [no-unused-expressions](no-unused-expressions) 规则报告。

命令行中的 `--fix` 选项不会插入新的 `"use strict"` 语句，只会移除不需要的语句。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"safe"`（默认值）对应于以下选项之一：
    * 如果 ESLint 将文件视为 **CommonJS** 模块，则对应 `"global"`
    * 否则对应 `"function"`
* `"global"` 要求在全局作用域中有一个严格模式指令（并禁止其他任何严格模式指令）
* `"function"` 要求在每个顶层函数声明或表达式中都有一个严格模式指令（并禁止其他任何严格模式指令）
* `"never"` 禁止使用严格模式指令

<a id="safe"></a>

### safe

如果 ESLint 将文件视为 **Node.js** 或 **CommonJS** 模块，且配置指定了以下任一项，则 `"safe"` 选项对应于 `"global"` 选项：

* [语言选项](../use/configure/language-options#specify-javascript-options)中的 `"sourceType": "commonjs"`
* [解析器选项](../use/configure/language-options#specify-parser-options)的 `ecmaFeatures` 对象中的 `"globalReturn": true` 属性

否则，`"safe"` 选项对应于 `"function"` 选项。

<a id="global"></a>

### global

以下是使用 `"global"` 选项时，此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint strict: ["error", "global"]*/

function foo() {
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/*eslint strict: ["error", "global"]*/

function foo() {
    "use strict";
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/*eslint strict: ["error", "global"]*/

"use strict";

function foo() {
    "use strict";
}
```

:::

以下是使用 `"global"` 选项时，此规则的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint strict: ["error", "global"]*/

"use strict";

function foo() {
}
```

:::

<a id="function"></a>

### function

此选项确保所有函数体中的代码都处于严格模式，而全局代码不处于严格模式。尤其是在构建步骤会将多个脚本拼接起来时，一个脚本的全局代码中的严格模式指令可能会意外地让另一个原本不应处于严格模式的脚本也启用严格模式。

以下是使用 `"function"` 选项时，此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint strict: ["error", "function"]*/

"use strict";

function foo() {
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/*eslint strict: ["error", "function"]*/

function foo() {
}

(function() {
    function bar() {
        "use strict";
    }
}());
```

:::

::: incorrect { "ecmaVersion": 2015, "sourceType": "script" }

```js
/*eslint strict: ["error", "function"]*/

// Illegal "use strict" directive in function with non-simple parameter list.
// This is a syntax error since ES2016.
function foo(a = 1) {
    "use strict";
}

// We cannot write "use strict" directive in this function.
// So we have to wrap this function with a function with "use strict" directive.
function foo(a = 1) {
}
```

:::

以下是使用 `"function"` 选项时，此规则的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint strict: ["error", "function"]*/

function foo() {
    "use strict";
}

(function() {
    "use strict";

    function bar() {
    }

    function baz(a = 1) {
    }
}());

const foo2 = (function() {
    "use strict";

    return function foo(a = 1) {
    };
}());
```

:::

<a id="never"></a>

### never

以下是使用 `"never"` 选项时，此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint strict: ["error", "never"]*/

"use strict";

function foo() {
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/*eslint strict: ["error", "never"]*/

function foo() {
    "use strict";
}
```

:::

以下是使用 `"never"` 选项时，此规则的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint strict: ["error", "never"]*/

function foo() {
}
```

:::

<a id="earlier-default-removed"></a>

### 早期默认选项（已移除）

（已移除）此规则的默认选项（即未指定字符串选项）已在 ESLint v1.0 中**移除**。`"function"` 选项与已移除的选项最为相似。

此选项确保所有函数都在严格模式下执行。全局代码或每个顶层函数声明或表达式中都必须有严格模式指令。此选项不会处理已经处于严格模式的嵌套函数中的多余严格模式指令，也不会处理同一层级上的多个严格模式指令。

以下是使用已移除的早期默认选项时，此规则的**错误**代码示例：

```js
// "strict": "error"

function foo() {
}
```

```js
// "strict": "error"

(function() {
    function bar() {
        "use strict";
    }
}());
```

以下是使用已移除的早期默认选项时，此规则的**正确**代码示例：

```js
// "strict": "error"

"use strict";

function foo() {
}
```

```js
// "strict": "error"

function foo() {
    "use strict";
}
```

```js
// "strict": "error"

(function() {
    "use strict";
    function bar() {
        "use strict";
    }
}());
```

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果代码库中同时存在严格模式代码和非严格模式代码，可以关闭此规则，或者在必要时[有选择地禁用此规则](../use/configure/rules#disable-rules)。例如，在严格模式下，引用 `arguments.callee` 的函数无效。MDN 提供了[严格模式差异的完整列表](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode#Differences_from_non-strict_to_strict)。