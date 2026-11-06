# AI Docs Translator

配置驱动的多项目、多语言文档翻译工具，使用 OpenAI 翻译并审查结果，默认模型为 `gpt-6-luna`。支持 Markdown、MDX 和代码等 UTF-8 文本文件。

## 准备

使用 Node.js 24 和 pnpm 12：

```sh
pnpm install
```

将 `examples/project/` 复制到 `projects/<项目名>/`，修改以下文件：

- `config.yml`：上游仓库、源语言、目标语言、翻译范围和审查配置。
- `glossary.yml`：术语及各语言译法。
- `prompts/`：项目和语言的补充提示词。

配置中的文件路径相对于 `config.yml`。`locale` 决定翻译目标语言，`frameworkLanguage` 只选择提示词的书写语言，默认使用中文框架。

`source.language` 可指定原文语言（如 `en`），设为 `auto` 或省略时，由翻译模型根据每个文件内容识别；混合语言按内容处理。术语库的 `sourceLanguage` 也可省略或设为 `auto`，明确指定时应与源语言一致。

校验配置：

```sh
pnpm translator validate --project projects/<项目名>/config.yml
```

## GitHub Actions

将 `.github/templates/base.yml` 复制到 `.github/workflows/<项目名>.yml`，替换 `your-project` 和 `YOUR_PROJECT_SOURCE_REPO_TOKEN`，按需修改触发时间。模板本身不会作为流水线执行。

在管理仓库的 Actions Secrets 中配置：

- `OPENAI_API_KEY`：OpenAI API 密钥。
- `<项目名>_SOURCE_REPO_TOKEN`：对应上游仓库的只读凭据，例如 `DOCS_A_SOURCE_REPO_TOKEN`。不同项目分别配置，并在各自 Workflow 中引用。

管理仓库通过 `GITHUB_TOKEN` 的 `contents: write` 权限发布分支和进度。Workflow 提交到默认分支后，可在 Actions 页面手动运行。

翻译按语言、文件顺序执行。通过校验和审查后发布译文与状态；结构冲突保存到项目 draft 分支，保留原文、候选译文和原因。后续运行只处理需要更新的文件。控制台输出实时进度，结束后在日志及 Job Summary 中显示完成、冲突和失败数量。

## 本地运行

复制 `.env.example` 为 `.env` 并填写 `OPENAI_API_KEY`，不要提交真实密钥。将上游仓库检出到本地后运行：

```sh
pnpm translator run-project --project projects/<项目名>/config.yml --source-root ../source
```

源文件读取已提交的 Git 快照。默认只生成本地分支和进度，增加 `--push` 发布到管理仓库远端；增加 `--retry-failed` 重试失败和冲突文件。仅有已归档的结构冲突时警告并正常退出，实际失败时以非零状态退出，已完成结果保留。

无需项目配置即可翻译单个文件，源语言默认自动识别：

```sh
pnpm translator translate --file README.md --locale zh-CN
```

用 `--source-language en` 指定源语言，或用 `--source-language auto` 自动识别。也可加载项目术语、提示词和审查配置：

```sh
pnpm translator translate --project projects/<项目名>/config.yml --source-root ../source --file README.md
```

`--file` 相对于 `--source-root`（默认当前目录）。项目仅启用一种目标语言时可以省略 `--locale`。结果默认保存到 `.translation-drafts/<语言>/README.md`，可用 `--output` 修改路径。单文件命令读取当前文件内容，仅生成本地译文，不发布或更新成功状态；结构冲突仍归档到 draft 分支，无项目时使用 `standalone-draft`，通过 `--repository` 指定归档用的本地 Git 仓库（默认当前目录）。

更多命令通过 `pnpm translator --help` 查看。开发检查使用 `pnpm lint` 和 `pnpm typecheck`。
