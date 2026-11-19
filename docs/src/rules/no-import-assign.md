---
title: no-import-assign
rule_type: problem
handled_by_typescript: true
extra_typescript_info: Note that the compiler will not catch the `Object.assign()` case. Thus, if you use `Object.assign()` in your codebase, this rule will still provide some value.
---



ES 模块中对导入绑定的更新会导致运行时错误。

<a id="rule-details"></a>

## 规则详情

此规则会对导入绑定的赋值、递增和递减操作发出警告。

此规则中**错误**代码示例：

::: incorrect

```js
/*eslint no-import-assign: "error"*/

import mod, { named } from "./mod.mjs"
import * as mod_ns from "./mod.mjs"

mod = 1          // ERROR: 'mod' is readonly.
named = 2        // ERROR: 'named' is readonly.
mod_ns.named = 3 // ERROR: The members of 'mod_ns' are readonly.
mod_ns = {}      // ERROR: 'mod_ns' is readonly.
// Can't extend 'mod_ns'
Object.assign(mod_ns, { foo: "foo" }) // ERROR: The members of 'mod_ns' are readonly.
```

:::

此规则中**正确**代码示例：

::: correct

```js
/*eslint no-import-assign: "error"*/

import mod, { named } from "./mod.mjs"
import * as mod_ns from "./mod.mjs"

mod.prop = 1
named.prop = 2
mod_ns.named.prop = 3

// Known Limitation
function test(obj) {
    obj.named = 4 // Not errored because 'obj' is not namespace objects.
}
test(mod_ns) // Not errored because it doesn't know that 'test' updates the member of the argument.
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果不希望收到有关修改导入绑定的通知，可以禁用此规则。