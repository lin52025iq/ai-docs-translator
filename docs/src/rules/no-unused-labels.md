---
title: no-unused-labels
rule_type: suggestion
related_rules:
- no-extra-label
- no-labels
- no-label-var
---




标签已声明但在代码中从未使用，这通常是重构未完成导致的错误。

```js
OUTER_LOOP:
for (const student of students) {
    if (checkScores(student.scores)) {
        continue;
    }
    doSomething(student);
}
```

在这种情况下，很可能是忘记删除 `OUTER_LOOP:`。
这类标签会占用代码空间，也可能令读者困惑。

<a id="rule-details"></a>

## 规则详情

此规则旨在消除未使用的标签。

此规则报告的问题可以自动修复，但以下情况除外：标签与其后的语句之间有注释，或者删除标签会导致其后的语句变成指令，例如 `"use strict"`。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-labels: "error"*/

A: var foo = 0;

B: {
    foo();
}

C:
for (let i = 0; i < 10; ++i) {
    foo();
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unused-labels: "error"*/

A: {
    if (foo()) {
        break A;
    }
    bar();
}

B:
for (let i = 0; i < 10; ++i) {
    if (foo()) {
        break B;
    }
    bar();
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果不希望收到有关未使用标签的提示，可以放心禁用此规则。
