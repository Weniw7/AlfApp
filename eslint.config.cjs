// eslint.config.cjs (flat config para ESLint v9 en CJS)
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');

module.exports = [
  { ignores: ['**/dist/**', '**/node_modules/**', '**/build/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended, // rápido en CI, sin type-check
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    plugins: { react },
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  },
  {
    files: ['apps/server/**/*.ts'],
    rules: {
      // permitimos logs en el server
      'no-console': 'off'
    }
  }
];