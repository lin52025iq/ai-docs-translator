---
title: unicode-bom
rule_type: layout
---



Unicode 字节顺序标记（BOM）用于指定代码单元采用大端序还是小端序。也就是说，最高有效字节还是最低有效字节位于前面。UTF-8 不需要 BOM，因为字符只有一个字节时，字节顺序无关紧要。由于 UTF-8 是 Web 的主流编码，我们将 `"never"` 设为默认选项。

<a id="rule-details"></a>
## 规则详情

使用 `"always"` 选项时，此规则要求文件始终以 Unicode BOM 字符 U+FEFF 开头。使用 `"never"` 时，文件不得以 U+FEFF 开头。

<a id="options"></a>
## 选项

此规则有一个字符串选项：

* `"always"` 文件必须以 Unicode BOM 开头
* `"never"`（默认）文件不得以 Unicode BOM 开头

<a id="always"></a>
### 始终

使用 `"always"` 选项时，此规则的**正确**代码示例：

::: correct

```js
﻿// U+FEFF at the beginning

/*eslint unicode-bom: ["error", "always"]*/

let abc;
```

:::

使用 `"always"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint unicode-bom: ["error", "always"]*/

let abc;
```

:::

<a id="never"></a>
### 从不

使用默认的 `"never"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint unicode-bom: ["error", "never"]*/

let abc;
```

:::

使用 `"never"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
﻿// U+FEFF at the beginning

/*eslint unicode-bom: ["error", "never"]*/

let abc;
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你使用某些 UTF-16 或 UTF-32 文件，并且希望允许文件可选地以 Unicode BOM 开头，则应关闭此规则。
