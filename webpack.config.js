const { resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')

const docsDir = resolve(__dirname, 'docs')
const docsDistDir = resolve(__dirname, 'docs-dist')

const common = {
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
    filename: 'bundle.js'
  },

  resolve: {
    alias: {
      'get-average-color': resolve(__dirname, 'src')
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(common, {
    output: {
      path: docsDistDir
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new CopyPlugin([
        {
          from: resolve(docsDir, 'index.html'),
          to: resolve(docsDistDir, 'index.html')
        },
        {
          from: resolve(docsDir, 'css'),
          to: resolve(docsDistDir, 'css')
        },
        {
          from: resolve(docsDir, 'img'),
          to: resolve(docsDistDir, 'img')
        }
      ])
    ]
  })
} else {
  module.exports = merge(common, {
    output: {
      path: docsDir,
      publicPath: '/'
    },

    devServer: {
      contentBase: docsDir,
      publicPath: '/',
      compress: true,
      port: 9000
    }
  })
}
