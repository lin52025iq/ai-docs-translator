---
title: no-plusplus
rule_type: suggestion
---


由于一元运算符 `++` 和 `--` 会受到自动分号插入的影响，空白字符的差异可能改变源代码的语义。

```js
let i = 10;
let j = 20;

i ++
j
// i = 11, j = 20
```

```js
let i = 10;
let j = 20;

i
++
j
// i = 10, j = 21
```

<a id="rule-details"></a>

## 规则详情

此规则禁止使用一元运算符 `++` 和 `--`。

此规则中 **错误** 代码示例：

::: incorrect

```js
/*eslint no-plusplus: "error"*/

let foo = 0;
foo++;

let bar = 42;
bar--;

for (let i = 0; i < l; i++) {
    doSomething(i);
}
```

:::

此规则中 **正确** 代码示例：

::: correct

```js
/*eslint no-plusplus: "error"*/

let foo = 0;
foo += 1;

let bar = 42;
bar -= 1;

for (let i = 0; i < l; i += 1) {
    doSomething(i);
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项。

* `"allowForLoopAfterthoughts": true` 允许在 `for` 循环的尾表达式（最后一个表达式）中使用一元运算符 `++` 和 `--`。

### allowForLoopAfterthoughts

使用 `{ "allowForLoopAfterthoughts": true }` 选项时，此规则中 **正确** 代码示例：

::: correct

```js
/*eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/

for (let i = 0; i < l; i++) {
    doSomething(i);
}

for (let i = l; i >= 0; i--) {
    doSomething(i);
}

for (let i = 0, j = l; i < l; i++, j--) {
    doSomething(i, j);
}
```

:::

使用 `{ "allowForLoopAfterthoughts": true }` 选项时，此规则中 **错误** 代码示例：

::: incorrect

```js
/*eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/

for (let i = 0; i < l; j = i++) {
    doSomething(i, j);
}

for (let i = l; i--;) {
    doSomething(i);
}

for (let i = 0; i < l;) i++;
```

:::
