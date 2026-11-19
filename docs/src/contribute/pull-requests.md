---
title: 提交拉取请求
eleventyNavigation:
    key: submit pull request
    parent: contribute to eslint
    title: 提交拉取请求
    order: 11
---

如果你想为 ESLint 仓库贡献代码，请使用 GitHub 拉取请求。这是我们评估你的代码并将其合并到代码库中的最快方式。请不要在问题中附上代码片段。这样做意味着我们需要手动合并更改并更新相应的测试，也会降低你的代码及时纳入项目的可能性。请使用拉取请求。

<a id="get-started"></a>

## 开始

ESLint 项目使用问题来跟踪工作，因此确保有一个合适的问题已创建十分重要：

- **如果已有相关问题，**请按照[参与处理问题](work-on-issue)中的说明操作。
- **如果还没有相关问题，**请创建一个问题，描述你想要进行的更改。使用相应的问题模板。
    - **例外情况：**小型更改（例如错误修复、文档更新或软件包升级）不需要先创建问题。请确保拉取请求的说明清楚地解释你要做什么以及为什么要这样做。

之后，你就可以开始编写代码了。

<a id="work-with-code"></a>

## 编写代码

::: important
如果你想参与处理拉取请求，但之前从未提交过代码，请先设置[开发环境](./development-environment)。
:::

提交拉取请求的流程相当简单，通常每次都遵循相同的步骤：

