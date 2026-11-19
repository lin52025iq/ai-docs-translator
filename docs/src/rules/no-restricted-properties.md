---
title: no-restricted-properties
rule_type: suggestion
related_rules:
- no-restricted-globals
- no-restricted-syntax
---


在代码库中，可以禁止使用对象的某些属性。这有助于弃用某个 API，或限制对模块方法的使用。例如，使用 Mocha 时，你可能希望禁止使用 `describe.only`，或者建议人们使用 `Object.assign` 而不是 `_.extend`。

<a id="rule-details"></a>

## 规则详情

此规则会检查对指定对象名称上的指定属性键的访问，无论是读取属性值还是将其作为函数调用。你可以指定一条可选消息，说明替代 API 或限制原因。此规则适用于通过点表示法访问的属性和解构。

<a id="options"></a>

## 选项

此规则接受一个对象列表，其中指定对象名称和属性名称：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "object": "disallowedObjectName",
            "property": "disallowedPropertyName"
        }]
    }
}
```

可以禁止多个对象/属性值，也可以指定一条可选消息：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "object": "disallowedObjectName",
            "property": "disallowedPropertyName"
        }, {
            "object": "disallowedObjectName",
            "property": "anotherDisallowedPropertyName",
            "message": "Please use allowedObjectName.allowedPropertyName."
        }]
    }
}
```

如果省略对象名称，则所有对象都不能使用该属性：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "property": "__defineGetter__",
            "message": "Please use Object.defineProperty instead."
        }]
    }
}
```

如果省略属性名称，则禁止访问指定对象的任何属性：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "object": "require",
            "message": "Please call require() directly."
        }]
    }
}
```

如果你想全局限制某个属性，但允许特定对象使用它，可以使用 `allowObjects` 选项：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "property": "push",
            "allowObjects": ["router"],
            "message": "Prefer [...array, newValue] because it does not mutate the array in place."
        }]
    }
}
```

如果你想限制对象的所有属性，但允许使用其中的特定属性，可以使用 `allowProperties` 选项：

```json
{
    "rules": {
        "no-restricted-properties": [2, {
            "object": "config",
            "allowProperties": ["settings", "version"],
            "message": "Accessing other properties is restricted."
        }]
    }
}
```

请注意，`allowObjects` 选项不能与 `object` 选项同时使用，因为两者互斥。同样，`allowProperties` 选项也不能与 `property` 选项同时使用，因为两者同样互斥。

此规则的错误代码示例：

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "object": "disallowedObjectName",
    "property": "disallowedPropertyName"
}] */

const example = disallowedObjectName.disallowedPropertyName; /*error Disallowed object property: disallowedObjectName.disallowedPropertyName.*/

disallowedObjectName.disallowedPropertyName(); /*error Disallowed object property: disallowedObjectName.disallowedPropertyName.*/
```

:::

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "property": "__defineGetter__"
}] */

foo.__defineGetter__(bar, baz);

const { __defineGetter__ } = qux();

({ __defineGetter__ }) => {};
```

:::

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "object": "require"
}] */

require.resolve('foo');
```

:::

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "property": "push",
    "allowObjects": ["router"],
}] */

myArray.push(5);
```

:::

::: incorrect

```js
/* eslint no-restricted-properties: [2, {
    "object": "config",
    "allowProperties": ["settings", "version"]
}] */

config.apiKey = "12345";
config.timeout = 5000;
```

:::

此规则的正确代码示例：

::: correct

```js
/* eslint no-restricted-properties: [2, {
    "object": "disallowedObjectName",
    "property": "disallowedPropertyName"
}] */

const example = disallowedObjectName.somePropertyName;

allowedObjectName.disallowedPropertyName();
```

:::

::: correct

```js
/* eslint no-restricted-properties: [2, {
    "object": "require"
}] */

require('foo');
```

:::

::: correct

```js
/* eslint no-restricted-properties: [2, {
    "property": "push",
    "allowObjects": ["router", "history"],
}] */

router.push('/home');
history.push('/about');
```

:::

::: correct

```js
/* eslint no-restricted-properties: [2, {
    "object": "config",
    "allowProperties": ["settings", "version"]
}] */

config.settings = { theme: "dark" };
config.version = "1.0.0";  
```

:::

<a id="when-not-to-use-it"></a>

## 何时不使用此规则

如果没有要限制的对象/属性组合，就不应使用此规则。
