import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      'no-console': 'off',
      eqeqeq: 'error',
      curly: 'error',
    },
  },
];
