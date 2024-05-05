const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['node_modules/', 'dist/'],

  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:eslint-comments/recommended',
    'turbo',
    './rules/variables.js',
    './rules/imports.js',
    'prettier',
  ],

  plugins: ['only-warn'],

  parserOptions: {
    project,
  },

  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },

  reportUnusedDisableDirectives: true,

  overrides: [
    {
      files: '*.ts',
      extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'airbnb-typescript/base',
        './rules/variables.js',
        './rules/imports.js',
        './rules/typescript.js',
        'prettier',
      ],
    },
  ],
};
