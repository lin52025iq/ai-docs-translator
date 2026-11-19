---
title: block-spacing
rule_type: layout
related_rules:
- space-before-blocks
- brace-style
---
<a id="rule-details"></a>
## 规则详情

此规则要求同一行中块开始标记与其后一个标记之间的空格保持一致。此规则还要求同一行中块结束标记与其前一个标记之间的空格保持一致。

<a id="options"></a>
## 选项

此规则有一个字符串选项：

* `"always"`（默认值）要求有一个或多个空格
* `"never"` 不允许有空格

### always

使用默认选项 `"always"` 时，此规则的错误代码示例如下：

:::incorrect

```js
/*eslint block-spacing: "error"*/

function foo() {return true;}
if (foo) { bar = 0;}
function baz() {let i = 0;
    return i;
}

class C {
    static {this.bar = 0;}
}
```

:::

使用默认选项 `"always"` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint block-spacing: "error"*/

function foo() { return true; }
if (foo) { bar = 0; }

class C {
    static { this.bar = 0; }
}
```

:::

### never

使用选项 `"never"` 时，此规则的错误代码示例如下：

:::incorrect

```js
/*eslint block-spacing: ["error", "never"]*/

function foo() { return true; }
if (foo) { bar = 0;}

class C {
    static { this.bar = 0; }
}
```

:::

使用选项 `"never"` 时，此规则的正确代码示例如下：

:::correct

```js
/*eslint block-spacing: ["error", "never"]*/

function foo() {return true;}
if (foo) {bar = 0;}

class C {
    static {this.bar = 0;}
}
```

:::

<a id="when-not-to-use-it"></a>
## 何时不使用此规则

如果你不希望收到有关块内空格风格的提示，可以放心禁用此规则。
