export default {
  displayName: 'core-tile',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/core/tile',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'tile unit tests',
        outputDirectory: 'reports/libs/core/tile',
        outputName: 'unit-test-results.xml',
      },
    ],
  ],
};
