---
title: no-restricted-modules
rule_type: suggestion
---

在 Node.js 中，模块是组织在 JavaScript 文件中的简单或复杂功能，可在整个 Node.js 应用程序中重复使用。关键字 `require` 用于在 Node.js/CommonJS 中将模块导入应用程序。这样可以实现动态加载：加载的模块名称无需预先定义为静态值，也可以有条件地仅在“确实需要”时加载模块。

为什么要限制模块？

如果你想限制开发者可使用的方法，禁止使用特定的 Node.js 模块会很有用。例如，如果你想禁止访问文件系统，可以阻止使用 `fs` 模块。

<a id="rule-details"></a>

## 规则详情

此规则允许你指定不希望在应用程序中使用的模块。

<a id="options"></a>

## 选项

此规则接受一个或多个字符串作为选项，即受限模块的名称。

```json
"no-restricted-modules": ["error", "foo-module", "bar-module"]
```

它也可以接受一个对象，其中包含 `paths` 列表和 gitignore 风格的 `patterns` 字符串列表。

```json
"no-restricted-modules": ["error", { "paths": ["foo-module", "bar-module"] }]
```

```json
"no-restricted-modules": ["error", {
    "paths": ["foo-module", "bar-module"],
    "patterns": ["foo-module/private/*", "bar-module/*","!baz-module/good"]
}]
```

你还可以按如下方式为要限制的路径指定自定义消息：

```json
"no-restricted-modules": ["error", {
  "name": "foo-module",
  "message": "Please use bar-module instead."
  }
]
```

或者这样：

```json
"no-restricted-modules": ["error",{
"paths":[{
  "name": "foo-module",
  "message": "Please use bar-module instead."
  }]
}]
```

自定义消息会附加到默认错误消息之后。请注意，不能为受限模式指定自定义错误消息，因为某个模块可能匹配多个模式。

要限制使用所有 Node.js 核心模块（参见 <https://github.com/nodejs/node/tree/main/lib>）：

```json
{
    "no-restricted-modules": ["error",
        "assert","buffer","child_process","cluster","crypto","dgram","dns","domain","events","freelist","fs","http","https","module","net","os","path","punycode","querystring","readline","repl","smalloc","stream","string_decoder","sys","timers","tls","tracing","tty","url","util","vm","zlib"
    ]
}
```

以下是此规则的**错误**代码示例，示例中限制了模块 `"fs", "cluster", "lodash"`：

::: incorrect

```js
/*eslint no-restricted-modules: ["error", "fs", "cluster"]*/

const fs = require('fs');
const cluster = require('cluster');
```

:::

::: incorrect

```js
/*eslint no-restricted-modules: ["error", {"paths": ["cluster"] }]*/

const cluster = require('cluster');
```

:::

::: incorrect

```js
/*eslint no-restricted-modules: ["error", { "patterns": ["lodash/*"] }]*/

const pick = require('lodash/pick');
```

:::

以下是此规则的**正确**代码示例，示例中限制了模块 `"fs", "cluster", "lodash"`：

::: correct

```js
/*eslint no-restricted-modules: ["error", "fs", "cluster"]*/

const crypto = require('crypto');
```

:::

::: correct

```js
/*eslint no-restricted-modules: ["error", {
    "paths": ["fs", "cluster"],
    "patterns": ["lodash/*", "!lodash/pick"]
}]*/

const crypto = require('crypto');
const pick = require('lodash/pick');
```

:::