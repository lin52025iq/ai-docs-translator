---
title: 参与问题处理
eleventyNavigation:
    key: work on issues
    parent: contribute to eslint
    title: 参与问题处理
    order: 10
---

我们的公开[问题跟踪器](https://github.com/eslint/eslint/issues)列出了我们计划开展的所有工作，以及社区提出的建议。在开始处理某个问题之前，请务必先阅读本页其余内容。

<a id="issue-labels"></a>

## 问题标签

我们使用标签来表示问题的状态。关于标签最完整的文档位于[维护 ESLint 文档](../maintain/manage-issues#when-an-issue-or-pull-request-is-opened)，不过大多数贡献者只需了解本页的信息即可。作为贡献者，标签最能帮助你回答以下几个重要问题：

1. **这个问题是否已准备好提交拉取请求？** 已准备好接受拉取请求的问题带有 [`accepted`](https://github.com/eslint/eslint/labels/accepted) 标签，表示团队已同意接受相关拉取请求。请不要针对尚未标记为 accepted 的问题提交拉取请求。
2. **这个问题适合初学者吗？** 如果你几乎没有或完全没有为 ESLint 做贡献的经验，带有 [`good first issue`](https://github.com/eslint/eslint/labels/good%20first%20issue) 标签的问题就适合你。否则，带有 [`help wanted`](https://github.com/eslint/eslint/labels/help%20wanted) 标签的问题表示欢迎你参与。如果你经验更丰富，也可以尝试处理其他带有 [`accepted`](https://github.com/eslint/eslint/labels/accepted) 标签的问题。
3. **这个问题涉及什么？** 描述问题性质的标签包括 `bug`、`enhancement`、`feature`、`question`、`rule`、`documentation`、`core`、`build`、`cli`、`infrastructure`、`breaking` 和 `chore`。这些标签在[维护 ESLint](../maintain/manage-issues#types-of-issues-and-pull-requests)中有说明。
4. **这个问题的优先级是什么？** 由于问题数量很多，我们会优先处理某些问题。以下是按优先级从高到低排列的列表：
    1. **错误** - 项目中的问题正在直接影响用户。我们希望尽快解决这些问题。
    1. **文档** - 文档问题也是一种错误，因为它们会直接影响当前用户。因此，我们希望尽快处理文档问题。
    1. **功能** - 有助于未来用户的新功能。
    1. **增强** - 对现有功能的改进请求。
    1. **其他** - 其他所有事项。

<a id="start-work"></a>

## 开始处理

::: important
开始处理已有问题之前，请先确认该问题是否已分配给其他人。如果已分配，那么此人已经负责提交拉取请求，你应该选择其他问题处理。
:::

<a id="claim-an-issue"></a>

### 认领问题

如果你打算处理某个问题，请通过发表评论来_认领_该问题，说明你正在处理，并告知预计完成时间。这样有助于避免重复劳动。以下是一些合适的认领评论示例：

- “我会在周末看看这个问题。”
- “我来处理，给我两周时间。”
- “正在处理”（也就是说，我现在就在处理）

团队会将该问题分配给你，以确认你的认领。

<a id="offer-help-on-a-claimed-issue"></a>

### 为已认领的问题提供帮助

如果某个问题已分配给他人，或已被他人认领，请尊重对方完成工作的意愿。除非你确认对方已不再感兴趣或愿意接受帮助，否则不要着手处理。如果该问题两周内没有任何进展，你可以表示有兴趣提供帮助。例如：

- “你还在处理这个问题吗？如果没有，我很乐意接手。”
- “你需要帮忙吗？我很感兴趣。”

是否继续处理该问题，或是否接受你的帮助，由被分配该问题的人决定。

如果一周后仍未收到回复，请联系团队成员寻求帮助。

<a id="unclaim-an-issue"></a>

### 取消认领问题

如果你认领了某个问题，但发现无法完成，请发表评论告知大家，例如：

- “抱歉，我好像没有时间处理这个问题。”
- “我原以为自己掌握了足够的知识来修复这个问题，但事实并非如此。”

如果你无法完成某个问题，没有人会责怪你退出。我们只是希望尽可能高效地推进整个流程。
