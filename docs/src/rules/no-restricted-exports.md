---
title: no-restricted-exports
rule_type: suggestion
---


在项目中，出于各种原因，某些名称可能不允许用作导出名称。

<a id="rule-details"></a>

## 规则详情

此规则禁止将指定名称用作导出名称。

<a id="options"></a>

## 选项

默认情况下，此规则不会禁止任何名称。只有配置中指定的名称才会被禁止。

此规则有一个对象选项：

* `"restrictedNamedExports"` 是一个字符串数组，其中每个字符串都是要限制的名称。
* `"restrictedNamedExportsPattern"` 是一个表示正则表达式模式的字符串。匹配此模式的命名导出将受到限制。此选项不适用于 `default` 命名导出。
* `"restrictDefaultExports"` 是一个对象选项，包含用于限制某些默认导出声明的布尔属性。仅当 `restrictedNamedExports` 选项不包含 `"default"` 值时，此选项才有效。允许使用以下属性：
    * `direct`：限制 `export default` 声明。
    * `named`：限制 `export { foo as default };` 声明。
    * `defaultFrom`：限制 `export { default } from 'foo';` 声明。
    * `namedFrom`：限制 `export { foo as default } from 'foo';` 声明。
    * `namespaceFrom`：限制 `export * as default from 'foo';` 声明。

### restrictedNamedExports

`"restrictedNamedExports"` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", {
    "restrictedNamedExports": ["foo", "bar", "Baz", "a", "b", "c", "d", "e", "👍"]
}]*/

export const foo = 1;

export function bar() {}

export class Baz {}

const a = {};
export { a };

function someFunction() {}
export { someFunction as b };

export { c } from "some_module";

export { "d" } from "some_module";

export { something as e } from "some_module";

export { "👍" } from "some_module";
```

:::

`"restrictedNamedExports"` 选项的正确代码示例：

::: correct

```js
/*eslint no-restricted-exports: ["error", {
    "restrictedNamedExports": ["foo", "bar", "Baz", "a", "b", "c", "d", "e", "👍"]
}]*/

export const quux = 1;

export function myFunction() {}

export class MyClass {}

const a = {};
export { a as myObject };

function someFunction() {}
export { someFunction };

export { c as someName } from "some_module";

export { "d" as " d " } from "some_module";

export { something } from "some_module";

export { "👍" as thumbsUp } from "some_module";
```

:::

<a id="default-exports"></a>

#### 默认导出

按照设计，`"restrictedNamedExports"` 选项不会禁止 `export default` 声明。如果将 `"default"` 配置为受限名称，则此限制仅适用于命名导出声明。

`"restrictedNamedExports": ["default"]` 选项的其他错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["default"] }]*/

function foo() {}

export { foo as default };
```

:::

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["default"] }]*/

export { default } from "some_module";
```

:::

`"restrictedNamedExports": ["default"]` 选项的其他正确代码示例：

::: correct

```js
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["default", "foo"] }]*/

export default function foo() {}
```

:::

### restrictedNamedExportsPattern

`"restrictedNamedExportsPattern"` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", {
    "restrictedNamedExportsPattern": "bar$"
}]*/

export const foobar = 1;
```

:::

`"restrictedNamedExportsPattern"` 选项的正确代码示例：

::: correct

```js
/*eslint no-restricted-exports: ["error", {
    "restrictedNamedExportsPattern": "bar$"
}]*/

export const abc = 1;
```

:::

请注意，此选项不适用于 `export default` 或任何 `default` 命名导出。如果还想限制 `default` 导出，请使用 `restrictDefaultExports` 选项。

### restrictDefaultExports

此选项允许限制某些 `default` 声明。仅当 `restrictedNamedExports` 选项不包含 `"default"` 值时，此选项才有效。此选项接受以下属性：

#### direct

`"restrictDefaultExports": { "direct": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "direct": true } }]*/

export default foo;
```

:::

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "direct": true } }]*/

export default 42;
```

:::

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "direct": true } }]*/

export default function foo() {}
```

:::

#### named

`"restrictDefaultExports": { "named": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "named": true } }]*/

const foo = 123;

export { foo as default };
```

:::

#### defaultFrom

`"restrictDefaultExports": { "defaultFrom": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "defaultFrom": true } }]*/

export { default } from 'foo';
```

:::

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "defaultFrom": true } }]*/

export { default as default } from 'foo';
```

:::

#### namedFrom

`"restrictDefaultExports": { "namedFrom": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "namedFrom": true } }]*/

export { foo as default } from 'foo';
```

:::

#### namespaceFrom

`"restrictDefaultExports": { "namespaceFrom": true }` 选项的错误代码示例：

::: incorrect

```js
/*eslint no-restricted-exports: ["error", { "restrictDefaultExports": { "namespaceFrom": true } }]*/

export * as default from 'foo';
```

:::

<a id="known-limitations"></a>

## 已知限制

此规则不会检查重新导出声明中源模块的内容。尤其是，如果你重新导出另一个模块导出的所有内容，其中可能包含受限名称。此规则无法检测这类情况。

```js

//----- some_module.js -----
export function foo() {}

//----- my_module.js -----
/*eslint no-restricted-exports: ["error", { "restrictedNamedExports": ["foo"] }]*/

export * from "some_module"; // allowed, although this declaration exports "foo" from my_module
```
