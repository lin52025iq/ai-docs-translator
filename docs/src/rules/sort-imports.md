---
title: sort-imports
rule_type: suggestion
related_rules:
- sort-keys
- sort-vars
---



`import` 语句用于导入从外部模块导出的成员（函数、对象或原始值）。以下是使用特定成员语法的示例：

```js
// single - Import single member.
import myMember from "my-module.js";
import {myOtherMember} from "my-other-module.js";

// multiple - Import multiple members.
import {foo, bar} from "my-module.js";

// all - Import all members, where myModule contains all the exported bindings.
import * as myModule from "my-module.js";
```

`import` 语句也可以导入没有导出绑定的模块。当模块没有导出任何内容，但会运行自己的代码或更改全局上下文对象时，可以使用这种方式。

```js
// none - Import module without exported bindings.
import "my-module.js"
```

声明多个导入时，将 `import` 声明排序可以让开发者更容易阅读代码，并在之后找到所需的导入。这条规则纯粹是风格方面的要求。

<a id="rule-details"></a>

## 规则详情

这条规则会检查所有 `import` 声明，并验证所有导入是否先按所用成员语法排序，再按第一个成员或别名名称的字母顺序排序。

命令行中的 `--fix` 选项会自动修复这条规则报告的某些问题：同一行中的多个成员会自动排序（例如，`import { b, a } from 'foo.js'` 会被修正为 `import { a, b } from 'foo.js'`），但不会对多行内容重新排序。

<a id="options"></a>

## 选项

这条规则接受一个对象，其属性如下：

* `ignoreCase`（默认值：`false`）
* `ignoreDeclarationSort`（默认值：`false`）
* `ignoreMemberSort`（默认值：`false`）
* `memberSyntaxSortOrder`（默认值：`["none", "all", "multiple", "single"]`）；数组中必须包含全部 4 项，但可以更改顺序：
    * `none` = 导入没有导出绑定的模块。
    * `all` = 导入由导出绑定提供的所有成员。
    * `multiple` = 导入多个成员。
    * `single` = 导入单个成员。
* `allowSeparatedGroups`（默认值：`false`）

默认选项设置如下：

```json
{
    "sort-imports": ["error", {
        "ignoreCase": false,
        "ignoreDeclarationSort": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        "allowSeparatedGroups": false
    }]
}
```

<a id="default-settings"></a>

### 默认设置

使用默认选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: "error"*/
import 'module-without-export.js';
import * as bar from 'bar.js';
import * as foo from 'foo.js';
import {alpha, beta} from 'alpha.js';
import {delta, gamma} from 'delta.js';
import a from 'baz.js';
import {b} from 'qux.js';
```

:::

::: correct

```js
/*eslint sort-imports: "error"*/
import a from 'foo.js';
import b from 'bar.js';
import c from 'baz.js';
```

:::

::: correct

```js
/*eslint sort-imports: "error"*/
import 'foo.js'
import * as bar from 'bar.js';
import {a, b} from 'baz.js';
import c from 'qux.js';
import {d} from 'quux.js';
```

:::

::: correct

```js
/*eslint sort-imports: "error"*/
import {a, b, c} from 'foo.js'
```

:::

使用默认选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: "error"*/
import b from 'foo.js';
import a from 'bar.js';
```

:::

::: incorrect

```js
/*eslint sort-imports: "error"*/
import a from 'foo.js';
import A from 'bar.js';
```

:::

::: incorrect

```js
/*eslint sort-imports: "error"*/
import {c, d} from 'foo.js';
import {a, b} from 'bar.js';
```

:::

::: incorrect

```js
/*eslint sort-imports: "error"*/
import a from 'foo.js';
import {b, c} from 'bar.js';
```

:::

::: incorrect

```js
/*eslint sort-imports: "error"*/
import {a} from 'foo.js';
import {b, c} from 'bar.js';
```

:::

::: incorrect

```js
/*eslint sort-imports: "error"*/
import a from 'foo.js';
import * as b from 'bar.js';
```

:::

::: incorrect

```js
/*eslint sort-imports: "error"*/
import {b, a, c} from 'foo.js'
```

:::

<a id="ignorecase"></a>

### `ignoreCase`

当值为 `false`（默认值）时，字母表中的大写字母必须始终排在小写字母之前。

当值为 `true` 时，这条规则会忽略导入项本地名称的大小写。

使用默认 `{ "ignoreCase": false }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreCase": false }]*/
import a from 'bar.js';
import B from 'foo.js';
import c from 'baz.js';
```

:::

