---
title: default-case-last
rule_type: suggestion
related_rules:
- default-case
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
---


`switch` 语句可以选择包含 `default` 子句。

如果包含，子句通常位于最后，但并非必须如此。也可以将子句放在所有 `case` 子句之前，或放在它们之间的任意位置。其行为大体上与将它放在最后相同。只有在 `case` 子句（包括定义在 `default` 之后的子句）都没有匹配项时，才会执行 `default` 代码块；不过，也可以从 `default` 子句“贯穿”到列表中的下一个子句。这种流程并不常见，也会让读者感到困惑。

即使不存在“贯穿”逻辑，在 `case` 子句之前或之间看到 `default` 子句仍然会让人感到意外。按照惯例，它应当是最后一个子句。

如果 `switch` 语句应当包含 `default` 子句，最佳实践是将它放在最后。

<a id="rule-details"></a>

## 规则详情

此规则要求 `switch` 语句中的 `default` 子句位于最后。

此规则仅适用于已经包含 `default` 子句的 `switch` 语句。

此规则不要求必须存在 `default` 子句。如果你还想要求 `switch` 语句中必须存在 `default` 子句，请参阅 [default-case](default-case)。

此规则的**错误**示例如下：

:::incorrect

```js
/*eslint default-case-last: "error"*/

switch (foo) {
    default:
        bar();
        break;
    case "a":
        baz();
        break;
}

switch (foo) {
    case 1:
        bar();
        break;
    default:
        baz();
        break;
    case 2:
        quux();
        break;
}

switch (foo) {
    case "x":
        bar();
        break;
    default:
    case "y":
        baz();
        break;
}

switch (foo) {
    default:
        break;
    case -1:
        bar();
        break;
}

switch (foo) {
  default:
    doSomethingIfNotZero();
  case 0:
    doSomethingAnyway();
}
```

:::

此规则的**正确**示例如下：

:::correct

```js
/*eslint default-case-last: "error"*/

switch (foo) {
    case "a":
        baz();
        break;
    default:
        bar();
        break;
}

switch (foo) {
    case 1:
        bar();
        break;
    case 2:
        quux();
        break;
    default:
        baz();
        break;
}

switch (foo) {
    case "x":
        bar();
        break;
    case "y":
    default:
        baz();
        break;
}

switch (foo) {
    case -1:
        bar();
        break;
}

if (foo !== 0) {
    doSomethingIfNotZero();
}
doSomethingAnyway();
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
