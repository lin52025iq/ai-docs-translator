---
title: switch-colon-spacing
rule_type: layout
---
冒号周围的空格有助于提高 `case`/`default` 子句的可读性。

<a id="rule-details"></a>

## 规则详情

此规则用于控制 `switch` 语句中 `case` 和 `default` 子句冒号周围的空格。
仅当相邻 token 位于同一行时，此规则才会执行检查。

此规则有 2 个布尔选项。

```json
{
    "switch-colon-spacing": ["error", {"after": true, "before": false}]
}
```

* `"after": true`（默认值）要求冒号后至少有一个空格。
* `"after": false` 禁止冒号后出现空格。
* `"before": true` 要求冒号前至少有一个空格。
* `"before": false`（默认值）禁止冒号前出现空格。

此规则的错误代码示例：

::: incorrect

```js
/*eslint switch-colon-spacing: "error"*/

switch (a) {
    case 0 :break;
    default :foo();
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint switch-colon-spacing: "error"*/

switch (a) {
    case 0: foo(); break;
    case 1:
        bar();
        break;
    default:
        baz();
        break;
}
```

:::

使用 `{"after": false, "before": true}` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint switch-colon-spacing: ["error", {"after": false, "before": true}]*/

switch (a) {
    case 0: break;
    default: foo();
}
```

:::

使用 `{"after": false, "before": true}` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint switch-colon-spacing: ["error", {"after": false, "before": true}]*/

switch (a) {
    case 0 :foo(); break;
    case 1 :
        bar();
        break;
    default :
        baz();
        break;
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果不需要检查 switch 语句中冒号周围的空格，可以安全地禁用此规则。