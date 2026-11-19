---
title: 命令行界面参考
eleventyNavigation:
    key: command line interface
    parent: use eslint
    title: 命令行界面参考
    order: 4
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}
{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

ESLint 命令行界面（CLI）可让你在终端中执行代码检查。CLI 提供多种选项，可用于配置 ESLint。

<a id="run-the-cli"></a>

## 运行 CLI

ESLint 需要 [Node.js](https://nodejs.org/) 才能安装。请按照[入门指南](getting-started)中的说明安装 ESLint。

大多数用户会使用 [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) 在命令行中运行 ESLint，如下所示：

{{ npx_tabs ({
    package: "eslint",
    args: ["[options]", "[file|dir|glob]*"]
}) }}

例如：

{{ npx_tabs ({
    package: "eslint",
    args: ["file1.js", "file2.js"],
    comment: "Run on two files"
}) }}

或者

{{ npx_tabs ({
    package: "eslint",
    args: ["lib/**"],
    comment: "Run on multiple files"
}) }}

请注意，将 glob 作为参数传递时，shell 会对其进行展开。展开结果可能因 shell 及其配置而异。如果你想使用 Node.js 的 `glob` 语法，就必须将参数括起来（若要在 Windows 上运行，请使用双引号），如下所示：

{{ npx_tabs ({
    package: "eslint",
    args: ["\"lib/**\""]
}) }}

你也可以省略文件参数，此时 ESLint 会使用 `.`。例如，以下两行执行的操作相同：

{{ npx_tabs ({
    package: "eslint",
    args: ["."]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: []
}) }}

**注意：**你也可以使用 [Yarn](https://yarnpkg.com/) 或 [pnpm](https://pnpm.io/) 等其他包管理器来运行 ESLint。使用 pnpm 时，请运行 `pnpm dlx eslint`；使用 Yarn 时，请运行 `yarn dlx eslint`。

<a id="pass-multiple-values-to-an-option"></a>

## 向选项传递多个值

接受多个值的选项可以通过重复指定选项或使用逗号分隔的列表来设置（[`--ignore-pattern`](#--ignore-pattern) 除外，它不支持后一种方式）。

接受多个值的选项示例：

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "describe", "--global", "it",  "tests/"]
}) }}

或者

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "describe,it", "tests/"]
}) }}

<a id="options"></a>

## 选项

运行 `npx eslint -h` 可以查看所有 CLI 选项。

```txt
eslint [options] file.js [file.js] [dir]

Basic configuration:
  --no-config-lookup               Disable look up for eslint.config.*
  -c, --config path::String        Use this configuration instead of eslint.config.* look up
  --inspect-config                 Open the config inspector with the current configuration
  --ext [String]                   Specify additional file extensions to lint
  --global [String]                Define global variables
  --parser String                  Specify the parser to be used
  --parser-options Object          Specify parser options

Specify Rules and Plugins:
  --plugin [String]                Specify plugins
  --rule Object                    Specify rules

Fix Problems:
  --fix                            Automatically fix problems
  --fix-dry-run                    Automatically fix problems without saving the changes to the file system
  --fix-type Array                 Specify the types of fixes to apply (directive, problem, suggestion, layout)

Ignore Files:
  --no-ignore                      Disable use of ignore files and patterns
  --ignore-pattern [String]        Patterns of files to ignore

Use stdin:
  --stdin                          Lint code provided on <STDIN> - default: false
  --stdin-filename String          Specify filename to process STDIN as

Handle Warnings:
  --quiet                          Report errors only - default: false
  --max-warnings Int               Number of warnings to trigger nonzero exit code - default: -1

Output:
  -o, --output-file path::String   Specify file to write report to
  -f, --format String              Use a specific output format - default: stylish
  --color, --no-color              Force enabling/disabling of color

Inline configuration comments:
  --no-inline-config               Prevent comments from changing config or rules
  --report-unused-disable-directives  Adds reported errors for unused eslint-disable and eslint-enable directives
  --report-unused-disable-directives-severity String  Chooses severity level for reporting unused eslint-disable and eslint-enable directives - either: off, warn, error, 0, 1, or 2
  --report-unused-inline-configs String  Adds reported errors for unused eslint inline config comments - either: off, warn, error, 0, 1, or 2

Caching:
  --cache                          Only check changed files - default: false
  --cache-file path::String        Path to the cache file. Deprecated: use --cache-location - default: .eslintcache
  --cache-location path::String    Path to the cache file or directory
  --cache-strategy String          Strategy to use for detecting changed files in the cache - either: metadata or content - default: metadata

Suppressing Violations:
  --suppress-all                   Suppress all violations - default: false
  --suppress-rule [String]         Suppress specific rules
  --suppressions-location path::String  Specify the location of the suppressions file
  --prune-suppressions             Prune unused suppressions - default: false
  --pass-on-unpruned-suppressions  Ignore unused suppressions - default: false

Miscellaneous:
  --init                           Run config initialization wizard - default: false
  --env-info                       Output execution environment information - default: false
  --no-error-on-unmatched-pattern  Prevent errors when pattern is unmatched
  --exit-on-fatal-error            Exit with exit code 2 in case of fatal error - default: false
  --no-warn-ignored                Suppress warnings when the file list includes ignored files
  --pass-on-no-patterns            Exit with exit code 0 in case no file patterns are passed
  --debug                          Output debugging information
  -h, --help                       Show help
  -v, --version                    Output the version number
  --print-config path::String      Print the configuration for the given file
  --stats                          Add statistics to the lint report - default: false
  --flag [String]                  Enable a feature flag
  --mcp                            Start the ESLint MCP server
  --concurrency Int|String         Number of linting threads, auto to choose automatically, off for no multithreading - default: off
```

