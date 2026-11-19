---
title: id-match
rule_type: suggestion
---


> “计算机科学中只有两件难事：缓存失效和命名。” — Phil Karlton

在项目中统一命名常常是编写代码时一个被低估的方面。
做好这一点，可以为团队节省数小时不必要的苦思冥想和走弯路的时间。
此规则允许你精确定义并强制团队使用的变量名和函数名。
不必再局限于 camelCase、snake_case、PascalCase 或 HungarianNotation。`id-match` 可以满足你的所有需求！

<a id="rule-details"></a>
## 规则详情

此规则要求赋值语句和 `function` 定义中的标识符与指定的正则表达式匹配。

<a id="options"></a>
## 选项

此规则接受一个字符串选项，用于指定正则表达式。

例如，要强制采用驼峰命名约定：

```json
{
    "id-match": ["error", "^[a-z]+([A-Z][a-z]+)*$"]
}
```

使用选项 `"^[a-z]+([A-Z][a-z]+)*$"` 时，此规则的**错误**代码示例如下：

::: incorrect

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$"]*/

const my_favorite_color = "#112C85";
const _myFavoriteColor  = "#112C85";
const myFavoriteColor_  = "#112C85";
const MY_FAVORITE_COLOR = "#112C85";
function do_something() {
    // ...
}

class My_Class {}

class myClass {
    do_something() {}
}

class anotherClass {
    #do_something() {}
}
```

:::

使用选项 `"^[a-z]+([A-Z][a-z]+)*$"` 时，此规则的**正确**代码示例如下：

::: correct

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$"]*/

const myFavoriteColor   = "#112C85";
const foo = bar.baz_boom;
const buz = { qux: bar.baz_boom };
do_something();
const obj = {
    my_pref: 1
};

class myClass {}

class anotherClass {
    doSomething() {}
}

class oneMoreClass {
    #doSomething() {}
}
```

:::

此规则还接受一个对象选项：

* `"properties": false`（默认值）不检查对象属性
* `"properties": true` 要求对象字面量属性和成员表达式赋值属性与指定的正则表达式匹配
* `"classFields": false`（默认值）不检查类字段名称
* `"classFields": true` 要求类字段名称与指定的正则表达式匹配
* `"onlyDeclarations": false`（默认值）要求所有变量名与指定的正则表达式匹配
* `"onlyDeclarations": true` 仅要求 `var`、`const`、`let`、`function` 和 `class` 声明与指定的正则表达式匹配
* `"ignoreDestructuring": false`（默认值）对解构标识符强制执行 `id-match`
* `"ignoreDestructuring": true` 不检查解构标识符

<a id="properties"></a>
### properties

使用选项 `"^[a-z]+([A-Z][a-z]+)*$", { "properties": true }` 时，此规则的**错误**代码示例如下：

::: incorrect

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$", { "properties": true }]*/

const obj = {
    my_pref: 1
};

obj.do_something = function() {
    // ...
};
```

:::

<a id="classfields"></a>
### classFields

使用选项 `"^[a-z]+([A-Z][a-z]+)*$", { "classFields": true }` 时，此规则的**错误**代码示例如下：

::: incorrect

```js
/*eslint id-match: ["error", "^[a-z]+([A-Z][a-z]+)*$", { "classFields": true }]*/

class myClass {
    my_pref = 1;
}

class anotherClass {
    #my_pref = 1;
}
```

:::

<a id="onlydeclarations"></a>
### onlyDeclarations

使用选项 `"^[a-z]+([A-Z][a-z]+)*$", { "onlyDeclarations": true }` 时，此规则的**正确**代码示例如下：

::: correct

```js
/*eslint id-match: [2, "^[a-z]+([A-Z][a-z]+)*$", { "onlyDeclarations": true }]*/

foo = __dirname;
```

:::

<a id="ignoredestructuring-false"></a>
### ignoreDestructuring: false

使用默认选项 `"^[^_]+$", { "ignoreDestructuring": false }` 时，此规则的**错误**代码示例如下：

::: incorrect

```js
/*eslint id-match: [2, "^[^_]+$", { "ignoreDestructuring": false }]*/

const { category_id } = query;

const { categoryid_Default = 1 } = query;

const { category_ids: category_ids } = query;

const { category_id: category_Alias } = query;

const { category_id: category_IdRenamed, ...other_Props } = query;
```

:::

<a id="ignoredestructuring-true"></a>
### ignoreDestructuring: true

使用选项 `"^[^_]+$", { "ignoreDestructuring": true }` 时，此规则的**错误**代码示例如下：

::: incorrect

```js
/*eslint id-match: [2, "^[^_]+$", { "ignoreDestructuring": true }]*/

const { category_id: category_alias } = query;

const { category_id: category_Id, ...other_props } = query;
```

:::

使用选项 `"^[^_]+$", { "ignoreDestructuring": true }` 时，此规则的**正确**代码示例如下：

::: correct

```js
/*eslint id-match: [2, "^[^_]+$", { "ignoreDestructuring": true }]*/

const { category_id } = query;

const { category_Id = 1 } = query;

const { category_alias: category_alias } = query;
```

:::

<a id="when-not-to-use-it"></a>
## 何时不使用

如果你不想对所有标识符强制采用某种命名约定，或者你的命名约定过于复杂，无法通过配置此规则来强制执行，那么就不应启用此规则。

