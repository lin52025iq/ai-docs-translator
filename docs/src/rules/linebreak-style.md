---
title: linebreak-style
rule_type: layout
---
当许多人使用不同的编辑器、VCS 应用和操作系统进行开发时，可能会出现这些工具写入不同换行符的情况（尤其是同时使用 SourceTree 的 Windows 版和 Mac 版时）。

Windows 操作系统使用的换行符通常是_回车符_ (CR) 后跟_换行符_ (LF)，组成_回车换行符_ (CRLF)；而 Linux 和 Unix 使用简单的_换行符_ (LF)。对应的_控制序列_是 `"\n"`（表示 LF）和 `"\r\n"`（表示 CRLF）。

许多版本控制系统（如 git 和 subversion）可以自动确保使用正确的行尾。不过，为了应对各种情况，你可以启用此规则。

<a id="rule-details"></a>

## 规则详情

此规则强制代码库中的行尾保持一致，不受所用操作系统、VCS 或编辑器的影响。

<a id="options"></a>

### 选项

此规则接受一个字符串选项：

* `"unix"`（默认值）强制使用 Unix 行尾：LF 对应 `\n`。
* `"windows"` 强制使用 Windows 行尾：CRLF 对应 `\r\n`。

### unix

以下是使用默认 `"unix"` 选项时，此规则报告为**不正确**的代码示例：

::: incorrect

```js
/*eslint linebreak-style: ["error", "unix"]*/

var a = 'a'; // \r\n

```

:::

以下是使用默认 `"unix"` 选项时，此规则报告为**正确**的代码示例：

::: correct

```js
/*eslint linebreak-style: ["error", "unix"]*/

var a = 'a', // \n
    b = 'b'; // \n
// \n
function foo(params) { // \n
    // do stuff \n
}// \n

```

:::

### windows

以下是使用 `"windows"` 选项时，此规则报告为**不正确**的代码示例：

::: incorrect

```js
/*eslint linebreak-style: ["error", "windows"]*/

var a = 'a'; // \n

```

:::

以下是使用 `"windows"` 选项时，此规则报告为**正确**的代码示例：

::: correct

```js
/*eslint linebreak-style: ["error", "windows"]*/ // \r\n
// \r\n
var a = 'a', // \r\n
    b = 'b'; // \r\n
// \r\n
function foo(params) { // \r\n
    // do stuff \r\n
} // \r\n

```

:::

<a id="using-this-rule-with-version-control-systems"></a>

### 在版本控制系统中使用此规则

版本控制系统有时会对换行符进行特殊处理。为了方便使用不同平台的开发者为你的代码库做贡献，你可能需要将 VCS 配置为适当处理换行符。

例如，在 Windows 系统上，[git](https://git-scm.com/) 的默认行为是在检出文件时将 LF 换行符转换为 CRLF，但在提交更改时将换行符存储为 LF。如果将 `linebreak-style` 规则配置为 `"unix"`，就会导致该规则报告错误，因为 ESLint 读取到的文件使用的是 CRLF 换行符。如果你使用 git，可以考虑在 [`.gitattributes` 文件](https://git-scm.com/docs/gitattributes)中添加一行，以防止 git 转换 `.js` 文件中的换行符：

```txt
*.js text eol=lf
```

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不在意代码中使用不同的行尾，就可以安全地关闭此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[validateLineBreaks](https://jscs-dev.github.io/rule/validateLineBreaks)