<a id="basic-configuration"></a>

### 基本配置

#### `--no-config-lookup`

禁用从文件中读取配置。

- **参数类型**：无参数。

<a id="--no-config-lookup-example"></a>

##### `--no-config-lookup` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-config-lookup", "file.js"]
}) }}

#### `-c`, `--config`

此选项允许你为 ESLint 指定一个额外的配置文件（更多信息请参见[配置 ESLint](configure/)）。

- **参数类型**：字符串。文件路径。
- **多个参数**：否

<a id="-c---config-example"></a>

##### `-c`, `--config` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["-c", "~/my.eslint.config.js", "file.js"]
}) }}

此示例使用 `~/my.eslint.config.js` 中的配置，而不是搜索 `eslint.config.js` 文件。

#### `--inspect-config`

此选项会运行 `npx @eslint/config-inspector@latest`，以启动[配置检查器](https://github.com/eslint/config-inspector)。你可以使用配置检查器，更好地了解配置的作用以及它适用于哪些文件。使用此标志时，CLI 不会执行代码检查。

- **参数类型**：无参数。

<a id="--inspect-config-example"></a>

##### `--inspect-config` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--inspect-config"]
}) }}

#### `--ext`

此选项允许你指定要进行代码检查的其他文件扩展名。

- **参数类型**：字符串。文件扩展名。
- **多个参数**：是
- **默认值**：默认情况下，ESLint 会检查扩展名为 `.js`、`.mjs` 和 `.cjs` 的文件，以及[配置文件中指定](configure/configuration-files#specify-files-with-arbitrary-extensions)的其他扩展名。

此选项主要用于与 [`--no-config-lookup`](#--no-config-lookup) 选项搭配使用，因为在这种情况下，没有配置文件可用于指定其他扩展名。

<a id="--ext-example"></a>

##### `--ext` 示例

{{ npx_tabs ({
    package: "eslint",
    args: [".", "--ext", ".ts"],
    comment: "Include .ts files"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: [".", "--ext", ".ts", "--ext", ".tsx"],
    comment: "Include .ts and .tsx files"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: [".", "--ext", ".ts,.tsx"],
    comment: "Also include .ts and .tsx files"
}) }}

#### `--global`

此选项用于定义全局变量，以免它们被 [`no-undef`](../rules/no-undef) 规则标记为未定义。

- **参数类型**：字符串。全局变量的名称。指定的全局变量默认均视为只读；在变量名称后附加 `:true`，可让 `no-undef` 也允许写入该变量。
- **多个参数**：是

<a id="--global-example"></a>

##### `--global` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "require,exports:true", "file.js"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "require", "--global", "exports:true"]
}) }}

#### `--parser`

此选项允许你指定 ESLint 使用的解析器。

- **参数类型**：字符串。ESLint 使用的解析器。
- **多个参数**：否
- **默认值**：`espree`

