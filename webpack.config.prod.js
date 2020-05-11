import webpack from 'webpack';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

/* const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); */

export default {
  devtool: 'source-map',
  mode: 'production',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    //Eliminate deplicate packages when generating bundle
    /* new webpack.optimize.DedupePlugin(), */

    // Minify JS
    /* new webpack.optimize.UglifyJsPlugin(), */
    
    new webpack.LoaderOptionsPlugin({
      debug: true,
      noInfo: false,
    }),
    /* new webpack.HotModuleReplacementPlugin(), */
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader','css-loader']}
    ]
  }
}
