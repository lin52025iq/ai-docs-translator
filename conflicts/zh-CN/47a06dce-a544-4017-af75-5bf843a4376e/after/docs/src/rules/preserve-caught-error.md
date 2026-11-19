---
title: preserve-caught-error
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
- https://nodejs.org/api/errors.html#errorcause
- https://github.com/tc39/proposal-error-cause/blob/main/README.md
- https://dev.to/amnish04/never-lose-valuable-error-context-in-javascript-3aco
- https://github.com/microsoft/TypeScript/blob/main/src/lib/es2022.error.d.ts
---

JavaScript 开发者经常会在 `catch` 块中重新抛出错误以补充上下文，却忘记保留原始错误，导致调试信息丢失。

抛出新错误时使用 `cause` 选项有助于保留原始错误并维护完整的错误链，从而提高可调试性和可追踪性。

```js
try {
	await fetch("https://xyz.com/resource");
} catch(error) {
	// Throw a more specific error without losing original context
	throw new Error("Failed to fetch resource", {
		cause: error
	});
}
```

<a id="rule-details"></a>

## 规则详情

此规则要求在 `catch` 块中抛出新错误时使用 `cause` 属性。

检查所有支持传入 `cause` 的内置 `error types`。

此规则的**错误**代码示例：

::: incorrect

```js
/* eslint preserve-caught-error: "error" */

// Not using the `cause` option
try {
    // ...
} catch (error) {
    throw new Error("Something went wrong: " + error.message);
}

// Throwing a new Error with unrelated cause
try {
	doSomething();
} catch (err) {
	const unrelated = new Error("other");
	throw new Error("Something failed", { cause: unrelated });
}

// Caught error is being lost partially due to destructuring
try {
	doSomething();
} catch ({ message, ...rest }) {
	throw new Error(message);
}

// Cause error is being shadowed by a closer scoped redeclaration.
try {
    doSomething();
} catch (error) {
    if (whatever) {
        const error = anotherError; // This declaration is the problem.
        throw new Error("Something went wrong", { cause: error });
    }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/* eslint preserve-caught-error: "error" */

try {
    // ...
} catch (error) {
    throw new Error("Something went wrong", { cause: error });
}

// When the thrown error is not directly related to the caught error.
try {
} catch (error) {
	foo = {
		bar() {
			// This throw is not directly related to the caught error.
			throw new Error("Something went wrong");
		}
	};
}

// No throw inside catch
try {
    doSomething();
} catch (e) {
    console.error(e);
}

// Ignoring the caught error at the parameter level
// This is valid by default, but this behavior can be changed
// by using the `requireCatchParameter` option discussed below.
try {
	doSomething();
} catch {
	throw new TypeError("Something went wrong");
}
```

:::

<a id="options"></a>

## 选项

此规则接受一个选项——一个具有以下可选属性的对象：

- `requireCatchParameter`：设为 `true` 时，要求 `catch` 块始终具有被捕获错误的参数。默认值为 `false`。
- `errorClassNames`：要检查是否保留 cause 的其他错误类名称。默认值为 `[]`。

### requireCatchParameter

启用此选项后，所有 catch 块都必须具有被捕获错误的参数。这样可以确保不会在参数层面丢弃被捕获的错误。

```js
"preserve-caught-error": ["error", {
  "requireCatchParameter": true
}]
```

`{ "requireCatchParameter": true }` 选项的**错误**代码示例：

::: incorrect

```js
/* eslint preserve-caught-error: ["error", { "requireCatchParameter": true }] */

try {
	doSomething();
} catch { // Can't discard the error ❌
	throw new Error("Something went wrong");
}
```

:::

`{ "requireCatchParameter": true }` 选项的**正确**代码示例：

::: correct

```js
/* eslint preserve-caught-error: ["error", { "requireCatchParameter": true }] */

try {
	doSomething();
} catch(error) { // Error is being referenced ✅
	// Handling and re-throw logic
}
```

:::

### errorClassNames

