---
title: no-unsafe-optional-chaining
rule_type: problem
---



可选链（`?.`）表达式可能会短路并返回 `undefined`。因此，将求值后的可选链表达式当作函数、对象、数字等使用，可能会导致 TypeError 或意外结果。例如：

```js
const obj = undefined;

1 in obj?.foo;  // TypeError
with (obj?.foo);  // TypeError
for (bar of obj?.foo);  // TypeError
bar instanceof obj?.foo;  // TypeError
const { bar } = obj?.foo;  // TypeError
```

此外，括号会限制链中短路的作用范围。例如：

```js
const obj = undefined;

(obj?.foo)(); // TypeError
(obj?.foo).bar; // TypeError
```

<a id="rule-details"></a>
## 规则详情

此规则旨在检测某些使用可选链却无法避免运行时错误的情况。具体来说，它会标记那些短路并返回 `undefined` 后会导致 TypeError 的可选链表达式。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-unsafe-optional-chaining: "error"*/

(obj?.foo)();

(obj?.foo).bar;

(foo?.()).bar;

(foo?.()).bar();

(obj?.foo ?? obj?.bar)();

(foo || obj?.foo)();

(obj?.foo && foo)();

(foo ? obj?.foo : bar)();

(foo, obj?.bar).baz;

(obj?.foo)`template`;

new (obj?.foo)();

[...obj?.foo];

bar(...obj?.foo);

1 in obj?.foo;

bar instanceof obj?.foo;

for (bar of obj?.foo);

const { bar } = obj?.foo;

[{ bar } = obj?.foo] = [];

with (obj?.foo);

class A extends obj?.foo {}

const a = class A extends obj?.foo {};

function* gen() {
    yield* obj?.foo;
}

async function foo () {
    const { bar } = await obj?.foo;
   (await obj?.foo)();
   (await obj?.foo).bar;
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-unsafe-optional-chaining: "error"*/

(obj?.foo)?.();

obj?.foo();

(obj?.foo ?? bar)();

obj?.foo.bar;

obj.foo?.bar;

foo?.()?.bar;

(obj?.foo ?? bar)`template`;

new (obj?.foo ?? bar)();

const baz = {...obj?.foo};

const { bar } = obj?.foo || baz;

function* gen() {
    yield obj?.foo;
    yield* obj?.foo ?? [];
}

async function foo () {
  const { bar } = await obj?.foo || baz;
   (await obj?.foo)?.();
   (await obj?.foo)?.bar;
}
```

:::

<a id="options"></a>
## 选项

此规则有一个对象选项：

* `disallowArithmeticOperators`：禁止对可选链表达式执行算术运算（默认为 `false`）。如果该选项设为 `true`，此规则会警告对可选链表达式执行的算术运算，因为这可能导致 `NaN`。

<a id="disallowarithmeticoperators"></a>
### disallowArithmeticOperators

将此选项设为 `true` 后，此规则会检查以下运算：

* 一元运算符：`-`、`+`
* 算术运算符：`+`、`-`、`/`、`*`、`%`、`**`
* 赋值运算符：`+=`、`-=`、`/=`、`*=`、`%=`、`**=`

启用 `{ "disallowArithmeticOperators": true }` 选项时，此规则的其他错误代码示例：

::: incorrect

```js
/*eslint no-unsafe-optional-chaining: ["error", { "disallowArithmeticOperators": true }]*/

+obj?.foo;
-obj?.foo;

obj?.foo + bar;
obj?.foo - bar;
obj?.foo / bar;
obj?.foo * bar;
obj?.foo % bar;
obj?.foo ** bar;

baz += obj?.foo;
baz -= obj?.foo;
baz /= obj?.foo;
baz *= obj?.foo;
baz %= obj?.foo;
baz **= obj?.foo;

async function foo () {
  +await obj?.foo;
  await obj?.foo + bar;
  baz += await obj?.foo;
}
```

:::
