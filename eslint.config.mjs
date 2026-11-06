import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import format from 'eslint-plugin-format'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import prettierOptions from './.prettierrc.json' with { type: 'json' }

const formatWithPrettier = (files, parser) => ({
    files,
    languageOptions: { parser: format.parserPlain },
    plugins: { format },
    rules: { 'format/prettier': ['error', { ...prettierOptions, parser }] }
})

export default defineConfig(
    { ignores: ['**/node_modules/**', '**/dist/**', '.translation-config/**', 'pnpm-lock.yaml'] },
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
    { languageOptions: { globals: globals.node } },
    {
        files: ['**/*.{ts,tsx,mts,cts}'],
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports', disallowTypeAnnotations: false }
            ]
        }
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
        plugins: { prettier, 'simple-import-sort': simpleImportSort },
        rules: {
            'simple-import-sort/imports': ['error', { groups: [['^\\u0000'], ['^node:'], ['^'], ['^\\.']] }],
            'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
            'prettier/prettier': ['error', prettierOptions],
            '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }]
        }
    },
    formatWithPrettier(['**/*.json'], 'json'),
    formatWithPrettier(['package.json'], 'json-stringify'),
    formatWithPrettier(['**/*.md'], 'markdown'),
    formatWithPrettier(['**/*.{yaml,yml}'], 'yaml')
)
