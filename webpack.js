const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "src/index.js"),
  externals: {
    'ethereumjs-devp2p': 'ethereumjs-devp2p'
  },
  target: 'web',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    // library: 'widget',
    // libraryTarget: 'commonjs2',
    filename: 'browser.js'
  },
  node: {
    net: 'empty'
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
