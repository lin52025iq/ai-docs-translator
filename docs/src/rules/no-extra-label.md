---
title: no-extra-label
rule_type: suggestion
related_rules:
- no-labels
- no-label-var
- no-unused-labels
---



如果循环中没有嵌套循环或 switch 语句，就没有必要为循环添加标签。

```js
A: while (a) {
    break A;
}
```

移除标签，并使用不带标签的 `break` 或 `continue`，即可达到相同效果。
这些标签可能会让开发者感到困惑，因为他们会认为标签可以跳转到更远的位置。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除不必要的标签。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-extra-label: "error"*/

A: while (a) {
    break A;
}

B: for (let i = 0; i < 10; ++i) {
    break B;
}

C: switch (a) {
    case 0:
        break C;
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-extra-label: "error"*/

while (a) {
    break;
}

for (let i = 0; i < 10; ++i) {
    break;
}

switch (a) {
    case 0:
        break;
}

A: {
    break A;
}

B: while (a) {
    while (b) {
        break B;
    }
}

C: switch (a) {
    case 0:
        while (b) {
            break C;
        }
        break;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不希望收到有关标签用法的提示，可以放心禁用此规则。
