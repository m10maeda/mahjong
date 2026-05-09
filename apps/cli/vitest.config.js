import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      exclude: [...defaultExclude, 'lint-staged.config.js'],
    },
  },
});
