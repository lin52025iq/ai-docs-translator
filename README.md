# AI Docs Translator

配置驱动的 GitHub 多项目、多语言 AI 文档翻译工具。目前已搭建工程基础，翻译流程尚未实现。

基于 Vite 官方 `vanilla-ts` 脚手架创建，工程约定参考 `tiptap-compare`。使用 Node.js 24、pnpm 12、TypeScript strict、ESLint Flat Config 和 Prettier。

安装依赖：

```sh
pnpm install
```

| 命令                | 用途                        |
| ------------------- | --------------------------- |
| `pnpm dev`          | 启动 Vite 开发服务器        |
| `pnpm typecheck`    | TypeScript 类型检查         |
| `pnpm lint`         | ESLint 与 Prettier 只读检查 |
| `pnpm lint:fix`     | ESLint 自动修复并格式化     |
| `pnpm format`       | 格式化文件                  |
| `pnpm format:check` | 只读格式检查                |
| `pnpm build`        | 类型检查并生成 `dist`       |
| `pnpm preview`      | 预览构建产物                |

`pnpm install` 会通过 `prepare` 安装 simple-git-hooks。提交前使用 lint-staged 对暂存文件执行 ESLint 修复与 Prettier 格式化；不会运行测试或构建。

修改 Git Hook 配置后执行 `pnpm prepare` 重新安装。VS Code 共享配置沿用 ESLint 统一处理格式和导入排序的方式。
