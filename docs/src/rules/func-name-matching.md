---
title: func-name-matching
rule_type: suggestion
---


<a id="rule-details"></a>
## 规则详情

此规则要求函数名称与其赋值到的变量或属性名称匹配。如果属性名是字面量，且在配置指定的 ECMAScript 版本（默认为 ES5）中不是有效标识符，则此规则会忽略对该属性的赋值。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint func-name-matching: "error"*/

let foo = function bar() {};
foo = function bar() {};
const obj = {foo: function bar() {}};
obj.foo = function bar() {};
obj['foo'] = function bar() {};
({['foo']: function bar() {}});

class C {
    foo = function bar() {};
}
```

:::

::: incorrect

```js
/*eslint func-name-matching: ["error", "never"] */

let foo = function foo() {};
foo = function foo() {};
const obj = {foo: function foo() {}};
obj.foo = function foo() {};
obj['foo'] = function foo() {};
({['foo']: function foo() {}});

class C {
    foo = function foo() {};
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint func-name-matching: "error"*/
// equivalent to /*eslint func-name-matching: ["error", "always"]*/

const foo = function foo() {};
const foo1 = function() {};
const foo2 = () => {};
foo = function foo() {};

const obj = {foo: function foo() {}};
obj.foo = function foo() {};
obj['foo'] = function foo() {};
obj['foo//bar'] = function foo() {};
obj[foo] = function bar() {};

const obj1 = {[foo]: function bar() {}};
const obj2 = {'foo//bar': function foo() {}};
const obj3 = {foo: function() {}};

obj['x' + 2] = function bar(){};
const [ bar ] = [ function bar(){} ];
({[foo]: function bar() {}})

class C {
    foo = function foo() {};
    baz = function() {};
}

// private names are ignored
class D {
    #foo = function foo() {};
    #bar = function foo() {};
    baz() {
        this.#foo = function foo() {};
        this.#foo = function bar() {};
    }
}

module.exports = function foo(name) {};
module['exports'] = function foo(name) {};
```

:::

::: correct

```js
/*eslint func-name-matching: ["error", "never"] */

let foo = function bar() {};
const foo1 = function() {};
const foo2 = () => {};
foo = function bar() {};

const obj = {foo: function bar() {}};
obj.foo = function bar() {};
obj['foo'] = function bar() {};
obj['foo//bar'] = function foo() {};
obj[foo] = function foo() {};

const obj1 = {foo: function bar() {}};
const obj2 = {[foo]: function foo() {}};
const obj3 = {'foo//bar': function foo() {}};
const obj4 = {foo: function() {}};

obj['x' + 2] = function bar(){};
const [ bar ] = [ function bar(){} ];
({[foo]: function bar() {}})

class C {
    foo = function bar() {};
    baz = function() {};
}

// private names are ignored
class D {
    #foo = function foo() {};
    #bar = function foo() {};
    baz() {
        this.#foo = function foo() {};
        this.#foo = function bar() {};
    }
}

module.exports = function foo(name) {};
module['exports'] = function foo(name) {};
```

:::

<a id="options"></a>
## 选项

此规则接受一个可选字符串 `"always"` 或 `"never"`（省略时默认为 `"always"`），以及一个包含两个属性 `considerPropertyDescriptor` 和 `includeCommonJSModuleExports` 的可选选项对象。

<a id="considerpropertydescriptor"></a>
### considerPropertyDescriptor

布尔值，默认为 `false`。如果将 `considerPropertyDescriptor` 设为 true，检查时会考虑使用 `Object.create`、`Object.defineProperty`、`Object.defineProperties` 和 `Reflect.defineProperty` 的情况。

`{ considerPropertyDescriptor: true }` 选项的**正确**代码示例：

::: correct

```js
/*eslint func-name-matching: ["error", { "considerPropertyDescriptor": true }]*/
// equivalent to /*eslint func-name-matching: ["error", "always", { "considerPropertyDescriptor": true }]*/
const obj = {};
Object.create(obj, {foo:{value: function foo() {}}});
Object.defineProperty(obj, 'bar', {value: function bar() {}});
Object.defineProperties(obj, {baz:{value: function baz() {} }});
Reflect.defineProperty(obj, 'foo', {value: function foo() {}});
```

:::

`{ considerPropertyDescriptor: true }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint func-name-matching: ["error", { "considerPropertyDescriptor": true }]*/
// equivalent to /*eslint func-name-matching: ["error", "always", { "considerPropertyDescriptor": true }]*/
const obj = {};
Object.create(obj, {foo:{value: function bar() {}}});
Object.defineProperty(obj, 'bar', {value: function baz() {}});
Object.defineProperties(obj, {baz:{value: function foo() {} }});
Reflect.defineProperty(obj, 'foo', {value: function value() {}});
```

:::

<a id="includecommonjsmoduleexports"></a>
### includeCommonJSModuleExports

布尔值，默认为 `false`。如果将 `includeCommonJSModuleExports` 设为 true，此规则会检查 `module.exports` 和 `module["exports"]`。

`{ includeCommonJSModuleExports: true }` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint func-name-matching: ["error", { "includeCommonJSModuleExports": true }]*/
// equivalent to /*eslint func-name-matching: ["error", "always", { "includeCommonJSModuleExports": true }]*/

module.exports = function foo(name) {};
module['exports'] = function foo(name) {};
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用

如果你希望允许命名函数的名称与其赋值到的变量或属性名称不同，请勿使用此规则。

<a id="compatibility"></a>
## 兼容性

* **JSCS**: [requireMatchingFunctionName](https://jscs-dev.github.io/rule/requireMatchingFunctionName)
