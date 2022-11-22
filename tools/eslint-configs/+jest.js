/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['jest.config.ts'],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
      },
    },
  ],
};

module.exports = config;
