/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    './base.js',
    'plugin:cypress/recommended',
    'plugin:mocha/recommended',
    'plugin:testing-library/dom',
    'prettier',
  ],
  rules: {
    // Passing arrow functions (aka “lambdas”) to Mocha is discouraged.
    // See: https://mochajs.org/#arrow-functions
    'prefer-arrow-callback': 'off',
    'func-names': ['error', 'never'],
  },
  overrides: [
    {
      files: ['cypress.config.ts'],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};

module.exports = config;
