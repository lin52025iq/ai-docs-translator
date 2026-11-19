---
title: 规则类别
---

<a id="rule-categories"></a>

## 规则类别

规则类别，即“recommended”、“fixable”和“hasSuggestions”，显示在[规则页面](../rules/)中。它们使用 `ruleCategories` 宏（从 `/components/rule-categories.macro.html` 导入）进行渲染。每种类别类型也有各自的宏。

```html
{ % from 'components/rule-categories.macro.html' import ruleCategories % } { {
ruleCategories({ recommended: true, fixable: true, hasSuggestions: true }) } }
```

<a id="example"></a>

### 示例

{% from 'components/rule-categories.macro.html' import ruleCategories, recommended, fixable, hasSuggestions %}

{{ ruleCategories({
        recommended: true,
        fixable: true,
        hasSuggestions: true
}) }}

<a id="a-rule-category"></a>

## 规则类别

对于每条规则，你都可以使用对应的类别 shortcode 来渲染它所属的类别：

```html
{ % recommended % } { % fixable % } { % hasSuggestions % }
```

<a id="examples"></a>

## 示例

{% recommended %}
{% fixable %}
{% hasSuggestions %}
