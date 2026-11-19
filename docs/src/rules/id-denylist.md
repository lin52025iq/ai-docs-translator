---
title: id-denylist
rule_type: suggestion
---


> “计算机科学中只有两件难事：缓存失效和命名。” — Phil Karlton

通用名称会导致代码难以理解。此规则允许你指定一个拒绝列表，列出不允许使用的标识符名称，以避免这种情况。

<a id="rule-details"></a>

## 规则详情

此规则禁止在赋值和 `function` 定义中使用指定的标识符。

此规则会检测以下位置的不允许使用的标识符：

* 变量声明
* 函数声明
* 创建对象时被赋值的对象属性
* 类字段
* 类方法

此规则不会检测以下位置的不允许使用的标识符：

* 函数调用（因此你仍然可以使用自己无法控制的函数）
* 对象属性（因此你仍然可以使用自己无法控制的对象）

<a id="options"></a>

## 选项

此规则接受一个或多个字符串作为选项：受限标识符的名称。

例如，要限制常见通用标识符的使用：

```json
{
    "id-denylist": ["error", "data", "err", "e", "cb", "callback"]
}
```

**注意：**数组的第一个元素用于指定规则严重性（参见[配置规则](../use/configure/rules)）。数组中的其他元素是你要禁止使用的标识符。

以下是此规则的**错误**代码示例，其中受限标识符为示例中的 `"data", "callback"`：

::: incorrect

```js
/*eslint id-denylist: ["error", "data", "callback"] */

const data = { ...values };

function callback() {
    // ...
}

element.callback = function() {
    // ...
};

const itemSet = {
    data: [...values]
};

class Foo {
    data = [];
}

class Bar {
    #data = [];
}

class Baz {
    callback() {}
}

class Qux {
    #callback() {}
}
```

:::

以下是此规则的**正确**代码示例，其中受限标识符为示例中的 `"data", "callback"`：

::: correct

```js
/*eslint id-denylist: ["error", "data", "callback"] */

const encodingOptions = {...values};

function processFileResult() {
    // ...
}

element.successHandler = function() {
    // ...
};

const itemSet = {
    entities: [...values]
};

callback(); // all function calls are ignored

foo.callback(); // all function calls are ignored

foo.data; // all property names that are not assignments are ignored

class Foo {
    items = [];
}

class Bar {
    #items = [];
}

class Baz {
    method() {}
}

class Qux {
    #method() {}
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不想限制某些标识符的使用，可以关闭此规则。
