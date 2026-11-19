---
title: global-strict

---

要求或禁止在全局作用域中使用严格模式指令。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [strict](strict) 规则取代。新规则中的 `"global"` 选项与已移除的规则最为相似。
:::

在代码中使用以下编译指示即可启用严格模式：

```js
"use strict";
```

像本例这样在全局范围内使用时，严格模式编译指示会应用于单个文件中的所有代码。如果在将脚本提供给浏览器之前把它们拼接在一起，这可能会很危险。例如，如果某个文件运行在严格模式下，而你又将该文件与 jQuery 拼接在一起，那么严格模式也会应用于 jQuery，并可能导致错误。

不过，如果你使用 Node.js，可能会希望在全局范围内启用严格模式。在 Node.js 项目中，文件通常不会拼接在一起，因此意外应用严格模式的风险很小。此外，由于 Node.js 中的每个文件都有自己的作用域，全局严格模式只会影响其所在的单个文件。

<a id="rule-details"></a>

## 规则详情

此规则要求或禁止在全局作用域中使用 `"use strict"` 编译指示来启用全局严格模式。

以下模式在全局范围内启用严格模式；使用 `"always"` 选项时，该模式有效，使用 `"never"` 选项时则会发出警告。

```js
"use strict";

function foo() {
    return true;
}
```

以下模式仅对函数启用严格模式，因此使用 `"never"` 选项时有效，使用 `"always"` 选项时则会报错。

```js
function foo() {
    "use strict";

    return true;
}

(function() {
    "use strict";

    // other code
}());
```

<a id="options"></a>

## 选项

```json
"global-strict": ["error", "always"]
```

要求每个文件都包含顶层的 `"use strict"` 语句。

```json
"global-strict": ["error", "never"]
```

每当在全局作用域中使用 `"use strict"`，且可能污染拼接后的文件时，都会发出警告。

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果项目可能同时使用非严格模式和严格模式代码，并且文件不会拼接在一起，那么可以针对每个文件单独决定是否使用全局严格模式，因此无需使用此规则。