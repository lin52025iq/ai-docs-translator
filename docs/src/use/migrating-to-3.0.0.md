---
title: 迁移到 v3.0.0
---

ESLint v3.0.0 是第三个主版本。在此版本中，我们进行了一些不兼容变更。不过，我们认为这些变更影响较小，ESLint 用户应该无需进行重大调整。本指南将带你了解这些变更。

<a id="dropping-support-for-nodejs--4"></a>

## 不再支持 Node.js < 4

从 ESLint v3.0.0 开始，我们将不再支持低于 4 的 Node.js 版本。Node.js 0.10 和 0.12 已进入[维护模式](https://github.com/nodejs/Release)，而 Node.js 4 是当前的 LTS 版本。如果你使用的是较旧版本的 Node.js，我们建议你尽快升级到至少 Node.js 4。如果你无法升级到 Node.js 4 或更高版本，则建议继续使用 ESLint v2.x，直到你准备好升级 Node.js。

**重要提示：**今后我们将不再更新 ESLint v2.x 版本。所有错误修复和改进都将发布在 ESLint v3.x 中。

<a id="requiring-configuration-to-run"></a>

## 运行时必须提供配置

ESLint v3.0.0 现在要求运行时使用配置。配置可以是以下任意一种：

1. 项目目录或主目录中的 `.eslintrc.js`、`.eslintrc.json`、`.eslintrc.yml`、`.eslintrc.yaml` 或 `.eslintrc` 文件。
2. 使用 `--rule` 在命令行上传入的配置选项（或使用 CLIEngine 时通过 `rules` 传入）。
3. 使用 `-c` 在命令行上传入的配置文件（或使用 CLIEngine 时通过 `configFile` 传入）。
4. 使用 `baseConfig` 选项为 CLIEngine 提供基础配置。

如果 ESLint 找不到配置，就会抛出错误并要求你提供配置。

此项变更旨在帮助 ESLint 新用户，他们经常会困惑于 ESLint 默认情况下除了报告解析器错误之外什么也不做。我们预计此变更对大多数已有用户影响很小，因为你很可能已经有配置文件。

**应对方法：**每次运行 ESLint 时，都应确保使用配置。不过，你仍然可以在不使用配置的情况下运行 ESLint：在命令行中传入 `--no-eslintrc` 选项，或将 `CLIEngine` 的 `useEslintrc` 选项设为 `false`。

要创建新配置，请使用 `eslint --init`。

<a id="changes-to-eslintrecommended"></a>

## 对 `"eslint:recommended"` 的变更

```json
{
	"extends": "eslint:recommended"
}
```

在 3.0.0 中，以下规则被加入 `"eslint:recommended"`：

- [`no-unsafe-finally`](../rules/no-unsafe-finally) 有助于捕获行为可能与你预期不同的 `finally` 子句。
- [`no-native-reassign`](../rules/no-native-reassign) 此前属于 `no-undef`，但由于将其作为另一条规则的一部分并不合适，因此将其拆分出来。每当你尝试覆盖只读全局变量时，`no-native-reassign` 规则都会发出警告。
- [`require-yield`](../rules/require-yield) 有助于识别缺少 `yield` 关键字的生成器函数。

以下规则已从 `"eslint:recommended"` 中移除：

- [`comma-dangle`](../rules/comma-dangle) 过去被列为推荐规则，因为 Internet Explorer 8 及更早版本遇到对象字面量属性末尾的逗号时会抛出语法错误。不过，[Internet Explorer 8 已于 2016 年 1 月停止支持](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support)，所有其他仍在使用的浏览器都允许末尾逗号。因此，我们现在认为末尾逗号属于风格问题，而非潜在错误。

以下规则已作修改：

- [`complexity`](../rules/complexity) 过去在 `eslint:recommended` 中的硬编码默认值为 11，当你启用该规则但未指定最大值时就会使用此值。现在默认值为 20。该规则实际上一直将 20 作为默认值，只是 `eslint:recommended` 错误地覆盖了它。

**应对方法：**如果你希望模拟 v2.x 中 `eslint:recommended` 的行为，可以使用以下配置：

```json
{
	"extends": "eslint:recommended",
	"rules": {
		"no-unsafe-finally": "off",
		"no-native-reassign": "off",
		"complexity": ["off", 11],
		"comma-dangle": "error",
		"require-yield": "error"
	}
}
```

<a id="changes-to-cliengineexecuteontext"></a>

## 对 `CLIEngine#executeOnText()` 的变更

`CLIEngine#executeOnText()` 方法现在的行为更接近 `CLIEngine#executeOnFiles()`。在 v2.x 中，`CLIEngine#executeOnText()` 默认会针对被忽略的文件发出警告，且没有办法关闭这些警告；而 `CLIEngine#executeOnFiles()` 默认不会针对被忽略的文件发出警告，并允许你选择启用此类警告。现在，`CLIEngine#executeOnText()` 默认也不会针对被忽略的文件发出警告，并允许你通过新增的第三个参数选择启用警告（布尔值，`true` 表示发出警告，`false` 表示不发出警告）。

**应对方法：**如果你目前在项目中像这样使用 `CLIEngine#executeOnText()`：

```js
var result = engine.executeOnText(text, filename);
```

你可以改用以下方式获得相同的行为：

```js
var result = engine.executeOnText(text, filename, true);
```

如果你不希望将被忽略文件的警告输出到控制台，可以省略第三个参数或传入 `false`。
