/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    './base.js',
    'airbnb',
    'airbnb/hooks',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    './+jest.js',
    './libs/variables.js',
    './libs/imports.js',
    './libs/react.js',
    'prettier',
  ],
  overrides: [
    {
      files: '**/*.ts?(x)',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        './libs/variables.js',
        './libs/imports.js',
        './libs/typescript.js',
        './libs/react.js',
        'prettier',
      ],
      rules: {
        // Use TypeScript instead of prop types.
        'react/prop-types': 'off',

        // Use default value with destructuring assignment instead of
        // `defaultProps`.
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['**/.storybook/*.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        // Allow import devDependencies
        'import/no-extraneous-dependencies': 'off',

        // Allow using props spreading
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
};

module.exports = config;
