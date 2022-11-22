/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: ['./base.js', './+jest.js', 'prettier'],
};

module.exports = config;
