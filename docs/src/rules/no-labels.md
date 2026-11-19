---
title: no-labels
rule_type: suggestion
related_rules:
- no-extra-label
- no-label-var
- no-unused-labels
---


JavaScript 中的带标签语句与 `break` 和 `continue` 配合使用，用于控制多个循环之间的流程。例如：

```js
outer:
    while (true) {

        while (true) {
            break outer;
        }
    }
```

`break outer` 语句可确保这段代码不会导致无限循环，因为控制流会返回到应用 `outer` 标签之后的下一条语句。如果将此语句改为仅使用 `break`，控制流就会返回到外层 `while` 语句，从而导致无限循环。

虽然标签在某些情况下很方便，但它们通常很少使用。有些人不赞成使用标签，认为它们是一种补救式的流程控制方式，更容易出错，也更难理解。

<a id="rule-details"></a>
## 规则详情

此规则旨在消除 JavaScript 中带标签语句的使用。每当遇到带标签的语句，或在 `break` 或 `continue` 中使用标签时，都会发出警告。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-labels: "error"*/

label:
    while(true) {
        // ...
    }

label:
    while(true) {
        break label;
    }

label:
    while(true) {
        continue label;
    }

label:
    switch (a) {
    case 0:
        break label;
    }

label:
    {
        break label;
    }

label:
    if (a) {
        break label;
    }
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-labels: "error"*/

const f = {
    label: "foo"
};

while (true) {
    break;
}

while (true) {
    continue;
}
```

:::

<a id="options"></a>
## 选项

这些选项允许在循环或 switch 语句中使用标签：

* `"allowLoop"`（`boolean`，默认为 `false`）- 如果将此选项设为 `true`，此规则会忽略附加在循环语句上的标签。
* `"allowSwitch"`（`boolean`，默认为 `false`）- 如果将此选项设为 `true`，此规则会忽略附加在 switch 语句上的标签。

实际上，JavaScript 中的带标签语句也可以用于循环和 switch 语句之外的其他语句。不过，这种用法极为罕见，也鲜为人知，可能会让开发者感到困惑。

### allowLoop

`{ "allowLoop": true }` 选项的正确代码示例：

::: correct

```js
/*eslint no-labels: ["error", { "allowLoop": true }]*/

label:
    while (true) {
        break label;
    }
```

:::

### allowSwitch

`{ "allowSwitch": true }` 选项的正确代码示例：

::: correct

```js
/*eslint no-labels: ["error", { "allowSwitch": true }]*/

label:
    switch (a) {
        case 0:
            break label;
    }
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你需要在任何地方使用带标签语句，可以放心地禁用此规则。
