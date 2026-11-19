---
title: lines-around-comment
rule_type: layout
related_rules:
- space-before-blocks
- spaced-comment
---
许多风格指南要求在注释前后留出空行。这些规则的主要目的是让注释更易于阅读，并提高代码的可读性。

<a id="rule-details"></a>

## 规则详情

此规则要求在注释前和/或注释后留出空行。可以分别为块注释（`/*`）和行注释（`//`）启用此规则。此规则不适用于与代码位于同一行的注释，也不要求在文件开头或结尾留出空行。

<a id="options"></a>

## 选项

此规则接受一个对象选项：

* `"beforeBlockComment": true`（默认值）要求在块注释前留出空行
* `"afterBlockComment": true` 要求在块注释后留出空行
* `"beforeLineComment": true` 要求在行注释前留出空行
* `"afterLineComment": true` 要求在行注释后留出空行
* `"allowBlockStart": true` 允许注释出现在块语句、函数体、类、switch 语句和类静态块的开头
* `"allowBlockEnd": true` 允许注释出现在块语句、函数体、类、switch 语句和类静态块的末尾
* `"allowObjectStart": true` 允许注释出现在对象字面量的开头
* `"allowObjectEnd": true` 允许注释出现在对象字面量的末尾
* `"allowArrayStart": true` 允许注释出现在数组字面量的开头
* `"allowArrayEnd": true` 允许注释出现在数组字面量的末尾
* `"allowClassStart": true` 允许注释出现在类的开头
* `"allowClassEnd": true` 允许注释出现在类的末尾
* `"applyDefaultIgnorePatterns"` 启用或禁用此规则默认忽略的注释模式
* `"ignorePattern"` 此规则要忽略的自定义模式
* `"afterHashbangComment": true` 要求在 hashbang 注释后留出空行

<a id="beforeblockcomment"></a>

### beforeBlockComment

以下是使用默认选项 `{ "beforeBlockComment": true }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true }]*/

var night = "long";
/* what a great and wonderful day */
var day = "great"
```

:::

以下是使用默认选项 `{ "beforeBlockComment": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true }]*/

var night = "long";

/* what a great and wonderful day */
var day = "great"
```

:::

<a id="afterblockcomment"></a>

### afterBlockComment

以下是使用选项 `{ "afterBlockComment": true }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true }]*/

var night = "long";

/* what a great and wonderful day */
var day = "great"
```

:::

以下是使用选项 `{ "afterBlockComment": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true }]*/

var night = "long";

/* what a great and wonderful day */

var day = "great"
```

:::

<a id="beforelinecomment"></a>

### beforeLineComment

以下是使用选项 `{ "beforeLineComment": true }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true }]*/

var night = "long";
// what a great and wonderful day
var day = "great"
```

:::

以下是使用选项 `{ "beforeLineComment": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true }]*/

var night = "long";

// what a great and wonderful day
var day = "great"
```

:::

<a id="afterlinecomment"></a>

### afterLineComment

以下是使用选项 `{ "afterLineComment": true }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true }]*/

var night = "long";
// what a great and wonderful day
var day = "great"
```

:::

以下是使用选项 `{ "afterLineComment": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true }]*/

var night = "long";
// what a great and wonderful day

var day = "great"
```

:::

<a id="allowblockstart"></a>

### allowBlockStart

以下是使用选项 `{ "beforeLineComment": true, "allowBlockStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowBlockStart": true }]*/

function foo(){
    // what a great and wonderful day
    var day = "great"
    return day;
}

if (bar) {
    // what a great and wonderful day
    foo();
}

class C {
    // what a great and wonderful day

    method() {
        // what a great and wonderful day
        foo();
    }

    static {
        // what a great and wonderful day
        foo();
    }
}
```

:::

以下是使用选项 `{ "beforeBlockComment": true, "allowBlockStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowBlockStart": true }]*/

function foo(){
    /* what a great and wonderful day */
    var day = "great"
    return day;
}

if (bar) {
    /* what a great and wonderful day */
    foo();
}

class C {
    /* what a great and wonderful day */

    method() {
        /* what a great and wonderful day */
        foo();
    }

    static {
        /* what a great and wonderful day */
        foo();
    }
}

switch (foo) {
  /* what a great and wonderful day */

  case 1:
    bar();
    break;
}
```

