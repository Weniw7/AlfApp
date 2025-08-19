// eslint.config.cjs — Flat config (ESLint v9) en CJS
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');

module.exports = [
  // Ignora outputs, dependencias y **archivos de configuración**
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      'eslint.config.*',
      '**/.eslintrc.*',
      '**/*.config.js',
      '**/*.config.cjs'
    ]
  },

  // Base JS + TS recomendadas (sin type-check por rapidez en CI)
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React en el front
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

  // Server (permitimos console)
  {
    files: ['apps/server/**/*.ts'],
    rules: { 'no-console': 'off' }
  },

  // Para cualquier archivo .cjs (como este config): Node + permitir require
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'script'
    },
    rules: {
      'no-undef': 'off', // module/require
      '@typescript-eslint/no-var-requires': 'off'
    }
  }
];