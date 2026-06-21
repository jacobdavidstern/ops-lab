// eslint.config.cjs — ESM repo wrapper (flat config)
const path = require('node:path');

// Shared base config — MUST export an array
const baseConfig = require(path.resolve(__dirname, 'config/eslint.base.cjs'));

// Prettier config for markdown override (used in CJS repo)
// const prettierConfig = require('./prettier.config.cjs');

module.exports = [
  // 1. Override for config/tooling files (CJS in an ESM repo)
  {
    files: [
      '**/*.config.{js,cjs,mjs}',
      '**/config/**/*.cjs',
      '**/scripts/**/*.cjs',
    ],
    languageOptions: {
      ecmaVersion: '2022',
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'import/order': 'off',
      'import/no-commonjs': 'off',
    },
  },

  // 2. Shared base config
  ...baseConfig,

  // 3. JSX support for React components
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },

  // 4. Markdown override — active for .md files
  // {
  //   files: ['**/*.md'],
  //   processor: 'markdown/markdown',
  //   rules: {
  //     'prettier/prettier': ['warn', prettierConfig],
  //     'no-undef': 'off',
  //     'no-unused-vars': 'off',
  //   },
  // },

  // // 5. Repo-specific overrides
  // ...localOverrides,
];
