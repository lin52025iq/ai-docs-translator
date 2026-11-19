---
title: block-scoped-var
rule_type: suggestion
further_reading:
- https://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting
---


`block-scoped-var` 规则会在变量被用于其定义所在代码块之外时发出警告。此规则模拟 C 风格的块级作用域。

<a id="rule-details"></a>

## 规则详情

此规则旨在减少变量在其绑定上下文之外的使用，并模拟其他语言中的传统块级作用域。这有助于语言初学者避免因变量提升而导致的棘手错误。

此规则的错误代码示例：

:::incorrect

```js
/*eslint block-scoped-var: "error"*/

function doIf() {
    if (true) {
        var build = true;
    }

    console.log(build);
}

function doIfElse() {
    if (true) {
        var build = true;
    } else {
        var build = false;
    }
}

function doTryCatch() {
    try {
        var build = 1;
    } catch (e) {
        var f = build;
    }
}

function doFor() {
    for (var x = 1; x < 10; x++) {
        var y = f(x);
    }
    console.log(y);
}

class C {
    static {
        if (something) {
            var build = true;
        }
        build = false;
    }
}
```

:::

此规则的正确代码示例：

:::correct

```js
/*eslint block-scoped-var: "error"*/

function doIf() {
    var build;

    if (true) {
        build = true;
    }

    console.log(build);
}

function doIfElse() {
    var build;

    if (true) {
        build = true;
    } else {
        build = false;
    }
}

function doTryCatch() {
    var build;
    var f;

    try {
        build = 1;
    } catch (e) {
        f = build;
    }
}

function doFor() {
    for (var x = 1; x < 10; x++) {
        var y = f(x);
        console.log(y);
    }
}

class C {
    static {
        var build = false;
        if (something) {
            build = true;
        }
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
