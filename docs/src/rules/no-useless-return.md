---
title: no-useless-return
rule_type: suggestion
---



`return;` 语句后没有任何内容，因此是多余的，不会影响函数的运行时行为。这可能会造成困惑，因此最好禁止这些多余的语句。

<a id="rule-details"></a>
## 规则详情

此规则旨在报告多余的 `return` 语句。

此规则的错误代码示例：

::: incorrect

```js
/* eslint no-useless-return: "error" */

const foo = function() { return; }

const bar = function() {
  doSomething();
  return;
}

const baz = function() {
  if (condition) {
    qux();
    return;
  } else {
    quux();
  }
}

const item = function() {
  switch (bar) {
    case 1:
      doSomething();
    default:
      doSomethingElse();
      return;
  }
}

```

:::

此规则的正确代码示例：

::: correct

```js
/* eslint no-useless-return: "error" */

const foo = function() { return 5; }

const bar = function() {
  return doSomething();
}

const baz = function() {
  if (condition) {
    qux();
    return;
  } else {
    quux();
  }
  qux();
}

const item = function() {
  switch (bar) {
    case 1:
      doSomething();
      return;
    default:
      doSomethingElse();
  }
}

const func = function() {
  for (const foo of bar) {
    return;
  }
}

```

:::

<a id="options"></a>
## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>
## 何时不使用

如果你不在意是否禁止多余的 return 语句，可以关闭此规则。
