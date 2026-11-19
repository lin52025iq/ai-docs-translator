---
title: use-isnan
rule_type: problem
---



在 JavaScript 中，`NaN` 是 `Number` 类型的特殊值。它用于表示 IEEE 二进制浮点算术标准中规定的双精度 64 位格式所表示的所有“非数字”值。

由于在 JavaScript 中，`NaN` 是唯一一个不等于任何值（包括它自身）的值，因此与 `NaN` 进行比较的结果令人困惑：

* `NaN === NaN` 或 `NaN == NaN` 的结果为 `false`
* `NaN !== NaN` 或 `NaN != NaN` 的结果为 `true`

因此，请使用 `Number.isNaN()` 或全局 `isNaN()` 函数来测试某个值是否为 `NaN`。

<a id="rule-details"></a>

## 规则详情

此规则禁止与 `NaN` 进行比较。

此规则的错误代码示例：

::: incorrect

```js
/*eslint use-isnan: "error"*/

if (foo == NaN) {
    // ...
}

if (foo != NaN) {
    // ...
}

if (foo == Number.NaN) {
    // ...
}

if (foo != Number.NaN) {
    // ...
}
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint use-isnan: "error"*/

if (isNaN(foo)) {
    // ...
}

if (!isNaN(foo)) {
    // ...
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项，其中包含两个设置：

* `"enforceForSwitchCase": true`（默认值）还会禁止在 `switch` 语句中使用 `case NaN` 和 `switch(NaN)`。
* `"enforceForIndexOf": true` 还会禁止在 `indexOf` 和 `lastIndexOf` 方法中使用 `NaN`。默认值为 `false`，这表示此规则默认不会对 `indexOf(NaN)` 或 `lastIndexOf(NaN)` 方法调用发出警告。

### enforceForSwitchCase

`switch` 语句内部使用 `===` 比较运算符，将表达式的值与 case 分支进行匹配。
因此，它永远无法匹配 `case NaN`。同样，`switch(NaN)` 也永远无法匹配任何 case 分支。

当此规则的 `"enforceForSwitchCase"` 选项设为 `true`（默认值）时，以下代码会报错：

::: incorrect

```js
/*eslint use-isnan: ["error", {"enforceForSwitchCase": true}]*/

switch (foo) {
    case NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}

switch (foo) {
    case Number.NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (Number.NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}
```

:::

当此规则的 `"enforceForSwitchCase"` 选项设为 `true`（默认值）时，以下代码正确：

::: correct

```js
/*eslint use-isnan: ["error", {"enforceForSwitchCase": true}]*/

if (Number.isNaN(foo)) {
    bar();
} else {
    switch (foo) {
        case 1:
            baz();
            break;
        // ...
    }
}

if (Number.isNaN(a)) {
    bar();
} else if (Number.isNaN(b)) {
    baz();
} // ...
```

:::

当此规则的 `"enforceForSwitchCase"` 选项设为 `false` 时，以下代码正确：

::: correct

```js
/*eslint use-isnan: ["error", {"enforceForSwitchCase": false}]*/

switch (foo) {
    case NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}

switch (foo) {
    case Number.NaN:
        bar();
        break;
    case 1:
        baz();
        break;
    // ...
}

switch (Number.NaN) {
    case a:
        bar();
        break;
    case b:
        baz();
        break;
    // ...
}
```

:::

### enforceForIndexOf

以下方法内部使用 `===` 比较运算符，将给定值与数组元素进行匹配：

* [`Array.prototype.indexOf`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.indexof)
* [`Array.prototype.lastIndexOf`](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.lastindexof)

因此，对于任意数组 `foo`，`foo.indexOf(NaN)` 和 `foo.lastIndexOf(NaN)` 始终会返回 `-1`。

如果希望此规则报告 `indexOf(NaN)` 和 `lastIndexOf(NaN)` 方法调用，请将 `"enforceForIndexOf"` 设为 `true`。

当此规则的 `"enforceForIndexOf"` 选项设为 `true` 时，以下代码会报错：

::: incorrect

```js
/*eslint use-isnan: ["error", {"enforceForIndexOf": true}]*/

const hasNaN = myArray.indexOf(NaN) >= 0;

const firstIndex = myArray.indexOf(NaN);

const lastIndex = myArray.lastIndexOf(NaN);

const indexWithSequenceExpression = myArray.indexOf((doStuff(), NaN));

const firstIndexFromSecondElement = myArray.indexOf(NaN, 1);

const lastIndexFromSecondElement = myArray.lastIndexOf(NaN, 1);
```

:::

当此规则的 `"enforceForIndexOf"` 选项设为 `true` 时，以下代码正确：

::: correct

```js
/*eslint use-isnan: ["error", {"enforceForIndexOf": true}]*/

function myIsNaN(val) {
    return typeof val === "number" && isNaN(val);
}

function indexOfNaN(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (myIsNaN(arr[i])) {
            return i;
        }
    }
    return -1;
}

function lastIndexOfNaN(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (myIsNaN(arr[i])) {
            return i;
        }
    }
    return -1;
}

const hasNaN = myArray.some(myIsNaN);

const hasNaN1 = indexOfNaN(myArray) >= 0;

const firstIndex = indexOfNaN(myArray);

const lastIndex = lastIndexOfNaN(myArray);

// ES2015
const hasNaN2 = myArray.some(Number.isNaN);

// ES2015
const firstIndex1 = myArray.findIndex(Number.isNaN);

// ES2016
const hasNaN3 = myArray.includes(NaN);
```

:::

<a id="known-limitations"></a>

#### 已知限制

此选项会检查具有指定名称的方法，*即使*包含该方法的对象*并非*数组。