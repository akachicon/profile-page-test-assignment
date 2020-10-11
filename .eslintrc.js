const globals = require('./globals');

const eslintGlobals = Object.values(globals).reduce((acc, val) => {
  acc[val] = 'readonly';
  return acc;
}, {});

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    es2017: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier', // disable general eslint rules that can conflict with prettier
  ],
  overrides: [
    {
      files: [`src/**/*.@(js|mjs|jsx)`],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      env: {
        es2020: true,
        browser: true,
        node: true,
      },
      globals: eslintGlobals,
      extends: [
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',

        // Disable eslint-plugin-react rules that can conflict with prettier.
        'prettier/react',
      ],
      plugins: ['import'],
      rules: {
        quotes: [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: false,
          },
        ],
        'lines-around-comment': [
          'error',
          {
            beforeBlockComment: true,
            beforeLineComment: true,
            allowBlockStart: true,
            allowBlockEnd: true,
            allowObjectStart: true,
            allowObjectEnd: true,
            allowArrayStart: true,
            allowArrayEnd: true,
            allowClassStart: true,
            allowClassEnd: true,
          },
        ],
        'react/react-in-jsx-scope': 'off',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.js', '.jsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: false,
            project: 'jsconfig.json',
          },
        },
        react: {
          pragma: 'React',
          version: 'detect',
        },
        linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
      },
    },
  ],
};
