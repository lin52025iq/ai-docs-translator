---
title: Rules Reference
permalink: /rules/index.html
eleventyNavigation:
    key: rules
    parent: use eslint
    title: Rules Reference
    order: 5
---

{% from 'components/rule-categories.macro.html' import ruleCategories with context %}
{% from 'components/rule.macro.html' import rule with context %}

Rules in ESLint are grouped by type to help you understand their purpose. Each rule has emojis denoting:

{{ ruleCategories({
        index: true,
        recommended: true,
        fixable: true,
        frozen: true,
        hasSuggestions: true
}) }}

{%- for type, content in rules.types -%}

<h2 id="{{ rules_categories[type].displayName | slugify }}"> {{ site.docs_ui.category_names[type] or rules_categories[type].displayName }} </h2>

{{ (site.docs_ui.category_descriptions[type] or rules_categories[type].description) | safe }}

    {%- for the_rule in content -%}

    {%- if rules_categories[type].displayName == 'deprecated' -%}
    {%- set deprecated_value = true -%}
    {%- endif -%}

    {%- set name_value = the_rule.name -%}
    {%- set description_value = (rule_descriptions[the_rule.name] or the_rule.description) if site.language.code == 'zh-CN' else the_rule.description -%}
    {%- set isRecommended = the_rule.recommended -%}
    {%- set isFrozen = the_rule.frozen -%}
    {%- set isFixable = the_rule.fixable -%}
    {%- set isHasSuggestions = the_rule.hasSuggestions -%}

    {{ rule({
            name: name_value,
            deprecated: deprecated_value,
            description: description_value,
            categories: {
                recommended: isRecommended,
                fixable: isFixable,
                frozen: isFrozen,
                hasSuggestions: isHasSuggestions
            }
    }) }}
    {%- endfor -%}

{%- endfor -%}

{%- if rules.deprecated -%}

<h2 id="{{ rules_categories.deprecated.displayName | slugify }}">{{ site.docs_ui.category_names.deprecated or rules_categories.deprecated.displayName }}</h2>

{{ (site.docs_ui.category_descriptions.deprecated or rules_categories.deprecated.description) | safe }}

{%- for the_rule in rules.deprecated -%}
{%- set name_value = the_rule.name -%}
{%- set isReplacedBy = the_rule.replacedBy -%}
{%- set isRecommended = the_rule.recommended -%}
{%- set isFixable = the_rule.fixable -%}
{%- set isHasSuggestions = the_rule.hasSuggestions -%}

    {{ rule({
            name: name_value,
            deprecated: true,
            replacedBy: isReplacedBy,
            categories: {
                recommended: isRecommended,
                fixable: isFixable,
                hasSuggestions: isHasSuggestions
            }
    }) }}

{%- endfor -%}
{%- endif -%}

{%- if rules.removed -%}

<h2 id="{{ rules_categories.removed.displayName | slugify }}">{{ site.docs_ui.category_names.removed or rules_categories.removed.displayName }}</h2>

{{ (site.docs_ui.category_descriptions.removed or rules_categories.removed.description) | safe }}

{%- for the_rule in rules.removed -%}
{%- set name_value = the_rule.removed -%}
{%- set isReplacedBy = the_rule.replacedBy -%}

    {{ rule({
            name: name_value,
            removed: true,
            replacedBy: isReplacedBy
    }) }}

{%- endfor -%}
{%- endif -%}

{# <!-- markdownlint-disable-file MD046 --> #}
