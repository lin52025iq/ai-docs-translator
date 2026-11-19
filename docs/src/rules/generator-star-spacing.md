---
title: generator-star-spacing
rule_type: layout
further_reading:
- https://leanpub.com/understandinges6/read/#leanpub-auto-generators
---
生成器是 ECMAScript 6 中一种新型函数，可以随时间推移返回多个值。
这种特殊函数通过在 `function` 关键字后放置 `*` 来表示。

生成器函数示例如下：

```js
function* generator() {
    yield "44";
    yield "55";
}
```

以下写法也有效：

```js
function *generator() {
    yield "44";
    yield "55";
}
```

这种写法同样有效：

```js
function * generator() {
    yield "44";
    yield "55";
}
```

为了在使用生成器时保持一致，本规则要求 `*` 固定在一个位置。

<a id="rule-details"></a>

## 规则详情

本规则旨在约束生成器函数的 `*` 周围的空格。

<a id="options"></a>

## 选项

本规则接受一个对象作为选项，其中有两个键 `"before"` 和 `"after"`，其值为布尔值 `true` 或 `false`。

* `"before"` 用于约束 `*` 和 `function` 关键字之间的空格。
  如果值为 `true`，则必须有一个空格；否则不允许有空格。

  对于对象字面量中的简写方法，由于其中没有 `function` 关键字，因此不会检查 `*` 前面的空格。

* `"after"` 用于约束 `*` 和函数名（或匿名生成器函数的左括号）之间的空格。
  如果值为 `true`，则必须有一个空格；否则不允许有空格。

默认值为 `{"before": true, "after": false}`。

配置示例：

```json
"generator-star-spacing": ["error", {"before": true, "after": false}]
```

该选项也支持使用字符串关键字作为简写：

* `{"before": true, "after": false}` → `"before"`
* `{"before": false, "after": true}` → `"after"`
* `{"before": true, "after": true}` → `"both"`
* `{"before": false, "after": false}` → `"neither"`

简写配置示例：

```json
"generator-star-spacing": ["error", "after"]
```

此外，此规则还允许针对不同函数类型使用覆盖配置，进一步控制行为。

* `named` 为具名函数提供覆盖配置
* `anonymous` 为匿名函数提供覆盖配置
* `method` 为类方法或属性函数简写提供覆盖配置

带覆盖配置的示例：

```json
"generator-star-spacing": ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}]
```

在上述配置示例中，顶层的 `"before"` 和 `"after"` 选项定义规则的默认行为，而 `"anonymous"` 和 `"method"` 选项则覆盖默认行为。
覆盖配置可以是包含 `"before"` 和 `"after"` 的对象，也可以是上述简写字符串。

<a id="before"></a>

### before

使用 `"before"` 选项时，符合此规则的代码示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": true, "after": false}]*/

function *generator() {}

var anonymous = function *() {};

var shorthand = { *generator() {} };
```

:::

<a id="after"></a>

### after

使用 `"after"` 选项时，符合此规则的代码示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": false, "after": true}]*/

function* generator() {}

var anonymous = function* () {};

var shorthand = { * generator() {} };
```

:::

<a id="both"></a>

### both

使用 `"both"` 选项时，符合此规则的代码示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": true, "after": true}]*/

function * generator() {}

var anonymous = function * () {};

var shorthand = { * generator() {} };
```

:::

<a id="neither"></a>

### neither

使用 `"neither"` 选项时，符合此规则的代码示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {"before": false, "after": false}]*/

function*generator() {}

var anonymous = function*() {};

var shorthand = { *generator() {} };
```

:::

存在覆盖配置时，不符合此规则的代码示例：

::: incorrect

```js
/*eslint generator-star-spacing: ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}]*/

function * generator() {}

var anonymous = function* () {};

var shorthand = { *generator() {} };

class Class { static* method() {} }
```

:::

存在覆盖配置时，符合此规则的代码示例：

::: correct

```js
/*eslint generator-star-spacing: ["error", {
    "before": false,
    "after": true,
    "anonymous": "neither",
    "method": {"before": true, "after": true}
}]*/

function* generator() {}

var anonymous = function*() {};

var shorthand = { * generator() {} };

class Class { static * method() {} }
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果项目不会使用生成器，或者你不在意空格的一致性，则无需使用此规则。
