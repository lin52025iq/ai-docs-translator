---
title: guard-for-in
rule_type: suggestion
related_rules:
- prefer-object-has-own
- no-prototype-builtins
further_reading:
- https://javascriptweblog.wordpress.com/2011/01/04/exploring-javascript-for-in-loops/
- https://2ality.com/2012/01/objects-as-maps.html
---


使用 `for in` 循环遍历对象时，会包含通过原型链继承的属性。这种行为可能会导致循环中出现意料之外的项目。

```js
for (key in foo) {
    doSomething(key);
}
```

对于不支持 ES2022 的代码库，可以使用 `Object.prototype.hasOwnProperty.call(foo, key)` 检查属性是否为继承属性。

对于支持 ES2022 的代码库，可以使用更简洁的替代方式 `Object.hasOwn(foo, key)`；请参阅 [prefer-object-has-own](prefer-object-has-own)。

请注意，仅检查 `foo.hasOwnProperty(key)` 在某些情况下可能会导致错误；请参阅 [no-prototype-builtins](no-prototype-builtins)。

<a id="rule-details"></a>

## 规则详情

此规则旨在防止因在 `for in` 循环中未筛选结果而导致的意外行为。因此，当 `for in` 循环未使用 `if` 语句筛选结果时，此规则会发出警告。

此规则的**错误**代码示例：

::: incorrect

```js
/*eslint guard-for-in: "error"*/

for (key in foo) {
    doSomething(key);
}
```

:::

此规则的**正确**代码示例：

::: correct

```js
/*eslint guard-for-in: "error"*/

for (key in foo) {
    if (Object.hasOwn(foo, key)) {
        doSomething(key);
    }
}

for (key in foo) {
    if (Object.prototype.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}

for (key in foo) {
    if ({}.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}
```

:::

<a id="options"></a>

## 选项

此规则没有选项。