---
title: no-constant-binary-expression
rule_type: problem
related_rules:
- no-constant-condition
further_reading:
- https://eslint.org/blog/2022/07/interesting-bugs-caught-by-no-constant-binary-expression/
---


比较结果始终为 true 或 false，以及始终会短路或从不短路的逻辑表达式（`||`、`&&`、`??`），都可能表明程序中存在错误。

在复杂表达式中，这类错误尤为常见，因为运算符优先级很容易被误判。例如：

```js
// One might think this would evaluate as `a + (b ?? c)`:
const x = a + b ?? c;

// But it actually evaluates as `(a + b) ?? c`. Since `a + b` can never be null,
// the `?? c` has no effect.
```

此外，此规则还会检测与新创建的对象、数组、函数等进行的比较。在 JavaScript 中，对象按引用进行比较，因此新创建的对象永远不可能与任何其他值相等（`===`）。对于来自按值比较对象的语言的程序员来说，这可能令人意外。

```js
// Programmers coming from a language where objects are compared by value might expect this to work:
const isEmpty = x === [];

// However, this will always result in `isEmpty` being `false`.
```

<a id="rule-details"></a>

## 规则详情

此规则会识别根据 JavaScript 语言语义，结果始终为 `true` 或 `false` 的 `==` 和 `===` 比较。

它还会识别始终会短路或从不短路的 `||`、`&&` 和 `??` 逻辑表达式。此外，配置 `checkRelationalComparisons` 选项后，它还可以识别结果恒定的关系比较（例如 `<` 或 `>=`）。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-constant-binary-expression: "error"*/

const value1 = +x == null;

const value2 = condition ? x : {} || DEFAULT;

const value3 = !foo == null;

const value4 = new Boolean(foo) === true;

const objIsEmpty = someObj === {};

const arrIsEmpty = someArr === [];

const shortCircuit1 = condition1 && false && condition2;

const shortCircuit2 = condition1 || true || condition2;

const shortCircuit3 = condition1 ?? "non-nullish" ?? condition2;
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-constant-binary-expression: "error"*/

const value1 = x == null;

const value2 = (condition ? x : {}) || DEFAULT;

const value3 = !(foo == null);

const value4 = Boolean(foo) === true;

const objIsEmpty = Object.keys(someObj).length === 0;

const arrIsEmpty = someArr.length === 0;
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"checkRelationalComparisons": true`（默认值为 `false`）会检查两侧均为字面量的关系比较（`<`、`<=`、`>`、`>=`）。

### checkRelationalComparisons

使用 `{ "checkRelationalComparisons": true }` 选项时，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-constant-binary-expression: ["error", { "checkRelationalComparisons": true } ]*/

const value1 = 1 < 2;

const value2 = "a" >= "b";

const value3 = true > false;

const hasStreak = profile.streak ?? 0 > 1;
```

:::

使用 `{ "checkRelationalComparisons": true }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-constant-binary-expression: ["error", { "checkRelationalComparisons": true } ]*/

const value1 = 1 < x;

const value2 = a >= b;

const hasStreak = (profile.streak ?? 0) > 1;
```

:::