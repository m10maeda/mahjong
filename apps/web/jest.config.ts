export default {
  displayName: 'web',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'web app unit tests',
        outputDirectory: 'reports/apps/web',
        outputName: 'unit-test-results.xml',
      },
    ],
  ],
};
