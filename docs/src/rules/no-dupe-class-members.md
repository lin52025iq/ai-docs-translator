---
title: no-dupe-class-members
rule_type: problem
handled_by_typescript: true
---



如果类成员中存在同名声明，最后一个声明会静默覆盖其他声明。
这可能导致意外行为。

```js
class Foo {
  bar() { console.log("hello"); }
  bar() { console.log("goodbye"); }
}

const foo = new Foo();
foo.bar(); // goodbye
```

<a id="rule-details"></a>

## 规则详情

此规则旨在标记类成员中使用重复名称的情况。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-dupe-class-members: "error"*/

class A {
  bar() { }
  bar() { }
}

class B {
  bar() { }
  get bar() { }
}

class C {
  bar;
  bar;
}

class D {
  bar;
  bar() { }
}

class E {
  static bar() { }
  static bar() { }
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-dupe-class-members: "error"*/

class A {
  bar() { }
  qux() { }
}

class B {
  get bar() { }
  set bar(value) { }
}

class C {
  bar;
  qux;
}

class D {
  bar;
  qux() { }
}

class E {
  static bar() { }
  bar() { }
}
```

:::

此规则还支持 TypeScript 类型语法，也支持 TypeScript 的方法重载定义。

此规则的**正确** TypeScript 代码示例：

::: correct

```ts
/* eslint no-dupe-class-members: "error" */

class A {
	foo(value: string): void;
	foo(value: number): void;
	foo(value: string | number) {} // ✅ This is the actual implementation.
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。

<a id="when-not-to-use-it"></a>

## 不应使用此规则的情况

此规则不应用于 ES3/5 环境。

在 ES2015 (ES6) 或更高版本中，如果你不希望收到有关类成员重复名称的提示，可以放心禁用此规则。