/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: ['@mahjong/eslint-config-base'],
  parserOptions: {
    project: true,
  },
};