:::

<a id="allowblockend"></a>

### allowBlockEnd

以下是使用选项 `{ "afterLineComment": true, "allowBlockEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowBlockEnd": true }]*/

function foo(){
    var day = "great"
    return day;
    // what a great and wonderful day
}

if (bar) {
    foo();
    // what a great and wonderful day
}

class C {

    method() {
        foo();
        // what a great and wonderful day
    }

    static {
        foo();
        // what a great and wonderful day
    }

    // what a great and wonderful day
}
```

:::

以下是使用选项 `{ "afterBlockComment": true, "allowBlockEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowBlockEnd": true }]*/

function foo(){
    var day = "great"
    return day;

    /* what a great and wonderful day */
}

if (bar) {
    foo();

    /* what a great and wonderful day */
}

class C {

    method() {
        foo();

        /* what a great and wonderful day */
    }

    static {
        foo();

        /* what a great and wonderful day */
    }

    /* what a great and wonderful day */
}

switch (foo) {
  case 1:
    bar();
    break;

  /* what a great and wonderful day */
}
```

:::

<a id="allowclassstart"></a>

### allowClassStart

以下是使用选项 `{ "beforeLineComment": true, "allowClassStart": false }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowClassStart": false }]*/

class foo {
    // what a great and wonderful day
    day() {}
};
```

:::

以下是使用选项 `{ "beforeLineComment": true, "allowClassStart": false }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowClassStart": false }]*/

class foo {

    // what a great and wonderful day
    day() {}
};
```

:::

以下是使用选项 `{ "beforeLineComment": true, "allowClassStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowClassStart": true }]*/

class foo {
    // what a great and wonderful day
    day() {}
};
```

:::

以下是使用选项 `{ "beforeBlockComment": true, "allowClassStart": false }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowClassStart": false }]*/

class foo {
    /* what a great and wonderful day */
    day() {}
};
```

:::

以下是使用选项 `{ "beforeBlockComment": true, "allowClassStart": false }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowClassStart": false }]*/

class foo {

    /* what a great and wonderful day */
    day() {}
};
```

:::

以下是使用选项 `{ "beforeBlockComment": true, "allowClassStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowClassStart": true }]*/

class foo {
    /* what a great and wonderful day */
    day() {}
};
```

:::

<a id="allowclassend"></a>

### allowClassEnd

以下是使用选项 `{ "afterLineComment": true, "allowClassEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowClassEnd": true }]*/

class foo {
    day() {}
    // what a great and wonderful day
};
```

:::

以下是使用选项 `{ "afterBlockComment": true, "allowClassEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowClassEnd": true }]*/

class foo {
    day() {}

    /* what a great and wonderful day */
};
```

:::

<a id="allowobjectstart"></a>

### allowObjectStart

以下是使用选项 `{ "beforeLineComment": true, "allowObjectStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowObjectStart": true }]*/

var foo = {
    // what a great and wonderful day
    day: "great"
};

const {
    // what a great and wonderful day
    foo: someDay
} = {foo: "great"};

const {
    // what a great and wonderful day
    day
} = {day: "great"};
```

:::

以下是使用选项 `{ "beforeBlockComment": true, "allowObjectStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowObjectStart": true }]*/

var foo = {
    /* what a great and wonderful day */
    day: "great"
};

const {
    /* what a great and wonderful day */
    foo: someDay
} = {foo: "great"};

const {
    /* what a great and wonderful day */
    day
} = {day: "great"};
```

:::

<a id="allowobjectend"></a>

### allowObjectEnd

以下是使用选项 `{ "afterLineComment": true, "allowObjectEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowObjectEnd": true }]*/

var foo = {
    day: "great"
    // what a great and wonderful day
};

const {
    foo: someDay
    // what a great and wonderful day
} = {foo: "great"};

const {
    day
    // what a great and wonderful day
} = {day: "great"};
```

:::

