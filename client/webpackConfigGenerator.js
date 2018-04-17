const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const rimraf = require('rimraf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const buildConfigs = require('./buildEnv');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const BUILD_DOMAIN = process.env.BUILD_DOMAIN || 'localServer';
const VERSION = `v${pkg.version}`;
const IS_PROD = ENV === 'production';

const SOURCE_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'build');

const config = buildConfigs[BUILD_DOMAIN];

const createConfig = (settings) => {
  const IS_SERVER = settings.type === 'server';
  const OUTPUT_DIR = IS_SERVER ?
    path.join(BUILD_DIR, VERSION, 'server')
    :
    path.join(BUILD_DIR, VERSION);

  return {
    mode: ENV,
    target: IS_SERVER ? 'node' : 'web',
    context: SOURCE_DIR,
    entry: IS_SERVER ? {
      server: './app/index.js',
    } : {
      client: './index.js',
    },
    output: {
      path: OUTPUT_DIR,
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
        },
      }, IS_SERVER ? {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      } : {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: IS_PROD ? [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
              sourceMap: true,
            },
          },
          'sass-loader',
        ] : [
          {
            loader: 'style-loader',
            options: { singleton: true },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
              sourceMap: true,
            },
          },
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
        use: IS_PROD ? {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'assets/images/',
          },
        } : {
          loader: 'url-loader',
        },
      }],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BUILD_CONFIG': JSON.stringify(config),
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/style.[hash:8].css',
        chunkFilename: 'assets/css/[id].[hash:8].css',
      }),
    // Server-only plugins
    ].concat(!IS_SERVER ? [] : [
      new ManifestPlugin(),
      new PostCompile(() => {
        rimraf.sync(path.join(OUTPUT_DIR, 'assets', 'css'));
        rimraf.sync(path.join(OUTPUT_DIR, 'assets', 'images'));
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
    devtool: IS_PROD ? 'source-map' : 'eval-source-map',
    devServer: {
      port: process.env.PORT || 8080,
      host: 'localhost',
      publicPath: '/',
      contentBase: SOURCE_DIR,
      historyApiFallback: true,
    },
  };
};

module.exports = createConfig;
