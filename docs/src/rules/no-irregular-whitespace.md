---
title: no-irregular-whitespace
rule_type: problem
further_reading:
- https://es5.github.io/#x7.2
- https://web.archive.org/web/20200414142829/http://timelessrepo.com/json-isnt-a-javascript-subset
- https://codepoints.net/U+1680
---



无效或不规则的空白字符会导致 ECMAScript 5 解析器出现问题，也会像混用制表符和空格一样，让代码更难调试。

程序员可能会因复制内容或使用键盘快捷键而意外输入各种空白字符。例如，在 macOS 上按下 Alt + Space 会插入一个不换行空格。

解决此问题的简单方法是从头重写有问题的那一行。这也可能是文本编辑器引入的问题：如果重写该行仍无法解决，请尝试使用其他编辑器。

这些空格已知会导致以下问题：

* 奥甘空格符
    * 它是有效的标记分隔符，但在大多数字体中会显示为可见字形，可能会误导阅读源代码的人。
* 蒙古文元音分隔符
    * 自 Unicode 6.3 起，它不再被视为空格分隔符。在当前解析器中，如果用它代替常规标记分隔符，会导致语法错误。
* 行分隔符和段落分隔符
    * 它们一直都是有效的空白字符和行终止符，但在 ECMAScript 2019 之前，在字符串字面量中被视为非法字符。
* 零宽空格
    * 它不被视为标记分隔符，通常会被解析为 `Unexpected token ILLEGAL`。
    * 现代浏览器不会显示它，因此需要由代码仓库软件处理其可视化问题。

在 JSON 中，本规则列出的不规则空白字符均不得出现在字符串之外。

<a id="rule-details"></a>
## 规则详情

此规则旨在捕获并非普通制表符或空格的无效空白字符。其中一些字符可能会在现代浏览器中引发问题，其他字符则可能难以发现，导致调试困难。

除选项允许的情况外，此规则禁止使用以下字符：

```text
\u000B - Line Tabulation (\v) - <VT>
\u000C - Form Feed (\f) - <FF>
\u0085 - Next Line - <NEL>
\u00A0 - No-Break Space - <NBSP>
\u1680 - Ogham Space Mark - <OGSP>
\u180E - Mongolian Vowel Separator - <MVS>
\u2000 - En Quad - <NQSP>
\u2001 - Em Quad - <MQSP>
\u2002 - En Space - <ENSP>
\u2003 - Em Space - <EMSP>
\u2004 - Three-Per-Em - <THPMSP> - <3/MSP>
\u2005 - Four-Per-Em - <FPMSP> - <4/MSP>
\u2006 - Six-Per-Em - <SPMSP> - <6/MSP>
\u2007 - Figure Space - <FSP>
\u2008 - Punctuation Space - <PUNCSP>
\u2009 - Thin Space - <THSP>
\u200A - Hair Space - <HSP>
\u200B - Zero Width Space - <ZWSP>
\u2028 - Line Separator - <LS> - <LSEP>
\u2029 - Paragraph Separator - <PS> - <PSEP>
\u202F - Narrow No-Break Space - <NNBSP>
\u205F - Medium Mathematical Space - <MMSP>
\u3000 - Ideographic Space - <IDSP>
\uFEFF - Zero Width No-Break Space - <BOM>
```

<a id="options"></a>
## 选项

此规则有一个对象选项，用于设置例外：

* `"skipStrings": true`（默认值）允许字符串字面量中出现任意空白字符
* `"skipComments": true` 允许注释中出现任意空白字符
* `"skipRegExps": true` 允许正则表达式字面量中出现任意空白字符
* `"skipTemplates": true` 允许模板字面量中出现任意空白字符
* `"skipJSXText": true` 允许 JSX 文本中出现任意空白字符

### skipStrings

以下代码示例在此规则的默认 `{ "skipStrings": true }` 选项下属于**错误**：

::: incorrect

```js
/*eslint no-irregular-whitespace: "error"*/

const thing = function() /*<NBSP>*/{
    return 'test';
}

const foo = function( /*<NBSP>*/){
    return 'test';
}

const bar = function /*<NBSP>*/(){
    return 'test';
}

const baz = function /*<Ogham Space Mark>*/(){
    return 'test';
}

const qux = function() {
    return 'test'; /*<ENSP>*/
}

const quux = function() {
    return 'test'; /*<NBSP>*/
}

const item = function() {
    // Description <NBSP>: some descriptive text
}

/*
Description <NBSP>: some descriptive text
*/

const func = function() {
    return / <NBSP>regexp/;
}

const myFunc = function() {
    return `template <NBSP>string`;
}
```

:::

以下代码示例在此规则的默认 `{ "skipStrings": true }` 选项下属于**正确**：

::: correct

```js
/*eslint no-irregular-whitespace: "error"*/

const thing = function() {
    return ' <NBSP>thing';
}

const foo = function() {
    return '​<ZWSP>thing';
}

const bar = function() {
    return 'th <NBSP>ing';
}
```

:::

### skipComments

以下是启用 `{ "skipComments": true }` 选项后新增的**正确**代码示例：

::: correct

```js
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/

function thing() {
    // Description <NBSP>: some descriptive text
}

/*
Description <NBSP>: some descriptive text
*/
```

:::

### skipRegExps

以下是启用 `{ "skipRegExps": true }` 选项后新增的**正确**代码示例：

::: correct

```js
/*eslint no-irregular-whitespace: ["error", { "skipRegExps": true }]*/

function thing() {
    return / <NBSP>regexp/;
}
```

:::

### skipTemplates

以下是启用 `{ "skipTemplates": true }` 选项后新增的**正确**代码示例：

::: correct

```js
/*eslint no-irregular-whitespace: ["error", { "skipTemplates": true }]*/

function thing() {
    return `template <NBSP>string`;
}
```

:::

### skipJSXText

以下是启用 `{ "skipJSXText": true }` 选项后新增的**正确**代码示例：

::: correct { "parserOptions": { "ecmaFeatures": { "jsx": true } } }

```jsx
/*eslint no-irregular-whitespace: ["error", { "skipJSXText": true }]*/

function Thing() {
    return <div>text in JSX</div>; // <NBSP> before `JSX`
}
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你决定在应用中字符串之外也使用制表符和空格以外的空白字符，则不应使用此规则。
