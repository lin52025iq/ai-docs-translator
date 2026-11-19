---
title: 迁移到 v2.0.0
---

ESLint v2.0.0 是第二个主版本。因此，ESLint 在 0.x 和 1.x 期间的运行方式与今后的运行方式之间存在一些重大变化。这些变化直接源自 ESLint 用户社区的反馈，并且在制定时充分考虑了升级路径。我们相信，这些变化会让 ESLint 变得更好。虽然升级需要做一些工作，但我们希望升级带来的麻烦足够小，让你能切实受益于升级。

**重要提示：**如果你要从 0.x 升级，请先参阅[迁移到 1.0.0](./migrating-to-1.0.0)，并以此作为起点。

<a id="rule-schema-changes"></a>

## 规则架构变更

由于规则架构的工作方式存在一个特殊情况，如果选项足够复杂，你可能需要在规则架构中处理规则严重性（0、1 或 2）。这样会得到如下架构：

```js
module.exports = {
	type: "array",
	items: [
		{
			enum: [0, 1, 2],
		},
		{
			enum: ["always", "never"],
		},
	],
	minItems: 1,
	maxItems: 2,
};
```

这让规则开发者感到困惑，因为规则似乎不应该负责验证自身的严重性。在 2.0.0 中，规则不再需要检查自身的严重性。

**解决方法：**如果你导出的规则架构会检查严重性，则需要进行以下几项修改：

1. 从架构中移除严重性
1. 将 `minItems` 从 1 调整为 0
1. 将 `maxItems` 减去 1

正确转换后，上面的架构如下：

```js
module.exports = {
	type: "array",
	items: [
		{
			enum: ["always", "never"],
		},
	],
	minItems: 0,
	maxItems: 1,
};
```

<a id="removed-rules"></a>

## 已移除的规则

以下规则已弃用，并创建了新规则来取代它们。以下是已移除规则及其替代规则的列表：

- [no-arrow-condition](../rules/no-arrow-condition) 由 [no-confusing-arrow](../rules/no-confusing-arrow) 和 [no-constant-condition](../rules/no-constant-condition) 组合取代。启用这两条规则即可获得与 `no-arrow-condition` 相同的功能。
- [no-empty-label](../rules/no-empty-label) 由 [no-labels](../rules/no-labels) 取代，并使用 `{"allowLoop": true, "allowSwitch": true}` 选项。
- [space-after-keywords](../rules/space-after-keywords) 由 [keyword-spacing](../rules/keyword-spacing) 取代。
- [space-before-keywords](../rules/space-before-keywords) 由 [keyword-spacing](../rules/keyword-spacing) 取代。
- [space-return-throw-case](../rules/space-return-throw-case) 由 [keyword-spacing](../rules/keyword-spacing) 取代。

**解决方法：**你需要更新规则配置，改用新规则。使用已移除规则时，ESLint v2.0.0 也会发出警告，并建议使用替代规则。希望这样能让升级过程少一些意外。

<a id="configuration-cascading-changes"></a>

## 配置级联变更

在 2.0.0 之前，如果某个目录同时包含 `.eslintrc` 文件和含有 ESLint 配置信息的 `package.json` 文件，这两个文件中的设置会合并。在 2.0.0 中，如果这两者同时存在，则只使用 `.eslintrc.*` 文件中的设置，并忽略 `package.json` 中的设置。除此之外，只要不存在其他 `.eslintrc.*` 文件，仍然可以在 `package.json` 中配置 ESLint。

**解决方法：**如果同一目录中同时有 `.eslintrc.*` 和包含 ESLint 配置信息的 `package.json`，请将配置合并到其中一个文件中。

<a id="built-in-global-variables"></a>

## 内置全局变量

在 2.0.0 之前，作为 ES6 标准一部分的新全局变量（例如 `Promise`、`Map`、`Set` 和 `Symbol`）包含在内置全局环境中。这可能会导致问题，例如，`no-undef` 允许在 ES5 代码中使用 `Promise` 构造函数，而 ES5 中并没有 Promise。在 2.0.0 中，内置环境仅包含标准 ES5 全局变量，新的 ES6 全局变量则移到了 `es6` 环境中。

