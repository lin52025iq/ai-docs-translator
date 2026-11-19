---
title: object-property-newline
rule_type: layout
related_rules:
- brace-style
- comma-dangle
- key-spacing
- object-curly-spacing
---
此规则允许你限制对象字面量中属性声明的位置。你可以禁止任意属性声明的任何部分与其他属性声明的任何部分出现在同一行。你可以绝对禁止这种情况，也可以通过对象选项允许例外，使对象字面量中的所有属性声明都可以完整地出现在同一行。

<a id="rule-details"></a>

## 规则详情

<a id="motivations"></a>

### 设计目的

此规则可确保属性声明各自位于不同的行上，以提高可读性；一些代码风格指南也要求这样做。例如，你可以禁止以下所有写法：

```js
const newObject = {a: 1, b: [2, {a: 3, b: 4}]};
const newObject = {
    a: 1, b: [2, {a: 3, b: 4}]
};
const newObject = {
    a: 1,
    b: [2, {a: 3, b: 4}]
};
const newObject = {
    a: 1,
    b: [
        2,
        {a: 3, b: 4}
    ]
};

```

你可以改用以下写法来符合此规则：

```js
const newObject = {
    a: 1,
    b: [2, {
        a: 3,
        b: 4
    }]
};
```

或者

```js
const newObject = {
    a: 1,
    b: [
        2,
        {
            a: 3,
            b: 4
        }
    ]
};
```

此规则的另一个好处是，修改属性时，差异内容会更加明确：

```diff
// More specific
 var obj = {
     foo: "foo",
-    bar: "bar",
+    bar: "bazz",
     baz: "baz"
 };
```

```diff
// Less specific
-var obj = { foo: "foo", bar: "bar", baz: "baz" };
+var obj = { foo: "foo", bar: "bazz", baz: "baz" };
```

<a id="optional-exception"></a>

### 可选例外

此规则提供一个对象选项 `allowAllPropertiesOnSameLine`（已弃用的同义选项为 `allowMultiplePropertiesPerLine`）。将其设为 `true` 后，前面示例中的前两种对象字面量写法（所有属性声明都在同一行）将被允许，但以下写法仍会被禁止：

```js
const newObject = {
    a: 'a.m.', b: 'p.m.',
    c: 'daylight saving time'
};

```

因为这里有两个属性出现在同一行，但并非所有属性都在同一行。

<a id="notations"></a>

### 表示形式

此规则对所有属性声明一视同仁，无论其表示形式如何，包括：

* `a: 1` (ES5)
* `a` (ES2015 简写属性)
* ``[`prop${a}`]`` (ES2015 计算属性名)

因此，此规则（不使用可选例外时）会禁止以下两种写法：

```js
const newObject = {
    a: 1, [
        process.argv[4]
    ]: '01'
};
const newObject = {
    a: 1, [process.argv[4]]: '01'
};
```

（此行为与下文引用的 JSCS 规则不同：该规则不将计算属性名开头的 `[` 视为属性声明的一部分。JSCS 规则禁止第二种格式，但允许第一种。）

<a id="multiline-properties"></a>

### 多行属性

此规则禁止一条属性声明的至少 1 个字符与另一条属性声明的至少 1 个字符出现在同一行。例如，此规则会禁止以下写法：

```js
const newObject = {a: [
    'Officiële website van de Europese Unie',
    'Официален уебсайт на Европейския съюз'
], b: 2};
```

因为属性 `a` 的声明中有 1 个字符（即其值末尾的 `]`）与属性 `b` 的声明位于同一行。

可选例外不适用于此情况，因为整组属性声明跨越了 4 行，而非 1 行。

<a id="inter-property-delimiters"></a>

### 属性间分隔符

用于分隔属性声明的逗号及其周围的空白不视为属性声明的一部分。因此，此规则允许以下两种格式：

```js
const newFunction = multiplier => ({
    a: 2 * multiplier,
    b: 4 * multiplier,
    c: 8 * multiplier
});
const newFunction = multiplier => ({
    a: 2 * multiplier
    , b: 4 * multiplier
    , c: 8 * multiplier
});
```

（此行为与下文引用的 JSCS 规则不同：该规则允许第一种格式，但禁止第二种。）

### --fix

如果使用命令行选项 `--fix` 调用此规则，通常会修改违反规则的对象字面量，使其符合规则。具体来说，如果某个属性声明与前一个属性声明的部分或全部内容位于同一行，就会将该属性声明移到下一行。例如，

```js
const newObject = {
    a: 'a.m.', b: 'p.m.',
    c: 'daylight saving time'
};
```

会转换为

```js
const newObject = {
    a: 'a.m.',
b: 'p.m.',
    c: 'daylight saving time'
};
```

此修改与对象选项是否设为 `true` 无关。换言之，即使对象选项允许这样做，ESLint 也绝不会将所有属性声明合并到同一行。

如果某一行中的第二个或后续属性声明前紧挨着一条注释，ESLint 不会修复此规则的违规情况，因为 ESLint 无法确定应将注释放在哪一行。

如上所示，此规则应用 `--fix` 选项后，并不会遵循 `indent` 等其他规则；但如果这些其他规则也已启用，该选项也会应用它们。

以下是此规则的**错误**代码示例（未设置对象选项，或将 `allowAllPropertiesOnSameLine` 设为 `false`）：

::: incorrect

```js
/*eslint object-property-newline: "error"*/

const obj0 = { foo: "foo", bar: "bar", baz: "baz" };

const obj1 = {
    foo: "foo", bar: "bar", baz: "baz"
};

const obj2 = {
    foo: "foo", bar: "bar",
    baz: "baz"
};

const obj3 = {
    [process.argv[3] ? "foo" : "bar"]: 0, baz: [
        1,
        2,
        4,
        8
    ]
};

const a = "antidisestablishmentarianistically";
const b = "yugoslavyalılaştırabildiklerimizdenmişsiniz";
const obj4 = {a, b};

const domain = process.argv[4];
const obj5 = {
    foo: "foo", [
    domain.includes(":") ? "complexdomain" : "simpledomain"
]: true};
```

:::

以下是此规则的**正确**代码示例（未设置对象选项，或将 `allowAllPropertiesOnSameLine` 设为 `false`）：

::: correct

```js
/*eslint object-property-newline: "error"*/

const obj1 = {
    foo: "foo",
    bar: "bar",
    baz: "baz"
};

const obj2 = {
    foo: "foo"
    , bar: "bar"
    , baz: "baz"
};

const user = process.argv[2];
const obj3 = {
    user,
    [process.argv[3] ? "foo" : "bar"]: 0,
    baz: [
        1,
        2,
        4,
        8
    ]
};
```

:::

以下是使用 `{ "allowAllPropertiesOnSameLine": true }` 选项时，此规则的其他**正确**代码示例：

::: correct

```js
/*eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": true }]*/

const obj = { foo: "foo", bar: "bar", baz: "baz" };

const obj2 = {
    foo: "foo", bar: "bar", baz: "baz"
};
const user = process.argv[2];
const obj3 = {
    user, [process.argv[3] ? "foo" : "bar"]: 0, baz: [1, 2, 4, 8]
};
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用

如果你希望根据具体情况决定是否将属性声明放在不同的行上，可以关闭此规则。

<a id="compatibility"></a>

## 兼容性

* **JSCS**：此规则与 [requireObjectKeysOnNewLine](https://jscs-dev.github.io/rule/requireObjectKeysOnNewLine) 部分兼容。