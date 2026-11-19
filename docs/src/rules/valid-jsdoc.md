---
title: valid-jsdoc
rule_type: suggestion
related_rules:
- require-jsdoc
further_reading:
- https://jsdoc.app
---

:::important
此规则已在 ESLint v9.0.0 中移除，并由 [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc) 中的对应规则取代。
:::

[JSDoc](https://jsdoc.app) 可以从 JavaScript 代码中经过特殊格式编写的注释生成应用程序编程接口 (API) 文档。例如，以下是函数的 JSDoc 注释：

```js
/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

如果注释因拼写错误而无效，生成的文档就会不完整。

如果修改了函数定义，却没有更新注释，注释就会不一致，读者可能因此感到困惑。

<a id="rule-details"></a>

## 规则详情

此规则要求 JSDoc 注释有效且一致。它会报告以下问题：

* 缺少参数标签：`@arg`、`@argument` 或 `@param`
* 注释中的参数名称顺序与函数或方法中的顺序不一致
* 缺少返回值标签：`@return` 或 `@returns`
* 缺少参数或返回值类型
* 缺少参数或返回值说明
* 语法错误

此规则不会报告类、函数或方法缺少 JSDoc 注释的问题。

**注意：**此规则不支持 Google Closure 文档工具的所有使用场景。因此，即使 `/**number*/` 的用途是类型提示，而非函数的文档块，类似 `(/**number*/ n => n * 2);` 的代码仍会被标记为缺少适当的函数 JSDoc 注释。如果你以这种方式使用类型提示，我们不建议使用此规则。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint valid-jsdoc: "error"*/

// expected @param tag for parameter num1 but found num instead
// missing @param tag for parameter num2
// missing return type
/**
 * Add two numbers.
 * @param {number} num The first number.
 * @returns The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

// missing brace
// missing @returns tag
/**
 * @param {string name Whom to greet.
 */
function greet(name) {
    console.log("Hello " + name);
}

// missing parameter type for num1
// missing parameter description for num2
/**
 * Represents a sum.
 * @constructor
 * @param num1 The first number.
 * @param {number} num2
 */
function sum(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint valid-jsdoc: "error"*/

/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

// default options allow missing function description
// return type `void` means the function has no `return` statement
/**
 * @param {string} name Whom to greet.
 * @returns {void}
 */
function greet(name) {
    console.log("Hello " + name);
}

// @constructor tag allows missing @returns tag
/**
 * Represents a sum.
 * @constructor
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 */
function sum(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
}

// class constructor allows missing @returns tag
/**
 * Represents a sum.
 */
class Sum {
    /**
     * @param {number} num1 The first number.
     * @param {number} num2 The second number.
     */
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
}

// @abstract tag allows @returns tag without `return` statement
class Widget {
    /**
    * When the state changes, does it affect the rendered appearance?
    * @abstract
    * @param {Object} state The new state of the widget.
    * @returns {boolean} Is current appearance inconsistent with new state?
    */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}

// @override tag allows missing @param and @returns tags
class WonderfulWidget extends Widget {
    /**
     * @override
     */
    mustRender (state) {
        return state !== this.state; // shallow comparison
    }
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"prefer"` 强制使用一致的文档标签；选项对象的属性表示应使用的值，而不是键（例如，`"return": "returns"` 表示应使用 `@returns` 而不是 `@return`）
* `"preferType"` 强制使用选项对象指定的一致类型字符串；属性表示应使用的值，而不是键（例如，`"object": "Object"` 表示应使用 `Object` 而不是 `object`）
* `"requireReturn"` 要求使用返回值标签：
    * `true`（默认值）：**即使**函数或方法没有 `return` 语句也要求使用（此选项值不适用于构造函数）
    * `false`：**当且仅当**函数或方法有 `return` 语句或返回值（例如 `async` 函数）时才要求使用（此选项值适用于构造函数）
* `"requireReturnType": false` 允许返回值标签缺少类型
* `"matchDescription"` 指定一个正则表达式（字符串），用于匹配每条 JSDoc 注释中的说明（例如，`".+"` 要求提供说明；此选项不适用于参数或返回值标签中的说明）
* `"requireParamDescription": false` 允许参数标签缺少说明
* `"requireReturnDescription": false` 允许返回值标签缺少说明
* `"requireParamType": false` 允许参数标签缺少类型

### prefer

使用示例选项 `"prefer": { "arg": "param", "argument": "param", "class": "constructor", "return": "returns", "virtual": "abstract" }` 时，此规则的其他**错误**代码示例：

::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "prefer": { "arg": "param", "argument": "param", "class": "constructor", "return": "returns", "virtual": "abstract" } }]*/

