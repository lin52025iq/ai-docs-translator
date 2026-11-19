---
title: ScopeManager
---

本文档基于 [eslint-scope](https://github.com/eslint/js/tree/main/packages/eslint-scope)（[escope](https://github.com/estools/escope) 的一个分支）的实现编写，并将 ESLint 未使用的某些成员标记为已弃用。

---

<a id="scopemanager-interface"></a>

## ScopeManager 接口

`ScopeManager` 对象包含所有变量作用域。

<a id="fields"></a>

### 字段

#### scopes

- **Type:** `Scope[]`
- **Description:** 所有作用域。

#### globalScope

- **Type:** `Scope`
- **Description:** 根作用域。

<a id="methods"></a>

### 方法

#### acquire(node, inner = false)

- **Parameters:**
    - `node` (`ASTNode`) ... 要获取其作用域的 AST 节点。
    - `inner` (`boolean`) ... 如果该节点有多个作用域，通常返回最外层作用域。如果 `inner` 为 `true`，则返回最内层作用域。默认值为 `false`。
- **Return type:** `Scope | null`
- **Description:** 获取给定 AST 节点的作用域。获取到的作用域的 `block` 属性就是该节点。此方法绝不会返回 `function-expression-name` 作用域。如果该节点没有对应的作用域，则返回 `null`。

#### addGlobals(names)

- **Parameters:**
    - `names` (`string[]`) ... 要添加到全局作用域的变量名称。
- **Return type:** `undefined`
- **Description:** 将变量添加到全局作用域，并解析对这些变量的引用。此方法供 ESLint 核心使用，绝不可在规则中使用。

#### getDeclaredVariables(node)

- **Parameters:**
    - `node` (`ASTNode`) ... 要获取其变量的 AST 节点。
- **Return type:** `Variable[]`
- **Description:** 获取给定 AST 节点定义的变量。获取到的变量的 `def[].node`/`def[].parent` 属性就是该节点。如果该节点未定义任何变量，则返回空数组。

<a id="deprecated-members"></a>

### 已弃用的成员

这些成员虽然有定义，但 ESLint 并未使用。

#### isModule()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此程序是模块，则为 `true`。

#### isImpliedStrict()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此程序隐式处于严格模式，则为 `true`。也就是说，`options.impliedStrict === true`。

#### isStrictModeSupported()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此程序支持严格模式，则为 `true`。也就是说，`options.ecmaVersion >= 5`。

#### acquireAll(node)

- **Parameters:**
    - `node` (`ASTNode`) ... 要获取其作用域的 AST 节点。
- **Return type:** `Scope[] | null`
- **Description:** 获取给定 AST 节点的所有作用域。获取到的作用域的 `block` 属性就是该节点。如果该节点没有对应的作用域，则返回 `null`。

---

<a id="scope-interface"></a>

## Scope 接口

`Scope` 对象包含该作用域中的所有变量和引用。

<a id="fields-1"></a>

### 字段

#### type

- **Type:** `string`
- **Description:** 此作用域的类型。类型可以是以下之一：`"block"`、`"catch"`、`"class"`、`"class-field-initializer"`、`"class-static-block"`、`"for"`、`"function"`、`"function-expression-name"`、`"global"`、`"module"`、`"switch"`、`"with"`。

#### isStrict

- **Type:** `boolean`
- **Description:** 如果此作用域处于严格模式，则为 `true`。

#### upper

- **Type:** `Scope | null`
- **Description:** 父作用域。如果此作用域是全局作用域，则此属性为 `null`。

#### childScopes

- **Type:** `Scope[]`
- **Description:** 子作用域数组，不包括孙级作用域。

#### variableScope

- **Type:** `Scope`
- **Description:** 最近的祖先作用域，其 `type` 是以下之一：`"class-field-initializer"`、`"class-static-block"`、`"function"`、`"global"` 或 `"module"`。对于上述这些作用域，此属性指向自身。

> 这表示最内层的外围函数或顶层作用域。类字段初始化器和类静态代码块都是隐式函数。历史上，这个作用域用于承载由 `var` 声明的变量，因此得名 `variableScope`。

#### block

- **Type:** `ASTNode`
- **Description:** 创建此作用域的 AST 节点。

#### variables

- **Type:** `Variable[]`
- **Description:** 在此作用域中定义的所有变量组成的数组。不包括在子作用域中定义的变量。

#### set

- **Type:** `Map<string, Variable>`
- **Description:** 从变量名映射到变量对象的映射。

#### references

- **Type:** `Reference[]`
- **Description:** 此作用域中的所有引用组成的数组。不包括子作用域中的引用。

#### through

- **Type:** `Reference[]`
- **Description:** 无法在此作用域中解析的引用组成的数组。

#### functionExpressionScope

- **Type:** `boolean`
- **Description:** 如果此作用域是 `"function-expression-name"` 作用域，则为 `true`。

#### implicit

此字段仅存在于根 `Scope` 对象（全局作用域）中，用于提供有关隐式全局变量的信息。隐式全局变量既不是内置变量，也不是显式声明的变量，而是在非严格模式代码中通过给未声明的变量赋值而隐式创建的变量。这些变量对应的 `Variable` 对象不会出现在根 `Scope` 对象的 `variables` 和 `set` 字段中。

`implicit` 字段的值是一个包含两个属性的对象。

##### variables

- **Type:** `Variable[]`
- **Description:** 所有隐式全局变量组成的数组。

##### set

- **Type:** `Map<string, Variable>`
- **Description:** 从隐式全局变量名映射到变量对象的映射。

::: tip
在表示隐式全局变量的 `Variable` 对象中，`references` 始终是空数组。你可以在根 `Scope` 对象（全局作用域）的 `through` 字段中找到对这些变量的引用，以及其他未解析的引用。
:::

<a id="deprecated-members-1"></a>

### 已弃用的成员

这些成员虽然有定义，但 ESLint 并未使用。

#### taints

- **Type:** `Map<string, boolean>`
- **Description:** 从变量名映射到 `tainted` 标记的映射。

#### dynamic

- **Type:** `boolean`
- **Description:** 如果此作用域是动态作用域，则为 `true`。也就是说，此作用域的类型是 `"global"` 或 `"with"`。

#### directCallToEvalScope

- **Type:** `boolean`
- **Description:** 如果此作用域包含 `eval()` 调用，则为 `true`。

#### thisFound

- **Type:** `boolean`
- **Description:** 如果此作用域包含 `this`，则为 `true`。

#### resolve(node)

- **Parameters:**
    - `node` (`ASTNode`) ... 要获取其引用对象的 AST 节点。该节点的类型必须是 `"Identifier"`。
- **Return type:** `Reference | null`
- **Description:** 返回 `this.references.find(r => r.identifier === node)`。

#### isStatic()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 返回 `!this.dynamic`。

#### isArgumentsMaterialized()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果这是一个使用了 `arguments` 变量的 `"function"` 作用域，则为 `true`。

#### isThisMaterialized()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 返回 `this.thisFound`。

#### isUsedName(name)

- **Parameters:**
    - `name` (`string`) ... 要检查的名称。
- **Return type:** `boolean`
- **Description:** 如果给定名称用于变量名或引用名，则为 `true`。

---

<a id="variable-interface"></a>

## Variable 接口

`Variable` 对象包含变量的信息。

<a id="fields-2"></a>

### 字段

#### name

- **Type:** `string`
- **Description:** 此变量的名称。

#### scope

- **Type:** `Scope`
- **Description:** 定义此变量的作用域。

#### identifiers

- **Type:** `ASTNode[]`
- **Description:** 定义此变量的 `Identifier` 节点数组。如果此变量被重复声明，该数组会包含两个或更多节点。

#### references

- **Type:** `Reference[]`
- **Description:** 此变量的引用数组。

#### defs

- **Type:** `Definition[]`
- **Description:** 此变量的定义数组。

<a id="deprecated-members-2"></a>

### 已弃用的成员

这些成员虽然有定义，但 ESLint 并未使用。

#### tainted

- **Type:** `boolean`
- **Description:** `tainted` 标记（始终为 `false`）。

#### stack

- **Type:** `boolean`
- **Description:** `stack` 标记（我不确定这是什么意思）。

---

<a id="reference-interface"></a>

## Reference 接口

`Reference` 对象包含引用的信息。

<a id="fields-3"></a>

### 字段

#### identifier

- **Type:** `ASTNode`
- **Description:** 此引用对应的 `Identifier` 或 `JSXIdentifier` 节点。

#### from

- **Type:** `Scope`
- **Description:** 此引用所在的 `Scope` 对象。

#### resolved

- **Type:** `Variable | null`
- **Description:** 此引用所指向的 `Variable` 对象。如果未定义相应变量，则为 `null`。

#### writeExpr

- **Type:** `ASTNode | null`
- **Description:** 右侧表达式对应的 ASTNode 对象。

#### init

- **Type:** `boolean`
- **Description:** 如果此写入引用是变量初始化器或默认值，则为 `true`。

<a id="methods-1"></a>

### 方法

#### isWrite()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此引用是写入操作，则为 `true`。

#### isRead()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此引用是读取操作，则为 `true`。

#### isWriteOnly()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此引用是写入操作而非读取操作，则为 `true`。

#### isReadOnly()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此引用是读取操作而非写入操作，则为 `true`。

#### isReadWrite()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此引用同时是读取和写入操作，则为 `true`。

<a id="deprecated-members-3"></a>

### 已弃用的成员

这些成员虽然有定义，但 ESLint 并未使用。

#### tainted

- **Type:** `boolean`
- **Description:** `tainted` 标记（始终为 `false`）。

#### flag

- **Type:** `number`
- **Description:** `1` 表示读取，`2` 表示写入，`3` 表示读取/写入。

#### partial

- **Type:** `boolean`
- **Description:** `partial` 标记。

#### isStatic()

- **Parameters:**
- **Return type:** `boolean`
- **Description:** 如果此引用是静态解析的，则为 `true`。

---

<a id="definition-interface"></a>

## Definition 接口

`Definition` 对象包含变量定义的信息。

<a id="fields-4"></a>

### 字段

#### type

- **Type:** `string`
- **Description:** 此定义的类型。类型可以是以下之一：`"CatchClause"`、`"ClassName"`、`"FunctionName"`、`"ImplicitGlobalVariable"`、`"ImportBinding"`、`"Parameter"` 和 `"Variable"`。

#### name

- **Type:** `ASTNode`
- **Description:** 此定义对应的 `Identifier` 节点。

#### node

- **Type:** `ASTNode`
- **Description:** 包含此名称的节点。

| type                       | node                                                                       |
| :------------------------- | :------------------------------------------------------------------------- |
| `"CatchClause"`            | `CatchClause`                                                              |
| `"ClassName"`              | `ClassDeclaration` 或 `ClassExpression`                                    |
| `"FunctionName"`           | `FunctionDeclaration` 或 `FunctionExpression`                              |
| `"ImplicitGlobalVariable"` | `AssignmentExpression` 或 `ForInStatement` 或 `ForOfStatement`             |
| `"ImportBinding"`          | `ImportSpecifier`、`ImportDefaultSpecifier` 或 `ImportNamespaceSpecifier` |
| `"Parameter"`              | `FunctionDeclaration`、`FunctionExpression` 或 `ArrowFunctionExpression`  |
| `"Variable"`               | `VariableDeclarator`                                                       |

#### parent

- **Type:** `ASTNode | undefined | null`
- **Description:** 包含此名称的语句节点。

| type                       | parent                |
| :------------------------- | :-------------------- |
| `"CatchClause"`            | `null`                |
| `"ClassName"`              | `null`                |
| `"FunctionName"`           | `null`                |
| `"ImplicitGlobalVariable"` | `null`                |
| `"ImportBinding"`          | `ImportDeclaration`   |
| `"Parameter"`              | `null`                |
| `"Variable"`               | `VariableDeclaration` |

<a id="deprecated-members-4"></a>

### 已弃用的成员

这些成员虽然有定义，但 ESLint 并未使用。

#### index

- **Type:** `number | undefined | null`
- **Description:** 声明语句中的索引。

#### kind

- **Type:** `string | undefined | null`
- **Description:** 声明语句的种类。
