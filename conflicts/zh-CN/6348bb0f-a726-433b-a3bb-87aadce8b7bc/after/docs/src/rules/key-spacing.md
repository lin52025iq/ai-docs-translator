---
title: key-spacing
rule_type: layout
---
此规则要求对象字面量属性的冒号周围保持适当的空格。它可以逐个检查属性，也可以确保对象字面量中相邻属性的水平对齐。

<a id="rule-details"></a>

## 规则详情

此规则要求对象字面量属性中的键和值之间保持一致的空格。对于较长的行，可以在允许空白字符的位置换行。

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"beforeColon": false (default) | true`
    * `false`：禁止对象字面量中的键与冒号之间有空格。
    * `true`：要求对象字面量中的键与冒号之间至少有一个空格。
* `"afterColon": true (default) | false`
    * `true`：要求对象字面量中的冒号与值之间至少有一个空格。
    * `false`：禁止对象字面量中的冒号与值之间有空格。
* `"mode": "strict" (default) | "minimum"`
    * `"strict"`：要求对象字面量中的冒号前后恰好有一个空格。
    * `"minimum"`：要求对象字面量中的冒号前后至少有一个空格。
* `"align": "value" | "colon"`
    * `"value"`：要求对象字面量中的值水平对齐。
    * `"colon"`：要求对象字面量中的冒号和值都水平对齐。
* `"align"` 的值为对象时，可以对对象字面量中值的对齐间距进行精细设置。
* `"singleLine"` 指定单行对象字面量的空格样式。
* `"multiLine"` 指定多行对象字面量的空格样式。

请注意，你可以使用顶层选项，也可以使用分组选项（`singleLine` 和 `multiLine`），但不能同时使用两者。

<a id="beforecolon"></a>

### beforeColon

此规则使用默认选项 `{ "beforeColon": false }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", { "beforeColon": false }]*/

var obj = { "foo" : 42 };
```

:::

此规则使用默认选项 `{ "beforeColon": false }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "beforeColon": false }]*/

var obj = { "foo": 42 };
```

:::

此规则使用选项 `{ "beforeColon": true }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", { "beforeColon": true }]*/

var obj = { "foo": 42 };
```

:::

此规则使用选项 `{ "beforeColon": true }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "beforeColon": true }]*/

var obj = { "foo" : 42 };
```

:::

<a id="aftercolon"></a>

### afterColon

此规则使用默认选项 `{ "afterColon": true }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", { "afterColon": true }]*/

var obj = { "foo":42 };
```

:::

此规则使用默认选项 `{ "afterColon": true }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "afterColon": true }]*/

var obj = { "foo": 42 };
```

:::

此规则使用选项 `{ "afterColon": false }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", { "afterColon": false }]*/

var obj = { "foo": 42 };
```

:::

此规则使用选项 `{ "afterColon": false }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "afterColon": false }]*/

var obj = { "foo":42 };
```

:::

<a id="mode"></a>

### mode

此规则使用默认选项 `{ "mode": "strict" }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", { "mode": "strict" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```

:::

此规则使用默认选项 `{ "mode": "strict" }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "mode": "strict" }]*/

call({
    foobar: 42,
    bat: 2 * 2
});
```

:::

此规则使用选项 `{ "mode": "minimum" }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "mode": "minimum" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```

:::

<a id="align"></a>

### align

此规则使用选项 `{ "align": "value" }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", { "align": "value" }]*/

var obj = {
    a: value,
    bcde:  42,
    fg :   foo()
};
```

:::

此规则使用选项 `{ "align": "value" }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "align": "value" }]*/

var obj = {
    a:    value,
    bcde: 42,

    fg: foo(),
    h:  function() {
        return this.a;
    },
    ijkl: 'Non-consecutive lines form a new group'
};

var obj = { a: "foo", longPropertyName: "bar" };
```

:::

此规则使用选项 `{ "align": "colon" }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", { "align": "colon" }]*/

call({
    foobar: 42,
    bat:    2 * 2
});
```

:::

此规则使用选项 `{ "align": "colon" }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", { "align": "colon" }]*/

call({
    foobar: 42,
    bat   : 2 * 2
});
```

:::

<a id="align-1"></a>

### align

`align` 选项还可以通过 `beforeColon`、`afterColon`、`mode` 和 `on` 选项进行额外配置。

如果将 `align` 定义为对象，但未提供所有参数，则未定义的参数将采用以下默认值：

```js
// Defaults
align: {
    "beforeColon": false,
    "afterColon": true,
    "on": "colon",
    "mode": "strict"
}
```

以下代码在示例选项 `{ "align": { } }` 下**正确**：

::: correct

```js
/*eslint key-spacing: ["error", {
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "one"   : 1,
    "seven" : 7
}
```

:::

::: correct

```js
/*eslint key-spacing: ["error", {
    "align": {
        "beforeColon": false,
        "afterColon": false,
        "on": "value"
    }
}]*/

var obj = {
    "one":  1,
    "seven":7
}
```

:::

<a id="align-and-multiline"></a>

### align 和 multiLine

`multiLine` 和 `align` 选项可以采用不同配置，从而精细控制文件中的 `key-spacing`。如果将 `align` 配置为对象，它**不会**继承 `multiLine` 的设置。

每当对象字面量跨越多行时，都会使用 `multiLine`。同一对象中的属性形成一组时，则使用 `align` 配置。例如：

```javascript
var myObj = {
  key1: 1, // uses multiLine

  key2: 2, // uses align (when defined)
  key3: 3, // uses align (when defined)

  key4: 4 // uses multiLine
}

```

此规则使用示例选项 `{ "align": { }, "multiLine": { } }` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint key-spacing: ["error", {
    "multiLine": {
        "beforeColon": false,
        "afterColon":true
    },
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "myObjectFunction": function() {
        // Do something
    },
    "one"             : 1,
    "seven"           : 7
}
```

:::

此规则使用示例选项 `{ "align": { }, "multiLine": { } }` 时，以下代码**正确**：

::: correct

```js
/*eslint key-spacing: ["error", {
    "multiLine": {
        "beforeColon": false,
        "afterColon": true

    },
    "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "colon"
    }
}]*/

var obj = {
    "myObjectFunction": function() {
        // Do something
        //
    }, // These are two separate groups, so no alignment between `myObjectFunction` and `one`
    "one"   : 1,
    "seven" : 7 // `one` and `seven` are in their own group, and therefore aligned
}
```

:::

<a id="singleline-and-multiline"></a>

### singleLine 和 multiLine

此规则使用示例选项 `{ "singleLine": { }, "multiLine": { } }` 时，以下代码**正确**：

::: correct

```js
/*eslint "key-spacing": [2, {
    "singleLine": {
        "beforeColon": false,
        "afterColon": true
    },
    "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align": "colon"
    }
}]*/
var obj = { one: 1, "two": 2, three: 3 };
var obj2 = {
    "two" : 2,
    three : 3
};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你对属性间距另有约定，且该约定可能无法通过现有选项实现，或者希望同时允许多种样式，可以安全地禁用此规则。