const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const path = require('path');
const rimraf = require('rimraf');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const BUILD_TYPE = process.env.BUILD_TYPE || 'client';
const IS_SERVER = BUILD_TYPE === 'server';
const VERSION = `v${pkg.version}`;

const SOURCE_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'build');
const SERVER_DIR = path.join(OUTPUT_DIR, VERSION, 'server');
const CLIENT_DIR = path.join(OUTPUT_DIR, VERSION);

module.exports = {
  mode: ENV,
  context: SOURCE_DIR,
  entry: IS_SERVER ? {
    server: './app/index.js',
  } : {
    client: './index.js',
  },
  output: {
    path: IS_SERVER ?
      SERVER_DIR
      :
      CLIENT_DIR,
    filename: 'assets/[name].[hash:8].js',
    libraryTarget: IS_SERVER ? 'commonjs2' : 'umd',
  },
  optimization: IS_SERVER ? {} : {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: IS_SERVER ? ['dynamic-import-webpack', 'remove-webpack'] : [],
        },
      },
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      use: ENV === 'production' ? {
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]',
          outputPath: 'assets/images/',
        },
      } : {
        loader: 'url-loader',
      },
    }],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'process.env.BUILD_TYPE': JSON.stringify(BUILD_TYPE),
      'process.env.IS_SERVER': JSON.stringify(IS_SERVER),
    }),
    new ManifestPlugin(),
  ].concat(!IS_SERVER ? [] : [
  // Server-only plugins
    new PostCompile(() => {
      rimraf.sync(path.join(SERVER_DIR, 'assets', 'css'));
      rimraf.sync(path.join(SERVER_DIR, 'assets', 'images'));
    }),
  // Client-only plugins
  ]).concat(IS_SERVER ? [] : [
    new CopyWebpackPlugin([
      { from: 'favicon.ico' },
    ]),
    new HtmlWebpackPlugin({
      title: 'React App',
      filename: './index.html',
      template: './index.ejs',
    }),
  ]),
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: [
      SOURCE_DIR,
      'node_modules',
    ],
  },
  stats: { colors: true },
  devtool: ENV === 'production' ? 'source-map' : 'eval-source-map',
  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
  },
};
