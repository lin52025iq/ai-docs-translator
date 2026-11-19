---
title: arrow-spacing
rule_type: layout
---
此规则规范箭头函数箭头（`=>`）前后的空格样式。

```js
// { "before": true, "after": true }
(a) => {}

// { "before": false, "after": false }
(a)=>{}
```

<a id="rule-details"></a>

## 规则详情

此规则接受一个对象参数，其中包含 `before` 和 `after` 属性，两者的值均为布尔值。

默认配置为 `{ "before": true, "after": true }`。

`true` 表示应有**一个或多个空格**，`false` 表示**不应有空格**。

使用默认选项 `{ "before": true, "after": true }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint arrow-spacing: "error"*/

()=> {};
() =>{};
(a)=> {};
(a) =>{};
a =>a;
a=> a;
()=> {'\n'};
() =>{'\n'};
```

:::

使用默认选项 `{ "before": true, "after": true }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint arrow-spacing: "error"*/

() => {};
(a) => {};
a => a;
() => {'\n'};
```

:::

使用选项 `{ "before": false, "after": false }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": false }]*/

() =>{};
(a) => {};
()=> {'\n'};
```

:::

使用选项 `{ "before": false, "after": false }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": false }]*/

()=>{};
(a)=>{};
()=>{'\n'};
```

:::

使用选项 `{ "before": false, "after": true }` 时，此规则的错误代码示例：

:::incorrect

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": true }]*/

() =>{};
(a) => {};
()=>{'\n'};
```

:::

使用选项 `{ "before": false, "after": true }` 时，此规则的正确代码示例：

:::correct

```js
/*eslint arrow-spacing: ["error", { "before": false, "after": true }]*/

()=> {};
(a)=> {};
()=> {'\n'};
```

:::