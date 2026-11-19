---
title: new-parens
rule_type: layout
---
JavaScript 允许在使用 `new` 关键字调用函数且构造函数没有参数时省略括号。不过，有些编码者认为省略括号与语言的其他部分不一致，因此会降低代码的清晰度。

```js
var person = new Person;
```

<a id="rule-details"></a>
## 规则详情

此规则可以强制要求或禁止在使用 `new` 关键字调用无参数构造函数时使用括号。

<a id="options"></a>
## 选项

此规则接受一个选项。

* `"always"` 要求在无参数构造函数后使用括号（默认值）
* `"never"` 要求在无参数构造函数后不使用括号

<a id="always"></a>
### 始终使用

使用 `"always"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint new-parens: "error"*/

var person = new Person;
var person = new (Person);
```

:::

使用 `"always"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-parens: "error"*/

var person = new Person();
var person = new (Person)();
```

:::

<a id="never"></a>
### 从不使用

使用 `"never"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint new-parens: ["error", "never"]*/

var person = new Person();
var person = new (Person)();
```

:::

使用 `"never"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint new-parens: ["error", "never"]*/

var person = new Person;
var person = (new Person);
var person = new Person("Name");
```

:::