<a id="--parser-example"></a>

##### `--parser` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--parser", "@typescript-eslint/parser", "file.ts"],
    comment: "Use TypeScript ESLint parser"
}) }}

#### `--parser-options`

此选项允许你指定 ESLint 使用的解析器选项。可用的解析器选项取决于所使用的解析器。

- **参数类型**：以冒号 (`:`) 分隔的键值对。
- **多个参数**：是

<a id="--parser-options-example"></a>

##### `--parser-options` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--parser-options", "ecmaVersion:6"],
    comment: "fails with a parsing error",
    previousCommands: ["echo \'3 ** 4\'"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--parser-options", "ecmaVersion:7"],
    comment: "succeeds, yay!",
    previousCommands: ["echo \'3 ** 4\'"]
}) }}

<a id="specify-rules-and-plugins"></a>

### 指定规则和插件

#### `--plugin`

此选项用于指定要加载的插件。

- **参数类型**：字符串。插件名称。插件名称中的 `eslint-plugin-` 前缀可以省略。
- **多个参数**：是

使用插件前，必须使用 npm 安装它。

<a id="--plugin-example"></a>

##### `--plugin` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--plugin", "jquery", "file.js"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--plugin", "eslint-plugin-mocha", "file.js"]
}) }}

#### `--rule`

此选项用于指定要使用的规则。

- **参数类型**：规则及其配置采用 [levn](https://github.com/gkz/levn#levn--) 格式指定。
- **多个参数**：是

这些规则会与配置文件中指定的任何规则合并。如果规则由插件定义，则必须在规则 ID 前加上插件名称和 `/`。

若要忽略配置文件中的规则，只运行命令行中指定的规则，请将 `--rule` 标志与 [`--no-config-lookup`](#--no-config-lookup) 标志搭配使用。

<a id="--rule-example"></a>

##### `--rule` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'quotes: [error, double]\'"],
    comment: "Apply single rule"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'guard-for-in: error\'", "--rule", "\'brace-style: [error, 1tbs]\'"],
    comment: "Apply multiple rules"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'jquery/dollar-sign: error\'"],
    comment: "Apply rule from jquery plugin"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'quotes: [error, double]\'", "--no-config-lookup"],
    comment: "Only apply rule from the command line"
}) }}

<a id="fix-problems"></a>

### 修复问题

#### `--fix`

此选项指示 ESLint 尽可能多地尝试[修复](core-concepts#rule-fixes)问题。修复会直接应用到文件中，输出中只会显示仍未修复的问题。

- **参数类型**：无参数。

并非所有问题都能通过此选项修复，而且在以下情况下此选项不起作用：

1. 将代码通过管道传给 ESLint 时，此选项会报错。
1. 对使用处理器的代码，此选项不起作用，除非处理器选择允许自动修复。

如果你想修复来自 `stdin` 的代码，或希望获取修复结果但不实际写入文件，请使用 [`--fix-dry-run`](#--fix-dry-run) 选项。

<a id="--fix-example"></a>

##### `--fix` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "file.js"]
}) }}

#### `--fix-dry-run`

此选项的效果与 `--fix` 相同，但不会将修复结果保存到文件系统。由于默认格式化程序不会输出修复后的代码，你需要使用其他格式化程序（例如 `--format json`）来获取修复结果。

- **参数类型**：无参数。

与 `--stdin` 标志搭配使用时，此选项可以修复来自 `stdin` 的代码。

此标志适用于需要从命令行自动修复文本、但不将其保存到文件系统的集成工具（例如编辑器插件）。

<a id="--fix-dry-run-example"></a>

##### `--fix-dry-run` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--fix-dry-run", "--format", "json"],
    previousCommands: ["getSomeText"]
}) }}

#### `--fix-type`

此选项允许你指定使用 `--fix` 或 `--fix-dry-run` 时要应用的修复类型。

- **参数类型**：字符串。以下修复类型之一：
    1. `problem` - 修复代码中的潜在错误
    1. `suggestion` - 应用可改进代码的修复
    1. `layout` - 应用不会改变程序结构（AST）的修复
    1. `directive` - 应用针对行内指令（如 `// eslint-disable`）的修复
- **多个参数**：是

如果你使用其他程序格式化代码，但仍希望 ESLint 应用其他类型的修复，此选项会很有用。

