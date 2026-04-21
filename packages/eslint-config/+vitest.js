import vitest from '@vitest/eslint-plugin';

/**
 * A custom ESLint configuration for Vitest.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    files: [
      'tests/**',
      'specs/**',
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.js',
      '**/*.spec.jsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
    ],
    ...vitest.configs.recommended,
  },
];
