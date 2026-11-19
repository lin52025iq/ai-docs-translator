---
title: 管理发布
eleventyNavigation:
    key: manage releases
    parent: maintain eslint
    title: 管理发布
    order: 4
---

发布是指项目正式发布新版本，以供社区使用。发布分为两种：

- 遵循[语义化版本](https://semver.org/)且被视为可用于生产环境的常规发布。
- 不被视为可用于生产环境、旨在让社区预览即将推出的更改的预发布版本。

<a id="release-manager"></a>

## 发布经理

技术指导委员会（TSC）的一名成员会被指定负责管理每次计划发布。发布经理由发布前一天举行的 TSC 会议确定。

发布经理负责：

1. 周五的计划发布。
1. 在周末监控问题。
1. 周一确定是否需要发布补丁版本。
1. 发布补丁版本（如有必要）。

发布后的周一，发布经理应征求整个团队的意见，再次确认是否需要发布补丁版本。

发布经理需要能够访问 ESLint 的 npm 双因素身份验证，才能执行发布。

<a id="release-communication"></a>

## 发布沟通

每次计划发布都会关联一个自动生成的发布议题（[示例](https://github.com/eslint/eslint/issues/18151)）。发布议题是团队了解发布状态的信息来源，其中包含发布经理应遵循的检查清单。

<a id="process"></a>

## 流程

在计划发布当天，发布经理应按照发布议题中的步骤操作。

所有与发布相关的沟通都在 Discord 的 `#team` 频道的一个讨论串中进行。

计划发布后的周一，发布经理需要确定是否需要发布补丁版本。自计划发布以来，出现以下任一情况时，就需要发布补丁版本：

- 回归缺陷导致原本可以通过代码检查的构建失败。
- 任何给用户造成大量问题的缺陷（这种情况经常由新功能引起）。

应尽可能在周一早些时候决定是否发布补丁版本。如果需要发布补丁版本，则遵循与计划发布相同的步骤。

在少数情况下，如果已知某次发布存在严重回归问题，且截至周一仍未修复，可能需要再发布第二个补丁版本。如果发生这种情况，发布经理应在发布议题中说明情况，并保持议题开放，直到所有补丁版本发布完毕。不过，通常最好将缺陷留到下一个发布周期修复，而不是再发布第二个补丁版本。

补丁版本发布后（或确定不需要发布补丁版本后），关闭发布议题，并通知团队可以重新合并 semver-minor 更改。

<a id="release-parameters"></a>

### 发布参数

以下表格展示了在 Jenkins 上启动 `eslint-js Release`（`@eslint/js` 包的发布）和 `eslint Release`（`eslint` 包的发布）作业以发布包含最新功能的新版本时，`RELEASE_TYPE` 可选择的值。在这两个作业中，`RELEASE_BRANCH` 都应选择 `main`。

| **HEAD 版本** | **期望的下一个版本** | **`eslint-js Release`<br>`RELEASE_TYPE`** |
| :--------------: | :----------------------: | :---------------------------------------: |
|     `9.25.0`     |         `9.25.1`         |                  `patch`                  |
|     `9.25.0`     |         `9.26.0`         |                  `minor`                  |
|     `9.25.0`     |     `10.0.0-alpha.0`     |                 `alpha.0`                 |
| `10.0.0-alpha.0` |     `10.0.0-alpha.1`     |                  `alpha`                  |
| `10.0.0-alpha.1` |     `10.0.0-beta.0`      |                  `beta`                   |
| `10.0.0-beta.0`  |     `10.0.0-beta.1`      |                  `beta`                   |
| `10.0.0-beta.1`  |      `10.0.0-rc.0`       |                   `rc`                    |
|  `10.0.0-rc.0`   |      `10.0.0-rc.1`       |                   `rc`                    |
|  `10.0.0-rc.1`   |         `10.0.0`         |                  `major`                  |

| **HEAD 版本** | **期望的下一个版本** | **`eslint Release`<br>`RELEASE_TYPE`** |
| :--------------: | :----------------------: | :------------------------------------: |
|     `9.25.0`     |   `9.25.1` or `9.26.0`   |                `latest`                |
|     `9.25.0`     |     `10.0.0-alpha.0`     |                `alpha`                 |
| `10.0.0-alpha.0` |     `10.0.0-alpha.1`     |                `alpha`                 |
| `10.0.0-alpha.1` |     `10.0.0-beta.0`      |                 `beta`                 |
| `10.0.0-beta.0`  |     `10.0.0-beta.1`      |                 `beta`                 |
| `10.0.0-beta.1`  |      `10.0.0-rc.0`       |                  `rc`                  |
|  `10.0.0-rc.0`   |      `10.0.0-rc.1`       |                  `rc`                  |
|  `10.0.0-rc.1`   |         `10.0.0`         |                `latest`                |

发布上一条主版本线的新版本时，`RELEASE_TYPE` 的可选值取决于 HEAD 版本是否为预发布版本。在这两个作业中，`RELEASE_BRANCH` 都应选择相应的开发分支（例如 `v9.x-dev`）。

| **HEAD 版本** | **上一条主版本线版本** | **期望的下一个版本** | **`eslint-js Release`<br>`RELEASE_TYPE`** |
| :--------------: | :-----------------------------: | :----------------------: | :---------------------------------------: |
| `10.0.0-alpha.0` |            `9.25.0`             |         `9.25.1`         |                  `patch`                  |
| `10.0.0-alpha.0` |            `9.25.0`             |         `9.26.0`         |                  `minor`                  |
|     `10.0.0`     |            `9.25.0`             |         `9.25.1`         |            `maintenance.patch`            |
|     `10.0.0`     |            `9.25.0`             |         `9.26.0`         |            `maintenance.minor`            |

| **HEAD 版本** | **上一条主版本线版本** | **期望的下一个版本** | **`eslint Release`<br>`RELEASE_TYPE`** |
| :--------------: | :-----------------------------: | :----------------------: | :------------------------------------: |
| `10.0.0-alpha.0` |            `9.25.0`             |   `9.25.1` or `9.26.0`   |                `latest`                |
|     `10.0.0`     |            `9.25.0`             |   `9.25.1` or `9.26.0`   |             `maintenance`              |

<a id="emergency-releases"></a>

## 紧急发布

紧急发布是计划外的发布，既不是定期计划发布，也不是预期中的补丁版本发布。

一般来说，我们尽量避免紧急发布。即使出现回归问题，最好也等到周一，看看是否还会出现其他问题，这样补丁版本就能尽可能多地修复问题。

唯一真正的例外是 ESLint 对大多数当前用户完全无法使用。例如，我们曾经发布过一个版本，由于缺少一些核心文件，导致所有人的使用都报错。在这种情况下，适合进行紧急发布。

<a id="major-releases"></a>

## 主版本发布

本节介绍在主版本发布周期中应在 ESLint 仓库和基础设施中完成的其他任务。主版本发布周期包括预发布版本，以及 ESLint 新主版本的最终发布。

为简便起见，假设 v9.x 是当前版本，v10.0.0 是新的主版本。

`eslint/eslint` 仓库中的以下分支对本发布周期尤为重要：

- `main`：所有最新开发工作都在此分支上进行，主版本发布周期也不例外。这意味着破坏性更改应与新功能、缺陷修复以及通常合并到此分支的其他所有内容一起合并到此分支。预发布版本和最终主版本都将从此分支发布。
- `next`：最新预发布文档的分支（`https://eslint.org/docs/next/`）。此分支会在发布过程中自动更新。
- `v9.x-dev`：用于维护 v9.x 的分支。此分支从第一个 v10 预发布版本之前的最后一个 v9.x 发布提交开始。所有新的 v9.x 版本（如有需要）都将从此分支发布。
- `v9.x`：ESLint v9.x 文档的分支（`https://eslint.org/docs/v9.x/`）。此分支会在发布过程中自动更新。请注意，只有在 v10.0.0 最终发布后才需要此分支。在此之前，v9.x 仍是最新版本，其文档分支为 `latest`（`https://eslint.org/docs/latest/`）。

<a id="first-prerelease"></a>

### 首个预发布版本

最后一个计划中的 v9.x 版本发布完成后，即开始准备首个预发布版本（`alpha.0`）。

- 在 Netlify 上打开 `docs-eslint` 项目。在 `Project Configuration > Build & Deploy > Continuous deployment` 下找到 `Dependency management`。检查配置的 Node.js 版本是否满足 ESLint 新主版本的要求。如果不满足，请更新为新的 Node.js 版本。
- 在 Jenkins 上检查已安装的 Node.js 版本是否满足 ESLint 新主版本的要求。如果不满足，请安装新的 Node.js 版本。
- 在 `eslint/eslint.org` 仓库中提交 PR，在 `tools/release-data.js` 中设置 `upcomingVersionPrereleaseType = "alpha"`。这样可以在 `https://eslint.org/` 首页的版本列表中公布预发布版本。PR 获批后即可合并。
- 在 `eslint/eslint.org` 仓库中提交 PR，在 `src/static/redirects.njk` 中启用 `/docs/next/*` 代理。PR 应及时完成审查和批准，但要等 ESLint 10.0.0-alpha.0 发布后立即合并。
- 在 `eslint/eslint.org` 仓库中提交 PR，更新 `src/content/pages/version-support.md` 中的 Current Release Lines 表格：添加 v10.x，状态设为 "Current"，首次发布日期设为计划中的首个预发布日期（并在日期后添加 `<br>(prerelease)`）；将 v9.x 状态更新为 "Maintenance"。PR 应及时完成审查和批准，但要等 ESLint 10.0.0-alpha.0 发布后立即合并。
- 在 `eslint/eslint` 仓库中提交 PR，在 `.npmrc` 文件中添加 `legacy-peer-deps = true`。这样可以确保预发布版本发布后，CI 和开发者本地的 `npm install` 能正常运行，因为一些依赖（例如 `@eslint-community/eslint-utils`）将 `eslint` 声明为 peer dependency，且其版本范围不包含 `10.0.0-alpha.0` 这类预发布版本。此外，对于 `.npmrc` 文件不适用的 `npm install` 命令，也要添加 `--legacy-peer-deps` CLI 标志，例如 `types-integration.yml` 中的 `npm install ../eslint`。PR 获批后即可合并。
- 在 `eslint/eslint` 仓库中提交 PR，更新 `packages/js/package.json` 中 peer dependency `eslint` 的版本范围，以及 `packages/eslint-config-eslint/package.json` 中 dependency `@eslint/js` 和 peer dependency `eslint` 的版本范围，使其包含 v10 及其预发布版本。这样可以确保代码检查时使用相应版本的 `@eslint/js`。PR 获批后即可合并。
- 在 `eslint/eslint` 仓库中创建一个议题，追踪所有最终应撤销或修改的临时更改（例如在适当时移除 `legacy-peer-deps` 设置）。

在此阶段，我们还应为 v9.x 维护工作准备基础设施：

- 在 `eslint/eslint` 仓库中创建 `v9.x-dev` 分支，使其指向最新的发布提交（例如 `9.39.0` 提交）。在 Branches 页面上检查该分支是否受保护（由于分支名符合分支保护规则中预定义的模式，它应该已经受到保护）。
- 在 `eslint/eslint` 仓库中提交 PR，在 `.github/workflows/*` 文件中将 `v9.x-dev` 添加到会触发 CI 检查的分支列表。PR 应以 `v9.x-dev` 分支为目标，获批后即可合并。
- 在 Netlify 上打开 `docs-eslint` 项目。在 `Project Configuration > Build & Deploy > Continuous deployment` 下找到 `Branches and deploy contexts`。将 `v9.x-dev` 添加到 `Branch deploys`。这样，目标分支为 `v9.x-dev` 的 PR 就可以生成部署预览。同时检查 `next` 分支是否也包含在 `Branch deploys` 中（它应该已经包含在内）。
- 在 Jenkins 中的 `eslint Release` 和 `eslint-js Release` 作业配置里，将 `v9.x-dev` 添加到 `RELEASE_BRANCH` 参数的可选值列表中。

<a id="subsequent-prereleases"></a>

### 后续预发布版本

- 当预计下一个计划中的预发布版本将从 `alpha` 进入 `beta`，或从 `beta` 进入 `rc` 时，在 `eslint/eslint.org` 仓库中提交 PR，相应地更新 `tools/release-data.js` 中的 `upcomingVersionPrereleaseType`。PR 获批后即可合并。

<a id="final-release"></a>

### 最终发布

- 当预计下一个计划发布版本将是 v10.0.0 最终版时，在 `eslint/eslint.org` 仓库中提交 PR，将 `tools/release-data.js` 中的 `upcomingVersionPrereleaseType` 更新为 `null`。PR 获批后即可合并。
- 在 `eslint/eslint` 仓库中创建 `v9.x` 分支，使其指向最新的 v9.x 发布提交（例如 `9.39.0` 提交）。
- 在 Netlify 上打开 `docs-eslint` 项目。在 `Project Configuration > Build & Deploy > Continuous deployment` 下找到 `Branches and deploy contexts`。将 `v9.x` 添加到 `Branch deploys`。要触发首次生产部署以便测试，请找到 `Build Hooks`，复制 URL，然后在终端中运行 `curl -X POST -d '{}' <URL>?trigger_branch=v9.x`（`<URL>` 是构建钩子的 URL）。
- 在 `eslint/eslint.org` 仓库中提交 PR，在 `src/static/redirects.njk` 中启用 `/docs/v9.x/*` 代理。PR 应及时完成审查和批准，但要在 ESLint 10.0.0 最终版发布前立即合并。
- 在 `eslint/eslint.org` 仓库中提交 PR，在 `src/static/redirects.njk` 中将 `/docs/next/*` 和 `/docs/v10.x/*` 重定向到 `/docs/latest/*`。PR 应及时完成审查和批准，但要在 ESLint 10.0.0 最终版发布后立即合并。
- 在 `eslint/eslint.org` 仓库中提交 PR，更新 `src/content/pages/version-support.md` 中的 Current Release Lines 表格：将 v10.x 的 First Release 日期更新为计划中的 ESLint v10.0.0 最终发布日期（同时删除日期后的 `<br>(prerelease)`）；将 v9.x 的 EOL Start 日期设为计划中的 ESLint v10.0.0 最终发布日期加六个月。PR 应及时完成审查和批准，但要在 ESLint 10.0.0 最终版发布后立即合并。
- 在 `eslint/eslint` 仓库中提交两个 PR，在 `docs/tools/validate-links.js` 的 `skipPatterns` 列表中添加 `"/docs/v9.x"`。一个 PR 应以 `main` 分支为目标，另一个应以 `v9.x-dev` 分支为目标。PR 应及时完成审查和批准，但要在 ESLint 10.0.0 发布前立即合并。
- 在 `eslint/eslint` 仓库中提交 PR，将 `packages/js/package.json` 中的 peer dependency `eslint` 更新为 `^10.0.0`。PR 应及时完成审查和批准，但要在 ESLint v10.0.0 最终版发布后、`@eslint/js` v10.0.0 最终版发布前合并。
- 在 `eslint/eslint` 仓库中提交 PR，将 `packages/eslint-config-eslint/package.json` 中的 dependency `@eslint/js` 和 peer dependency `eslint` 更新为 `^10.0.0`（即从版本范围中移除预发布版本）。PR 应及时完成审查和批准，但要在 ESLint v10.0.0 最终版和 `@eslint/js` v10.0.0 最终版发布后合并。

<a id="after-the-final-release"></a>

### 最终发布之后

- 在可能的情况下，撤销本次主版本发布周期中所做的每项临时更改，例如 `legacy-peer-deps`。所有更改都应已记录在议题中。
- 在可能的情况下，将 `packages/eslint-config-eslint/package.json` 中的 eslint 插件更新到支持 ESLint v10 的版本。所有插件更新完毕后，发布 `eslint-config-eslint`，并更新所有仓库，使其在代码检查时使用 ESLint v10 和新版 `eslint-config-eslint`。

<a id="three-months-after-the-final-release"></a>

#### 最终发布后三个月

- 在 `eslint/eslint.org` 仓库中提交 PR，将 `src/_includes/partials/deprecation-notice.html` 中的文本更新为 "ESLint v9.x end-of-life is (insert date here) and will not be maintained after that. Upgrade or consider long-term support options"。将 "Upgrade" 上的链接更新为指向 ESLint v10 迁移指南。在同一个 PR 中，将 {% raw %}`{% include 'partials/deprecation-notice.html' %}`{% endraw %} 添加到 `src/_includes/layouts/base.html`，放在 {% raw %}`{{ content | safe }}`{% endraw %} 之前。PR 应及时完成审查和批准，但要在最终发布整整三个月后合并。
- 在 `eslint/eslint` 仓库中提交两个 PR（一个以 `v9.x` 分支为目标，另一个以 `v9.x-dev` 分支为目标），将 `docs/src/_includes/partials/deprecation-notice.html` 中的文本更新为 "ESLint v9.x end-of-life is (insert date here) and will not be maintained after that. Upgrade or consider long-term support options"。将 "Upgrade" 上的链接更新为指向 ESLint v10 迁移指南。在这两个 PR 中，将 {% raw %}`{% include 'partials/deprecation-notice.html' %}`{% endraw %} 添加到 `docs/src/_includes/layouts/base.html`，放在 {% raw %}`{{ content | safe }}`{% endraw %} 之前。PR 应及时完成审查和批准，但要在最终发布整整三个月后合并。

<a id="six-months-after-the-final-release"></a>

#### 最终发布后六个月

- 在 `eslint/eslint.org` 仓库中提交 PR，更新 `src/content/pages/version-support.md` 中的 Current Release Lines 表格：在 v9.x 的 Release Line 列中填写具体版本（例如 v9.0.0-v9.39.2），将状态更新为 EOL，将 Last Release 日期设为最后一个 v9.x 版本的发布日期，并将 HeroDevs 添加为 Commercial Support。PR 应及时完成审查和批准，并在 EOL 日期开始时合并。
- 在 `eslint/eslint.org` 仓库中提交 PR，将 `src/_includes/partials/deprecation-notice.html` 中的文本更新为 "ESLint v9.x reached end-of-life on (insert date here) and is no longer maintained. Upgrade or consider long-term support options"。PR 应及时完成审查和批准，并在 EOL 日期开始时合并。
- 在 `eslint/eslint` 仓库中提交 PR，将 `docs/src/_includes/partials/deprecation-notice.html` 中的文本更新为 "ESLint v9.x reached end-of-life on (insert date here) and is no longer maintained. Upgrade or consider long-term support options"。PR 应以 `v9.x` 分支为目标（无需同时更新 `v9.x-dev` 分支，因为我们之后将不再使用它）。PR 应及时完成审查和批准，并在 EOL 日期开始时合并。
- 弃用与已结束生命周期的发布版本相关的 npm 包版本。以 `eslintbot` 用户身份登录 npm 并运行：
    > ```shell
    > npm deprecate "eslint@<10" "This version is no longer supported. Please see https://eslint.org/version-support for other options."
    > ```
- 发布社交媒体消息，宣布 v9.x 已结束生命周期，例如：
    > ```text
    > The ESLint v9.x line reached end of life on [insert date]. The packages are now deprecated and we encourage everyone to upgrade to v10.x.
    >
    > https://eslint.org/version-support/
    > ```

<a id="nine-months-after-the-final-release"></a>

#### 最终发布后九个月

- 在 `eslint/eslint.org` 仓库中提交 PR，从 `src/_includes/layouts/base.html` 中移除 {% raw %}`{% include 'partials/deprecation-notice.html' %}`{% endraw %}。PR 应及时完成审查和批准，但要在最终发布整整九个月后合并。

<a id="troubleshooting"></a>

## 故障排除

<a id="npm-publish-returns-a-404"></a>

### `npm publish` 返回 404

这通常是由与 npm 令牌相关的权限错误导致的。

- `release-please` 使用细粒度访问令牌，该令牌在一年后过期。此令牌与 `eslintbot` npm 账户关联，需要每年三月重新生成。如果访问令牌已过期，`npm publish` 会返回 404。
- Jenkins 使用没有过期日期的经典访问令牌，但发布时仍需提供 2FA 验证码。如果 2FA 验证码不正确，`npm publish` 会返回 404。
