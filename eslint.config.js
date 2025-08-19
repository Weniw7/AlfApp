// eslint.config.js (flat config para ESLint v9)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default [
  { ignores: ['**/dist/**', '**/node_modules/**', '**/build/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended, // sin type-check para rapidez en CI
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    plugins: { react },
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
];