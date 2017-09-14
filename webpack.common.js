webpack = require('webpack')

module.exports = {
  entry: [
    './src/index.js'
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV:        JSON.stringify(process.env.NODE_ENV),
      APPLICATION_KEY: JSON.stringify(process.env.APPLICATION_KEY),
      AUTH_TOKEN:      JSON.stringify(process.env.AUTH_TOKEN)
    })
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  }
}
