---
title: sort-keys
rule_type: suggestion
related_rules:
- sort-imports
- sort-vars
---


声明多个属性时，一些开发者倾向于按字母顺序排列属性名，以便日后更轻松地查找和/或比较必要的属性。另一些开发者则认为，这会增加复杂性和维护负担。

<a id="rule-details"></a>
## 规则详情

此规则会检查对象表达式中的所有属性定义，并验证所有变量是否按字母顺序排列。

此规则的错误代码示例：

::: incorrect

```js
/*eslint sort-keys: "error"*/

const obj1 = {a: 1, c: 3, b: 2};
const obj2 = {a: 1, "c": 3, b: 2};

// Case-sensitive by default.
const obj3 = {a: 1, b: 2, C: 3};

// Non-natural order by default.
const obj4 = {1: a, 2: c, 10: b};

// This rule checks computed properties which have a simple name as well.
// Simple names are names which are expressed by an Identifier node or a Literal node.
const S = Symbol("s")
const obj5 = {a: 1, ["c"]: 3, b: 2};
const obj6 = {a: 1, [S]: 3, b: 2};
```

:::

此规则的正确代码示例：

::: correct

```js
/*eslint sort-keys: "error"*/

const obj1 = {a: 1, b: 2, c: 3};
const obj2 = {a: 1, "b": 2, c: 3};

// Case-sensitive by default.
const obj3 = {C: 3, a: 1, b: 2};

// Non-natural order by default.
const obj4 = {1: a, 10: b, 2: c};

// This rule checks computed properties which have a simple name as well.
const obj5 = {a: 1, ["b"]: 2, c: 3};
const obj6 = {a: 1, [b]: 2, c: 3};

// This rule ignores computed properties which have a non-simple name.
const obj7 = {a: 1, [c + d]: 3, b: 2};
const obj8 = {a: 1, ["c" + "d"]: 3, b: 2};
const obj9 = {a: 1, [`${c}`]: 3, b: 2};
const obj10 = {a: 1, [tag`c`]: 3, b: 2};

// This rule does not report unsorted properties that are separated by a spread property.
const obj11 = {b: 1, ...c, a: 2};
```

:::

<a id="options"></a>
## 选项

```json
{
    "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}]
}
```

第 1 个选项为 `"asc"` 或 `"desc"`。

* `"asc"`（默认值）- 强制属性按升序排列。
* `"desc"` - 强制属性按降序排列。

第 2 个选项是一个对象，包含以下属性。

* `caseSensitive` - 如果为 `true`，强制属性按区分大小写的顺序排列。默认值为 `true`。
* `minKeys` - 指定对象至少包含多少个键时，未排序的键才会导致错误。默认值为 `2`，这意味着默认情况下，所有键未排序的对象都会导致代码检查错误。
* `natural` - 如果为 `true`，强制属性按自然顺序排列。默认值为 `false`。自然排序会以人类的排序方式比较由字母和数字组成的字符串。它基本上是按数值排序，而不是按字母顺序排序。因此，在自然排序中，数字 10 排在数字 3 后面。
* `allowLineSeparatedGroups` - 如果为 `true`，此规则允许通过换行对对象键分组。换句话说，属性后面的空行会重置键的排序。默认值为 `false`。
* `ignoreComputedKeys` - 如果为 `true`，此规则会忽略所有计算键，并且不会报告被计算键分隔的未排序属性。计算键会重置后续非计算键的排序。默认值为 `false`。

列表示例：

当 `natural` 为 `true` 时，排序结果如下：
1
3
6
8
10

当 `natural` 为 `false` 时，排序结果如下：
1
10
3
6
8

### desc

`"desc"` 选项的错误代码示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "desc"]*/

const obj1 = {b: 2, c: 3, a: 1};
const obj2 = {"b": 2, c: 3, a: 1};

// Case-sensitive by default.
const obj3 = {C: 1, b: 3, a: 2};

// Non-natural order by default.
const obj4 = {10: b, 2: c, 1: a};
```

:::

`"desc"` 选项的正确代码示例：

::: correct

```js
/*eslint sort-keys: ["error", "desc"]*/

