import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  clearMocks: true,

  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/test/',
  ],

  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '../../coverage/apps/game',

  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'game app unit tests',
            outputDirectory: '../../reports/apps/game',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : undefined,
};

export default config;
