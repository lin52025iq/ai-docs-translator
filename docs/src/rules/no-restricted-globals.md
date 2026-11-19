---
title: no-restricted-globals
rule_type: suggestion
related_rules:
- no-restricted-properties
- no-restricted-syntax
---


如果希望允许使用一组全局变量，但仍禁止使用其中某些变量，禁止使用特定的全局变量会很有用。

例如，早期版本的 Internet Explorer 会将当前 DOM 事件公开为全局变量 `event`，但长期以来，使用此变量一直被认为是不良做法。限制该变量可以确保它不会在浏览器代码中使用。

<a id="rule-details"></a>

## 规则详情

此规则允许你指定不希望在应用程序中使用的全局变量名称。

<a id="options"></a>

## 选项

此规则支持字符串和对象两种选项，用于指定要限制的全局变量。

使用字符串选项时，可以在规则选项数组中指定要限制的全局变量名称：

```json
{
    "rules": {
        "no-restricted-globals": ["error", "event", "fdescribe"]
    }
}
```

此外，此规则也接受对象，其中可以指定全局变量名称以及可选的自定义消息：

```json
{
    "rules": {
        "no-restricted-globals": [
            "error",
            {
                "name": "event",
                "message": "Use local parameter instead."
            },
            {
                "name": "fdescribe",
                "message": "Do not commit fdescribe. Use describe instead."
            }
        ]
    }
}
```

以下是全局变量名称为示例中的 `"event", "fdescribe"` 时的**错误**代码示例：

::: incorrect

```js
/*global event, fdescribe*/
/*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/

function onClick() {
    console.log(event);
}

fdescribe("foo", function() {
});
```

:::

以下是全局变量名称为示例中的 `"event"` 时的**正确**代码示例：

::: correct

```js
/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/

import event from "event-module";
```

:::

::: correct

```js
/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/

const event = 1;
```

:::

以下是全局变量名称为示例中的 `"event"` 且带有自定义错误消息时的**错误**代码示例：

::: incorrect

```js
/*global event*/
/* eslint no-restricted-globals: ["error", { name: "event", message: "Use local parameter instead." }] */

function onClick() {
    console.log(event);    // Unexpected global variable 'event'. Use local parameter instead.
}
```

:::

### globals

对象选项，其值为一个数组，包含你希望限制的全局变量名称。

以下是全局变量名称为 `"event"` 和 `"fdescribe"` 时的**错误**代码示例：

::: incorrect

```js
/*global event, fdescribe*/
/*eslint no-restricted-globals: ["error", { globals: ["event", "fdescribe"] }]*/

function onClick() {
    console.log(event);
}

fdescribe("foo", function() {
});
```

:::

也可以在 `globals` 数组中使用包含 `name` 和 `message` 的对象，为特定全局变量指定自定义消息：

以下是全局变量名称为 `"event"` 且带有自定义错误消息时的**错误**代码示例：

::: incorrect

```js
/*global event*/
/* eslint no-restricted-globals: ["error", { globals: [{ name: "event", message: "Use local parameter instead." }] }] */

function onClick() {
    console.log(event);
}
```

:::

### checkGlobalObject

布尔选项，启用对通过全局对象访问的受限全局变量的检测。默认为 `false`。

以下是 `checkGlobalObject: true` 选项的**错误**代码示例：

::: incorrect

```js
/*global globalThis, self, window*/
/*eslint no-restricted-globals: ["error", { globals: ["Promise"], checkGlobalObject: true }]*/

globalThis.Promise
self.Promise
window.Promise
```

:::

### globalObjects

数组选项，用于指定在启用 `checkGlobalObject` 时要检查的其他全局对象名称。默认情况下，此规则会检查以下全局对象：`globalThis`、`self` 和 `window`。

以下是 `globalObjects` 选项的**错误**代码示例：

::: incorrect

```js
/*global globalThis, self, window, myGlobal*/
/*eslint no-restricted-globals: ["error", {
    globals: ["Promise"],
    checkGlobalObject: true,
    globalObjects: ["myGlobal"]
}]*/

globalThis.Promise
self.Promise
window.Promise
myGlobal.Promise;
```

:::

此规则会忽略 TypeScript 类型注解中使用的受限全局变量，例如类型引用、接口继承或类实现中的变量。

以下是全局变量名称为 "Promise"、"Event" 和 "Window" 时的**正确** TypeScript 代码示例：

::: correct

```ts
/*eslint no-restricted-globals: ["error", "Promise", "Event", "Window"]*/

const fetchData: Promise<string> = fetchString();

interface CustomEvent extends Event {}

class CustomWindow implements Window {}

function handleClick(event: Event) {
  console.log(event);
}
```

:::