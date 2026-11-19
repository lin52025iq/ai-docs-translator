---
title: computed-property-spacing
rule_type: layout
related_rules:
- array-bracket-spacing
- comma-spacing
- space-in-parens
---
虽然格式偏好因人而异，但许多风格指南会要求或禁止在以下情形的计算属性中添加空格：

```js
var obj = { prop: "value" };
var a = "prop";
var x = obj[a]; // computed property in object member expression

var a = "prop";
var obj = {
  [a]: "value" // computed property key in object literal (ECMAScript 6)
};

var obj = { prop: "value" };
var a = "prop";
var { [a]: x } = obj; // computed property key in object destructuring pattern (ECMAScript 6)
```

<a id="rule-details"></a>

## 规则详情

此规则确保计算属性方括号内的空格保持一致。

此规则会要求或禁止在方括号与其中的值之间添加空格。如果方括号与相邻值之间有换行，则此规则不适用。

<a id="options"></a>

## 选项

此规则有两个选项：一个字符串选项和一个对象选项。

字符串选项：

* `"never"`（默认值）禁止在计算属性方括号内添加空格
* `"always"` 要求在计算属性方括号内添加一个或多个空格

对象选项：

* `"enforceForClassMembers": true`（默认值）还会将此规则应用于类成员。

### never

使用默认的 `"never"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint computed-property-spacing: ["error", "never"]*/

obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}
obj[foo[ bar ]]

const { [ a ]: someProp } = obj;
({ [ b ]: anotherProp } = anotherObj);
```

:::

使用默认的 `"never"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "never"]*/

obj[foo]
obj['foo']
var x = {[b]: a}
obj[foo[bar]]

const { [a]: someProp } = obj;
({ [b]: anotherProp } = anotherObj);
```

:::

### always

使用 `"always"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint computed-property-spacing: ["error", "always"]*/

obj[foo]
var x = {[b]: a}
obj[ foo]
obj['foo' ]
obj[foo[ bar ]]
var x = {[ b]: a}
const { [a]: someProp } = obj;
({ [b ]: anotherProp } = anotherObj);
```

:::

使用 `"always"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "always"]*/

obj[ foo ]
obj[ 'foo' ]
var x = {[ b ]: a}
obj[ foo[ bar ] ]
const { [ a ]: someProp } = obj;
({ [ b ]: anotherProp } = anotherObj);
```

:::

#### enforceForClassMembers

将 `enforceForClassMembers` 设为 `true`（默认值）后，此规则也会禁止或要求在类方法、getter 和 setter 的计算属性键内添加空格。

使用 `"never"` 和 `{ "enforceForClassMembers": true }`（默认值）时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": true }]*/

class Foo {
  [a ]() {}
  get [b ]() {}
  set [b ](value) {}
}

const Bar = class {
  [ a](){}
  static [ b]() {}
  static get [ c ]() {}
  static set [ c ](value) {}
}
```

:::

使用 `"never"` 和 `{ "enforceForClassMembers": true }`（默认值）时，此规则的**正确**代码示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": true }]*/

class Foo {
  [a]() {}
  get [b]() {}
  set [b](value) {}
}

const Bar = class {
  [a](){}
  static [b]() {}
  static get [c]() {}
  static set [c]() {}
}
```

:::

使用 `"never"` 和 `{ "enforceForClassMembers": false }` 时，此规则的**正确**代码示例：

::: correct

```js
/*eslint computed-property-spacing: ["error", "never", { "enforceForClassMembers": false }]*/

class Foo {
  [a ]() {}
  get [b ]() {}
  set [b ](value) {}
}

const Bar = class {
  [ a](){ }
  static [ b]() {}
  static get [ c ]() {}
  static set [ c ](value) {}
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不在意计算属性格式的一致性，可以关闭此规则。
