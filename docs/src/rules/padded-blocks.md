---
title: padded-blocks
rule_type: layout
related_rules:
- lines-between-class-members
- padding-line-between-statements
---
一些风格指南要求代码块语句以空行开头和结尾。这样做的目的是通过在视觉上分隔代码块内容与周围代码，提高可读性。

```js
if (a) {

    b();

}
```

为了保持代码风格一致，你应该始终使用带空行的代码块，或者始终不使用。

<a id="rule-details"></a>

## 规则详情

此规则要求代码块内的空行填充保持一致。

<a id="options"></a>

## 选项

此规则有两个选项：第一个选项可以是字符串选项或对象选项，第二个选项是对象选项，可以允许例外情况。

<a id="first-option"></a>

### 第一个选项

字符串选项：

* `"always"`（默认值）要求代码块语句、函数体、类静态代码块、类和 `switch` 语句的开头和结尾有空行。
* `"never"` 禁止在代码块语句、函数体、类静态代码块、类和 `switch` 语句的开头和结尾出现空行。

对象选项：

* `"blocks"` 要求或禁止在代码块语句、函数体和类静态代码块中添加空行
* `"classes"` 要求或禁止在类中添加空行
* `"switches"` 要求或禁止在 `switch` 语句中添加空行

<a id="second-option"></a>

### 第二个选项

* `"allowSingleLineBlocks": true` 允许单行代码块

<a id="always"></a>

### 始终

使用默认选项 `"always"` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", "always"]*/

if (a) {
    b();
}

if (a) { b(); }

if (a)
{
    b();
}

if (a) {
    b();

}

if (a) {
    // comment
    b();

}

class C {
    static {
        a();
    }
}
```

:::

使用默认选项 `"always"` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", "always"]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    // comment
    b();

}

class C {

    static {

        a();

    }

}
```

:::

<a id="never"></a>

### 从不

使用选项 `"never"` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", "never"]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    b();
}

if (a) {
    b();

}

class C {

    static {

        a();

    }

}
```

:::

使用选项 `"never"` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", "never"]*/

if (a) {
    b();
}

if (a)
{
    b();
}

class C {
    static {
        a();
    }
}
```

:::

<a id="blocks"></a>

### 代码块

使用选项 `{ "blocks": "always" }` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "blocks": "always" }]*/

if (a) {
    b();
}

if (a) { b(); }

if (a)
{
    b();
}

if (a) {

    b();
}

if (a) {
    b();

}

if (a) {
    // comment
    b();

}

class C {

    static {
        a();
    }

}
```

:::

使用选项 `{ "blocks": "always" }` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "blocks": "always" }]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    // comment
    b();

}

class C {

    static {

        a();

    }

}

class D {
    static {

        a();

    }

}
```

:::

使用选项 `{ "blocks": "never" }` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "blocks": "never" }]*/

if (a) {

    b();

}

if (a)
{

    b();

}

if (a) {

    b();
}

if (a) {
    b();

}

class C {
    static {

        a();

    }
}
```

:::

使用选项 `{ "blocks": "never" }` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "blocks": "never" }]*/

if (a) {
    b();
}

if (a)
{
    b();
}

class C {
    static {
        a();
    }
}

class D {

    static {
        a();
    }

}
```

:::

<a id="classes"></a>

### 类

使用选项 `{ "classes": "always" }` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "classes": "always" }]*/

class  A {
    constructor(){
    }
}
```

:::

使用选项 `{ "classes": "always" }` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "classes": "always" }]*/

class  A {

    constructor(){
    }

}
```

:::

使用选项 `{ "classes": "never" }` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "classes": "never" }]*/

class  A {

    constructor(){
    }

}
```

:::

使用选项 `{ "classes": "never" }` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "classes": "never" }]*/

class  A {
    constructor(){
    }
}
```

:::

<a id="switches"></a>

### switch 语句

使用选项 `{ "switches": "always" }` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "switches": "always" }]*/

switch (a) {
    case 0: foo();
}
```

:::

使用选项 `{ "switches": "always" }` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "switches": "always" }]*/

switch (a) {

    case 0: foo();

}

if (a) {
    b();
}
```

:::

使用选项 `{ "switches": "never" }` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", { "switches": "never" }]*/

switch (a) {

    case 0: foo();

}
```

:::

使用选项 `{ "switches": "never" }` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", { "switches": "never" }]*/

switch (a) {
    case 0: foo();
}

if (a) {

    b();

}
```

:::

<a id="always--allowsinglelineblocks"></a>

### 始终 + allowSingleLineBlocks

使用选项 `"always", {"allowSingleLineBlocks": true}` 时，此规则下的错误代码示例：

::: incorrect

```js
/*eslint padded-blocks: ["error", "always", { allowSingleLineBlocks: true }]*/

if (a) {
    b();
}

if (a) {

    b();
}

if (a) {
    b();

}
```

:::

使用选项 `"always", {"allowSingleLineBlocks": true}` 时，此规则下的正确代码示例：

::: correct

```js
/*eslint padded-blocks: ["error", "always", { allowSingleLineBlocks: true }]*/

if (a) { b(); }

if (a) {

    b();

}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不关心代码块内空行填充的一致性，可以关闭此规则。
