/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    './libs/variables.js',
    './libs/imports.js',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],

  rules: {},

  overrides: [
    {
      files: '**/*.ts',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript/base',
        './libs/variables.js',
        './libs/imports.js',
        './libs/typescript.js',
        'prettier',
      ],
    },
  ],
};

module.exports = config;
