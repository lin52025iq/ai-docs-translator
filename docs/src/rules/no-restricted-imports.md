---
title: no-restricted-imports
rule_type: suggestion
---


导入是 ES6/ES2015 标准，用于在当前模块中使用其他模块提供的功能。在 CommonJS 中，这通过 `require()` 调用实现，因此这条 ESLint 规则大致相当于其 CommonJS 对应规则 `no-restricted-modules`。

为什么要限制导入？

* 某些导入在特定环境中可能毫无意义。例如，在没有文件系统的环境中，Node.js 的 `fs` 模块就没有意义。

* 有些模块提供相似或相同的功能，例如 `lodash` 和 `underscore`。你的项目可能已经选定了一个模块。你可能希望确保不使用其他替代模块，因为这会不必要地增加项目体积；而当一个依赖就足够时，使用两个依赖还会增加维护成本。

<a id="rule-details"></a>

## 规则详情

此规则允许你指定不希望在应用程序中使用的导入。

此规则仅适用于静态导入，不适用于动态导入。

<a id="options"></a>

## 选项

此规则支持字符串和对象两种选项，用于指定要限制导入的模块。

使用字符串选项时，你可以在规则选项数组中指定要禁止导入的模块名称：

```json
"no-restricted-imports": ["error", "import1", "import2"]
```

字符串选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

import fs from 'fs';
```

:::

字符串选项也会限制模块的导出，如以下示例所示：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

export { fs } from 'fs';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

export * from 'fs';
```

:::

字符串选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", "fs"]*/

import crypto from 'crypto';
export { foo } from "bar";
```

:::

你也可以在对象中使用 `name` 和 `message` 属性，为特定模块指定自定义消息。`name` 的值是模块名称，`message` 属性包含自定义消息。（自定义消息会追加到该规则的默认错误消息后。）

```json
"no-restricted-imports": ["error", {
    "name": "import-foo",
    "message": "Please use import-bar instead."
}, {
    "name": "import-baz",
    "message": "Please use import-quux instead."
}]
```

字符串选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", {
    "name": "disallowed-import",
    "message": "Please use 'allowed-import' instead"
}]*/

import foo from 'disallowed-import';
```

:::

### paths

此对象选项的值是一个数组，其中包含你想要限制的模块名称。

```json
"no-restricted-imports": ["error", { "paths": ["import1", "import2"] }]
```

`paths` 的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { "paths": ["cluster"] }]*/

import cluster from 'cluster';
```

:::

你也可以在 `paths` 数组中使用包含 `name` 和 `message` 的对象，为特定模块指定自定义消息。

```json
"no-restricted-imports": ["error", {
    "paths": [{
        "name": "import-foo",
        "message": "Please use import-bar instead."
    }, {
        "name": "import-baz",
        "message": "Please use import-quux instead."
    }]
}]
```

#### importNames

`paths` 中的此选项是一个数组，可用于指定模块导出的某些绑定名称。`paths` 数组中指定的导入名称会作用于相应对象的 `name` 属性所指定的模块，因此使用 `importNames` 或 `message` 选项时，必须先指定 `name` 属性。

在 `importNames` 数组中指定字符串 `"default"`，即可限制默认导出的导入。

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
    "importNames": ["Bar"],
    "message": "Please use Bar from /import-bar/baz/ instead."
  }]
}]
```

当 `paths` 中的 `importNames` 包含 `"default"` 时，**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["default"],
    message: "Please use the default import from '/bar/baz/' instead."
}]}]*/

import DisallowedObject from "foo";
```

:::

`paths` 中 `importNames` 的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import { DisallowedObject } from "foo";

import { DisallowedObject as AllowedObject } from "foo";

import { "DisallowedObject" as SomeObject } from "foo";
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import * as Foo from "foo";
```

:::

`paths` 中 `importNames` 的**正确**代码示例：

如果默认导出所分配的本地名称与 `importNames` 中的某个字符串相同，也不会导致错误。

::: correct

```js
/*eslint no-restricted-imports: ["error", { paths: [{ name: "foo", importNames: ["DisallowedObject"] }] }]*/

import DisallowedObject from "foo"
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    importNames: ["DisallowedObject"],
    message: "Please import 'DisallowedObject' from '/bar/baz/' instead."
}]}]*/

import { AllowedObject as DisallowedObject } from "foo";
```

