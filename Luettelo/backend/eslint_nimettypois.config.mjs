import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } } ,
  { languageOptions: {
    globals: globals.node,
    ecmaVersion: 'latest'
  } },

  {
    ignores: ['dist/**'],
  },


  { plugins: {
    '@stylistic/js': stylisticJs
  },
  rules: {
    '@stylistic/js/indent': [
      'error',
      2
    ],
    '@stylistic/js/linebreak-style': [
      'error',
      'unix'
    ],
    '@stylistic/js/quotes': [
      'error',
      'single'
    ],
    '@stylistic/js/semi': [
      'error',
      'always'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true },
    ],
    'no-console': 'off',
    'no-unused-vars': ['warn'], // Varoita käyttämättömistä muuttujista
    'prefer-const': ['warn', { // Suosittele const:ia, jos muuttujaa ei muokata
      'destructuring': 'all',
      'ignoreReadBeforeAssign': true
    }],
  },
  },
];