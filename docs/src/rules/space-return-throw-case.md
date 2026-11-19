---
title: space-return-throw-case

---

要求在 `return`、`throw` 和 `case` 关键字后添加空格。

::: important
此规则已在 ESLint v2.0.0 中移除，并由 [keyword-spacing](keyword-spacing) 规则取代。
:::

（可自动修复）此规则报告的问题可通过[命令行](../use/command-line-interface#--fix)中的 `--fix` 选项自动修复。

要求在 `return`、`throw` 和 `case` 后添加空格。

<a id="rule-details"></a>

## 规则详情

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint space-return-throw-case: "error"*/

throw{a:0}

function f(){ return-a; }

switch(a){ case'a': break; }
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint space-return-throw-case: "error"*/

throw {a: 0};

function f(){ return -a; }

switch(a){ case 'a': break; }
```

:::