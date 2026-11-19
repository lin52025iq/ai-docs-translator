---
title: max-classes-per-file
rule_type: suggestion
---


包含多个类的文件往往会导致代码库难以浏览且结构不佳。最佳做法是让每个文件只承担一项职责。

<a id="rule-details"></a>

## 规则详情

此规则要求每个文件只能包含指定数量的类，不得超过该数量。

此规则中**不正确**代码的示例：

::: incorrect

```js
/*eslint max-classes-per-file: "error"*/

class Foo {}
class Bar {}
```

:::

此规则中**正确**代码的示例：

::: correct

```js
/*eslint max-classes-per-file: "error"*/

class Foo {}
```

:::

<a id="options"></a>

## 选项

此规则可通过对象或数字进行配置。

如果选项是对象，则可以包含以下一项或两项：

* `ignoreExpressions`：布尔选项（默认为 `false`），用于忽略类表达式。
* `max`：数字选项（默认为 1），用于指定类的最大数量。

例如：

```json
{
    "max-classes-per-file": ["error", 1]
}
```

```json
{
    "max-classes-per-file": [
        "error",
        { "ignoreExpressions": true, "max": 2 }
    ]
}
```

以下是将 `max` 选项设为 `2` 时此规则中**正确**代码的示例：

::: correct

```js
/* eslint max-classes-per-file: ["error", 2] */

class Foo {}
class Bar {}
```

:::

以下是将 `ignoreExpressions` 选项设为 `true` 时此规则中**正确**代码的示例：

::: correct

```js
/* eslint max-classes-per-file: ["error", { ignoreExpressions: true }] */

class VisitorFactory {
    forDescriptor(descriptor) {
        return class {
            visit(node) {
                return `Visiting ${descriptor}.`;
            }
        };
    }
}
```

:::