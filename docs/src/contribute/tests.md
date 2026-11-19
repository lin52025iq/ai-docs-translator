---
title: 运行测试
eleventyNavigation:
    key: run tests
    parent: contribute to eslint
    title: 运行测试
    order: 8
---

ESLint 的大多数部分都有对应的单元测试。单元测试使用 [Mocha](https://mochajs.org/) 编写，是为 ESLint 做贡献时的必需内容。你可以在 `tests` 目录中找到所有单元测试。

首次获取源代码后，需要先运行一次 `npm install`，为 ESLint 设置开发环境。完成后，可以通过以下命令运行测试：

```shell
npm test
```

该命令会自动启动 Mocha，并运行 `tests` 目录中的所有测试。你只需添加自己的测试，运行测试时就会自动执行这些测试。

<a id="run-individual-tests"></a>

## 单独运行测试

如果想快速运行单个测试文件，可以直接运行 Mocha 并传入文件名。例如：

```shell
npm run test:cli tests/lib/rules/no-undef.js
```

如果只想运行一个或一部分 `RuleTester` 测试用例，可以在每个测试用例中添加 `only: true`，或者将测试用例包装在 `RuleTester.only(...)` 中，以自动添加该标记：

```js
ruleTester.run("my-rule", myRule, {
	valid: [
		RuleTester.only("const valid = 42;"),
		// Other valid cases
	],
	invalid: [
		{
			code: "const invalid = 42;",
			only: true,
		},
		// Other invalid cases
	],
});
```

在处理特定错误并反复尝试解决方案时，单独运行测试会很有用。提交拉取请求前，请务必运行 `npm test`。`npm test` 使用 Mocha 的 `--forbid-only` 选项，防止带有 `only` 标记的测试通过完整测试运行。

<a id="more-control-on-unit-testing"></a>

## 更灵活地控制单元测试

`npm run test:cli` 是 `./node_modules/.bin/mocha` 中 Mocha CLI 的别名。你可以使用[选项](https://mochajs.org/#command-line-usage)更好地控制要运行的测试。

`npm test` 中测试的默认超时时间为 10000ms。你可以通过设置 `ESLINT_MOCHA_TIMEOUT` 环境变量来更改超时时间，例如：

```shell
ESLINT_MOCHA_TIMEOUT=20000 npm test
```