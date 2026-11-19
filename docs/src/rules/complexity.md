---
title: complexity
rule_type: suggestion
related_rules:
- max-depth
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
further_reading:
- https://en.wikipedia.org/wiki/Cyclomatic_complexity
- https://ariya.io/2012/12/complexity-analysis-of-javascript-code
- https://web.archive.org/web/20231210222710/https://craftsmanshipforsoftware.com/2015/05/25/complexity-for-javascript/
- https://web.archive.org/web/20160808115119/http://jscomplexity.org/complexity
- https://github.com/eslint/eslint/issues/4808#issuecomment-167795140
---


圈复杂度用于衡量程序源代码中线性独立路径的数量。此规则允许设置圈复杂度阈值。

```js
function a(x) {
    if (true) {
        return x; // 1st path
    } else if (false) {
        return x+1; // 2nd path
    } else {
        return 4; // 3rd path
    }
}
```

<a id="rule-details"></a>
## 规则详情

此规则旨在通过限制程序允许的圈复杂度来降低代码复杂度。因此，当圈复杂度超过配置的阈值时（默认为 `20`），此规则会发出警告。

最大值为 `2` 时，以下代码**不正确**：

::: incorrect

```js
/*eslint complexity: ["error", 2]*/

function a(x) {
    if (true) {
        return x;
    } else if (false) {
        return x+1;
    } else {
        return 4; // 3rd path
    }
}

function b() {
    foo ||= 1;
    bar &&= 1;
}

function c(a = {}) { // default parameter -> 2nd path
    const { b = 'default' } = a; // default value during destructuring -> 3rd path
}

function d(a) {
    return a?.b?.c; // optional chaining with two optional properties creates two additional branches
}
```

:::

最大值为 `2` 时，以下代码**正确**：

::: correct

```js
/*eslint complexity: ["error", 2]*/

function a(x) {
    if (true) {
        return x;
    } else {
        return 4;
    }
}

function b() {
    foo ||= 1;
}
```

:::

类字段初始化器和类静态块都是隐式函数。因此，它们的复杂度会针对每个初始化器和每个静态块分别计算，且不会计入外围代码的复杂度。

最大值为 `2` 时，以下额外代码**不正确**：

::: incorrect

```js
/*eslint complexity: ["error", 2]*/

class C {
    x = a || b || c; // this initializer has complexity = 3
}

class D { // this static block has complexity = 3
    static {
        if (foo) {
            bar = baz || qux;
        }
    }
}
```

:::

最大值为 `2` 时，以下额外代码**正确**：

::: correct

```js
/*eslint complexity: ["error", 2]*/

function foo() { // this function has complexity = 1
    class C {
        x = a + b; // this initializer has complexity = 1
        y = c || d; // this initializer has complexity = 2
        z = e && f; // this initializer has complexity = 2

        static p = g || h; // this initializer has complexity = 2
        static q = i ? j : k; // this initializer has complexity = 2

        static { // this static block has complexity = 2
            if (foo) {
                baz = bar;
            }
        }

        static { // this static block has complexity = 2
            qux = baz || quux;
        }
    }
}
```

:::

<a id="options"></a>
## 选项

此规则的选项可以是数字或对象：

* `"max"`（默认值：`20`）用于设置复杂度上限

* `"variant": "classic" | "modified"`（默认值：`"classic"`）指定要使用的圈复杂度变体

<a id="max"></a>
### max

使用 `max` 属性自定义阈值。

```json
"complexity": ["error", { "max": 2 }]
```

**已弃用：**对象属性 `maximum` 已弃用。请改用 `max` 属性。

也可以使用简写语法：

```json
"complexity": ["error", 2]
```

<a id="variant"></a>
### variant

要使用的圈复杂度变体：

* `"classic"`（默认值）- 经典 McCabe 圈复杂度
* `"modified"` - 修改版圈复杂度

_修改版圈复杂度_与经典圈复杂度相同，但每个 `switch` 语句只会使复杂度值增加 `1`，无论其中包含多少个 `case` 语句。

在 `{ "max": 3, "variant": "modified" }` 选项下，以下代码对此规则而言**正确**：

::: correct

```js
/*eslint complexity: ["error", {"max": 3, "variant": "modified"}]*/

function a(x) {     // initial modified complexity is 1
    switch (x) {    // switch statement increases modified complexity by 1
        case 1:
            1;
            break;
        case 2:
            2;
            break;
        case 3:
            if (x === 'foo') {  // if block increases modified complexity by 1
                3;
            }
            break;
        default:
            4;
    }
}
```

:::

上述函数的经典圈复杂度为 `5`，而修改版圈复杂度仅为 `3`。

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果无法为代码确定合适的复杂度上限，最好禁用此规则。