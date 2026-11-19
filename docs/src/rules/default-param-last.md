---
title: default-param-last
rule_type: suggestion
---

将默认参数放在最后，可以在调用函数时省略末尾的可选参数。

```js
// Correct: optional argument can be omitted
function createUser(id, isAdmin = false) {}
createUser("tabby")

// Incorrect: optional argument can **not** be omitted
function createUser(isAdmin = false, id) {}
createUser(undefined, "tabby")
```

<a id="rule-details"></a>

## 规则详情

该规则要求默认参数位于参数列表末尾。

以下是此规则下**不正确**代码的示例：

::: incorrect

```js
/* eslint default-param-last: ["error"] */

function f(a = 0, b) {}

function g(a, b = 0, c) {}
```

:::

以下是此规则下**正确**代码的示例：

::: correct

```js
/* eslint default-param-last: ["error"] */

function f(a, b = 0) {}

function g(a, b = 0, c = 0) {}
```

:::

此规则还支持 TypeScript 类型语法。

以下是不符合此规则的 TypeScript 代码示例：

::: incorrect

```ts
/* eslint default-param-last: ["error"] */

function h(a = 0, b: number) {}
```

:::

以下是符合此规则的 TypeScript 代码示例：

::: correct

```ts
/* eslint default-param-last: ["error"] */

function h(a = 0, b?: number) {}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

