---
title: jsx-quotes
rule_type: layout
related_rules:
- quotes
---
JSX 属性值可以包含字符串字面量，并使用单引号或双引号括起来。

```jsx
<a b='c' />;
<a b="c" />;
```

与 JavaScript 中的字符串字面量不同，JSX 属性中的字符串字面量不能包含转义引号。
例如，如果要在 JSX 属性值中使用双引号，必须使用单引号作为字符串分隔符。

```jsx
<a b="'" />;
<a b='"' />;
```

<a id="rule-details"></a>

## 规则详情

此规则要求在 JSX 属性中统一使用双引号或单引号。

<a id="options"></a>

## 选项

此规则有一个字符串选项：

* `"prefer-double"`（默认）要求所有不包含双引号的 JSX 属性值都使用双引号。
* `"prefer-single"` 要求所有不包含单引号的 JSX 属性值都使用单引号。

### prefer-double

使用默认选项 `"prefer-double"` 时，此规则下的错误代码示例：

:::incorrect { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint jsx-quotes: ["error", "prefer-double"]*/

<a b='c' />;
```

:::

使用默认选项 `"prefer-double"` 时，此规则下的正确代码示例：

:::correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint jsx-quotes: ["error", "prefer-double"]*/

<a b="c" />;
<a b='"' />;
```

:::

### prefer-single

使用选项 `"prefer-single"` 时，此规则下的错误代码示例：

:::incorrect { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint jsx-quotes: ["error", "prefer-single"]*/

<a b="c" />;
```

:::

使用选项 `"prefer-single"` 时，此规则下的正确代码示例：

:::correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint jsx-quotes: ["error", "prefer-single"]*/

<a b='c' />;
<a b="'" />;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不使用 JSX，或者不关心 JSX 属性中引号的使用是否一致，可以关闭此规则。
