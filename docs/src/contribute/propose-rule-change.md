---
title: 提议更改规则
eleventyNavigation:
    key: propose rule change
    parent: contribute to eslint
    title: 提议更改规则
    order: 4
---

有时，ESLint 核心规则需要进行更改。这不一定是 bug，也可能是为了让规则更易配置而进行的改进。在这种情况下，我们会考虑修改规则。

<a id="propose-a-rule-change"></a>

## 提议更改规则

要提议更改现有规则，请[创建拉取请求](pull-requests)或[新建议题](https://github.com/eslint/eslint/issues/new/choose)，并填写模板。

我们需要这些信息，以便判断这项更改是否适合纳入 ESLint。

<a id="accept-a-rule-change"></a>

## 接受规则更改

规则更改要被 ESLint 接受，必须满足以下条件：

1. 遵循[核心规则指南](propose-new-rule#core-rule-guidelines)。
1. 有一位 ESLint 团队成员支持这项更改。
1. 这项更改足够重要，缺少它会使该规则被视为不完整。

<a id="implementation-is-your-responsibility"></a>

## 由你负责实现

ESLint 团队不会实现用户提出的规则更改，因为团队人手有限，需要专注于整体路线图。规则更改获接受后，你需要负责实现并编写相关文档。你也可以邀请其他人协助你。支持这项规则更改的 ESLint 团队成员可以为你提供指导，帮助你完成后续流程。
