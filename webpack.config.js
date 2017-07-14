const path = require('path');
const webpack = require('webpack');

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
  ],
  resolve: {
    modules: [
      'app',
      'node_modules'
    ],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    enforceExtension: false,
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'app'),
    }],
  },
};
