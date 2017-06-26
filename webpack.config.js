const { resolve } = require('path')

const docsDir = resolve(__dirname, 'docs')

module.exports = {
  context: docsDir,
  entry: './index.js',

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  },

  output: {
    filename: 'bundle.js',
    path: docsDir,
    publicPath: '/'
  },

  devServer: {
    contentBase: docsDir,
    publicPath: '/',
    compress: true,
    port: 9000
  },

  resolve: {
    alias: {
      'get-average-color': resolve(__dirname, 'src')
    }
  }
}
