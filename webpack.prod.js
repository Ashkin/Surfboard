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
          loader: "css-loader"
        }, {
          // compiles Sass to CSS
          loader: "sass-loader",
          options: {
            includePaths: ['styles']
          }
        }]
      }]
    }]
  }
})
