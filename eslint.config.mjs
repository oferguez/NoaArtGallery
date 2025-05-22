import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import _import from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],  // Add this line to include JSX files    
    ignores: [
        'obs/',
    ],
    extends: fixupConfigRules(compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
    )),

    plugins: {
        react: fixupPluginRules(react),
        'react-hooks': fixupPluginRules(reactHooks),
        'jsx-a11y': fixupPluginRules(jsxA11Y),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jest,
        },

        ecmaVersion: 'latest',
        sourceType: 'module',

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: 'detect',
        },

        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
            },
        },
    },

    rules: {
        'no-console': 'off',
        'react/prop-types': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-quotes': ['warn', 'prefer-double'],

        'import/order': ['warn', {
            groups: [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
                'object',
                'type',
            ],

            'newlines-between': 'always',

            alphabetize: {
                order: 'asc',
                caseInsensitive: true,
            },
        }],

        'import/no-unresolved': 'off',

        'no-unused-vars': ['warn', {
            argsIgnorePattern: '^_',
        }],

        semi: ['warn', 'always'],

        quotes: ['warn', 'single', {
            avoidEscape: true,
            allowTemplateLiterals: true,
        }],
    },
}]);