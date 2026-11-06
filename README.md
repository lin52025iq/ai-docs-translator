# AI Docs Translator

配置驱动的多项目、多语言文档翻译工具，使用 OpenAI 翻译并审查结果，默认模型为 `gpt-6-luna`。支持 Markdown、MDX 和代码等 UTF-8 文本文件。

## 准备

使用 Node.js 24 和 pnpm 12：

```sh
pnpm install
```

创建项目，名称对应 `project.id`：

```sh
pnpm translator create-project --name my-docs --source-repository owner/docs --ref main --source-language auto --locale zh-CN en --push
```

命令创建独立的 `my-docs-config` 分支，不切换当前分支。省略 `--push` 时只在本地创建；上游 ref 默认 `main`，源语言默认自动识别，目标语言默认 `zh-CN`。已有配置可用 `--name <项目ID> --from <配置目录>` 导入，术语、提示词和进度会原样保留。

在配置分支中维护以下文件，完整示例见 `examples/project/`：

- `config.yml`：上游仓库、源语言、目标语言、翻译范围和审查配置。
- `glossary.yml`：术语及各语言译法。
- `prompts/`：项目和语言的补充提示词。

配置中的文件路径相对于 `config.yml`。`locale` 决定翻译目标语言，`frameworkLanguage` 只选择提示词的书写语言，默认使用中文框架。

`source.language` 可指定原文语言（如 `en`），设为 `auto` 或省略时，由翻译模型根据每个文件内容识别；混合语言按内容处理。术语库的 `sourceLanguage` 也可省略或设为 `auto`，明确指定时应与源语言一致。

校验配置：

```sh
pnpm translator validate --project .translation-config/config.yml
```

## 项目结构

管理分支存放程序及 Workflow，项目数据分别保存在独立分支：

```text
master（或仓库默认分支）
├── src/                           # CLI、翻译、状态与 Git 实现
├── examples/project/              # 配置、术语和提示词示例
└── .github/
    ├── templates/base.yml         # Workflow 模板
    └── workflows/
        ├── create-project.yml     # 创建项目配置分支
        └── translate.yml          # 按项目 ID 执行翻译

<项目ID>-config
├── config.yml
├── glossary.yml
├── prompts/
│   └── common.md
├── state/
│   └── <语言>/manifest.json        # 各语言的增量状态与成功凭证
└── progress/
    ├── summary.json
    └── locales/<语言>.json

<项目ID>-source                    # 完整上游镜像
<项目ID>-<语言>                    # 完整仓库与译文
<项目ID>-draft                     # 异常输出及审查报告
```

配置分支名固定为 `<项目ID>-config`。原文、语言和 draft 分支可在配置中修改。各语言的状态与进度在运行后生成，仅写回配置分支；管理分支不再保存 `projects/<项目ID>/`。译文先提交或推送成功，再记录配置分支中的成功凭证；中途失败可在下次运行时重试。

## GitHub Actions

在 Actions 页面运行「创建翻译项目」，填写项目 ID、上游仓库、ref、源语言和目标语言，即可创建并推送配置分支；它调用与本地相同的 `create-project` 命令，不调用模型。

随后运行「项目文档翻译」，只需填写项目 ID。Workflow 单独检出 `<项目ID>-config` 到 `.translation-config/`，按配置读取上游仓库和启用的语言，不需要为每个项目复制 Workflow。`.github/templates/base.yml` 保留为自定义模板，本身不会执行。

在管理仓库的 Actions Secrets 中配置：

- `OPENAI_API_KEY`：OpenAI API 密钥。
- `<项目ID大写并将连字符替换为下划线>_SOURCE_REPO_TOKEN`：对应上游仓库的只读凭据，例如 `my-docs` 使用 `MY_DOCS_SOURCE_REPO_TOKEN`。翻译 Workflow 按项目 ID 自动选择。

管理仓库通过 `GITHUB_TOKEN` 的 `contents: write` 权限发布分支和进度。Workflow 提交到默认分支后，可在 Actions 页面手动运行。

翻译按语言、文件顺序执行。通过输出检查和审查后发布译文与状态；异常输出保存到项目 draft 分支，保留原文、候选译文和原因。后续运行只处理需要更新的文件。控制台输出实时进度，结束后在日志及 Job Summary 中显示完成、冲突和失败数量。

## 本地运行

复制 `.env.example` 为 `.env` 并填写 `OPENAI_API_KEY`，不要提交真实密钥。在管理仓库中将配置分支检出到独立目录，再将上游仓库检出到本地：

```sh
git clone --branch my-docs-config --single-branch . .translation-config
```

这个本地克隆读取刚创建的配置分支，不切换管理仓库分支。在 `.translation-config/` 中编辑配置后，应将修改提交回对应配置分支。

```sh
pnpm translator run-project --project .translation-config/config.yml --source-root ../source
```

源文件读取已提交的 Git 快照。默认只生成本地分支和进度，增加 `--push` 发布到管理仓库远端；增加 `--retry-failed` 重试失败和异常输出。仅有已归档的异常输出时警告并正常退出，实际失败时以非零状态退出，已完成结果保留。

无需项目配置即可翻译单个文件，源语言默认自动识别：

```sh
pnpm translator translate --file README.md --locale zh-CN
```

用 `--source-language en` 指定源语言，或用 `--source-language auto` 自动识别。也可加载项目术语、提示词和审查配置：

```sh
pnpm translator translate --project .translation-config/config.yml --source-root ../source --file README.md
```

`--file` 相对于 `--source-root`（默认当前目录）。项目仅启用一种目标语言时可以省略 `--locale`。结果默认保存到 `.translation-drafts/<语言>/README.md`，可用 `--output` 修改路径。单文件命令读取当前文件内容，仅生成本地译文，不发布或更新成功状态；异常输出仍归档到 draft 分支，无项目时使用 `standalone-draft`，通过 `--repository` 指定归档用的本地 Git 仓库（默认当前目录）。

更多命令通过 `pnpm translator --help` 查看。开发检查使用 `pnpm lint` 和 `pnpm typecheck`。
