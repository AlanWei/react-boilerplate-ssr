const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const VERSION = `v${pkg.version}`;

const SOURCE_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'build');
const SERVER_DIR = path.join(OUTPUT_DIR, VERSION, 'server');

module.exports = {
  mode: ENV,
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
    }],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
    new ManifestPlugin(),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    modules: [
      SOURCE_DIR,
      'node_modules',
    ],
  },
  stats: { colors: true },
  devtool: ENV === 'production' ? 'source-map' : 'eval-source-map',
};
