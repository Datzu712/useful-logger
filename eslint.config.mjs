import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['**/old_modules/**/*', '**/old*/**/*', '**/*.js', '**/postgres-data', '**/node_modules', '**/dist'],
    },
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
            prettier,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: 'module',
        },

        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            'array-callback-return': 1,
            semi: ['warn', 'always'],
            '@typescript-eslint/no-explicit-any': 'warn',
            'prettier/prettier': 2,
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/ban-ts-comment': 'error',
            'no-case-declarations': 'warn',
            'no-sparse-arrays': 'warn',
            'no-regex-spaces': 'error',
            'use-isnan': 'error',
            'no-fallthrough': 'error',
            'no-empty-pattern': 'error',
            'no-redeclare': 'error',
            'no-self-assign': 'error',
            strict: 'error',

            'sort-imports': [
                'warn',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                },
            ],

            'no-undef': 'off',
        },
    },
];
