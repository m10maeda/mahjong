export default {
  displayName: 'core-tile-group',
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
  coverageDirectory: '../../../coverage/libs/core/tile-group',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'tile group unit tests',
        outputDirectory: 'reports/libs/core/tile-group',
        outputName: 'unit-test-results.xml',
      },
    ],
  ],
};
