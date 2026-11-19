---
title: dot-notation
rule_type: suggestion
---



在 JavaScript 中，可以使用点表示法（`foo.bar`）或方括号表示法（`foo["bar"]`）访问属性。不过，点表示法通常更受青睐，因为它更易于阅读、更简洁，而且与激进的 JavaScript 压缩器配合得更好。

```js
foo["bar"];
```

<a id="rule-details"></a>
## 规则详情

此规则旨在通过鼓励尽可能使用点表示法，保持代码风格一致并提高代码可读性。因此，当规则遇到不必要的方括号表示法时，会发出警告。

此规则的错误代码示例：

:::incorrect

```js
/*eslint dot-notation: "error"*/

const x = foo["bar"];
```

:::

此规则的正确代码示例：

:::correct

```js
/*eslint dot-notation: "error"*/

const x = foo.bar;

const y = foo[bar];    // Property name is a variable, square-bracket notation required
```

:::

<a id="options"></a>
## 选项

此规则接受一个选项参数：

* 将 `allowKeywords` 选项设为 `false`（默认值为 `true`），即可遵循与 ECMAScript 3 兼容的风格，避免对保留字属性使用点表示法。
* 将 `allowPattern` 选项设为正则表达式字符串，即可允许对符合该模式的属性名使用方括号表示法（默认不检查任何模式）。

### allowKeywords

`{ "allowKeywords": false }` 选项的正确代码示例：

:::correct

```js
/*eslint dot-notation: ["error", { "allowKeywords": false }]*/

const foo = { "class": "CS 101" }
const x = foo["class"]; // Property name is a reserved word, square-bracket notation required
```

:::

`{ "allowKeywords": false }` 选项的其他正确代码示例：

:::correct

```js
/*eslint dot-notation: ["error", { "allowKeywords": false }]*/

class C {
    #in;
    foo() {
        this.#in; // Dot notation is required for private identifiers
    }
}
```

:::

### allowPattern

例如，准备要发送到外部 API 的数据时，属性名通常需要包含下划线。如果启用了 `camelcase` 规则，则不允许使用这些[蛇形命名](https://en.wikipedia.org/wiki/Snake_case)属性。为 `dot-notation` 规则提供 `allowPattern` 后，就可以使用方括号表示法访问这些蛇形命名属性。

示例 `{ "allowPattern": "^[a-z]+(_[a-z]+)+$" }` 选项（用于匹配蛇形命名属性的模式）的错误代码示例：

:::incorrect

```js
/*eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }]*/

const data = {};
data["fooBar"] = 42;
```

:::
示例 `{ "allowPattern": "^[a-z]+(_[a-z]+)+$" }` 选项（用于匹配蛇形命名属性的模式）的正确代码示例：

:::correct

```js
/*eslint dot-notation: ["error", { "allowPattern": "^[a-z]+(_[a-z]+)+$" }]*/

const data = {};
data["foo_bar"] = 42;
```

:::