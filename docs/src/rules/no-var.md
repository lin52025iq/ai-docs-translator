---
title: no-var
rule_type: suggestion
---



ECMAScript 6 允许程序员使用 `let` 和 `const` 关键字创建块级作用域变量，而非函数作用域变量。块级作用域在许多其他编程语言中很常见，有助于程序员避免以下错误：

```js
var count = people.length;
var enoughFood = sandwiches.length >= count;

if (enoughFood) {
    var count = sandwiches.length; // accidentally overriding the count variable
    console.log("We have " + count + " sandwiches for everyone. Plenty for all!");
}

// our count variable is no longer accurate
console.log("We have " + count + " people and " + sandwiches.length + " sandwiches!");
```

<a id="rule-details"></a>

## 规则详情

此规则旨在减少 `var` 的使用，并鼓励改用 `const` 或 `let`。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-var: "error"*/

var x = "y";
var CONFIG = {};
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-var: "error"*/

let x = "y";
const CONFIG = {};
```

:::

此规则还支持 TypeScript 类型语法。在 TypeScript 中，声明全局变量有多种方式。只有使用 `var` 才适用于所有情况。请参阅此 [TypeScript 在线编辑器](https://www.typescriptlang.org/play/?#code/PQgEB4CcFMDNpgOwMbVAGwJYCMC8AiAEwHsBbfUYAPgFgAoew6ZdAQxlAHN1jtX1QAb3qhRGaABdQAGUkAuUAGcJkTIk4ixAN3agAauwXLV6+ptFqJCWK1SgA6mpIB3IebGjHiIyrUa6HgC+9MEMdGDcvPygtqiKivSyEvQGkPReZuHAoM5OxK6ckvS5iC4AdEnFec5lqVWl+WUZYWAlLkpFdG2NSaC4oADkA-XlqX2Dw13VTWrjQ5kRPHzoACoAFpiKXJ2Ry+ubFTtL-PuKtez0uycbZ830i1GrNx3JdFdPB73982-HH2djb6Td6nGaIOaTe7ZRTQdCwbavGFww6I2Gwc5pOhI9F3LIdOEvejYlEQolojGkrHkryU+jQAAeAAdiJApIJAkA) 作为参考。

此规则的错误 TypeScript 代码示例：

:::incorrect

```ts
/*eslint no-var: "error"*/

declare var x: number

declare namespace ns {
	var x: number
}

declare module 'module' {
	var x: number
}
```

:::

此规则的正确 TypeScript 代码示例：

:::correct

```ts
/*eslint no-var: "error"*/

declare global {
    declare var x: number
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用

除了非 ES6 环境外，如果现有 JavaScript 项目刚开始在代码库中引入 ES6，而将 `var` 迁移为 `let` 的成本过高，则可能不适合应用此规则。