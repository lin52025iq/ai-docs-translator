---
title: 警报
---

警示消息分为三种类型：警告、提示和重要说明。

<a id="usage"></a>
## 用法

每种类型的警示都有对应的 shortcode。shortcode 要求你提供文本以及“了解更多”链接的 URL。

```html
{ % warning "This rule has been removed in version x.xx", "/link/to/learn/more"
% } { % tip "Kind reminder to do something maybe", "/link/to/learn/more" % } { %
important "This rule has been deprecated in version x.xx", "/link/to/learn/more"
% }
```

<a id="examples"></a>
## 示例

{% warning "warning text", "/" %}
{% tip "tip text", "/" %}
{% important "text", "/" %}
