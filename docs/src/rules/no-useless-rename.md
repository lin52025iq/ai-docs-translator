---
title: no-useless-rename
rule_type: suggestion
related_rules:
- object-shorthand
---



ES2015 允许在导入和导出语句以及解构赋值中重命名引用。这为程序员提供了一种简洁的语法来执行这些操作并重命名引用：

```js
import { foo as bar } from "baz";
export { foo as bar };
let { foo: bar } = baz;
```

使用这种语法，可以将引用重命名为与原名相同的名称。这完全是多余的操作，效果与不重命名完全相同。例如，下面的代码：

```js
import { foo as foo } from "bar";
export { foo as foo };
let { foo: foo } = bar;
```

与下面的代码效果相同：

```js
import { foo } from "bar";
export { foo };
let { foo } = bar;
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在导入、导出和解构赋值中将名称重命名为相同的名称。

<a id="options"></a>

## 选项

此规则提供以下选项，以便进行更细致的控制：

* `ignoreImport`：设为 `true` 时，此规则不检查导入
* `ignoreExport`：设为 `true` 时，此规则不检查导出
* `ignoreDestructuring`：设为 `true` 时，此规则不检查解构赋值

默认情况下，所有选项均设为 `false`：

```json
"no-useless-rename": ["error", {
    "ignoreDestructuring": false,
    "ignoreImport": false,
    "ignoreExport": false
}]
```

此规则默认情况下的**错误**代码示例：

::: incorrect

```js
/*eslint no-useless-rename: "error"*/

import { foo1 as foo1 } from "bar";
import { "foo2" as foo2 } from "bar";
export { foo1 as foo1 };
export { foo2 as "foo2" };
export { foo3 as foo3 } from "bar";
export { "foo4" as "foo4" } from "bar";
let { foo3: foo3 } = bar;
let { 'foo4': foo4 } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}
```

:::

此规则默认情况下的**正确**代码示例：

::: correct

```js
/*eslint no-useless-rename: "error"*/

import * as foo1 from "foo";
import { foo2 } from "bar";
import { foo as bar1 } from "baz";
import { "foo" as bar2 } from "baz";

export { foo };
export { foo as bar1 };
export { foo as "bar2" };
export { foo as bar3 } from "foo";
export { "foo" as "bar4" } from "foo";

let { foo } = bar;
let { foo: bar } = baz;
let { [qux]: qux } = bar;

function foo3({ bar }) {}
function foo4({ bar: baz }) {}

({ foo }) => {}
({ foo: bar }) => {}
```

:::

使用 `{ ignoreImport: true }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-useless-rename: ["error", { ignoreImport: true }]*/

import { foo as foo } from "bar";
```

:::

使用 `{ ignoreExport: true }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-useless-rename: ["error", { ignoreExport: true }]*/

const foo = 1;
export { foo as foo };
export { bar as bar } from "bar";
```

:::

使用 `{ ignoreDestructuring: true }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-useless-rename: ["error", { ignoreDestructuring: true }]*/

let { foo: foo } = bar;
function baz({ bar: bar }) {}
({ foo: foo }) => {}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不介意在导入、导出和解构赋值中进行多余的重命名，可以安全地禁用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[disallowIdenticalDestructuringNames](https://jscs-dev.github.io/rule/disallowIdenticalDestructuringNames)
