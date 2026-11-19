---
title: no-useless-catch
rule_type: suggestion
---



仅重新抛出原始错误的 `catch` 子句是多余的，不会影响程序的运行时行为。这类多余的子句可能造成困惑并增加代码冗余，因此最好禁止使用不必要的 `catch` 子句。

<a id="rule-details"></a>

## 规则详情

此规则会报告仅 `throw` 捕获到的错误的 `catch` 子句。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-useless-catch: "error"*/

try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
} finally {
  cleanUp();
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-useless-catch: "error"*/

try {
  doSomethingThatMightThrow();
} catch (e) {
  doSomethingBeforeRethrow();
  throw e;
}

try {
  doSomethingThatMightThrow();
} catch (e) {
  handleError(e);
}

try {
  doSomethingThatMightThrow();
} finally {
  cleanUp();
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不希望收到有关不必要 catch 子句的提示，可以放心禁用此规则。