---
title: for-direction
rule_type: problem
---

如果 `for` 循环的终止条件永远无法满足，例如计数器的变化方向错误，循环就会无限执行。虽然有时确实需要无限循环，但通常会用 `while` 循环来构造这类循环。更常见的情况是，无限 `for` 循环属于 bug。

<a id="rule-details"></a>

## 规则详情

此规则禁止计数器变量的变化方式导致终止条件永远无法满足的 `for` 循环。例如，如果计数器变量递增（即 `i++`），而终止条件检查计数器是否大于零（`i >= 0`），那么循环将永远不会退出。

> **注意：** 此规则只检查计数器相对于终止条件的**变化方向**，不会检查实际值来判断循环是否至少执行一次。例如，像 `for (let i = 0; i < 0; i++) {}` 这样的循环会被此规则视为有效，因为计数器的变化方向（`i++`）与条件（`i <`）相符，尽管条件从一开始就是 false（死代码）。

此规则的**错误**代码示例：

:::incorrect

```js
/*eslint for-direction: "error"*/
for (let i = 0; i < 10; i--) {
}

for (let i = 10; i >= 0; i++) {
}

for (let i = 0; i > 10; i++) {
    // counter i is on the left with >, so i++ (increasing) is the wrong direction
}

for (let i = 0; i > 0; i++) {
    // counter i is on the left with >, so i++ (increasing) is the wrong direction
}

for (let i = 0; 0 < i; i++) {
    // counter i is on the right with <, so i++ (increasing) is the wrong direction
}

for (let i = 0; 10 > i; i--) {
}

const n = -2;
for (let i = 0; i < 10; i += n) {
}
```

:::

此规则的**正确**代码示例：

:::correct

```js
/*eslint for-direction: "error"*/
for (let i = 0; i < 10; i++) {
}

for (let i = 0; 10 > i; i++) { // with counter "i" on the right
}

for (let i = 10; i >= 0; i += this.step) { // direction unknown
}

for (let i = MIN; i <= MAX; i -= 0) { // not increasing or decreasing
}

for (let i = 0; i < 0; i++) {
    // counter i is on the left with <, so i++ (increasing) is the correct direction
    // (loop never executes, but direction is consistent)
}

for (let i = 0; 0 > i; i++) {
    // counter i is on the right with >, so i++ (increasing) is the correct direction
    // (loop never executes, but direction is consistent)
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。