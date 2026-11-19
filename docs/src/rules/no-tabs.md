---
title: no-tabs
rule_type: layout
---
某些风格指南完全不允许使用制表符，包括在注释中使用。

<a id="rule-details"></a>
## 规则详情

此规则会检查文件中的任何位置是否存在制表符：代码、注释或其他内容中都包括在内。

此规则的**错误**代码示例：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: incorrect

```js
/* eslint no-tabs: "error" */

var a 	= 2;

/**
* 		 it's a test function
*/
function test(){}

var x = 1; // 	 test
```

:::
<!-- markdownlint-restore -->

此规则的**正确**代码示例：

::: correct

```js
/* eslint no-tabs: "error" */

var a = 2;

/**
* it's a test function
*/
function test(){}

var x = 1; // test
```

:::

<a id="options"></a>
### 选项

此规则有一个可选的对象选项，包含以下属性：

* `allowIndentationTabs`（默认值：false）：如果设为 true，则规则不会报告用于缩进的制表符。

#### allowIndentationTabs

启用 `allowIndentationTabs: true` 选项时，此规则的**正确**代码示例：

<!-- markdownlint-capture -->
<!-- markdownlint-disable MD010 -->
::: correct

```js
/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */

function test() {
	doSomething();
}

	// comment with leading indentation tab
```

:::
<!-- markdownlint-restore -->

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你已制定标准，认为使用制表符没有问题，那么可以禁用此规则。

<a id="compatibility"></a>
## 兼容性

* **JSCS**：[disallowTabs](https://jscs-dev.github.io/rule/disallowTabs)
