---
title: array-element-newline
rule_type: layout
related_rules:
- array-bracket-spacing
- array-bracket-newline
- object-property-newline
- object-curly-spacing
- object-curly-newline
- max-statements-per-line
- block-spacing
- brace-style
---
许多代码风格指南要求或禁止数组元素之间换行。

<a id="rule-details"></a>

## 规则详情

此规则强制要求数组元素之间换行。

<a id="options"></a>

## 选项

此规则可接受字符串选项：

* `"always"`（默认值）要求数组元素之间换行
* `"never"` 禁止数组元素之间换行
* `"consistent"` 要求数组元素之间的换行方式保持一致

也可接受对象选项（只要满足其中任一属性的条件，就要求换行；否则禁止换行）：

* `"multiline": <boolean>` 如果元素内部有换行，则要求换行。如果此值为 false，则禁用此条件。
* `"minItems": <number>` 如果元素数量至少达到给定整数，则要求换行。如果此值为 0，则效果与选项 `"always"` 相同。如果此值为 `null`（默认值），则禁用此条件。

此外，还可以分别为数组表达式和数组模式指定不同的配置：

```json
{
    "array-element-newline": ["error", {
        "ArrayExpression": "consistent",
        "ArrayPattern": { "minItems": 3 },
    }]
}
```

* `"ArrayExpression"` 数组表达式的配置（如果未指定，此规则不适用于数组表达式）
* `"ArrayPattern"` 解构赋值中数组模式的配置（如果未指定，此规则不适用于数组模式）

<a id="always"></a>

### 始终换行

使用默认选项 `"always"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", "always"]*/

var c = [1, 2];
var d = [1, 2, 3];
var e = [1, 2, 3
];
var f = [
  1, 2, 3
];
var g = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

使用默认选项 `"always"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint array-element-newline: ["error", "always"]*/

var a = [];
var b = [1];
var c = [1,
    2];
var d = [1,
    2,
    3];
var d = [
  1, 
  2, 
  3
];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

<a id="never"></a>

### 禁止换行

使用选项 `"never"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", "never"]*/

var c = [
    1,
    2
];
var d = [
    1,
    2,
    3
];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

使用选项 `"never"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint array-element-newline: ["error", "never"]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1, 2, 3];
var e = [
    1, 2, 3];
var f = [
  1, 2, 3
];
var g = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

<a id="consistent"></a>

### 保持一致

使用选项 `"consistent"` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", "consistent"]*/

var a = [
    1, 2,
    3
];
var b = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    },
    function baz() {
        dosomething();
    }
];
```

:::

使用选项 `"consistent"` 时，此规则的正确代码示例：

:::correct

```js
/*eslint array-element-newline: ["error", "consistent"]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1, 2, 3];
var e = [
    1,
    2
];
var f = [
    1,
    2,
    3
];
var g = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }, function baz() {
        dosomething();
    }
];
var h = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    },
    function baz() {
        dosomething();
    }
];
```

:::

<a id="multiline"></a>

### 多行

使用选项 `{ "multiline": true }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "multiline": true }]*/

var d = [1,
    2, 3];
var e = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

使用选项 `{ "multiline": true }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "multiline": true }]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1, 2, 3];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

<a id="minitems"></a>

### 最少元素数

使用选项 `{ "minItems": 3 }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "minItems": 3 }]*/

var c = [1,
    2];
var d = [1, 2, 3];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

使用选项 `{ "minItems": 3 }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "minItems": 3 }]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1,
    2,
    3];
var e = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

<a id="multiline-and-minitems"></a>

### 多行与最少元素数

使用选项 `{ "multiline": true, "minItems": 3 }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "multiline": true, "minItems": 3 }]*/

var c = [1,
2];
var d = [1, 2, 3];
var e = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];
```

:::

使用选项 `{ "multiline": true, "minItems": 3 }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "multiline": true, "minItems": 3 }]*/

var a = [];
var b = [1];
var c = [1, 2];
var d = [1,
    2,
    3];
var e = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];
```

:::

<a id="arrayexpression-and-arraypattern"></a>

### ArrayExpression 与 ArrayPattern

使用选项 `{ "ArrayExpression": "always", "ArrayPattern": "never" }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint array-element-newline: ["error", { "ArrayExpression": "always", "ArrayPattern": "never" }]*/

var a = [1, 2];
var b = [1, 2, 3];
var c = [
    function foo() {
        dosomething();
    }, function bar() {
        dosomething();
    }
];

var [d,
    e] = arr;
var [f,
    g,
    h] = arr;
var [i = function foo() {
  dosomething()
},
j = function bar() {
  dosomething()
}] = arr
```

:::

使用选项 `{ "ArrayExpression": "always", "ArrayPattern": "never" }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint array-element-newline: ["error", { "ArrayExpression": "always", "ArrayPattern": "never" }]*/

var a = [1,
    2];
var b = [1,
    2,
    3];
var c = [
    function foo() {
        dosomething();
    },
    function bar() {
        dosomething();
    }
];

var [d, e] = arr
var [f, g, h] = arr
var [i = function foo() {
    dosomething()
}, j = function bar() {
    dosomething()
}] = arr
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果不希望强制要求数组元素之间换行，请勿启用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS：** [validateNewlineAfterArrayElements](https://jscs-dev.github.io/rule/validateNewlineAfterArrayElements)
