---
title: camelcase
rule_type: suggestion
---


在变量命名方面，风格指南通常分为两派：驼峰命名法（`variableName`）和下划线命名法（`variable_name`）。本规则关注驼峰命名法。如果你的风格指南要求变量名采用驼峰命名法，那么本规则正适合你！

<a id="rule-details"></a>

## 规则详情

本规则会查找源代码中所有的下划线（`_`）。它会忽略开头和结尾的下划线，只检查变量名中间的下划线。如果 ESLint 判断变量是常量（全大写），则不会发出警告；否则会发出警告。本规则只标记定义和赋值，不标记函数调用。对于 ES6 `import` 语句，本规则只检查将要导入到本地模块作用域中的变量名。

<a id="options"></a>

## 选项

本规则有一个对象选项：

* `"properties": "always"`（默认值）要求属性名使用驼峰命名法
* `"properties": "never"` 不检查属性名
* `"ignoreDestructuring": false`（默认值）要求解构标识符使用驼峰命名法
* `"ignoreDestructuring": true` 不检查解构标识符（但仍会检查这些标识符之后在代码中的任何用法）
* `"ignoreImports": false`（默认值）要求 ES2015 导入使用驼峰命名法
* `"ignoreImports": true` 不检查 ES2015 导入（但仍会检查这些导入之后在代码中的任何用法，函数参数除外）
* `"ignoreGlobals": false`（默认值）要求全局变量使用驼峰命名法
* `"ignoreGlobals": true` 不要求全局变量使用驼峰命名法
* `allow`（`string[]`）要接受的属性列表。接受正则表达式。

### properties: "always"

使用默认选项 `{ "properties": "always" }` 时，本规则的**错误**代码示例如下：

:::incorrect

```js
/*eslint camelcase: "error"*/

import { no_camelcased } from "external-module"

const my_favorite_color = "#112C85";

function do_something() {
    // ...
}

obj.do_something = function() {
    // ...
};

function foo({ no_camelcased }) {
    // ...
};

function bar({ isCamelcased: no_camelcased }) {
    // ...
}

function baz({ no_camelcased = 'default value' }) {
    // ...
};

const obj = {
    my_pref: 1
};

const { category_id = 1 } = query;

const { foo: snake_cased } = bar;

const { foo: bar_baz = 1 } = quz;
```

:::

使用默认选项 `{ "properties": "always" }` 时，本规则的**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: "error"*/

import { no_camelcased as camelCased } from "external-module";

const myFavoriteColor   = "#112C85";
const _myFavoriteColor  = "#112C85";
const myFavoriteColor_  = "#112C85";
const MY_FAVORITE_COLOR = "#112C85";
const foo1 = bar.baz_boom;
const foo2 = { qux: bar.baz_boom };

obj.do_something();
do_something();
new do_something();

const { category_id: category } = query;

function foo({ isCamelCased }) {
    // ...
};

function bar({ isCamelCased: isAlsoCamelCased }) {
    // ...
}

function baz({ isCamelCased = 'default value' }) {
    // ...
};

const { categoryId = 1 } = query;

const { foo: isCamelCased } = bar;

const { foo: camelCasedName = 1 } = quz;

```

:::

### properties: "never"

使用选项 `{ "properties": "never" }` 时，本规则的**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: ["error", {properties: "never"}]*/

const obj = {
    my_pref: 1
};

obj.foo_bar = "baz";
```

:::

### ignoreDestructuring: false

使用默认选项 `{ "ignoreDestructuring": false }` 时，本规则的**错误**代码示例如下：

:::incorrect

```js
/*eslint camelcase: "error"*/

const { category_id } = query;

const { category_name = 1 } = query;

const { category_id: category_title } = query;

const { category_id: category_alias } = query;

const { category_id: categoryId, ...other_props } = query;
```

:::

### ignoreDestructuring: true

使用选项 `{ "ignoreDestructuring": true }` 时，本规则的**错误**代码示例如下：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

const { category_id: category_alias } = query;

const { category_id, ...other_props } = query;
```

:::

使用选项 `{ "ignoreDestructuring": true }` 时，本规则的**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

const { category_id } = query;

const { category_name = 1 } = query;

const { category_id_name: category_id_name } = query;
```

:::

请注意，此选项仅适用于解构模式中的标识符。除了默认情况下或通过其他选项已允许的用法外，它不会额外允许之后在代码中对所创建变量的任何特定用法。

使用选项 `{ "ignoreDestructuring": true }` 时，其他**错误**代码示例如下：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

const { some_property } = obj; // allowed by {ignoreDestructuring: true}
const foo = some_property + 1; // error, ignoreDestructuring does not apply to this statement
```

:::

此选项的常见用途之一，是在后续代码中不打算使用该标识符时，避免无意义的重命名。

使用选项 `{ "ignoreDestructuring": true }` 时，其他**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: ["error", {ignoreDestructuring: true}]*/

const { some_property, ...rest } = obj;
// do something with 'rest', nothing with 'some_property'
```

:::

此选项的另一种常见用法是与 `{ "properties": "never" }` 搭配使用，此时该标识符仅作为属性简写使用。

使用选项 `{ "properties": "never", "ignoreDestructuring": true }` 时，其他**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: ["error", {"properties": "never", ignoreDestructuring: true}]*/

const { some_property } = obj;
doSomething({ some_property });
```

:::

### ignoreImports: false

使用默认选项 `{ "ignoreImports": false }` 时，本规则的**错误**代码示例如下：

:::incorrect

```js
/*eslint camelcase: "error"*/

import { snake_cased } from 'mod';
```

:::

### ignoreImports: true

使用选项 `{ "ignoreImports": true }` 时，本规则的**错误**代码示例如下：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreImports: true}]*/

import default_import from 'mod';

import * as namespaced_import from 'mod';
```

:::

使用选项 `{ "ignoreImports": true }` 时，本规则的**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: ["error", {ignoreImports: true}]*/

import { snake_cased } from 'mod';
```

:::

### ignoreGlobals: false

使用默认选项 `{ "ignoreGlobals": false }` 时，本规则的**错误**代码示例如下：

:::incorrect

```js
/*eslint camelcase: ["error", {ignoreGlobals: false}]*/
/* global no_camelcased */

const foo = no_camelcased;
```

:::

### ignoreGlobals: true

使用选项 `{ "ignoreGlobals": true }` 时，本规则的**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: ["error", {ignoreGlobals: true}]*/
/* global no_camelcased */

const foo = no_camelcased;
```

:::

### allow

使用 `allow` 选项时，本规则的**正确**代码示例如下：

:::correct

```js
/*eslint camelcase: ["error", {allow: ["UNSAFE_componentWillMount"]}]*/

function UNSAFE_componentWillMount() {
    // ...
}
```

:::

::: correct

```js
/*eslint camelcase: ["error", {allow: ["^UNSAFE_"]}]*/

function UNSAFE_componentWillMount() {
    // ...
}

function UNSAFE_componentWillReceiveProps() {
    // ...
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用该规则

如果你已采用使用其他命名约定（用下划线分隔单词）的编码规范，请关闭此规则。
