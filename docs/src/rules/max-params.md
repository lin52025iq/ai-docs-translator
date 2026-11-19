---
title: max-params
rule_type: suggestion
related_rules:
- complexity
- max-depth
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-statements
---


参数过多的函数可能难以阅读和编写，因为需要记住每个参数的含义、类型以及它们的顺序。因此，许多程序员遵循一种约定，限制函数可以接受的参数数量。

```js
function foo (bar, baz, qux, qxx) { // four parameters, may be too many
    doSomething();
}
```

<a id="rule-details"></a>

## 规则详情

此规则强制限制函数定义中允许的参数数量。

<a id="options"></a>

## 选项

此规则有一个数字或对象选项：

* `"max"`（默认值为 `3`）强制限制函数定义中的参数数量
* `"countThis"`（默认值为 `"except-void"`，可选值为 `"always"`、`"never"` 或 `"except-void"`）用于指定是否计算 `this` 声明（仅限 TypeScript）

**已弃用：**对象属性 `maximum` 已弃用；请改用对象属性 `max`。
**已弃用：**对象属性 `countVoidThis` 已弃用；请使用 `countThis: "except-void"` 替代 `countVoidThis: false`，并使用 `countThis: "always"` 替代 `countVoidThis: true`。

### max

使用默认选项 `{ "max": 3 }` 时，此规则的**错误**代码示例：

:::incorrect

```js
/*eslint max-params: ["error", 3]*/

function foo1 (bar, baz, qux, qxx) {
    doSomething();
}

let foo2 = (bar, baz, qux, qxx) => {
    doSomething();
};
```

:::

使用默认选项 `{ "max": 3 }` 时，此规则的**正确**代码示例：

:::correct

```js
/*eslint max-params: ["error", 3]*/

function foo1 (bar, baz, qux) {
    doSomething();
}

let foo2 = (bar, baz, qux) => {
    doSomething();
};
```

:::

<a id="countthis-typescript-only"></a>

### countThis（仅限 TypeScript）

此规则有一个 TypeScript 专用选项 `countThis`，用于指定是否计算 `this` 声明。
有效值如下：

* `"always"`：任何 `this` 类型注解都会计为一个参数
* `"never"`：永远不计算 `this`
* `"except-void"`：仅当 `this` 的类型不是 `void` 时才计算。等同于已弃用的 `countVoidThis: false`。

此规则的**正确** TypeScript 代码示例：

:::correct

```ts
/*eslint max-params: ["error", { "max": 2, "countThis": "except-void" }]*/

function hasNoThis(this: void, first: string, second: string) {
	// ...
}
```

:::

:::correct

```ts
/*eslint max-params: ["error", { "max": 2, "countThis": "never" }]*/

function hasThis(this: unknown[], first: string, second: string) {
	// ...
}
```

:::

此规则的**错误** TypeScript 代码示例：

:::incorrect

```ts
/*eslint max-params: ["error", { "max": 2, "countThis": "always" }]*/

function hasNoThis(this: void, first: string, second: string) {
	// ...
}
```

:::

:::incorrect

```ts
/*eslint max-params: ["error", { "max": 2, "countThis": "except-void" }]*/

function hasThis(this: unknown[], first: string, second: string) {
	// ...
}
```

:::
