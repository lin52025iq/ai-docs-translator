---
title: no-sync
rule_type: suggestion
---

在 Node.js 中，大多数 I/O 都通过异步方法完成。不过，异步方法通常也有对应的同步版本。例如，`fs.exists()` 和 `fs.existsSync()`。在某些情况下，使用同步操作是可以接受的（例如 ESLint，编写命令行工具时）。但在其他情况下，使用同步操作被视为应当避免的不良实践。例如，如果你在 Node.js 上运行高流量 Web 服务器，就应仔细考虑是否允许任何可能导致服务器阻塞的同步操作。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止在 Node.js 中调用同步方法。它专门检查方法名后缀 "`Sync`"（这是 Node.js 操作的惯例）。

<a id="options"></a>

## 选项

此规则有一个可选的对象选项 `{ allowAtRootLevel: <boolean> }`，用于确定是否允许在文件顶层（即任何函数之外）调用同步方法。此选项默认为 `false`。

以下是使用默认选项 `{ allowAtRootLevel: false }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint no-sync: "error"*/

fs.existsSync(somePath);

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}
```

:::

以下是使用默认选项 `{ allowAtRootLevel: false }` 时符合此规则的代码示例：

::: correct

```js
/*eslint no-sync: "error"*/

obj.sync();

async(function() {
    // ...
});
```

:::

以下是使用选项 `{ allowAtRootLevel: true }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint no-sync: ["error", { allowAtRootLevel: true }]*/

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}

var bar = baz => fs.readFileSync(qux);
```

:::

以下是使用选项 `{ allowAtRootLevel: true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint no-sync: ["error", { allowAtRootLevel: true }]*/

fs.readFileSync(somePath).toString();
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你希望在脚本中允许使用同步操作，请勿启用此规则。
