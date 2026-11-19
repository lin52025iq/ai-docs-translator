---
title: prefer-reflect
rule_type: suggestion
related_rules:
- no-useless-call
- prefer-spread
- no-delete-var
---

如今我们逐渐认识到，这条规则最初的意图似乎并不恰当：`Reflect` 方法实际上并非旨在取代该规则所建议的对应 `Object` 方法，而是作为低级原语，供代理使用，以复现各种既有功能的默认行为。

**请注意**：此规则存在错误行为——它会建议使用 `Reflect.getOwnPropertyNames`，而不是 `Object.getOwnPropertyNames`，但前者并不存在于[规范](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflection)中。我们建议使用 `exceptions` 选项并设置为 `"getOwnPropertyNames"`，以避免这种错误建议。

ES6 Reflect API 提供了若干方法，在某种程度上取代了旧构造函数上的方法：

* [`Reflect.apply`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.apply) 实际上取代了 [`Function.prototype.apply`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-function.prototype.apply) 和 [`Function.prototype.call`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-function.prototype.call)
* [`Reflect.deleteProperty`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.deleteproperty) 实际上取代了 [`delete` 关键字](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-delete-operator-runtime-semantics-evaluation)
* [`Reflect.getOwnPropertyDescriptor`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.getownpropertydescriptor) 实际上取代了 [`Object.getOwnPropertyDescriptor`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.getownpropertydescriptor)
* [`Reflect.getPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.getprototypeof) 实际上取代了 [`Object.getPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.getprototypeof)
* [`Reflect.setPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.setprototypeof) 实际上取代了 [`Object.setPrototypeOf`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.setprototypeof)
* [`Reflect.preventExtensions`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-reflect.preventextensions)  实际上取代了 [`Object.preventExtensions`](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.preventextensions)

prefer-reflect 规则会标记任何旧方法的用法，并建议改用较新的 Reflect 版本。

<a id="rule-details"></a>

## 规则详情

<a id="options"></a>

## 选项

<a id="exceptions"></a>

### 例外

```js
"prefer-reflect": [<enabled>, { "exceptions": [<...exceptions>] }]
```

`exceptions` 选项允许你传入一个方法名称数组，其中列出你希望继续使用旧写法的方法。

例如，如果你希望使用所有 Reflect 方法，但继续使用 `Function.prototype.apply`，配置可以写成 `prefer-reflect: [2, { "exceptions": ["apply"] }]`。

如果你希望使用 Reflect 方法，但继续使用 `delete` 关键字，配置可以写成 `prefer-reflect: [2, { "exceptions": ["delete"] }]`。

这些例外可以按需任意组合。若要将所有方法都设为例外（从而使此规则失去作用），请使用 `prefer-reflect: [2, { "exceptions": ["apply", "call", "defineProperty", "getOwnPropertyDescriptor", "getPrototypeOf", "setPrototypeOf", "isExtensible", "getOwnPropertyNames", "preventExtensions", "delete"] }]`

### Reflect.apply

取代 `Function.prototype.apply()` 和 `Function.prototype.call()`

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

myFunction.apply(undefined, args);
myFunction.apply(null, args);
obj.myMethod.apply(obj, args);
obj.myMethod.apply(other, args);

myFunction.call(undefined, arg);
myFunction.call(null, arg);
obj.myMethod.call(obj, arg);
obj.myMethod.call(other, arg);
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.apply(myFunction, undefined, args);
Reflect.apply(myFunction, null, args);
Reflect.apply(obj.myMethod, obj, args);
Reflect.apply(obj.myMethod, other, args);
Reflect.apply(myFunction, undefined, [arg]);
Reflect.apply(myFunction, null, [arg]);
Reflect.apply(obj.myMethod, obj, [arg]);
Reflect.apply(obj.myMethod, other, [arg]);
```

:::

使用 `{ "exceptions": ["apply"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["apply"] }]*/

// in addition to Reflect.apply(...):
myFunction.apply(undefined, args);
myFunction.apply(null, args);
obj.myMethod.apply(obj, args);
obj.myMethod.apply(other, args);
```

:::

使用 `{ "exceptions": ["call"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["call"] }]*/

// in addition to Reflect.apply(...):
myFunction.call(undefined, arg);
myFunction.call(null, arg);
obj.myMethod.call(obj, arg);
obj.myMethod.call(other, arg);
```

:::

### Reflect.defineProperty

取代 `Object.defineProperty()`

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.defineProperty({}, 'foo', {value: 1})
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.defineProperty({}, 'foo', {value: 1})
```

:::

使用 `{ "exceptions": ["defineProperty"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["defineProperty"] }]*/

Object.defineProperty({}, 'foo', {value: 1})
Reflect.defineProperty({}, 'foo', {value: 1})
```

:::

### Reflect.getOwnPropertyDescriptor

取代 `Object.getOwnPropertyDescriptor()`

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.getOwnPropertyDescriptor({}, 'foo')
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.getOwnPropertyDescriptor({}, 'foo')
```

:::

使用 `{ "exceptions": ["getOwnPropertyDescriptor"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["getOwnPropertyDescriptor"] }]*/

Object.getOwnPropertyDescriptor({}, 'foo')
Reflect.getOwnPropertyDescriptor({}, 'foo')
```

:::

### Reflect.getPrototypeOf

取代 `Object.getPrototypeOf()`

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.getPrototypeOf({}, 'foo')
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.getPrototypeOf({}, 'foo')
```

:::

使用 `{ "exceptions": ["getPrototypeOf"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["getPrototypeOf"] }]*/

Object.getPrototypeOf({}, 'foo')
Reflect.getPrototypeOf({}, 'foo')
```

:::

### Reflect.setPrototypeOf

取代 `Object.setPrototypeOf()`

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.setPrototypeOf({}, Object.prototype)
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.setPrototypeOf({}, Object.prototype)
```

:::

使用 `{ "exceptions": ["setPrototypeOf"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["setPrototypeOf"] }]*/

Object.setPrototypeOf({}, Object.prototype)
Reflect.setPrototypeOf({}, Object.prototype)
```

:::

### Reflect.isExtensible

取代 `Object.isExtensible`

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.isExtensible({})
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.isExtensible({})
```

:::

使用 `{ "exceptions": ["isExtensible"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["isExtensible"] }]*/

Object.isExtensible({})
Reflect.isExtensible({})
```

:::

### Reflect.preventExtensions

取代 `Object.preventExtensions()`

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

Object.preventExtensions({})
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: "error"*/

Reflect.preventExtensions({})
```

:::

使用 `{ "exceptions": ["preventExtensions"] }` 选项时，此规则下的**正确**代码示例：

::: correct

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["preventExtensions"] }]*/

Object.preventExtensions({})
Reflect.preventExtensions({})
```

:::

### Reflect.deleteProperty

取代 `delete` 关键字

未使用例外时，此规则下的**错误**代码示例：

::: incorrect

```js
/*eslint prefer-reflect: "error"*/

delete foo.bar; // deleting object property
```

:::

未使用例外时，此规则下的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint prefer-reflect: "error"*/

delete bar; // deleting variable
Reflect.deleteProperty(foo, 'bar');
```

:::

注意：若要使用阻止删除变量的规则，请参见 [no-delete-var 规则](no-delete-var)

使用 `{ "exceptions": ["delete"] }` 选项时，此规则下的**正确**代码示例：

::: correct { "sourceType": "script" }

```js
/*eslint prefer-reflect: ["error", { "exceptions": ["delete"] }]*/

delete bar
delete foo.bar
Reflect.deleteProperty(foo, 'bar');
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

此规则不应在 ES3/5 环境中使用。

在 ES2015 (ES6) 或更高版本中，如果你不想收到可以使用 Reflect 的位置的提示，可以放心禁用此规则。
