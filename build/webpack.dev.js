var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './dev/index.js',
  output: {
    path: path.resolve(__dirname, '../dev'),
    publicPath: '/dev/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  devServer: {
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'eval-source-map'
}
