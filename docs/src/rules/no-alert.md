---
title: no-alert
rule_type: suggestion
related_rules:
- no-console
- no-debugger
---


JavaScript 的 `alert`、`confirm` 和 `prompt` 函数通常被认为会作为 UI 元素造成干扰，应替换为更合适的自定义 UI 实现。此外，`alert` 常用于调试代码，应在部署到生产环境之前移除。

```js
alert("here!");
```

<a id="rule-details"></a>

## 规则详情

此规则旨在捕获应当移除的调试代码，以及应替换为干扰较小的自定义 UI 的弹出式 UI 元素。因此，当遇到未被遮蔽的 `alert`、`prompt` 和 `confirm` 函数调用时，此规则会发出警告。

此规则的**错误**代码示例：

:::incorrect

```js
/*eslint no-alert: "error"*/

alert("here!");

confirm("Are you sure?");

prompt("What's your name?", "John Doe");
```

:::

此规则的**正确**代码示例：

:::correct

```js
/*eslint no-alert: "error"*/

customAlert("Something happened!");

customConfirm("Are you sure?");

customPrompt("Who are you?");

function foo() {
    const alert = myCustomLib.customAlert;
    alert();
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
