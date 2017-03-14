const { root } = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: root('./src/main.browser.ts'),
  output: {
    filename: 'app.bundle.js'
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: root('./src/index.html'),
      output: root('dist')
    })
  ]
};
