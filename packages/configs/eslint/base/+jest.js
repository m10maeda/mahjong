/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
    'plugin:jest-extended/all',
  ],

  overrides: [
    {
      files: '**/*.config.@(js|ts|mjs|cjs)',
      rules: {
        // Require default export
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
      },
    },
  ],
};
