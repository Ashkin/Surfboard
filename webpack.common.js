module.exports = {
  entry: [
    './src/index.js'
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/public',
    publicPath: __dirname + '/public',
    filename: 'bundle.js'
  }
}
