const path = require('path');
const nodeExternals = require('webpack-node-externals');

//const webConfig = {
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "src/index.js"),
  //externals: {
  //  'ethereumjs-devp2p': 'ethereumjs-devp2p'
  //},
  externals: [nodeExternals()],
  target: 'web',
  output: {
    path: path.resolve(__dirname, "dist"),
    library: 'widget',
    libraryTarget: 'commonjs2',
    filename: 'browser.js'
  },
  module: {
    rules: [
      {
        test: /devp2p-node.js/,
        loader: 'null-loader'
      }
    ]
  }
};

//const nodeConfig = {
//  mode: 'production',
//  entry: path.join(__dirname, "src/index.js"),
//  target: 'node',
//  output: {
//    path: path.resolve(__dirname, "dist"),
//    library: 'widget',
//    libraryTarget: 'commonjs2',
//    filename: 'node.js'
//  },
//  externals: [nodeExternals()]
//};
//
//module.exports = [
//  webConfig,
//  nodeConfig
//]
