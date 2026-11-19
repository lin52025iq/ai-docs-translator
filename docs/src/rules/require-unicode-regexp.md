---
title: require-unicode-regexp
rule_type: suggestion
further_reading:
- https://github.com/tc39/proposal-regexp-v-flag
- https://v8.dev/features/regexp-v-flag
---


RegExp `u` 标志有两种作用：

1. **让正则表达式正确处理 UTF-16 代理对。**

    特别是，字符范围语法会按预期工作。

    ```js
    /^[👍]$/.test("👍") //→ false
    /^[👍]$/u.test("👍") //→ true
    ```

2. **禁用 [附录 B 扩展](https://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns)，让正则表达式更早抛出语法错误。**

    由于历史原因，JavaScript 正则表达式对语法错误的容忍度较高。例如，`/\w{1, 2/` 是语法错误，但 JavaScript 不会抛出错误，而是匹配诸如 `"a{1, 2"` 这样的字符串。这种错误恢复逻辑在附录 B 中定义。

    `u` 标志会禁用附录 B 定义的错误恢复逻辑。因此，你可以更早发现错误。这类似于[严格模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)。

ECMAScript 2024 引入的 RegExp `v` 标志是 `u` 标志的超集，并额外提供两项功能：

1. **字符串的 Unicode 属性**

    使用 Unicode 属性转义，可以使用字符串的属性。

    ```js
    const re = /^\p{RGI_Emoji}$/v;

    // Match an emoji that consists of just 1 code point:
    re.test('⚽'); // '\u26BD'
    // → true ✅

    // Match an emoji that consists of multiple code points:
    re.test('👨🏾‍⚕️'); // '\u{1F468}\u{1F3FE}\u200D\u2695\uFE0F'
    // → true ✅
    ```

2. **集合表示法**

    它允许对字符类进行集合运算。

    ```js
    const re = /[\p{White_Space}&&\p{ASCII}]/v;
    re.test('\n'); // → true
    re.test('\u2028'); // → false
    ```

因此，`u` 和 `v` 标志能帮助我们更好地使用正则表达式。

<a id="rule-details"></a>

## 规则详情

此规则旨在要求正则表达式使用 `u` 或 `v` 标志。

此规则的错误代码示例：

::: incorrect

```js
/*eslint require-unicode-regexp: error */

const a = /aaa/
const b = /bbb/gi
const c = new RegExp("ccc")
const d = new RegExp("ddd", "gi")
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint require-unicode-regexp: error */

const a = /aaa/u
const b = /bbb/giu
const c = new RegExp("ccc", "u")
const d = new RegExp("ddd", "giu")

const e = /aaa/v
const f = /bbb/giv
const g = new RegExp("ccc", "v")
const h = new RegExp("ddd", "giv")

// This rule ignores RegExp calls if the flags could not be evaluated to a static value.
function i(flags) {
    return new RegExp("eee", flags)
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"requireFlag": "u"|"v"` 要求使用特定的 Unicode 正则表达式标志

<a id="requireflag-u"></a>

### requireFlag: "u"

对于不支持 `v` 标志的环境，可以优先使用 `u` 标志。

启用 `{ "requireFlag": "u" }` 选项时，此规则的错误代码示例：

:::incorrect

```js
/*eslint require-unicode-regexp: ["error", { "requireFlag": "u" }] */

const fooEmpty = /foo/;

const fooEmptyRegexp = new RegExp('foo');

const foo = /foo/v;

const fooRegexp = new RegExp('foo', 'v');
```

:::

启用 `{ "requireFlag": "u" }` 选项时，此规则的正确代码示例：

:::correct

```js
/*eslint require-unicode-regexp: ["error", { "requireFlag": "u" }] */

const foo = /foo/u;

const fooRegexp = new RegExp('foo', 'u');
```

:::

<a id="requireflag-v"></a>

### requireFlag: "v"

如果环境支持 `v` 标志，它可能是更好的选择，因为它比 `u` 标志提供了更多功能（例如，测试字符串 Unicode 属性的能力）。不过，它的语法确实更严格（例如，在字符类中需要转义某些字符）。

启用 `{ "requireFlag": "v" }` 选项时，此规则的错误代码示例：

:::incorrect

```js
/*eslint require-unicode-regexp: ["error", { "requireFlag": "v" }] */

const fooEmpty = /foo/;

const fooEmptyRegexp = new RegExp('foo');

const foo = /foo/u;

const fooRegexp = new RegExp('foo', 'u');
```

:::

启用 `{ "requireFlag": "v" }` 选项时，此规则的正确代码示例：

:::correct

```js
/*eslint require-unicode-regexp: ["error", { "requireFlag": "v" }] */

const foo = /foo/v;

const fooRegexp = new RegExp('foo', 'v');
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你不希望对未使用 `u` 或 `v` 标志的正则表达式发出警告，那么可以放心禁用此规则。

<a id="note-on-i-flag-and-w"></a>

### 关于 `i` 标志和 `\w` 的说明

在某些情况下，由于 Unicode 大小写折叠，对同时使用 `i` 标志和 `\w` 字符类的正则表达式添加 `u` 标志可能会改变其行为。

例如：

```js
const regexWithoutU = /^\w+$/i;
const regexWithU = /^\w+$/iu;

const str = "\u017f\u212a"; // Example Unicode characters

console.log(regexWithoutU.test(str)); // false
console.log(regexWithU.test(str)); // true
```

如果在这种特定情况下你更倾向于使用不识别 Unicode 的正则表达式，可以使用 `eslint-disable` 注释禁用此规则：

```js
/* eslint-disable require-unicode-regexp */
const regex = /^\w+$/i;
/* eslint-enable require-unicode-regexp */
```
