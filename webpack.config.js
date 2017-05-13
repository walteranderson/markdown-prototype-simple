const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.styl'],
    alias: {
      'at.css': path.resolve(__dirname, 'node_modules/at.js/dist/css/jquery.atwho.css')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    }),
    new ExtractTextPlugin({
      filename: 'index.css'
    })
  ]
};
