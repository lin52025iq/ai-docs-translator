---
title: quote-props
rule_type: suggestion
further_reading:
- https://compat-table.github.io/compat-table/es5/#test-Object/array_literal_extensions_Reserved_words_as_property_names
- https://mathiasbynens.be/notes/javascript-properties
---
对象字面量的属性名可以通过两种方式定义：使用字面量或字符串。例如，下面两个对象是等价的：

```js
var object1 = {
    property: true
};

var object2 = {
    "property": true
};
```

在很多情况下，选择使用标识符而不是字符串，或反过来使用，并没有什么区别。即便如此，你可能还是会决定在代码中采用一致的风格。

不过，在某些情况下必须使用引号：

1. 如果你使用的是 ECMAScript 3 JavaScript 引擎（例如 IE8），并且想将关键字（例如 `if`）用作属性名。此限制已在 ECMAScript 5 中移除。
2. 如果你想在属性名中使用非标识符字符，例如包含空格的属性名，如 `"one two"`。

使用数字字面量作为属性键时，引号也会产生影响：

```js
var object = {
    1e2: 1,
    100: 2
};
```

乍看之下这似乎没问题，但实际上，这段代码在 ECMAScript 5 严格模式下会抛出语法错误。这是因为 `1e2` 和 `100` 在用作属性名之前会被强制转换为字符串。`String(1e2)` 和 `String(100)` 恰好都等于 `"100"`，因此会导致“严格模式下不允许对象字面量中出现重复的数据属性”错误。此类问题可能很难调试，所以有些人更倾向于要求所有属性名都加上引号。

<a id="rule-details"></a>

## 规则详情

此规则要求对象字面量的属性名使用引号。

<a id="options"></a>

## 选项

此规则有两个选项：字符串选项和对象选项。

字符串选项：

* `"always"`（默认值）要求所有对象字面量属性名都使用引号
* `"as-needed"` 禁止对并非必须加引号的对象字面量属性名使用引号
* `"consistent"` 强制使用一致的引号风格；在给定的对象中，所有属性都应加引号，或者都不加引号
* `"consistent-as-needed"` 如果有任何属性名必须加引号，则要求所有对象字面量属性名都加引号；否则禁止对对象属性名使用引号

对象选项：

* `"keywords": true` 要求将语言关键字用作对象属性名时加上引号（仅适用于使用 `as-needed` 或 `consistent-as-needed` 时）
* `"unnecessary": true`（默认值）禁止对并非必须加引号的对象字面量属性名使用引号（仅适用于使用 `as-needed` 时）
* `"unnecessary": false` 允许对并非必须加引号的对象字面量属性名使用引号（仅适用于使用 `as-needed` 时）
* `"numbers": true` 要求将数字用作对象属性名时加上引号（仅适用于使用 `as-needed` 时）

<a id="always"></a>

### always

使用默认选项 `"always"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint quote-props: ["error", "always"]*/

var object = {
    foo: "bar",
    baz: 42
};
```

:::

使用默认选项 `"always"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint quote-props: ["error", "always"]*/

var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42,
    'qux-lorem': true
};

var object3 = {
    foo() {
        return;
    }
};
```

:::

<a id="as-needed"></a>

### as-needed

使用选项 `"as-needed"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint quote-props: ["error", "as-needed"]*/

var object = {
    "a": 0,
    "0": 0,
    "true": 0,
    "null": 0
};
```

:::

使用选项 `"as-needed"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint quote-props: ["error", "as-needed"]*/

var object1 = {
    "a-b": 0,
    "0x0": 0,
    "1e2": 0
};

var object2 = {
    foo: 'bar',
    baz: 42,
    true: 0,
    0: 0,
    'qux-lorem': true
};

var object3 = {
    foo() {
        return;
    }
};
```

:::

<a id="consistent"></a>

### consistent

使用选项 `"consistent"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint quote-props: ["error", "consistent"]*/

var object1 = {
    foo: "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    baz: 42
};
```

:::

使用选项 `"consistent"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint quote-props: ["error", "consistent"]*/

var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42
};

var object3 = {
    foo: 'bar',
    baz: 42
};
```

:::

<a id="consistent-as-needed"></a>

### consistent-as-needed

使用选项 `"consistent-as-needed"` 时，此规则的错误代码示例：

::: incorrect

```js
/*eslint quote-props: ["error", "consistent-as-needed"]*/

var object1 = {
    foo: "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    'foo': 'bar',
    'baz': 42
};
```

:::

使用选项 `"consistent-as-needed"` 时，此规则的正确代码示例：

::: correct

```js
/*eslint quote-props: ["error", "consistent-as-needed"]*/

var object1 = {
    "foo": "bar",
    "baz": 42,
    "qux-lorem": true
};

var object2 = {
    foo: 'bar',
    baz: 42
};
```

:::

<a id="keywords"></a>

### keywords

使用选项 `"as-needed", { "keywords": true }` 时，此规则的其他错误代码示例：

::: incorrect

```js
/*eslint quote-props: ["error", "as-needed", { "keywords": true }]*/

var x = {
    while: 1,
    volatile: "foo"
};
```

:::

使用选项 `"consistent-as-needed", { "keywords": true }` 时，此规则的其他错误代码示例：

::: incorrect

```js
/*eslint quote-props: ["error", "consistent-as-needed", { "keywords": true }]*/

var x = {
    "prop": 1,
    "bar": "foo"
};
```

:::

<a id="unnecessary"></a>

### unnecessary

使用选项 `"as-needed", { "unnecessary": false }` 时，此规则的其他正确代码示例：

::: correct

```js
/*eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }]*/

var x = {
    "while": 1,
    "foo": "bar"  // Would normally have caused a warning
};
```

:::

<a id="numbers"></a>

### numbers

使用选项 `"as-needed", { "numbers": true }` 时，此规则的其他错误代码示例：

::: incorrect

```js
/*eslint quote-props: ["error", "as-needed", { "numbers": true }]*/

var x = {
    100: 1
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不在意属性名是否统一用引号括起来，并且不需要兼容旧版 ES3 环境，可以关闭此规则。
