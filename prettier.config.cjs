// prettier.config.cjs
// Load the shared base config (also CJS)
const base = require('./config/prettier.base.cjs');

// Only add the HTML void tag plugin when not in discovery mode
if (!process.argv.includes('--find-config-path')) {
  base.plugins = [require.resolve('@awmottaz/prettier-plugin-void-html')];
}

// Add override: only prettify Markdown prose, not code blocks
base.overrides = [
  {
    files: '*.md',
    options: {
      embeddedLanguageFormatting: 'off',
    },
  },
];

// Export for Prettier to consume
module.exports = base;
