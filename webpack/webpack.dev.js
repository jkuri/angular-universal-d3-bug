const { root } = require('./helpers');
const webpack = require('webpack');
const dll = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const assethtml = require('add-asset-html-webpack-plugin');

module.exports = {
  output: {
    path: root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js',
    library: '[name]',
    libraryTarget: 'var'
  },
  devtool: 'source-map',
  plugins: [
    new dll({
      bundles: {
        polyfills: [
          'core-js',
          { name: 'zone.js', path: 'zone.js/dist/zone.js' },
          { name: 'zone.js', path: 'zone.js/dist/long-stack-trace-zone.js' }
        ],
        vendor: [
          '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/core',
          '@angular/common', '@angular/forms', '@angular/http', '@angular/router', 'rxjs'
        ]
      },
      dllDir: root('dist'),
      webpackConfig: { devtool: 'cheap-module-source-map', plugins: [] }
    }),
    new assethtml([
      { filepath: root(`dist/${dll.resolveFile('polyfills')}`) },
      { filepath: root(`dist/${dll.resolveFile('vendor')}`) }
    ])
  ],
  module: {
    rules: [
      { test: /\.ts$/, use: [ { loader: 'ng-router-loader', options: { loader: 'async-import', genDir: './src/ngfactory', aot: false } }, { loader: 'awesome-typescript-loader', options: { configFileName: './src/tsconfig.browser.json' } }, { loader: 'angular2-template-loader' } ] }
    ]
  }
}
