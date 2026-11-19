---
title: getter-return
rule_type: problem
handled_by_typescript: true
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
- https://leanpub.com/understandinges6/read/#leanpub-auto-accessor-properties
---



get 语法会将对象属性绑定到一个函数，该函数会在访问该属性时调用。它首次在 ECMAScript 5 中引入：

```js
const p = {
    get name(){
        return "nicholas";
    }
};

Object.defineProperty(p, "age", {
    get: function (){
        return 17;
    }
});
```

请注意，每个 `getter` 都应返回一个值。

<a id="rule-details"></a>

## 规则详情

此规则要求属性 getter 中包含 return 语句。

此规则下的错误代码示例：

::: incorrect

```js
/*eslint getter-return: "error"*/

const p = {
    get name(){
        // no returns.
    }
};

Object.defineProperty(p, "age", {
    get: function (){
        // no returns.
    }
});

class P{
    get name(){
        // no returns.
    }
}
```

:::

此规则下的正确代码示例：

::: correct

```js
/*eslint getter-return: "error"*/

const p = {
    get name(){
        return "nicholas";
    }
};

Object.defineProperty(p, "age", {
    get: function (){
        return 18;
    }
});

class P{
    get name(){
        return "nicholas";
    }
}
```

:::

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"allowImplicit": false`（默认值）禁止通过 `return` 语句隐式返回 `undefined`。

`{ "allowImplicit": true }` 选项下的正确代码示例：

::: correct

```js
/*eslint getter-return: ["error", { allowImplicit: true }]*/
const p = {
    get name(){
        return; // return undefined implicitly.
    }
};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用

如果你的项目不会使用 ES5 属性 getter，则无需使用此规则。
