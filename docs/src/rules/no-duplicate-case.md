---
title: no-duplicate-case
rule_type: problem
---



如果 `switch` 语句的 `case` 子句中存在重复的测试表达式，通常是因为程序员复制了某个 `case` 子句，却忘记更改测试表达式。

<a id="rule-details"></a>
## 规则详情

此规则禁止 `switch` 语句的 `case` 子句中出现重复的测试表达式。

此规则下的错误代码示例：

:::incorrect

```js
/*eslint no-duplicate-case: "error"*/

const a = 1,
    one = 1;

switch (a) {
    case 1:
        break;
    case 2:
        break;
    case 1:         // duplicate test expression
        break;
    default:
        break;
}

switch (a) {
    case one:
        break;
    case 2:
        break;
    case one:         // duplicate test expression
        break;
    default:
        break;
}

switch (a) {
    case "1":
        break;
    case "2":
        break;
    case "1":         // duplicate test expression
        break;
    default:
        break;
}
```

:::

此规则下的正确代码示例：

:::correct

```js
/*eslint no-duplicate-case: "error"*/

const a = 1,
    one = 1;

switch (a) {
    case 1:
        break;
    case 2:
        break;
    case 3:
        break;
    default:
        break;
}

switch (a) {
    case one:
        break;
    case 2:
        break;
    case 3:
        break;
    default:
        break;
}

switch (a) {
    case "1":
        break;
    case "2":
        break;
    case "3":
        break;
    default:
        break;
}
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不应使用

在少数情况下，`case` 子句中相同的测试表达式会产生不同的值。这必然意味着表达式会产生副作用，而代码依赖这些副作用；此时你必须禁用此规则。

```js
switch (a) {
    case i++:
        foo();
        break;
    case i++: // eslint-disable-line no-duplicate-case
        bar();
        break;
}
```