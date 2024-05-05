/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  rules: {
    // Unnecessary import react.
    'react/react-in-jsx-scope': 'off',

    // Use TypeScript instead of prop types.
    'react/prop-types': 'off',

    // Use default value with destructuring assignment instead of
    // `defaultProps`.
    'react/require-default-props': 'off',
  },
};
