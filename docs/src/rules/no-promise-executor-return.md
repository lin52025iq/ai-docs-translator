---
title: no-promise-executor-return
rule_type: problem
related_rules:
- no-async-promise-executor
further_reading:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
---


`new Promise` 构造函数接受一个参数，称为 *executor*（执行器）。

```js
const myPromise = new Promise(function executor(resolve, reject) {
    readFile('foo.txt', function(err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});
```

执行器函数通常会启动某种异步操作。操作完成后，执行器应使用结果调用 `resolve`；如果发生错误，则调用 `reject`。

执行器的返回值会被忽略。从执行器函数返回值可能是个错误，因为返回值无法使用，也不会以任何方式影响 Promise。

<a id="rule-details"></a>

## 规则详细信息

此规则禁止从 Promise 执行器函数返回值。

只允许不带值的 `return`，因为它是控制流语句。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-promise-executor-return: "error"*/

new Promise((resolve, reject) => {
    if (someCondition) {
        return defaultResult;
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

new Promise((resolve, reject) => getSomething((err, data) => {
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
}));

new Promise(() => {
    return 1;
});

new Promise(r => r(1));
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint no-promise-executor-return: "error"*/

// Turn return inline into two lines
new Promise((resolve, reject) => {
    if (someCondition) {
        resolve(defaultResult);
        return;
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

// Add curly braces
new Promise((resolve, reject) => {
    getSomething((err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
});

new Promise(r => { r(1) });
// or just use Promise.resolve
Promise.resolve(1);
```

:::

<a id="options"></a>

## 选项

此规则接受一个对象作为选项，其中包含以下属性：

* `allowVoid`：如果设置为 `true`（默认为 `false`），此规则将允许返回 void 值。

### allowVoid

启用 `{ "allowVoid": true }` 选项时，此规则的**正确**代码示例：

::: correct

```js
/*eslint no-promise-executor-return: ["error", { allowVoid: true }]*/

new Promise((resolve, reject) => {
    if (someCondition) {
        return void resolve(defaultResult);
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

new Promise((resolve, reject) => void getSomething((err, data) => {
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
}));

new Promise(r => void r(1));
```

:::