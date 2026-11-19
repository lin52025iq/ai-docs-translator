---
title: no-unexpected-multiline
rule_type: problem
---



在 JavaScript 中，分号通常是可选的，因为 JavaScript 会自动插入分号（ASI）。你可以使用 [semi](./semi) 规则要求或禁止使用分号。

ASI 的规则相对简单：正如 Isaac Schlueter 曾经描述的那样，换行符总是会结束一条语句，就像分号一样，**但**以下情况除外：

* 语句有未闭合的圆括号、数组字面量或对象字面量，或者以其他无效方式结束。（例如，以 `.` 或 `,` 结尾。）
* 该行是 `--` 或 `++`（此时会对下一个 token 进行递减或递增操作。）
* 该行是 `for()`、`while()`、`do`、`if()` 或 `else`，且后面没有 `{`
* 下一行以 `[`, `(`, `+`, `*`, `/`, `-`, `,`、`.` 或其他只能出现在单个表达式中两个 token 之间的二元运算符开头。

在换行符**不会**结束语句的例外情况下，输入时忘记写分号会导致两条无关的连续代码行被解释为一个表达式。尤其是在不使用分号的编码风格中，读者可能会忽略这个错误。尽管语法正确，代码在执行时仍可能抛出异常。

<a id="rule-details"></a>

## 规则详情

此规则禁止容易造成混淆的多行表达式：换行看起来像是结束了一条语句，实际上却没有。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-unexpected-multiline: "error"*/

const foo = bar
(1 || 2).baz();

const hello = 'world'
[1, 2, 3].forEach(addNumber);

const x = function() {}
`hello`

const y = function() {}
y
`hello`

const z = foo
/regex/g.test(bar)
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unexpected-multiline: "error"*/

const foo = bar;
(1 || 2).baz();

const baz = bar
;(1 || 2).baz()

const hello = 'world';
[1, 2, 3].forEach(addNumber);

const hi = 'world'
void [1, 2, 3].forEach(addNumber);

const x = function() {};
`hello`

const tag = function() {}
tag `hello`
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你确信自己不会意外引入此类代码，可以关闭此规则。

请注意，[semi](semi) 规则不会标记此规则认定有问题的模式。