默认情况下，此规则只检查内置的 `Error` 类型（`Error`、`EvalError`、`RangeError`、`ReferenceError`、`SyntaxError`、`TypeError`、`URIError`、`AggregateError`）。使用 `errorClassNames` 还可以检查自定义错误类。

每个条目可以是字符串或对象：

- **字符串**用于指定类名。构造函数被假定为在第二个参数中接受选项对象，与内置 `Error` 的签名一致。
- 当构造函数在其他位置接受选项对象时，使用包含 `name` 和 `argumentPosition` 的**对象**。`argumentPosition` 从 1 开始计数。

```json
{
    "rules": {
        "preserve-caught-error": ["error", {
            "errorClassNames": [
                "AppError",
                { "name": "APIError", "argumentPosition": 3 }
            ]
        }]
    }
}
```

`{ "errorClassNames": ["AppError"] }` 选项的**错误**代码示例：

::: incorrect

```js
/* eslint preserve-caught-error: ["error", { "errorClassNames": ["AppError"] }] */

class AppError extends Error {}

try {
	doSomething();
} catch (err) {
	throw new AppError("Something failed");
}
```

:::

`{ "errorClassNames": ["AppError"] }` 选项的**正确**代码示例：

::: correct

```js
/* eslint preserve-caught-error: ["error", { "errorClassNames": ["AppError"] }] */

class AppError extends Error {}

try {
	doSomething();
} catch (err) {
	throw new AppError("Something failed", { cause: err });
}
```

:::

`{ "errorClassNames": [{ "name": "APIError", "argumentPosition": 3 }] }` 选项的**错误**代码示例：

::: incorrect

```js
/* eslint preserve-caught-error: ["error", { "errorClassNames": [{ "name": "APIError", "argumentPosition": 3 }] }] */

class APIError extends Error {
	constructor(message, statusCode, options) {
		super(message, options);
		this.statusCode = statusCode;
	}
}

try {
	doSomething();
} catch (err) {
	throw new APIError("Request failed", 500);
}
```

:::

`{ "errorClassNames": [{ "name": "APIError", "argumentPosition": 3 }] }` 选项的**正确**代码示例：

::: correct

```js
/* eslint preserve-caught-error: ["error", { "errorClassNames": [{ "name": "APIError", "argumentPosition": 3 }] }] */

class APIError extends Error {
	constructor(message, statusCode, options) {
		super(message, options);
		this.statusCode = statusCode;
	}
}

try {
	doSomething();
} catch (err) {
	throw new APIError("Request failed", 500, { cause: err });
}
```

:::

<a id="known-limitations"></a>

## 已知限制

`errorClassNames` 选项接受名称，而非对特定错误类的引用。此规则会在 AST 中匹配这些配置的名称，但不会解析作用域或类型信息。

因此，同名的本地类可能会遮蔽预期的错误类。此规则无法区分本地类和预期的类，因此可能会报告误报。

例如：

```js
/* eslint preserve-caught-error: ["error", { errorClassNames: ["AppError"] }] */

function makeWrapped() {
	class AppError {
		constructor(err) {
			this.original = err;
		}
	}

	try {
		doSomething();
	} catch (err) {
		throw new AppError(err);
	}
}
```

此处按名称配置了 `AppError`，但本地的 `AppError` 类与预期的全局类或导入类不同。此规则仍会匹配该名称，并可能报告缺少 `cause`，即使这个本地类的构造函数签名不同，也不接受包含 `cause` 的选项对象。

<a id="when-not-to-use-it"></a>

## 不应使用此规则的情况

以下情况可能不适合启用此规则：

- 你采用自定义错误处理方式，有意不在重新抛出的错误中包含原始错误（例如，为避免暴露内部细节，或单独记录原始错误）。

- 你使用第三方或内部错误处理库，通过非标准属性（例如 [verror](https://www.npmjs.com/package/verror)）而非 cause 选项来保留错误上下文。

- （少数情况下）你的目标运行环境较旧，不支持在 `Error` 构造函数中使用 cause 选项。
