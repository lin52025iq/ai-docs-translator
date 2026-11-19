---
title: no-setter-return
rule_type: problem
handled_by_typescript: true
related_rules:
- getter-return
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
---



setter 不能返回值。

虽然从 setter 返回值不会导致错误，但返回值会被忽略。因此，从 setter 返回值要么是多余的，要么可能是错误，因为返回值无法使用。

<a id="rule-details"></a>

## 规则详情

此规则禁止从 setter 返回值，并会报告 setter 函数中的 `return` 语句。

只允许不带值的 `return`，因为它是一种控制流语句。

此规则会检查以下位置的 setter：

* 对象字面量。
* 类声明和类表达式。
* 全局对象的 `Object.create`、`Object.defineProperty`、`Object.defineProperties` 和 `Reflect.defineProperty` 方法中的属性描述符。

此规则的错误代码示例：

::: incorrect

```js
/*eslint no-setter-return: "error"*/

const foo = {
    set a(value) {
        this.val = value;
        return value;
    }
};

class Foo {
    set a(value) {
        this.val = value * 2;
        return this.val;
    }
}

const Bar = class {
    static set a(value) {
        if (value < 0) {
            this.val = 0;
            return 0;
        }
        this.val = value;
    }
};

Object.defineProperty(foo, "bar", {
    set(value) {
        if (value < 0) {
            return false;
        }
        this.val = value;
    }
});
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint no-setter-return: "error"*/

const foo = {
    set a(value) {
        this.val = value;
    }
};

class Foo {
    set a(value) {
        this.val = value * 2;
    }
}

const Bar = class {
    static set a(value) {
        if (value < 0) {
            this.val = 0;
            return;
        }
        this.val = value;
    }
};

Object.defineProperty(foo, "bar", {
    set(value) {
        if (value < 0) {
            throw new Error("Negative value.");
        }
        this.val = value;
    }
});
```

:::

<a id="options"></a>

## 选项

此规则没有选项。