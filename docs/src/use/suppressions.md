---
title: 批量抑制
eleventyNavigation:
    key: suppressions
    parent: use eslint
    title: 批量抑制
    order: 8
---

当代码库中存在大量违规，且规则无法自动修复时，将新的代码检查规则设为 `"error"` 可能颇具挑战。除非在项目早期就启用该规则，否则随着代码库不断增长，启用它会变得越来越困难。启用规则前必须先解决现有违规，但在此过程中可能又会出现其他违规。

为此，ESLint 提供了一种抑制一个或多个规则现有违规的方法。规则仍会对新代码生效，但不会报告现有违规。这样，你就可以按照自己的节奏处理现有违规。

::: important
只有配置为 `"error"` 的规则才会被抑制。如果规则设为 `"warn"`，ESLint 不会抑制违规。
:::

在配置文件中将规则设为 `"error"` 后，可以使用 `--suppress-all` 标志一次性抑制所有现有违规。建议执行命令时使用 `--fix` 标志，这样就不会抑制那些可以自动修复的违规。

```bash
eslint --fix --suppress-all
```

此命令会抑制所有设为 `"error"` 的规则中的全部现有违规。再次运行 `eslint` 命令时，这些违规将不会被报告。

如果要抑制特定规则的违规，可以使用 `--suppress-rule` 标志。

```bash
eslint --fix --suppress-rule no-unused-expressions
```

你也可以提供多个规则名称，以抑制多个规则的违规。

```bash
eslint --fix --suppress-rule no-unused-expressions --suppress-rule no-unsafe-assignment
```

<a id="suppressions-file"></a>

## 抑制文件

抑制违规时，ESLint 会在项目根目录下创建一个 `eslint-suppressions.json` 文件。此文件包含已抑制的规则列表。你应该将此文件提交到代码库，以便所有开发者共享这些抑制项。

如有需要，可以使用 `--suppressions-location` 参数更改抑制文件的位置。请注意，抑制违规和运行 ESLint 时都必须提供此参数。这样 ESLint 才能找到正确的抑制文件。

```bash
eslint --suppressions-location .github/.eslint-suppressions
```

<a id="resolving-suppressions"></a>

## 处理抑制项

你可以像往常一样，通过对代码进行必要的修改来处理报告的违规。如果再次运行 ESLint，你会发现它以非零退出码退出，并报告存在未使用的抑制项。这是因为违规已经解决，但抑制项仍然保留。

```bash
> eslint
There are suppressions left that do not occur anymore. Consider re-running the command with `--prune-suppressions`.
```

要移除不再需要的抑制项，可以使用 [`--prune-suppressions`](./command-line-interface#--prune-suppressions) 标志。

```bash
eslint --prune-suppressions
```

如果要在计算退出码时忽略未使用的抑制项，且不报告未使用抑制项的错误，可以使用 `--pass-on-unpruned-suppressions` 标志。

```bash
eslint --pass-on-unpruned-suppressions
```

有关可用 CLI 选项的详细信息，请参阅[命令行界面](./command-line-interface)。

<a id="usage-with-the-nodejs-api"></a>

## 与 Node.js API 配合使用

通过 [Node.js API](../integrate/nodejs-api) 以编程方式使用 ESLint 时，也可以应用抑制项。要启用抑制项，请在 `ESLint` 构造函数中将 `applySuppressions` 选项设为 `true`：

```js
const eslint = new ESLint({
	applySuppressions: true,
});
```

默认情况下，ESLint 会在当前工作目录中查找 `eslint-suppressions.json`。你可以使用 `suppressionsLocation` 选项指定自定义的抑制文件位置：

```js
const eslint = new ESLint({
	applySuppressions: true,
	suppressionsLocation: "./config/my-suppressions.json",
});
```

使用 `lintText()` 时，必须提供 `filePath` 选项才能应用抑制项，因为抑制项是按文件路径匹配的。

**注意：**Node.js API 仅支持应用现有抑制项。创建新的抑制项（`--suppress-all`、`--suppress-rule`）和清理未使用的抑制项（`--prune-suppressions`）只能通过 CLI 执行。