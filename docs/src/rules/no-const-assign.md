---
title: no-const-assign
rule_type: problem
handled_by_typescript: true
---



常量绑定不能被修改。尝试修改常量绑定会引发运行时错误。

<a id="rule-details"></a>

## 规则详情

此规则旨在标记使用 `const`、`using` 或 `await using` 关键字声明的变量被修改的情况。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-const-assign: "error"*/

const a = 0;
a = 1;
```

:::

::: incorrect

```js
/*eslint no-const-assign: "error"*/

const a = 0;
a += 1;
```

:::

::: incorrect

```js
/*eslint no-const-assign: "error"*/

const a = 0;
++a;
```

:::

::: incorrect

```js
/*eslint no-const-assign: "error"*/

if (foo) {
	using a = getSomething();
	a = somethingElse;
}

if (bar) {
	await using a = getSomething();
	a = somethingElse;
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-const-assign: "error"*/

const a = 0;
console.log(a);
```

:::

::: correct

```js
/*eslint no-const-assign: "error"*/

if (foo) {
	using a = getSomething();
	a.execute();
}

if (bar) {
	await using a = getSomething();
	a.execute();
}
```

:::

::: correct

```js
/*eslint no-const-assign: "error"*/

for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```

:::

::: correct

```js
/*eslint no-const-assign: "error"*/

for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不希望收到关于修改使用 `const`、`using` 和 `await using` 关键字声明的变量的提示，可以放心禁用此规则。