<a id="--fix-type-example"></a>

##### `--fix-type` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "--fix-type", "suggestion", "."]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "--fix-type", "suggestion", "--fix-type", "problem", "."]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "--fix-type", "suggestion,layout", "."]
}) }}

<a id="ignore-files"></a>

### 忽略文件

#### `--no-ignore`

禁用 [`--ignore-pattern`](#--ignore-pattern) 标志和配置中的 `ignores` 属性所指定的文件排除规则。

- **参数类型**：无参数。

<a id="--no-ignore-example"></a>

##### `--no-ignore` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-ignore", "file.js"]
}) }}

#### `--ignore-pattern`

此选项允许你指定要忽略的文件模式。

- **参数类型**：字符串。支持的语法与 [`ignores` 模式](configure/configuration-files#exclude-files-with-ignores)相同，采用 [minimatch](https://www.npmjs.com/package/minimatch) 语法。应将模式括起来，以免 shell 对 glob 模式进行解释。
- **多个参数**：是

<a id="--ignore-pattern-example"></a>

##### `--ignore-pattern` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--ignore-pattern", "\"/lib/\"", "--ignore-pattern", "\"/src/vendor/*\"", "."]
}) }}

<a id="use-stdin"></a>

### 使用 stdin

#### `--stdin`

此选项会指示 ESLint 从 STDIN 读取并检查源代码，而不是从文件读取。你可以用它将代码通过管道传给 ESLint。

- **参数类型**：无参数。

<a id="--stdin-example"></a>

##### `--stdin` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin"],
    previousCommands: ["cat myFile.js"]
}) }}

#### `--stdin-filename`

此选项允许你指定一个文件名，供 ESLint 处理 STDIN 内容时使用。

- **参数类型**：字符串。文件路径。
- **多个参数**：否

当你处理来自 STDIN 的文件，且使用了依赖文件名的规则时，此选项会很有用。

<a id="--stdin-filename-example"></a>

##### `--stdin-filename` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--stdin-filename", "myfile.js"],
    previousCommands: ["cat myFile.js"]
}) }}

<a id="handle-warnings"></a>

### 处理警告

#### `--quiet`

此选项允许你禁用警告报告，并停止运行设置为 warn 的规则。启用此选项后，ESLint 只会报告错误，并且只会运行设置为 error 的规则。

- **参数类型**：无参数。

<a id="--quiet-example"></a>

##### `--quiet` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--quiet", "file.js"]
}) }}

#### `--max-warnings`

此选项允许你指定警告阈值；如果项目中的警告级别规则违规数量过多，可以用它强制 ESLint 以错误状态退出。

- **参数类型**：整数。允许的最大警告数量。若要禁用此行为，请不要使用此选项，或将参数设为 `-1`。
- **多个参数**：否

通常，ESLint 运行后若未发现错误（只有警告），会以成功状态退出。但是，如果指定了 `--max-warnings` 且警告总数超过指定阈值，ESLint 就会以错误状态退出。

::: important
与 `--quiet` 一起使用时，标记为 warn 的规则仍会运行，但不会报告。
:::

<a id="--max-warnings-example"></a>

##### `--max-warnings` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--max-warnings", "10", "file.js"]
}) }}

<a id="output"></a>

### 输出

#### `-o`, `--output-file`

将代码检查结果输出到指定文件。

- **参数类型**：字符串。文件路径。
- **多个参数**：否

<a id="-o---output-file-example"></a>

##### `-o`, `--output-file` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["-o", "./test/test.html"]
}) }}

#### `-f`, `--format`

此选项用于指定控制台的输出格式。

- **参数类型**：字符串。[内置格式化程序](formatters/)之一，或自定义格式化程序。
- **多个参数**：否
- **默认值**：[`stylish`](formatters/#stylish)

如果你使用的是在本地文件中定义的自定义格式化程序，可以指定该文件的路径。

npm 安装的格式化程序可通过带有或不带有 `eslint-formatter-` 前缀的名称解析。

指定后，给定格式的输出会显示在控制台中。如果想将输出保存到文件，可以像这样在命令行中操作：

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "json", "file.js", ">", "results.json"],
    comment: "Saves the output into the `results.json` file."
}) }}

<a id="-f---format-example"></a>

##### `-f`, `--format` 示例

