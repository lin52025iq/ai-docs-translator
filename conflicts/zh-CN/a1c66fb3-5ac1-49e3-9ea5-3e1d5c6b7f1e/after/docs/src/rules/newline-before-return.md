---
title: newline-before-return
rule_type: layout
related_rules:
- newline-after-var
---

在 JavaScript 中，`return` 语句前是否应有空行，并没有硬性规定。不过，清楚地标示函数返回的位置，可以大大提高代码的可读性和清晰度。例如：

```js
function foo(bar) {
  var baz = 'baz';
  if (!bar) {
    bar = baz;
    return bar;
  }
  return bar;
}
```

添加换行可以将 `return` 语句与前面的代码明显分隔开，让函数在哪里退出以及返回什么值一目了然：

```js
function foo(bar) {
  var baz = 'baz';

  if (!bar) {
    bar = baz;

    return bar;
  }

  return bar;
}
```

<a id="rule-details"></a>

## 规则详情

此规则要求在 `return` 语句前留出一个空行，以提高代码清晰度；但如果 `return` 是语句组（例如 if 语句）中唯一的语句，则不作此要求。在后一种情况下，由于它本身就是唯一的语句，因此无需通过空行将 `return` 语句单独标示。注释会被忽略，也不计为空行。

此规则的错误代码示例：

::: incorrect

```js
/*eslint newline-before-return: "error"*/

function foo1(bar) {
    if (!bar) {
        return;
    }
    return bar;
}

function foo2(bar) {
    if (!bar) {
        return;
    }
    /* multi-line
    comment */
    return bar;
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint newline-before-return: "error"*/

function foo1() {
    return;
}

function foo2() {

    return;
}

function foo3(bar) {
    if (!bar) return;
}

function foo4(bar) {
    if (!bar) { return };
}

function foo5(bar) {
    if (!bar) {
        return;
    }
}

function foo6(bar) {
    if (!bar) {
        return;
    }

    return bar;
}

function foo7(bar) {
    if (!bar) {

        return;
    }
}

function foo8() {

    // comment
    return;
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你对 `return` 语句前的空白没有严格约定，可以放心地禁用此规则。
