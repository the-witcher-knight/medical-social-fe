const { resolve } = require('path');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DIST } = require('./constants');
const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    path: resolve(DIST),
    publicPath: '/',
    filename: 'index.bundle.js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // All options here: https://webpack.js.org/configuration/dev-server/

    // enable HMR on the server
    hot: true,

    // Enable to integrate with Docker
    //host:"0.0.0.0",

    port: 4200,
    open: false,
    historyApiFallback: true,

    // Join publicPath to devServer
    static: {
      directory: path.join(__dirname, '../public'), // __dirname: /webpack
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          // 'postcss-loader',
        ],
        exclude: /\.module\.css$/,
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-modules-typescript-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: {
      //           localIdentName: '[local]-[hash:base64:10]',
      //         },
      //       },
      //     },
      //     'postcss-loader',
      //   ],
      //   include: /\.module\.css$/,
      // },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};
