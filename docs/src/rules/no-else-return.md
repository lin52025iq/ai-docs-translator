---
title: no-else-return
rule_type: suggestion
---



如果 `if` 代码块中包含 `return` 语句，那么 `else` 代码块就没有必要了。可以将其中的内容移到代码块之外。

```js
function foo() {
    if (x) {
        return y;
    } else {
        return z;
    }
}
```

<a id="rule-details"></a>
## 规则详情

此规则旨在指出 `if` 语句中包含 `return` 语句后出现的不必要代码块。因此，当一系列 `if` 语句（其中每个语句都包含 `return` 语句）之后出现 `else` 时，此规则会发出警告。

此规则的错误代码示例如下：

::: incorrect

```js
/*eslint no-else-return: "error"*/

function foo1() {
    if (x) {
        return y;
    } else {
        return z;
    }
}

function foo2() {
    if (x) {
        return y;
    } else {
        const t = "foo";
    }
}

function foo3() {
    if (error) {
        return 'It failed';
    } else {
        if (loading) {
            return "It's still loading";
        }
    }
}

// Two warnings for nested occurrences
function foo4() {
    if (x) {
        if (y) {
            return y;
        } else {
            return x;
        }
    } else {
        return z;
    }
}
```

:::

此规则的正确代码示例如下：

::: correct

```js
/*eslint no-else-return: "error"*/

function foo1() {
    if (x) {
        return y;
    }

    return z;
}

function foo2() {
    if (x) {
        return y;
    }

    const t = "foo";
}

function foo3() {
    if (error) {
        return 'It failed';
    }

    if (loading) {
        return "It's still loading";
    }   
}

function foo4() {
    if (x) {
        if (y) {
            return y;
        }

        return x;
    }

    return z;    
}

function foo5() {
  if (x) {
    const t = "foo";
  } else {
    return y
  }
}
```

:::

<a id="options"></a>
## 选项

### allowElseIf

此规则有一个对象选项：

* `allowElseIf: true`（默认值）- 如果为 true，则允许在 `return` 之后使用 `else if` 代码块。

默认选项 `{"allowElseIf": true}` 的正确代码示例如下：

::: correct

```js
/*eslint no-else-return: ["error", {allowElseIf: true}]*/

function foo() {
    if (error) {
        return 'It failed';
    } else if (loading) {
        return "It's still loading";
    }
}

// Using multiple `if` statements instead of `else if` is also allowed
function foo2() {
    if (error) {
        return 'It failed';
    }
  
    if (loading) {
        return "It's still loading";
    }
}
```

:::

选项 `{"allowElseIf": false}` 的错误代码示例如下：

::: incorrect

```js
/*eslint no-else-return: ["error", {allowElseIf: false}]*/

function foo() {
    if (error) {
        return 'It failed';
    } else if (loading) {
        return "It's still loading";
    }
}
```

:::

选项 `{"allowElseIf": false}` 的正确代码示例如下：

::: correct

```js
/*eslint no-else-return: ["error", {allowElseIf: false}]*/

function foo() {
    if (error) {
        return 'It failed';
    }

    if (loading) {
        return "It's still loading";
    }
}
```

:::
