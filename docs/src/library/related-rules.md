---
title: 相关规则
---

`related_rules` 简码用于为某条规则添加一个或多个相关规则。

<a id="usage"></a>

## 用法

该简码接受一个规则名称数组。

```html
{ % related_rules ["no-extra-semi", "no-unexpected-multiline", "semi-spacing"] %
}
```

<a id="example"></a>

## 示例

{% related_rules ["no-extra-semi", "no-unexpected-multiline", "semi-spacing"] %}