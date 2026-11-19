---
title: prefer-regex-literals
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
---



创建正则表达式有两种方式：

* 正则表达式字面量，例如 `/abc/u`。
* `RegExp` 构造函数，例如 `new RegExp("abc", "u")` 或 `RegExp("abc", "u")`。

构造函数在需要动态生成模式时尤其有用，因为它接受字符串参数。

使用构造函数和字符串字面量时，别忘了字符串转义规则仍然适用。
如果要在模式中加入反斜杠，就需要在字符串字面量中对它进行转义。
因此，下面两种写法等价：

```js
new RegExp("^\\d\\.$");

/^\d\.$/;

// matches "0.", "1.", "2." ... "9."
```

在上面的示例中，正则表达式字面量更容易阅读和理解。
此外，常见的错误是在字符串字面量中漏掉额外的 `\`，这会生成完全不同的正则表达式：

```js
new RegExp("^\d\.$");

// equivalent to /^d.$/, matches "d1", "d2", "da", "db" ...
```

如果正则表达式是预先已知的，最佳实践是避免在正则表达式表示法外再套一层字符串字面量表示法，并使用正则表达式字面量，而不是构造函数。

<a id="rule-details"></a>

## 规则详情

此规则禁止将字符串字面量作为参数传递给 `RegExp` 构造函数。

此规则还禁止使用不包含表达式的模板字面量，以及不包含表达式的 `String.raw` 标记模板字面量调用 `RegExp` 构造函数。

此规则并不禁止所有对 `RegExp` 构造函数的使用。动态生成正则表达式时，仍应使用它。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-regex-literals: "error"*/

new RegExp("abc");

new RegExp("abc", "u");

RegExp("abc");

RegExp("abc", "u");

new RegExp("\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d");

RegExp(`^\\d\\.$`);

new RegExp(String.raw`^\d\.$`);
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint prefer-regex-literals: "error"*/

/abc/;

/abc/u;

/\d\d\.\d\d\.\d\d\d\d/;

/^\d\.$/;

// RegExp constructor is allowed for dynamically generated regular expressions

new RegExp(pattern);

RegExp("abc", flags);

new RegExp(prefix + "abc");

RegExp(`${prefix}abc`);

new RegExp(String.raw`^\d\. ${suffix}`);
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `disallowRedundantWrapping` 设为 `true` 时，还会检查是否存在不必要地包装起来的正则表达式字面量（默认值为 `false`）。

### disallowRedundantWrapping

默认情况下，此规则不会检查正则表达式字面量是否被不必要地包装在 `RegExp` 构造函数调用中。将选项 `disallowRedundantWrapping` 设为 `true` 后，此规则也会禁止这类不必要的写法。

`{ "disallowRedundantWrapping": true }` 的 `incorrect` 代码示例：

::: incorrect

```js
/*eslint prefer-regex-literals: ["error", {"disallowRedundantWrapping": true}]*/

new RegExp(/abc/);

new RegExp(/abc/, 'u');
```

:::

`{ "disallowRedundantWrapping": true }` 的 `correct` 代码示例：

::: correct

```js
/*eslint prefer-regex-literals: ["error", {"disallowRedundantWrapping": true}]*/

/abc/;

/abc/u;

new RegExp(/abc/, flags);
```

:::
