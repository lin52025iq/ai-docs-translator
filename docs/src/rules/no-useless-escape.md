---
title: no-useless-escape
rule_type: suggestion
---





对字符串、模板字面量和正则表达式中的非特殊字符进行转义不会产生任何效果，如下例所示：

```js
let foo = "hol\a"; // > foo = "hola"
let bar = `${foo}\!`; // > bar = "hola!"
let baz = /\:/ // same functionality with /:/
```

<a id="rule-details"></a>

## 规则详情

此规则会标记那些可以安全移除且不会改变行为的转义。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-useless-escape: "error"*/

"\'";
'\"';
"\#";
"\e";
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
/[\[]/;
/[a-z\-]/;
```

:::

此规则的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint no-useless-escape: "error"*/

"\"";
'\'';
"\x12";
"\u00a9";
"\371";
"xs\u2111";
`\``;
`\${${foo}}`;
`$\{${foo}}`;
/\\/g;
/\t/g;
/\w\$\*\^\./;
/[[]/;
/[\]]/;
/[a-z-]/;
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `allowRegexCharacters` - 一个字符数组，指定正则表达式中允许出现不必要转义的字符。此选项适用于 `-` 之类的字符，因为对它们进行转义可以避免意外形成字符范围。例如，在 `/[0\-]/` 中，转义在技术上并非必需，但如果之后添加另一个字符（例如 `/[0\-9]/` 与 `/[0-9]/`），它有助于避免模式变成字符范围。

### allowRegexCharacters

对于 `{ "allowRegexCharacters": ["-"] }` 选项，以下是**错误**代码示例：

::: incorrect

```js
/*eslint no-useless-escape: ["error", { "allowRegexCharacters": ["-"] }]*/

/\!/;
/\@/;
/[a-z\^]/;
```

:::

对于 `{ "allowRegexCharacters": ["-"] }` 选项，以下是**正确**代码示例：

::: correct

```js
/*eslint no-useless-escape: ["error", { "allowRegexCharacters": ["-"] }]*/

/[0\-]/;
/[\-9]/;
/a\-b/;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你不想收到有关不必要转义的提示，可以放心禁用此规则。
