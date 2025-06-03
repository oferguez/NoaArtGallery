/* eslint-env node */
/* eslint-disable no-undef */

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
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
  ignorePatterns: ['obs/'],
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
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
  },
};
