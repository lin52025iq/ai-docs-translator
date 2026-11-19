---
title: no-trailing-spaces
rule_type: layout
---
有时在编辑文件时，行尾可能会多出空白字符。源代码管理系统可能会检测到这些空白差异并将其标记为差异，这会让开发者感到困扰。虽然这些额外空白不会造成任何功能问题，但许多代码规范要求在提交前删除行尾空格。

<a id="rule-details"></a>

## 规则详情

此规则禁止行尾出现空白字符（空格、制表符及其他 Unicode 空白字符）。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-trailing-spaces: "error"*/

var foo = 0;/* trailing whitespace */     
var baz = 5;/* trailing whitespace */  
/* trailing whitespace */     
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-trailing-spaces: "error"*/

var foo = 0;
var baz = 5;
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"skipBlankLines": false`（默认值）禁止空行末尾有空白字符
* `"skipBlankLines": true` 允许空行末尾有空白字符
* `"ignoreComments": false`（默认值）禁止注释块中有行尾空白
* `"ignoreComments": true` 允许注释块中有行尾空白

### skipBlankLines

使用 `{ "skipBlankLines": true }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

var foo = 0;
var baz = 5;
// ↓ a line with whitespace only ↓
     
```

:::

### ignoreComments

使用 `{ "ignoreComments": true }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-trailing-spaces: ["error", { "ignoreComments": true }]*/

// ↓ these comments have trailing whitespace → 
//     
/**
 * baz
 *  
 * bar
 */
```

:::