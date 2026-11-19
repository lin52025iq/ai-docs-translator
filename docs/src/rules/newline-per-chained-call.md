---
title: newline-per-chained-call
rule_type: layout
---
单行中连续调用方法且不换行会降低可读性，因此有些开发者会在链中的每次方法调用后换行，使代码更易读、更易维护。

来看下面这段完全有效（但写在单行中）的代码。

```js
d3.select("body").selectAll("p").data([4, 8, 15, 16, 23, 42 ]).enter().append("p").text(function(d) { return "I'm number " + d + "!"; });
```

不过，适当地换行后，代码会更易阅读和理解。看看下面这段在每次调用后换行的相同代码。

```js
d3
    .select("body")
    .selectAll("p")
    .data([
        4,
        8,
        15,
        16,
        23,
        42
    ])
    .enter()
    .append("p")
    .text(function (d) {
        return "I'm number " + d + "!";
    });
```

这种风格还有一个优点：当方法链中的内容发生变化时，它能让差异更加清晰：

不够清晰：

```diff
-d3.select("body").selectAll("p").style("color", "white");
+d3.select("body").selectAll("p").style("color", "blue");
```

更加清晰：

```diff
d3
    .select("body")
    .selectAll("p")
-    .style("color", "white");
+    .style("color", "blue");
```

<a id="rule-details"></a>

## 规则详情

此规则要求在方法链中的每次调用或深层成员访问后换行。计算属性访问（例如 `instance[something]`）除外。

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"ignoreChainWithDepth"`（默认值：`2`）允许指定深度以内的链式调用。

### ignoreChainWithDepth

以下是使用默认选项 `{ "ignoreChainWithDepth": 2 }` 时违反此规则的代码示例：

::: incorrect

```js
/*eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 2 }]*/

_.chain({}).map(foo).filter(bar).value();

// Or
_.chain({}).map(foo).filter(bar);

// Or
_
  .chain({}).map(foo)
  .filter(bar);

// Or
obj.method().method2().method3();
```

:::

以下是使用默认选项 `{ "ignoreChainWithDepth": 2 }` 时符合此规则的代码示例：

::: correct

```js
/*eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 2 }]*/

_
  .chain({})
  .map(foo)
  .filter(bar)
  .value();

// Or
_
  .chain({})
  .map(foo)
  .filter(bar);

// Or
_.chain({})
  .map(foo)
  .filter(bar);

// Or
obj
  .prop
  .method().prop;

// Or
obj
  .prop.method()
  .method2()
  .method3().prop;
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你有相互冲突的规则，或者不介意在单行中进行链式调用，可以放心关闭此规则。
