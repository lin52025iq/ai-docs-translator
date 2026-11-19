---
title: global-require
rule_type: suggestion
---

在 Node.js 中，使用 `require()` 函数引入模块依赖，例如：

```js
var fs = require("fs");
```

虽然可以在代码中的任何位置调用 `require()`，但一些风格指南规定，只能在模块顶层调用它，以便更轻松地识别依赖。例如，如果依赖深深嵌套在函数和其他语句中，就很难识别：

```js
function foo() {
    if (condition) {
        var fs = require("fs");
    }
}
```

由于 `require()` 会同步加载模块，在其他位置使用它可能导致性能问题。

此外，ES6 模块规定，`import` 和 `export` 语句只能出现在模块主体的顶层。

<a id="rule-details"></a>

## 规则详情

此规则要求所有 `require()` 调用都位于模块顶层，与 ES6 的 `import` 和 `export` 语句类似，它们也只能出现在顶层。

此规则的错误代码示例：

::: incorrect { "sourceType": "script" }

```js
/*eslint global-require: "error"*/

// calling require() inside of a function is not allowed
function readFile(filename, callback) {
    var fs = require("fs");
    fs.readFile(filename, callback);
}

// conditional requires like this are also not allowed
if (DEBUG) {
    require("debug");
}

// a require() in a switch statement is also flagged
switch (x) {
    case "1":
        require("1");
        break;
}

// you may not require() inside an arrow function body
var getModule = (name) => require(name);

// you may not require() inside of a function body as well
function getModule(name) {
    return require(name);
}

// you may not require() inside of a try/catch block
try {
    require(unsafeModule);
} catch (e) {
    console.log(e);
}
```

:::

此规则的正确代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint global-require: "error"*/

// all these variations of require() are ok
require("x");
var y = require("y");
var z;
z = require("z").initialize();

// requiring a module and using it in a function is ok
var fs = require("fs");
function readFile(filename, callback) {
    fs.readFile(filename, callback);
}

// you can use a ternary to determine which module to require
var logger = DEBUG ? require("dev-logger") : require("logger");

// if you want you can require() at the end of your module
function doSomethingA() {}
function doSomethingB() {}
var x = require("x"),
    z = require("z");
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果某个模块必须使用来自文件系统的信息进行初始化，或者某个模块只在极少数情况下使用，而加载它会造成显著开销，那么禁用此规则可能是合理的。如果需要在 `try`/`catch` 中 `require()` 可选依赖，可以使用 `// eslint-disable-line global-require` 注释，仅针对该依赖禁用此规则。