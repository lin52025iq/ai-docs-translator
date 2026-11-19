---
title: no-inline-comments
rule_type: suggestion
---


有些风格指南不允许在代码所在行添加注释。如果注释紧跟在代码后面且位于同一行，代码可能会变得难以阅读。
另一方面，有时在代码后面立即添加注释会更快捷，也更直观。

<a id="rule-details"></a>

## 规则详情

此规则禁止在代码所在行添加注释。

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint no-inline-comments: "error"*/

const a = 1; // declaring a to 1

function getRandomNumber(){
    return 4; // chosen by fair dice roll.
              // guaranteed to be random.
}

/* A block comment before code */ const b = 2;

const c = 3; /* A block comment after code */
```

:::

此规则下的**正确**代码示例：

::: correct

```js
/*eslint no-inline-comments: "error"*/

// This is a comment above a line of code
const foo = 5;

const bar = 5;
//This is a comment below a line of code
```

:::

<a id="jsx-exception"></a>

### JSX 例外

JSX 中大括号内的注释可以与大括号位于同一行，但前提是它们不与其他代码处于同一行，并且大括号内不包含实际表达式。

此规则下的**错误**代码示例：

::: incorrect { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint no-inline-comments: "error"*/

const foo = <div>{ /* On the same line with other code */ }<h1>Some heading</h1></div>;

const bar = (
    <div>
    {   // These braces are not just for the comment, so it can't be on the same line
        baz
    }
    </div>
);
```

:::

此规则下的**正确**代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint no-inline-comments: "error"*/

const foo = (
    <div>
      {/* These braces are just for this comment and there is nothing else on this line */}
      <h1>Some heading</h1>
    </div>
)

const bar = (
    <div>
    {
        // There is nothing else on this line
        baz
    }
    </div>
);

const quux = (
    <div>
      {/*
        Multiline
        comment
      */}
      <h1>Some heading</h1>
    </div>
)
```

:::

<a id="options"></a>

## 选项

### ignorePattern

若要让此规则忽略特定注释，请将 `ignorePattern` 选项设为字符串模式。该模式将传递给 [`RegExp` 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)。

`ignorePattern` 选项下的**正确**代码示例：

::: correct

```js
/*eslint no-inline-comments: ["error", { "ignorePattern": "webpackChunkName:\\s.+" }]*/

import(/* webpackChunkName: "my-chunk-name" */ './locale/en');
```

:::

`ignorePattern` 选项下的**错误**代码示例：

::: incorrect

```js
/*eslint no-inline-comments: ["error", { "ignorePattern": "something" }] */

const foo = 4; // other thing
```

:::
