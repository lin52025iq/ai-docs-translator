---
title: array-bracket-newline
rule_type: layout
related_rules:
- array-bracket-spacing
---
许多风格指南要求或禁止在数组方括号内换行。

<a id="rule-details"></a>

## 规则详情

此规则要求在数组左方括号后和右方括号前换行。

<a id="options"></a>

## 选项

此规则可以使用字符串选项：

* `"always"` 要求在方括号内换行
* `"never"` 禁止在方括号内换行
* `"consistent"` 要求每对方括号内的换行方式保持一致。如果一对方括号中有一个括号内换行，而另一个没有，则报告错误。

也可以使用对象选项（如果满足任意属性的条件，则要求换行；否则禁止换行）：

* `"multiline": true`（默认值）如果元素内或元素之间有换行，则要求换行。如果此值为 false，则禁用此条件。
* `"minItems": null`（默认值）如果元素数量至少达到给定的整数，则要求换行。如果此值为 0，此条件的效果与选项 `"always"` 相同。如果此值为 `null`（默认值），则禁用此条件。

<a id="always"></a>

### 始终换行

此规则在使用 `"always"` 选项时的错误代码示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", "always"]*/

const a = [];
const b = [1];
const c = [1, 2];
const d = [1,
    2];
const e = [function foo() {
    dosomething();
}];
```

:::

此规则在使用 `"always"` 选项时的正确代码示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", "always"]*/

const a = [
];
const b = [
    1
];
const c = [
    1, 2
];
const d = [
    1,
    2
];
const e = [
    function foo() {
        dosomething();
    }
];
```

:::

<a id="never"></a>

### 禁止换行

此规则在使用 `"never"` 选项时的错误代码示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", "never"]*/

const a = [
];
const b = [
    1
];
const c = [
    1, 2
];
const d = [
    1,
    2
];
const e = [
    function foo() {
        dosomething();
    }
];
```

:::

此规则在使用 `"never"` 选项时的正确代码示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", "never"]*/

const a = [];
const b = [1];
const c = [1, 2];
const d = [1,
    2];
const e = [function foo() {
    dosomething();
}];
```

:::

<a id="consistent"></a>

### 保持一致

此规则在使用 `"consistent"` 选项时的错误代码示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", "consistent"]*/

const a = [1
];
const b = [
    1];
const c = [function foo() {
    dosomething();
}
]
const d = [
    function foo() {
        dosomething();
    }]
```

:::

此规则在使用 `"consistent"` 选项时的正确代码示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", "consistent"]*/

const a = [];
const b = [
];
const c = [1];
const d = [
    1
];
const e = [function foo() {
    dosomething();
}];
const f = [
    function foo() {
        dosomething();
    }
];
```

:::

<a id="multiline"></a>

### 多行

此规则在使用默认选项 `{ "multiline": true }` 时的错误代码示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", { "multiline": true }]*/

const a = [
];
const b = [
    1
];
const c = [
    1, 2
];
const d = [1,
    2];
const e = [function foo() {
    dosomething();
}];
```

:::

此规则在使用默认选项 `{ "multiline": true }` 时的正确代码示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", { "multiline": true }]*/

const a = [];
const b = [1];
const c = [1, 2];
const d = [
    1,
    2
];
const e = [
    function foo() {
        dosomething();
    }
];
```

:::

<a id="minitems"></a>

### 最少元素数

此规则在使用 `{ "minItems": 2 }` 选项时的错误代码示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", { "minItems": 2 }]*/

const a = [
];
const b = [
    1
];
const c = [1, 2];
const d = [1,
    2];
const e = [
  function foo() {
    dosomething();
  }
];
```

:::

此规则在使用 `{ "minItems": 2 }` 选项时的正确代码示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", { "minItems": 2 }]*/

const a = [];
const b = [1];
const c = [
    1, 2
];
const d = [
    1,
    2
];
const e = [function foo() {
    dosomething();
}];
```

:::

<a id="multiline-and-minitems"></a>

### 多行和最少元素数

此规则在使用 `{ "multiline": true, "minItems": 2 }` 选项时的错误代码示例：

:::incorrect

```js
/*eslint array-bracket-newline: ["error", { "multiline": true, "minItems": 2 }]*/

const a = [
];
const b = [
    1
];
const c = [1, 2];
const d = [1,
    2];
const e = [function foo() {
    dosomething();
}];
```

:::

此规则在使用 `{ "multiline": true, "minItems": 2 }` 选项时的正确代码示例：

:::correct

```js
/*eslint array-bracket-newline: ["error", { "multiline": true, "minItems": 2 }]*/

const a = [];
const b = [1];
const c = [
    1, 2
];
const d = [
    1,
    2
];
const e = [
    function foo() {
        dosomething();
    }
];
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果不想强制要求在数组左方括号后和右方括号前换行，就不要启用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS：** [validateNewlineAfterArrayElements](https://jscs-dev.github.io/rule/validateNewlineAfterArrayElements)
