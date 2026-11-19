---
title: no-unused-private-class-members
rule_type: problem
---


声明后却未在代码任何位置使用的私有类成员，很可能是重构未完成导致的错误。这类成员会占用代码空间，也可能让读者感到困惑。

<a id="rule-details"></a>

## 规则详情

此规则会报告未使用的私有类成员。

* 如果私有字段或方法的值从未被读取，则视为未使用。
* 如果私有访问器从未被访问（读取或写入），则视为未使用。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-unused-private-class-members: "error"*/

class A {
    #unusedMember = 5;
}

class B {
    #usedOnlyInWrite = 5;
    method() {
        this.#usedOnlyInWrite = 42;
    }
}

class C {
    #usedOnlyToUpdateItself = 5;
    method() {
        this.#usedOnlyToUpdateItself++;
    }
}

class D {
    #unusedMethod() {}
}

class E {
    get #unusedAccessor() {}
    set #unusedAccessor(value) {}
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-unused-private-class-members: "error"*/

class A {
    #usedMember = 42;
    method() {
        return this.#usedMember;
    }
}

class B {
    #usedMethod() {
        return 42;
    }
    anotherMethod() {
        return this.#usedMethod();
    }
}

class C {
    get #usedAccessor() {}
    set #usedAccessor(value) {}
    
    method() {
        this.#usedAccessor = 42;
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 何时不使用

如果不希望收到有关未使用私有类成员的通知，可以放心地关闭此规则。