使用内置的 `json` 格式化程序：

{{ npx_tabs ({
    package: "eslint",
    args: ["--format", "json", "file.js"]
}) }}

使用本地自定义格式化程序：

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "./customformat.js", "file.js"]
}) }}

使用通过 npm 安装的格式化程序：

{{ npm_tabs({
    command: "install",
    packages: ["eslint-formatter-pretty"],
    args: []
}) }}

然后运行以下命令之一

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "pretty", "file.js"]
}) }}

或者

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "eslint-formatter-pretty", "file.js"]
}) }}

#### `--color` 和 `--no-color`

这些选项用于强制启用或禁用彩色输出。

- **参数类型**：无参数。

你可以使用这些选项覆盖默认行为。默认情况下，只要检测到 TTY，就会启用彩色输出；如果未检测到 TTY（例如将 `eslint` 的输出通过管道传给 `cat` 或 `less`），则不会启用。

::: warning

未指定 `--color` 或 `--no-color` 时，格式化程序可能会根据运行时环境决定是否使用彩色输出。例如，在 Node.js 下使用默认的 `stylish` 格式化程序时，[`FORCE_COLOR`](https://nodejs.org/api/cli.html#force_color1-2-3)、[`NO_COLOR`](https://nodejs.org/api/cli.html#no_colorany) 或 [`NODE_DISABLE_COLORS`](https://nodejs.org/api/cli.html#node_disable_colors1) 环境变量可能会影响是否使用颜色。

:::

<a id="--color-and---no-color-example"></a>

##### `--color` 和 `--no-color` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--color", "file.js", "|", "cat"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-color", "file.js"]
}) }}

<a id="inline-configuration-comments"></a>

### 行内配置注释

#### `--no-inline-config`

此选项会阻止 `/*eslint-disable*/` 或 `/*global foo*/` 之类的行内注释产生任何效果。

- **参数类型**：无参数。

这样就可以设置 ESLint 配置，而不让文件对其进行修改。所有行内配置注释都会被忽略，例如：

- `/*eslint-disable*/`
- `/*eslint-enable*/`
- `/*global*/`
- `/*eslint*/`
- `// eslint-disable-line`
- `// eslint-disable-next-line`

<a id="--no-inline-config-example"></a>

##### `--no-inline-config` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-inline-config", "file.js"]
}) }}

#### `--report-unused-disable-directives`

如果某行即使没有禁用指令也不会报告错误，此选项会让 ESLint 报告该行中的 `// eslint-disable-line` 等指令注释。

- **参数类型**：无参数。

清理不再适用的旧 `eslint-disable` 和 `eslint-enable` 注释，有助于避免它们在未来意外抑制错误。

::: warning
使用此选项时，升级 ESLint 或自定义规则后可能会开始报告新的错误。

例如，假设某条规则存在缺陷，会产生误报，于是添加了 `eslint-disable` 注释来抑制错误报告。如果该缺陷随后在 ESLint 的补丁版本中修复，ESLint 就不再产生误报，该 `eslint-disable` 注释也会变成未使用的指令。如果启用了 `--report-unused-disable-directives` 选项，这就会导致报告一条未使用指令的新错误。
:::

<a id="--report-unused-disable-directives-example"></a>

##### `--report-unused-disable-directives` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--report-unused-disable-directives", "file.js"]
}) }}

#### `--report-unused-disable-directives-severity`

此选项与 [`--report-unused-disable-directives`](#--report-unused-disable-directives) 相同，但允许你指定所报告错误的严重级别（`error`、`warn`、`off`）。这两个选项一次只能使用一个。

- **参数类型**：字符串。以下值之一：
    1. `off`（或 `0`）
    1. `warn`（或 `1`）
    1. `error`（或 `2`）
- **多个参数**：否
- **默认值**：默认使用 `linterOptions.reportUnusedDisableDirectives` 配置项（默认值为 `"warn"`）。

<a id="--report-unused-disable-directives-severity-example"></a>

##### `--report-unused-disable-directives-severity` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--report-unused-disable-directives-severity", "warn", "file.js"]
}) }}

#### `--report-unused-inline-configs`

此选项会让 ESLint 报告行内配置注释，例如 `/* eslint rule-name: "error" */`，前提是注释中的规则严重级别及任何选项与已配置的内容相同。