**解决方法：**如果你编写的是 ES6 代码，并且尚未启用 `es6` 环境，请启用它：

```js
// In your .eslintrc
{
	env: {
		es6: true;
	}
}

// Or in a configuration comment
/*eslint-env es6*/
```

<a id="language-options"></a>

## 语言选项

在 2.0.0 之前，要启用语言选项，需要在配置中使用 `ecmaFeatures`。在 2.0.0 中：

- `ecmaFeatures` 属性现在位于顶层的 `parserOptions` 属性下。
- 所有 ECMAScript 6 `ecmaFeatures` 标志都已移除，改为在 `parserOptions` 下使用 `ecmaVersion` 属性，该属性可设置为 3、5（默认值）或 6。
- `ecmaFeatures.modules` 标志已由 `parserOptions` 下的 `sourceType` 属性取代；该属性可设置为默认值 `"script"`，或为 ES6 模块设置为 `"module"`。

**解决方法：**如果你在 `ecmaFeatures` 中使用了任何 ECMAScript 6 功能标志，则需要改用 `ecmaVersion: 6`。ECMAScript 6 功能标志包括：

- `arrowFunctions` - 启用[箭头函数](https://leanpub.com/understandinges6/read#leanpub-auto-arrow-functions)
- `binaryLiterals` - 启用[二进制字面量](https://leanpub.com/understandinges6/read#leanpub-auto-octal-and-binary-literals)
- `blockBindings` - 启用 `let` 和 `const`（即[块级绑定](https://leanpub.com/understandinges6/read#leanpub-auto-block-bindings)）
- `classes` - 启用类
- `defaultParams` - 启用[默认函数参数](https://leanpub.com/understandinges6/read/#leanpub-auto-default-parameters)
- `destructuring` - 启用[解构](https://leanpub.com/understandinges6/read#leanpub-auto-destructuring-assignment)
- `forOf` - 启用 [`for-of` 循环](https://leanpub.com/understandinges6/read#leanpub-auto-iterables-and-for-of)
- `generators` - 启用[生成器](https://leanpub.com/understandinges6/read#leanpub-auto-generators)
- `modules` - 启用模块和全局严格模式
- `objectLiteralComputedProperties` - 启用[对象字面量的计算属性名](https://leanpub.com/understandinges6/read#leanpub-auto-computed-property-names)
- `objectLiteralDuplicateProperties` - 在严格模式下启用[对象字面量中的重复属性](https://leanpub.com/understandinges6/read#leanpub-auto-duplicate-object-literal-properties)
- `objectLiteralShorthandMethods` - 启用[对象字面量的简写方法](https://leanpub.com/understandinges6/read#leanpub-auto-method-initializer-shorthand)
- `objectLiteralShorthandProperties` - 启用[对象字面量的简写属性](https://leanpub.com/understandinges6/read#leanpub-auto-property-initializer-shorthand)
- `octalLiterals` - 启用[八进制字面量](https://leanpub.com/understandinges6/read#leanpub-auto-octal-and-binary-literals)
- `regexUFlag` - 启用[正则表达式 `u` 标志](https://leanpub.com/understandinges6/read#leanpub-auto-the-regular-expression-u-flag)
- `regexYFlag` - 启用[正则表达式 `y` 标志](https://leanpub.com/understandinges6/read#leanpub-auto-the-regular-expression-y-flag)
- `restParams` - 启用[剩余参数](https://leanpub.com/understandinges6/read#leanpub-auto-rest-parameters)
- `spread` - 为数组启用[展开运算符](https://leanpub.com/understandinges6/read#leanpub-auto-the-spread-operator)
- `superInFunctions` - 启用函数内部的 `super` 引用
- `templateStrings` - 启用[模板字符串](https://leanpub.com/understandinges6/read/#leanpub-auto-template-strings)
- `unicodeCodePointEscapes` - 启用[码点转义](https://leanpub.com/understandinges6/read/#leanpub-auto-escaping-non-bmp-characters)

如果你使用了其中任何标志，例如：

```js
{
	ecmaFeatures: {
		arrowFunctions: true;
	}
}
```

那么你应该使用 `ecmaVersion` 启用 ES6：

```js
{
	parserOptions: {
		ecmaVersion: 6;
	}
}
```

如果你在 `ecmaFeatures` 中使用了任何非 ES6 标志，则需要将它们移到 `parserOptions` 中。例如：

```js
{
	ecmaFeatures: {
		jsx: true;
	}
}
```

然后应将 `ecmaFeatures` 移到 `parserOptions` 下：

```js
{
	parserOptions: {
		ecmaFeatures: {
			jsx: true;
		}
	}
}
```

如果你曾使用 `ecmaFeatures.modules` 来启用 ES6 模块支持，例如：

```js
{
	ecmaFeatures: {
		modules: true;
	}
}
```

```js
{
	parserOptions: {
		sourceType: "module";
	}
}
```

此外，如果你在规则中使用 `context.ecmaFeatures`，则需要按以下方式更新代码：

1. 如果你使用了 ES6 功能标志，例如 `context.ecmaFeatures.blockBindings`，请改为检查 `context.parserOptions.ecmaVersion > 5`。
1. 如果你使用了 `context.ecmaFeatures.modules`，请改为检查 Program 节点的 `sourceType` 属性是否为 `"module"`。
1. 如果你使用了非 ES6 功能标志，例如 `context.ecmaFeatures.jsx`，请改为检查 `context.parserOptions.ecmaFeatures.jsx`。

如果你的插件包含规则并且使用了 RuleTester，那么还需要更新传给使用 `ecmaFeatures` 的规则的选项。例如：

```js
var ruleTester = new RuleTester();
ruleTester.run("no-var", rule, {
	valid: [
		{
			code: "let x;",
			parserOptions: { ecmaVersion: 6 },
		},
	],
});
```

如果你没有在配置、自定义规则或插件规则及其测试中使用 `ecmaFeatures`，则无需更改。

<a id="new-rules-in-eslintrecommended"></a>

## 新增到 `"eslint:recommended"` 的规则

```json
{
	"extends": "eslint:recommended"
}
```

在 2.0.0 中，以下 11 条规则被加入 `"eslint:recommended"`。

- [constructor-super](../rules/constructor-super)
- [no-case-declarations](../rules/no-case-declarations)
- [no-class-assign](../rules/no-class-assign)
- [no-const-assign](../rules/no-const-assign)
- [no-dupe-class-members](../rules/no-dupe-class-members)
- [no-empty-pattern](../rules/no-empty-pattern)
- [no-new-symbol](../rules/no-new-symbol)
- [no-self-assign](../rules/no-self-assign)
- [no-this-before-super](../rules/no-this-before-super)
- [no-unexpected-multiline](../rules/no-unexpected-multiline)
- [no-unused-labels](../rules/no-unused-labels)

**解决方法：**如果你不想收到这些规则的提示，只需禁用它们即可。

```json
{
	"extends": "eslint:recommended",
	"rules": {
		"no-case-declarations": 0,
		"no-class-assign": 0,
		"no-const-assign": 0,
		"no-dupe-class-members": 0,
		"no-empty-pattern": 0,
		"no-new-symbol": 0,
		"no-self-assign": 0,
		"no-this-before-super": 0,
		"no-unexpected-multiline": 0,
		"no-unused-labels": 0,
		"constructor-super": 0
	}
}
```

<a id="scope-analysis-changes"></a>

## 作用域分析变更

我们发现作用域分析中存在一些需要修复的问题。具体来说，我们没有正确地处理所有定义方式下的全局变量。

最初，`Variable` 对象和 `Reference` 对象会相互引用：

- `Variable#references` 属性是一个 `Reference` 对象数组，这些对象引用了该变量。
- `Reference#resolved` 属性是一个 `Variable` 对象，表示该引用所指向的变量。

但是在 1.x 中，以下变量和引用在这些属性中的值是错误的（为空）：

- 全局作用域中的 `var` 声明。
- 全局作用域中的 `function` 声明。
- 在配置文件中定义的变量。
- 在 `/* global */` 注释中定义的变量。

现在，这些变量和引用在上述属性中都有了正确的值。

`Scope#through` 属性包含 `Reference#resolved` 为 `null` 的引用。因此，这项变更也改变了 `Scope#through` 属性的值。

**解决方法：**如果你使用 `Scope#through` 查找内置全局变量的引用，则需要进行几项修改。

例如，在 1.x 中，你可能会这样查找 `window` 全局变量：

```js
var globalScope = context.getScope();
globalScope.through.forEach(function (reference) {
	if (reference.identifier.name === "window") {
		checkForWindow(reference);
	}
});
```

这是一种迂回的变量查找方式，因为 ESLint 是在事后添加了该变量。由于无法找到 `window` 的定义，它才会出现在 `Scope#through` 中。

在 2.0.0 中，`window` 不再位于 `Scope#through` 中，因为我们已经补回了正确的声明。这意味着你可以直接引用 `window` 对象（或任何其他全局对象）。因此，上面的示例应改为：

```js
var globalScope = context.getScope();
var variable = globalScope.set.get("window");
if (variable) {
	variable.references.forEach(checkForWindow);
}
```

更多阅读：<https://estools.github.io/escope/>

<a id="default-changes-when-using-eslintrecommended"></a>

## 使用 `eslint:recommended` 时的默认值变更

如果你扩展了 `eslint:recommended`，并且只为 [`no-multiple-empty-lines`] 或 [`func-style`] 指定严重性，例如：

```json
{
	"extends": "eslint:recommended",
	"rules": {
		"no-multiple-empty-lines": 2,
		"func-style": 2
	}
}
```

规则 `no-multiple-empty-lines` 没有默认例外，但在 ESLint `1.x` 中，`eslint:recommended` 会应用一个默认值，允许最多出现两行空行。

规则 `func-style` 的默认配置是 `"expression"`，但在 ESLint `1.x` 中，`eslint:recommended` 会将其默认值设为 `"declaration"`。

ESLint 2.0.0 移除了这些相互冲突的默认值，因此你可能会开始看到与这些规则相关的代码检查错误。

**解决方法：**如果你想保留以前的行为，请为 `no-multiple-empty-lines` 添加 `{"max": 2}`，并将 `func-style` 改为 `"declaration"`。例如：

```json
{
	"extends": "eslint:recommended",
	"rules": {
		"no-multiple-empty-lines": [2, { "max": 2 }],
		"func-style": [2, "declaration"]
	}
}
```

[`no-multiple-empty-lines`]: ../rules/no-multiple-empty-lines
[`func-style`]: ../rules/func-style

<a id="sourcecode-constructor-node-api-changes"></a>

## SourceCode 构造函数（Node API）变更

`SourceCode` 构造函数现在可以处理 Unicode BOM。
如果第一个参数 `text` 带有 BOM，`SourceCode` 构造函数会将 `this.hasBOM` 设为 `true`，并从文本中移除 BOM。

```js
var SourceCode = require("eslint").SourceCode;

var code = new SourceCode("\uFEFFvar foo = bar;", ast);

assert(code.hasBOM === true);
assert(code.text === "var foo = bar;");
```

因此，第二个参数 `ast` 也应该由移除了 BOM 的文本解析得到。

**解决方法：**如果你在代码中使用 `SourceCode` 构造函数，请在移除 BOM 后解析源代码：

```js
var ast = yourParser.parse(text.replace(/^\uFEFF/, ""), options);
var sourceCode = new SourceCode(text, ast);
```

<a id="rule-changes"></a>

## 规则变更

- [`strict`](../rules/strict) - 默认值变为 `"safe"`（之前的默认值是 `"function"`）

<a id="plugins-no-longer-have-default-configurations"></a>

## 插件不再具有默认配置

在 v2.0.0 之前，插件可以为自身指定 `rulesConfig`。每当有人使用该插件时，`rulesConfig` 都会自动应用；这与 ESLint 在其他所有情况下的做法相反（默认情况下不启用任何规则）。为了让插件的行为保持一致，我们移除了对插件中 `rulesConfig` 的支持。

**解决方法：**如果你在配置文件中使用插件，就需要在配置文件中手动启用插件规则。
