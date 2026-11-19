---
title: no-multiple-empty-lines
rule_type: layout
---
有些开发者希望移除多个空行，而另一些开发者则认为这有助于提高可读性。空白有助于分隔代码中的逻辑部分，但过多的空白会占用更多屏幕空间。

<a id="rule-details"></a>
## 规则详情

此规则旨在减少阅读代码时所需的滚动操作。当空行数量超过最大值时，它会发出警告。

<a id="options"></a>
## 选项

此规则接受一个对象选项：

* `"max"`（默认值：`2`）用于限制连续空行的最大数量。
* `"maxEOF"` 用于限制文件末尾连续空行的最大数量。
* `"maxBOF"` 用于限制文件开头连续空行的最大数量。

### max

以下是使用默认选项 `{ "max": 2 }` 时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-multiple-empty-lines: "error"*/

var foo = 5;



var bar = 3;
```

:::

以下是使用默认选项 `{ "max": 2 }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-multiple-empty-lines: "error"*/

var foo = 5;


var bar = 3;
```

:::

### maxEOF

以下是使用选项 `{ max: 2, maxEOF: 0 }` 时的**错误**代码示例：

::: incorrect

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxEOF": 0 }]*/⏎
⏎
var foo = 5;⏎
⏎
⏎
var bar = 3;⏎
⏎

```

:::

以下是使用选项 `{ max: 2, maxEOF: 0 }` 时的**正确**代码示例：

::: correct

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxEOF": 0 }]*/⏎
⏎
var foo = 5;⏎
⏎
⏎
var bar = 3;
```

:::

**注意**：虽然此选项可确保文件末尾没有空行，但如果文件以换行符结尾，大多数编辑器仍会显示末尾有一行空行，如下所示。最后一个 `\n` 之后并没有真正的空行，但编辑器可能会显示额外的一行。真正多出一行的情况应表示为 `\n\n`。

**正确**：

::: correct

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxEOF": 0 }]*/⏎
⏎
var foo = 5;⏎
⏎
⏎
var bar = 3;⏎

```

:::

### maxBOF

以下是使用选项 `{ max: 2, maxBOF: 1 }` 时的**错误**代码示例：

::: incorrect

```js


/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxBOF": 1 }]*/


var foo = 5;


var bar = 3;
```

:::

以下是使用选项 `{ max: 2, maxBOF: 1 }` 时的**正确**代码示例：

::: correct

```js
/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxBOF": 1}]*/

var foo = 5;


var bar = 3;
```

:::

::: correct

```js

/*eslint no-multiple-empty-lines: ["error", { "max": 2, "maxBOF": 1}]*/

var foo = 5;


var bar = 3;
```

:::

<a id="when-not-to-use-it"></a>
## 何时不使用此规则

如果你不在意多余的空行，可以关闭此规则。
