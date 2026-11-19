---
title: default-case
rule_type: suggestion
related_rules:
- no-fallthrough
---


某些代码约定要求所有 `switch` 语句都包含一个 `default` 分支，即使该分支为空，例如：

```js
switch (foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
        break;

    default:
    // do nothing
}
```

这样做的理由是，最好始终明确说明默认行为是什么，这样就能看出开发者是否误忘了添加默认行为。

其他代码约定则允许省略 `default` 分支，只要有注释表明这是有意为之，例如：

```js
switch (foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
        break;

    // no default
}
```

同样，这样做的目的是表明开发者有意不设置默认行为。

<a id="rule-details"></a>

## 规则详情

此规则旨在要求 `switch` 语句包含 `default` 分支。如果没有 `default` 分支，可以选择在最后一个 `case` 后添加 `// no default`。注释可以使用任意大小写形式，例如 `// No Default`。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint default-case: "error"*/

switch (a) {
    case 1:
        /* code */
        break;
}

```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint default-case: "error"*/

switch (a) {
    case 1:
        /* code */
        break;

    default:
        /* code */
        break;
}

switch (a) {
    case 1:
        /* code */
        break;

    // no default
}

switch (a) {
    case 1:
        /* code */
        break;

    // No Default
}
```

:::

<a id="options"></a>

## 选项

此规则接受一个选项参数：

* 将 `commentPattern` 选项设为正则表达式字符串，以更改默认的 `/^no default$/i` 注释测试模式。

### commentPattern

`{ "commentPattern": "^skip\\sdefault" }` 选项的**正确**代码示例：

::: correct

```js
/*eslint default-case: ["error", { "commentPattern": "^skip\\sdefault" }]*/

switch(a) {
    case 1:
        /* code */
        break;

    // skip default
}

switch(a) {
    case 1:
        /* code */
        break;

    // skip default case
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果不想强制要求 `switch` 语句包含 `default` 分支，可以放心禁用此规则。