以下是使用选项 `{ "afterBlockComment": true, "allowObjectEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowObjectEnd": true }]*/

var foo = {
    day: "great"

    /* what a great and wonderful day */
};

const {
    foo: someDay

    /* what a great and wonderful day */
} = {foo: "great"};

const {
    day

    /* what a great and wonderful day */
} = {day: "great"};
```

:::

<a id="allowarraystart"></a>

### allowArrayStart

以下是使用选项 `{ "beforeLineComment": true, "allowArrayStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeLineComment": true, "allowArrayStart": true }]*/

var day = [
    // what a great and wonderful day
    "great",
    "wonderful"
];

const [
    // what a great and wonderful day
    someDay
] = ["great", "not great"];
```

:::

以下是使用选项 `{ "beforeBlockComment": true, "allowArrayStart": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "beforeBlockComment": true, "allowArrayStart": true }]*/

var day = [
    /* what a great and wonderful day */
    "great",
    "wonderful"
];

const [
    /* what a great and wonderful day */
    someDay
] = ["great", "not great"];
```

:::

<a id="allowarrayend"></a>

### allowArrayEnd

以下是使用选项 `{ "afterLineComment": true, "allowArrayEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterLineComment": true, "allowArrayEnd": true }]*/

var day = [
    "great",
    "wonderful"
    // what a great and wonderful day
];

const [
    someDay
    // what a great and wonderful day
] = ["great", "not great"];
```

:::

以下是使用选项 `{ "afterBlockComment": true, "allowArrayEnd": true }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "afterBlockComment": true, "allowArrayEnd": true }]*/

var day = [
    "great",
    "wonderful"

    /* what a great and wonderful day */
];

const [
    someDay

    /* what a great and wonderful day */
] = ["great", "not great"];
```

:::

<a id="ignorepattern"></a>

### ignorePattern

默认情况下，此规则会忽略以以下词语开头的注释：`eslint`、`jshint`、`jslint`、`istanbul`、`global`、`exported`、`jscs`。

以下是符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error"]*/

foo();
/* jshint mentioned in this comment */
bar();
```

:::

如需在默认忽略项之外忽略更多注释，请将 `ignorePattern` 选项设为字符串模式。该模式会传递给 [`RegExp` 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)。

以下是 `ignorePattern` 选项的正确用法示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "ignorePattern": "pragma" }] */

foo();
/* jshint mentioned in this comment */
bar();

foo();
/* a valid comment using pragma in it */
```

:::

以下是 `ignorePattern` 选项的错误用法示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "ignorePattern": "pragma" }] */

1 + 1;
/* something else */
```

:::

<a id="applydefaultignorepatterns"></a>

### applyDefaultIgnorePatterns

即使提供了 `ignorePattern`，默认忽略模式仍会生效。如果要省略默认模式，请将此选项设为 `false`。

以下是使用选项 `{ "applyDefaultIgnorePatterns": false }` 时符合此规则的代码示例：

::: correct

```js
/*eslint lines-around-comment: ["error", { "ignorePattern": "pragma", applyDefaultIgnorePatterns: false }] */

foo();
/* a valid comment using pragma in it */
```

:::

以下是使用选项 `{ "applyDefaultIgnorePatterns": false }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint lines-around-comment: ["error", { "applyDefaultIgnorePatterns": false }] */

foo();
/* jshint mentioned in comment */

```

:::

<a id="afterhashbangcomment"></a>

### afterHashbangComment

以下是使用选项 `{ "afterHashbangComment": true }` 时违反此规则的代码示例：

::: incorrect

```js
#!foo
var day = "great"

/*eslint lines-around-comment: ["error", { "afterHashbangComment": true }] */
```

:::

以下是使用选项 `{ "afterHashbangComment": true }` 时符合此规则的代码示例：

::: correct

```js
#!foo

var day = "great"

/*eslint lines-around-comment: ["error", { "afterHashbangComment": true }] */
```

:::

<a id="when-not-to-use-it"></a>

## 不适用场景

许多人喜欢更简洁的代码风格，也不介意注释紧挨着代码。如果你属于这类人，那么此规则并不适合你。
