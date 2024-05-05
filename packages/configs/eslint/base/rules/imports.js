/** @type {import("eslint").Linter.Config} */
module.exports = {
  rules: {
    // Prefer named export.
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // Enforce order and group imports.
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [],
      },
    ],
  },

  overrides: [
    {
      files: ['*.config.js', '*.config.ts', '*.config.mjs', '*.config.cjs'],
      rules: {
        // Require default export
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',

        // Allow using devDependencies
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
