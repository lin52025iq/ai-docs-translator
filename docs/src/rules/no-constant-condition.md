---
title: no-constant-condition
rule_type: problem
related_rules:
- no-constant-binary-expression
---



将常量表达式（例如字面量）用作测试条件，可能是笔误，也可能是为了触发特定行为而进行的开发操作。例如，下面的代码看起来还没有准备好用于生产环境。

```js
if (false) {
    doSomethingUnfinished();
}
```

<a id="rule-details"></a>

## 规则详情

此规则禁止在以下结构的测试条件中使用常量表达式：

* `if`、`for`、`while` 或 `do...while` 语句
* `?:` 三元表达式

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-constant-condition: "error"*/

if (false) {
    doSomethingUnfinished();
}

if (void x) {
    doSomethingUnfinished();
}

if (x &&= false) {
    doSomethingNever();
}

if (class {}) {
    doSomethingAlways();
}

if (new Boolean(x)) {
    doSomethingAlways();
}

if (Boolean(1)) {
    doSomethingAlways();
}

if (undefined) {
    doSomethingUnfinished();
}

if (x ||= true) {
    doSomethingAlways();
}

for (;-2;) {
    doSomethingForever();
}

while (typeof x) {
    doSomethingForever();
}

do {
    doSomethingForever();
} while (x = -1);

const result = 0 ? a : b;

if(input === "hello" || "bye"){
  output(input);
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-constant-condition: "error"*/

if (x === 0) {
    doSomething();
}

for (;;) {
    doSomethingForever();
}

while (typeof x === "undefined") {
    doSomething();
}

do {
    doSomething();
} while (x);

const result = x !== 0 ? a : b;

if(input === "hello" || input === "bye"){
  output(input);
}
```

:::

<a id="options"></a>

## 选项

<a id="checkloops"></a>

### checkLoops

此字符串选项支持以下取值：

* `"all"` - 禁止在所有循环中使用常量表达式。
* `"allExceptWhileTrue"`（默认值）- 除表达式为 `true` 的 `while` 循环外，禁止在所有循环中使用常量表达式。
* `"none"` - 允许在循环中使用常量表达式。

或者，你也可以将 `checkLoops` 的值设为布尔值，其中 `true` 等同于 `"all"`，`false` 等同于 `"none"`。

当 `checkLoops` 为 `"all"` 或 `true` 时的错误代码示例：

::: incorrect

```js
/*eslint no-constant-condition: ["error", { "checkLoops": "all" }]*/

while (true) {
    doSomething();
};

for (;true;) {
    doSomething();
};
```

:::

::: incorrect

```js
/*eslint no-constant-condition: ["error", { "checkLoops": true }]*/

while (true) {
    doSomething();
};

do {
    doSomething();
} while (true)
```

:::

当 `checkLoops` 为 `"all"` 或 `true` 时的正确代码示例：

::: correct

```js
/*eslint no-constant-condition: ["error", { "checkLoops": "all" }]*/

while (a === b) {
    doSomething();
};
```

:::

::: correct

```js
/*eslint no-constant-condition: ["error", { "checkLoops": true }]*/

for (let x = 0; x <= 10; x++) {
    doSomething();
};
```

:::

当 `checkLoops` 为 `"allExceptWhileTrue"` 时的正确代码示例：

::: correct

```js
/*eslint no-constant-condition: "error"*/

while (true) {
    doSomething();
};
```

:::

当 `checkLoops` 为 `"none"` 或 `false` 时的正确代码示例：

::: correct

```js
/*eslint no-constant-condition: ["error", { "checkLoops": "none" }]*/

while (true) {
    doSomething();
    if (condition()) {
        break;
    }
};

do {
    doSomething();
    if (condition()) {
        break;
    }
} while (true)
```

:::

::: correct

```js
/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

while (true) {
    doSomething();
    if (condition()) {
        break;
    }
};

for (;true;) {
    doSomething();
    if (condition()) {
        break;
    }
};
```

:::
