const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
         exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.styl$/,
        loader: 'stylus-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    })
  ]
};
