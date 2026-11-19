---
title: 按钮
---

{% from 'components/button.macro.html' import button %}

按钮有三种类型：主要、次要和“ghost”。按钮样式可应用于按钮和/或看起来像按钮的链接。

要呈现正确的语义元素，请提供预期行为的类型：`action` 或 `link` 值。如果按钮执行操作，则会将其呈现为 `button`。如果按钮链接到某处，则会将其呈现为 `<a>`。

按钮宏默认使用 `link`，这会呈现一个看起来像按钮的 <code>&lt;a&gt;</code> 标签。如果将 `action` 作为 `behavior` 的值提供，则表示这是一个 _执行操作的_ 按钮，因此会将其呈现为 `<button type="button">`。

<a id="usage"></a>

## 用法

```html
<!-- import the macro in the page(s) you want to render the button(s) in -->
{% from 'components/button.macro.html' import button %}

<!-- use the macro -->

{ { button({ behavior: "action", type: "primary", text: "Do Something" }) } }

<!-- defaults to behavior: link -->
{ { button({ type: "primary", text: "Go somewhere", url: "/url/to/somewhere/" })
} }
```

<a id="examples"></a>

## 示例

{{ button({ behavior: "action", type: "primary" }) }}
{{ button({ behavior: "action", text: "I perform an action", type: "secondary" }) }}
{{ button({ behavior: "action", text: "I perform an action", type: "ghost" }) }}

{{ button({ type: "primary", text: "I link somewhere", url: "#" }) }}
{{ button({ type: "secondary", text: "Secondary Button", url:"#" }) }}
{{ button({ type: "ghost", text: "Ghost Button", url:"#" }) }}
