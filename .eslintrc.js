module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  ignorePatterns: ['/.storybook/*.jsx'],
  rules: {
    // "prettier/prettier": "error",
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-var': 'error',
    semi: 'error',
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true
      },
      { enforceForRenamedProperties: true }
    ],
    'no-self-assign': ['error', { props: true }],
    'array-element-newline': ['error', 'consistent'],
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: false }
    ],
    'object-shorthand': ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'key-spacing': ['error', { beforeColon: false }],
    'lines-between-class-members': ['error', 'always'],
    // 'object-curly-newline': ['error', {
    //   'minProperties': 2 ,
    //   'ImportDeclaration': 'never',
    //   'ExportDeclaration': 'never'
    // }],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
    'array-bracket-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'no-new-func': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'implicit-arrow-linebreak': ['error', 'beside'],
    'newline-before-return': 'error',
    'template-curly-spacing': ['error', 'never'],
    'operator-linebreak': ['error', 'before'],
    'prefer-template': 'error',
    'brace-style': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: true,
        overrides: {
          '++': false,
          '--': false,
          '!': false
        }
      }
    ],
    'default-case': ['error', { commentPattern: '^no\\sdefault' }],
    'no-fallthrough': ['error'],
    quotes: ['error', 'single'],
    'no-multiple-empty-lines': 'error',
    'eol-last': 'error',
    'comma-spacing': 'error',
    'comma-dangle': ['error', 'never'],
    'no-multi-spaces': 'error'
  }
};
