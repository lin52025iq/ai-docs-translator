---
title: no-script-url
rule_type: suggestion
further_reading:
- https://stackoverflow.com/questions/13497971/what-is-the-matter-with-script-targeted-urls
---


使用 `javascript:` URL 被一些人视为一种 `eval` 形式。传入 `javascript:` URL 的代码必须由浏览器解析并执行，其方式与处理 `eval` 相同。

<a id="rule-details"></a>

## 规则详情

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-script-url: "error"*/

location.href = "javascript:void(0)";

location.href = `javascript:void(0)`;
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="compatibility"></a>

## 兼容性

* **JSHint**：此规则对应于 JSHint 的 `scripturl` 规则。
