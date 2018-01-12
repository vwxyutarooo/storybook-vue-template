const webpack = require('webpack');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEVELOP = (process.env.NODE_ENV === 'development');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: __dirname,
    filename: '[name].js',
    library: 'storybook-vue-template',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.json', '.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    ...(DEVELOP) ? [] : [
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      // minify JS
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: { warnings: false }
      })
    ]
  ]
};