const obj1 = {c: 3, b: 2, a: 1};
const obj2 = {c: 3, "b": 2, a: 1};

// Case-sensitive by default.
const obj3 = {b: 3, a: 2, C: 1};

// Non-natural order by default.
const obj4 = {2: c, 10: b, 1: a};
```

:::

### caseSensitive

`{caseSensitive: false}` 选项的错误代码示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {caseSensitive: false}]*/

const obj1 = {a: 1, c: 3, C: 4, b: 2};
const obj2 = {a: 1, C: 3, c: 4, b: 2};
```

:::

`{caseSensitive: false}` 选项的正确代码示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {caseSensitive: false}]*/

const obj1 = {a: 1, b: 2, c: 3, C: 4};
const obj2 = {a: 1, b: 2, C: 3, c: 4};
```

:::

### natural

`{natural: true}` 选项的错误代码示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {natural: true}]*/

const obj = {1: a, 10: c, 2: b};
```

:::

`{natural: true}` 选项的正确代码示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {natural: true}]*/

const obj = {1: a, 2: b, 10: c};
```

:::

### minKeys

`{minKeys: 4}` 选项的错误代码示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {minKeys: 4}]*/

// 4 keys
const obj1 = {
    b: 2,
    a: 1, // not sorted correctly (should be 1st key)
    c: 3,
    d: 4,
};

// 5 keys
const obj2 = {
    2: 'a',
    1: 'b', // not sorted correctly (should be 1st key)
    3: 'c',
    4: 'd',
    5: 'e',
};
```

:::

`{minKeys: 4}` 选项的正确代码示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {minKeys: 4}]*/

// 3 keys
const obj1 = {
    b: 2,
    a: 1,
    c: 3,
};

// 2 keys
const obj2 = {
    2: 'b',
    1: 'a',
};
```

:::

### allowLineSeparatedGroups

`{allowLineSeparatedGroups: true}` 选项的错误代码示例：

::: incorrect

```js
/*eslint sort-keys: ["error", "asc", {allowLineSeparatedGroups: true}]*/

const obj1 = {
    b: 1,
    c () {

    },
    a: 3
}

const obj2 = {
    b: 1,
    c: 2,

    z () {

    },
    y: 3
}

const obj3 = {
    b: 1,
    c: 2,

    z () {

    },
    // comment
    y: 3,
}

const obj4 = {
    b: 1
    // comment before comma
    , a: 2
};
```

:::

`{allowLineSeparatedGroups: true}` 选项的正确代码示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {allowLineSeparatedGroups: true}]*/

const obj1 = {
    e: 1,
    f: 2,
    g: 3,

    a: 4,
    b: 5,
    c: 6
}

const obj2 = {
    b: 1,

    // comment
    a: 4,
    c: 5,
}

const obj3 = {
    c: 1,
    d: 2,

    b () {

    },
    e: 3,
}

const obj4 = {
    c: 1,
    d: 2,
    // comment

    // comment
    b() {

    },
    e: 4
}

const obj5 = {
    b,

    [foo + bar]: 1,
    a
}

const obj6 = {
    b: 1
    // comment before comma

    ,
    a: 2
};

const obj7 = {
    b: 1,

    a: 2,
    ...z,
    c: 3
}
```

:::

### ignoreComputedKeys

`{ignoreComputedKeys: true}` 选项的正确代码示例：

::: correct

```js
/*eslint sort-keys: ["error", "asc", {ignoreComputedKeys: true}]*/

const obj1 = {
    [b]: 1,
    a: 2
}

const obj2 = {
    c: 1,
    [b]: 2,
    a: 3
}

const obj3 = {
    c: 1,
    ["b"]: 2,
    a: 3
}
```

:::

<a id="when-not-to-use-it"></a>
## 何时不应使用此规则

如果你不希望收到有关属性顺序的提示，可以安全地禁用此规则。

<a id="compatibility"></a>
## 兼容性

* **JSCS：** [validateOrderInObjectKeys](https://jscs-dev.github.io/rule/validateOrderInObjectKeys)
