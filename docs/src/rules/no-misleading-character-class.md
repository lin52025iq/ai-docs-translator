---
title: no-misleading-character-class
rule_type: problem
---





Unicode 中包含由多个码位组成的字符。
RegExp 字符类语法（`/[abc]/`）无法将由多个码位组成的字符作为一个字符处理；这些字符会被拆分为各个码位。例如，`❇️` 由 `❇`（`U+2747`）和 VARIATION SELECTOR-16（`U+FE0F`）组成。如果该字符出现在 RegExp 字符类中，它匹配的将是 `❇`（`U+2747`）或 VARIATION SELECTOR-16（`U+FE0F`），而不是 `❇️`。

此规则会报告字符类语法中包含多个码位字符的正则表达式。此规则将以下字符视为多个码位字符。

**带有组合字符的字符：**

组合字符是属于 [Unicode 通用类别](https://www.unicode.org/L2/L1999/UnicodeData.html#General%20Category) `Mc`、`Me` 和 `Mn` 之一的字符。

```js
/^[Á]$/u.test("Á"); //→ false
/^[❇️]$/u.test("❇️"); //→ false
```

**带有 Emoji 修饰符的字符：**

```js
/^[👶🏻]$/u.test("👶🏻"); //→ false
/^[👶🏽]$/u.test("👶🏽"); //→ false
```

**一对区域指示符号：**

```js
/^[🇯🇵]$/u.test("🇯🇵"); //→ false
```

**由 ZWJ 连接的字符：**

```js
/^[👨‍👩‍👦]$/u.test("👨‍👩‍👦"); //→ false
```

**不带 Unicode 标志的代理对：**

```js
/^[👍]$/.test("👍"); //→ false

// Surrogate pair is OK if with u flag.
/^[👍]$/u.test("👍"); //→ true
```

<a id="rule-details"></a>

## 规则详情

此规则会报告字符类语法中包含多个码位字符的正则表达式。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-misleading-character-class: error */

/^[Á]$/u;
/^[❇️]$/u;
/^[👶🏻]$/u;
/^[🇯🇵]$/u;
/^[👨‍👩‍👦]$/u;
/^[👍]$/;
new RegExp("[🎵]");
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-misleading-character-class: error */

/^[abc]$/;
/^[👍]$/u;
/^[\q{👶🏻}]$/v;
new RegExp("^[]$");
new RegExp(`[Á-${z}]`, "u"); // variable pattern
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"allowEscape"`：设为 `true` 时，只要字符类中的码位组合以转义序列形式书写，此规则就允许该组合。此选项仅对正则表达式字面量，以及使用字面量参数作为模式创建的 `RegExp` 构造函数正则表达式生效。

### allowEscape

启用 `{ "allowEscape": true }` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/* eslint no-misleading-character-class: ["error", { "allowEscape": true }] */

/[\👍]/; // backslash can be omitted

new RegExp("[\ud83d" + "\udc4d]");

const pattern = "[\ud83d\udc4d]";
new RegExp(pattern);
```

:::

启用 `{ "allowEscape": true }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/* eslint no-misleading-character-class: ["error", { "allowEscape": true }] */

/[\ud83d\udc4d]/;
/[\u00B7\u0300-\u036F]/u;
/[👨\u200d👩]/u;
new RegExp("[\x41\u0301]");
new RegExp(`[\u{1F1EF}\u{1F1F5}]`, "u");
new RegExp("[\\u{1F1EF}\\u{1F1F5}]", "u");
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你不想检查 RegExp 字符类语法中是否包含多个码位字符，可以关闭此规则。
