import nextConfigs from '@repo/eslint-config/next-js';
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig(nextConfigs);

export default eslintConfig;
