---
title: function-paren-newline
rule_type: layout
---
许多风格指南要求或禁止在函数括号内换行。

<a id="rule-details"></a>
## 规则详情

此规则用于确保函数参数或实参的括号内换行方式一致。

<a id="options"></a>
### 选项

此规则只有一个选项，可以是字符串或对象。

* `"always"` 要求所有函数括号内都换行。
* `"never"` 禁止所有函数括号内换行。
* `"multiline"`（默认值）如果任意参数或实参之间存在换行，则要求在函数括号内换行；否则禁止换行。
* `"multiline-arguments"` 的行为类似于 `multiline`，但如果只有一个参数或实参，则允许在函数括号内换行。
* `"consistent"` 要求每对括号内的换行方式一致。如果一对括号中的一个括号内有换行，而另一个没有，则报告错误。
* `{ "minItems": value }` 在参数或实参数量大于或等于 `value` 时，要求在函数括号内换行；否则禁止换行。

配置示例：

```json
{
  "rules": {
    "function-paren-newline": ["error", "never"]
  }
}
```

```json
{
  "rules": {
    "function-paren-newline": ["error", { "minItems": 3 }]
  }
}
```

使用 `"always"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "always"] */

function foo(bar, baz) {}

var qux = function(bar, baz) {};

var qux = (bar, baz) => {};

foo(bar, baz);
```

:::

使用 `"always"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "always"] */

function foo(
  bar,
  baz
) {}

var qux = function(
  bar, baz
) {};

var qux = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

:::

使用 `"never"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "never"] */

function foo(
  bar,
  baz
) {}

var qux = function(
  bar, baz
) {};

var qux = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

:::

使用 `"never"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "never"] */

function foo(bar, baz) {}

function qux(bar,
             baz) {}

var foobar = function(bar, baz) {};

var foobar = (bar, baz) => {};

foo(bar, baz);

foo(bar,
  baz);
```

:::

使用默认的 `"multiline"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "multiline"] */

function foo(bar,
  baz
) {}

var qux = function(
  bar, baz
) {};

var qux = (
  bar,
  baz) => {};

foo(bar,
  baz);

foo(
  function() {
    return baz;
  }
);
```

:::

使用默认的 `"multiline"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "multiline"] */

function foo(bar, baz) {}

var foobar = function(
  bar,
  baz
) {};

var foobar = (bar, baz) => {};

foo(bar, baz, qux);

foo(
  bar,
  baz,
  qux
);

foo(function() {
  return baz;
});
```

:::

使用 `"consistent"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "consistent"] */

function foo(bar,
  baz
) {}

var qux = function(bar,
  baz
) {};

var qux = (
  bar,
  baz) => {};

foo(
  bar,
  baz);

foo(
  function() {
    return baz;
  });
```

:::

使用 `"consistent"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "consistent"] */

function foo(bar,
  baz) {}

var qux = function(bar, baz) {};

var qux = (
  bar,
  baz
) => {};

foo(
  bar, baz
);

foo(
  function() {
    return baz;
  }
);
```

:::

使用 `"multiline-arguments"` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", "multiline-arguments"] */

function foo(bar,
  baz
) {}

var foobar = function(bar,
  baz
) {};

var foobar = (
  bar,
  baz) => {};

foo(
  bar,
  baz);

foo(
  bar, qux,
  baz
);
```

:::

使用一致的 `"multiline-arguments"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint function-paren-newline: ["error", "multiline-arguments"] */

function foo(
  bar,
  baz
) {}

var qux = function(bar, baz) {};

var qux = (
  bar
) => {};

foo(
  function() {
    return baz;
  }
);
```

:::

使用 `{ "minItems": 3 }` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint function-paren-newline: ["error", { "minItems": 3 }] */

function foo(
  bar,
  baz
) {}

function foobar(bar, baz, qux) {}

var barbaz = function(
  bar, baz
) {};

var barbaz = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

:::

使用 `{ "minItems": 3 }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint function-paren-newline: ["error", { "minItems": 3 }] */

function foo(bar, baz) {}

var foobar = function(
  bar,
  baz,
  qux
) {};

var foobar = (
  bar, baz, qux
) => {};

foo(bar, baz);

foo(
  bar, baz, qux
);
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用此规则

如果不想强制要求函数括号内采用一致的换行方式，请不要启用此规则。
