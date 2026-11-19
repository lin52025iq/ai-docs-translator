---
title: no-unreachable-loop
rule_type: problem
related_rules:
- no-unreachable
- no-constant-condition
- no-unmodified-loop-condition
- for-direction
---


如果循环永远无法执行第二次迭代，则代码中可能存在错误。

```js
for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === myName) {
        doSomething(arr[i]);
        // break was supposed to be here
    }
    break;
}
```

在少数情况下，如果预期只执行一次（或至多一次）迭代，则应将代码重构为使用 `if` 条件语句，而不是 `while`、`do-while` 和 `for` 循环。最佳实践是避免在此类场景中使用循环结构。

<a id="rule-details"></a>

## 规则详情

此规则通过对循环体进行静态代码路径分析，旨在检测并禁止至多只能执行一次迭代的循环。

具体来说，如果循环体在所有代码路径中都会退出循环，此规则就会禁止该循环。如果循环体中的所有代码路径最终都会以 `break`、`return` 或 `throw` 语句结束，那么无论循环条件如何，该循环的第二次迭代都必然无法到达。

此规则会检查 `while`、`do-while`、`for`、`for-in` 和 `for-of` 循环。你可以选择禁用对其中每种结构的检查。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-unreachable-loop: "error"*/

while (foo) {
    doSomething(foo);
    foo = foo.parent;
    break;
}

function verifyList(head) {
    let item = head;
    do {
        if (verify(item)) {
            return true;
        } else {
            return false;
        }
    } while (item);
}

function findSomething(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (isSomething(arr[i])) {
            return arr[i];
        } else {
            throw new Error("Doesn't exist.");
        }
    }
}

for (key in obj) {
    if (key.startsWith("_")) {
        break;
    }
    firstKey = key;
    firstValue = obj[key];
    break;
}

for (foo of bar) {
    if (foo.id === id) {
        doSomething(foo);
    }
    break;
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unreachable-loop: "error"*/

while (foo) {
    doSomething(foo);
    foo = foo.parent;
}

function verifyList(head) {
    let item = head;
    do {
        if (verify(item)) {
            item = item.next;
        } else {
            return false;
        }
    } while (item);

    return true;
}

function findSomething(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (isSomething(arr[i])) {
            return arr[i];
        }
    }
    throw new Error("Doesn't exist.");
}

for (key in obj) {
    if (key.startsWith("_")) {
        continue;
    }
    firstKey = key;
    firstValue = obj[key];
    break;
}

for (foo of bar) {
    if (foo.id === id) {
        doSomething(foo);
        break;
    }
}
```

:::

请注意，此规则并非用于检查循环条件，因此对于以下示例中的情况不会发出警告。

此规则的其他**正确**代码示例：

::: correct

```js
/*eslint no-unreachable-loop: "error"*/

do {
    doSomething();
} while (false)

for (let i = 0; i < 1; i++) {
    doSomething(i);
}

for (const a of [1]) {
    doSomething(a);
}
```

:::

<a id="options"></a>

## 选项

此规则接受一个对象选项，其中包含一个选项：

* `"ignore"` - 一个可选数组，包含此规则将忽略的循环类型。

### ignore

你可以在 `"ignore"` 数组中指定最多 5 个不同的元素：

* `"WhileStatement"` - 忽略所有 `while` 循环。
* `"DoWhileStatement"` - 忽略所有 `do-while` 循环。
* `"ForStatement"` - 忽略所有 `for` 循环（不适用于 `for-in` 和 `for-of` 循环）。
* `"ForInStatement"` - 忽略所有 `for-in` 循环。
* `"ForOfStatement"` - 忽略所有 `for-of` 循环。

使用 `"ignore"` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unreachable-loop: ["error", { "ignore": ["ForInStatement", "ForOfStatement"] }]*/

for (let key in obj) {
  hasEnumerableProperties = true;
  break;
}

for (const a of b) break;
```

:::

<a id="known-limitations"></a>

## 已知限制

通常，静态代码路径分析不会评估条件。因此，此规则可能无法报告以下情况：

```js
for (let i = 0; i < 10; i++) {
    doSomething(i);
    if (true) {
        break;
    }
}
```
