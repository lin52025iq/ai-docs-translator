---
title: generator-star
further_reading:
- https://leanpub.com/understandinges6/read/#leanpub-auto-generators
---

强制生成器函数中星号周围的空格保持一致。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [generator-star-spacing](generator-star-spacing) 规则取代。
:::

生成器是 ECMAScript 6 中一种新型函数，可以随时间返回多个值。
这种特殊函数通过在 `function` 关键字后放置 `*` 来表示。

下面是生成器函数的示例：

```js
function* generator() {
    yield "44";
    yield "55";
}
```

下面这种写法也有效：

```js
function *generator() {
    yield "44";
    yield "55";
}
```

下面这种写法同样有效：

```js
function * generator() {
    yield "44";
    yield "55";
}
```

为使生成器的用法保持一致，此规则会强制 `*` 只能放在一个固定位置。

<a id="rule-details"></a>

## 规则详情

此规则会强制将 `*` 放在 `function` 关键字旁边或函数名称旁边。此规则唯一的选项是一个字符串，用于指定星号的位置。该选项可设为
`"start"`、`"middle"` 或 `"end"`。默认值为 `"end"`。

可以像这样在配置中设置样式：

```json
"generator-star": ["error", "start"]
```

使用 `"start"` 时，将强制采用以下位置：

```js
function* generator() {
}
```

使用 `"middle"` 时，将强制采用以下位置：

```js
function * generator() {
}
```

使用 `"end"` 时，将强制采用以下位置：

```js
function *generator() {
}
```

使用表达式语法时，`"start"` 将强制采用以下写法：

```js
var generator = function* () {
}
```

使用表达式语法时，`"middle"` 将强制采用以下写法：

```js
var generator = function * () {
}
```

使用表达式语法时，`"end"` 将强制采用以下写法：

```js
var generator = function *() {
}
```

使用表达式语法时，以下写法对 `"start"` 和 `"end"` 都有效：

```js
var generator = function*() {
}
```

生成器的对象字面量简写语法不受此规则影响。

<a id="when-not-to-use-it"></a>

## 不适用场景

如果项目中不会使用生成器，则无需使用此规则。
