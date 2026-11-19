---
title: 正确和错误的代码用法
---

为了标示代码用法正确或错误，可以分别为某些代码块添加正确和错误图标。

<a id="usage"></a>

## 用法

要标示代码块正确或错误，请将代码块放在标记为 `correct` 或 `incorrect` 的容器中。

请确保 Markdown 代码块的上方和下方留有空白，以保证其正确渲染。

```text
::: correct

`` `js
function() {
    const another = [];
}
`` `

:::

::: incorrect

`` `js
function() {
    const another = [];
}
`` `

:::
```

<a id="examples"></a>

## 示例

正确用法：

::: correct

```js
const { ESLint } = require("eslint");

(async function main() {
	// 1. Create an instance with the `fix` option.
	const eslint = new ESLint({ fix: true });

	// 2. Lint files. This doesn't modify target files.
	const results = await eslint.lintFiles(["lib/**/*.js"]);

	// 3. Modify the files with the fixed code.
	await ESLint.outputFixes(results);

	// 4. Format the results.
	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	// 5. Output it.
	console.log(resultText);
})().catch(error => {
	process.exitCode = 1;
	console.error(error);
});
```

:::

错误用法：

::: incorrect

```js
const { ESLint } = require("eslint");

(async function main() {
	// 1. Create an instance with the `fix` option.
	const eslint = new ESLint({ fix: true });

	// 2. Lint files. This doesn't modify target files.
	const results = await eslint.lintFiles(["lib/**/*.js"]);

	// 3. Modify the files with the fixed code.
	await ESLint.outputFixes(results);

	// 4. Format the results.
	const formatter = await eslint.loadFormatter("stylish");
	const resultText = formatter.format(results);

	// 5. Output it.
	console.log(resultText);
})().catch(error => {
	process.exitCode = 1;
	console.error(error);
});
```

:::