---
title: no-reserved-keys

further_reading:
- https://compat-table.github.io/compat-table/es5/#test-Object/array_literal_extensions_Reserved_words_as_property_names
---

禁止在对象字面量中将未加引号的保留字用作属性名。

::: important
此规则已在 ESLint v1.0.0 中移除，并由 [quote-props](quote-props) 规则取代。
:::

ECMAScript 3 将一系列用于或旨在用于核心语言功能的单词称为关键字和保留字，例如 `if` 和 `public`。规范还指出，这些关键字和保留字必须用字符串括起来，才能用作对象属性名。在 ECMAScript 3 环境中，如果在对象字面量中使用关键字或保留字，就会出错。例如：

```js
var values = {
    enum: ["red", "blue", "green"]  // throws an error in ECMAScript 3
}
```

在这段代码中，`enum` 被用作对象键，在 ECMAScript 3 环境（例如 Internet Explorer 8）中会导致错误。

ECMAScript 5 放宽了限制，允许将关键字和保留字用作对象键而不会导致错误。不过，仍需要避免在必须运行于 ECMAScript 3 的代码中将关键字和保留字用作键。

<a id="rule-details"></a>

## 规则详情

此规则旨在避免将 ECMAScript 3 的关键字和保留字用作对象字面量的键。因此，每当某个对象键在 ECMAScript 3 环境中会导致错误时，此规则都会发出警告。

此规则的错误代码示例：

::: incorrect

```js
var superman = {
    class: "Superhero",
    private: "Clark Kent"
};

var values = {
    enum: ["red", "blue", "green"]
};
```

:::

此规则的正确代码示例：

::: correct

```js
var superman = {
    "class": "Superhero",
    "private": "Clark Kent"
};

var values = {
    "enum": ["red", "blue", "green"]
};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果代码只会在 ECMAScript 5 或更高版本的环境中执行，则可以放心地关闭此规则。

