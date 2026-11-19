---
title: max-depth
rule_type: suggestion
related_rules:
- complexity
- max-lines
- max-lines-per-function
- max-nested-callbacks
- max-params
- max-statements
---


许多开发者认为，如果代码块嵌套超过一定深度，代码就会难以阅读。

<a id="rule-details"></a>

## 规则详情

此规则强制限制代码块的最大嵌套深度，以降低代码复杂度。

<a id="options"></a>

## 选项

此规则有一个数字或对象选项：

* `"max"`（默认值为 `4`）强制限制代码块的最大嵌套深度

**已弃用：** 对象属性 `maximum` 已弃用；请改用对象属性 `max`。

### max

此规则在使用默认选项 `{ "max": 4 }` 时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint max-depth: ["error", 4]*/

function foo() {
    for (;;) { // Nested 1 deep
        while (true) { // Nested 2 deep
            if (true) { // Nested 3 deep
                if (true) { // Nested 4 deep
                    if (true) { // Nested 5 deep
                    }
                }
            }
        }
    }
}
```

:::

此规则在使用默认选项 `{ "max": 4 }` 时，以下代码示例为**正确**：

::: correct

```js
/*eslint max-depth: ["error", 4]*/

function foo() {
    for (;;) { // Nested 1 deep
        while (true) { // Nested 2 deep
            if (true) { // Nested 3 deep
                if (true) { // Nested 4 deep
                }
            }
        }
    }
}
```

:::

请注意，类静态块不计为嵌套代码块，其内部的深度会独立于外围上下文计算。

此规则在使用选项 `{ "max": 2 }` 时，以下代码示例为**错误**：

::: incorrect

```js
/*eslint max-depth: ["error", 2]*/

function foo() {
    if (true) { // Nested 1 deep
        class C {
            static {
                if (true) { // Nested 1 deep
                    if (true) { // Nested 2 deep
                        if (true) { // Nested 3 deep
                        }
                    }
                }
            }
        }
    }
}
```

:::

此规则在使用选项 `{ "max": 2 }` 时，以下代码示例为**正确**：

::: correct

```js
/*eslint max-depth: ["error", 2]*/

function foo() {
    if (true) { // Nested 1 deep
        class C {
            static {
                if (true) { // Nested 1 deep
                    if (true) { // Nested 2 deep
                    }
                }
            }
        }
    }
}
```

:::
