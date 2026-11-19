---
title: 自定义规则
eleventyNavigation:
    key: custom rules
    parent: create plugins
    title: 自定义规则
    order: 2
---

你可以创建自定义规则供 ESLint 使用。如果[核心规则](../rules/)无法满足你的使用场景，可以考虑创建自定义规则。

自定义规则的基本格式如下：

```js
// customRule.js

module.exports = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Description of the rule",
		},
		fixable: "code",
		schema: [], // no options
	},
	create: function (context) {
		return {
			// callback functions
		};
	},
};
```

::: warning
`eslint` 包中附带的核心规则不属于公共 API，也不是为了供其他规则扩展而设计的。基于这些规则构建功能并不稳妥，而且很可能会导致你的规则在未来某个时候完全失效。如果你想创建与某条核心规则类似的规则，应先将该规则文件复制到自己的项目中，再以此为基础进行开发。
:::

<a id="rule-structure"></a>

## 规则结构

规则的源文件会导出一个包含以下属性的对象。自定义规则和核心规则都遵循这种格式。

`meta`：（`object`）包含规则的元数据：

- `type`：（`string`）表示规则类型，可以是 `"problem"`、`"suggestion"` 或 `"layout"`：
    - `"problem"`：该规则会识别可能导致错误或产生令人困惑行为的代码。开发者应将解决此类问题视为高优先级事项。
    - `"suggestion"`：该规则会识别可以改进的地方，但即使不修改代码，也不会导致错误。
    - `"layout"`：该规则主要关注空格、分号、逗号和括号等内容，也就是决定代码外观而非执行方式的部分。这些规则针对 AST 中没有指定的代码部分进行检查。

    可以将规则类型与 CLI 选项 [`--fix-type`](../use/command-line-interface#--fix-type) 配合使用，以指定要应用的修复类型。

- `docs`：（`object`）常用于生成文档和工具的属性。核心规则必须提供，自定义规则可选。自定义规则可根据需要在此处添加其他属性。
    - `description`：（`string`）提供规则的简短描述。对于核心规则，该描述会显示在[规则索引](../rules/)中。
    - `dialects`：（`string[]`）该规则适用的语言方言。例如，`["JavaScript", "TypeScript"]`。
    - `frozen`：（`boolean`）对于核心规则，表示该规则是否已[冻结](../contribute/core-rules#frozen-rules)，不再接受功能请求。
    - `recommended`：（`unknown`）对于核心规则，这是一个布尔值，表示 `@eslint/js` 的 `recommended` 配置是否启用了该规则。
    - `url`：（`string`）指定完整文档的访问地址。代码编辑器通常会使用此属性，为高亮显示的规则违规提供有用的链接。

- `messages`：（`object`）包含规则违规消息和建议消息的对象。核心规则必须提供，自定义规则可选。可以在 `context.report()` 调用中通过键（`messageId`s）引用消息。更多信息请参阅 [`messageId`s](#messageids)。
- `fixable`：（`string`）如果命令行中的 `--fix` 选项会自动修复该规则报告的问题，则此属性的值为 `"code"` 或 `"whitespace"`。

    **重要提示：** 可修复规则必须设置 `fixable` 属性。如果未指定该属性，每当规则尝试生成修复时，ESLint 都会抛出错误。如果规则不可修复，则不要设置 `fixable` 属性。

- `hasSuggestions`：（`boolean`）指定规则是否可以返回建议（省略时默认为 `false`）。

    **重要提示：** 提供建议的规则必须设置 `hasSuggestions` 属性。如果没有将该属性设为 `true`，每当规则尝试生成建议时，ESLint 都会抛出错误。如果规则不提供建议，则不要设置 `hasSuggestions` 属性。

- `schema`：（`object | array | false`）指定[选项](#options-schemas)，使 ESLint 能够阻止无效的[规则配置](../use/configure/rules)。规则有选项时必须设置此属性。

- `defaultOptions`：（`array`）指定规则的[默认选项](#option-defaults)。如果存在此属性，用户在配置中提供的选项将与其递归合并。

- `languages`：（`array`）指定规则适用的语言。每个条目都是格式为 `"pluginName/languageName"` 的字符串（例如，`"js/js"`、`"markdown/gfm"`）。特殊值如下：
    - `"*"` — 规则适用于任何语言。
    - `"pluginName/*"` — 规则适用于指定插件提供的任何语言。

    如果未指定 `languages`，则假定规则适用于所有语言。如果指定了 `languages`，但没有任何条目与当前语言匹配，ESLint 就会抛出错误。

    ```js
    // Rule only runs when the active language is the built-in JavaScript language
    meta: {
        languages: ["js/js"],
    }

    // Rule runs with any language from the "markdown" plugin
    meta: {
        languages: ["markdown/*"],
    }

    // Rule runs with any language
    meta: {
        languages: ["*"],
    }
    ```

    语言标识符按以下顺序匹配：
    1. **通配符 `"*"`** — 匹配任何语言。
    2. **直接字符串匹配** — 条目与当前语言字符串完全相同（例如，`"test/lang"`）。
    3. **`"plugin/*"` 通配符** — 匹配插件名称（或 `meta.namespace`）与条目中插件部分相同的任何语言。
    4. **命名空间匹配** — 当插件的 `meta.namespace` 与条目中的插件部分相同时，即使插件以其他名称注册，也可以匹配。

    ```js
    // Rule runs with a specific language from a plugin whose meta.namespace is "markdown"
    // (e.g., the plugin is registered as "md" but declares meta.namespace = "markdown")
    meta: {
        languages: ["markdown/gfm"],
    }
    ```

- `deprecated`：（`boolean | DeprecatedInfo`）表示该规则是否已弃用。如果规则未弃用，可以省略 `deprecated` 属性。
  关于 [DeprecatedInfo](./rule-deprecation) 有专门的页面。

- `replacedBy`：（`array`，**已弃用**，请改用 `meta.deprecated.replacedBy`。）如果规则已弃用，可指定替代规则。

`create()`：返回一个对象，其中的方法供 ESLint 在遍历 JavaScript 代码的抽象语法树（AST，定义见 [ESTree](https://github.com/estree/estree)）时调用，以“访问”节点：

- 如果键是节点类型或[选择器](./selectors)，ESLint 会在向下遍历树时调用相应的**访问器**函数。
- 如果键是节点类型或[选择器](./selectors)加上 `:exit`，ESLint 会在向上遍历树时调用相应的**访问器**函数。
- 如果键是事件名称，ESLint 会为[代码路径分析](code-path-analysis)调用相应的**处理器**函数。

规则可以利用当前节点及其周围的树结构来报告或修复问题。

以下是 [array-callback-return](../rules/array-callback-return) 规则中的方法：

```js
function checkLastSegment (node) {
    // report problem for function if last code path segment is reachable
}

module.exports = {
    meta: { ... },
    create: function(context) {
        // declare the state of the rule
        return {
            ReturnStatement: function(node) {
                // at a ReturnStatement node while going down
            },
            // at a function expression node while going up:
            "FunctionExpression:exit": checkLastSegment,
            "ArrowFunctionExpression:exit": checkLastSegment,
            onCodePathStart: function (codePath, node) {
                // at the start of analyzing a code path
            },
            onCodePathEnd: function(codePath, node) {
                // at the end of analyzing a code path
            }
        };
    }
};
```

::: tip
你可以使用 [Code Explorer](https://explorer.eslint.org) 查看任意 JavaScript 代码的完整 AST。
:::

<a id="the-context-object"></a>

## Context 对象

`context` 对象是规则中 `create` 方法唯一的参数。例如：

```js
// customRule.js

module.exports = {
    meta: { ... },
    // `context` object is the argument
    create(context) {
       // ...
    }
};
```

顾名思义，`context` 对象包含与规则上下文相关的信息。

`context` 对象具有以下属性：

- `id`：（`string`）规则 ID。
- `filename`：（`string`）与源代码关联的文件名。
- `physicalFilename`：（`string`）对文件进行代码检查时，此属性提供磁盘上文件的完整路径，不包含任何代码块信息。对文本进行代码检查时，如果未指定 `--stdin-filename`，则提供传入 `--stdin-filename` 的值或 `<text>`。
- `cwd`：（`string`）传递给 [Linter](../integrate/nodejs-api#linter) 的 `cwd` 选项。它是一个路径，表示应视为当前工作目录的目录。
- `options`：（`array`）此规则的[已配置选项](../use/configure/rules)数组。此数组不包含规则严重级别（参见[专门章节](#accessing-options-passed-to-a-rule)）。
- `sourceCode`：（`object`）一个 `SourceCode` 对象，可用于处理传递给 ESLint 的源代码（参见[访问源代码](#accessing-the-source-code)）。
- `settings`：（`object`）配置中的[共享设置](../use/configure/configuration-files#configure-shared-settings)。
- `languageOptions`：（`object`）[各属性的更多说明](../use/configure/language-options)
    - `sourceType`：（`'script' | 'module' | 'commonjs'`）当前文件的模式。
    - `ecmaVersion`：（`number`）用于解析当前文件的 ECMA 版本。
    - `parser`：（`object`）：用于解析当前文件的解析器。
    - `parserOptions`：（`object`）为此文件配置的解析器选项。
    - `globals`：（`object`）指定的全局变量。

此外，`context` 对象还具有以下方法：

- `report(descriptor)`。报告代码中的问题（参见[专门章节](#report-problems)）。

**注意：**早期版本的 ESLint 在 `context` 对象上支持其他方法。这些方法已在新格式中移除，不应再依赖它们。

<a id="report-problems"></a>

### 报告问题

编写自定义规则时最常用的方法是 `context.report()`，它会根据所用配置发布警告或错误。此方法接受一个参数，即包含以下属性的对象：

- `messageId`：（`string`）消息的 ID（参见 [messageIds](#messageids)）；建议优先使用此属性，而非 `message`。
- `message`：（`string`）问题消息（`messageId` 的替代方式）。
- `node`：（可选的 `object`）与问题相关的 AST 节点、令牌或注释。如果存在此属性且未指定 `loc`，则使用节点的起始位置作为问题的位置。
- `loc`：（可选的 `object`）指定问题的位置。如果同时指定 `loc` 和 `node`，则使用 `loc` 中的位置，而非 `node` 中的位置。
    - `start`：表示起始位置的对象。
        - `line`：（`number`）问题所在的行号，从 1 开始计数。
        - `column`：（`number`）问题所在的列号，从 0 开始计数。
    - `end`：表示结束位置的对象。
        - `line`：（`number`）问题所在的行号，从 1 开始计数。
        - `column`：（`number`）问题所在的列号，从 0 开始计数。
- `data`：（可选的 `object`）`message` 的[占位符](#use-message-placeholders)数据。
- `fix(fixer)`：（可选的 `function`）应用[修复](#applying-fixes)以解决问题。

请注意，`node` 和 `loc` 至少需要指定其中一个。

最简单的示例只使用 `node` 和 `message`：

```js
context.report({
	node: node,
	message: "Unexpected identifier",
});
```

节点包含确定问题文本的行号和列号以及表示该节点的源代码文本所需的全部信息。

<a id="use-message-placeholders"></a>

#### 使用消息占位符

你也可以在消息中使用占位符并提供 `data`：

```js
{% raw %}
context.report({
    node: node,
    message: "Unexpected identifier: {{ identifier }}",
    data: {
        identifier: node.name
    }
});
{% endraw %}
```

请注意，消息参数中的前导和尾随空格是可选的。

节点包含确定问题文本的行号和列号以及表示该节点的源代码文本所需的全部信息。

<a id="messageids"></a>

#### `messageId`s

建议在 `context.report()` 调用中使用 `messageId`s 报告消息，原因如下：

- 规则违规消息可以存储在统一的 `meta.messages` 对象中，便于管理。
- 无需在规则文件和规则测试文件中重复编写规则违规消息。
- 因此，修改规则违规消息的门槛更低，有助于鼓励更多人参与贡献，以提高清晰度和实用性。

规则文件：

```js
{% raw %}
// avoid-name.js

module.exports = {
    meta: {
        messages: {
            avoidName: "Avoid using variables named '{{ name }}'"
        }
    },
    create(context) {
        return {
            Identifier(node) {
                if (node.name === "foo") {
                    context.report({
                        node,
                        messageId: "avoidName",
                        data: {
                            name: "foo",
                        }
                    });
                }
            }
        };
    }
};
{% endraw %}
```

要进行代码检查的文件：

```javascript
// someFile.js

var foo = 2;
//  ^ error: Avoid using variables named 'foo'
```

测试代码：

```javascript
// avoid-name.test.js

var rule = require("../../../lib/rules/avoid-name");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("avoid-name", rule, {
	valid: ["bar", "baz"],
	invalid: [
		{
			code: "foo",
			errors: [
				{
					messageId: "avoidName",
				},
			],
		},
	],
});
```

<a id="applying-fixes"></a>

#### 应用修复

如果你希望 ESLint 尝试修复所报告的问题，可以在调用 `context.report()` 时指定 `fix` 函数。`fix` 函数接收一个参数，即 `fixer` 对象，你可以使用它来应用修复。例如：

```js
context.report({
	node: node,
	message: "Missing semicolon",
	fix(fixer) {
		return fixer.insertTextAfter(node, ";");
	},
});
```

这里的 `fix()` 函数用于在节点后插入分号。请注意，修复不会立即应用；如果与其他修复冲突，也可能完全不会应用。应用修复后，ESLint 会再次对修复后的代码运行所有已启用的规则，并可能继续应用更多修复。此过程最多重复 10 次，或者直到找不到更多可修复的问题为止。之后，剩余的问题会照常报告。

**重要提示：** 可修复规则必须设置 `meta.fixable` 属性。如果实现了 `fix` 函数的规则没有[导出](#rule-structure) `meta.fixable` 属性，ESLint 就会抛出错误。

`fixer` 对象具有以下方法：

- `insertTextAfter(nodeOrToken, text)`：在给定节点或令牌之后插入文本。
- `insertTextAfterRange(range, text)`：在给定范围之后插入文本。
- `insertTextBefore(nodeOrToken, text)`：在给定节点或令牌之前插入文本。
- `insertTextBeforeRange(range, text)`：在给定范围之前插入文本。
- `remove(nodeOrToken)`：移除给定节点或令牌。
- `removeRange(range)`：移除给定范围内的文本。
- `replaceText(nodeOrToken, text)`：替换给定节点或令牌中的文本。
- `replaceTextRange(range, text)`：替换给定范围内的文本。

`range` 是一个包含两个元素的数组，表示源代码中的字符索引。第一个元素是范围的起始位置（包含），第二个元素是结束位置（不包含）。每个节点和令牌都有一个 `range` 属性，用于标识其在源代码中对应的范围。

上述方法会返回一个 `fixing` 对象。
`fix()` 函数可以返回以下值：

- 一个 `fixing` 对象。
- 一个包含 `fixing` 对象的数组。
- 一个用于枚举 `fixing` 对象的可迭代对象。特别是，`fix()` 函数可以是生成器。

如果你编写的 `fix()` 函数返回多个 `fixing` 对象，这些对象表示的范围不能重叠。

修复的最佳实践：

1. 避免进行可能改变代码运行时行为并导致代码停止工作的修复。
1. 尽可能缩小修复范围。过大的修复可能与其他修复冲突，从而无法应用。
1. 每条消息只进行一项修复。此要求通过必须从 `fix()` 返回 fixer 操作的结果来强制执行。
1. 初始修复完成后，所有规则都会再次运行，因此规则无需检查修复后的代码样式是否会导致其他规则报告错误。
    - 例如，假设某个修复器想给对象键加上引号，但不确定用户偏好单引号还是双引号。

        ```js
        { foo: 1 }

        // should get fixed to either
        { 'foo': 1 }

        // or
        { "foo": 1 }
        ```

    - 该修复器可以任意选择一种引号。如果选择不符合用户偏好，生成的代码会被 [`quotes`](../rules/quotes) 规则自动报告并修复。

注意：尽可能缩小修复范围是一项最佳实践，但有时扩大修复范围才是正确做法，以便有意阻止同一轮中其他规则修改周围范围。例如，如果替换文本声明了一个新变量，可以阻止其他修改作用于该变量的作用域，以免造成名称冲突。

以下示例会替换 `node`，并确保同一轮中不会对 `node.parent` 的范围应用其他修复：

```js
context.report({
	node,
	message,
	*fix(fixer) {
		yield fixer.replaceText(node, replacementText);

		// extend range of the fix to the range of `node.parent`
		yield fixer.insertTextBefore(node.parent, "");
		yield fixer.insertTextAfter(node.parent, "");
	},
});
```

<a id="conflicting-fixes"></a>

#### 冲突的修复

冲突的修复是指对源代码的同一部分应用不同修改的修复。
无法指定应用哪一个冲突的修复。

例如，如果两个修复都想修改字符 0 到 5，则只会应用其中一个。

<a id="providing-suggestions"></a>

#### 提供建议

在某些情况下，不适合自动应用修复。例如，修复可能会改变功能，或者根据实现意图，某条规则可能有多种有效的修复方式（参见上文[应用修复](#applying-fixes)中的最佳实践）。此时，可以使用 `context.report()` 的 `suggest` 选项，让编辑器等其他工具向用户提供手动应用建议的辅助功能。

要提供建议，请在报告参数中使用 `suggest` 键，并为其指定一个建议对象数组。每个建议对象表示一项可应用的建议，必须包含以下内容：`desc` 字符串键，用于描述应用该建议后的效果；或者 `messageId` 键（参见[下文](#suggestion-messageids)）；以及 `fix` 键，其值是定义建议结果的函数。此 `fix` 函数遵循常规修复所用的相同 API（如上文[应用修复](#applying-fixes)所述）。

```js
{% raw %}
context.report({
    node: node,
    message: "Unnecessary escape character: \\{{character}}.",
    data: { character },
    suggest: [
        {
            desc: "Remove the `\\`. This maintains the current functionality.",
            fix: function(fixer) {
                return fixer.removeRange(range);
            }
        },
        {
            desc: "Replace the `\\` with `\\\\` to include the actual backslash character.",
            fix: function(fixer) {
                return fixer.insertTextBeforeRange(range, "\\");
            }
        }
    ]
});
{% endraw %}
```

**重要提示：** 提供建议的规则必须设置 `meta.hasSuggestions` 属性。如果规则尝试生成建议，但没有[导出](#rule-structure)此属性，ESLint 就会抛出错误。

**注意：** 建议会作为独立更改应用，不会触发多轮修复。每条建议都应只针对代码中的一项更改，不应尝试遵循用户定义的样式。例如，如果建议要在代码库中添加一条新语句，就不应尝试匹配正确的缩进，也不应遵循用户对是否使用分号的偏好。用户触发多轮自动修复时，这些问题都可以得到修正。

建议的最佳实践：

1. 不要试图一次做太多，也不要建议可能引入大量破坏性更改的大规模重构。
1. 如上所述，不要尝试遵循用户定义的样式。

建议旨在提供修复。如果建议的 `fix` 函数返回 `null` 或空数组/序列，ESLint 会自动从代码检查输出中移除整条建议。

<a id="suggestion-messageids"></a>

#### 建议中的 `messageId`s

建议可以使用 `messageId`，而不是 `desc` 键。这与整体错误的 `messageId`s 用法相同（参见 [messageIds](#messageids)）。以下示例展示了如何在规则中使用建议的 `messageId`：

```js
{% raw %}
module.exports = {
    meta: {
        messages: {
            unnecessaryEscape: "Unnecessary escape character: \\{{character}}.",
            removeEscape: "Remove the `\\`. This maintains the current functionality.",
            escapeBackslash: "Replace the `\\` with `\\\\` to include the actual backslash character."
        },
        hasSuggestions: true
    },
    create: function(context) {
        // ...
        context.report({
            node: node,
            messageId: 'unnecessaryEscape',
            data: { character },
            suggest: [
                {
                    messageId: "removeEscape", // suggestion messageId
                    fix: function(fixer) {
                        return fixer.removeRange(range);
                    }
                },
                {
                    messageId: "escapeBackslash", // suggestion messageId
                    fix: function(fixer) {
                        return fixer.insertTextBeforeRange(range, "\\");
                    }
                }
            ]
        });
    }
};
{% endraw %}
```

<a id="placeholders-in-suggestion-messages"></a>

#### 建议消息中的占位符

你也可以在建议消息中使用占位符。这与整体错误消息中的占位符用法相同（参见[使用消息占位符](#use-message-placeholders)）。

请注意，必须在建议对象上提供 `data`。建议消息无法使用整体错误 `data` 中的属性。

```js
{% raw %}
module.exports = {
    meta: {
        messages: {
            unnecessaryEscape: "Unnecessary escape character: \\{{character}}.",
            removeEscape: "Remove `\\` before {{character}}.",
        },
        hasSuggestions: true
    },
    create: function(context) {
        // ...
        context.report({
            node: node,
            messageId: "unnecessaryEscape",
            data: { character }, // data for the unnecessaryEscape overall message
            suggest: [
                {
                    messageId: "removeEscape",
                    data: { character }, // data for the removeEscape suggestion message
                    fix: function(fixer) {
                        return fixer.removeRange(range);
                    }
                }
            ]
        });
    }
};
{% endraw %}
```

<a id="accessing-options-passed-to-a-rule"></a>

### 访问传递给规则的选项

有些规则需要选项才能正常工作。这些选项可以出现在配置（`.eslintrc`、命令行界面或注释）中。例如：

```json
{
	"quotes": ["error", "double"]
}
```

此示例中的 `quotes` 规则有一个选项，`"double"`（`error` 是错误级别）。你可以通过 `context.options` 获取规则的选项。它是一个包含该规则所有已配置选项的数组。在此示例中，`context.options[0]` 的值为 `"double"`：

```js
module.exports = {
	meta: {
		schema: [
			{
				enum: ["single", "double", "backtick"],
			},
		],
	},
	create: function (context) {
		var isDouble = context.options[0] === "double";

		// ...
	},
};
```

由于 `context.options` 只是一个数组，你既可以用它来确定传入了多少个选项，也可以获取选项的实际值。请注意，错误级别不属于 `context.options`，因为无法在规则内部得知或修改错误级别。

使用选项时，请确保在未提供选项的情况下，规则也有合理的默认行为。

有选项的规则必须指定一个 [schema](#options-schemas)。

<a id="avoid-non-serializable-options"></a>

#### 避免使用不可序列化的选项

规则选项和[共享设置](../use/configure/configuration-files#configure-shared-settings)应仅包含可序列化为 JSON 的值，例如字符串、数字、布尔值、`null`、数组和普通对象。避免设计要求 `context.options` 或 `context.settings` 中包含正则表达式、函数或类实例等不可序列化值的规则。

某些 ESLint 功能无法很好地处理不可序列化的值。例如，启用[缓存](../use/command-line-interface#caching)时，如果更新后的值序列化后仍与原配置相同，ESLint 可能无法检测到变化，因此可能会继续报告过时的结果。如果规则需要正则表达式，可以改为接受字符串形式的模式选项，并在规则内部创建 `RegExp` 对象。

<a id="accessing-the-source-code"></a>

### 访问源代码

`SourceCode` 对象是获取被代码检查的源代码更多信息的主要对象。你可以随时使用 `context.sourceCode` 属性获取 `SourceCode` 对象：

```js
module.exports = {
	create: function (context) {
		var sourceCode = context.sourceCode;

		// ...
	},
};
```

获取 `SourceCode` 实例后，可以使用以下方法处理代码：

- `getText(node, beforeCount, afterCount)`：返回给定节点、令牌或注释对应的源代码；还可以指定其范围前后要包含的字符数。如果省略 `node` 或将其设为 `undefined`，则返回完整源文本（参见[专门章节](#accessing-the-source-text)）。
- `getAllComments()`：返回源代码中的所有注释组成的数组（参见[专门章节](#accessing-comments)）。
- `getCommentsBefore(nodeOrToken)`：返回紧邻给定节点或令牌之前的注释令牌数组（参见[专门章节](#accessing-comments)）。
- `getCommentsAfter(nodeOrToken)`：返回紧邻给定节点或令牌之后的注释令牌数组（参见[专门章节](#accessing-comments)）。
- `getCommentsInside(node)`：返回给定节点内部所有注释令牌的数组（参见[专门章节](#accessing-comments)）。
- `isSpaceBetween(nodeOrToken, nodeOrToken)`：如果两个令牌之间有空白字符，则返回 true；如果传入节点，则检查第一个节点的最后一个令牌与第二个节点的第一个令牌之间是否有空白字符。
- `isGlobalReference(node)`：如果标识符引用了通过 `languageOptions.globals`、`/* global */` 注释或 `ecmaVersion` 配置的全局变量，且没有由局部绑定声明，则返回 true。
- `getFirstToken(node, skipOptions)`：返回表示给定节点的第一个令牌。
- `getFirstTokens(node, countOptions)`：返回表示给定节点的前 `count` 个令牌。
- `getLastToken(node, skipOptions)`：返回表示给定节点的最后一个令牌。
- `getLastTokens(node, countOptions)`：返回表示给定节点的最后 `count` 个令牌。
- `getTokenAfter(nodeOrToken, skipOptions)`：返回给定节点或令牌之后的第一个令牌。
- `getTokensAfter(nodeOrToken, countOptions)`：返回给定节点或令牌之后的 `count` 个令牌。
- `getTokenBefore(nodeOrToken, skipOptions)`：返回给定节点或令牌之前的第一个令牌。
- `getTokensBefore(nodeOrToken, countOptions)`：返回给定节点或令牌之前的 `count` 个令牌。
- `getFirstTokenBetween(nodeOrToken1, nodeOrToken2, skipOptions)`：返回两个节点或令牌之间的第一个令牌。
- `getFirstTokensBetween(nodeOrToken1, nodeOrToken2, countOptions)`：返回两个节点或令牌之间的前 `count` 个令牌。
- `getLastTokenBetween(nodeOrToken1, nodeOrToken2, skipOptions)`：返回两个节点或令牌之间的最后一个令牌。
- `getLastTokensBetween(nodeOrToken1, nodeOrToken2, countOptions)`：返回两个节点或令牌之间的最后 `count` 个令牌。
- `getTokens(node)`：返回给定节点的所有令牌。
- `getTokensBetween(nodeOrToken1, nodeOrToken2)`：返回两个节点之间的所有令牌。
- `getTokenByRangeStart(index, rangeOptions)`：返回在源代码中范围起始位置为给定索引的令牌。
- `getNodeByRangeIndex(index)`：返回 AST 中包含给定源代码索引的最深层节点。
- `getLocFromIndex(index)`：返回一个包含 `line` 和 `column` 属性的对象，对应给定源代码索引的位置。行号从 1 开始计数，列号从 0 开始计数。
- `getIndexFromLoc(loc)`：返回给定位置对应的索引。`loc` 是一个对象，其中 `line` 从 1 开始计数，`column` 从 0 开始计数。
- `commentsExistBetween(nodeOrToken1, nodeOrToken2)`：如果两个节点之间存在注释，则返回 `true`。
- `getAncestors(node)`：返回给定节点的祖先节点数组，从 AST 根节点开始，到该节点的直接父节点为止。此数组不包含给定节点本身。
- `getDeclaredVariables(node)`：返回由给定节点声明的[变量](./scope-manager-interface#variable-interface)列表。此信息可用于跟踪变量引用。
    - 如果节点是 `VariableDeclaration`，则返回该声明中声明的所有变量。
    - 如果节点是 `VariableDeclarator`，则返回该声明器中声明的所有变量。
    - 如果节点是 `FunctionDeclaration` 或 `FunctionExpression`，则除函数参数的变量外，还会返回函数名称对应的变量。
    - 如果节点是 `ArrowFunctionExpression`，则返回参数对应的变量。
    - 如果节点是 `ClassDeclaration` 或 `ClassExpression`，则返回类名称对应的变量。
    - 如果节点是 `CatchClause`，则返回异常对应的变量。
    - 如果节点是 `ImportDeclaration`，则返回其所有说明符对应的变量。
    - 如果节点是 `ImportSpecifier`、`ImportDefaultSpecifier` 或 `ImportNamespaceSpecifier`，则返回声明的变量。
    - 否则，如果节点未声明任何变量，则返回空数组。
- `getScope(node)`：返回给定节点的[作用域](./scope-manager-interface#scope-interface)。此信息可用于跟踪变量引用。
- `markVariableAsUsed(name, refNode)`：将给定引用节点指示的作用域中具有指定名称的变量标记为已使用。这会影响 [no-unused-vars](../rules/no-unused-vars) 规则。如果找到并标记了具有指定名称的变量，则返回 `true`；否则返回 `false`。

`skipOptions` 是一个包含 3 个属性的对象：`skip`、`includeComments` 和 `filter`。默认值为 `{skip: 0, includeComments: false, filter: null}`。

- `skip`：（`number`）要跳过的令牌数，必须为正整数。如果同时提供 `filter` 选项，则被过滤掉的令牌不计入跳过数。
- `includeComments`：（`boolean`）是否将注释令牌包含在结果中。
- `filter(token)`：以令牌为第一个参数的函数。如果函数返回 `false`，则结果中会排除该令牌。

`countOptions` 是一个包含 3 个属性的对象：`count`、`includeComments` 和 `filter`。默认值为 `{count: 0, includeComments: false, filter: null}`。

- `count`：（`number`）要返回的令牌数上限，必须为正整数。
- `includeComments`：（`boolean`）是否将注释令牌包含在结果中。
- `filter(token)`：以令牌为第一个参数的函数。如果函数返回 `false`，则结果中会排除该令牌。

`rangeOptions` 是一个包含 1 个属性的对象：`includeComments`。默认值为 `{includeComments: false}`。

- `includeComments`：（`boolean`）是否将注释令牌包含在结果中。

你还可以访问以下属性：

- `hasBOM`：（`boolean`）表示源代码是否带有 Unicode BOM 的标志。
- `text`：（`string`）正在进行代码检查的代码全文。此文本已移除 Unicode BOM。
- `ast`：（`object`）正在进行代码检查的代码对应的 AST `Program` 节点。
- `scopeManager`：[ScopeManager](./scope-manager-interface#scopemanager-interface) 对象。
- `visitorKeys`：（`object`）用于遍历此 AST 的访问器键。
- `parserServices`：（`object`）包含解析器为规则提供的服务。默认解析器不提供任何服务。不过，如果规则设计为与自定义解析器配合使用，就可以通过 `parserServices` 访问该解析器提供的内容。（例如，TypeScript 解析器可以提供获取给定节点计算类型的功能。）
- `lines`：（`array`）按规范对换行符的定义拆分得到的行数组。

每当你需要获取正在进行代码检查的代码的更多信息时，都应使用 `SourceCode` 对象。

<a id="accessing-the-source-text"></a>

#### 访问源文本

如果规则需要获取实际的 JavaScript 源代码进行处理，请使用 `sourceCode.getText()` 方法。此方法的用法如下：

```js
// get all source
var source = sourceCode.getText();

// get source for just this AST node
var nodeSource = sourceCode.getText(node);

// get source for just this token
var tokenSource = sourceCode.getText(token);

// get source for just this comment
var commentSource = sourceCode.getText(comment);

// get source for AST node plus previous two characters
var nodeSourceWithPrev = sourceCode.getText(node, 2);

// get source for AST node plus following two characters
var nodeSourceWithFollowing = sourceCode.getText(node, 0, 2);
```

这样，当 AST 没有提供所需数据时（例如逗号、分号、括号等的位置），你就可以直接在 JavaScript 文本中查找模式。

<a id="accessing-comments"></a>

#### 访问注释

虽然注释在技术上并不属于 AST 的一部分，但 ESLint 提供了 `sourceCode.getAllComments()`、`sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()` 和 `sourceCode.getCommentsInside()`，用于访问注释。

对于需要检查给定节点或令牌相关注释的规则，`sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()` 和 `sourceCode.getCommentsInside()` 都很有用。

请注意，这些方法的结果是在需要时计算的。

你也可以在 `sourceCode` 的许多方法中使用 `includeComments` 选项来访问注释。

<a id="options-schemas"></a>

### 选项架构

带有选项的规则必须指定 `meta.schema` 属性。该属性是以 [JSON Schema](https://json-schema.org/) 格式描述规则选项的架构，ESLint 会使用它验证配置选项，并在选项传递给规则的 `context.options` 之前阻止无效或意外的输入。

如果规则有选项，强烈建议为选项验证指定架构。不过，你也可以通过设置 `schema: false` 来退出选项验证，但不建议这样做，因为这会增加出现 bug 和错误的可能性。

对于没有指定 `meta.schema` 属性的规则，只要传入任何选项，ESLint 就会抛出错误。如果规则没有选项，不要设置 `schema: false`，而应直接省略 schema 属性或使用 `schema: []`；两者都会阻止传入任何选项。

验证规则配置时分为以下五个步骤：

1. 如果规则配置不是数组，则将其值包装成数组（例如，`"off"` 会变为 `["off"]`）；如果规则配置是数组，则直接使用该数组。
2. ESLint 将规则配置数组的第一个元素验证为严重级别（`"off"`、`"warn"`、`"error"`、`0`、`1`、`2`）。
3. 如果严重级别为 `off` 或 `0`，则禁用该规则并停止验证，忽略规则配置数组中的其他元素。
4. 如果规则已启用，则将数组中严重级别之后的所有元素复制到 `context.options` 数组中（例如，配置为 `["warn", "never", { someOption: 5 }]` 会得到 `context.options = ["never", { someOption: 5 }]`）。
5. 对 `context.options` 数组运行规则的架构验证。

注意：这意味着规则架构无法验证严重级别。规则架构只验证规则配置中严重级别之后的数组元素。规则无法知道自己配置的严重级别。

规则的 `schema` 有两种格式：

- JSON Schema 对象数组
    - 每个元素都会与 `context.options` 数组中相同位置的元素进行校验。
    - 如果 `context.options` 数组的元素少于架构数量，则忽略未匹配的架构。
    - 如果 `context.options` 数组的元素多于架构数量，则验证失败。
    - 使用此格式有两个重要结果：
        - 用户不提供规则选项（严重级别之外）时，配置**始终有效**。
        - 如果指定空数组，用户提供任何规则选项（严重级别之外）时，配置**始终会出错**。
- 用于验证 `context.options` 数组的完整 JSON Schema 对象
    - 即使规则只接受一个选项，架构也应假设要验证的是一个选项数组。
    - 架构可以任意复杂，因此可以通过 `oneOf`、`anyOf` 等方式验证完全不同的潜在选项组合。
    - 支持的 JSON Schema 版本为 [Draft-04](https://json-schema.org/draft-04/schema)，因此 `if` 或 `$data` 等较新的功能不可用。
        - 目前明确计划不将架构支持升级到此版本以上，以免造成生态兼容性问题。更多背景信息请参阅[此评论](https://github.com/eslint/eslint/issues/13888#issuecomment-872591875)。

例如，`yoda` 规则接受一个主要模式参数，值为 `"always"` 或 `"never"`，还接受一个额外的选项对象，其中包含可选属性 `exceptRange`：

```js
// Valid configuration:
// "yoda": "warn"
// "yoda": ["error"]
// "yoda": ["error", "always"]
// "yoda": ["error", "never", { "exceptRange": true }]
// Invalid configuration:
// "yoda": ["warn", "never", { "exceptRange": true }, 5]
// "yoda": ["error", { "exceptRange": true }, "never"]
module.exports = {
	meta: {
		schema: [
			{
				enum: ["always", "never"],
			},
			{
				type: "object",
				properties: {
					exceptRange: { type: "boolean" },
				},
				additionalProperties: false,
			},
		],
	},
};
```

以下是等效的基于对象的架构：

```js
// Valid configuration:
// "yoda": "warn"
// "yoda": ["error"]
// "yoda": ["error", "always"]
// "yoda": ["error", "never", { "exceptRange": true }]
// Invalid configuration:
// "yoda": ["warn", "never", { "exceptRange": true }, 5]
// "yoda": ["error", { "exceptRange": true }, "never"]
module.exports = {
	meta: {
		schema: {
			type: "array",
			minItems: 0,
			maxItems: 2,
			items: [
				{
					enum: ["always", "never"],
				},
				{
					type: "object",
					properties: {
						exceptRange: { type: "boolean" },
					},
					additionalProperties: false,
				},
			],
		},
	},
};
```

对象架构可以更精确、更严格地限定允许的内容。例如，以下架构始终要求指定第一个选项（一个介于 0 和 10 之间的数字）；第二个选项是可选的，可以是显式设置了某些选项的对象，也可以是 `"off"` 或 `"strict"`。

```js
// Valid configuration:
// "someRule": ["error", 6]
// "someRule": ["error", 5, "strict"]
// "someRule": ["warn", 10, { someNonOptionalProperty: true }]
// Invalid configuration:
// "someRule": "warn"
// "someRule": ["error"]
// "someRule": ["warn", 15]
// "someRule": ["warn", 7, { }]
// "someRule": ["error", 3, "on"]
// "someRule": ["warn", 7, { someOtherProperty: 5 }]
// "someRule": ["warn", 7, { someNonOptionalProperty: false, someOtherProperty: 5 }]
module.exports = {
	meta: {
		schema: {
			type: "array",
			minItems: 1, // Can't specify only severity!
			maxItems: 2,
			items: [
				{
					type: "number",
					minimum: 0,
					maximum: 10,
				},
				{
					anyOf: [
						{
							type: "object",
							properties: {
								someNonOptionalProperty: { type: "boolean" },
							},
							required: ["someNonOptionalProperty"],
							additionalProperties: false,
						},
						{
							enum: ["off", "strict"],
						},
					],
				},
			],
		},
	},
};
```

请记住，规则选项始终是一个数组，因此不要在顶层指定非数组类型的架构。如果架构的顶层未指定数组，用户将**永远无法**启用该规则，因为启用规则时其配置总是无效的。

以下架构示例会始终导致验证失败：

```js
// Possibly trying to validate ["error", { someOptionalProperty: true }]
// but when the rule is enabled, config will always fail validation because the options are an array which doesn't match "object"
module.exports = {
	meta: {
		schema: {
			type: "object",
			properties: {
				someOptionalProperty: {
					type: "boolean",
				},
			},
			additionalProperties: false,
		},
	},
};
```

**注意：**如果规则架构使用了 JSON Schema 的 [`$ref`](https://json-schema.org/understanding-json-schema/structuring.html#ref) 属性，则必须使用完整的 JSON Schema 对象，而不是按位置排列的属性架构数组。这是因为 ESLint 会将数组简写形式转换成单个架构，却不会相应更新引用，导致引用出错（并被忽略）。

要了解更多关于 JSON Schema 的信息，建议查看 [JSON Schema 网站](https://json-schema.org/learn/miscellaneous-examples)上的示例，或阅读免费的电子书 [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)。

<a id="option-defaults"></a>

### 选项默认值

规则可以通过 `meta.defaultOptions` 数组为任意选项指定默认值。
当用户配置启用规则时，ESLint 会将用户提供的选项元素递归合并到默认元素中。

例如，给定以下默认值：

```js
export default {
	meta: {
		defaultOptions: [
			{
				alias: "basic",
			},
		],
		schema: [
			{
				type: "object",
				properties: {
					alias: {
						type: "string",
					},
				},
				additionalProperties: false,
			},
		],
	},
	create(context) {
		const [{ alias }] = context.options;

		return {/* ... */};
	},
};
```

除非用户配置指定了其他值（例如 ` ["error", { alias: "complex" }]`），否则规则运行时 `alias` 的值会是 `"basic"`。

选项数组中的每个元素都会遵循以下规则进行合并：

- 缺失值或用户显式提供的 `undefined` 都会回退为默认选项。
- 用户提供的数组和 `undefined` 以外的原始值会覆盖默认选项。
- 用户提供的对象会合并到默认选项对象中；如果默认值不是对象，则会替换该默认值。

选项默认值也会根据规则的 `meta.schema` 进行验证。

**注意：**ESLint 内部使用 [Ajv](https://ajv.js.org) 进行架构验证，并启用了其 [`useDefaults` 选项](https://ajv.js.org/guide/modifying-data.html#assigning-defaults)。
用户提供的选项和 `meta.defaultOptions` 选项都会覆盖规则架构中指定的任何默认值。
ESLint 未来可能会在某个主要版本中禁用 Ajv 的 `useDefaults`。

<a id="accessing-shebangs"></a>

### 访问 Shebang

[Shebangs (#!)](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) 会表示为类型为 `"Shebang"` 的特殊令牌。它们会被视为注释，可以通过[访问注释](#accessing-comments)一节中所述的方法访问，例如 `sourceCode.getAllComments()`。

<a id="accessing-variable-scopes"></a>

### 访问变量作用域

`SourceCode#getScope(node)` 方法会返回给定节点的作用域。此方法有助于查找给定作用域中的变量信息，以及这些变量在其他作用域中的使用情况。

::: tip
你可以使用 [Code Explorer](https://explorer.eslint.org) 查看任意 JavaScript 代码的作用域信息。
:::

<a id="scope-types"></a>

#### 作用域类型

下表列出了 AST 节点类型及其对应的作用域类型。有关作用域类型的更多信息，请参阅 [`Scope` 对象文档](./scope-manager-interface#scope-interface)。

| AST Node Type             | Scope Type           |
| :------------------------ | :------------------- |
| `Program`                 | `global`             |
| `FunctionDeclaration`     | `function`           |
| `FunctionExpression`      | `function`           |
| `ArrowFunctionExpression` | `function`           |
| `ClassDeclaration`        | `class`              |
| `ClassExpression`         | `class`              |
| `StaticBlock`             | `class-static-block` |
| `BlockStatement` ※1       | `block`              |
| `SwitchStatement` ※1      | `switch`             |
| `ForStatement` ※2         | `for`                |
| `ForInStatement` ※2       | `for`                |
| `ForOfStatement` ※2       | `for`                |
| `WithStatement`           | `with`               |
| `CatchClause`             | `catch`              |
| others                    | ※3 ※4                |

**※1** 仅当配置的解析器提供了块级作用域功能时适用。默认解析器会在 `languageOptions.ecmaVersion` 不小于 `6` 时提供块级作用域功能。<br>
**※2** 仅当 `for` 语句将迭代变量定义为块级作用域变量时适用（例如，`for (let i = 0;;) {}`）。<br>
**※3** 对应于最近的、具有自身作用域的祖先节点的作用域。如果最近的祖先节点有多个作用域，则选择最内层的作用域（例如，`Program#sourceType` 为 `"module"` 时，`Program` 节点同时具有 `global` 作用域和 `module` 作用域。最内层的作用域是 `module` 作用域）。<br>
**※4** 每个 `PropertyDefinition#value` 节点（可以是任何表达式节点类型）都有一个 `class-field-initializer` 作用域。例如，在 `class C { field = 1 }` 中，表示 `1` 的 `Literal` 节点具有 `class-field-initializer` 作用域。如果节点还有其他作用域，`class-field-initializer` 作用域将是最外层的作用域。例如，在 `class C { field = () => {} }` 中，`ArrowFunctionExpression` 节点有两个作用域：`class-field-initializer` 和 `function`。

<a id="scope-variables"></a>

#### 作用域变量

`Scope#variables` 属性包含一个[`Variable` 对象](./scope-manager-interface#variable-interface)数组，即当前作用域中声明的变量。你可以使用这些 `Variable` 对象跟踪整个模块中的变量引用。

在每个 `Variable` 对象中，`Variable#references` 属性包含一个 [`Reference` 对象](./scope-manager-interface#reference-interface)数组。`Reference` 数组包含模块源代码中所有引用该变量的位置。

每个 `Variable` 对象中的 `Variable#defs` 属性还包含一个 [`Definition` 对象](./scope-manager-interface#definition-interface)数组。你可以使用这些 `Definition` 对象查找变量的定义位置。

全局变量还有以下属性：

- `Variable#writeable`（`boolean | undefined`）……如果为 `true`，此全局变量可以被赋予任意值。如果为 `false`，则此全局变量为只读。
- `Variable#eslintExplicitGlobal`（`boolean | undefined`）……如果为 `true`，此全局变量由源代码文件中的 `/* globals */` 指令注释定义。
- `Variable#eslintExplicitGlobalComments`（`Comment[] | undefined`）……在源代码文件中定义此全局变量的 `/* globals */` 指令注释数组。如果不存在 `/* globals */` 指令注释，此属性为 `undefined`。
- `Variable#eslintImplicitGlobalSetting`（`"readonly" | "writable" | undefined`）……配置文件中的配置值。如果存在 `/* globals */` 指令注释，此值可能与 `variable.writeable` 不同。

如需查看使用 `SourceCode#getScope()` 跟踪变量的示例，请参阅以下内置规则的源代码：

- [no-shadow](https://github.com/eslint/eslint/blob/main/lib/rules/no-shadow.js)：在 `Program` 节点调用 `sourceCode.getScope()`，并检查所有子作用域，确保变量名称不会在较低层级的作用域中重复使用。（参见 [no-shadow](../rules/no-shadow) 文档。）
- [no-redeclare](https://github.com/eslint/eslint/blob/main/lib/rules/no-redeclare.js)：在每个作用域调用 `sourceCode.getScope()`，确保变量不会在同一作用域中声明两次。（参见 [no-redeclare](../rules/no-redeclare) 文档。）

<a id="marking-variables-as-used"></a>

### 将变量标记为已使用

某些 ESLint 规则（例如 [`no-unused-vars`](../rules/no-unused-vars)）会检查变量是否已被使用。ESLint 本身只了解标准的变量访问规则，因此，自定义的变量访问方式可能不会被识别为“已使用”。

为了解决这个问题，你可以使用 `sourceCode.markVariableAsUsed()` 方法。此方法接受两个参数：要标记为已使用的变量名称，以及用于指示当前作用域的可选引用节点。示例如下：

```js
module.exports = {
	create: function (context) {
		var sourceCode = context.sourceCode;

		return {
			ReturnStatement(node) {
				// look in the scope of the function for myCustomVar and mark as used
				sourceCode.markVariableAsUsed("myCustomVar", node);

				// or: look in the global scope for myCustomVar and mark as used
				sourceCode.markVariableAsUsed("myCustomVar");
			},
		};
		// ...
	},
};
```

此处，`myCustomVar` 变量相对于 `ReturnStatement` 节点被标记为已使用，这意味着 ESLint 会从最接近该节点的作用域开始搜索。如果省略第二个参数，则使用顶层作用域。（对于 ESM 文件，顶层作用域是模块作用域；对于 CommonJS 文件，顶层作用域是第一个函数作用域。）

<a id="accessing-code-paths"></a>

### 访问代码路径

ESLint 在遍历 AST 时会分析代码路径。你可以通过与代码路径相关的七个事件访问代码路径对象。更多信息请参阅[代码路径分析](code-path-analysis)。

<a id="rule-unit-tests"></a>

## 规则单元测试

ESLint 提供了 [`RuleTester`](../integrate/nodejs-api#ruletester) 工具，方便你为规则编写测试。

<a id="rule-naming-conventions"></a>

## 规则命名约定

虽然你可以为自定义规则任意命名，但核心规则有自己的命名约定。让自定义规则也遵循相同的命名约定会更清晰。更多信息请参阅[核心规则命名约定](../contribute/core-rules#rule-naming-conventions)文档。

<a id="runtime-rules"></a>

## 运行时规则

你可以直接在配置文件中加入自定义规则。这非常适合特定于你的项目或公司的规则，因为这类规则通常不适合随 ESLint 一起发布或作为插件发布。

这些规则与其他规则采用相同的格式。按照常规方式创建规则，然后执行以下步骤：

1. 将规则导入[配置文件](../use/configure/configuration-files#configuration-file)。
2. 在 `plugins` 键下定义一个[虚拟插件](../use/configure/plugins#configure-a-virtual-plugin)，并将规则添加到它的 `rules` 对象中。
3. 在 `rules` 键下指定规则的严重级别，并使用插件命名空间作为规则 ID 的前缀（例如，`local/my-rule`）。除非规则的严重级别为 `"warn"` 或 `"error"`，否则规则不会运行。

例如，如果规则位于 `rules/my-rule.js`，配置文件如下所示：

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import myRule from "./rules/my-rule.js";

export default defineConfig([
	{
		// define the plugin
		plugins: {
			local: {
				rules: {
					"my-rule": myRule,
				},
			},
		},

		// configure the rule
		rules: {
			"local/my-rule": "error",
		},
	},
]);
```

<a id="profile-rule-performance"></a>

## 分析规则性能

ESLint 内置了跟踪各条规则性能的方法。设置 `TIMING` 环境变量后，代码检查完成时会显示运行时间最长的十条规则、每条规则的运行时间（规则创建 + 规则执行），以及其占规则总处理时间（规则创建 + 规则执行）的相对比例。

```bash
$ TIMING=1 eslint lib
Rule                    | Time (ms) | Relative
:-----------------------|----------:|--------:
no-multi-spaces         |    52.472 |     6.1%
camelcase               |    48.684 |     5.7%
no-irregular-whitespace |    43.847 |     5.1%
valid-jsdoc             |    40.346 |     4.7%
handle-callback-err     |    39.153 |     4.6%
space-infix-ops         |    35.444 |     4.1%
no-undefined            |    25.693 |     3.0%
no-shadow               |    22.759 |     2.7%
no-empty-class          |    21.976 |     2.6%
semi                    |    19.359 |     2.3%
```

要明确测试一条规则，请结合使用 `--no-config-lookup` 和 `--rule` 选项：

```bash
$ TIMING=1 eslint --no-config-lookup --rule "quotes: [2, 'double']" lib
Rule   | Time (ms) | Relative
:------|----------:|--------:
quotes |    18.066 |   100.0%
```

要查看更长的结果列表（超过 10 条），请将环境变量设为其他值，例如 `TIMING=50` 或 `TIMING=all`。

如需获取更细致的计时信息（按文件和规则分别统计），请改用 [`stats`](./stats) 选项。
