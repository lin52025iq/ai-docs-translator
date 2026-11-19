---
title: 格式化器参考
eleventyNavigation:
    key: formatters
    parent: use eslint
    title: 格式化器参考
    order: 7
edit_link: https://github.com/eslint/eslint/edit/main/templates/formatter-examples.md.ejs
---

ESLint 内置了多种格式化器，用于控制代码检查结果的显示方式，同时也支持第三方格式化器。

你可以在 CLI 中使用 [`--format` 或 `-f`](../command-line-interface#-f---format) 标志指定格式化器。例如，`--format json` 会使用 `json` 格式化器。

内置格式化器选项包括：

* [html](#html)
* [json-with-metadata](#json-with-metadata)
* [json](#json)
* [stylish](#stylish)

<a id="example-source"></a>

## 示例源码

以下示例均通过使用下方所示的 `eslint.config.js` 配置对 `fullOfProblems.js` 进行代码检查生成。

`fullOfProblems.js`：

```js
function addOne(i) {
    if (i != NaN) {
        return i ++
    } else {
      return
    }
};
```

`eslint.config.js`：

```js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"consistent-return": 2,
			"indent"           : [1, 4],
			"no-else-return"   : 1,
			"semi"             : [1, "always"],
			"space-unary-ops"  : 2
		}
	}
]);
```

使用 CLI 测试这些格式化器：

```shell
npx eslint --format <Add formatter here> fullOfProblems.js
```

<a id="built-in-formatter-options"></a>

## 内置格式化器选项

### html

将结果输出为 HTML。`html` 格式化器适合在浏览器中进行可视化展示。

示例输出：

<iframe src="html-formatter-example.html" width="100%" height="460px"></iframe>

### json-with-metadata

将结果输出为 JSON 序列化格式。`json-with-metadata` 提供与 [`json`](#json) 格式化器相同的代码检查结果，并附带有关所应用规则的元数据。代码检查结果包含在 `results` 属性中，规则元数据则包含在 `metadata` 属性中。

或者，你也可以使用 [ESLint Node.js API](../../integrate/nodejs-api) 以编程方式使用 ESLint。

示例输出（为便于阅读进行了格式化）：

```json
{
    "results": [
        {
            "filePath": "/var/lib/jenkins/workspace/eslint Release/eslint/fullOfProblems.js",
            "messages": [
                {
                    "ruleId": "no-unused-vars",
                    "severity": 2,
                    "message": "'addOne' is defined but never used.",
                    "line": 1,
                    "column": 10,
                    "messageId": "unusedVar",
                    "endLine": 1,
                    "endColumn": 16,
                    "suggestions": [
                        {
                            "messageId": "removeVar",
                            "data": {
                                "varName": "addOne"
                            },
                            "fix": {
                                "range": [
                                    0,
                                    94
                                ],
                                "text": ""
                            },
                            "desc": "Remove unused variable 'addOne'."
                        }
                    ]
                },
                {
                    "ruleId": "use-isnan",
                    "severity": 2,
                    "message": "Use the isNaN function to compare with NaN.",
                    "line": 2,
                    "column": 9,
                    "messageId": "comparisonWithNaN",
                    "endLine": 2,
                    "endColumn": 17,
                    "suggestions": [
                        {
                            "messageId": "replaceWithIsNaN",
                            "fix": {
                                "range": [
                                    29,
                                    37
                                ],
                                "text": "!Number.isNaN(i)"
                            },
                            "desc": "Replace with Number.isNaN."
                        },
                        {
                            "messageId": "replaceWithCastingAndIsNaN",
                            "fix": {
                                "range": [
                                    29,
                                    37
                                ],
                                "text": "!Number.isNaN(Number(i))"
                            },
                            "desc": "Replace with Number.isNaN and cast to a Number."
                        }
                    ]
                },
                {
                    "ruleId": "space-unary-ops",
                    "severity": 2,
                    "message": "Unexpected space before unary operator '++'.",
                    "line": 3,
                    "column": 16,
                    "messageId": "unexpectedBefore",
                    "endLine": 3,
                    "endColumn": 20,
                    "fix": {
                        "range": [
                            57,
                            58
                        ],
                        "text": ""
                    }
                },
                {
                    "ruleId": "no-useless-assignment",
                    "severity": 2,
                    "message": "The value assigned to 'i' is not used in subsequent statements.",
                    "line": 3,
                    "column": 16,
                    "messageId": "unnecessaryAssignment",
                    "endLine": 3,
                    "endColumn": 17
                },
                {
                    "ruleId": "semi",
                    "severity": 1,
                    "message": "Missing semicolon.",
                    "line": 3,
                    "column": 20,
                    "messageId": "missingSemi",
                    "endLine": 4,
                    "endColumn": 1,
                    "fix": {
                        "range": [
                            60,
                            60
                        ],
                        "text": ";"
                    }
                },
                {
                    "ruleId": "no-else-return",
                    "severity": 1,
                    "message": "Unnecessary 'else' after 'return'.",
                    "line": 4,
                    "column": 12,
                    "messageId": "unexpected",
                    "endLine": 6,
                    "endColumn": 6,
                    "fix": {
                        "range": [
                            0,
                            94
                        ],
                        "text": "function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } \n      return\n    \n}"
                    }
                },
                {
                    "ruleId": "indent",
                    "severity": 1,
                    "message": "Expected indentation of 8 spaces but found 6.",
                    "line": 5,
                    "column": 1,
                    "messageId": "wrongIndentation",
                    "endLine": 5,
                    "endColumn": 7,
                    "fix": {
                        "range": [
                            74,
                            80
                        ],
                        "text": "        "
                    }
                },
                {
                    "ruleId": "consistent-return",
                    "severity": 2,
                    "message": "Function 'addOne' expected a return value.",
                    "line": 5,
                    "column": 7,
                    "messageId": "missingReturnValue",
                    "endLine": 5,
                    "endColumn": 13
                },
                {
                    "ruleId": "semi",
                    "severity": 1,
                    "message": "Missing semicolon.",
                    "line": 5,
                    "column": 13,
                    "messageId": "missingSemi",
                    "endLine": 6,
                    "endColumn": 1,
                    "fix": {
                        "range": [
                            86,
                            86
                        ],
                        "text": ";"
                    }
                }
            ],
            "suppressedMessages": [],
            "errorCount": 5,
            "fatalErrorCount": 0,
            "warningCount": 4,
            "fixableErrorCount": 1,
            "fixableWarningCount": 4,
            "source": "function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } else {\n      return\n    }\n};",
            "usedDeprecatedRules": [
                {
                    "ruleId": "indent",
                    "replacedBy": [
                        "@stylistic/indent"
                    ],
                    "info": {
                        "message": "Formatting rules are being moved out of ESLint core.",
                        "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                        "deprecatedSince": "8.53.0",
                        "availableUntil": "11.0.0",
                        "replacedBy": [
                            {
                                "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                                "url": "https://eslint.style/guide/migration",
                                "plugin": {
                                    "name": "@stylistic/eslint-plugin",
                                    "url": "https://eslint.style"
                                },
                                "rule": {
                                    "name": "indent",
                                    "url": "https://eslint.style/rules/indent"
                                }
                            }
                        ]
                    }
                },
                {
                    "ruleId": "semi",
                    "replacedBy": [
                        "@stylistic/semi"
                    ],
                    "info": {
                        "message": "Formatting rules are being moved out of ESLint core.",
                        "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                        "deprecatedSince": "8.53.0",
                        "availableUntil": "11.0.0",
                        "replacedBy": [
                            {
                                "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                                "url": "https://eslint.style/guide/migration",
                                "plugin": {
                                    "name": "@stylistic/eslint-plugin",
                                    "url": "https://eslint.style"
                                },
                                "rule": {
                                    "name": "semi",
                                    "url": "https://eslint.style/rules/semi"
                                }
                            }
                        ]
                    }
                },
                {
                    "ruleId": "space-unary-ops",
                    "replacedBy": [
                        "@stylistic/space-unary-ops"
                    ],
                    "info": {
                        "message": "Formatting rules are being moved out of ESLint core.",
                        "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                        "deprecatedSince": "8.53.0",
                        "availableUntil": "11.0.0",
                        "replacedBy": [
                            {
                                "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                                "url": "https://eslint.style/guide/migration",
                                "plugin": {
                                    "name": "@stylistic/eslint-plugin",
                                    "url": "https://eslint.style"
                                },
                                "rule": {
                                    "name": "space-unary-ops",
                                    "url": "https://eslint.style/rules/space-unary-ops"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ],
    "metadata": {
        "cwd": "/var/lib/jenkins/workspace/eslint Release/eslint",
        "rulesMeta": {
            "no-unused-vars": {
                "type": "problem",
                "docs": {
                    "description": "Disallow unused variables",
                    "recommended": true,
                    "url": "https://eslint.org/docs/latest/rules/no-unused-vars"
                },
                "hasSuggestions": true,
                "schema": [
                    {
                        "oneOf": [
                            {
                                "enum": [
                                    "all",
                                    "local"
                                ]
                            },
                            {
                                "type": "object",
                                "properties": {
                                    "vars": {
                                        "enum": [
                                            "all",
                                            "local"
                                        ]
                                    },
                                    "varsIgnorePattern": {
                                        "type": "string"
                                    },
                                    "args": {
                                        "enum": [
                                            "all",
                                            "after-used",
                                            "none"
                                        ]
                                    },
                                    "ignoreRestSiblings": {
                                        "type": "boolean"
                                    },
                                    "argsIgnorePattern": {
                                        "type": "string"
                                    },
                                    "caughtErrors": {
                                        "enum": [
                                            "all",
                                            "none"
                                        ]
                                    },
                                    "caughtErrorsIgnorePattern": {
                                        "type": "string"
                                    },
                                    "destructuredArrayIgnorePattern": {
                                        "type": "string"
                                    },
                                    "ignoreClassWithStaticInitBlock": {
                                        "type": "boolean"
                                    },
                                    "ignoreUsingDeclarations": {
                                        "type": "boolean"
                                    },
                                    "reportUsedIgnorePattern": {
                                        "type": "boolean"
                                    }
                                },
                                "additionalProperties": false
                            }
                        ]
                    }
                ],
                "defaultOptions": [
                    {
                        "vars": "all",
                        "args": "after-used",
                        "ignoreRestSiblings": false,
                        "caughtErrors": "all",
                        "ignoreClassWithStaticInitBlock": false,
                        "ignoreUsingDeclarations": false,
                        "reportUsedIgnorePattern": false
                    }
                ],
                "messages": {
                    "unusedVar": "'{{varName}}' is {{action}} but never used{{additional}}.",
                    "usedIgnoredVar": "'{{varName}}' is marked as ignored but is used{{additional}}.",
                    "removeVar": "Remove unused variable '{{varName}}'."
                }
            },
            "use-isnan": {
                "hasSuggestions": true,
                "type": "problem",
                "docs": {
                    "description": "Require calls to `isNaN()` when checking for `NaN`",
                    "recommended": true,
                    "url": "https://eslint.org/docs/latest/rules/use-isnan"
                },
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "enforceForSwitchCase": {
                                "type": "boolean"
                            },
                            "enforceForIndexOf": {
                                "type": "boolean"
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "defaultOptions": [
                    {
                        "enforceForIndexOf": false,
                        "enforceForSwitchCase": true
                    }
                ],
                "messages": {
                    "comparisonWithNaN": "Use the isNaN function to compare with NaN.",
                    "switchNaN": "'switch(NaN)' can never match a case clause. Use Number.isNaN instead of the switch.",
                    "caseNaN": "'case NaN' can never match. Use Number.isNaN before the switch.",
                    "indexOfNaN": "Array prototype method '{{ methodName }}' cannot find NaN.",
                    "replaceWithIsNaN": "Replace with Number.isNaN.",
                    "replaceWithCastingAndIsNaN": "Replace with Number.isNaN and cast to a Number.",
                    "replaceWithFindIndex": "Replace with Array.prototype.{{ methodName }}."
                }
            },
            "space-unary-ops": {
                "deprecated": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "space-unary-ops",
                                "url": "https://eslint.style/rules/space-unary-ops"
                            }
                        }
                    ]
                },
                "type": "layout",
                "docs": {
                    "description": "Enforce consistent spacing before or after unary operators",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/space-unary-ops"
                },
                "fixable": "whitespace",
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "words": {
                                "type": "boolean",
                                "default": true
                            },
                            "nonwords": {
                                "type": "boolean",
                                "default": false
                            },
                            "overrides": {
                                "type": "object",
                                "additionalProperties": {
                                    "type": "boolean"
                                }
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "messages": {
                    "unexpectedBefore": "Unexpected space before unary operator '{{operator}}'.",
                    "unexpectedAfter": "Unexpected space after unary operator '{{operator}}'.",
                    "unexpectedAfterWord": "Unexpected space after unary word operator '{{word}}'.",
                    "wordOperator": "Unary word operator '{{word}}' must be followed by whitespace.",
                    "operator": "Unary operator '{{operator}}' must be followed by whitespace.",
                    "beforeUnaryExpressions": "Space is required before unary expressions '{{token}}'."
                }
            },
            "no-useless-assignment": {
                "type": "problem",
                "docs": {
                    "description": "Disallow variable assignments when the value is not used",
                    "recommended": true,
                    "url": "https://eslint.org/docs/latest/rules/no-useless-assignment"
                },
                "schema": [],
                "messages": {
                    "unnecessaryAssignment": "The value assigned to '{{name}}' is not used in subsequent statements."
                }
            },
            "semi": {
                "deprecated": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "semi",
                                "url": "https://eslint.style/rules/semi"
                            }
                        }
                    ]
                },
                "type": "layout",
                "docs": {
                    "description": "Require or disallow semicolons instead of ASI",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/semi"
                },
                "fixable": "code",
                "schema": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": [
                                {
                                    "enum": [
                                        "never"
                                    ]
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "beforeStatementContinuationChars": {
                                            "enum": [
                                                "always",
                                                "any",
                                                "never"
                                            ]
                                        }
                                    },
                                    "additionalProperties": false
                                }
                            ],
                            "minItems": 0,
                            "maxItems": 2
                        },
                        {
                            "type": "array",
                            "items": [
                                {
                                    "enum": [
                                        "always"
                                    ]
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "omitLastInOneLineBlock": {
                                            "type": "boolean"
                                        },
                                        "omitLastInOneLineClassBody": {
                                            "type": "boolean"
                                        }
                                    },
                                    "additionalProperties": false
                                }
                            ],
                            "minItems": 0,
                            "maxItems": 2
                        }
                    ]
                },
                "messages": {
                    "missingSemi": "Missing semicolon.",
                    "extraSemi": "Extra semicolon."
                }
            },
            "no-else-return": {
                "type": "suggestion",
                "defaultOptions": [
                    {
                        "allowElseIf": true
                    }
                ],
                "docs": {
                    "description": "Disallow `else` blocks after `return` statements in `if` statements",
                    "recommended": false,
                    "frozen": true,
                    "url": "https://eslint.org/docs/latest/rules/no-else-return"
                },
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "allowElseIf": {
                                "type": "boolean"
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "fixable": "code",
                "messages": {
                    "unexpected": "Unnecessary 'else' after 'return'."
                }
            },
            "indent": {
                "deprecated": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "indent",
                                "url": "https://eslint.style/rules/indent"
                            }
                        }
                    ]
                },
                "type": "layout",
                "docs": {
                    "description": "Enforce consistent indentation",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/indent"
                },
                "fixable": "whitespace",
                "schema": [
                    {
                        "oneOf": [
                            {
                                "enum": [
                                    "tab"
                                ]
                            },
                            {
                                "type": "integer",
                                "minimum": 0
                            }
                        ]
                    },
                    {
                        "type": "object",
                        "properties": {
                            "SwitchCase": {
                                "type": "integer",
                                "minimum": 0,
                                "default": 0
                            },
                            "VariableDeclarator": {
                                "oneOf": [
                                    {
                                        "oneOf": [
                                            {
                                                "type": "integer",
                                                "minimum": 0
                                            },
                                            {
                                                "enum": [
                                                    "first",
                                                    "off"
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "object",
                                        "properties": {
                                            "var": {
                                                "oneOf": [
                                                    {
                                                        "type": "integer",
                                                        "minimum": 0
                                                    },
                                                    {
                                                        "enum": [
                                                            "first",
                                                            "off"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "let": {
                                                "oneOf": [
                                                    {
                                                        "type": "integer",
                                                        "minimum": 0
                                                    },
                                                    {
                                                        "enum": [
                                                            "first",
                                                            "off"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "const": {
                                                "oneOf": [
                                                    {
                                                        "type": "integer",
                                                        "minimum": 0
                                                    },
                                                    {
                                                        "enum": [
                                                            "first",
                                                            "off"
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        "additionalProperties": false
                                    }
                                ]
                            },
                            "outerIIFEBody": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "enum": [
                                            "off"
                                        ]
                                    }
                                ]
                            },
                            "MemberExpression": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "enum": [
                                            "off"
                                        ]
                                    }
                                ]
                            },
                            "FunctionDeclaration": {
                                "type": "object",
                                "properties": {
                                    "parameters": {
                                        "oneOf": [
                                            {
                                                "type": "integer",
                                                "minimum": 0
                                            },
                                            {
                                                "enum": [
                                                    "first",
                                                    "off"
                                                ]
                                            }
                                        ]
                                    },
                                    "body": {
                                        "type": "integer",
                                        "minimum": 0
                                    }
                                },
                                "additionalProperties": false
                            },
                            "FunctionExpression": {
                                "type": "object",
                                "properties": {
                                    "parameters": {
                                        "oneOf": [
                                            {
                                                "type": "integer",
                                                "minimum": 0
                                            },
                                            {
                                                "enum": [
                                                    "first",
                                                    "off"
                                                ]
                                            }
                                        ]
                                    },
                                    "body": {
                                        "type": "integer",
                                        "minimum": 0
                                    }
                                },
                                "additionalProperties": false
                            },
                            "StaticBlock": {
                                "type": "object",
                                "properties": {
                                    "body": {
                                        "type": "integer",
                                        "minimum": 0
                                    }
                                },
                                "additionalProperties": false
                            },
                            "CallExpression": {
                                "type": "object",
                                "properties": {
                                    "arguments": {
                                        "oneOf": [
                                            {
                                                "type": "integer",
                                                "minimum": 0
                                            },
                                            {
                                                "enum": [
                                                    "first",
                                                    "off"
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "additionalProperties": false
                            },
                            "ArrayExpression": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "enum": [
                                            "first",
                                            "off"
                                        ]
                                    }
                                ]
                            },
                            "ObjectExpression": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "enum": [
                                            "first",
                                            "off"
                                        ]
                                    }
                                ]
                            },
                            "ImportDeclaration": {
                                "oneOf": [
                                    {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    {
                                        "enum": [
                                            "first",
                                            "off"
                                        ]
                                    }
                                ]
                            },
                            "flatTernaryExpressions": {
                                "type": "boolean",
                                "default": false
                            },
                            "offsetTernaryExpressions": {
                                "type": "boolean",
                                "default": false
                            },
                            "ignoredNodes": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "not": {
                                        "pattern": ":exit$"
                                    }
                                }
                            },
                            "ignoreComments": {
                                "type": "boolean",
                                "default": false
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "messages": {
                    "wrongIndentation": "Expected indentation of {{expected}} but found {{actual}}."
                }
            },
            "consistent-return": {
                "type": "suggestion",
                "docs": {
                    "description": "Require `return` statements to either always or never specify values",
                    "recommended": false,
                    "url": "https://eslint.org/docs/latest/rules/consistent-return"
                },
                "schema": [
                    {
                        "type": "object",
                        "properties": {
                            "treatUndefinedAsUnspecified": {
                                "type": "boolean"
                            }
                        },
                        "additionalProperties": false
                    }
                ],
                "defaultOptions": [
                    {
                        "treatUndefinedAsUnspecified": false
                    }
                ],
                "messages": {
                    "missingReturn": "Expected to return a value at the end of {{name}}.",
                    "missingReturnValue": "{{name}} expected a return value.",
                    "unexpectedReturnValue": "{{name}} expected no return value."
                }
            }
        }
    }
}
```

### json

将结果输出为 JSON 序列化格式。当你想以编程方式处理 CLI 的代码检查结果时，`json` 格式化器会很有用。

或者，你也可以使用 [ESLint Node.js API](../../integrate/nodejs-api) 以编程方式使用 ESLint。

示例输出（为便于阅读进行了格式化）：

```json
[
    {
        "filePath": "/var/lib/jenkins/workspace/eslint Release/eslint/fullOfProblems.js",
        "messages": [
            {
                "ruleId": "no-unused-vars",
                "severity": 2,
                "message": "'addOne' is defined but never used.",
                "line": 1,
                "column": 10,
                "messageId": "unusedVar",
                "endLine": 1,
                "endColumn": 16,
                "suggestions": [
                    {
                        "messageId": "removeVar",
                        "data": {
                            "varName": "addOne"
                        },
                        "fix": {
                            "range": [
                                0,
                                94
                            ],
                            "text": ""
                        },
                        "desc": "Remove unused variable 'addOne'."
                    }
                ]
            },
            {
                "ruleId": "use-isnan",
                "severity": 2,
                "message": "Use the isNaN function to compare with NaN.",
                "line": 2,
                "column": 9,
                "messageId": "comparisonWithNaN",
                "endLine": 2,
                "endColumn": 17,
                "suggestions": [
                    {
                        "messageId": "replaceWithIsNaN",
                        "fix": {
                            "range": [
                                29,
                                37
                            ],
                            "text": "!Number.isNaN(i)"
                        },
                        "desc": "Replace with Number.isNaN."
                    },
                    {
                        "messageId": "replaceWithCastingAndIsNaN",
                        "fix": {
                            "range": [
                                29,
                                37
                            ],
                            "text": "!Number.isNaN(Number(i))"
                        },
                        "desc": "Replace with Number.isNaN and cast to a Number."
                    }
                ]
            },
            {
                "ruleId": "space-unary-ops",
                "severity": 2,
                "message": "Unexpected space before unary operator '++'.",
                "line": 3,
                "column": 16,
                "messageId": "unexpectedBefore",
                "endLine": 3,
                "endColumn": 20,
                "fix": {
                    "range": [
                        57,
                        58
                    ],
                    "text": ""
                }
            },
            {
                "ruleId": "no-useless-assignment",
                "severity": 2,
                "message": "The value assigned to 'i' is not used in subsequent statements.",
                "line": 3,
                "column": 16,
                "messageId": "unnecessaryAssignment",
                "endLine": 3,
                "endColumn": 17
            },
            {
                "ruleId": "semi",
                "severity": 1,
                "message": "Missing semicolon.",
                "line": 3,
                "column": 20,
                "messageId": "missingSemi",
                "endLine": 4,
                "endColumn": 1,
                "fix": {
                    "range": [
                        60,
                        60
                    ],
                    "text": ";"
                }
            },
            {
                "ruleId": "no-else-return",
                "severity": 1,
                "message": "Unnecessary 'else' after 'return'.",
                "line": 4,
                "column": 12,
                "messageId": "unexpected",
                "endLine": 6,
                "endColumn": 6,
                "fix": {
                    "range": [
                        0,
                        94
                    ],
                    "text": "function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } \n      return\n    \n}"
                }
            },
            {
                "ruleId": "indent",
                "severity": 1,
                "message": "Expected indentation of 8 spaces but found 6.",
                "line": 5,
                "column": 1,
                "messageId": "wrongIndentation",
                "endLine": 5,
                "endColumn": 7,
                "fix": {
                    "range": [
                        74,
                        80
                    ],
                    "text": "        "
                }
            },
            {
                "ruleId": "consistent-return",
                "severity": 2,
                "message": "Function 'addOne' expected a return value.",
                "line": 5,
                "column": 7,
                "messageId": "missingReturnValue",
                "endLine": 5,
                "endColumn": 13
            },
            {
                "ruleId": "semi",
                "severity": 1,
                "message": "Missing semicolon.",
                "line": 5,
                "column": 13,
                "messageId": "missingSemi",
                "endLine": 6,
                "endColumn": 1,
                "fix": {
                    "range": [
                        86,
                        86
                    ],
                    "text": ";"
                }
            }
        ],
        "suppressedMessages": [],
        "errorCount": 5,
        "fatalErrorCount": 0,
        "warningCount": 4,
        "fixableErrorCount": 1,
        "fixableWarningCount": 4,
        "source": "function addOne(i) {\n    if (i != NaN) {\n        return i ++\n    } else {\n      return\n    }\n};",
        "usedDeprecatedRules": [
            {
                "ruleId": "indent",
                "replacedBy": [
                    "@stylistic/indent"
                ],
                "info": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "indent",
                                "url": "https://eslint.style/rules/indent"
                            }
                        }
                    ]
                }
            },
            {
                "ruleId": "semi",
                "replacedBy": [
                    "@stylistic/semi"
                ],
                "info": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "semi",
                                "url": "https://eslint.style/rules/semi"
                            }
                        }
                    ]
                }
            },
            {
                "ruleId": "space-unary-ops",
                "replacedBy": [
                    "@stylistic/space-unary-ops"
                ],
                "info": {
                    "message": "Formatting rules are being moved out of ESLint core.",
                    "url": "https://eslint.org/blog/2023/10/deprecating-formatting-rules/",
                    "deprecatedSince": "8.53.0",
                    "availableUntil": "11.0.0",
                    "replacedBy": [
                        {
                            "message": "ESLint Stylistic now maintains deprecated stylistic core rules.",
                            "url": "https://eslint.style/guide/migration",
                            "plugin": {
                                "name": "@stylistic/eslint-plugin",
                                "url": "https://eslint.style"
                            },
                            "rule": {
                                "name": "space-unary-ops",
                                "url": "https://eslint.style/rules/space-unary-ops"
                            }
                        }
                    ]
                }
            }
        ]
    }
]
```

### stylish

面向用户阅读的输出格式，也是默认格式化器。

示例输出：

```text

/var/lib/jenkins/workspace/eslint Release/eslint/fullOfProblems.js
  1:10  error    'addOne' is defined but never used                              no-unused-vars
  2:9   error    Use the isNaN function to compare with NaN                      use-isnan
  3:16  error    Unexpected space before unary operator '++'                     space-unary-ops
  3:16  error    The value assigned to 'i' is not used in subsequent statements  no-useless-assignment
  3:20  warning  Missing semicolon                                               semi
  4:12  warning  Unnecessary 'else' after 'return'                               no-else-return
  5:1   warning  Expected indentation of 8 spaces but found 6                    indent
  5:7   error    Function 'addOne' expected a return value                       consistent-return
  5:13  warning  Missing semicolon                                               semi

✖ 9 problems (5 errors, 4 warnings)
  1 error and 4 warnings potentially fixable with the `--fix` option.

```
