---
title: no-fallthrough
rule_type: problem
related_rules:
- default-case
---



JavaScript 中的 `switch` 语句是较容易出错的语言结构之一，部分原因在于它可以从一个 `case`“贯穿”到下一个 `case`。例如：

```js
switch(foo) {
    case 1:
        doSomething();

    case 2:
        doSomethingElse();
}
```

在此示例中，如果 `foo` 的值为 `1`，执行过程就会贯穿两个分支，因为第一个分支会继续执行第二个分支。你可以像下面这样使用 `break` 来避免这种情况：

```js
switch(foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomethingElse();
}
```

如果你不希望发生贯穿，这样做就没有问题。但如果贯穿是有意为之呢？语言本身并没有提供表示这一意图的方式。最佳实践是，始终使用注释标明有意贯穿；注释应匹配正则表达式 `/falls?\s?through/i`，但不能是指令：

```js
switch(foo) {
    case 1:
        doSomething();
        // falls through

    case 2:
        doSomethingElse();
}

switch(foo) {
    case 1:
        doSomething();
        // fall through

    case 2:
        doSomethingElse();
}

switch(foo) {
    case 1:
        doSomething();
        // fallsthrough

    case 2:
        doSomethingElse();
}

switch(foo) {
    case 1: {
        doSomething();
        // falls through
    }

    case 2: {
        doSomethingElse();
    }
}
```

在此示例中，预期行为一目了然：第一个分支显然有意贯穿到第二个分支。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除一个分支意外贯穿到另一个分支的情况。因此，它会标记所有未通过注释标明的贯穿情形。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-fallthrough: "error"*/

switch(foo) {
    case 1:
        doSomething();

    case 2:
        doSomething();
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-fallthrough: "error"*/

switch(foo) {
    case 1:
        doSomething();
        break;

    case 2:
        doSomething();
}

function bar(foo) {
    switch(foo) {
        case 1:
            doSomething();
            return;

        case 2:
            doSomething();
    }
}

switch(foo) {
    case 1:
        doSomething();
        throw new Error("Boo!");

    case 2:
        doSomething();
}

switch(foo) {
    case 1:
    case 2:
        doSomething();
}

switch(foo) {
    case 1: case 2:
        doSomething();
}

switch(foo) {
    case 1:
        doSomething();
        // falls through

    case 2:
        doSomething();
}

switch(foo) {
    case 1: {
        doSomething();
        // falls through
    }

    case 2: {
        doSomethingElse();
    }
}
```

:::

请注意，这些示例中的最后一个 `case` 语句不会触发警告，因为它后面没有可贯穿到的分支。

<a id="options"></a>

## 选项

此规则有一个对象选项：

* 将 `commentPattern` 选项设为正则表达式字符串，以更改用于检测有意贯穿注释的匹配条件。如果贯穿注释与某个指令匹配，则指令优先于 `commentPattern`。

* 将 `allowEmptyCase` 选项设为 `true`，即可允许空分支，而不受布局影响。默认情况下，只有当空 `case` 和下一个 `case` 位于同一行或相邻行时，此规则才不要求在空 `case` 后添加贯穿注释。

* 将 `reportUnusedFallthroughComment` 选项设为 `true`，即可禁止在分支因不可达而无法贯穿时出现贯穿注释。此选项主要用于避免重构后留下误导性注释。

### commentPattern

`{ "commentPattern": "break[\\s\\w]*omitted" }` 选项的正确代码示例：

::: correct

```js
/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

switch(foo) {
    case 1:
        doSomething();
        // break omitted

    case 2:
        doSomething();
}

switch(foo) {
    case 1:
        doSomething();
        // caution: break is omitted intentionally

    default:
        doSomething();
}
```

:::

### allowEmptyCase

`{ "allowEmptyCase": true }` 选项的正确代码示例：

::: correct

```js
/* eslint no-fallthrough: ["error", { "allowEmptyCase": true }] */

switch(foo){
    case 1:

    case 2: doSomething();
}

switch(foo){
    case 1:
    /*
    Put a message here 
    */
    case 2: doSomething();
}

```

:::

### reportUnusedFallthroughComment

`{ "reportUnusedFallthroughComment": true }` 选项的错误代码示例：

::: incorrect

```js
/* eslint no-fallthrough: ["error", { "reportUnusedFallthroughComment": true }] */

switch(foo){
    case 1:
        doSomething();
        break;
    // falls through
    case 2: doSomething();
}

function f() {
    switch(foo){
        case 1:
            if (a) {
                throw new Error();
            } else if (b) {
                break;
            } else {
                return;
            }
        // falls through
        case 2:
            break;
    }
}
```

:::

`{ "reportUnusedFallthroughComment": true }` 选项的正确代码示例：

::: correct

```js
/* eslint no-fallthrough: ["error", { "reportUnusedFallthroughComment": true }] */

switch(foo){
    case 1:
        doSomething();
        break;
    // just a comment
    case 2: doSomething();
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不想强制要求每个 `case` 语句都以 `throw`、`return`、`break` 或注释结束，就可以安全地关闭此规则。