- **参数类型**：字符串。以下值之一：
    1. `off`（或 `0`）
    1. `warn`（或 `1`）
    1. `error`（或 `2`）
- **多个参数**：否
- **默认值**：默认使用 `linterOptions.reportUnusedInlineConfigs` 配置项（默认值为 `"off"`）。

此选项有助于保持文件整洁，避免出现误导性的冗余内容。行内配置注释旨在以某种方式改变 ESLint 的行为；如果它们没有任何作用，就没有必要保留。

<a id="--report-unused-inline-configs-example"></a>

##### `--report-unused-inline-configs` 示例

```shell
npx eslint --report-unused-inline-configs error file.js
```

<a id="caching"></a>

### 缓存

#### `--cache`

存储已处理文件的信息，以便只处理发生变化的文件。启用此选项可确保只检查发生变化的文件，从而显著提升 ESLint 的运行性能。
默认情况下，缓存会存储在 `.eslintcache` 中。

- **参数类型**：无参数。

如果先使用 `--cache` 运行 ESLint，之后又不带 `--cache` 运行 ESLint，`.eslintcache` 文件就会被删除。这是必要的，因为代码检查结果可能会发生变化，导致 `.eslintcache` 失效。如果想控制何时删除缓存文件，请使用 `--cache-location` 指定其他缓存文件位置。

自动修复过的文件不会放入缓存。后续运行代码检查时，如果没有触发自动修复，这些文件就会被放入缓存。

ESLint 根据文件本身（其内容或元数据，具体取决于 `--cache-strategy`）和配置判断缓存结果是否仍然有效。它不会跟踪文件之间的依赖关系，因此即使某个文件所依赖的其他文件已发生变化，该文件的缓存结果仍会被复用。因此，结果取决于其他文件的规则可能会报告过时的结果。这包括类型感知规则，例如 [`@typescript-eslint/eslint-plugin`](https://typescript-eslint.io/packages/eslint-plugin) 中的规则，以及跨模块解析导入的规则，例如 [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import) 和 [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) 中的规则。

例如，如果某个模块发生变化，导致导入该模块的未更改文件出现问题，那么在导入文件或配置发生变化之前，`--cache` 不会报告该问题。反过来也可能发生：其他文件中已经修复的问题仍会继续报告。需要从此类规则获取准确结果时，请在不使用 `--cache` 的情况下运行 ESLint。更多信息请参阅[我可以在 typescript-eslint 中使用 ESLint 的 `--cache` 吗？](https://typescript-eslint.io/troubleshooting/faqs/eslint/#can-i-use-eslints---cache-with-typescript-eslint)。

<a id="--cache-example"></a>

##### `--cache` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--cache", "file.js"]
}) }}

#### `--cache-file`

**已弃用**：请改用 `--cache-location`。

缓存文件的路径。如果未指定，则使用 `.eslintcache`。该文件会在执行 `eslint` 命令的目录中创建。

#### `--cache-location`

指定缓存位置的路径。可以是文件或目录。

- **参数类型**：字符串。文件或目录路径。如果指定目录，缓存文件会在该目录中创建。文件名根据当前工作目录的哈希值生成，例如：`.cache_hashOfCWD`。
- **多个参数**：否
- **默认值**：如果未指定位置，则使用 `.eslintcache`。该文件会在执行 `eslint` 命令的目录中创建。

