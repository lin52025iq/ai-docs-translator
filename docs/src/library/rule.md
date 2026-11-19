---
title: 规则
---

规则组件是一个定义在 `/components/rule.macro.html` 中的宏。该宏接受一组用于呈现规则的参数。

规则包含：

- 名称
- 描述
- 用于指示规则是否已弃用或移除的标志：分别为 `deprecated` 和 `removed`
- 一个 replacedBy 值，用于指示该规则被哪个规则替换（如果适用）
- 一个 categories 对象，用于指示规则所属的类别

<a id="usage"></a>

## 用法

```html
<!-- import the macro -->
{ % from 'components/rule.macro.html' import rule % }

<!-- use the macro -->
{ { rule({ name: "rule-name", deprecated: true, // or removed: true replacedBy:
"name-of-replacement-rule" description: 'Example: Enforce `return` statements in
getters.', categories: { recommended: true, fixable: true, hasSuggestions: false
} }) } }
```

<a id="examples"></a>

## 示例

{% from 'components/rule.macro.html' import rule %}

{{ rule({
    name: "array-bracket-newline",
    deprecated: true,
    description: 'Enforces line breaks after opening and before closing array brackets.',
    categories: {
        recommended: true,
        fixable: true,
        hasSuggestions: false
    }
}) }}

{{ rule({
    name: "no-arrow-condition",
    removed: true,
    description: 'Disallows arrow functions where test conditions are expected.',
    replacedBy: ["no-confusing-arrow", "no-constant-condition"],
    categories: {
        recommended: false,
        fixable: false,
        hasSuggestions: false
    }
}) }}

{{ rule({
    name: "getter-return",
    deprecated: false,
    description: 'Enforce `return` statements in getters.',
    categories: {
        recommended: true,
        fixable: false,
        hasSuggestions: false
    }
}) }}