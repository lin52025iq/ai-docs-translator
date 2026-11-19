---
title: no-case-declarations
rule_type: suggestion
related_rules:
- no-fallthrough
---



此规则禁止在 `case`/`default` 子句中进行词法声明（`let`、`const`、`function` 和 `class`）。这是因为词法声明在整个 `switch` 块中都可见，但只有在赋值时才会初始化，而只有执行到定义它的 `case` 时才会发生这种情况。

若要确保词法声明仅适用于当前 `case` 子句，请将子句包裹在块中。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止访问尚未初始化的词法绑定，以及跨 `case` 子句访问提升后的函数。

以下是违反此规则的代码示例：

::: incorrect

```js
/*eslint no-case-declarations: "error"*/

switch (foo) {
    case 1:
        let x = 1;
        break;
    case 2:
        const y = 2;
        break;
    case 3:
        function f() {}
        break;
    default:
        class C {}
}
```

:::

以下是符合此规则的代码示例：

::: correct

```js
/*eslint no-case-declarations: "error"*/

// Declarations outside switch-statements are valid
const a = 0;

switch (foo) {
    // The following case clauses are wrapped into blocks using brackets
    case 1: {
        let x = 1;
        break;
    }
    case 2: {
        const y = 2;
        break;
    }
    case 3: {
        function f() {}
        break;
    }
    case 4:
        // Declarations using var without brackets are valid due to function-scope hoisting
        var z = 4;
        break;
    default: {
        class C {}
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 不应使用此规则的情况

如果你依赖贯穿执行行为，并希望访问在 `case` 块中引入的绑定，则不应使用此规则。

