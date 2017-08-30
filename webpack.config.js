module.exports = {
  context: __dirname + '/src',
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
