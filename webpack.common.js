module.exports = {
  entry: [
    './src/index.js'
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  }
}
