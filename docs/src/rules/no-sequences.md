---
title: no-sequences
rule_type: suggestion
---


逗号运算符在只需要一个表达式的地方包含多个表达式。它会从左到右计算每个操作数，并返回最后一个操作数的值。不过，这通常会掩盖副作用，而且使用逗号运算符往往是无意的。以下是一些序列表达式示例：

```js
let a = (3, 5); // a = 5

a = b += 5, a + b;

while (a = next(), a && a.length);

(0, eval)("doSomething();");
```

<a id="rule-details"></a>

## 规则详情

此规则禁止使用逗号运算符，但以下情况除外：

* 在 `for` 语句的初始化部分或更新部分中。
* 默认情况下，如果表达式序列显式地用括号括起来。可以通过 `allowInParentheses` 选项取消此例外。

此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-sequences: "error"*/

foo = doSomething(), val;

0, eval("doSomething();");

do {} while (doSomething(), !!test);

for (; doSomething(), !!test; );

if (doSomething(), !!test);

switch (val = foo(), val) {}

while (val = foo(), val < 42);

with (doSomething(), val) {}
```

:::

此规则的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-sequences: "error"*/

foo = (doSomething(), val);

(0, eval)("doSomething();");

do {} while ((doSomething(), !!test));

for (i = 0, j = 10; i < j; i++, j--);

if ((doSomething(), !!test));

switch ((val = foo(), val)) {}

while ((val = foo(), val < 42));

with ((doSomething(), val)) {}
```

:::

<a id="note-about-arrow-function-bodies"></a>

### 关于箭头函数体的说明

如果箭头函数体是语句而不是代码块，并且该语句包含序列表达式，则需要在该语句两侧使用双层括号，以表明该序列表达式是有意使用的。

箭头函数的**错误**代码示例：

::: incorrect

```js
/*eslint no-sequences: "error"*/
const foo = (val) => (console.log('bar'), val);

const baz = () => ((bar = 123), 10);

const qux = () => { return (bar = 123), 10 }
```

:::

箭头函数的**正确**代码示例：

::: correct

```js
/*eslint no-sequences: "error"*/
const foo = (val) => ((console.log('bar'), val));

const baz = () => (((bar = 123), 10));

const qux = () => { return ((bar = 123), 10) }
```

:::

<a id="options"></a>

## 选项

此规则接受一个对象作为选项，该对象具有以下属性：

* `"allowInParentheses"`：如果设为 `true`（默认值），此规则允许显式地用括号括起来的表达式序列。

### allowInParentheses

使用 `{ "allowInParentheses": false }` 选项时，此规则的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-sequences: ["error", { "allowInParentheses": false }]*/

foo = (doSomething(), val);

(0, eval)("doSomething();");

do {} while ((doSomething(), !!test));

for (; (doSomething(), !!test); );

if ((doSomething(), !!test));

switch ((val = foo(), val)) {}

while ((val = foo(), val < 42));

with ((doSomething(), val)) {}

const foo = (val) => ((console.log('bar'), val));
```

:::

使用 `{ "allowInParentheses": false }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-sequences: ["error", { "allowInParentheses": false }]*/

for (i = 0, j = 10; i < j; i++, j--);
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果可以接受使用逗号运算符的序列表达式，请禁用此规则。
另一种情况是，你可能希望报告逗号运算符的所有用法，包括在 `for` 循环中的用法。可以通过规则 `no-restricted-syntax` 实现：

```js
{
    "rules": {
        "no-restricted-syntax": ["error", "SequenceExpression"]
    }
}
```
