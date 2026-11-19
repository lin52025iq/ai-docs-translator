---
title: max-len
rule_type: layout
related_rules:
- complexity
- max-depth
- max-nested-callbacks
- max-params
- max-statements
---
任何语言中非常长的代码行都可能难以阅读。为了提高可读性和可维护性，许多编码人员形成了一种惯例，将代码行限制在 X 个字符以内（传统上为 80 个字符）。

```js
var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to read" }; // very long
```

<a id="rule-details"></a>

## 规则详情

此规则限制行的最大长度，以提高代码的可读性和可维护性。行的长度定义为该行中的 Unicode 字符数。

<a id="options"></a>

## 选项

此规则最多可将两个数字作为位置参数（分别对应 `code` 和 `tabWidth` 选项），后面可跟一个对象选项（位置参数优先）：

* `"code"`（默认值为 `80`）用于限制行的最大长度
* `"tabWidth"`（默认值为 `4`）用于指定制表符的字符宽度
* `"comments"` 用于限制注释的最大行长度；默认值为 `code` 的值
* `"ignorePattern"` 忽略与正则表达式匹配的行；只能匹配单行，写入 YAML 或 JSON 时需要进行双重转义
* `"ignoreComments": true` 忽略所有行尾注释和独占一行的注释
* `"ignoreTrailingComments": true` 仅忽略行尾注释
* `"ignoreUrls": true` 忽略包含 URL 的行
* `"ignoreStrings": true` 忽略包含双引号或单引号字符串的行
* `"ignoreTemplateLiterals": true` 忽略包含模板字面量的行
* `"ignoreRegExpLiterals": true` 忽略包含正则表达式字面量的行

### code

以下代码在此规则使用默认选项 `{ "code": 80 }` 时**不正确**：

::: incorrect

```js
/*eslint max-len: ["error", { "code": 80 }]*/

var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" }, "difficult": "to read" };
```

:::

以下代码在此规则使用默认选项 `{ "code": 80 }` 时**正确**：

::: correct

```js
/*eslint max-len: ["error", { "code": 80 }]*/

var foo = {
  "bar": "This is a bar.",
  "baz": { "qux": "This is a qux" },
  "easier": "to read"
};
```

:::

### tabWidth

以下代码在此规则使用默认选项 `{ "tabWidth": 4 }` 时**不正确**：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: incorrect

```js
/*eslint max-len: ["error", { "code": 80, "tabWidth": 4 }]*/

		var foo = { "bar": "This is a bar.", "baz": { "qux": "This is a qux" } };
```

:::
<!-- markdownlint-restore -->

以下代码在此规则使用默认选项 `{ "tabWidth": 4 }` 时**正确**：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: correct

```js
/*eslint max-len: ["error", { "code": 80, "tabWidth": 4 }]*/

		var foo = {
				"bar": "This is a bar.",
				"baz": { "qux": "This is a qux" }
		};
```

:::
<!-- markdownlint-restore -->

### comments

以下代码在使用选项 `{ "comments": 65 }` 时**不正确**：

::: incorrect

```js
/*eslint max-len: ["error", { "comments": 65 }]*/

/**
 * This is a comment that violates the maximum line length we have specified
**/
```

:::

### ignoreComments

以下代码在使用选项 `{ "ignoreComments": true }` 时**正确**：

::: correct

```js
/*eslint max-len: ["error", { "ignoreComments": true }]*/

/**
 * This is a really really really really really really really really really long comment
**/
```

:::

### ignoreTrailingComments

以下代码在使用选项 `{ "ignoreTrailingComments": true }` 时**正确**：

::: correct

```js
/*eslint max-len: ["error", { "ignoreTrailingComments": true }]*/

var foo = 'bar'; // This is a really really really really really really really long comment
```

:::

### ignoreUrls

以下代码在使用选项 `{ "ignoreUrls": true }` 时**正确**：

::: correct

```js
/*eslint max-len: ["error", { "ignoreUrls": true }]*/

var url = 'https://www.example.com/really/really/really/really/really/really/really/long';
```

:::

### ignoreStrings

以下代码在使用选项 `{ "ignoreStrings": true }` 时**正确**：

::: correct

```js
/*eslint max-len: ["error", { "ignoreStrings": true }]*/

var longString = 'this is a really really really really really long string!';
```

:::

### ignoreTemplateLiterals

以下代码在使用选项 `{ "ignoreTemplateLiterals": true }` 时**正确**：

::: correct

```js
/*eslint max-len: ["error", { "ignoreTemplateLiterals": true }]*/

var longTemplateLiteral = `this is a really really really really really long template literal!`;
```

:::

### ignoreRegExpLiterals

以下代码在使用选项 `{ "ignoreRegExpLiterals": true }` 时**正确**：

::: correct

```js
/*eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/

var longRegExpLiteral = /this is a really really really really really long regular expression!/;
```

:::

### ignorePattern

以下代码在使用 `ignorePattern` 选项时**正确**：

::: correct

```js
/*eslint max-len:
["error", { "ignorePattern": "^\\s*var\\s.+=\\s*require\\s*\\(" }]*/

var dep = require('really/really/really/really/really/really/really/really/long/module');
```

:::