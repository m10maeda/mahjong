/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: ['@mahjong/eslint-config-base', '@mahjong/eslint-config-base/+jest'],

  overrides: [
    {
      files: '*.module.ts',
      rules: {
        '@typescript-eslint/no-extraneous-class': [
          'error',
          {
            allowWithDecorator: true,
          },
        ],
      },
    },

    {
      files: 'test/**/*.test.ts',
      rules: {
        'jest/expect-expect': [
          'error',
          { assertFunctionNames: ['expect', 'request.**.expect'] },
        ],
      },
    },
  ],
};
