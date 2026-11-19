---
title: lines-between-class-members
rule_type: layout
related_rules:
- padded-blocks
- padding-line-between-statements
---
此规则通过要求类成员之间留有空行来提高可读性。它不会检查首个成员之前和最后一个成员之后的空行，因为这已由 padded-blocks 处理。

<a id="rule-details"></a>

## 规则详情

此规则的**错误**代码示例：

::: incorrect

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class MyClass {
  x;
  foo() {
    //...
  }
  bar() {
    //...
  }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class MyClass {
  x;

  foo() {
    //...
  }

  bar() {
    //...
  }
}
```

:::

其他**正确**代码示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class MyClass {
  x = 1

  ;in = 2
}
```

:::

<a id="options"></a>

### 选项

此规则有两个选项：第一个选项可以是字符串或对象，第二个选项是对象。

第一个选项可以是字符串 `"always"` 或 `"never"`，也可以是具有 `enforce` 属性的对象：

* `"always"`（默认值）：要求类成员后有空行
* `"never"`：禁止类成员后出现空行
* `Object`：具有 `enforce` 属性的对象。enforce 属性应为对象数组，每个对象分别指定在特定类成员对之间强制执行空行规则的配置。
    * **enforce**：可以提供任意数量的配置。如果某一成员对匹配多个配置，则使用最后一个匹配的配置。如果某一成员对不匹配任何配置，则会忽略该成员对。每个对象应具有以下属性：
        * **blankLine**：可设为 `"always"` 或 `"never"`，分别表示是否要求或禁止指定成员之间出现空行。
        * **prev**：指定前一个类成员的类型。类方法可设为 `"method"`，类字段可设为 `"field"`，任意类成员可设为 `"*"`。
        * **next**：指定后一个类成员的类型。可选值与 `prev` 相同。

第二个选项是具有 `exceptAfterSingleLine` 属性的对象：

* `"exceptAfterSingleLine": false`（默认值）：**不**跳过对单行类成员之后空行的检查
* `"exceptAfterSingleLine": true`：跳过对单行类成员之后空行的检查

使用字符串选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class Foo{
  x;
  bar(){}
  baz(){}
}
```

:::

::: incorrect

```js
/* eslint lines-between-class-members: ["error", "never"]*/
class Bar{
  x;

  bar(){}

  baz(){}
}
```

:::

使用字符串选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always"]*/
class Foo{
  x;

  bar(){}

  baz(){}
}
```

:::

::: correct

```js
/* eslint lines-between-class-members: ["error", "never"]*/
class Bar{
  x;
  bar(){}
  baz(){}
}
```

:::

使用配置数组选项时，此规则的**错误**代码示例：

::: incorrect

```js
// disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';
  #fieldB = 'Field B';

  method1() {}

  get area() {
    return this.method1();
  }

  method2() {}
}
```

:::

::: incorrect

```js
// requires blank lines around fields, disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "field" },
        { blankLine: "always", prev: "field", next: "*" },
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }
  fieldA = 'Field A';
  #fieldB = 'Field B';
  method1() {}

  get area() {
    return this.method1();
  }

  method2() {}
}
```

:::

使用配置数组选项时，此规则的**正确**代码示例：

::: correct

```js
// disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';

  #fieldB = 'Field B';

  method1() {}
  get area() {
    return this.method1();
  }
  method2() {}
}
```

:::

::: correct

```js
// requires blank lines around fields, disallows blank lines between methods
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "field" },
        { blankLine: "always", prev: "field", next: "*" },
        { blankLine: "never", prev: "method", next: "method" }
      ]
    },
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';

  #fieldB = 'Field B';

  method1() {}
  get area() {
    return this.method1();
  }
  method2() {}
}
```

:::

使用对象选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint lines-between-class-members: ["error", "always", { "exceptAfterSingleLine": true }]*/
class Foo{
  x; // single line class member
  bar(){} // single line class member
  baz(){
    // multi line class member
  }

  qux(){}
}
```

:::

::: correct

```js
/*eslint lines-between-class-members: [
    "error",
    {
      enforce: [
        { blankLine: "always", prev: "*", next: "method" },
        { blankLine: "always", prev: "method", next: "*" },
        { blankLine: "always", prev: "field", next: "field" }
      ]
    },
    { exceptAfterSingleLine: true }
]*/

class MyClass {
  constructor(height, width) {
      this.height = height;
      this.width = width;
  }

  fieldA = 'Field A';
  #fieldB = 'Field B';
  method1() {}
  get area() {
    return this.method1();
  }

  method2() {}
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果不想强制要求类成员之间出现空行，可以禁用此规则。

<a id="compatibility"></a>

## 兼容性

* [requirePaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/requirePaddingNewLinesAfterBlocks)
* [disallowPaddingNewLinesAfterBlocks](https://jscs-dev.github.io/rule/disallowPaddingNewLinesAfterBlocks)
