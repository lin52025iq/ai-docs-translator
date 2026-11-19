---
title: 自定义规则
eleventyNavigation:
    key: custom rules
    parent: create plugins
    title: 自定义规则
    order: 2
---

你可以创建自定义规则，以便与 ESLint 一起使用。如果[核心规则](../rules/)无法满足你的使用场景，你可能会希望创建自定义规则。

以下是自定义规则的基本格式：

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
`eslint` 包中附带的核心规则不属于公共 API 的一部分，也并非为扩展而设计。基于这些规则构建功能十分脆弱，将来很可能会导致你的规则彻底失效。如果你想创建与某条核心规则相似的规则，应先将该规则文件复制到你的项目中，再以此为基础进行开发。
:::

<a id="rule-structure"></a>

## 规则结构

规则的源文件会导出一个包含以下属性的对象。自定义规则和核心规则都遵循此格式。

`meta`：(`object`) 包含规则的元数据：

- `type`：(`string`) 指示规则的类型，可为 `"problem"`、`"suggestion"` 或 `"layout"` 之一：
    - `"problem"`：规则用于识别会导致错误或可能造成令人困惑行为的代码。开发者应将解决此类问题视为高优先级任务。
    - `"suggestion"`：规则用于识别可以改进的地方；如果不修改代码，也不会导致错误。
    - `"layout"`：规则主要关注空白、分号、逗号和括号等决定代码外观而非执行方式的部分。这些规则作用于 AST 中未指定的代码部分。

    可以使用 CLI 选项 [`--fix-type`](../use/command-line-interface#--fix-type) 指定要应用的修复类型。

- `docs`：(`object`) 通常用于生成文档和供工具使用的属性。核心规则必须提供此属性，自定义规则则可选。自定义规则可根据需要在此处添加其他属性。
    - `description`：(`string`) 提供规则的简短描述。对于核心规则，此描述会用于[规则索引](../rules/)。
    - `dialects`：(`string[]`) 规则适用的语言方言。例如，`["JavaScript", "TypeScript"]`。
    - `frozen`：(`boolean`) 对于核心规则，指定该规则是否已[冻结](../contribute/core-rules#frozen-rules)，不再接受功能请求。
    - `recommended`：(`unknown`) 对于核心规则，这是一个布尔值，用于指定 `@eslint/js` 的 `recommended` 配置是否启用该规则。
    - `url`：(`string`) 指定完整文档的网址。代码编辑器通常会使用此项，为突出显示的规则违规提供有用的链接。

- `messages`：(`object`) 包含规则违规和建议消息的对象。核心规则必须提供此属性，自定义规则则可选。可以在 `context.report()` 调用中通过键（`messageId`s）引用消息。更多信息请参阅 [`messageId`s](#messageids)。
- `fixable`：(`string`) 如果[命令行](../use/command-line-interface#--fix)中的 `--fix` 选项可以自动修复此规则报告的问题，则值为 `"code"` 或 `"whitespace"`。

    **重要：** 可修复规则必须提供 `fixable` 属性。如果未指定该属性，每当规则尝试生成修复时，ESLint 都会抛出错误。如果规则不可修复，请省略 `fixable` 属性。

- `hasSuggestions`：(`boolean`) 指定规则是否可以返回建议（省略时默认为 `false`）。

    **重要：** 提供建议的规则必须设置 `hasSuggestions` 属性。如果未将此属性设为 `true`，每当规则尝试生成建议时，ESLint 都会抛出错误。如果规则不提供建议，请省略 `hasSuggestions` 属性。

- `schema`：(`object | array | false`) 指定[选项](#options-schemas)，以便 ESLint 阻止无效的[规则配置](../use/configure/rules)。规则具有选项时必须提供此属性。

- `defaultOptions`：(`array`) 指定规则的[默认选项](#option-defaults)。如果存在此属性，用户配置中提供的选项会递归地合并到默认选项之上。

- `languages`：(`array`) 指定规则适用的语言。每个条目都是格式为 `"pluginName/languageName"` 的字符串（例如，`"js/js"`、`"markdown/gfm"`）。特殊值如下：
    - `"*"` — 规则适用于任何语言。
    - `"pluginName/*"` — 规则适用于给定插件提供的任何语言。

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
    4. **命名空间匹配** — 注册名称不同的插件，如果其 `meta.namespace` 与条目中的插件部分相同，也可以匹配。

    ```js
    // Rule runs with a specific language from a plugin whose meta.namespace is "markdown"
    // (e.g., the plugin is registered as "md" but declares meta.namespace = "markdown")
    meta: {
        languages: ["markdown/gfm"],
    }
    ```

- `deprecated`：(`boolean | DeprecatedInfo`) 指示规则是否已弃用。如果规则未弃用，可以省略 `deprecated` 属性。
  关于 [DeprecatedInfo](./rule-deprecation) 的专门页面

- `replacedBy`：(`array`，**已弃用**，请改用 `meta.deprecated.replacedBy`。）如果规则已弃用，可在此指定替代规则。

`create()`：返回一个包含方法的对象。遍历 JavaScript 代码的抽象语法树（AST，由 [ESTree](https://github.com/estree/estree) 定义）时，ESLint 会调用这些方法来“访问”节点：

- 如果键是节点类型或[选择器](./selectors)，ESLint 会在向下遍历树时调用对应的**访问器**函数。
- 如果键是节点类型或[选择器](./selectors)并加上 `:exit`，ESLint 会在向上遍历树时调用对应的**访问器**函数。
- 如果键是事件名称，ESLint 会为[代码路径分析](code-path-analysis)调用对应的**处理器**函数。

规则可以使用当前节点及其周围的树结构来报告或修复问题。

以下是 [array-callback-return](../rules/array-callback-return) 规则的方法：

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

规则中的 `create` 方法仅接受 `context` 对象作为参数。例如：

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

- `id`：(`string`) 规则 ID。
- `filename`：(`string`) 与源代码关联的文件名。
- `physicalFilename`：(`string`) 对文件进行代码检查时，提供该文件在磁盘上的完整路径，不含任何代码块信息。对文本进行代码检查时，如果未指定 `--stdin-filename`，则提供传入的值或 `<text>`。
- `cwd`：(`string`) 传递给 [Linter](../integrate/nodejs-api#linter) 的 `cwd` 选项。它是一个路径，表示应视为当前工作目录的目录。
- `options`：(`array`) 此规则的[已配置选项](../use/configure/rules)数组。此数组不包含规则严重级别（请参阅[专门章节](#accessing-options-passed-to-a-rule)）。
- `sourceCode`：(`object`) 一个 `SourceCode` 对象，可用于处理传递给 ESLint 的源代码（请参阅[访问源代码](#accessing-the-source-code)）。
- `settings`：(`object`) 配置中的[共享设置](../use/configure/configuration-files#configure-shared-settings)。
- `languageOptions`：(`object`) [各属性的更多详情](../use/configure/language-options)
    - `sourceType`：(`'script' | 'module' | 'commonjs'`) 当前文件的模式。
    - `ecmaVersion`：(`number`) 用于解析当前文件的 ECMA 版本。
    - `parser`：(`object`)：用于解析当前文件的解析器。
    - `parserOptions`：(`object`) 为此文件配置的解析器选项。
    - `globals`：(`object`) 指定的全局变量。

此外，`context` 对象还具有以下方法：

- `report(descriptor)`。报告代码中的问题（请参阅[专门章节](#report-problems)）。

**注意：** 早期版本的 ESLint 支持 `context` 对象上的其他方法。这些方法已在新格式中移除，不应再依赖它们。

<a id="report-problems"></a>

### 报告问题

编写自定义规则时，最常用的方法是 `context.report()`。它会根据所用配置发布警告或错误。此方法接受一个参数，即包含以下属性的对象：

- `messageId`：(`string`) 消息 ID（请参阅 [messageIds](#messageids)）。建议使用此属性而非 `message`。
- `message`：(`string`) 问题消息（`messageId` 的替代项）。
- `node`：(`object`，可选) 与问题相关的 AST 节点、令牌或注释。如果存在此属性且未指定 `loc`，则使用节点的起始位置作为问题位置。
- `loc`：(`object`，可选) 指定问题位置。如果同时指定 `loc` 和 `node`，则使用 `loc` 中的位置，而非 `node`。
    - `start`：起始位置对象。
        - `line`：(`number`) 问题所在的行号，从 1 开始计数。
        - `column`：(`number`) 问题所在的列号，从 0 开始计数。
    - `end`：结束位置对象。
        - `line`：(`number`) 问题结束位置的行号，从 1 开始计数。
        - `column`：(`number`) 问题结束位置的列号，从 0 开始计数。
- `data`：(`object`，可选) `message` 的[占位符](#use-message-placeholders)数据。
- `fix(fixer)`：(`function`，可选) 应用[修复](#applying-fixes)来解决问题。

注意，必须至少提供 `node` 或 `loc` 之一。

最简单的示例只使用 `node` 和 `message`：

```js
context.report({
	node: node,
	message: "Unexpected identifier",
});
```

节点包含确定违规文本行号和列号，以及表示该节点的源文本所需的全部信息。

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

节点包含确定违规文本行号和列号，以及表示该节点的源文本所需的全部信息。

<a id="messageids"></a>

#### `messageId`s

建议在 `context.report()` 调用中使用 `messageId`s 来报告消息，原因如下：

- 规则违规消息可以存储在统一的 `meta.messages` 对象中，便于管理。
- 规则违规消息无需在规则文件和规则测试文件中重复编写。
- 因此，修改规则违规消息的门槛更低，有助于鼓励更多贡献，以提升消息的清晰度和实用性。

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

待进行代码检查的文件：

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

如果你希望 ESLint 尝试修复所报告的问题，可以在使用 `context.report()` 时指定 `fix` 函数。`fix` 函数接收一个参数，即可用于应用修复的 `fixer` 对象。例如：

```js
context.report({
	node: node,
	message: "Missing semicolon",
	fix(fixer) {
		return fixer.insertTextAfter(node, ";");
	},
});
```

这里使用 `fix()` 函数在节点后插入分号。请注意，修复不会立即应用；如果与其他修复冲突，也可能完全不会应用。应用修复后，ESLint 会再次对修复后的代码运行所有已启用的规则，并可能应用更多修复。此过程最多重复 10 次，或者直到不再发现可修复的问题。之后，所有剩余问题都会照常报告。

**重要：** 可修复规则必须提供 `meta.fixable` 属性。如果实现了 `fix` 函数的规则未[导出](#rule-structure) `meta.fixable` 属性，ESLint 就会抛出错误。

`fixer` 对象具有以下方法：

- `insertTextAfter(nodeOrToken, text)`：在给定节点或令牌后插入文本。
- `insertTextAfterRange(range, text)`：在给定范围后插入文本。
- `insertTextBefore(nodeOrToken, text)`：在给定节点或令牌前插入文本。
- `insertTextBeforeRange(range, text)`：在给定范围前插入文本。
- `remove(nodeOrToken)`：移除给定节点或令牌。
- `removeRange(range)`：移除给定范围内的文本。
- `replaceText(nodeOrToken, text)`：替换给定节点或令牌中的文本。
- `replaceTextRange(range, text)`：替换给定范围内的文本。

`range` 是一个包含两个字符索引的数组，索引位于源代码中。第一个值是范围起始位置（含），第二个值是范围结束位置（不含）。每个节点和令牌都有一个 `range` 属性，用于标识其对应的源代码范围。

上述方法会返回一个 `fixing` 对象。
`fix()` 函数可以返回以下值：

- 一个 `fixing` 对象。
- 一个包含 `fixing` 对象的数组。
- 一个枚举 `fixing` 对象的可迭代对象。尤其是，`fix()` 函数可以是生成器。

如果 `fix()` 函数返回多个 `fixing` 对象，这些对象不得重叠。

修复的最佳实践：

1. 避免可能改变代码运行时行为并导致代码无法正常工作的修复。
1. 尽可能缩小修复范围。不必要的大范围修复可能与其他修复冲突，导致无法应用。
1. 每条消息只进行一次修复。此要求通过必须从 `fix()` 返回 fixer 操作的结果来强制执行。
1. 由于初次应用修复后会再次运行所有规则，因此规则无需检查修复后的代码风格是否会导致其他规则报告错误。
    - 例如，假设某个修复器希望给对象键加上引号，但不确定用户喜欢单引号还是双引号。

        ```js
        { foo: 1 }

        // should get fixed to either
        { 'foo': 1 }

        // or
        { "foo": 1 }
        ```

    - 此修复器可以任意选择一种引号。如果选择不符合用户偏好，生成的代码会由 [`quotes`](../rules/quotes) 规则自动报告并修复。

注意：尽可能缩小修复范围是最佳实践，但在某些情况下，扩大修复范围以有意阻止同一轮中其他规则修改周边范围也是正确的做法。例如，如果替换文本声明了一个新变量，阻止同一作用域中的其他更改可能很有用，因为那些更改可能导致名称冲突。

以下示例会替换 `node`，并确保同一轮中 `node.parent` 的范围内不会应用其他修复：

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

#### 冲突的修复

冲突的修复是指对源代码的同一部分应用不同更改的修复。
无法指定应用哪一个冲突修复。

例如，如果两个修复都想修改字符 0 到 5，则只会应用其中一个。

#### 提供建议

在某些情况下，不适合自动应用修复。例如，修复可能会改变功能，或者根据实现意图可能存在多种有效的修复方式（请参阅上文[应用修复](#applying-fixes)中的最佳实践）。此时，可以使用 `context.report()` 的替代选项 `suggest`，让编辑器等其他工具向用户提供手动应用建议的辅助功能。

要提供建议，请在报告参数中使用 `suggest` 键，并传入建议对象数组。每个建议对象表示一项可应用的建议，必须包含 `desc` 字符串键（描述应用建议后会发生什么）或 `messageId` 键（请参阅[下文](#suggestion-messageids)），以及定义建议结果的 `fix` 函数键。此 `fix` 函数遵循常规修复所使用的相同 API（如上文[应用修复](#applying-fixes)所述）。

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

**重要：** 提供建议的规则必须具有 `meta.hasSuggestions` 属性。如果规则尝试生成建议，但未[导出](#rule-structure)此属性，ESLint 就会抛出错误。

**注意：** 建议会作为独立更改应用，不会触发多轮修复。每条建议都应专注于代码中的单一更改，不应尝试遵循用户定义的风格。例如，如果建议是在代码库中添加一条新语句，就不应尝试匹配正确的缩进，也不应遵循用户对是否使用分号的偏好。这些问题都可以在用户触发多轮自动修复时解决。

建议的最佳实践：

1. 不要试图一次处理过多问题，也不要建议可能引入大量破坏性更改的大规模重构。
1. 如上所述，不要尝试遵循用户定义的风格。

建议用于提供修复。如果建议的 `fix` 函数返回 `null` 或空数组/序列，ESLint 会自动从代码检查输出中移除整个建议。

<a id="suggestion-messageids"></a>

#### 建议中的 `messageId`s

建议中可以使用 `messageId` 键代替 `desc` 键。其工作方式与整体错误的 `messageId`s 相同（请参阅 [messageIds](#messageids)）。以下示例展示了如何在规则中使用建议的 `messageId`：

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

#### 建议消息中的占位符

你也可以在建议消息中使用占位符。其工作方式与整体错误消息中的占位符相同（请参阅[使用消息占位符](#use-message-placeholders)）。

请注意，你必须在建议对象上提供 `data`。建议消息无法使用整体错误 `data` 中的属性。

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

有些规则需要选项才能正常工作。这些选项会出现在配置（`.eslintrc`、命令行界面或注释）中。例如：

```json
{
	"quotes": ["error", "double"]
}
```

此示例中的 `quotes` 规则有一个选项，`"double"`（`error` 是错误级别）。你可以使用 `context.options` 获取规则的选项。它是一个包含该规则所有已配置选项的数组。在此示例中，`context.options[0]` 的值为 `"double"`：

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

由于 `context.options` 只是一个数组，你可以用它确定传入了多少个选项，也可以获取选项本身。请注意，错误级别不属于 `context.options` 的一部分，因为规则内部无法获知或修改错误级别。

使用选项时，请确保在未提供选项的情况下，规则也有合理的默认行为。

带有选项的规则必须指定一个 [schema](#options-schemas)。

<a id="avoid-non-serializable-options"></a>

#### 避免使用不可序列化的选项

规则选项和[共享设置](../use/configure/configuration-files#configure-shared-settings)只能包含可序列化为 JSON 的值，例如字符串、数字、布尔值、`null`、数组和普通对象。避免设计需要在 `context.options` 或 `context.settings` 中使用正则表达式、函数或类实例等不可序列化值的规则。

ESLint 的某些功能无法很好地处理不可序列化的值。例如，启用[缓存](../use/command-line-interface#caching)时，如果更新后的值序列化后与原配置相同，ESLint 可能无法检测到更改，因此可能持续报告过时的结果。如果规则需要正则表达式，请改为接受字符串形式的模式选项，并在规则内部创建 `RegExp` 对象。

<a id="accessing-the-source-code"></a>

### 访问源代码

`SourceCode` 对象是获取待检查源代码更多信息的主要对象。你可以随时通过 `context.sourceCode` 属性获取 `SourceCode` 对象：

```js
module.exports = {
	create: function (context) {
		var sourceCode = context.sourceCode;

		// ...
	},
};
```

获取 `SourceCode` 实例后，可以使用以下方法处理代码：

- `getText(node, beforeCount, afterCount)`：返回给定节点、令牌或注释的源代码，也可以选择包含其范围前后指定数量的字符。如果省略 `node` 或将其设为 `undefined`，则返回完整源文本（请参阅[专门章节](#accessing-the-source-text)）。
- `getAllComments()`：返回源代码中所有注释的数组（请参阅[专门章节](#accessing-comments)）。
- `getCommentsBefore(nodeOrToken)`：返回紧邻给定节点或令牌之前的注释令牌数组（请参阅[专门章节](#accessing-comments)）。
- `getCommentsAfter(nodeOrToken)`：返回紧邻给定节点或令牌之后的注释令牌数组（请参阅[专门章节](#accessing-comments)）。
- `getCommentsInside(node)`：返回给定节点内部所有注释令牌的数组（请参阅[专门章节](#accessing-comments)）。
- `isSpaceBetween(nodeOrToken, nodeOrToken)`：如果两个令牌之间存在空白字符，则返回 true；如果传入的是节点，则检查第一个节点的最后一个令牌与第二个节点的第一个令牌之间是否存在空白字符。
- `isGlobalReference(node)`：如果标识符引用的是通过 `languageOptions.globals`、`/* global */` 注释或 `ecmaVersion` 配置的全局变量，且未由局部绑定声明，则返回 true。
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
- `getTokensBetween(nodeOrToken1, nodeOrToken2)`：返回两个节点或令牌之间的所有令牌。
- `getTokenByRangeStart(index, rangeOptions)`：返回源代码中范围起始位置为给定索引的令牌。
- `getNodeByRangeIndex(index)`：返回 AST 中包含给定源代码索引的最深层节点。
- `getLocFromIndex(index)`：返回一个带有 `line` 和 `column` 属性的对象，对应给定源代码索引的位置。行号从 1 开始，列号从 0 开始。
- `getIndexFromLoc(loc)`：返回给定位置在源代码中的索引。`loc` 是一个对象，包含从 1 开始的 `line` 键和从 0 开始的 `column` 键。
- `commentsExistBetween(nodeOrToken1, nodeOrToken2)`：如果两个节点之间存在注释，则返回 `true`。
- `getAncestors(node)`：返回给定节点的祖先数组，从 AST 根节点开始，直到该节点的直接父节点。此数组不包含给定节点本身。
- `getDeclaredVariables(node)`：返回由给定节点声明的[变量](./scope-manager-interface#variable-interface)列表。此信息可用于追踪变量引用。
    - 如果节点是 `VariableDeclaration`，则返回该声明中声明的所有变量。
    - 如果节点是 `VariableDeclarator`，则返回该声明符中声明的所有变量。
    - 如果节点是 `FunctionDeclaration` 或 `FunctionExpression`，则除函数参数对应的变量外，还会返回函数名对应的变量。
    - 如果节点是 `ArrowFunctionExpression`，则返回参数对应的变量。
    - 如果节点是 `ClassDeclaration` 或 `ClassExpression`，则返回类名对应的变量。
    - 如果节点是 `CatchClause`，则返回异常对应的变量。
    - 如果节点是 `ImportDeclaration`，则返回其所有说明符对应的变量。
    - 如果节点是 `ImportSpecifier`、`ImportDefaultSpecifier` 或 `ImportNamespaceSpecifier`，则返回声明的变量。
    - 否则，如果节点没有声明任何变量，则返回空数组。
- `getScope(node)`：返回给定节点的[作用域](./scope-manager-interface#scope-interface)。此信息可用于追踪变量引用。
- `markVariableAsUsed(name, refNode)`：将给定引用节点所指作用域中具有给定名称的变量标记为已使用。这会影响 [no-unused-vars](../rules/no-unused-vars) 规则。如果找到并标记了具有给定名称的变量，则返回 `true`；否则返回 `false`。

`skipOptions` 是一个包含 3 个属性的对象：`skip`、`includeComments` 和 `filter`。默认值为 `{skip: 0, includeComments: false, filter: null}`。

- `skip`：(`number`) 正整数，表示跳过的令牌数。如果同时提供了 `filter` 选项，则经过筛选的令牌不计入跳过数量。
- `includeComments`：(`boolean`) 是否在结果中包含注释令牌。
- `filter(token)`：将令牌作为第一个参数的函数。如果函数返回 `false`，结果中就会排除该令牌。

`countOptions` 是一个包含 3 个属性的对象：`count`、`includeComments` 和 `filter`。默认值为 `{count: 0, includeComments: false, filter: null}`。

- `count`：(`number`) 正整数，表示最多返回的令牌数。
- `includeComments`：(`boolean`) 是否在结果中包含注释令牌。
- `filter(token)`：将令牌作为第一个参数的函数。如果函数返回 `false`，结果中就会排除该令牌。

`rangeOptions` 是一个包含 1 个属性的对象：`includeComments`。默认值为 `{includeComments: false}`。

- `includeComments`：(`boolean`) 是否在结果中包含注释令牌。

此外，还可以访问以下属性：

- `hasBOM`：(`boolean`) 指示源代码是否包含 Unicode BOM。
- `text`：(`string`) 正在进行代码检查的代码全文。Unicode BOM 已从文本中移除。
- `ast`：(`object`) 正在进行代码检查的代码的 AST `Program` 节点。
- `scopeManager`：[ScopeManager](./scope-manager-interface#scopemanager-interface) 对象，表示代码的作用域管理器。
- `visitorKeys`：(`object`) 用于遍历此 AST 的访问器键。
- `parserServices`：(`object`) 包含解析器为规则提供的服务。默认解析器不提供任何服务。但是，如果规则旨在与自定义解析器配合使用，就可以通过 `parserServices` 访问该解析器提供的内容。（例如，TypeScript 解析器可以提供获取给定节点计算类型的功能。）
- `lines`：(`array`) 按照规范中行终止符的定义拆分后的行数组。

需要获取正在进行代码检查的代码的更多信息时，应使用 `SourceCode` 对象。

<a id="accessing-the-source-text"></a>

#### 访问源文本

如果规则需要获取实际的 JavaScript 源代码进行处理，请使用 `sourceCode.getText()` 方法。此方法的工作方式如下：

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

这样，当 AST 未提供适当数据（例如逗号、分号、括号等的位置）时，你就可以直接在 JavaScript 文本中查找模式。

<a id="accessing-comments"></a>

#### 访问注释

虽然注释严格来说并不是 AST 的一部分，但 ESLint 提供了 `sourceCode.getAllComments()`、`sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()` 和 `sourceCode.getCommentsInside()`，用于访问注释。

对于需要检查注释与给定节点或令牌之间关系的规则，`sourceCode.getCommentsBefore()`、`sourceCode.getCommentsAfter()` 和 `sourceCode.getCommentsInside()` 很有用。

请注意，这些方法的结果是在需要时才计算的。

你也可以通过 `sourceCode` 的许多方法使用 `includeComments` 选项来访问注释。

<a id="options-schemas"></a>

### 选项 Schema

带有选项的规则必须指定 `meta.schema` 属性。该属性以 [JSON Schema](https://json-schema.org/) 格式描述规则的选项，ESLint 会用它验证配置选项，并在选项传递给规则的 `context.options` 之前阻止无效或意外的输入。

如果规则带有选项，强烈建议指定 schema 来验证选项。不过，也可以通过设置 `schema: false` 关闭选项验证，但不建议这样做，因为这会增加出现错误和疏漏的可能性。

对于未指定 `meta.schema` 属性的规则，只要传入任何选项，ESLint 就会抛出错误。如果规则没有选项，不要设置 `schema: false`；只需省略 schema 属性或使用 `schema: []`，这两种方式都会阻止传入任何选项。

验证规则配置时，分为以下五个步骤：

1. 如果规则配置不是数组，则将该值包装成数组（例如，`"off"` 会变成 `["off"]`）；如果规则配置是数组，则直接使用该数组。
2. ESLint 会将规则配置数组的第一个元素验证为严重级别（`"off"`、`"warn"`、`"error"`、`0`、`1`、`2`）。
3. 如果严重级别是 `off` 或 `0`，则禁用规则并停止验证，忽略规则配置数组中的其他元素。
4. 如果规则已启用，则将数组中严重级别之后的所有元素复制到 `context.options` 数组中（例如，配置为 `["warn", "never", { someOption: 5 }]` 会得到 `context.options = ["never", { someOption: 5 }]`）。
5. 对 `context.options` 数组运行规则的 schema 验证。

注意，这意味着规则 schema 无法验证严重级别。规则 schema 只会验证规则配置中严重级别之后的数组元素。规则无法知道自己配置的严重级别。

规则的 `schema` 有两种格式：

- JSON Schema 对象数组
    - 每个元素都会与 `context.options` 数组中相同位置的元素进行验证。
    - 如果 `context.options` 数组中的元素少于 schema 的数量，则忽略未匹配的 schema。
    - 如果 `context.options` 数组中的元素多于 schema 的数量，则验证失败。
    - 使用此格式有两个重要结果：
        - 用户不向规则提供任何选项（严重级别除外）时，配置_始终有效_。
        - 如果指定空数组，用户向规则提供任何选项（严重级别除外）时，_始终会出错_。
- 用于验证 `context.options` 数组的完整 JSON Schema 对象
    - 即使规则只接受一个选项，schema 也应将待验证选项视为数组。
    - schema 可以任意复杂，因此你可以通过 `oneOf`、`anyOf` 等方式验证完全不同的潜在选项组合。
    - 支持的 JSON Schema 版本为 [Draft-04](https://json-schema.org/draft-04/schema)，因此无法使用 `if` 或 `$data` 等较新的功能。
        - 目前已明确计划，由于生态兼容性方面的考虑，不会将 schema 支持更新到此版本之后。更多背景信息请参阅[此评论](https://github.com/eslint/eslint/issues/13888#issuecomment-872591875)。

例如，`yoda` 规则接受主要模式参数 `"always"` 或 `"never"`，以及一个包含可选属性 `exceptRange` 的额外选项对象：

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

以下是等效的基于对象的 schema：

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

对象 schema 可以更精确、更严格地限制允许的内容。例如，以下 schema 始终要求指定第一个选项（0 到 10 之间的数字），但第二个选项是可选的，可以是带有明确设置选项的对象，也可以是 `"off"` 或 `"strict"`。

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

请记住，规则选项始终是一个数组，因此不要在顶层指定非数组类型的 schema。如果 schema 未在顶层指定数组，用户就_永远无法_启用你的规则，因为启用规则时其配置始终会无效。

以下是一个始终无法通过验证的 schema 示例：

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

**注意：** 如果规则 schema 使用 JSON Schema [`$ref`](https://json-schema.org/understanding-json-schema/structuring.html#ref) 属性，则必须使用完整的 JSON Schema 对象，而不能使用位置属性 schema 数组。这是因为 ESLint 会将数组简写转换为单个 schema，但不会更新引用，导致引用错误（并被忽略）。

如需了解更多有关 JSON Schema 的信息，我们建议查看 [JSON Schema 网站](https://json-schema.org/learn/miscellaneous-examples)上的示例，或阅读免费的电子书 [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)。

<a id="option-defaults"></a>

### 选项默认值

规则可以通过 `meta.defaultOptions` 数组指定任意选项的默认值。
在用户配置中启用规则时，ESLint 会将用户提供的选项元素递归合并到默认元素之上。

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

除非用户配置指定了不同的值，例如 `["error", { alias: "complex" }]`，否则规则运行时 `alias` 的值将为 `"basic"`。

选项数组中的每个元素均按以下规则合并：

- 缺失值或用户明确提供的 `undefined` 都会回退到默认选项。
- 用户提供的数组和 `undefined` 以外的基本类型值会覆盖默认选项。
- 用户提供的对象会与默认选项对象合并；如果默认值不是对象，则会被替换。

选项默认值也会根据规则的 `meta.schema` 进行验证。

**注意：** ESLint 内部使用 [Ajv](https://ajv.js.org) 验证 schema，并启用了其 [`useDefaults` 选项](https://ajv.js.org/guide/modifying-data.html#assigning-defaults)。
用户提供的选项和 `meta.defaultOptions` 选项都会覆盖规则 schema 中指定的任何默认值。
ESLint 可能会在未来的主要版本中禁用 Ajv 的 `useDefaults`。

<a id="accessing-shebangs"></a>

### 访问 Shebang

[Shebang（#!）](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) 由类型为 `"Shebang"` 的特殊令牌表示。它们会被视为注释，可使用[访问注释](#accessing-comments)一节中所述的方法访问，例如 `sourceCode.getAllComments()`。

<a id="accessing-variable-scopes"></a>

### 访问变量作用域

`SourceCode#getScope(node)` 方法会返回给定节点的作用域。它有助于查找给定作用域中的变量信息，以及这些变量在其他作用域中的使用方式。

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

**※1** 仅当配置的解析器提供块级作用域功能时适用。如果 `languageOptions.ecmaVersion` 不小于 `6`，默认解析器会提供块级作用域功能。<br>
**※2** 仅当 `for` 语句将迭代变量定义为块级作用域变量时适用（例如，`for (let i = 0;;) {}`）。<br>
**※3** 最近的、具有自身作用域的祖先节点的作用域。如果最近的祖先节点有多个作用域，则选择最内层的作用域（例如，如果 `Program#sourceType` 是 `"module"`，则 `Program` 节点同时具有 `global` 作用域和 `module` 作用域。最内层的作用域是 `module` 作用域）。<br>
**※4** 每个 `PropertyDefinition#value` 节点（可以是任何表达式节点类型）都有一个 `class-field-initializer` 作用域。例如，在 `class C { field = 1 }` 中，表示 `1` 的 `Literal` 节点具有 `class-field-initializer` 作用域。如果节点还有其他作用域，则 `class-field-initializer` 作用域是最外层作用域。例如，在 `class C { field = () => {} }` 中，`ArrowFunctionExpression` 节点有两个作用域：`class-field-initializer` 和 `function`。

<a id="scope-variables"></a>

#### 作用域变量

`Scope#variables` 属性包含一个 [`Variable` 对象](./scope-manager-interface#variable-interface)数组。这些是当前作用域中声明的变量。你可以使用这些 `Variable` 对象追踪整个模块中的变量引用。

每个 `Variable` 对象中的 `Variable#references` 属性包含一个 [`Reference` 对象](./scope-manager-interface#reference-interface)数组。该 `Reference` 数组包含模块源代码中引用此变量的所有位置。

每个 `Variable` 对象中的 `Variable#defs` 属性还包含一个 [`Definition` 对象](./scope-manager-interface#definition-interface)数组。你可以使用这些 `Definitions` 查找变量的定义位置。

全局变量还有以下附加属性：

- `Variable#writeable`（`boolean | undefined`）……如果为 `true`，则可以为此全局变量赋任意值。如果为 `false`，则此全局变量为只读。
- `Variable#eslintExplicitGlobal`（`boolean | undefined`）……如果为 `true`，则此全局变量是在源代码文件中通过 `/* globals */` 指令注释定义的。
- `Variable#eslintExplicitGlobalComments`（`Comment[] | undefined`）……在源代码文件中定义此全局变量的 `/* globals */` 指令注释数组。如果不存在 `/* globals */` 指令注释，此属性为 `undefined`。
- `Variable#eslintImplicitGlobalSetting`（`"readonly" | "writable" | undefined`）……配置文件中设置的值。如果存在 `/* globals */` 指令注释，此值可能与 `variable.writeable` 不同。

有关如何使用 `SourceCode#getScope()` 追踪变量的示例，请参阅以下内置规则的源代码：

- [no-shadow](https://github.com/eslint/eslint/blob/main/lib/rules/no-shadow.js)：在 `Program` 节点调用 `sourceCode.getScope()`，并检查所有子作用域，以确保变量名不会在更低层级的作用域中重复使用。（[no-shadow](../rules/no-shadow) 文档）
- [no-redeclare](https://github.com/eslint/eslint/blob/main/lib/rules/no-redeclare.js)：在每个作用域中调用 `sourceCode.getScope()`，以确保变量不会在同一作用域中声明两次。（[no-redeclare](../rules/no-redeclare) 文档）

<a id="marking-variables-as-used"></a>

### 将变量标记为已使用

某些 ESLint 规则（例如 [no-unused-vars](../rules/no-unused-vars)）会检查变量是否已使用。ESLint 本身只了解标准的变量访问方式，因此自定义的变量访问方式可能不会被识别为“已使用”。

为此，你可以使用 `sourceCode.markVariableAsUsed()` 方法。此方法接收两个参数：要标记为已使用的变量名称，以及一个可选的引用节点，用于指明你正在处理的作用域。以下是一个示例：

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

ESLint 在遍历 AST 时会分析代码路径。你可以通过与代码路径相关的七种事件访问代码路径对象。更多信息请参阅[代码路径分析](code-path-analysis)。

<a id="rule-unit-tests"></a>

## 规则单元测试

ESLint 提供 [`RuleTester`](../integrate/nodejs-api#ruletester) 工具，让规则测试的编写更加简单。

<a id="rule-naming-conventions"></a>

## 规则命名约定

虽然你可以为自定义规则指定任意名称，但核心规则遵循命名约定。让自定义规则采用相同的命名约定可能会更清晰。更多信息请参阅[核心规则命名约定](../contribute/core-rules#rule-naming-conventions)文档。

<a id="runtime-rules"></a>

## 运行时规则

你可以直接在配置文件中包含自定义规则。对于专用于你的项目或公司的规则来说，这种方式非常合适，因为这类规则可能不适合随 ESLint 一同发布或作为插件发布。

这些规则与其他所有规则的格式相同。像创建其他规则一样创建规则，然后按以下步骤操作：

1. 将规则导入你的[配置文件](../use/configure/configuration-files#configuration-file)。
2. 在 `plugins` 键下定义一个[虚拟插件](../use/configure/plugins#configure-a-virtual-plugin)，并将规则添加到其 `rules` 对象中。
3. 在 `rules` 键下指定规则的严重级别，并在规则 ID 前使用插件命名空间作为前缀（例如，`local/my-rule`）。只有严重级别为 `"warn"` 或 `"error"` 时，规则才会运行。

例如，如果规则位于 `rules/my-rule.js`，则配置文件如下所示：

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

ESLint 内置了跟踪单个规则性能的方法。设置 `TIMING` 环境变量后，代码检查完成时会显示运行时间最长的十条规则，并列出每条规则的运行时间（规则创建 + 规则执行）以及其占规则处理总时间（规则创建 + 规则执行）的相对比例。

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

要明确测试单条规则，请结合使用 `--no-config-lookup` 和 `--rule` 选项：

```bash
$ TIMING=1 eslint --no-config-lookup --rule "quotes: [2, 'double']" lib
Rule   | Time (ms) | Relative
:------|----------:|--------:
quotes |    18.066 |   100.0%
```

要查看更长的结果列表（超过 10 条），请将环境变量设为其他值，例如 `TIMING=50` 或 `TIMING=all`。

如需获取更细致的计时信息（按文件和规则细分），请改用 [`stats`](./stats) 选项。
