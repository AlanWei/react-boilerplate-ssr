const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PostCompile = require('post-compile-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const rimraf = require('rimraf');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const BUILD_TYPE = process.env.BUILD_TYPE || 'client';
const IS_SERVER = BUILD_TYPE === 'server';
const VERSION = pkg.version;

const SOURCE_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'build');

module.exports = {
  context: SOURCE_DIR,
  entry: (() => {
    if (IS_SERVER) {
      return {
        server: './app/index.js',
      };
    }

    return {
      vendor: [
        'react',
        'react-dom',
        'classnames',
        'prop-types',
        'redux',
        'react-redux',
        'redux-thunk',
        'reselect',
      ],
      client: './index.js',
    };
  })(),

  output: {
    path: IS_SERVER ?
      path.join(OUTPUT_DIR, VERSION, 'server')
      :
      path.join(OUTPUT_DIR, VERSION),
    publicPath: '/',
    libraryTarget: IS_SERVER ? 'commonjs2' : 'umd',
    filename: 'assets/[name].[chunkhash:8].js',
    chunkFilename: 'assets/[id].[name].[chunkhash:8].js',
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
      test: /\.(scss|css)$/,
      include: [
        SOURCE_DIR,
      ],
      use: ExtractTextPlugin.extract({
        fallback: {
          loader: 'style-loader',
          options: {
            singleton: true,
          },
        },
        use: [{
          loader: 'css-loader',
          options: {
            minimize: ENV === 'production',
            sourceMap: ENV === 'development',
            importLoaders: 1,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({ browsers: 'last 5 versions' }),
            ],
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: ENV === 'development',
          },
        }],
      }),
    }, {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      use: ENV === 'production' ? {
        loader: 'file-loader?name=[path][name]_[hash].[ext]',
        options: {
          name: '[hash:8].[ext]',
          outputPath: 'assets/images/',
        },
      } : {
        loader: 'url-loader',
      },
    }],
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
    alias: {},
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/css/style.[hash].css',
      allChunks: true,
      disable: ENV !== 'production',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      'process.env.BUILD_TYPE': JSON.stringify(BUILD_TYPE),
      'process.env.IS_SERVER': JSON.stringify(IS_SERVER),
    }),
    new ManifestPlugin(),
  ].concat(!IS_SERVER ? [] : [
  // Server-only plugins
    new PostCompile(() => {
      rimraf.sync(path.join(OUTPUT_DIR, 'assets', 'css'));
      rimraf.sync(path.join(OUTPUT_DIR, 'assets', 'images'));
    }),
  // Client-only plugins
  ]).concat(IS_SERVER ? [] : [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/vendor.[hash:8].js',
    }),
  // Production-only plugins
  ]).concat(ENV !== 'production' ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },

  devtool: ENV === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8000,
    host: 'localhost',
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    openPage: '',
    proxy: {
      // OPTIONAL: proxy configuration:
      // '/optional-prefix/**': { // path pattern to rewrite
      //   target: 'http://target-host.com',
      //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
      // }
    },
  },
};
