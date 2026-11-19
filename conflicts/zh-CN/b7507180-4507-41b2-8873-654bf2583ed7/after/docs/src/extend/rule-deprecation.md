---
title: 规则弃用
---

规则弃用元数据用于说明某条规则是否已弃用，以及在存在替代规则时如何替换它。
旧格式使用两个顶层的[规则元数据](./custom-rules#rule-structure)属性：`deprecated`（仅为布尔值）和 `replacedBy`。
新格式中，`deprecated` 可以是布尔值，也可以是 `DeprecatedInfo` 类型的对象；`replacedBy` 应定义在 `deprecated` 内部，而不是顶层。

<a id="deprecatedinfo-type"></a>

## ◆ DeprecatedInfo 类型

此类型表示规则弃用的一般信息。
所有属性均为可选项。

- `message`（`string`）<br>
  可向用户展示的一般消息。可说明弃用此规则的原因，或如何替换此规则。
- `url`（`string`）<br>
  提供有关此规则弃用的更多信息的 URL。
- `replacedBy`（`ReplacedByInfo[]`）<br>
  有关此规则可用替代项的信息。
  可以是空数组，以明确表示没有替代项。
- `deprecatedSince`（`string`）<br>
  弃用此规则的版本的 [Semver](https://semver.org/)。应使用表示特定版本的完整 Semver 字符串，且不带前导的 `"v"`，例如 `"3.12.0"`。
- `availableUntil`（`string | null`）<br>
  可能移除此规则的版本的 [Semver](https://semver.org/)，例如下一个主版本。应使用表示特定版本的完整 Semver 字符串，且不带前导的 `"v"`，例如 `"4.0.0"`。
  特殊值 `null` 表示此规则将不再变更，但仍会继续提供。

<a id="replacedbyinfo-type"></a>

## ◆ ReplacedByInfo 类型

此类型描述一个可能的规则替代项。
所有属性均为可选项。

- `message`（`string`）<br>
  有关此规则替代项的一般消息，例如：
- `url`（`string`）<br>
  提供有关此规则替代项的更多信息的 URL。
- `plugin`（`ExternalSpecifier`）<br>
  指定包含替代规则的插件。
  此名称应为包名；如果替代项是 ESLint 核心规则，则应为 `"eslint"`。
  如果替代项位于同一插件中，则应省略此属性。
- `rule`（`ExternalSpecifier`）<br>
  指定替代规则。
  如果插件仅包含一条规则，或者替代规则与原规则同名，则可以省略。

<a id="externalspecifier-type"></a>

### ◆ ExternalSpecifier 类型

此类型表示外部资源。
所有属性均为可选项。

- `name`（`string`）<br>
  `plugin` 对应的包名，以及 `rule` 对应的规则 ID。
- `url`（`string`）<br>
  指向插件或规则文档的 URL。