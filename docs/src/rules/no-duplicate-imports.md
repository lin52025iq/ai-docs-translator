---
title: no-duplicate-imports
rule_type: problem
---


每个模块使用单条 `import` 语句可以让代码更清晰，因为这样可以在一行中看到从该模块导入的所有内容。

在下面的示例中，第 1 行的 `module` 导入在第 3 行重复出现。可以将它们合并，让导入列表更加简洁。

```js
import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';
```

<a id="rule-details"></a>

## 规则详情

此规则要求将同一模块中所有可以合并的导入放在同一条 `import` 语句中。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-duplicate-imports: "error"*/

import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-duplicate-imports: "error"*/

import { merge, find } from 'module';
import something from 'another-module';
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-duplicate-imports: "error"*/

// not mergeable
import { merge } from 'module';
import * as something from 'module';
```

:::

<a id="options"></a>

## 选项

此规则接受一个对象选项：

* `"includeExports"`：`true`（默认值为 `false`）时，除导入外，也会检查导出。
* `"allowSeparateTypeImports"`：`true`（默认值为 `false`）时，允许在 TypeScript 文件中从同一模块分别导入类型和值。

### includeExports

如果要从已导入的模块重新导出，应将这些导入添加到 `import` 语句中，并直接导出，而不是使用 `export ... from`。

此规则在 `{ "includeExports": true }` 选项下的错误代码示例：

::: incorrect

```js
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge } from 'module';

export { find } from 'module';
```

:::

此规则在 `{ "includeExports": true }` 选项下的正确代码示例：

::: correct

```js
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge, find } from 'module';

export { find };
```

:::

此规则在 `{ "includeExports": true }` 选项下的正确代码示例：

::: correct

```js
/*eslint no-duplicate-imports: ["error", { "includeExports": true }]*/

import { merge, find } from 'module';

// cannot be merged with the above import
export * as something from 'module';

// cannot be written differently
export * from 'module';
```

:::

### allowSeparateTypeImports

TypeScript 允许使用 `import type` 导入类型。默认情况下，如果 `import type` 的模块说明符与 `import` 相同，此规则会报告问题。`allowSeparateTypeImports` 选项允许你覆盖此行为。

此规则在默认选项 `{ "allowSeparateTypeImports": false }` 下的 TypeScript 错误代码示例：

::: incorrect

```ts
/*eslint no-duplicate-imports: ["error", { "allowSeparateTypeImports": false }]*/

import { someValue } from 'module';
import type { SomeType } from 'module';
```

:::

此规则在默认选项 `{ "allowSeparateTypeImports": false }` 下的 TypeScript 正确代码示例：

::: correct

```ts
/*eslint no-duplicate-imports: ["error", { "allowSeparateTypeImports": false }]*/

import { someValue, type SomeType } from 'module';
```

:::

此规则在 `{ "allowSeparateTypeImports": true }` 选项下的 TypeScript 错误代码示例：

::: incorrect

```ts
/*eslint no-duplicate-imports: ["error", { "allowSeparateTypeImports": true }]*/

import { someValue } from 'module';
import type { SomeType } from 'module';
import type { AnotherType } from 'module';
```

:::

此规则在 `{ "allowSeparateTypeImports": true }` 选项下的 TypeScript 正确代码示例：

::: correct

```ts
/*eslint no-duplicate-imports: ["error", { "allowSeparateTypeImports": true }]*/

import { someValue } from 'module';
import type { SomeType, AnotherType } from 'module';
```

:::