如果缓存目录不存在，请确保在 *nix 系统上添加结尾的 `/`，或在 Windows 上添加结尾的 `\`。否则，该路径会被视为文件。

<a id="--cache-location-example"></a>

##### `--cache-location` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--cache", "--cache-location", "\"/Users/user/.eslintcache/\""]
}) }}

#### `--cache-strategy`

指定缓存用于检测文件变更的策略。

- **参数类型**：字符串。以下值之一：
    1. `metadata`
    1. `content`
- **多个参数**：否
- **默认值**：`metadata`

如果文件内容没有变化，但修改时间发生了变化，那么 `content` 策略会很有用。例如，执行 [`git clone`](https://git-scm.com/docs/git-clone) 等 git 操作时就可能出现这种情况，因为 git 不会跟踪文件的修改时间。

<a id="--cache-strategy-example"></a>

##### `--cache-strategy` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--cache", "--cache-strategy", "content"]
}) }}

<a id="suppress-violations"></a>

### 抑制违规

#### `--suppress-all`

抑制现有违规，使其在后续运行中不再报告。这样你就可以启用一条或多条代码检查规则，并且只在出现新的违规时收到通知。默认情况下，抑制项会存储在 `eslint-suppressions.json` 中，除非通过 `--suppressions-location` 另行指定。该文件会随新抑制项更新。

- **参数类型**：无参数。

<a id="--suppress-all-example"></a>

##### `--suppress-all` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--suppress-all"]
}) }}

#### `--suppress-rule`

抑制特定规则的违规，使其在后续运行中不再报告。与 `--suppress-all` 类似，默认情况下，抑制项会存储在 `eslint-suppressions.json` 中，除非通过 `--suppressions-location` 另行指定。该文件会随新抑制项更新。

- **参数类型**：字符串。规则 ID。
- **多个参数**：是

<a id="--suppress-rule-example"></a>

##### `--suppress-rule` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--suppress-rule", "no-console", "--suppress-rule", "indent"]
}) }}

#### `--suppressions-location`

指定抑制项位置的路径。可以是文件或目录。

- **参数类型**：字符串。文件或目录路径。如果指定目录，抑制文件会在该目录中创建。文件名根据当前工作目录的哈希值生成，例如：` suppressions_hashOfCWD`
- **多个参数**：否
- **默认值**：如果未指定位置，则使用 `eslint-suppressions.json`。该文件会在执行 `eslint` 命令的目录中创建。

<a id="--suppressions-location-example"></a>

##### `--suppressions-location` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--suppressions-location", "\".eslint-suppressions-example.json\""]
}) }}

#### `--prune-suppressions`

从抑制文件中清除未使用的抑制项。如果你已处理一条或多条被抑制的违规，此选项会很有用。

- **参数类型**：无参数。

<a id="--prune-suppressions-example"></a>

##### `--prune-suppressions` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--prune-suppressions"]
}) }}

#### `--pass-on-unpruned-suppressions`

忽略未使用的抑制项。默认情况下，如果抑制文件中有未使用的抑制项，ESLint 会以退出码 `2` 退出并显示错误信息。使用此标志后，未使用的抑制项不会影响退出码，ESLint 也不会输出相关错误。

- **参数类型**：无参数。

<a id="--pass-on-unpruned-suppressions-example"></a>

##### `--pass-on-unpruned-suppressions` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--pass-on-unpruned-suppressions"]
}) }}

<a id="miscellaneous"></a>

### 其他

#### `--init`

此选项会运行 `npm init @eslint/config`，以启动配置初始化向导。它旨在帮助新用户通过回答几个问题，快速创建 `eslint.config.js` 文件。使用此标志时，CLI 不会执行代码检查。

- **参数类型**：无参数。

生成的配置文件会在当前目录中创建。

<a id="--init-example"></a>

##### `--init` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--init"]
}) }}

#### `--env-info`

此选项会输出执行环境的信息，包括 Node.js 和 npm 的版本，以及本地和全局安装的 ESLint 信息。

- **参数类型**：无参数。

ESLint 团队可能会要求你提供这些信息，以帮助解决问题。使用此标志时，CLI 不会执行代码检查。

<a id="--env-info-example"></a>

##### `--env-info` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--env-info"]
}) }}

#### `--no-error-on-unmatched-pattern`

此选项可避免带引号的 glob 模式未匹配任何文件时发生错误。但如果 shell 无法匹配 glob，则仍会报错。

- **参数类型**：无参数。

<a id="--no-error-on-unmatched-pattern-example"></a>

##### `--no-error-on-unmatched-pattern` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-error-on-unmatched-pattern", "--ext", ".ts", "\"lib/*\""]
}) }}

#### `--exit-on-fatal-error`

如果发生一个或多个致命解析错误，此选项会使 ESLint 以退出码 2 退出。不使用此选项时，ESLint 会将致命解析错误报告为规则违规。

- **参数类型**：无参数。

<a id="--exit-on-fatal-error-example"></a>

##### `--exit-on-fatal-error` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--exit-on-fatal-error", "file.js"]
}) }}

#### `--no-warn-ignored`

显式传入被忽略的文件名时，此选项会抑制 `File ignored by default` 和 `File ignored because of a matching ignore pattern` 两种警告。与 `--max-warnings 0` 搭配使用时很有用，可避免因上述警告导致退出码为 1。

- **参数类型**：无参数。

<a id="--no-warn-ignored-example"></a>

##### `--no-warn-ignored` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-warn-ignored", "--max-warnings", "0", "ignored-file.js"]
}) }}

#### `--pass-on-no-patterns`

此选项允许 ESLint 在没有传入任何文件或目录模式时以代码 0 退出。不使用此选项时，ESLint 会假设你想使用 `.` 作为模式。

- **参数类型**：无参数。

<a id="--pass-on-no-patterns-example"></a>

##### `--pass-on-no-patterns` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--pass-on-no-patterns"]
}) }}

#### `--debug`

此选项会向控制台输出调试信息。运行 ESLint 命令时添加此标志，可在命令执行期间获取额外的调试信息。

- **参数类型**：无参数。

如果你遇到问题且难以确定原因，这些信息会很有用。ESLint 团队可能会要求你提供这些调试信息，以帮助解决问题。

<a id="--debug-example"></a>

##### `--debug` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--debug", "test.js"]
}) }}

#### `-h`, `--help`

此选项会输出帮助菜单，显示所有可用选项。如果指定此选项，其他所有选项都会被忽略。使用此标志时，CLI 不会执行代码检查。

- **参数类型**：无参数。

<a id="-h---help-example"></a>

##### `-h`, `--help` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--help"]
}) }}

#### `-v`, `--version`

此选项会在控制台输出当前 ESLint 版本。如果指定此选项，其他所有选项都会被忽略。使用此标志时，CLI 不会执行代码检查。

- **参数类型**：无参数。

<a id="-v---version-example"></a>

##### `-v`, `--version` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--version"]
}) }}

#### `--print-config`

此选项会输出传入文件将使用的配置。指定此选项时，不会执行代码检查，且只能使用与配置相关的选项。使用此标志时，CLI 不会执行代码检查。

- **参数类型**：字符串。文件路径。
- **多个参数**：否

<a id="--print-config-example"></a>

##### `--print-config` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--print-config", "file.js"]
}) }}

#### `--stats`

此选项会向传递给格式化程序的 [`result`](../integrate/nodejs-api#-lintresult-type) 对象添加一系列详细的性能统计信息（参见 [Stats 类型](../extend/stats#-stats-type)），例如 _parse_、_fix_ 和 _lint_ 耗时（每条规则的耗时）（参见 [Stats CLI 用法](../extend/stats#cli-usage)）。

- **参数类型**：无参数。

此选项适用于会显示统计信息的自定义格式化程序，也可与内置的 `json` 格式化程序搭配使用。

<a id="--stats-example"></a>

##### `--stats` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--stats", "--format", "json", "file.js"]
}) }}

#### `--flag`

此选项可为 ESLint 启用一个或多个功能标志。

- **参数类型**：字符串。功能标识符。
- **多个参数**：是

<a id="--flag-example"></a>

##### `--flag` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--flag", "x_feature", "file.js"]
}) }}

#### `--mcp`

此选项会启动供 AI 智能体使用的 ESLint MCP 服务器。

- **参数类型**：无参数。
- **多个参数**：否

<a id="--mcp-example"></a>

##### `--mcp` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--mcp"]
}) }}

#### `--concurrency`

此选项用于控制检查文件时使用的工作线程数。

- **参数类型**：Int|String。正整数、`auto` 或 `off`。
- **多个参数**：否
- **默认值**：`off`

值为 `off` 时，所有文件都会在主线程中进行代码检查。值为 `auto` 时，会尝试自动确定最佳设置。

<a id="--concurrency-example"></a>

##### `--concurrency` 示例

{{ npx_tabs ({
    package: "eslint",
    args: ["--concurrency", "auto"]
}) }}

<a id="exit-codes"></a>

## 退出码

检查文件时，ESLint 会以以下某个退出码退出：

- `0`：代码检查成功，且没有代码检查错误。如果 [`--max-warnings`](#--max-warnings) 标志设为 `n`，代码检查警告数量最多为 `n`。
- `1`：代码检查成功，但至少存在一个代码检查错误；或者代码检查警告数量超过 [`--max-warnings`](#--max-warnings) 选项允许的数量。
- `2`：由于配置问题或内部错误，代码检查未成功。
