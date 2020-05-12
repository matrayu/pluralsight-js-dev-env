import webpack from 'webpack';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


/* const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); */

export default {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // since we're splitting bundles, we can't hardcode file name below
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    // Minify JS
    minimizer: [new UglifyJsPlugin({
      sourceMap: true
    })], 

    // Use splitChunks Plugin to create a separate bundle
    // of vendor libries so that they're cached separately
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
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
  },
  plugins: [
    //Eliminate deplicate packages when generating bundle
    /* new webpack.optimize.DedupePlugin(), */

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
    /* new MiniCssExtractPlugin('[name].[contenthash].css'), */
    
    // Hash the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),
    
    new webpack.LoaderOptionsPlugin({
      debug: true,
      noInfo: false,
    }),

    // create HTML file that includes references to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      rollbarToken: process.env.ROLLBARTOKEN
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
    ],
  }
}
