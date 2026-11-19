---
title: no-throw-literal
rule_type: suggestion
---


通常认为，只应 `throw` `Error` 对象本身，或以 `Error` 对象为基类、用于定义用户自定义异常的对象。`Error` 对象的一个根本优势是，它们会自动记录自身的构建位置和来源。

此规则限制可作为异常抛出的内容。该规则最初创建时，只禁止抛出字面量（因此得名）；现在已扩展为仅允许可能是 `Error` 对象的表达式。

<a id="rule-details"></a>

## 规则详情

此规则旨在保持抛出异常时的一致性：禁止抛出字面量和其他不可能是 `Error` 对象的表达式。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-throw-literal: "error"*/

throw "error";

throw 0;

throw undefined;

throw null;

const err = new Error();
throw "an " + err;
// err is recast to a string literal

const er2 = new Error();
throw `${err2}`

```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-throw-literal: "error"*/

throw new Error();

throw new Error("error");

const e = new Error("error");
throw e;

try {
    throw new Error("error");
} catch (e) {
    throw e;
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="known-limitations"></a>

## 已知限制

由于静态分析的局限性，此规则无法保证你只会抛出 `Error` 对象。

以下代码符合此规则，但抛出的并非 `Error` 对象：

::: correct

```js
/*eslint no-throw-literal: "error"*/

const err = "error";
throw err;

function foo(bar) {
    console.log(bar);
}
throw foo("error");

throw new String("error");

const baz = {
    bar: "error"
};
throw baz.bar;
```

:::