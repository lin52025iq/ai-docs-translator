---
title: lines-around-directive
rule_type: layout
related_rules:
- lines-around-comment
- padded-blocks
---

在 JavaScript 中，指令用于告知执行环境，脚本希望启用某项功能，例如`"strict mode"`。指令会在文件或函数块的顶部组成一个[指令序言](https://www.ecma-international.org/ecma-262/7.0/#directive-prologue)，并应用于其所在的作用域。

```js
// Strict mode is invoked for the entire script
"use strict";

var foo;

function bar() {
  var baz;
}
```

```js
var foo;

function bar() {
  // Strict mode is only invoked within this function
  "use strict";

  var baz;
}
```

<a id="rule-details"></a>

## 规则详情

此规则要求或禁止指令序言周围出现空行。此规则不规定各个指令之间的空行约定。此外，除非指令序言前有注释，否则此规则不要求其前面有空行。如果你希望强制执行这种风格，请使用 [padded-blocks](padded-blocks) 规则。

<a id="options"></a>

## 选项

此规则有一个选项，可以是字符串或对象：

* `"always"`（默认值）要求指令周围有空行。
* `"never"` 禁止指令周围有空行。

或

```js
{
  "before": "always" or "never"
  "after": "always" or "never",
}
```

<a id="always"></a>

### always

这是默认选项。

此规则在使用 `"always"` 选项时的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "always"] */

// comment
"use strict";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment
  "use strict";
  var bar;
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "always"] */

// comment
"use strict";
"use asm";
var foo;
```

:::

此规则在使用 `"always"` 选项时的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "always"] */

// comment

"use strict";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment

  "use strict";

  var bar;
}
```

:::

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "always"] */

// comment

"use strict";
"use asm";

var foo;
```

:::

<a id="never"></a>

### never

此规则在使用 `"never"` 选项时的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "never"] */

// comment

"use strict";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment

  "use strict";

  var bar;
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "never"] */

// comment

"use strict";
"use asm";

var foo;
```

:::

此规则在使用 `"never"` 选项时的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "never"] */

// comment
"use strict";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment
  "use strict";
  var bar;
}
```

:::

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", "never"] */

// comment
"use strict";
"use asm";
var foo;
```

:::

### before & after

此规则在使用 `{ "before": "never", "after": "always" }` 选项时的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

// comment

"use strict";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment

  "use strict";
  var bar;
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

// comment

"use strict";
"use asm";
var foo;
```

:::

此规则在使用 `{ "before": "never", "after": "always" }` 选项时的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

// comment
"use strict";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment
  "use strict";

  var bar;
}
```

:::

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "never", "after": "always" }] */

// comment
"use strict";
"use asm";

var foo;
```

:::

此规则在使用 `{ "before": "always", "after": "never" }` 选项时的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

// comment
"use strict";

var foo;

function foo() {
  "use strict";
  "use asm";

  var bar;
}

function foo() {
  // comment
  "use strict";

  var bar;
}
```

:::

::: incorrect { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

// comment
"use strict";
"use asm";

var foo;
```

:::

此规则在使用 `{ "before": "always", "after": "never" }` 选项时的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

// comment

"use strict";
var foo;

function foo() {
  "use strict";
  "use asm";
  var bar;
}

function foo() {
  // comment

  "use strict";
  var bar;
}
```

:::

::: correct { "sourceType": "script" }

```js
/* eslint lines-around-directive: ["error", { "before": "always", "after": "never" }] */

// comment

"use strict";
"use asm";
var foo;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你对指令序言前后是否应有空行没有严格约定，则可以放心禁用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[requirePaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterUseStrict)
* **JSCS**：[disallowPaddingNewLinesAfterUseStrict](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterUseStrict)
