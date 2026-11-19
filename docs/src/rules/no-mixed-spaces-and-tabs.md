---
title: no-mixed-spaces-and-tabs
rule_type: layout
further_reading:
- https://www.emacswiki.org/emacs/SmartTabs
---
大多数代码规范要求使用制表符或空格进行缩进。因此，如果同一行代码同时使用制表符和空格缩进，通常会被视为错误。

<a id="rule-details"></a>

## 规则详情

此规则禁止在缩进中混用空格和制表符。

此规则的**错误**代码示例：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: incorrect

```js
/*eslint no-mixed-spaces-and-tabs: "error"*/

function add(x, y) {
	  return x + y;
}

function main() {
	var x = 5,
	    y = 7;
}
```

:::
<!-- markdownlint-restore -->

此规则的**正确**代码示例：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: correct

```js
/*eslint no-mixed-spaces-and-tabs: "error"*/

function add(x, y) {
	return x + y;
}
```

:::
<!-- markdownlint-restore -->

<a id="options"></a>

## 选项

此规则有一个字符串选项。

* `"smart-tabs"` 允许在使用空格进行对齐时混用制表符和空格。

### smart-tabs

使用 `"smart-tabs"` 选项时，此规则的**正确**代码示例：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: correct

```js
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

function main() {
	var x = 5,
	    y = 7;
}
```

:::
<!-- markdownlint-restore -->