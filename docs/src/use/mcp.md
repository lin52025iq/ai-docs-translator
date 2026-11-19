---
title: MCP 服务器设置
eleventyNavigation:
    key: mcp server
    parent: use eslint
    title: MCP 服务器设置
    order: 5
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}

[模型上下文协议](https://modelcontextprotocol.io) (MCP) 是一项开放标准，可让 AI 模型通过统一接口与外部工具和服务交互。ESLint CLI 内置了 MCP 服务器，你可以将其注册到代码编辑器中，让 LLM 直接使用 ESLint。

## 在 VS Code 中设置 ESLint MCP 服务器

要在 VS Code 中使用 MCP 服务器，必须安装 [Copilot Chat](https://code.visualstudio.com/docs/copilot/copilot-chat) 扩展。然后，按照以下步骤添加 ESLint MCP 服务器：

### 1. 创建 MCP 配置文件

在项目中创建 `.vscode/mcp.json` 文件，并添加以下配置：

```json
{
	"servers": {
		"ESLint": {
			"type": "stdio",
			"command": "npx",
			"args": ["@eslint/mcp@latest"]
		}
	}
}
```

或者，也可以使用命令面板：

1. 按 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS）
2. 输入并选择 `MCP: Add Server`
3. 从下拉列表中选择 `Command (stdio)`
4. 将 `npx @eslint/mcp@latest` 作为命令输入
5. 输入 `ESLint` 作为服务器 ID
6. 选择 `Workspace Settings`，在 `.vscode/mcp.json` 中创建配置

### 2. 在用户设置中启用 MCP 服务器（可选）

如果要在所有工作区中使用 ESLint MCP 服务器，可以按照上述步骤操作，并选择 `User Settings` 而非 `Workspace Settings`，将 MCP 服务器添加到 `settings.json` 文件中。

### 使用 ESLint MCP 服务器与 GitHub Copilot 配合

配置好 MCP 服务器后，你可以通过 [GitHub Copilot 的代理模式](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)使用它：

1. 在 VS Code 中打开 Copilot Chat 视图
2. 确认已启用代理模式（在聊天输入框中查找代理图标）
3. 在聊天视图中使用“Tools”按钮启用 ESLint MCP 服务器工具
4. 让 Copilot 执行 ESLint 任务，例如：
    - “检查此文件是否有代码检查错误”
    - “修复当前文件中的所有 ESLint 问题”
    - “告诉我哪些 ESLint 规则遭到违反”

## 故障排除

如果 ESLint MCP 服务器出现问题：

1. 在命令面板中运行 `MCP: List Servers`，检查 MCP 服务器状态
2. 选择 ESLint 服务器，然后选择 `Show Output` 查看服务器日志
3. 确保已在项目中或全局安装 ESLint
4. 确认 MCP 配置正确

## 在 Cursor 中设置 ESLint MCP 服务器

要在 [Cursor](https://cursor.com) 中配置 ESLint MCP 服务器，请按以下步骤操作：

### 1. 创建 MCP 配置文件

在项目目录中创建 `.cursor/mcp.json` 文件，并添加以下配置：

```json
{
	"mcpServers": {
		"eslint": {
			"command": "npx",
			"args": ["@eslint/mcp@latest"],
			"env": {}
		}
	}
}
```

### 2. 全局配置（可选）

如果要在所有 Cursor 工作区中使用 ESLint MCP 服务器，请在主目录中创建 `~/.cursor/mcp.json` 文件，并使用相同的配置。

### 3. 验证工具是否可用

配置完成后，ESLint MCP 服务器应显示在 Cursor MCP 设置页面的“Available Tools”部分。

## 在 Windsurf 中设置 ESLint MCP 服务器

要在 [Windsurf](https://docs.windsurf.com/) 中配置 ESLint MCP 服务器，请按以下步骤操作：

### 1. 打开 Windsurf 设置

前往 Windsurf - Settings > Advanced Settings，或打开命令面板并选择“Open Windsurf Settings Page”。

### 2. 添加 ESLint MCP 服务器

向下滚动到 Cascade 部分，然后点击“Add Server”按钮。接着选择“Add custom server +”。

### 3. 配置 MCP 服务器

将以下配置添加到 `~/.codeium/windsurf/mcp_config.json` 文件中：

```json
{
	"mcpServers": {
		"eslint": {
			"command": "npx",
			"args": ["@eslint/mcp@latest"],
			"env": {}
		}
	}
}
```

### 4. 刷新服务器列表

添加配置后，点击刷新按钮以更新可用 MCP 服务器列表。

### 5. 在 Cascade 中使用 ESLint

配置完成后，你可以通过以下请求让 Cascade 使用 ESLint 工具：

- 检查文件是否存在代码检查错误
- 解释违反 ESLint 规则的情况

注意：在 Windsurf 中调用 MCP 工具无论成功与否都会消耗点数。

## 使用 TypeScript 配置文件

如果项目使用 TypeScript 配置文件（`eslint.config.ts`、`eslint.config.mts` 或 `eslint.config.cts`），则需要进行额外设置，让 MCP 服务器能够加载该文件。根据你的环境，有两种方法。详情请参阅 [TypeScript 配置文件](configure/configuration-files#typescript-configuration-files)。

### 选项 A：使用 jiti 本地安装（Node.js）

使用 `npx @eslint/mcp@latest` 运行 MCP 服务器时，ESLint 会安装到临时目录中，因此无法从项目的 `node_modules` 解析 `jiti`。若要使用 `jiti` 加载 TypeScript 配置，请在本地安装 `@eslint/mcp` 和 `jiti`：

{{ npm_tabs({
    command: "install",
    packages: ["@eslint/mcp", "jiti"],
    args: ["--save-dev"]
}) }}

然后，更新 MCP 配置以使用本地安装的服务器（去掉 `@latest`，这样 `npx` 才会解析本地二进制文件）：

**VS Code**（`.vscode/mcp.json`）：

```json
{
	"servers": {
		"ESLint": {
			"type": "stdio",
			"command": "npx",
			"args": ["@eslint/mcp"]
		}
	}
}
```

**Cursor / Windsurf**（`.cursor/mcp.json` 或 `~/.codeium/windsurf/mcp_config.json`）：

```json
{
	"mcpServers": {
		"eslint": {
			"command": "npx",
			"args": ["@eslint/mcp"]
		}
	}
}
```

在本地安装 `@eslint/mcp` 后，其中捆绑的 ESLint 会通过标准 Node.js 模块解析，从共享的 `node_modules` 目录中解析 `jiti`。

#### Yarn Plug'n'Play (PnP)

Yarn 2+ 默认使用 Plug'n'Play，且不会创建 `node_modules` 目录。要在 Yarn 项目中运行 `npx @eslint/mcp`，请在 `.yarnrc.yml` 中将 `nodeLinker` 设为 `node-modules`，然后再次运行 `yarn install`：

```yaml
nodeLinker: node-modules
```

创建 `node_modules` 目录后，上述 `npx` 配置即可正常工作。`nodeLinker: pnpm` 设置也可行。只有默认的 Plug'n'Play 模式（`nodeLinker: pnp`）不支持 `npx @eslint/mcp`。

### 选项 B：Node.js 原生 TypeScript 支持

如果你使用的是 **Node.js >= 22.13.0**，可以启用 Node.js 类型剥离和 ESLint 的 `unstable_native_nodejs_ts_config` 标志，无需使用 `jiti` 即可加载 TypeScript 配置文件。在 MCP 配置中将这些设置为环境变量。

**VS Code**（`.vscode/mcp.json`）：

```json
{
	"servers": {
		"ESLint": {
			"type": "stdio",
			"command": "npx",
			"args": ["@eslint/mcp@latest"],
			"env": {
				"ESLINT_FLAGS": "unstable_native_nodejs_ts_config",
				"NODE_OPTIONS": "--experimental-transform-types"
			}
		}
	}
}
```

**Cursor / Windsurf**（`.cursor/mcp.json` 或 `~/.codeium/windsurf/mcp_config.json`）：

```json
{
	"mcpServers": {
		"eslint": {
			"command": "npx",
			"args": ["@eslint/mcp@latest"],
			"env": {
				"ESLINT_FLAGS": "unstable_native_nodejs_ts_config",
				"NODE_OPTIONS": "--experimental-transform-types"
			}
		}
	}
}
```

## 示例提示词

以下是一些可以提供给 LLM 的示例提示词，用于运行 ESLint 并处理其发现的问题：

```text
Lint the current file and explain any issues found

Lint and fix #file:index.js
```

## 更多资源

- [模型上下文协议文档](https://modelcontextprotocol.io/introduction)
- [VS Code MCP 服务器文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
- [VS Code 中的 GitHub Copilot 文档](https://code.visualstudio.com/docs/copilot/copilot-chat)
- [Cursor 中的模型上下文协议文档](https://docs.cursor.com/context/model-context-protocol)
- [Windsurf 中的模型上下文协议文档](https://docs.windsurf.com/)