:::

#### allowImportNames

此选项是一个数组。它与 `importNames` 作用相反：`allowImportNames` 允许导入数组中指定的名称。因此，除了指定允许的名称外，它会限制从模块导入的所有内容。

注意：`allowImportNames` 不能与 `importNames` 一起使用。

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
    "allowImportNames": ["Bar"],
    "message": "Please use only Bar from import-foo."
  }]
}]
```

`paths` 中 `allowImportNames` 的**错误**代码示例：

除 AllowedObject 外，禁止导入所有名称。

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    allowImportNames: ["AllowedObject"],
    message: "Please use only 'AllowedObject' from 'foo'."
}]}]*/

import { DisallowedObject } from "foo";
```

:::

`paths` 中 `allowImportNames` 的**正确**代码示例：

除 AllowedObject 外，禁止导入所有名称。

::: correct

```js
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "foo",
    allowImportNames: ["AllowedObject"],
    message: "Only use 'AllowedObject' from 'foo'."
}]}]*/

import { AllowedObject } from "foo";
```

:::

<a id="allowtypeimports-typescript-only"></a>

#### allowTypeImports（仅限 TypeScript）

是否允许从某个路径进行[仅类型导入](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)。这也包括仅类型的 `export` 语句，因为它们等同于重新导出一个 `import`。默认值：`false`。

`paths` 中 `allowTypeImports` 的**错误**代码示例：

::: incorrect

```ts
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "import-foo",
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import-foo'."
}]}]*/

import foo from 'import-foo';
export { Foo } from 'import-foo';
```

:::

`paths` 中 `allowTypeImports` 的**正确**代码示例：

::: correct

```ts
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "import-foo",
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import-foo'."
}]}]*/

import type foo from 'import-foo';
export type { Foo } from 'import-foo';

import type foo = require("import-foo");
```

:::

::: correct

```ts
/*eslint no-restricted-imports: ["error", { paths: [{
    name: "import-foo",
	importNames: ["Baz"],
    allowTypeImports: true,
    message: "Please use 'Baz' from 'import-foo' as a type only."
}]}]*/

import { Bar, type Baz } from "import-foo";
```

:::

### patterns

这也是一个对象选项，其值为数组。此选项允许你使用 `gitignore` 风格的模式或正则表达式，指定要限制的多个模块。

`paths` 选项接受精确的导入路径，而 `patterns` 选项可以更灵活地指定导入路径，从而限制同一目录中的多个模块。例如：

```json
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
  }]
}]
```

此配置会限制导入 `import-foo` 模块，但不会限制导入 `import-foo/bar` 或 `import-foo/baz`。你可以使用 `patterns` 同时限制这两者：

```json
"no-restricted-imports": ["error", {
    "paths": [{
      "name": "import-foo",
    }],
    "patterns": [{
      "group": ["import-foo/ba*"],
    }]
}]
```

此配置不仅使用 `path` 限制从 `import-foo` 导入，还使用 `patterns` 限制从 `import-foo/bar` 和 `import-foo/baz` 导入。

使用 `gitignore-` 风格的模式时，如果要重新纳入某个模块，请在模式前添加否定符号（`!`）。（请确保将这些否定模式放在数组末尾，因为顺序会影响结果。）

```json
"no-restricted-imports": ["error", {
    "patterns": ["import1/private/*", "import2/*", "!import2/good"]
}]
```

你也可以使用正则表达式来限制模块（参见 [`regex` 选项](#regex)）。

`patterns` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["lodash/*"] }]*/

import pick from 'lodash/pick';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["lodash/*", "!lodash/pick"] }]*/

import pick from 'lodash/map';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["import1/*", "!import1/private/*"] }]*/

import pick from 'import1/private/someModule';
```

:::

在这个示例中，`"!import1/private/*"` 并未重新纳入 `private` 中的模块，因为如果某个文件的父目录被模式排除，否定符号（`!`）就无法重新纳入该文件。在这种情况下，`import1/private` 目录已被 `import1/*` 模式排除。（可以使用 `"!import1/private"` 重新纳入这个被排除的目录。）

`patterns` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["crypto/*"] }]*/

import crypto from 'crypto';
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["lodash/*", "!lodash/pick"] }]*/

import pick from 'lodash/pick';
```

:::

::: correct

```js
/*eslint no-restricted-imports: ["error", { "patterns": ["import1/*", "!import1/private"] }]*/

