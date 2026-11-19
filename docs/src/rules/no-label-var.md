---
title: no-label-var
rule_type: suggestion
related_rules:
- no-extra-label
- no-labels
- no-unused-labels
---


<a id="rule-details"></a>
## 规则详情

此规则旨在通过禁止创建与当前作用域中的变量同名的标签这一不良做法，使代码更清晰。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-label-var: "error"*/

var x = foo;
function bar() {
x:
  for (;;) {
    break x;
  }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-label-var: "error"*/

// The variable that has the same name as the label is not in scope.

function foo() {
  var q = t;
}

function bar() {
q:
  for(;;) {
    break q;
  }
}
```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不应使用此规则

如果你不希望收到有关标签用法的提示，可以安全地禁用此规则。
