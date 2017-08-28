const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: '#source-map',

  entry: [
    'webpack-hot-middleware/client',
    './app/index.js',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new ExtractTextPlugin('styles.css')
  ],

  resolve: {
    modules: [
      'app',
      'node_modules'
    ],
    extensions: [
      '.js',
      '.jsx',
      '.css',
    ],
    enforceExtension: false,
  },
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { 
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]--[hash:base64:5]' 
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
      }
    ],
  },
};
