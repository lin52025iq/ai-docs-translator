---
title: prefer-destructuring
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://2ality.com/2015/01/es6-destructuring.html
---


<!-- markdownlint-disable-next-line MD051 -->
在 JavaScript ES6 中，新增了一种从数组索引或对象属性创建变量的语法，称为[解构](#further-reading)。此规则要求使用解构，而不是通过成员表达式访问属性。

<a id="rule-details"></a>
## 规则详情

此规则要求在变量声明和赋值表达式中，使用 ES6 解构从数组和对象中提取值，而不是直接访问属性或索引。

<a id="options"></a>
## 选项

此规则接受两个参数，且两者都是对象。第一个对象参数决定此规则适用于哪些类型的解构。

第一个对象包含两个属性：`array` 和 `object`，可分别用于启用或禁用对应类型的解构要求。默认情况下，两者均为 `true`。

```json
{
  "rules": {
    "prefer-destructuring": ["error", {
      "array": true,
      "object": true
    }]
  }
}
```

例如，以下配置仅强制使用对象解构，不强制使用数组解构：

```json
{
  "rules": {
    "prefer-destructuring": ["error", {"object": true, "array": false}]
  }
}
```

此规则的**错误**代码示例：

::: incorrect

```javascript
/* eslint prefer-destructuring: "error" */

// With `array` enabled
const foo = array[0];
bar.baz = array[0];

// With `object` enabled
const qux = object.qux;
const quux = object['quux'];
```

:::

此规则的**正确**代码示例：

::: correct

```javascript
/* eslint prefer-destructuring: "error" */

// With `array` enabled
const [ foo ] = array;
const arr = array[someIndex];
[bar.baz] = array;


// With `object` enabled
const { baz } = object;

const obj = object.bar;

let bar;
({ bar } = object);
```

:::

另外，也可以针对不同的赋值类型使用单独的配置。第一个参数可以接受另外两个键，取代 `array` 和 `object`。

其中一个键是 `VariableDeclarator`，另一个是 `AssignmentExpression`，它们可分别用于控制这两种类型的解构要求。每个属性都是一个对象，包含 `array` 和 `object` 两个属性，可分别控制变量声明和赋值表达式中 `array` 与 `object` 各自的解构要求。默认情况下，`VariableDeclarator` 和 `AssignmentExpression` 的 `array` 与 `object` 均设为 `true`。

```json
{
  "rules": {
    "prefer-destructuring": ["error", {
      "VariableDeclarator": {
        "array": true,
        "object": true
      },
      "AssignmentExpression": {
        "array": true,
        "object": true
      }
    }]
  }
}
```

强制在 `VariableDeclarator` 中使用对象解构时的**正确**代码示例：

::: correct

```javascript
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
const {bar: foo} = object;
```

:::

强制在 `AssignmentExpression` 中使用数组解构时的**正确**代码示例：

::: correct

```javascript
/* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */
[bar] = array;
```

:::

### enforceForRenamedProperties

此规则还有第二个对象参数，其中包含一个键 `enforceForRenamedProperties`，用于决定对象解构要求是否适用于重命名的变量。

```json
{
  "rules": {
    "prefer-destructuring": ["error",
    {
      "object": true
    },
    {
      "enforceForRenamedProperties": true
    }]
  }
}
```

启用 `enforceForRenamedProperties` 时的**错误**代码示例：

::: incorrect

```javascript
/* eslint "prefer-destructuring": ["error", { "object": true }, { "enforceForRenamedProperties": true }] */
const foo = object.bar;
```

:::

启用 `enforceForRenamedProperties` 时的**正确**代码示例：

::: correct

```javascript
/* eslint "prefer-destructuring": ["error", { "object": true }, { "enforceForRenamedProperties": true }] */
const { bar: foo } = object;
```

:::

启用 `enforceForRenamedProperties` 时的其他**正确**代码示例：

::: correct

```javascript
/* eslint "prefer-destructuring": ["error", { "object": true }, { "enforceForRenamedProperties": true }] */
class C {
    #x;
    foo() {
        const bar = this.#x; // private identifiers are not allowed in destructuring
    }
}
```

:::

**注意**：无法在运行时确定一个变量指向的是对象还是数组。因此，此规则会通过检查所访问的键是否为整数来推测赋值类型。这可能导致以下容易引起混淆的情况：

* 访问键为整数的对象属性时，会归入 `array` 解构类别。
* 通过计算得出的索引访问数组元素时，会归入 `object` 解构类别。

命令行中的 `--fix` 选项只会修复变量声明中报告的问题，并且只修复其中归入 `object` 解构类别的问题。此外，声明变量的名称必须与初始化表达式中非计算成员访问所使用的名称相同。例如，此规则可以自动修复 `const foo = object.foo`。涉及计算成员访问（例如 `const foo = object[foo]`）或重命名属性（例如 `const foo = object.bar`）的问题不会自动修复。

<a id="when-not-to-use-it"></a>
## 何时不使用

如果你希望直接访问数组索引或对象属性，可以根据需要配置此规则，或者完全禁用它。

此外，如果你打算直接访问较大的数组索引，例如：

```javascript
const foo = array[100];
```

那么不建议启用此规则中针对 `array` 的部分，因为解构并不太适用于这种情况。

对于不可迭代的“类数组”对象，也不建议启用：

```javascript
const $ = require('jquery');
const foo = $('body')[0];
const [bar] = $('body'); // fails with a TypeError
```
