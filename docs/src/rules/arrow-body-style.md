---
title: arrow-body-style
rule_type: suggestion
---

箭头函数的函数体有两种语法形式。可以使用 *块* 函数体（以花括号表示）`() => { ... }`，也可以使用单个表达式 `() => ...`，其值会被隐式返回。

<a id="rule-details"></a>

## 规则详情

此规则可以强制或禁止在箭头函数函数体周围使用花括号。

<a id="options"></a>

## 选项

此规则接受一个或两个选项。第一个选项是字符串，可以是：

* `"always"` 强制要求函数体使用花括号
* `"as-needed"` 在可以省略花括号时强制省略（默认）
* `"never"` 强制函数体不使用花括号（将箭头函数限制为返回表达式）

当第一个选项为 `"as-needed"` 时，第二个选项是一个对象，用于更精细地配置。目前唯一可用的选项是布尔属性 `requireReturnForObjectLiteral`。其默认值为 `false`。如果设为 `true`，则对象字面量必须使用花括号并显式返回。

```json
"arrow-body-style": ["error", "always"]
```

### always

启用 `"always"` 选项时，此规则的**错误**代码示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "always"]*/

const foo = () => 0;
```

:::

启用 `"always"` 选项时，此规则的**正确**代码示例：

:::correct

```js
/*eslint arrow-body-style: ["error", "always"]*/

const foo = () => {
    return 0;
};

const bar = (retv, name) => {
    retv[name] = true;
    return retv;
};
```

:::

### as-needed

使用默认的 `"as-needed"` 选项时，此规则的**错误**代码示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "as-needed"]*/

const foo = () => {
    return 0;
};

const bar = () => {
    return {
       bar: {
            foo: 1,
            bar: 2,
        }
    };
};
```

:::

使用默认的 `"as-needed"` 选项时，此规则的**正确**代码示例：

:::correct

```js
/*eslint arrow-body-style: ["error", "as-needed"]*/

const foo1 = () => 0;

const foo2 = (retv, name) => {
    retv[name] = true;
    return retv;
};

const foo3 = () => ({
    bar: {
        foo: 1,
        bar: 2,
    }
});

const foo4 = () => { bar(); };
const foo5 = () => {};
const foo6 = () => { /* do nothing */ };

const foo7 = () => {
    // do nothing.
};

const foo8 = () => ({ bar: 0 });
```

:::

#### requireReturnForObjectLiteral

> 此选项仅适用于与 `"as-needed"` 选项搭配使用的情况。

启用 `{ "requireReturnForObjectLiteral": true }` 选项时，此规则的**错误**代码示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/

const foo = () => ({});

const bar = () => ({ bar: 0 });
```

:::

启用 `{ "requireReturnForObjectLiteral": true }` 选项时，此规则的**正确**代码示例：

:::correct

```js
/*eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }]*/

const foo = () => {};

const bar = () => { return { bar: 0 }; };
```

:::

### never

启用 `"never"` 选项时，此规则的**错误**代码示例：

:::incorrect

```js
/*eslint arrow-body-style: ["error", "never"]*/

const foo = () => {
    return 0;
};

const bar = (retv, name) => {
    retv[name] = true;
    return retv;
};
```

:::

启用 `"never"` 选项时，此规则的**正确**代码示例：

:::correct

```js
/*eslint arrow-body-style: ["error", "never"]*/

const foo = () => 0;

const bar = () => ({ foo: 0 });
```

:::