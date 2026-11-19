---
title: 检测到循环修复 …
eleventyNavigation:
    key: circular fixes
    parent: troubleshooting
    title: 检测到循环修复 …
---

<a id="symptoms"></a>

## 症状

运行 ESLint 并使用 `--fix` 选项时，可能会看到以下警告：

```plaintext
ESLintCircularFixesWarning: Circular fixes detected while fixing path/to/file. It is likely that you have conflicting rules in your configuration.
```

<a id="cause"></a>

## 原因

你的配置中存在相互冲突且可修复的规则。ESLint 会分多轮自动修复代码，因此某一轮中的修复可能会在后续轮次中被撤销。例如，第一轮中某条规则删除了尾随逗号，而下一轮中另一条规则又在同一位置添加尾随逗号，实际上就将代码改回了先前的版本。ESLint 检测到此类循环时会发出警告。

<a id="resolution"></a>

## 解决方法

此问题的常见解决方法包括：

- 在配置文件中删除或重新配置其中一条冲突规则。

如何查找冲突规则：

1. 在支持单独应用修复的编辑器中打开警告中指定的文件（例如 VS Code）。
1. 在代码检查问题列表中，找到一条可修复的规则。这就是其中一条冲突规则。
1. 应用修复（在 VS Code 中执行“修复此 (rule-name) 问题”操作）。
1. 查看列表中出现了什么新的代码检查问题。这就是另一条冲突规则。

<a id="resources"></a>

## 资源

如需了解详情，请参阅：

- [配置规则](../configure/rules)，了解如何配置规则的文档