import pick from 'import1/private/someModule';
```

:::

#### group

`patterns` 数组中也可以包含对象。`group` 属性用于指定限制模块的 `gitignore` 风格模式，`message` 属性用于指定自定义消息。

使用 `patterns` 选项时，必须提供 `group` 或 `regex` 属性之一。

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import1/private/*"],
      "message": "usage of import1 private modules not allowed."
    }, {
      "group": ["import2/*", "!import2/good"],
      "message": "import2 is deprecated, except the modules in import2/good."
    }]
}]
```

`group` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["lodash/*"],
    message: "Please use the default import from 'lodash' instead."
}]}]*/

import pick from 'lodash/pick';
```

:::

此 `group` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["lodash/*"],
    message: "Please use the default import from 'lodash' instead."
}]}]*/

import lodash from 'lodash';
```

:::

#### regex

`regex` 属性用于指定限制模块的正则表达式模式。

注意：`regex` 不能与 `group` 一起使用。

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "regex": "import1/private/",
      "message": "usage of import1 private modules not allowed."
    }, {
      "regex": "import2/(?!good)",
      "message": "import2 is deprecated, except the modules in import2/good."
    }]
}]
```

`regex` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    regex: "@app/(?!(api/enums$)).*",
}]}]*/

import Foo from '@app/api';
import Bar from '@app/api/bar';
import Baz from '@app/api/baz';
import Bux from '@app/api/enums/foo';
```

:::

`regex` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    regex: "@app/(?!(api/enums$)).*",
}]}]*/

import Foo from '@app/api/enums';
```

:::

#### caseSensitive

这是一个布尔选项；当值为 `true` 时，`group` 或 `regex` 属性指定的模式区分大小写。默认值为 `false`。

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import1/private/prefix[A-Z]*"],
      "caseSensitive": true
    }]
}]
```

`caseSensitive: true` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo[A-Z]*"],
    caseSensitive: true
}]}]*/

import pick from 'fooBar';
```

:::

`caseSensitive: true` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo[A-Z]*"],
    caseSensitive: true
}]}]*/

import pick from 'food';
```

:::

#### importNames

你也可以在 `patterns` 数组中的对象内指定 `importNames`。在这种情况下，指定的名称仅适用于相应的 `group` 或 `regex` 属性。

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["utils/*"],
      "importNames": ["isEmpty"],
      "message": "Use 'isEmpty' from lodash instead."
    }]
}]
```

`patterns` 中 `importNames` 的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNames: ['isEmpty'],
    message: "Use 'isEmpty' from lodash instead."
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

:::

`patterns` 中 `importNames` 的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNames: ['isEmpty'],
    message: "Use 'isEmpty' from lodash instead."
}]}]*/

import { hasValues } from 'utils/collection-utils';
```

:::

#### allowImportNames

你也可以在 `patterns` 数组中的对象内指定 `allowImportNames`。在这种情况下，指定的名称仅适用于相应的 `group` 或 `regex` 属性。

注意：`allowImportNames` 不能与 `importNames`、`importNamePattern` 或 `allowImportNamePattern` 一起使用。

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["utils/*"],
      "allowImportNames": ["isEmpty"],
      "message": "Please use only 'isEmpty' from utils."
    }]
}]
```

`patterns` 中 `allowImportNames` 的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNames: ['isEmpty'],
    message: "Please use only 'isEmpty' from utils."
}]}]*/

import { hasValues } from 'utils/collection-utils';
```

:::

`patterns` 中 `allowImportNames` 的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNames: ['isEmpty'],
    message: "Please use only 'isEmpty' from utils."
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

:::

#### importNamePattern

此选项允许你使用正则表达式模式限制导入名称：

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import-foo/*"],
      "importNamePattern": "^foo",
    }]
}]
```

`importNamePattern` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: '^is',
    message: "Use 'is*' functions from lodash instead."
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo/*"],
    importNamePattern: '^(is|has)',
    message: "Use 'is*' and 'has*' functions from baz/bar instead"
}]}]*/

import { isSomething, hasSomething } from 'foo/bar';
```

:::

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["foo/*"],
    importNames: ["bar"],
    importNamePattern: '^baz',
}]}]*/

import { bar, bazQux } from 'foo/quux';
```

:::

