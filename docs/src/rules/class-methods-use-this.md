---
title: class-methods-use-this
rule_type: suggestion
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
---

[类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 常用于将可复用逻辑（尤其是有状态的逻辑）封装到对象中，并通过 `this` 访问每个实例的状态。当 API 采用实例方法时，它向使用者传达了以下信息：

- 方法的结果与调用它的对象有关，也可能与该对象的状态有关。

	```js
	const array1 = [1, 2, 3];
	const array2 = [4, 5, 6];

    // Using the `includes()` method on different objects gives different results:
	array1.includes(1); // true
	array2.includes(1); // false

	// Modifying the state of an object may change the outcome of its instance methods:
	array2.push(1);
	array2.includes(1); // true
	```

- 如果没有关联的对象，该方法就没有意义。（例如，不提供数组来操作，就没有意义调用 `Array#includes()`。）

类方法也可能不使用 `this`，例如：

```js
class Person {
    sayHi() {
        console.log("Hi!");
    }
}

const person = new Person();
person.sayHi(); // => "Hi!"
```

如果类的实例方法不使用 `this`，通常意味着它不会访问任何实例状态，因此没有必要将它定义为方法。
因此，有时可以将它重构为[普通函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)或[静态方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)，从而更好地向 API 使用者传达意图。

在上面的示例中，`sayHi` 方法没有使用 `this`，因此我们可以将它改为普通函数：

```js
// Ordinary function
function sayHi() {
	console.log("Hi!");
}

// No need for `Person` class or any instance thereof
sayHi(); // => "Hi!"

// Alternately, a static method may be used if it offers a more natural API
class Person {
    static sayHi() {
        console.log("Hi!");
    }
}

Person.sayHi(); // => "Hi!"

// Keep in mind that, either way, the following now throws an error,
// since sayHi() is no longer an instance method!
//
// const person = new Person();
// person.sayHi();
```

作者也可能忘记使用原本打算包含在方法中的某些实例数据。

```js
class Person {
	constructor(name) {
		this.name = name;
	}

	sayHi() {
		console.log(`Hi from ${this.name}!`);
	}
}

const alice = new Person('Alice');
alice.sayHi(); // => 'Hi from Alice!'

const bob = new Person('Bob');
bob.sayHi(); // => 'Hi from Bob!'
```

<a id="rule-details"></a>

## 规则详情

此规则会标记未使用 `this` 的类实例方法。

此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint class-methods-use-this: "error"*/

class A {
    foo() {
        console.log("Hello World"); /* error Expected 'this' to be used by class method 'foo'. */
    }
}
```

:::

此规则下的**正确**代码示例：

::: correct

```js
/*eslint class-methods-use-this: "error"*/

class A {
    foo() {
        this.bar = "Hello World"; // OK, `this` is used
    }
}

class B {
    constructor() {
        // OK. constructor is exempt
    }
}

class C {
    static foo() {
        // OK. static methods aren't expected to use this.
    }

    static {
        // OK. static blocks are exempt.
    }
}
```

:::

<a id="options"></a>

## 选项

此规则有四个选项：

- `"exceptMethods"` 允许忽略指定的方法名。
- `"enforceForClassFields"` 强制要求用作实例字段初始化器的箭头函数和函数表达式使用 `this`。这也适用于[第 3 阶段装饰器提案](https://github.com/tc39/proposal-decorators)中的自动访问器字段（使用 `accessor` 关键字声明的字段）。（默认值：`true`）
- `"ignoreOverrideMethods"` 忽略标有 [`override` 修饰符](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag)的成员。（仅适用于 TypeScript，默认值：`false`）
- `"ignoreClassesWithImplements"` 忽略在使用 [`implements`](https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses) 实现接口的类中定义的类成员。（仅适用于 TypeScript）

<a id="exceptmethods"></a>

### exceptMethods

```ts
"class-methods-use-this": [<enabled>, { "exceptMethods": [<...exceptions>] }]
```

`"exceptMethods"` 选项允许你传入一个方法名数组，这些方法名对应的警告将被忽略。例如，外部库的规范可能要求你将某个方法重写为常规函数（而非静态方法），且该函数体内不使用 `this`。此时，你可以将该方法添加到忽略警告的列表中。

未使用 `"exceptMethods"` 时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint class-methods-use-this: "error"*/

class A {
    foo() {
    }
}
```

:::

使用 exceptMethods 时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["foo", "#bar"] }] */

class A {
    foo() {
    }
    #bar() {
    }
}
```

:::

<a id="enforceforclassfields"></a>

### enforceForClassFields

```ts
"class-methods-use-this": [<enabled>, { "enforceForClassFields": true | false }]
```

`enforceForClassFields` 选项强制要求用作实例字段初始化器的箭头函数和函数表达式使用 `this`。这也适用于[第 3 阶段装饰器提案](https://github.com/tc39/proposal-decorators)中的自动访问器字段（使用 `accessor` 关键字声明的字段）。（默认值：`true`）

`{ "enforceForClassFields": true }` 选项（默认值）下，此规则的**错误**代码示例：

::: incorrect

```js
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": true }] */

