---
title: prefer-arrow-callback
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
---



对于回调或函数参数，箭头函数可以作为函数表达式的一种理想替代方案。

例如，箭头函数会自动绑定到其外围作用域/上下文。这为 ES6 之前通过显式绑定函数表达式来实现类似行为的标准做法提供了另一种选择。

此外，箭头函数还具有以下特点：

* 更简洁，也更容易理解。

* 无论何时何地调用，都会进行词法绑定。

<a id="rule-details"></a>

## 规则详情

此规则会定位用作回调或函数参数的函数表达式。对于任何可以替换为箭头函数且不改变结果的函数表达式，都会报告错误。

以下示例**会**被标记：

::: incorrect

```js
/* eslint prefer-arrow-callback: "error" */

foo(function(a) { return a; }); // ERROR
// prefer: foo(a => a)

foo(function() { return this.a; }.bind(this)); // ERROR
// prefer: foo(() => this.a)
```

:::

如果箭头函数无法产生完全相同的结果，则不会报告。

以下示例**不会**被标记：

::: correct

```js
/* eslint prefer-arrow-callback: "error" */

// arrow function callback
foo(a => a); // OK

// generator as callback
foo(function*() { yield; }); // OK

// function expression not used as callback or function argument
const foo = function foo(a) { return a; }; // OK

// unbound function expression callback
foo(function() { return this.a; }); // OK

// recursive named function callback
foo(function bar(n) { return n && n + bar(n - 1); }); // OK
```

:::

此规则还支持 TypeScript 类型语法。

此规则下的错误 TypeScript 代码示例如下：

::: incorrect

```ts
/*eslint prefer-arrow-callback: "error"*/

foo(function bar(a: string) { a; });

test('foo', function (this: any) {});
```

:::

此规则下的正确 TypeScript 代码示例如下：

::: correct

```ts
/*eslint prefer-arrow-callback: "error"*/

foo((a: string) => a);

const foo = function foo(bar: any) {};
```

:::

<a id="options"></a>

## 选项

可以通过选项对象进一步控制此规则的行为。

默认值：`{ allowNamedFunctions: false, allowUnboundThis: true }`

### allowNamedFunctions

默认情况下，`{ "allowNamedFunctions": false }`，此 `boolean` 选项禁止将具名函数用作回调或函数参数。

将此值设为 `true` 会反转此选项的行为，允许不受限制地使用具名函数。

`{ "allowNamedFunctions": true }` 时，以下示例**不会**被标记：

::: correct

```js
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */

foo(function bar() {});
```

:::

当此规则的 `{ "allowNamedFunctions": true }` 时，错误的 TypeScript 代码示例如下：

::: incorrect

```ts
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */

foo(function(a: string) {});
```

:::

当此规则的 `{ "allowNamedFunctions": true }` 时，正确的 TypeScript 代码示例如下：

::: correct

```ts
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */

foo(function bar(a: string) {});
```

:::

### allowUnboundThis

默认情况下，`{ "allowUnboundThis": true }`，此 `boolean` 选项允许将包含 `this` 的函数表达式用作回调，前提是该函数未被显式绑定。

设为 `false` 时，此选项会毫无例外地禁止将函数表达式用作回调或函数参数。

`{ "allowUnboundThis": false }` 时，以下示例**会**被标记：

::: incorrect

```js
/* eslint prefer-arrow-callback: [ "error", { "allowUnboundThis": false } ] */

foo(function() { this.a; });

foo(function() { (() => this); });

someArray.map(function(item) { return this.doSomething(item); }, someObject);
```

:::

当此规则的 `{ "allowUnboundThis": false }` 时，错误的 TypeScript 代码示例如下：

::: incorrect

```ts
/* eslint prefer-arrow-callback: [ "error", { "allowUnboundThis": false } ] */

foo(function(a: string) { this; });

foo(function(a: string) { (() => this); });
```

:::

<a id="when-not-to-use-it"></a>

## 不应使用此规则的情况

* 在尚未采用 ES6 语言特性的环境中（ES3/5）。

* 在允许使用函数表达式来编写回调或函数参数的 ES6+ 环境中。

