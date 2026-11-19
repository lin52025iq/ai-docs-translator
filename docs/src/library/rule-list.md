---
title: 替代规则列表
---

规则列表是定义在 `components/rule-list.macro.html` 中的宏。该宏接受一个 `ReplacedByInfo` 列表，并将其渲染为以“或”分隔的链接。

<a id="usage"></a>

## 用法

{% raw %}

```html
<!-- import the macro -->
{% from 'components/rule-list.macro.html' import replacementRuleList %}

<!-- use the macro -->
{{ replacementRuleList({ specifiers: [{ rule: { name: 'global-require', url:
'...' }, plugin: { name: '@eslint-community/eslint-plugin-n', url: '...' } }] })
}}
```

{% endraw %}

<a id="examples"></a>

## 示例

{% from 'components/rule-list.macro.html' import replacementRuleList %}

{{ replacementRuleList({ specifiers: [{ rule: { name: 'global-require', url: '...' }, plugin: { name: '@eslint-community/eslint-plugin-n', url: '...' } }] }) }}