class A {
    foo = () => {}
}
```

:::

`{ "enforceForClassFields": true }` 选项（默认值）下，此规则的**正确**代码示例：

::: correct

```js
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": true }] */

class A {
    foo = () => {this;}
}
```

:::

`{ "enforceForClassFields": false }` 选项下，此规则的**正确**代码示例：

::: correct

```js
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */

class A {
    foo = () => {}
}
```

:::

`{ "enforceForClassFields": true }` 选项（默认值）下，此规则的 **TypeScript** **错误**代码示例：

::: incorrect

```ts
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": true }] */

class A {
    foo = () => {}
    accessor bar = () => {}
}
```

:::

`{ "enforceForClassFields": true }` 选项（默认值）下，此规则的 **TypeScript** **正确**代码示例：

::: correct

```ts
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": true }] */

class A {
    foo = () => {this;}
    accessor bar = () => {this;}
}
```

:::

`{ "enforceForClassFields": false }` 选项下，此规则的 **TypeScript** **正确**代码示例：

::: correct

```ts
/*eslint class-methods-use-this: ["error", { "enforceForClassFields": false }] */

class A {
    foo = () => {}
    accessor bar = () => {}
}
```

:::

<a id="ignoreoverridemethods"></a>

### ignoreOverrideMethods

```ts
"class-methods-use-this": [<enabled>, { "ignoreOverrideMethods": true | false }]
```

`ignoreOverrideMethods` 选项会忽略标有 `override` 修饰符的成员。（默认值：`false`）

`{ "ignoreOverrideMethods": false }` 选项（默认值）下，此规则的 **TypeScript** **错误**代码示例：

::: incorrect

```ts
/*eslint class-methods-use-this: ["error", { "ignoreOverrideMethods": false }] */

abstract class Base {
    abstract method(): void;
    abstract property: () => void;
}

class Derived extends Base {
    override method() {}
    override property = () => {};
}
```

:::

`{ "ignoreOverrideMethods": false }` 选项（默认值）下，此规则的 **TypeScript** **正确**代码示例：

::: correct

```ts
/*eslint class-methods-use-this: ["error", { "ignoreOverrideMethods": false }] */

abstract class Base {
    abstract method(): void;
    abstract property: () => void;
}

class Derived extends Base {
    override method() {
        this.foo = "Hello World";
    };
    override property = () => {
        this;
    };
}
```

:::

`{ "ignoreOverrideMethods": true }` 选项下，此规则的 **TypeScript** **正确**代码示例：

::: correct

```ts
/*eslint class-methods-use-this: ["error", { "ignoreOverrideMethods": true }] */

abstract class Base {
    abstract method(): void;
    abstract property: () => void;
}

class Derived extends Base {
    override method() {}
    override property = () => {};
}
```

:::

<a id="ignoreclasseswithimplements"></a>

### ignoreClassesWithImplements

```ts
"class-methods-use-this": [<enabled>, { "ignoreClassesWithImplements": "all" | "public-fields" }]
```

`ignoreClassesWithImplements` 选项会忽略在使用 `implements` 实现接口的类中定义的类成员。此选项接受两个可能的值：

- `"all"` - 忽略所有实现接口的类
- `"public-fields"` - 仅忽略实现接口的类中的公共字段

`{ "ignoreClassesWithImplements": "all" }` 选项下，此规则的 **TypeScript** **错误**代码示例：

::: incorrect

```ts
/*eslint class-methods-use-this: ["error", { "ignoreClassesWithImplements": "all" }] */

class Standalone {
    method() {}
    property = () => {};
}
```

:::

`{ "ignoreClassesWithImplements": "all" }` 选项下，此规则的 **TypeScript** **正确**代码示例：

::: correct

```ts
/*eslint class-methods-use-this: ["error", { "ignoreClassesWithImplements": "all" }] */

interface Base {
    method(): void;
}

class Derived implements Base {
    method() {}
    property = () => {};
}
```

:::

`{ "ignoreClassesWithImplements": "public-fields" }` 选项下，此规则的 **TypeScript** **错误**代码示例：

::: incorrect

```ts
/*eslint class-methods-use-this: ["error", { "ignoreClassesWithImplements": "public-fields" }] */

interface Base {
    method(): void;
}

class Derived implements Base {
    method() {}
    property = () => {};

    private privateMethod() {}
    private privateProperty = () => {};

    protected protectedMethod() {}
    protected protectedProperty = () => {};
}
```

:::

`{ "ignoreClassesWithImplements": "public-fields" }` 选项下，此规则的 **TypeScript** **正确**代码示例：

::: correct

```ts
/*eslint class-methods-use-this: ["error", { "ignoreClassesWithImplements": "public-fields" }] */

interface Base {
    method(): void;
}

class Derived implements Base {
    method() {}
    property = () => {};
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

修复此规则的违规问题几乎总是属于破坏性变更，因为这要求在每个受影响方法的调用位置都进行修改。
因此，如果你的项目有不能破坏的下游使用者，或者你不希望对方法的每个调用位置都进行侵入性修改，那么处理此规则的违规问题可能并无意义。
