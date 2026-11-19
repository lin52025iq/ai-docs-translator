---
title: rest-spread-spacing
rule_type: layout
further_reading:
- https://github.com/tc39/proposal-object-rest-spread
---
ES2015 引入了剩余运算符和展开运算符，它们可以将可迭代结构展开为各个组成部分。以下是一些用法示例：

```js
let numArr = [1, 2, 3];
function add(a, b, c) {
    return a + b + c;
}
add(...numArr); // -> 6

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
arr1.push(...arr2); // -> [1, 2, 3, 4, 5, 6]

let [a, b, ...arr] = [1, 2, 3, 4, 5];
a; // -> 1
b // -> 2
arr; // ->  [3, 4, 5]

function numArgs(...args) {
  return args.length;
}
numArgs(a, b, c); // -> 3
```

除此之外，目前还有一项提案，计划在规范中加入对象剩余和展开属性。用法如下：

```js

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // -> 1
y; // -> 2
z; // -> { a: 3, b: 4 }

let n = { x, y, ...z };
n; // -> { x: 1, y: 2, a: 3, b: 4 }
```

与其他运算符一样，剩余运算符或展开运算符与其操作的表达式之间可以有空白，这可能导致代码库中的空格使用不一致。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保剩余运算符和展开运算符与其表达式之间的空格用法一致。此规则还支持 ES2018 中的对象剩余和展开属性：

```json
{
    "languageOptions": {
        "ecmaVersion": 2018
    }
}
```

请阅读用户指南中关于[配置语言选项](../use/configure/language-options#specify-javascript-options)的章节，了解更多信息。

<a id="options"></a>

## 选项

此规则接受一个选项：值为 `"never"` 或 `"always"` 的字符串。默认值为 `"never"`。

### "never"

使用默认选项 `"never"` 时，展开运算符与其表达式之间不允许有空白。

```json
rest-spread-spacing: ["error"]
```

或

```json
rest-spread-spacing: ["error", "never"]
```

以下是此规则在选项 `"never"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint rest-spread-spacing: ["error", "never"]*/

fn(... args);
[... arr, 4, 5, 6];
let [a, b, ... arr] = [1, 2, 3, 4, 5];
function fn(... args) { console.log(args); }
let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ... z };
```

:::

以下是此规则在选项 `"never"` 下的**正确**代码示例：

::: correct

```js
/*eslint rest-spread-spacing: ["error", "never"]*/

fn(...args);
[...arr, 4, 5, 6];
let [a, b, ...arr] = [1, 2, 3, 4, 5];
function fn(...args) { console.log(args); }
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
```

:::

### "always"

使用选项 `"always"` 时，展开运算符与其表达式之间必须有空白。

```json
rest-spread-spacing: ["error", "always"]
```

以下是此规则在选项 `"always"` 下的**错误**代码示例：

::: incorrect

```js
/*eslint rest-spread-spacing:["error", "always"]*/

fn(...args);
[...arr, 4, 5, 6];
let [a, b, ...arr] = [1, 2, 3, 4, 5];
function fn(...args) { console.log(args); }
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
```

:::

以下是此规则在选项 `"always"` 下的**正确**代码示例：

::: correct

```js
/*eslint rest-spread-spacing: ["error", "always"]*/

fn(... args);
[... arr, 4, 5, 6];
let [a, b, ... arr] = [1, 2, 3, 4, 5];
function fn(... args) { console.log(args); }
let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ... z };
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不关心强制要求展开运算符与其表达式之间的空格用法保持一致，可以安全地禁用此规则。
