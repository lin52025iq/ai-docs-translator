---
title: no-shadow-restricted-names
rule_type: suggestion
related_rules:
- no-shadow
further_reading:
- https://262.ecma-international.org/11.0/#sec-value-properties-of-the-global-object
- https://262.ecma-international.org/11.0/#sec-strict-mode-of-ecmascript
---



ES2020 §18.1《全局对象的值属性》（`globalThis`、`NaN`、`Infinity`、`undefined`），以及严格模式下受限的标识符 `eval` 和 `arguments`，都被视为 JavaScript 中的受限名称。将它们定义为其他含义可能造成意外后果，也会令阅读代码的人感到困惑。例如，下面的写法完全合法：

```js
const undefined = "foo";
```

这样一来，同一作用域中的任何代码获取到的都不再是全局的 `undefined`，而是含义截然不同的局部版本。

<a id="rule-details"></a>
## 规则详情

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-shadow-restricted-names: "error"*/

function NaN(){}

!function(Infinity){};

const undefined = 5;

try {} catch(eval){}
```

:::

::: incorrect

```js
/*eslint no-shadow-restricted-names: "error"*/

import NaN from "foo";

import { undefined } from "bar";

class Infinity {}
```

:::

此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-shadow-restricted-names: "error"*/

let Object;

function f(a, b){}

// Exception: `undefined` may be shadowed if the variable is never assigned a value.
let undefined;
```

:::

::: correct

```js
/*eslint no-shadow-restricted-names: "error"*/

import { undefined as undef } from "bar";
```

:::

<a id="options"></a>
## 选项

此规则有一个对象选项：

* `"reportGlobalThis"`：`true`（默认值）时，会报告对 `globalThis` 的声明。

### reportGlobalThis

默认选项 `{ "reportGlobalThis": true }` 的错误代码示例：

::: incorrect

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

const globalThis = "foo";
```

:::

::: incorrect

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

function globalThis() {}
```

:::

::: incorrect

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

import { globalThis } from "bar";
```

:::

::: incorrect

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

class globalThis {}
```

:::

默认选项 `{ "reportGlobalThis": true }` 的正确代码示例：

::: correct

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

const foo = globalThis;

function bar() {
    return globalThis;
}

import { globalThis as baz } from "foo";
```

:::

选项 `{ "reportGlobalThis": false }` 的正确代码示例：

::: correct

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

const globalThis = "foo";
```

:::

::: correct

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

function globalThis() {}
```

:::

::: correct

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

import { globalThis } from "bar";
```

:::

::: correct

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

class globalThis {}
```

:::
