const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        jsConfigPath: 'jsconfig.paths.json'
      }
    }
  ],
  babel: {
    presets: ['@emotion/babel-preset-css-prop'] 
  }
};
