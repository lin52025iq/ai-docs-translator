---
title: no-unassigned-vars
rule_type: problem
related_rules:
- init-declarations
- no-unused-vars
- prefer-const
---


此规则会标记声明后从未赋值、但仍在代码中读取或使用的 `let` 或 `var` 变量。由于这些变量的值始终为 `undefined`，使用它们很可能是编程错误。

例如，如果检查 `status` 变量的值，但从未给它赋值，那么它的值始终为 `undefined`：

```js
let status;

// ...forgot to assign a value to status...

if (status === 'ready') {
  console.log('Ready!');
}
```

<a id="rule-details"></a>

## 规则详情

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-unassigned-vars: "error"*/

let status;
if (status === 'ready') {
  console.log('Ready!');
}

let user;
greet(user);

function test() {
  let error;
  return error || "Unknown error";
}

let options;
const { debug } = options || {};

let flag;
while (!flag) {
  // Do something...
}

let config;
function init() {
  return config?.enabled;
}
```

:::

在 TypeScript 中：

::: incorrect

```ts
/*eslint no-unassigned-vars: "error"*/

let value: number | undefined;
console.log(value);
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-unassigned-vars: "error"*/

let message = "hello";
console.log(message);

let user;
user = getUser();
console.log(user.name);

let count;
count = 1;
count++;

// Variable is unused (should be reported by `no-unused-vars` only)
let temp;

let error;
if (somethingWentWrong) {
  error = "Something went wrong";
}
console.log(error);

let item;
for (item of items) {
  process(item);
}

let config;
function setup() {
  config = { debug: true };
}
setup();
console.log(config);

let one = undefined;
if (one === two) {
  // Noop
}
```

:::

在 TypeScript 中：

::: correct

```ts
/*eslint no-unassigned-vars: "error"*/

declare let value: number | undefined;
console.log(value);

declare module "my-module" {
  let value: string;
  export = value;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果代码有意声明并使用从未赋值的变量，可以禁用此规则。以下情况可能会这样做：

- 在旧代码库中，未初始化的变量被用作占位符。
- 某些 TypeScript 使用场景中，变量声明了类型但有意不赋值（不过更推荐使用 `declare`）。
