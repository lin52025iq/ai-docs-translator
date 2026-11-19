---
title: object-curly-newline
rule_type: layout
related_rules:
- comma-spacing
- key-spacing
- object-curly-spacing
- object-property-newline
---
许多代码风格指南要求或禁止在对象花括号及其他标记内换行。

<a id="rule-details"></a>

## 规则详情

此规则要求或禁止在对象字面量或解构赋值中，`{` 与其后面的标记之间，以及 `}` 与其前面的标记之间换行。

<a id="options"></a>

## 选项

此规则可以使用字符串选项：

* `"always"` 要求在左花括号之后和右花括号之前换行
* `"never"` 禁止在左花括号之后和右花括号之前换行

也可以使用对象选项：

* `"multiline": true` 如果属性内部或属性之间有换行，则要求换行；否则禁止换行。
* `"minProperties"` 当属性数量大于或等于指定整数时要求换行。默认情况下，如果对象包含换行且属性数量小于指定整数，也会报告错误。不过，当 `consistent` 选项设为 `true` 时，会禁用后一种行为。
* `"consistent": true`（默认值）要求两个花括号要么都直接包含换行，要么都不包含。请注意，启用此选项也会改变 `minProperties` 选项的行为。（更多信息请参见上文的 `minProperties`。）

你可以分别为对象字面量、解构赋值以及命名导入和导出指定不同的选项：

```json
{
    "object-curly-newline": ["error", {
        "ObjectExpression": "always",
        "ObjectPattern": { "multiline": true },
        "ImportDeclaration": "never",
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }]
}
```

* `"ObjectExpression"`：对象字面量的配置
* `"ObjectPattern"`：解构赋值中对象模式的配置
* `"ImportDeclaration"`：命名导入的配置
* `"ExportDeclaration"`：命名导出的配置

### always

使用 `"always"` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", "always"]*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

使用 `"always"` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint object-curly-newline: ["error", "always"]*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

### never

使用 `"never"` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", "never"]*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

使用 `"never"` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint object-curly-newline: ["error", "never"]*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

### multiline

使用 `{ "multiline": true }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "multiline": true }]*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

使用 `{ "multiline": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "multiline": true }]*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

### minProperties

使用 `{ "minProperties": 2 }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "minProperties": 2 }]*/

let a = {
};
let b = {
    foo: 1
};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {
    foo: function() {
        dosomething();
    }
};

let {
} = obj;
let {
    f
} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

使用 `{ "minProperties": 2 }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "minProperties": 2 }]*/

let a = {};
let b = {foo: 1};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {foo: function() {
    dosomething();
}};

let {} = obj;
let {f} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

### consistent

使用默认的 `{ "consistent": true }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "consistent": true }]*/

let a = {foo: 1
};
let b = {
    foo: 1};
let c = {foo: 1, bar: 2
};
let d = {
    foo: 1, bar: 2};
let e = {foo: function() {
    dosomething();
    }
};
let f = {
    foo: function() {
    dosomething();}};

let {g
} = obj;
let {
    h} = obj;
let {i, j
} = obj;
let {k, l
} = obj;
let {
    m, n} = obj;
let {
    o, p} = obj;
let {q = function() {
    dosomething();
    }
} = obj;
let {
    r = function() {
        dosomething();
    }} = obj;
```

:::

使用默认的 `{ "consistent": true }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "consistent": true }]*/

let empty1 = {};
let empty2 = {
};
let a = {foo: 1};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {foo: function() {dosomething();}};
let f = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {
} = obj;
let {g} = obj;
let {
    h
} = obj;
let {i, j} = obj;
let {
    k, l
} = obj;
let {m,
    n} = obj;
let {
    o,
    p
} = obj;
let {q = function() {dosomething();}} = obj;
let {
    r = function() {
        dosomething();
    }
} = obj;
```

:::

### ObjectExpression and ObjectPattern

使用 `{ "ObjectExpression": "always", "ObjectPattern": "never" }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "ObjectExpression": "always", "ObjectPattern": "never" }]*/

let a = {};
let b = {foo: 1};
let c = {foo: 1, bar: 2};
let d = {foo: 1,
    bar: 2};
let e = {foo: function() {
    dosomething();
}};

let {
} = obj;
let {
    f
} = obj;
let {
    g, h
} = obj;
let {
    i,
    j
} = obj;
let {
    k = function() {
        dosomething();
    }
} = obj;
```

:::

使用 `{ "ObjectExpression": "always", "ObjectPattern": "never" }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "ObjectExpression": "always", "ObjectPattern": "never" }]*/

let a = {
};
let b = {
    foo: 1
};
let c = {
    foo: 1, bar: 2
};
let d = {
    foo: 1,
    bar: 2
};
let e = {
    foo: function() {
        dosomething();
    }
};

let {} = obj;
let {f} = obj;
let {g, h} = obj;
let {i,
    j} = obj;
let {k = function() {
    dosomething();
}} = obj;
```

:::

### ImportDeclaration and ExportDeclaration

使用 `{ "ImportDeclaration": "always", "ExportDeclaration": "never" }` 选项时，此规则的错误代码示例：

::: incorrect

```js
/*eslint object-curly-newline: ["error", { "ImportDeclaration": "always", "ExportDeclaration": "never" }]*/

import {foo, bar} from 'foo-bar';
import {foo as f, baz} from 'foo-bar';
import {qux,
    foobar} from 'foo-bar';

export {
   foo,
   bar
};
export {
   foo as f,
   baz
} from 'foo-bar';
```

:::

使用 `{ "ImportDeclaration": "always", "ExportDeclaration": "never" }` 选项时，此规则的正确代码示例：

::: correct

```js
/*eslint object-curly-newline: ["error", { "ImportDeclaration": "always", "ExportDeclaration": "never" }]*/

import {
    foo,
    bar
} from 'foo-bar';
import {
    baz, qux
} from 'foo-bar';
import {
    foo as f,
    foobar
} from 'foo-bar';

export { foo, bar } from 'foo-bar';
export { foo as f, baz } from 'foo-bar';
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你不想强制要求在左花括号之后和右花括号之前一致地换行，则可以安全地禁用此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：[requirePaddingNewLinesInObjects](https://jscs-dev.github.io/rule/requirePaddingNewLinesInObjects)
* **JSCS**：[disallowPaddingNewLinesInObjects](https://jscs-dev.github.io/rule/disallowPaddingNewLinesInObjects)