使用默认 `{ "ignoreCase": false }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreCase": false }]*/
import B from 'bar.js';
import a from 'foo.js';
import c from 'baz.js';
```

:::

使用 `{ "ignoreCase": true }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreCase": true }]*/
import a from 'bar.js';
import B from 'foo.js';
import c from 'baz.js';
```

:::

使用 `{ "ignoreCase": true }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreCase": true }]*/
import B from 'foo.js';
import a from 'bar.js';
```

:::

<a id="ignoredeclarationsort"></a>

### `ignoreDeclarationSort`

当值为 `true` 时，这条规则会忽略 import 声明语句的排序。默认值为 `false`。

使用默认 `{ "ignoreDeclarationSort": false }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreDeclarationSort": false }]*/
import b from 'foo.js'
import a from 'bar.js'
```

:::

使用默认 `{ "ignoreDeclarationSort": false }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreDeclarationSort": false }]*/
import a from 'bar.js';
import b from 'foo.js';
```

:::

使用 `{ "ignoreDeclarationSort": true }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreDeclarationSort": true }]*/
import b from 'foo.js'
import a from 'bar.js'
```

:::

使用 `{ "ignoreDeclarationSort": true }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreDeclarationSort": true }]*/
import {b, a, c} from 'foo.js';
```

:::

<a id="ignoremembersort"></a>

### `ignoreMemberSort`

当值为 `true` 时，这条规则会忽略 `multiple` 成员导入声明中的成员排序。默认值为 `false`。

使用默认 `{ "ignoreMemberSort": false }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreMemberSort": false }]*/
import {b, a, c} from 'foo.js'
```

:::

使用默认 `{ "ignoreMemberSort": false }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreMemberSort": false }]*/
import {a, b, c} from 'foo.js';
```

:::

使用 `{ "ignoreMemberSort": true }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "ignoreMemberSort": true }]*/
import {b, a, c} from 'foo.js'
```

:::

使用 `{ "ignoreMemberSort": true }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "ignoreMemberSort": true }]*/
import b from 'foo.js';
import a from 'bar.js';
```

:::

<a id="membersyntaxsortorder"></a>

### `memberSyntaxSortOrder`

此选项接受一个包含四个预定义元素的数组，元素的顺序决定了导入样式的顺序。

默认顺序为 `["none", "all", "multiple", "single"]`。

共有四种不同的样式，默认的成员语法排序顺序如下：

* `none` - 导入没有导出绑定的模块。
* `all` - 导入由导出绑定提供的所有成员。
* `multiple` - 导入多个成员。
* `single` - 导入单个成员。

数组中必须指定全部四个选项，但可以自定义它们的顺序。

使用默认 `{ "memberSyntaxSortOrder": ["none", "all", "multiple", "single"] }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: "error"*/
import a from 'foo.js';
import * as b from 'bar.js';
```

:::

使用 `{ "memberSyntaxSortOrder": ['single', 'all', 'multiple', 'none'] }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "memberSyntaxSortOrder": ['single', 'all', 'multiple', 'none'] }]*/

import a from 'foo.js';
import * as b from 'bar.js';
```

:::

使用 `{ "memberSyntaxSortOrder": ['all', 'single', 'multiple', 'none'] }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "memberSyntaxSortOrder": ['all', 'single', 'multiple', 'none'] }]*/

import * as foo from 'foo.js';
import z from 'zoo.js';
import {a, b} from 'foo.js';
```

:::

<a id="allowseparatedgroups"></a>

### `allowSeparatedGroups`

当值为 `true` 时，这条规则只会检查连续行中出现的 import 声明语句的排序。默认值为 `false`。

换句话说，在 import 声明语句之后出现空行、注释行或包含任何其他语句的行，都会重置 import 声明语句的排序。

使用 `{ "allowSeparatedGroups": true }` 选项时，这条规则的**错误**代码示例：

::: incorrect

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';
import a from 'baz.js';
```

:::

使用 `{ "allowSeparatedGroups": true }` 选项时，这条规则的**正确**代码示例：

::: correct

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';

import a from 'baz.js';
```

:::

::: correct

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';
// comment
import a from 'baz.js';
```

:::

::: correct

```js
/*eslint sort-imports: ["error", { "allowSeparatedGroups": true }]*/

import b from 'foo.js';
import c from 'bar.js';
quux();
import a from 'baz.js';
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

这条规则属于格式偏好，不遵循它不会对代码质量产生负面影响。如果按字母顺序排列导入项并非你的编码规范的一部分，可以禁用这条规则。
