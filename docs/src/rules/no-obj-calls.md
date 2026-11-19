---
title: no-obj-calls
rule_type: problem
handled_by_typescript: true
further_reading:
- https://es5.github.io/#x15.8
---



ECMAScript 提供了多个旨在直接使用的全局对象。由于名称首字母大写，其中一些对象看起来像是构造函数（例如 `Math`、`JSON` 和 `Temporal`），但如果尝试将它们作为函数执行，就会抛出错误。

[ECMAScript 5 规范](https://es5.github.io/#x15.8)明确指出，`Math` 和 `JSON` 都不能被调用：

> Math 对象没有 `[[Call]]` 内部属性；无法将 Math 对象作为函数调用。

[ECMAScript 2015 规范](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect-object)明确指出，`Reflect` 不能被调用：

> Reflect 对象也没有 `[[Call]]` 内部方法；无法将 Reflect 对象作为函数调用。

[ECMAScript 2017 规范](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-atomics-object)明确指出，`Atomics` 不能被调用：

> Atomics 对象没有 `[[Call]]` 内部方法；无法将 Atomics 对象作为函数调用。

[ECMAScript 国际化 API 规范](https://tc39.es/ecma402/#intl-object)明确指出，`Intl` 不能被调用：

> Intl 对象没有 `[[Call]]` 内部方法；无法将 Intl 对象作为函数调用。

[Temporal 提案规范](https://tc39.es/proposal-temporal/#sec-temporal-objects)明确指出，`Temporal` 不能被调用：

> Temporal 对象没有 `[[Call]]` 内部方法；不能将其作为函数调用。

[ECMAScript 2020 规范](https://tc39.es/ecma262/2020/#sec-globalthis)将 `globalThis` 定义为当前领域的全局 `this` 值。除非宿主另有规定，否则它就是[全局对象](https://tc39.es/ecma262/2020/#sec-global-object)，该对象：

> 没有 `[[Construct]]` 内部方法；不能使用 `new` 运算符将其用作构造函数。
>
> 没有 `[[Call]]` 内部方法；不能将其作为函数调用。

<a id="rule-details"></a>

## 规则详情

此规则禁止将 `Math`、`JSON`、`Reflect`、`Atomics`、`Intl`、`Temporal` 和 `globalThis` 作为函数调用。

此规则也禁止使用 `new` 运算符将这些对象用作构造函数。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-obj-calls: "error"*/

const math = Math();

const newMath = new Math();

const json = JSON();

const newJSON = new JSON();

const reflect = Reflect();

const newReflect = new Reflect();

const atomics = Atomics();

const newAtomics = new Atomics();

const intl = Intl();

const newIntl = new Intl();

const temporal = Temporal();

const newTemporal = new Temporal();

const globalObject = globalThis();

const newGlobalObject = new globalThis();

```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-obj-calls: "error"*/

function area(r) {
    return Math.PI * r * r;
}

const object = JSON.parse("{}");

const value = Reflect.get({ x: 1, y: 2 }, "x");

const first = Atomics.load(foo, 0);

const segmenterFr = new Intl.Segmenter("fr", { granularity: "word" });

const instant = Temporal.Now.instant();

const parsed = globalThis.parseInt("42", 10);
```

:::

<a id="options"></a>

## 选项

此规则没有选项。
