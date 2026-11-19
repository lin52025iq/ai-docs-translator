---
title: no-redeclare
rule_type: suggestion
handled_by_typescript: true
extra_typescript_info: Note that while TypeScript will catch `let` redeclares and `const` redeclares, it will not catch `var` redeclares. Thus, if you use the legacy `var` keyword in your TypeScript codebase, this rule will still provide some value.
related_rules:
- no-shadow
---



在 JavaScript 中，可以使用 `var` 重新声明同一个变量名。这可能会让人困惑，不清楚变量究竟在哪里声明和初始化。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除同一作用域中存在多个声明的变量。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-redeclare: "error"*/

var a = 3;
var a = 10;

class C {
    foo() {
        var b = 3;
        var b = 10;
    }

    static {
        var c = 3;
        var c = 10;
    }
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-redeclare: "error"*/

var a = 3;
a = 10;

class C {
    foo() {
        var b = 3;
        b = 10;
    }

    static {
        var c = 3;
        c = 10;
    }
}

```

:::

<a id="options"></a>

## 选项

此规则接受一个可选参数，即一个包含布尔属性 `"builtinGlobals"` 的对象。默认值为 `true`。
如果设为 `true`，此规则还会检查内置全局变量是否被重新声明，例如 `Object`、`Array`、`Number`……

### builtinGlobals

`"builtinGlobals"` 选项会检查全局作用域中是否重新声明了内置全局变量。

`{ "builtinGlobals": true }` 选项的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint no-redeclare: ["error", { "builtinGlobals": true }]*/

var Object = 0;
```

:::

请注意，使用 `sourceType: "commonjs"`（或者在使用默认解析器时使用 `ecmaFeatures.globalReturn`）时，程序的顶层作用域实际上并非全局作用域，而是“模块”作用域。在这种情况下，声明一个与内置全局变量同名的变量并不属于重新声明，而是对全局变量的遮蔽。此时应使用带有 `"builtinGlobals"` 选项的 [`no-shadow`](no-shadow) 规则。
