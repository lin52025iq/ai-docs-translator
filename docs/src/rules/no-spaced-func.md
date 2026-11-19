---
title: no-spaced-func
rule_type: layout
---

函数名称与调用它的括号之间可以有空白，但这种写法往往看起来像是错误。

<a id="rule-details"></a>

## 规则详情

此规则禁止函数标识符与其调用之间出现空格。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-spaced-func: "error"*/

fn ()

fn
()
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-spaced-func: "error"*/

fn()
```

:::