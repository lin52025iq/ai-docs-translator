---
title: spaced-line-comment

related_rules:
- spaced-comment
---

强制行注释中 `//` 后的空格保持一致。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [spaced-comment](spaced-comment) 规则取代。
:::

一些代码风格指南要求或禁止在行注释开头的 `//` 后立即添加空白字符。
在 `//` 后添加空白字符可以让注释文本更易于阅读。
另一方面，注释掉代码时，如果不必在 `//` 后立即添加空白字符，会更方便。

<a id="rule-details"></a>

## 规则详情

此规则将强制行注释起始符 `//` 后的空格保持一致。

此规则接受两个参数。如果第一个参数为 `"always"`，则 `//` 后必须至少有一个空白字符。
如果为 `"never"`，则后面不应有空白字符。
默认值为 `"always"`。

第二个参数是一个只有一个键 `"exceptions"` 的对象。
该键的值是一个字符串模式数组，其中的模式被视为此规则的例外。
请注意，如果第一个参数为 `"never"`，则会忽略例外。
例外不能混用。

此规则的错误代码示例：

::: incorrect

```js
// When ["never"]
// This is a comment with a whitespace at the beginning
```

:::

::: incorrect

```js
//When ["always"]
//This is a comment with no whitespace at the beginning
var foo = 5;
```

:::

::: incorrect

```js
// When ["always",{"exceptions":["-","+"]}]
//------++++++++
// Comment block
//------++++++++
```

:::

此规则的正确代码示例：

::: correct

```js
// When ["always"]
// This is a comment with a whitespace at the beginning
var foo = 5;
```

:::

::: correct

```js
//When ["never"]
//This is a comment with no whitespace at the beginning
var foo = 5;
```

:::

::: correct

```js
// When ["always",{"exceptions":["-"]}]
//--------------
// Comment block
//--------------
```

:::

::: correct

```js
// When ["always",{"exceptions":["-+"]}]
//-+-+-+-+-+-+-+
// Comment block
//-+-+-+-+-+-+-+
```

:::
