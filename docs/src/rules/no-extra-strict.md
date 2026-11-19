---
title: no-extra-strict

further_reading:
- https://es5.github.io/#C
---

禁止在已处于严格模式时使用严格模式指令。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [strict](strict) 规则取代。新规则中的 `"global"` 或 `"function"` 选项与已移除的规则类似。
:::

`"use strict";` 指令适用于其所在的作用域以及该作用域内包含的所有内部作用域。因此，在这些内部作用域中使用 `"use strict";` 指令是不必要的。

```js
"use strict";

(function () {
    "use strict";
    var foo = true;
}());
```

<a id="rule-details"></a>

## 规则详情

此规则旨在防止出现不必要的 `"use strict";` 指令。因此，当它在已处于严格模式时遇到 `"use strict";` 指令，就会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
"use strict";

(function () {
    "use strict";
    var foo = true;
}());
```

:::

此规则的**正确**代码示例：

::: correct

```js
"use strict";

(function () {
    var foo = true;
}());
```

:::

::: correct

```js
(function () {
    "use strict";
    var foo = true;
}());
```

:::