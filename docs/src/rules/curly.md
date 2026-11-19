---
title: curly
rule_type: suggestion
---



JavaScript 允许在代码块只包含一条语句时省略花括号。不过，许多人认为，即使花括号是可选的，也最好永远不要省略代码块周围的花括号，因为这样可能导致错误，并降低代码的清晰度。因此，下面的代码：

```js
if (foo) foo++;
```

可以改写为：

```js
if (foo) {
    foo++;
}
```

不过，也有人更倾向于只在要执行多条语句时使用花括号。

<a id="rule-details"></a>

## 规则详情

此规则旨在确保代码块语句都用花括号括起来，从而预防错误并提高代码清晰度。遇到省略花括号的代码块时，此规则会发出警告。

<a id="options"></a>

## 选项

### all

默认的 `"all"` 选项下的错误代码示例：

::: incorrect

```js
/*eslint curly: "error"*/

if (foo) foo++;

while (bar)
    baz();

if (foo) {
    baz();
} else qux();
```

:::

默认的 `"all"` 选项下的正确代码示例：

::: correct

```js
/*eslint curly: "error"*/

if (foo) {
    foo++;
}

while (bar) {
    baz();
}

if (foo) {
    baz();
} else {
    qux();
}
```

:::

### multi

默认情况下，当 `if`、`else`、`for`、`while` 或 `do` 的主体未使用代码块语句时，此规则会发出警告。不过，你可以指定只有当代码块中有多条语句时才使用代码块语句，并在代码块中只有一条语句时发出警告。

`"multi"` 选项下的错误代码示例：

::: incorrect

```js
/*eslint curly: ["error", "multi"]*/

if (foo) {
    foo++;
}

if (foo) bar();
else {
    foo++;
}

while (true) {
    doSomething();
}

for (let i=0; i < items.length; i++) {
    doSomething();
}
```

:::

`"multi"` 选项下的正确代码示例：

::: correct

```js
/*eslint curly: ["error", "multi"]*/

if (foo) foo++;

else foo();

while (true) {
    doSomething();
    doSomethingElse();
}
```

:::

### multi-line

或者，你可以放宽此规则，允许单行的 `if`、`else if`、`else`、`for`、`while` 或 `do` 不带花括号，同时仍要求其他情况下使用花括号。

`"multi-line"` 选项下的错误代码示例：

::: incorrect

```js
/*eslint curly: ["error", "multi-line"]*/

if (foo)
  doSomething();
else
  doSomethingElse();

if (foo) foo(
  bar,
  baz);
```

:::

`"multi-line"` 选项下的正确代码示例：

::: correct

```js
/*eslint curly: ["error", "multi-line"]*/

if (foo) foo++; else doSomething();

if (foo) foo++;
else if (bar) baz()
else doSomething();

do something();
while (foo);

while (foo
  && bar) baz();

if (foo) {
    foo++;
}

if (foo) { foo++; }

while (true) {
    doSomething();
    doSomethingElse();
}
```

:::

### multi-or-nest

你也可以使用另一种配置：当 `if`、`else if`、`else`、`for`、`while` 或 `do` 的主体仅包含一条单行语句时，强制不使用花括号；其他情况下则强制使用花括号。

`"multi-or-nest"` 选项下的错误代码示例：

::: incorrect

```js
/*eslint curly: ["error", "multi-or-nest"]*/

if (!foo)
    foo = {
        bar: baz,
        qux: foo
    };

while (true)
  if(foo)
      doSomething();
  else
      doSomethingElse();

if (foo) {
    foo++;
}

while (true) {
    doSomething();
}

for (let i = 0; foo; i++) {
    doSomething();
}
```

:::

`"multi-or-nest"` 选项下的正确代码示例：

::: correct

```js
/*eslint curly: ["error", "multi-or-nest"]*/

if (!foo) {
    foo = {
        bar: baz,
        qux: foo
    };
}

while (true) {
  if(foo)
      doSomething();
  else
      doSomethingElse();
}

if (foo)
    foo++;

while (true)
    doSomething();

for (let i = 0; foo; i++)
    doSomething();
```

:::

对于前面有注释的单行语句，可以使用花括号，但并非必须。

`"multi-or-nest"` 选项的其他正确代码示例：

::: correct

```js
/*eslint curly: ["error", "multi-or-nest"]*/

if (foo)
    // some comment
    bar();

if (foo) {
    // some comment
    bar();
}
```

:::

### consistent

使用任意 `multi*` 选项时，你可以添加一个选项，强制 `if`、`else if` 和 `else` 链中的所有主体统一使用或不使用花括号。

`"multi", "consistent"` 选项下的错误代码示例：

::: incorrect

```js
/*eslint curly: ["error", "multi", "consistent"]*/

if (foo) {
    bar();
    baz();
} else
    buz();

if (foo)
    bar();
else if (faa)
    bor();
else {
    other();
    things();
}

if (true)
    foo();
else {
    baz();
}

if (foo) {
    foo++;
}
```

:::

`"multi", "consistent"` 选项下的正确代码示例：

::: correct

```js
/*eslint curly: ["error", "multi", "consistent"]*/

if (foo) {
    bar();
    baz();
} else {
    buz();
}

if (foo) {
    bar();
} else if (faa) {
    bor();
} else {
    other();
    things();
}

if (true)
    foo();
else
    baz();

if (foo)
    foo++;

```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你对何时使用代码块语句没有严格约定，可以放心禁用此规则。
