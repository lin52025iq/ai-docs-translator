---
title: space-unary-ops
rule_type: layout
---
某些风格指南要求或禁止一元运算符前后出现空格。这主要是风格问题，但某些 JavaScript 表达式即使不加空格也能书写，这会降低代码的可读性和可维护性。

<a id="rule-details"></a>

## 规则详情

此规则要求 `words` 一元运算符后以及 `nonwords` 一元运算符前后空格的使用保持一致。

对于 `words` 运算符，此规则仅在语法上不要求空格时适用。例如，`delete obj.foo` 必须包含空格，因此此规则不会对其进行检查。等效的 `delete(obj.foo)` 中的空格是可选的（`delete (obj.foo)`），因此此规则会对其进行检查。

一元 `words` 运算符示例：

```js
// new
var joe = new Person();

// delete
var obj = {
    foo: 'bar'
};
delete obj.foo;

// typeof
typeof {} // object

// void
void 0 // undefined
```

一元 `nonwords` 运算符示例：

```js
if ([1,2,3].indexOf(1) !== -1) {};
foo = --foo;
bar = bar++;
baz = !foo;
qux = !!baz;
```

<a id="options"></a>

## 选项

此规则有三个选项：

* `words` - 适用于 `new`、`delete`、`typeof`、`void`、`yield` 等一元单词运算符
* `nonwords` - 适用于 `-`、`+`、`--`、`++`、`!`、`!!` 等一元运算符
* `overrides` - 指定对各个运算符（无论是单词还是非单词运算符）的空格用法进行覆盖。默认值为空，但可用于强制要求或禁止运算符周围的空格。例如：

```js
    "space-unary-ops": [
        2, {
          "words": true,
          "nonwords": false,
          "overrides": {
            "new": false,
            "++": true
          }
    }]
```

在此情况下，`new` 运算符后禁止有空格，而 `++` 运算符前后都必须有空格。

以下是此规则在默认选项 `{"words": true, "nonwords": false}` 下的**错误**代码示例：

::: incorrect

```js
/*eslint space-unary-ops: "error"*/

typeof!foo;

void{foo:0};

new[foo][0];

delete(foo.bar);

++ foo;

foo --;

- foo;

+ "3";
```

:::

::: incorrect

```js
/*eslint space-unary-ops: "error"*/

function *foo() {
    yield(0)
}
```

:::

::: incorrect

```js
/*eslint space-unary-ops: "error"*/

async function foo() {
    await(bar);
}
```

:::

以下是此规则在选项 `{"words": true, "nonwords": false}` 下的**正确**代码示例：

::: correct

```js
/*eslint space-unary-ops: "error"*/

// Word unary operator "typeof" is followed by a whitespace.
typeof !foo;

// Word unary operator "void" is followed by a whitespace.
void {foo:0};

// Word unary operator "new" is followed by a whitespace.
new [foo][0];

// Word unary operator "delete" is followed by a whitespace.
delete (foo.bar);

// Unary operator "++" is not followed by whitespace.
++foo;

// Unary operator "--" is not preceded by whitespace.
foo--;

// Unary operator "-" is not followed by whitespace.
-foo;

// Unary operator "+" is not followed by whitespace.
+"3";
```

:::

::: correct

```js
/*eslint space-unary-ops: "error"*/

function *foo() {
    yield (0)
}
```

:::

::: correct

```js
/*eslint space-unary-ops: "error"*/

async function foo() {
    await (bar);
}
```

:::