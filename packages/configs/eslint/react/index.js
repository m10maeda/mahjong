/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    '@mahjong/eslint-config-base',

    'airbnb',
    'airbnb/hooks',

    '@mahjong/eslint-config-base/rules/variables',
    '@mahjong/eslint-config-base/rules/imports',

    'plugin:storybook/recommended',

    './rules/react.js',
    './rules/jsx-a11y.js',

    '@mahjong/eslint-config-base/+jest',
    'plugin:testing-library/react',

    'prettier',
  ],
  overrides: [
    {
      files: '*.ts?(x)',
      extends: [
        'airbnb-typescript',

        '@mahjong/eslint-config-base/rules/variables',
        '@mahjong/eslint-config-base/rules/imports',
        '@mahjong/eslint-config-base/rules/typescript',

        './rules/react.js',
        './rules/jsx-a11y.js',

        'prettier',
      ],
    },

    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        'import/no-extraneous-dependencies': 'off',

        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',

        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};