1. [创建新分支](#step1)。
2. [进行更改](#step2)。
3. [变基到上游代码](#step3)。
4. [运行测试](#step4)。
5. [仔细检查提交内容](#step5)。
6. [推送更改](#step6)。
7. [提交拉取请求](#step7)。

下面详细介绍每个步骤。

<a id="step-1-create-a-new-branch"></a>

### 步骤 1：创建新分支<a name="step1"></a>

提交拉取请求的第一步是在你的 ESLint 派生仓库中创建一个新分支。为分支取一个能描述你要修复内容的名称，例如：

```shell
git checkout -b issue1234
```

你应该在这个分支上完成该问题相关的所有开发工作。

**注意：**不要在一个分支中合并多个问题的修复。你处理的每个问题都应使用单独的分支。

<a id="step-2-make-your-changes"></a>

### 步骤 2：进行更改<a name="step2"></a>

按照[代码规范](./code-conventions)修改代码和测试。完成后，将更改提交到你的分支：

```shell
git add -A
git commit
```

所有 ESLint 项目的提交消息都遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。（注意：我们不支持消息中可选的作用域。）以下是提交消息示例：

```txt
tag: Short description of what you did

Longer description here if necessary

Fixes #1234
```

提交消息的第一行（摘要）必须符合特定格式。我们的构建工具会检查此格式。虽然不会直接检查提交消息，但它会用于生成拉取请求的标题，而拉取请求提交时会检查标题格式。

`tag` 是以下值之一：

- `fix` - 修复错误。
- `feat` - 向后兼容的增强功能，或会增加报告问题的规则更改。
- `fix!` - 不向后兼容的错误修复。
- `feat!` - 不向后兼容的增强功能或新功能。
- `docs` - 仅更改文档。
- `chore` - 不面向用户的更改。
- `build` - 仅更改构建流程。
- `refactor` - 不影响 API 或用户体验的更改。
- `test` - 仅更改测试文件。
- `ci` - 更改 CI 配置文件和脚本。
- `perf` - 提升性能的代码更改。

请根据你正在处理的问题的[标签](work-on-issue#issue-labels)来确定最合适的 tag。

提交消息摘要应使用一句话描述更改，长度不得超过 72 个字符。如果拉取请求解决了某个问题，应在提交消息正文中以 `Fixes #1234` 的格式注明问题编号。如果提交没有完全解决该问题，则使用 `Refs #1234`，而不是 `Fixes #1234`。

以下是一些不错的提交消息摘要示例：

```txt
build: Update Travis to only test Node 0.10
fix: Semi rule incorrectly flagging extra semicolon
chore: Upgrade Esprima to 1.2, switch to using comment attachment
```

<a id="step-3-rebase-onto-upstream"></a>

### 步骤 3：变基到上游代码<a name="step3"></a>

提交拉取请求前，请务必变基到上游源代码。这样可以确保你的代码基于当前最新版本运行。

```shell
git fetch upstream
git rebase upstream/main
```

<a id="step-4-run-the-tests"></a>

### 步骤 4：运行测试<a name="step4"></a>

变基后，请再次运行所有测试，确保没有引入问题：

```shell
npm test
```

如果有测试失败，请持续修改代码，直到所有测试都通过。

<a id="step-5-double-check-your-submission"></a>

### 步骤 5：仔细检查提交内容<a name="step5"></a>

代码准备就绪后，正好可以仔细检查提交内容，确保符合我们的规范。请检查以下事项：

- 提交消息格式正确。
- 更改没有导致功能回归。提交拉取请求前，请务必运行 `npm test` 验证更改。
- 不相关的更改应分别提交拉取请求。包含多个不相关更改的大型拉取请求可能会被关闭而不予合并。
- 所有更改都必须附带测试，即使你正在开发的功能以前没有测试也一样。
- 所有面向用户的更改都必须附带适当的文档。
- 遵循[代码规范](./code-conventions)。

<a id="step-6-push-your-changes"></a>

### 步骤 6：推送更改<a name="step6"></a>

接下来，将更改推送到你的克隆仓库：

```shell
git push origin issue1234
```

如果因为某些引用已过期而无法推送，请改用强制推送：

```shell
git push -f origin issue1234
```

<a id="step-7-send-the-pull-request"></a>

### 步骤 7：提交拉取请求<a name="step7"></a>

现在可以提交拉取请求了。前往你的 ESLint 派生仓库，然后按照 [GitHub 文档](https://help.github.com/articles/creating-a-pull-request)中的说明提交拉取请求。

向 ESLint 项目提交代码或文档时，你需要在首次提交拉取请求时签署我们的 CLA。（有关 OpenJS 基金会 CLA 流程的更多信息，请访问 <https://cla.openjsf.org/>。）

拉取请求标题会根据第一个提交的摘要自动生成，但提交拉取请求前可以编辑标题。

拉取请求说明应解释你做了什么，以及如何观察到这些更改的效果。

拉取请求合并时，其中的提交会被压缩为一个提交。压缩后提交消息的第一行会包含拉取请求的标题和编号。
拉取请求标题的格式很重要，因为每个版本的变更日志都会根据这些标题生成。tag 和问题编号有助于生成更一致、更实用的变更日志。

<a id="following-up"></a>

## 后续跟进

提交拉取请求后，团队就会开始审查。请确保做到以下几点：

1. 关注拉取请求的 GitHub Actions CI 构建状态。如果构建失败，请调查原因。任何 CI 构建失败的拉取请求都无法合并。
1. 回复团队成员在拉取请求中留下的评论。请记住，我们希望帮助你合入代码，因此请积极听取反馈。
1. 我们可能会要求你进行更改、变基或压缩提交。

<a id="update-the-pull-request-title"></a>

### 更新拉取请求标题

如果拉取请求标题的格式不正确，我们会要求你更新。你可以通过 GitHub 用户界面进行修改。

<a id="update-the-code"></a>

### 更新代码

如果我们要求你修改代码，无需关闭拉取请求并重新创建。只需返回派生仓库中的分支并进行更改。准备就绪后，将更改添加到该分支：

```shell
git add -A
git commit
git push origin issue1234
```

更新代码时，通常最好在分支中添加新提交，而不是修改原始提交，因为这样审查者可以轻松看出哪些更改是针对特定审查意见做出的。合并拉取请求时，我们会将你分支中的所有提交压缩为 `main` 分支上的一个提交。

后续提交的消息无需遵循特定格式，因为这些消息不会出现在变更日志中。

<a id="rebase"></a>

### 变基

如果你的代码不是最新版本，我们可能会要求你变基。这意味着我们希望你将更改应用到最新的上游代码之上。请确保已设置[开发环境](./development-environment)，然后运行以下命令进行变基：

```shell
git fetch upstream
git rebase upstream/main
```

尝试变基时可能会遇到合并冲突。请[解决冲突](https://help.github.com/articles/resolving-merge-conflicts-after-a-git-rebase/)，然后强制推送到你的分支：

```shell
git push origin issue1234 -f
```
