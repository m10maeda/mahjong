/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@mahjong/eslint-config-nextjs'],

  overrides: [
    {
      files: [
        'app/**/@(page|layout|template|loading|error|not-found|global-error).tsx',
        'app/**/@(page|layout|template|loading|error|not-found|global-error)/index.tsx',
        'src/app/**/@(page|layout|template|loading|error|not-found|global-error).tsx',
        'src/app/**/@(page|layout|template|loading|error|not-found|global-error)/index.tsx',
      ],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
      },
    },
  ],
};
