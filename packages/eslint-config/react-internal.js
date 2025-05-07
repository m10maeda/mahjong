import testingLibraryPlugin from 'eslint-plugin-testing-library';

import jsxA11y from './libs/jsx-a11y.js';
import reactHooks from './libs/react-hooks.js';
import react from './libs/react.js';
import storybook from './libs/storybook.js';
import typescript from './libs/typescript.js';
import vitest from './libs/vitest.js';
import node from './node.js';

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export default [
  ...node,

  ...typescript.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  })),

  {
    files: [
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/*.config.cts',
      '**/*.config.mts',
    ],
    rules: {
      // Require default export.
      'import/prefer-default-export': 'error',
      'import/no-default-export': 'off',
    },
  },

  jsxA11y,
  react,
  reactHooks,

  ...storybook,

  vitest,
  testingLibraryPlugin.configs['flat/react'],

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Prefer using `type`s for object type definitions.
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
];
