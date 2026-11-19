---
title: no-process-env
rule_type: suggestion
further_reading:
- https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
- https://blog.benhall.me.uk/2012/02/storing-application-config-data-in/
---

Node.js 中的 `process.env` 对象用于存储部署/配置参数。在项目中到处使用它可能会导致维护问题，因为它也是一种全局依赖。因此，在多人协作的环境中可能会引发合并冲突，在多服务器环境中则可能导致部署问题。更好的做法之一是将所有这些参数定义在一个配置/设置文件中，以便在整个项目中访问。

<a id="rule-details"></a>

## 规则详情

此规则旨在避免使用 `process.env`，以免产生全局依赖。因此，每当使用 `process.env` 时，都会发出警告。

以下是此规则的**错误**代码示例：

::: incorrect

```js
/*eslint no-process-env: "error"*/

if(process.env.NODE_ENV === "development") {
    //...
}
```

:::

以下是此规则的**正确**代码示例：

::: correct

```js
/*eslint no-process-env: "error"*/

var config = require("./config");

if(config.env === "development") {
    //...
}
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果你倾向于在整个项目中使用 `process.env` 来获取环境变量的值，则可以安全地禁用此规则。