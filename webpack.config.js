var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.tsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'index.hbs')
    }),
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
      }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', 'css'],
    modules: [
      'node_modules',
      'src',
    ]
  },
  devServer: {
    hot: true,
    inline: true,
  },
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          use: [{loader: 'react-hot-loader/webpack'}, {loader: 'awesome-typescript-loader'}],
          exclude: /node_modules/,
        },
        {
            test: /\.css$/i,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // you can specify a publicPath here
                    // by default it uses publicPath in webpackOptions.output
                    // publicPath: '../',
                },
            }, {loader: 'css-loader'}],
        },
    ]
  },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};
