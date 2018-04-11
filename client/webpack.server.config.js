const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const rimraf = require('rimraf');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const VERSION = `v${pkg.version}`;

const SOURCE_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'build');
const SERVER_DIR = path.join(OUTPUT_DIR, VERSION, 'server');

module.exports = {
  mode: ENV,
  target: 'node',
  context: SOURCE_DIR,
  entry: {
    server: './app/index.js',
  },
  output: {
    path: SERVER_DIR,
    filename: 'assets/[name].[hash:8].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['dynamic-import-webpack', 'remove-webpack'],
        },
      },
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    }, {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'assets/images/',
        },
      },
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.[hash:8].css',
    }),
    new ManifestPlugin(),
    new PostCompile(() => {
      rimraf.sync(path.join(SERVER_DIR, 'assets', 'css'));
      rimraf.sync(path.join(SERVER_DIR, 'assets', 'images'));
    }),
  ],
  devtool: ENV === 'production' ? 'source-map' : 'eval-source-map',
};
