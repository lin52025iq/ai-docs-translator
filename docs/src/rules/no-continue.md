---
title: no-continue
rule_type: suggestion
---


`continue` 语句会终止当前循环迭代中语句的执行（无论是当前循环还是带标签的循环），并继续执行循环的下一次迭代。错误使用时，它会降低代码的可测试性、可读性和可维护性。应改用 `if` 等结构化控制流语句。

```js
let sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue;
    }

    sum += i;
}
```

<a id="rule-details"></a>

## 规则详情

此规则禁止使用 `continue` 语句。

此规则下的错误代码示例：

::: incorrect

```js
/*eslint no-continue: "error"*/

let sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue;
    }

    sum += i;
}
```

:::

::: incorrect

```js
/*eslint no-continue: "error"*/

let sum = 0,
    i;

labeledLoop: for(i = 0; i < 10; i++) {
    if(i >= 5) {
        continue labeledLoop;
    }

    sum += i;
}
```

:::

此规则下的正确代码示例：

::: correct

```js
/*eslint no-continue: "error"*/

let sum = 0,
    i;

for(i = 0; i < 10; i++) {
    if(i < 5) {
       sum += i;
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="compatibility"></a>

## 兼容性

* **JSLint**：`continue`