/**
 * Add two numbers.
 * @arg {number} num1 The first number.
 * @arg {number} num2 The second number.
 * @return {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

/**
 * Represents a sum.
 * @class
 * @argument {number} num1 The first number.
 * @argument {number} num2 The second number.
 */
function sum(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
}

class Widget {
    /**
     * When the state changes, does it affect the rendered appearance?
     * @virtual
     * @argument {Object} state The new state of the widget.
     * @return {boolean} Is current appearance inconsistent with new state?
     */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}
```

:::

### preferType

使用示例选项 `"preferType": { "Boolean": "boolean", "Number": "number", "object": "Object", "String": "string" }` 时，此规则的其他**错误**代码示例：

::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "preferType": { "Boolean": "boolean", "Number": "number", "object": "Object", "String": "string" } }]*/

/**
 * Add two numbers.
 * @param {Number} num1 The first number.
 * @param {Number} num2 The second number.
 * @returns {Number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}

/**
 * Output a greeting as a side effect.
 * @param {String} name Whom to greet.
 * @returns {void}
 */
function greet(name) {
    console.log("Hello " + name);
}

class Widget {
    /**
     * When the state changes, does it affect the rendered appearance?
     * @abstract
     * @param {object} state The new state of the widget.
     * @returns {Boolean} Is current appearance inconsistent with new state?
     */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}
```

:::

### requireReturn

使用选项 `"requireReturn": false` 时，此规则的其他**错误**代码示例：

::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "requireReturn": false }]*/

// unexpected @returns tag because function has no `return` statement
/**
 * @param {string} name Whom to greet.
 * @returns {string} The greeting.
 */
function greet(name) {
    console.log("Hello " + name);
}

// add @abstract tag to allow @returns tag without `return` statement
class Widget {
    /**
     * When the state changes, does it affect the rendered appearance?
     * @param {Object} state The new state of the widget.
     * @returns {boolean} Is current appearance inconsistent with new state?
     */
    mustRender (state) {
        throw new Error("Widget subclass did not implement mustRender");
    }
}
```

:::

使用选项 `"requireReturn": false` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireReturn": false }]*/

/**
 * @param {string} name Whom to greet.
 */
function greet(name) {
    console.log("Hello " + name);
}
```

:::

### requireReturnType

使用选项 `"requireReturnType": false` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireReturnType": false }]*/

/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

### requireParamType

使用选项 `"requireParamType": false` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireParamType": false }]*/

/**
 * Add two numbers.
 * @param num1 The first number.
 * @param num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

### matchDescription

使用示例选项 `"matchDescription": ".+"` 时，此规则的其他**错误**代码示例：

::: incorrect

```js
/*eslint valid-jsdoc: ["error", { "matchDescription": ".+" }]*/

// missing function description
/**
 * @param {string} name Whom to greet.
 * @returns {void}
 */
function greet(name) {
    console.log("Hello " + name);
}
```

:::

### requireParamDescription

使用选项 `"requireParamDescription": false` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireParamDescription": false }]*/

/**
 * Add two numbers.
 * @param {number} num1
 * @param {number} num2
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

### requireReturnDescription

使用选项 `"requireReturnDescription": false` 时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint valid-jsdoc: ["error", { "requireReturnDescription": false }]*/

/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number}
 */
function add(num1, num2) {
    return num1 + num2;
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不使用 JSDoc，可以放心关闭此规则。
