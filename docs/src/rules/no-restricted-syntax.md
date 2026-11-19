---
title: no-restricted-syntax
rule_type: suggestion
related_rules:
- no-alert
- no-console
- no-debugger
- no-restricted-properties
---


JavaScript 有很多语言特性，并非所有人都喜欢它们。因此，有些项目会选择完全禁止使用某些语言特性。例如，你可能决定禁止使用 `try-catch` 或 `class`，也可能决定禁止使用 `in` 运算符。

与其为每种想要禁用的语言特性分别创建规则，不如使用此规则配置要限制使用的语法元素。对于 JavaScript 语言，这些元素由其 [ESTree](https://github.com/estree/estree) 节点类型表示。例如，函数声明由 `FunctionDeclaration` 表示，`with` 语句由 `WithStatement` 表示。你可以使用 [代码浏览器](https://explorer.eslint.org) 确定表示代码的节点。

你还可以指定要限制的 [AST 选择器](../extend/selectors)，从而更精确地控制语法模式。

注意：此规则可用于 ESLint 代码检查的任何语言。要查看其他语言代码由哪些类型的节点组成，可以使用：

* 如果你在 ESLint 中使用 `typescript-eslint`，请使用 [typescript-eslint Playground](https://typescript-eslint.io/play)。
* 如果你使用 ESLint 检查 JavaScript、JSON、Markdown 或 CSS，请使用 [ESLint Code Explorer](https://explorer.eslint.org/)。

<a id="rule-details"></a>

## 规则详情

此规则禁止指定的（即用户定义的）语法。

<a id="options"></a>

## 选项

此规则接受一个字符串列表，其中每个字符串都是一个 AST 选择器：

```json
{
    "rules": {
        "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"]
    }
}
```

此外，此规则也接受对象，其中可以指定选择器和可选的自定义消息：

```json
{
    "rules": {
        "no-restricted-syntax": [
            "error",
            {
                "selector": "FunctionExpression",
                "message": "Function expressions are not allowed."
            },
            {
                "selector": "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
                "message": "setTimeout must always be invoked with two arguments."
            }
        ]
    }
}
```

如果通过 `message` 属性指定了自定义消息，ESLint 在报告 `selector` 属性指定的语法出现时会使用该消息。

可以根据需要在配置中自由混用字符串和对象格式。

以下是此规则在选项为 `"FunctionExpression", "WithStatement", BinaryExpression[operator='in']` 时的**错误**代码示例：

::: incorrect { "sourceType": "script" }

```js
/* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

with (me) {
    dontMess();
}

const doSomething = function () {};

foo in bar;
```

:::

以下是此规则在选项为 `"FunctionExpression", "WithStatement", BinaryExpression[operator='in']` 时的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/* eslint no-restricted-syntax: ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"] */

me.dontMess();

function doSomething() {};

foo instanceof bar;
```

:::

<a id="when-not-to-use-it"></a>

## 不适用的情况

如果你不想限制代码使用任何 JavaScript 特性或语法，就不应使用此规则。
