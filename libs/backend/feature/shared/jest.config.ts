export default {
  displayName: 'backend-feature-shared',
  preset: '../../../../jest.preset.js',
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
  coverageDirectory: '../../../../coverage/libs/backend/feature/shared',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'backend shared feature unit tests',
        outputDirectory: 'reports/libs/backend/feature/shared',
        outputName: 'unit-test-results.xml',
      },
    ],
  ],
};
