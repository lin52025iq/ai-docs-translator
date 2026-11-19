---
title: "TypeError: context.getScope is not a function"
eleventyNavigation:
    key: v9 rule api changes
    parent: troubleshooting
    title: "TypeError: context.getScope is not a function"
---

<a id="symptoms"></a>

## 症状

使用 ESLint v9.0.0 或更高版本与插件搭配时，可能会看到以下错误之一：

```plaintext
TypeError: context.getScope is not a function
TypeError: context.getAncestors is not a function
TypeError: context.markVariableAsUsed is not a function
TypeError: context.getDeclaredVariables is not a function
```

<a id="cause"></a>

## 原因

ESLint v9.0.0 引入了插件规则使用的[规则 API 变更](https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/)，其中包括将一些方法从 `context` 对象移至 `sourceCode` 对象。如果你遇到其中一种错误，说明该插件尚未更新为使用新的规则 API。

<a id="resolution"></a>

## 解决方法

此问题的常见解决方法包括：

- 将插件升级到最新版本。
- 使用[兼容性实用工具](https://eslint.org/blog/2024/05/eslint-compatibility-utilities/)在配置文件中修补插件。

::: important
如果你已经在使用最新版插件，但仍需要使用兼容性实用工具才能让插件与 ESLint v9.0.0 及更高版本配合使用，请务必在该插件的代码仓库中提交问题，告知维护者进行必要的 API 变更。
:::

<a id="resources"></a>

## 相关资源

如需了解更多信息，请参阅：

- [配置插件](../configure/plugins)，了解如何配置插件
- [创建插件](../../extend/plugins#configs-in-plugins)，了解如何定义插件