---
title: 代码路径分析
---

::: tip
本页适用于 JS [语言](./languages)的 ESLint 规则。这包括使用其他解析器处理 TypeScript 和 Vue 等 JS 语法扩展的规则，但不包括 CSS 或 Markdown 等无关语言的规则。
:::

ESLint 规则可以使用 API 分析代码路径。
代码路径表示程序执行时可能经过的控制流图。
它由代码路径段组成，这些段会在 `if`、`while`、`return`、`continue` 等分支结构和其他控制流语句处分叉和汇合。

以下是一个非常简单程序的代码路径图：

```js
if (someCondition()) {
	foo();
}
bar();
```

:::img-container
![代码路径示例](../assets/images/code-path-analysis/example-simple-if-branch.svg)
:::

::: tip
你可以使用 [Code Explorer](https://explorer.eslint.org) 查看任意 JavaScript 代码的代码路径图。
:::

<a id="objects"></a>

## 对象

一个程序/文件包含多个代码路径：一个用于全局/顶层执行，每个函数、类字段初始化器和类静态块各有一个。
代码路径分析 API 有两个基本对象：`CodePath` 和 `CodePathSegment`。

### `CodePath`

`CodePath` 对象描述程序中的一个控制流图。它具有以下属性：

- `id` (`string`) - 唯一标识代码路径的字符串。规则可以将 `id` 用作键，为每条代码路径保存其他信息。
- `origin` (`string`) - 在程序中创建该代码路径的结构。可能是 `"program"`、`"function"`、`"class-field-initializer"` 或 `"class-static-block"`。
- `initialSegment` (`CodePathSegment`) - 代码路径的初始段。
- `finalSegments` (`CodePathSegment[]`) - 代码路径的最终段，包括返回和抛出段。
- `returnedSegments` (`CodePathSegment[]`) - 代码路径的最终段，仅包含返回段。
- `thrownSegments` (`CodePathSegment[]`) - 代码路径的最终段，仅包含抛出段。
- `upper` (`CodePath | null`) - 包含当前代码路径的函数/类/全局作用域的代码路径。
- `childCodePaths` (`CodePath[]`) - 当前代码路径所包含的函数/类的代码路径。

`CodePath` 有以下方法：

- `traverseSegments(optionsOrCallback, callback)` - 按深度优先顺序，从初始段到最终段遍历此代码路径中所有可达的段。你可以选择传入一个包含 `first` (`CodePathSegment`) 和 `last` (`CodePathSegment`) 属性的选项对象，以限制遍历范围。回调接收一个 `CodePathSegment` 和一个控制器对象，并以当前 `CodePath` 作为 `this` 调用。控制器有一个 `skip()` 方法，用于跳过当前分支中的后续段；还有一个 `break()` 方法，用于停止遍历。

### `CodePathSegment`

`CodePathSegment` 是代码路径中不含分支的一部分。在程序中的每个分支点，一个 `CodePathSegment` 会结束，并包含指向后续可能的 `CodePathSegment` 的链接，从而构成有向图（通常可能包含循环，例如存在 `while` 循环时）。在程序分支汇合的情况下（例如 `if` 块之后），`CodePathSegment` 还包含指向可能的前序段的链接。

`CodePathSegment` 有以下属性：

- `id` (`string`) - 唯一标识代码路径段的字符串。规则可以将 `id` 用作键，为每个段保存其他信息。
- `nextSegments` (`CodePathSegment[]`) - 后续（可达）段。如果发生分叉，则有两个或更多；如果是最终段，则为空。
- `prevSegments` (`CodePathSegment[]`) - 前序（可达）段。如果发生汇合，则有两个或更多；如果是初始段，则为空。
- `allNextSegments` (`CodePathSegment[]`) - 后续段，包括可达和不可达的段。
- `allPrevSegments` (`CodePathSegment[]`) - 前序段，包括可达和不可达的段。
- `reachable` (`boolean`) - 表示此段是否可达的标志。在由 `return`、`throw`、`break` 或 `continue` 之后的段中，该值为 `false`。

<a id="accessing-code-paths"></a>

## 访问代码路径

要在规则中使用代码路径分析，可以在规则的 `create()` 方法所导出的对象中，为代码路径事件（详见下文）定义事件处理器；该对象也包含 AST 节点访问器。所有访问器（包括代码路径访问器）都会在遍历源代码的一次过程中，按源代码顺序调用。这意味着多个代码路径可能同时处于开放状态，需要手动跟踪（参见下文的示例[“跟踪当前段位置”](#track-current-segment-position)）。

```js
export default {
	meta: {
		// ...
	},
	create(context) {
		return {
			/**
			 * This is called at the start of traversing a code path.
			 *
			 * @param {CodePath} codePath - The new code path.
			 * @param {ASTNode} node - The current node.
			 * @returns {void}
			 */
			onCodePathStart(codePath, node) {
				// do something with codePath
			},

			/**
			 * This is called at the end of traversing a code path.
			 *
			 * @param {CodePath} codePath - The completed code path.
			 * @param {ASTNode} node - The current node.
			 * @returns {void}
			 */
			onCodePathEnd(codePath, node) {
				// do something with codePath
			},

			/**
			 * This is called when a reachable code path segment is
			 * entered.
			 *
			 * @param {CodePathSegment} segment - The new code path
			 * 	 segment.
			 * @param {ASTNode} node - The current node.
			 * @returns {void}
			 */
			onCodePathSegmentStart(segment, node) {
				// do something with segment
			},

			/**
			 * This is called when a reachable code path segment is
			 * exited.
			 *
			 * @param {CodePathSegment} segment - The left code path
			 *   segment.
			 * @param {ASTNode} node - The current node.
			 * @returns {void}
			 */
			onCodePathSegmentEnd(segment, node) {
				// do something with segment
			},

			/**
			 * This is called when an unreachable code path segment
			 * is entered.
			 *
			 * @param {CodePathSegment} segment - The entered code path
			 *   segment.
			 * @param {ASTNode} node - The current node.
			 * @returns {void}
			 */
			onUnreachableCodePathSegmentStart(segment, node) {
				// do something with segment
			},

			/**
			 * This is called when an unreachable code path segment
			 * is exited.
			 *
			 * @param {CodePathSegment} segment - The exited code path
			 *   segment.
			 * @param {ASTNode} node - The current node.
			 * @returns {void}
			 */
			onUnreachableCodePathSegmentEnd(segment, node) {
				// do something with segment
			},

			/**
			 * This is called just before exiting a reachable segment
			 * (`fromSegment`), if control flow leaving the segment
			 * can loop back to a position earlier in the source
			 * (the start of `toSegment`), for example at the end of
			 * a loop body or at a `continue;` statement. Note that
			 * in some cases `fromSegment === toSegment`, such as in
			 * simple `do...while` loops or `for (;;)` loops with an
			 * empty test/update expression.
			 *
			 * This event always occurs between `fromSegment`'s
			 * `onCodePathSegmentStart` and `onCodePathSegmentEnd`.
			 * While `toSegment`'s `onCodePathSegmentStart` must already
			 * have been called, its `onCodePathSegmentEnd` will
			 * have been called if and only if
			 * `toSegment !== fromSegment`.
			 *
			 * @param {CodePathSegment} fromSegment - The code path
			 *   segment the loop starts from.
			 * @param {CodePathSegment} toSegment - The code path
			 *   segment the loop goes to.
			 * @param {ASTNode} node - The current node.
			 * @returns {void}
			 */
			onCodePathSegmentLoop(fromSegment, toSegment, node) {
				// do something with segment
			},

			// AST node visitors...
		};
	},
};
```

::: important

在 ESLint 的旧版本（ESLint v9 之前）中，代码路径和代码路径段是在遍历过程中构建的，因此调用事件时，事件载荷中的代码路径和代码路径段只完成了部分初始化。

但从 ESLint v9 开始，ESLint 会在规则运行之前，对 AST 执行完整的预遍历，以构建完整的代码路径信息（[参见迁移指南](https://eslint.org/docs/latest/use/migrate-to-9.0.0#-code-paths-are-now-precalculated)）。这意味着在任何 `onCodePath*` 事件触发时，接收到的 `CodePath` 和 `CodePathSegment` 对象已经包含所有数据（例如 `childCodePaths`、`nextSegments`、`prevSegments`），甚至包括规则所见遍历中尚未访问的代码部分。你无需等待 `onCodePathEnd` 等后续事件，就可以安全地读取这些属性。

:::

::: warning

`CodePath` 和 `CodePathSegment` 对象是可变的，并且由所有代码路径事件和所有规则共享，因此规则必须注意不要修改它们。

:::

<a id="example-simple-program"></a>

### 示例：简单程序

请看下面这个简单但并非微不足道的程序：

```js
function foo(x) {
	if (x) {
		setTimeout(() => {
			console.log("logging x after 100 ms", x);
		}, 100);
	}
}

function bar(y) {
	if (typeof y === "string") {
		console.log(y);
	} else {
		console.log("not a string");
	}
}

if (Math.random() < 0.5) {
	foo();
} else {
	bar();
}
```

此程序有 4 条代码路径：

1. 顶层代码（`origin: "program"`）：

    :::img-container
    ![简单程序代码路径 1](../assets/images/code-path-analysis/example-simpleprogram-codepath1.svg)
    :::

1. 函数 `foo`（`origin: "function"`）：

    :::img-container
    ![简单程序代码路径 2](../assets/images/code-path-analysis/example-simpleprogram-codepath2.svg)
    :::

1. 在 `foo` 中定义的箭头函数回调（`origin: "function"`）：

    :::img-container
    ![简单程序代码路径 3](../assets/images/code-path-analysis/example-simpleprogram-codepath3.svg)
    :::

1. 函数 `bar`（`origin: "function"`）：

    :::img-container
    ![简单程序代码路径 4](../assets/images/code-path-analysis/example-simpleprogram-codepath4.svg)
    :::

其代码路径事件按以下顺序调用（缩进表示开始/结束事件对之间的嵌套关系）：

```text
onCodePathStart                  s1   (top level)
  onCodePathSegmentStart         s1_1 (before the `if`, up through its test)
    onCodePathStart              s2   (foo)
      onCodePathSegmentStart     s2_1 (before `if (x)`, up through its test)
      onCodePathSegmentEnd       s2_1
      onCodePathSegmentStart     s2_2 (`if (x)` true branch: the `setTimeout(...)` call)
        onCodePathStart          s3   (arrow function callback)
          onCodePathSegmentStart s3_1 (the whole callback body)
          onCodePathSegmentEnd   s3_1
        onCodePathEnd            s3
      onCodePathSegmentEnd       s2_2
      onCodePathSegmentStart     s2_3 (after `if (x)`; falls off the end of `foo`)
      onCodePathSegmentEnd       s2_3
    onCodePathEnd                s2
    onCodePathStart              s4   (bar)
      onCodePathSegmentStart     s4_1 (before the `if`, up through its test)
      onCodePathSegmentEnd       s4_1
      onCodePathSegmentStart     s4_2 (`if` true branch: `console.log(y)`)
      onCodePathSegmentEnd       s4_2
      onCodePathSegmentStart     s4_3 (`else` branch: `console.log("not a string")`)
      onCodePathSegmentEnd       s4_3
      onCodePathSegmentStart     s4_4 (after the `if`/`else`, where the branches join; falls off the end of `bar`)
      onCodePathSegmentEnd       s4_4
    onCodePathEnd                s4
  onCodePathSegmentEnd           s1_1
  onCodePathSegmentStart         s1_2 (top-level `if` true branch: the `foo();` call)
  onCodePathSegmentEnd           s1_2
  onCodePathSegmentStart         s1_3 (top-level `else` branch: the `bar();` call)
  onCodePathSegmentEnd           s1_3
  onCodePathSegmentStart         s1_4 (after the top-level `if`/`else`, where the branches join)
  onCodePathSegmentEnd           s1_4
onCodePathEnd                    s1
```

<a id="about-oncodepathsegmentloop"></a>

### 关于 `onCodePathSegmentLoop`

每当遍历到控制流循环返回到先前已进入过的段时，就会触发此事件。它主要在循环结束时触发。

请看下面这个 `while` 循环的代码路径：

```js
while (a) {
	a = foo();
}
bar();
```

:::img-container
![循环事件示例](../assets/images/code-path-analysis/loop-event-example-while.svg)
:::

此程序的事件顺序如下（缩进表示开始/结束事件对之间的嵌套关系）：

```text
onCodePathStart           (program)
  onCodePathSegmentStart  (before the loop)
  onCodePathSegmentEnd    (before the loop)
  onCodePathSegmentStart  (test: `a`)
  onCodePathSegmentEnd    (test: `a`)
  onCodePathSegmentStart  (body: `a = foo();`)
    onCodePathSegmentLoop (body -> test, highlighted above in red)
  onCodePathSegmentEnd    (body)
  onCodePathSegmentStart  (after the loop: `bar();`)
  onCodePathSegmentEnd    (after the loop)
onCodePathEnd             (program)
```

请注意，`onCodePathSegmentLoop` 在 `body` 段的 `onCodePathSegmentEnd` _之前_触发：它表示控制流从 `body` 末尾的位置循环返回到 `test`。由于 `test` 已在之前的步骤中完整遍历过，因此不会再次触发它的 `onCodePathSegmentStart`/`onCodePathSegmentEnd` 事件对。

`onCodePathSegmentLoop` 事件可用于分析循环中的控制流。例如，请参阅 [`no-unreachable-loop`](../rules/no-unreachable-loop) 的实现。

<a id="usage-examples"></a>

## 用法示例

<a id="track-current-segment-position"></a>

### 跟踪当前段位置

要跟踪当前代码路径段的位置，可以像这样定义规则：

```js
export default {
	meta: {
		// ...
	},
	create(context) {
		// tracks the code path we are currently in
		let currentCodePath;

		// a Set that tracks the segments we've traversed in the current code path
		let currentSegments;

		// stack to track the current Set of segments for all open paths.
		const allCurrentSegments = [];

		return {
			onCodePathStart(codePath) {
				currentCodePath = codePath;
				allCurrentSegments.push(currentSegments);
				currentSegments = new Set();
			},

			onCodePathEnd(codePath) {
				currentCodePath = codePath.upper;
				currentSegments = allCurrentSegments.pop();
			},

			onCodePathSegmentStart(segment) {
				currentSegments.add(segment);
			},

			onCodePathSegmentEnd(segment) {
				currentSegments.delete(segment);
			},

			onUnreachableCodePathSegmentStart(segment) {
				currentSegments.add(segment);
			},

			onUnreachableCodePathSegmentEnd(segment) {
				currentSegments.delete(segment);
			},
		};
	},
};
```

在此示例中，`currentCodePath` 变量用于访问当前正在遍历的代码路径，而 `currentSegments` 变量跟踪该代码路径中截至当前位置已遍历的段。请注意，`currentSegments` 起初和最后都是一个空集合，并会随着遍历进行而不断更新。

跟踪当前段的位置有助于分析到达特定节点的代码路径，下一示例便是如此。

<a id="find-an-unreachable-node"></a>

### 查找不可达节点

要查找不可达节点，请跟踪当前段的位置，然后使用节点访问器检查这些段中是否有可达段。例如，下面的代码会查找任何不可达的 `ExpressionStatement`。

```js
function areAnySegmentsReachable(segments) {
	for (const segment of segments) {
		if (segment.reachable) {
			return true;
		}
	}

	return false;
}

export default {
	meta: {
		// ...
	},
	create(context) {
		// tracks the code path we are currently in
		let currentCodePath;

		// a Set that tracks the segments we've traversed in the current code path
		let currentSegments;

		// stack to track the current Set of segments for all open paths.
		const allCurrentSegments = [];

		return {
			onCodePathStart(codePath) {
				currentCodePath = codePath;
				allCurrentSegments.push(currentSegments);
				currentSegments = new Set();
			},

			onCodePathEnd(codePath) {
				currentCodePath = codePath.upper;
				currentSegments = allCurrentSegments.pop();
			},

			onCodePathSegmentStart(segment) {
				currentSegments.add(segment);
			},

			onCodePathSegmentEnd(segment) {
				currentSegments.delete(segment);
			},

			onUnreachableCodePathSegmentStart(segment) {
				currentSegments.add(segment);
			},

			onUnreachableCodePathSegmentEnd(segment) {
				currentSegments.delete(segment);
			},

			ExpressionStatement(node) {
				// check all the code path segments that led to this node
				if (!areAnySegmentsReachable(currentSegments)) {
					context.report({ message: "Unreachable!", node });
				}
			},
		};
	},
};
```

另请参阅：
[no-unreachable](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-unreachable.js)、
[no-fallthrough](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-fallthrough.js)、
[consistent-return](https://github.com/eslint/eslint/blob/HEAD/lib/rules/consistent-return.js)

<a id="check-if-a-function-is-called-in-every-path"></a>

### 检查函数是否在每条路径中都被调用

此示例检查参数 `cb` 是否在每条路径中都被调用。

```js
function getCbParameter(codePath, node, context) {
	if (codePath.origin !== "function") {
		return null;
	}

	return (
		context.sourceCode
			.getDeclaredVariables(node)
			.find(
				variable =>
					variable.name === "cb" &&
					variable.defs.some(def => def.type === "Parameter"),
			) ?? null
	);
}

function hasPathWithoutCall(codePath, segmentsWithCall) {
	const visited = new Set();
	const stack = [codePath.initialSegment];

	while (stack.length > 0) {
		const segment = stack.pop();

		if (visited.has(segment) || segmentsWithCall.has(segment)) {
			continue;
		}
		visited.add(segment);

		if (codePath.finalSegments.includes(segment)) {
			return true;
		}

		stack.push(...segment.nextSegments);
	}

	return false;
}

export default {
	meta: {
		// ...
	},
	create(context) {
		let codePathInfo = null;
		const codePathInfoStack = [];

		return {
			onCodePathStart(codePath, node) {
				codePathInfoStack.push(codePathInfo);

				codePathInfo = {
					cbVariable: getCbParameter(codePath, node, context),
					currentSegments: new Set(),
					segmentsWithCall: new Set(),
				};
			},

			onCodePathEnd(codePath, node) {
				const { cbVariable, segmentsWithCall } = codePathInfo;

				codePathInfo = codePathInfoStack.pop();

				if (!cbVariable) {
					return;
				}

				if (hasPathWithoutCall(codePath, segmentsWithCall)) {
					context.report({
						message: "`cb` should be called in every path.",
						node,
					});
				}
			},

			onCodePathSegmentStart(segment) {
				codePathInfo.currentSegments.add(segment);
			},

			onCodePathSegmentEnd(segment) {
				codePathInfo.currentSegments.delete(segment);
			},

			CallExpression(node) {
				const { cbVariable } = codePathInfo;

				if (
					cbVariable?.references.some(
						reference => reference.identifier === node.callee,
					)
				) {
					for (const segment of codePathInfo.currentSegments) {
						codePathInfo.segmentsWithCall.add(segment);
					}
				}
			},
		};
	},
};
```

另请参阅：
[constructor-super](https://github.com/eslint/eslint/blob/HEAD/lib/rules/constructor-super.js)、
[no-this-before-super](https://github.com/eslint/eslint/blob/HEAD/lib/rules/no-this-before-super.js)

<a id="limitations"></a>

## 局限性

ESLint 的代码路径分析是对 JavaScript 程序实际运行时可能情况的近似，而不是精确模型。

例如，在现代 JavaScript 中，几乎任何操作在理论上都可能抛出异常，包括函数调用、属性访问，甚至[引用已声明的标识符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)。
不过，在 `try` 块之外，代码路径分析假定这些操作都会成功，而不会对每个可能抛出异常的位置进行建模。有关 `try` 结构内控制流的建模方式，请参阅下文的 `TryStatement` 示例。

另一个例子是，即使明确知道调用的是哪个函数，代码路径分析也会将所有函数调用视为不透明操作。请参阅下文的函数调用示例。

<a id="code-path-examples"></a>

## 代码路径示例

<a id="hello-world"></a>

### Hello World

```js
console.log("Hello world!");
```

:::img-container
![Hello World](../assets/images/code-path-analysis/example-hello-world.svg)
:::

### `IfStatement`

```js
if (a) {
	foo();
} else {
	bar();
}
```

:::img-container
![`IfStatement`](../assets/images/code-path-analysis/example-ifstatement.svg)
:::

<a id="ifstatement-chain"></a>

### `IfStatement`（链式）

```js
if (a) {
	foo();
} else if (b) {
	bar();
} else if (c) {
	baz();
}
```

:::img-container
![`IfStatement`（链式）](../assets/images/code-path-analysis/example-ifstatement-chain.svg)
:::

### `LogicalExpression`

请注意，由于短路行为，`&&` 和 `||` 都是分支结构。

```js
const foo = a && b;
```

:::img-container
![`Logical Expression`](../assets/images/code-path-analysis/example-logicalexpression.svg)
:::

### `SwitchStatement`

```js
switch (a) {
	case 0:
		foo();
		break;

	case 1:
	case 2:
		bar();
	// fallthrough

	case 3:
		baz();
		break;
}
```

:::img-container
![`SwitchStatement`](../assets/images/code-path-analysis/example-switchstatement.svg)
:::

<a id="switchstatement-has-default"></a>

### `SwitchStatement`（含 `default`）

```js
switch (a) {
	case 0:
		foo();
		break;

	case 1:
	case 2:
		bar();
	// fallthrough

	case 3:
		baz();
		break;

	default:
		quux();
		break;
}
```

:::img-container
![`SwitchStatement`（含 `default`）](../assets/images/code-path-analysis/example-switchstatement-has-default.svg)
:::

<a id="trystatement-try-catch"></a>

### `TryStatement`（try-catch）

```js
try {
	foo();
	if (a) {
		throw new Error();
	}
	bar();
} catch (err) {
	baz(err);
}
last();
```

代码路径分析会在以下位置建立从 `try` 块到 `catch` 块的路径：

- `throw` 语句。
- `try` 块中第一个可能抛出异常的节点（例如函数调用）。
- `try` 块的末尾。

:::img-container
![`TryStatement`（try-catch）](../assets/images/code-path-analysis/example-trystatement-try-catch.svg)
:::

<a id="trystatement-try-finally"></a>

### `TryStatement`（try-finally）

```js
try {
	foo();
	bar();
} finally {
	baz();
}
last();
```

如果没有 `catch` 块，`finally` 块会有两个当前段：正常路径和离开路径。请注意，即使 `try` 块中没有 `throw` 或 `return`，这里仍然存在离开路径，因为 `foo()` 这样的函数调用会被视为可能抛出异常。

如果对这段代码运行上文的“查找不可达节点”示例，在遍历 `finally` 块时，`currentSegments.size` 将为 `2`。

:::img-container
![`TryStatement`（try-finally）](../assets/images/code-path-analysis/example-trystatement-try-finally.svg)
:::

<a id="trystatement-try-catch-finally"></a>

### `TryStatement`（try-catch-finally）

```js
try {
	foo();
	bar();
} catch (err) {
	baz(err);
} finally {
	quux();
}
last();
```

:::img-container
![`TryStatement`（try-catch-finally）](../assets/images/code-path-analysis/example-trystatement-try-catch-finally.svg)
:::

### `WhileStatement`

```js
while (a) {
	foo();
	if (b) {
		continue;
	}
	bar();
}
```

:::img-container
![`WhileStatement`](../assets/images/code-path-analysis/example-whilestatement.svg)
:::

### `DoWhileStatement`

```js
do {
	foo();
	bar();
} while (a);
```

:::img-container
![`DoWhileStatement`](../assets/images/code-path-analysis/example-dowhilestatement.svg)
:::

### `ForStatement`

```js
for (let i = 0; i < 10; ++i) {
	foo();
	if (b) {
		break;
	}
	bar();
}
```

:::img-container
![`ForStatement`](../assets/images/code-path-analysis/example-forstatement.svg)
:::

<a id="forstatement-infinite-loop"></a>

### `ForStatement`（无限循环）

```js
for (;;) {
	foo();
}
bar();
```

:::img-container
![`ForStatement`（无限循环）](../assets/images/code-path-analysis/example-forstatement-infinite-loop.svg)
:::

### `ForInStatement`

```js
for (let key in obj) {
	foo(key);
}
```

:::img-container
![`ForInStatement`](../assets/images/code-path-analysis/example-forinstatement.svg)
:::

<a id="when-there-is-a-function"></a>

### 存在函数时

```js
function foo(a) {
	if (a) {
		return;
	}
	bar();
}

foo(false);
```

此程序由两条代码路径组成：

1. 全局代码路径

    :::img-container
    ![存在函数时——全局代码路径](../assets/images/code-path-analysis/example-when-there-is-a-function-1.svg)
    :::

1. 函数 `foo()` 的代码路径

    :::img-container
    ![存在函数时——函数代码路径](../assets/images/code-path-analysis/example-when-there-is-a-function-2.svg)
    :::

请注意，从包含 `foo()` 调用的代码路径段到包含 `foo()` 实现的代码路径段之间没有链接。这是因为在代码路径分析中，函数调用是不透明的，即使从源代码中可以明确判断调用的是哪个函数。

<a id="yieldexpression-in-generator-functions"></a>

### 生成器函数中的 `YieldExpression`

```js
function* generator(flag) {
	yield 1;
	if (flag) {
		foo();
	}
	bar();
}
```

在生成器函数中，`yield` 可以产生三条代码路径：

- 到下一个段。
- 到抛出路径。
- 到函数末尾。

:::img-container
![生成器函数中的 `YieldExpression`](../assets/images/code-path-analysis/example-yieldExpression-in-generator-functions.svg)
:::
