const merge = require('webpack-merge')

const common = require('./webpack.common.js')


module.exports = merge(common, {
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      rules: [{
        test: /\.scss$/,
        use: [{
          // creates style nodes from JS strings
          loader: "style-loader"
        }, {
          // translates CSS into CommonJS
          loader: "css-loader?sourceMap"
        }, {
          // compiles Sass to CSS
          loader: "sass-loader?sourceMap",
          options: {
            includePaths: ['styles']
          }
        }]
      }],
    }]
  },

  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist'
  }
})