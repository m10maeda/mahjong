/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  rules: {
    // Prefer named export
    'import/prefer-default-export': 'error',
    'import/no-default-export': 'off',

    // Allow exporting a different name than the exported default name　from a
    // referenced module.For example, when a barrel file exports a container
    // component such as HOC.
    'import/no-named-as-default': 'off',

    // Unnecessary import react.
    'react/react-in-jsx-scope': 'off',

    // Enforce arrow function component.
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // Extend to indicate `Image` component from Next.js.
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
        object: [],
        area: [],
        'input[type="image"]': [],
      },
    ],

    // Allow using either the label has htmlFor or a nested label.
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
  },
};

module.exports = config;