`importNamePattern` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: '^is',
    message: "Use 'is*' functions from lodash instead."
}]}]*/

import isEmpty, { hasValue } from 'utils/collection-utils';
```

:::

你还可以将此选项设置为匹配任意名称的模式（例如 `^`），从而只允许副作用导入。

`importNamePattern` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: "^"
}]}]*/

import isEmpty, { hasValue } from 'utils/collection-utils';

import * as file from 'utils/file-utils';
```

:::

`importNamePattern` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    importNamePattern: "^"
}]}]*/

import 'utils/init-utils';
```

:::

#### allowImportNamePattern

这是一个字符串选项。它与 `importNamePattern` 作用相反：此选项允许匹配指定正则表达式模式的导入。因此，除了指定允许的模式外，它会限制从模块导入的所有内容。

注意：`allowImportNamePattern` 不能与 `importNames`、`importNamePattern` 或 `allowImportNames` 一起使用。

```json
"no-restricted-imports": ["error", {
    "patterns": [{
      "group": ["import-foo/*"],
      "allowImportNamePattern": "^foo",
    }]
}]
```

`allowImportNamePattern` 选项的**错误**代码示例：

::: incorrect

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNamePattern: '^has'
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

:::

`allowImportNamePattern` 选项的**正确**代码示例：

::: correct

```js
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["utils/*"],
    allowImportNamePattern: '^is'
}]}]*/

import { isEmpty } from 'utils/collection-utils';
```

:::

<a id="allowtypeimports-typescript-only-1"></a>

#### allowTypeImports（仅限 TypeScript）

是否允许从某个路径进行[仅类型导入](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)。这也包括仅类型的 `export` 语句，因为它们等同于重新导出一个 `import`。默认值：`false`。

```json
"no-restricted-imports": ["error", {
  "patterns": [{
    "group": ["import/private/*"],
    "allowTypeImports": true,
  }]
}]
```

`patterns` 中 `allowTypeImports` 的**错误**代码示例：

::: incorrect

```ts
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["import/private/*"],
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import/private/*'."
}]}]*/

import { foo } from 'import/private/bar';
export { foo } from 'import/private/bar';
```

:::

`patterns` 中 `allowTypeImports` 的**正确**代码示例：

::: correct

```ts
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["import/private/*"],
    allowTypeImports: true,
    message: "Please use only type-only imports from 'import/private/*'."
}]}]*/

import type { foo } from 'import/private/bar';
export type { foo } from 'import/private/bar';

import type foo = require("import/private/bar");
```

:::

::: correct

```ts
/*eslint no-restricted-imports: ["error", { patterns: [{
    group: ["import/private/*"],
    importNames: ["Baz"],
    allowTypeImports: true,
    message: "Please use 'Baz' from 'import/private/*' as a type only."
}]}]*/

import { Bar, type Baz } from "import/private/bar";
```

:::

<a id="known-limitations"></a>

## 已知限制

TypeScript 的 [`import = require()` 语法](https://www.typescriptlang.org/docs/handbook/2/modules.html#es-module-syntax-with-commonjs-behavior)是有效语法，且此规则能够识别并检查此类情况，但存在一些限制。

你只能完全限制这些导入，不能根据特定的导入名称来限制它们，例如不能使用 `importNames`、`allowImportNames`、`importNamePattern` 或 `allowImportNamePattern` 选项。

TypeScript import equals 声明的**错误**代码示例：

::: incorrect

```ts
/*eslint no-restricted-imports: ["error", "disallowed-import"]*/

import foo = require("disallowed-import");
```

:::

::: incorrect

```ts
/*eslint no-restricted-imports: ["error", { 
  "paths": [{ "name": "disallowed-import" }] 
}]*/

import foo = require("disallowed-import");
```

:::

**注意：**导入名称限制不适用于 TypeScript import equals 声明。以下配置不会限制该 import equals 声明：

::: correct

```ts
/*eslint no-restricted-imports: ["error", { 
  "paths": [{ 
    "name": "foo",
    "importNames": ["foo"]
  }] 
}]*/

// This import equals declaration will NOT be restricted
// even though it imports the entire module
import foo = require("foo");
```

:::

<a id="when-not-to-use-it"></a>

## 何时不应使用此规则

如果你希望在项目中导入模块时不会出现 ESLint 错误或警告，就不要使用此规则，也不要将该模块加入此规则的列表。
