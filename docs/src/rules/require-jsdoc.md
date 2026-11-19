---
title: require-jsdoc
rule_type: suggestion
related_rules:
- valid-jsdoc
---

:::important
此规则已在 ESLint v9.0.0 中移除，并由 [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc) 中的对应规则取代。
:::

[JSDoc](https://jsdoc.app/) 是一种 JavaScript API 文档生成器。它会利用代码中的特殊格式注释自动生成 API 文档。例如，函数的 JSDoc 注释如下所示：

```js
/**
 * Adds two numbers together.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function sum(num1, num2) {
    return num1 + num2;
}
```

一些风格指南要求为所有函数添加 JSDoc 注释，以此说明函数的行为。

<a id="rule-details"></a>

## 规则详情

此规则要求为指定的节点添加 JSDoc 注释。支持的节点：

* `"FunctionDeclaration"`
* `"ClassDeclaration"`
* `"MethodDefinition"`
* `"ArrowFunctionExpression"`
* `"FunctionExpression"`

<a id="options"></a>

## 选项

此规则有一个对象选项：

* `"require"` 要求为指定的节点添加 JSDoc 注释

默认选项设置如下：

```json
{
    "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": false,
            "ClassDeclaration": false,
            "ArrowFunctionExpression": false,
            "FunctionExpression": false
        }
    }]
}
```

### require

此规则在选项 `{ "require": { "FunctionDeclaration": true, "MethodDefinition": true, "ClassDeclaration": true, "ArrowFunctionExpression": true, "FunctionExpression": true } }` 下的错误代码示例：

::: incorrect

```js
/*eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

function foo() {
    return 10;
}

var bar = () => {
    return 10;
};

class Foo {
    bar() {
        return 10;
    }
}

var bar = function() {
    return 10;
};

var bar = {
    bar: function() {
        return 10;
    },

    baz() {
        return 10;
    }
};
```

:::

此规则在选项 `{ "require": { "FunctionDeclaration": true, "MethodDefinition": true, "ClassDeclaration": true, "ArrowFunctionExpression": true, "FunctionExpression": true } }` 下的正确代码示例：

::: correct

```js
/*eslint "require-jsdoc": ["error", {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
    }
}]*/

/**
 * It returns 10
 */
function foo() {
    return 10;
}

/**
 * It returns test + 10
 * @params {number} test - some number
 * @returns {number} sum of test and 10
 */
var bar = (test) => {
    return test + 10;
}

/**
 * It returns 10
 */
var bar = () => {
    return 10;
}

/**
 * It returns 10
 */
var bar = function() {
    return 10;
}

var array = [1,2,3];
array.filter(function(item) {
    return item > 2;
});

/**
 * A class that can return the number 10
 */
class Foo {
    /**
    * It returns 10
    */
    bar() {
        return 10;
    }
}

/**
 * It returns 10
 */
var bar = function() {
    return 10;
};

var bar = {
    /**
    * It returns 10
    */
    bar: function() {
        return 10;
    },

    /**
    * It returns 10
    */
    baz() {
        return 10;
    }
};

setTimeout(() => {}, 10); // since it's an anonymous arrow function
```

:::

<a id="when-not-to-use-it"></a>

## 不适用的情况

如果不要求为函数添加 JSDoc，就可以关闭此规则。